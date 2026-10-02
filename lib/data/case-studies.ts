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
  // Template, copy and fill in with real details:
  // {
  //   slug: "client-name-website-rebuild",
  //   clientName: "Client Name",
  //   industry: "Industry",
  //   services: ["Web Development", "Web Hosting"],
  //   summary: "One sentence on what changed for the client.",
  //   problem: "The business problem, in the client's words where possible.",
  //   solution: "What we built or changed, and why.",
  //   results: [{ label: "Metric", value: "Before → after" }],
  //   liveUrl: "https://client.example",
  // },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
