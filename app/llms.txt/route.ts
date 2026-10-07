import { siteConfig } from "@/lib/data/site";
import { serviceList } from "@/lib/data/services";
import { planPriceLabel } from "@/lib/data/plans";
import { completePackages, packagePriceLabel } from "@/lib/data/packages";
import { getHostingPlans } from "@/lib/plans";

export const revalidate = 300;

export async function GET() {
  const hostingPlans = await getHostingPlans();
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `${siteConfig.name} (${siteConfig.tagline}) provides website development, web hosting, managed hosting, business email and digital marketing, primarily serving businesses in Pakistan.`,
    "",
    "## Services",
    ...serviceList.map((s) => `- [${s.title}](${siteConfig.url}/services/${s.slug}): ${s.subheadline}`),
    "",
    "## Hosting plans (PKR)",
    ...hostingPlans.map((p) => `- ${p.name}: ${planPriceLabel(p)}, best for ${p.bestFor.toLowerCase()}`),
    `- Full comparison: ${siteConfig.url}/services/web-hosting#compare-plans`,
    "",
    "## Complete packages (PKR)",
    ...completePackages.map((p) => `- ${p.name}: ${packagePriceLabel(p)}, includes ${p.includes.join(", ").toLowerCase()}`),
    `- Details: ${siteConfig.url}/#packages`,
    "",
    "## Key pages",
    `- [Home](${siteConfig.url}/)`,
    `- [About](${siteConfig.url}/about)`,
    `- [Blog](${siteConfig.url}/blog)`,
    `- [Start a project](${siteConfig.url}/contact)`,
    `- [Free website audit](${siteConfig.url}/free-website-audit)`,
    "",
    "## Contact",
    `- WhatsApp: ${siteConfig.whatsappDisplay}`,
    `- Phone: ${siteConfig.phoneDisplay}`,
    `- Email: ${siteConfig.email}`,
    `- Hours: ${siteConfig.hours.days}, ${siteConfig.hours.time} (${siteConfig.hours.timezone})`,
    `- ${siteConfig.responseTimePromise}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
