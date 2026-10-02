import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/data/services";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ServicePageBody } from "@/components/sections/service-page-body";
import { AuditCta } from "@/components/sections/audit-cta";

const service = services["digital-marketing"];

export const metadata: Metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: "/services/digital-marketing",
});

export default function DigitalMarketingPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Services", path: "/services" },
          { name: service.navLabel, path: "/services/digital-marketing" },
        ]}
      />
      <ServicePageBody service={service} afterPricing={<AuditCta location="digital_marketing" />} />
    </>
  );
}
