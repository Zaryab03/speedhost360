import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/data/services";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ServicePageBody } from "@/components/sections/service-page-body";

const service = services["web-development"];

export const metadata: Metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: "/services/web-development",
});

export default function WebDevelopmentPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Services", path: "/services" },
          { name: service.navLabel, path: "/services/web-development" },
        ]}
      />
      <ServicePageBody service={service} />
    </>
  );
}
