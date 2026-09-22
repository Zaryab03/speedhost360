import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/hero";
import { ServiceGrid } from "@/components/sections/service-grid";
import { ReliabilityStats } from "@/components/sections/reliability-stats";
import { Pricing } from "@/components/sections/pricing";
import { EmailPricing } from "@/components/sections/email-pricing";
import { HostingComparison } from "@/components/sections/hosting-comparison";
import { BuildHostGrow } from "@/components/sections/build-host-grow";
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
      <ReliabilityStats />
      <ServiceGrid />
      <Pricing />
      <EmailPricing />
      <HostingComparison />
      <BuildHostGrow />
      <Testimonials />
      <FaqSection />
      <FinalCta />
    </>
  );
}
