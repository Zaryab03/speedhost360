import "server-only";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { hostingPlans as configPlans, type HostingPlan, type PlanSlug } from "@/lib/data/plans";

// Hosting plans are read from the HostingPlan table (seeded from
// lib/data/plans.ts). If the database is unreachable or not seeded yet, fall
// back to the config so pricing pages never break. Cached for 5 minutes;
// call revalidateTag("hosting-plans") after editing the table to refresh
// sooner.
export const getHostingPlans = unstable_cache(
  async (): Promise<HostingPlan[]> => {
    try {
      const rows = await prisma.hostingPlan.findMany({
        orderBy: { sortOrder: "asc" },
        omit: { sortOrder: true, createdAt: true, updatedAt: true },
      });
      if (rows.length === 0) return configPlans;
      return rows.map((row) => ({
        ...row,
        slug: row.slug as PlanSlug,
        service: row.service as HostingPlan["service"],
      }));
    } catch (err) {
      console.warn("[plans] falling back to lib/data/plans.ts:", (err as Error).message);
      return configPlans;
    }
  },
  ["hosting-plans"],
  { revalidate: 300, tags: ["hosting-plans"] }
);
