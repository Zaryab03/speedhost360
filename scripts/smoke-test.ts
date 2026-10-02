/**
 * End-to-end smoke test for a running instance plus its database.
 *
 *   npm run dev            # or npm run build && npm start
 *   npm run smoke          # BASE_URL defaults to http://localhost:3000
 *
 * Covers: page/content reads, the plans query, the brief (contact) form,
 * the audit form, honeypot and validation paths. Rows it creates use the
 * marker email below and are deleted at the end.
 *
 * Safety: refuses to run against speedhost360.com, and against a non-local
 * DATABASE_URL unless SMOKE_ALLOW_REMOTE_DB=1 (it writes and deletes rows).
 */
import { createHash, randomInt } from "node:crypto";
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

const BASE_URL = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const MARKER_EMAIL = "smoke-test@example.invalid";
// Unique per run so earlier runs' rate-limit buckets never interfere.
const FAKE_IP = `198.18.${randomInt(0, 255)}.${randomInt(1, 254)}`;

const failures: string[] = [];
let passed = 0;

function check(name: string, ok: boolean, detail = "") {
  if (ok) {
    passed += 1;
    console.log(`  ok   ${name}`);
  } else {
    failures.push(name);
    console.log(`  FAIL ${name}${detail ? `: ${detail}` : ""}`);
  }
}

function guard() {
  const base = new URL(BASE_URL);
  if (base.hostname.endsWith("speedhost360.com")) {
    throw new Error(`Refusing to run against ${base.hostname}: this script writes test data.`);
  }
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error("DATABASE_URL is not set.");
  const dbHost = new URL(dbUrl).hostname;
  const local = ["localhost", "127.0.0.1", "::1", "db"].includes(dbHost);
  if (!local && process.env.SMOKE_ALLOW_REMOTE_DB !== "1") {
    throw new Error(
      `DATABASE_URL points at ${dbHost}. Set SMOKE_ALLOW_REMOTE_DB=1 only for a non-production database.`
    );
  }
}

async function get(path: string) {
  const res = await fetch(`${BASE_URL}${path}`, { redirect: "manual" });
  return { status: res.status, body: await res.text() };
}

async function post(path: string, body: unknown) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": FAKE_IP },
    body: JSON.stringify(body),
  });
  return { status: res.status, json: (await res.json().catch(() => ({}))) as Record<string, unknown> };
}

async function main() {
  guard();
  // Imported after guard() so a refused run never opens a connection.
  const { createPrismaClient } = await import("../lib/db-client");
  const prisma = createPrismaClient();

  try {
    console.log(`Smoke testing ${BASE_URL}\n\nContent reads`);
    for (const [path, needle] of [
      ["/", "Where do you want to start?"],
      ["/services/web-hosting", "Every plan, spec by spec."],
      ["/services/managed-hosting", "Service level summary"],
      ["/contact", "What happens after you submit"],
      ["/free-website-audit", "Find out what to fix first."],
      ["/blog", ""],
      ["/llms.txt", "Hosting plans"],
    ] as const) {
      const res = await get(path);
      check(`GET ${path}`, res.status === 200 && res.body.includes(needle), `status ${res.status}`);
    }
    const sitemap = await get("/sitemap.xml");
    check("sitemap excludes client portal", sitemap.status === 200 && !sitemap.body.includes("clients.speedhost360.com"));

    console.log("\nDatabase");
    const plans = await prisma.hostingPlan.findMany({ orderBy: { sortOrder: "asc" } });
    check("plans query returns seeded plans", plans.length >= 4, `${plans.length} rows (run npm run db:seed)`);
    check("exactly one most popular plan", plans.filter((p) => p.mostPopular).length === 1);
    const posts = await prisma.post.findMany({ where: { status: "PUBLISHED" }, take: 1 });
    check("published posts query runs", Array.isArray(posts));

    console.log("\nBrief / contact form (/api/contact)");
    const brief = {
      name: "Smoke Test",
      email: MARKER_EMAIL,
      phone: "+92 300 0000000",
      service: "web-hosting",
      plan: "business",
      message: "Automated smoke test, please ignore.",
    };
    const ok = await post("/api/contact", brief);
    check("valid brief accepted", ok.status === 200, JSON.stringify(ok.json));
    const lead = await prisma.lead.findFirst({ where: { email: MARKER_EMAIL, plan: "business" } });
    check("brief stored with plan", !!lead);

    const contactOnly = await post("/api/contact", { ...brief, service: "other", plan: "" });
    check("general enquiry (no plan) accepted", contactOnly.status === 200);

    const invalid = await post("/api/contact", { name: "x", email: "nope" });
    check("invalid brief rejected with field errors", invalid.status === 400 && !!invalid.json.fieldErrors);

    const before = await prisma.lead.count({ where: { email: MARKER_EMAIL } });
    const bot = await post("/api/contact", { ...brief, company_website: "spam" });
    const after = await prisma.lead.count({ where: { email: MARKER_EMAIL } });
    check("honeypot silently dropped", bot.status === 200 && after === before);

    console.log("\nAudit form (/api/audit)");
    const audit = await post("/api/audit", {
      websiteUrl: "example.com",
      email: MARKER_EMAIL,
      focusAreas: ["speed", "seo"],
    });
    check("valid audit accepted", audit.status === 200, JSON.stringify(audit.json));
    const stored = await prisma.auditRequest.findFirst({ where: { email: MARKER_EMAIL } });
    check("audit stored with normalised URL", stored?.websiteUrl === "https://example.com");
    const badAudit = await post("/api/audit", { websiteUrl: "not a url", email: MARKER_EMAIL, focusAreas: [] });
    check("invalid audit rejected", badAudit.status === 400);
  } finally {
    const leads = await prisma.lead.deleteMany({ where: { email: MARKER_EMAIL } });
    const audits = await prisma.auditRequest.deleteMany({ where: { email: MARKER_EMAIL } });
    const buckets = await prisma.rateLimitBucket.deleteMany({
      where: {
        key: {
          in: ["contact", "audit"].map((form) =>
            createHash("sha256").update(`${form}:${FAKE_IP}`).digest("hex")
          ),
        },
      },
    });
    console.log(`\nCleaned up ${leads.count} leads, ${audits.count} audit requests, ${buckets.count} rate-limit buckets.`);
    await prisma.$disconnect();
  }

  console.log(`\n${passed} passed, ${failures.length} failed`);
  if (failures.length) process.exit(1);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
