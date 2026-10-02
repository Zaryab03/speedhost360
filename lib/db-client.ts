import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import type { PoolConfig } from "pg";

// Connection pool settings for the self-managed Postgres, all from env:
//
//   DATABASE_URL               required, e.g. postgresql://user:pass@host:5432/db
//   DB_SSL                     "disable" (default) | "require" | "verify-full"
//   DB_SSL_CA                  PEM CA certificate, for verify-full against a private CA
//   DB_POOL_MAX                max connections per app instance (default 10)
//   DB_POOL_IDLE_TIMEOUT_MS    close idle connections after this (default 30000)
//   DB_CONNECT_TIMEOUT_MS      fail fast if Postgres is unreachable (default 5000)
//
// Keep DB_POOL_MAX x number of app instances below Postgres max_connections
// (or put PgBouncer in front; see README).
//
// This module has no "server-only" guard so CLI scripts (seed, smoke test)
// can use it. App code must import lib/db.ts instead.

function intFromEnv(name: string, fallback: number) {
  const raw = process.env[name];
  const value = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function sslFromEnv(): PoolConfig["ssl"] {
  const mode = (process.env.DB_SSL ?? "disable").toLowerCase();
  if (mode === "disable") return undefined;
  if (mode === "require") return { rejectUnauthorized: false };
  if (mode === "verify-full") {
    return { rejectUnauthorized: true, ...(process.env.DB_SSL_CA ? { ca: process.env.DB_SSL_CA } : {}) };
  }
  throw new Error(`DB_SSL must be "disable", "require" or "verify-full" (got "${mode}").`);
}

export function poolConfigFromEnv(): PoolConfig {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set.");
  }
  return {
    connectionString,
    ssl: sslFromEnv(),
    max: intFromEnv("DB_POOL_MAX", 10),
    idleTimeoutMillis: intFromEnv("DB_POOL_IDLE_TIMEOUT_MS", 30_000),
    connectionTimeoutMillis: intFromEnv("DB_CONNECT_TIMEOUT_MS", 5_000),
    application_name: "sh360-web",
  };
}

export function createPrismaClient() {
  return new PrismaClient({ adapter: new PrismaPg(poolConfigFromEnv()) });
}
