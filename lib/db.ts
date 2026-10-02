import "server-only";
import type { PrismaClient } from "@prisma/client";
import { createPrismaClient } from "@/lib/db-client";

// The app's single pooled database client. "server-only" makes any import
// from a Client Component a build error, so credentials and connections can
// never reach the browser. Pool settings: see lib/db-client.ts.

// Standard Next.js dev-mode singleton: without this, hot reload would create
// a new PrismaClient/connection pool on every file save.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
