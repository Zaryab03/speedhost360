import { siteConfig } from "@/lib/data/site";
import { serviceList } from "@/lib/data/services";

export function GET() {
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `${siteConfig.name} (${siteConfig.tagline}) provides website development, web hosting, managed hosting and digital marketing, primarily serving businesses in Pakistan.`,
    "",
    "## Services",
    ...serviceList.map((s) => `- [${s.title}](${siteConfig.url}/services/${s.slug}): ${s.subheadline}`),
    "",
    "## Key pages",
    `- [Home](${siteConfig.url}/)`,
    `- [About](${siteConfig.url}/about)`,
    `- [Blog](${siteConfig.url}/blog)`,
    `- [Contact](${siteConfig.url}/contact)`,
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
