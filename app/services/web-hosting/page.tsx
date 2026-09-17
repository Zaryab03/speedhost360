import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/data/services";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ServicePageBody } from "@/components/sections/service-page-body";

const service = services["web-hosting"];

export const metadata: Metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: "/services/web-hosting",
});

export default function WebHostingPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Services", path: "/services" },
          { name: service.navLabel, path: "/services/web-hosting" },
        ]}
      />
      <ServicePageBody service={service} />
    </>
  );
}
