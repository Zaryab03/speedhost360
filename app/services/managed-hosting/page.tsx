import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/data/services";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ServicePageBody } from "@/components/sections/service-page-body";

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
      <ServicePageBody service={service} />
    </>
  );
}
