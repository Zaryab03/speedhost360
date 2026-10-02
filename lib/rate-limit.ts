import "server-only";
import { createHash } from "node:crypto";
import { prisma } from "@/lib/db";

// Fixed-window rate limiter backed by Postgres (RateLimitBucket), so limits
// survive restarts and are shared across app instances. One atomic upsert
// per request. If the database is unavailable it falls back to an
// in-memory window for this instance rather than blocking every visitor.

type Options = { limit: number; windowMs: number };
type Result = { success: boolean; remaining: number };

function hashKey(key: string) {
  return createHash("sha256").update(key).digest("hex");
}

export async function rateLimit(key: string, { limit, windowMs }: Options): Promise<Result> {
  const hashed = hashKey(key);
  try {
    const rows = await prisma.$queryRaw<{ count: number }[]>`
      INSERT INTO "RateLimitBucket" ("key", "count", "resetAt")
      VALUES (${hashed}, 1, now() + make_interval(secs => ${windowMs / 1000}))
      ON CONFLICT ("key") DO UPDATE SET
        "count" = CASE WHEN "RateLimitBucket"."resetAt" <= now() THEN 1
                       ELSE "RateLimitBucket"."count" + 1 END,
        "resetAt" = CASE WHEN "RateLimitBucket"."resetAt" <= now() THEN EXCLUDED."resetAt"
                         ELSE "RateLimitBucket"."resetAt" END
      RETURNING "count"`;
    const count = Number(rows[0]?.count ?? 1);

    // Opportunistic cleanup of long-expired buckets (~1% of requests).
    if (Math.random() < 0.01) {
      await prisma.rateLimitBucket
        .deleteMany({ where: { resetAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } } })
        .catch(() => {});
    }

    return { success: count <= limit, remaining: Math.max(0, limit - count) };
  } catch (err) {
    console.warn("[rate-limit] database unavailable, using in-memory fallback:", (err as Error).message);
    return memoryRateLimit(hashed, { limit, windowMs });
  }
}

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function memoryRateLimit(key: string, { limit, windowMs }: Options): Result {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0 };
  }

  existing.count += 1;
  return { success: true, remaining: limit - existing.count };
}

// x-forwarded-for is only trustworthy behind a proxy that overwrites it
// (e.g. nginx with proxy_set_header X-Forwarded-For $remote_addr). See README.
export function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}
