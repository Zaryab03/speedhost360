import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/data/services";
import { plansForService } from "@/lib/data/plans";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ServicePageBody } from "@/components/sections/service-page-body";
import { DataOwnership } from "@/components/sections/data-ownership";
import { ClientPortalLink } from "@/components/layout/client-portal-link";
import { siteConfig } from "@/lib/data/site";
import { ReliabilityStats } from "@/components/sections/reliability-stats";
import {
  MigrationChecklist,
  NotIncludedAndAddOns,
  PlanComparisonTable,
  PlanScenarios,
  SlaSummary,
} from "@/components/sections/hosting-plan-details";

const service = services["managed-hosting"];

export const metadata: Metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: "/services/managed-hosting",
});

export default function ManagedHostingPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Services", path: "/services" },
          { name: service.navLabel, path: "/services/managed-hosting" },
        ]}
      />
      <ServicePageBody
        service={service}
        pricing={
          <>
            <PlanComparisonTable location="managed_hosting_compare" />
            <PlanScenarios />
          </>
        }
        afterPricing={
          <>
            <NotIncludedAndAddOns />
            <SlaSummary plans={plansForService("managed-hosting")}>
              <p>
                Already hosting with us?{" "}
                <ClientPortalLink location="hosting" className="underline underline-offset-2" />
                . {siteConfig.helpdeskHelperText}
              </p>
            </SlaSummary>
            <MigrationChecklist />
            <DataOwnership />
            <ReliabilityStats />
          </>
        }
      />
    </>
  );
}
