import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ServiceGrid } from "@/components/sections/service-grid";
import { BuildHostGrow } from "@/components/sections/build-host-grow";
import { CaseStudiesPreview } from "@/components/sections/case-studies-preview";
import { GalleryPreview } from "@/components/sections/gallery-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = buildMetadata({
  title: "SpeedHost360 | Web Development, Hosting & Digital Marketing",
  description:
    "Websites, reliable infrastructure, and digital marketing built to turn your online presence into a business asset. Based in Pakistan, serving clients everywhere.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServiceGrid />
      <BuildHostGrow />
      <CaseStudiesPreview />
      <GalleryPreview />
      <Testimonials />
      <FaqSection />
      <FinalCta />
    </>
  );
}
