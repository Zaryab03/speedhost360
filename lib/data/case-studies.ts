// Real, client-approved case studies only. Never add an entry with invented
// clients, logos or numbers: publish a case study once the client has given
// written permission and every result below has been verified with them.
// While this list is empty, /case-studies shows an empty state and stays
// out of the sitemap and search index.

export type CaseStudyResult = {
  /** e.g. "Page load time" */
  label: string;
  /** e.g. "4.1s → 1.3s". Must be a measured, client-verified figure. */
  value: string;
};

export type CaseStudy = {
  slug: string;
  clientName: string;
  industry: string;
  services: string[];
  /** Where the client is based, e.g. "United Kingdom". */
  location?: string;
  /** Frameworks and platforms the site is built on. */
  stack?: string[];
  /** One-sentence summary used on the listing card. */
  summary: string;
  problem: string;
  solution: string;
  results: CaseStudyResult[];
  liveUrl?: string;
  /** Path under /public, e.g. /images/case-studies/acme.webp */
  image?: { src: string; alt: string };
  logo?: { src: string; alt: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "equipio-tech",
    clientName: "Equipio Tech Ltd.",
    industry: "IT Hardware Supply",
    location: "United Kingdom",
    services: ["Web Development", "Domain", "Web Hosting", "Business Email"],
    stack: ["Tailwind CSS"],
    summary:
      "A business website, domain, hosting and business email for a Manchester-based IT hardware supplier.",
    problem:
      "Equipio Tech supplies business laptops, servers, networking equipment and peripherals to companies across the UK, USA, Europe and Asia. They needed a professional web presence that explained what they supply and gave buyers a clear way to get in touch.",
    solution:
      "We designed and built their business website with Tailwind CSS, registered their domain, and now host the site and run their business email on it, so the website, domain and mailboxes are all looked after in one place.",
    results: [],
    liveUrl: "https://www.equipiotech.co.uk",
  },
  {
    slug: "bizloom-erp",
    clientName: "Bizloom ERP",
    industry: "ERP & Business Automation",
    location: "Pakistan",
    services: ["Web Development", "Web Hosting", "Business Email", "Digital Marketing"],
    stack: ["Next.js (App Router)", "TypeScript", "Tailwind CSS v4", "Framer Motion"],
    summary:
      "A Next.js website, hosting, business email and digital marketing for an ERP implementation company.",
    problem:
      "Bizloom implements and customises ERP solutions for manufacturing, distribution, retail and growing businesses. They needed a website that could explain a technical offering clearly, plus the hosting, email and marketing to put it in front of the right buyers.",
    solution:
      "We built their website with Next.js (App Router), TypeScript, Tailwind CSS v4 and Framer Motion, host it, run their business email, and handle their digital marketing.",
    results: [],
    liveUrl: "https://www.bizloom.pk",
  },
  {
    slug: "creatify-hub",
    clientName: "Creatify Hub",
    industry: "ERP Software",
    location: "Pakistan",
    services: ["Web Development", "Web Hosting", "Business Email"],
    stack: ["WordPress"],
    summary:
      "A WordPress website, hosting and business email for a modular ERP platform.",
    problem:
      "Creatify Hub offers a configurable ERP platform covering accounting, inventory, sales, procurement, HR & payroll and manufacturing. They needed a website that presented each module and drove demo bookings.",
    solution:
      "We built their website on WordPress so their team can update content themselves, and we host it and run their business email.",
    results: [],
    liveUrl: "https://www.creatify-hub.com",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
