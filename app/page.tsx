import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/hero";
import { AudienceCards } from "@/components/sections/audience-cards";
import { ServiceGrid } from "@/components/sections/service-grid";
import { ReliabilityStats } from "@/components/sections/reliability-stats";
import { Pricing } from "@/components/sections/pricing";
import { EmailPricing } from "@/components/sections/email-pricing";
import { HostingComparison } from "@/components/sections/hosting-comparison";
import { RecentWork } from "@/components/sections/recent-work";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq-section";
import { AuditCta } from "@/components/sections/audit-cta";
import { getHostingPlans } from "@/lib/plans";

// Plans come from the database; refresh the prerendered page every 5 minutes.
export const revalidate = 300;
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = buildMetadata({
  title: "SpeedHost360 | Web Development, Hosting & Digital Marketing",
  description:
    "Websites, reliable infrastructure, and digital marketing built to turn your online presence into a business asset. Based in Pakistan, serving clients everywhere.",
  path: "/",
});

export default async function Home() {
  const plans = await getHostingPlans();

  return (
    <>
      <Hero />
      <AudienceCards />
      <ReliabilityStats />
      <ServiceGrid />
      <Pricing plans={plans} />
      <EmailPricing />
      <HostingComparison />
      <RecentWork />
      <Testimonials />
      <AuditCta location="home" />
      <FaqSection plans={plans} />
      <FinalCta />
    </>
  );
}
