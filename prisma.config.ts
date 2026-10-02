import { config as loadEnv } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Prisma 7's CLI no longer auto-loads .env files, so load the same
// .env.local Next.js reads (falling back to .env for CI/deploy setups that
// use it instead).
loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  // CLI operations (migrate, db seed, studio) go through DIRECT_URL. For a
  // single self-hosted Postgres instance this is the same connection as
  // DATABASE_URL; the two only diverge if a pooler (e.g. PgBouncer) is put
  // in front of the app's runtime connection later, since poolers in
  // transaction mode don't support the prepared statements / advisory locks
  // migrations need.
  datasource: {
    url: env("DIRECT_URL"),
  },
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
