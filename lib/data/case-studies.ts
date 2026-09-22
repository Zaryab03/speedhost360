// PLACEHOLDER DATA — every entry here is a structural stand-in, not a real
// project. No client names, results or metrics are fabricated; replace each
// field with real project details before this page goes live. See
// content/placeholders/README.md.

export type CaseStudy = {
  slug: string;
  isPlaceholder: true;
  projectName: string;
  industry: string;
  services: string[];
  technology: string[];
  challenge: string;
  solution: string;
  gallery: { alt: string }[];
  resultsNote: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "placeholder-project-one",
    isPlaceholder: true,
    projectName: "[Replace with real project name]",
    industry: "[Client industry]",
    services: ["Web Development", "Web Hosting"],
    technology: ["Next.js", "SpeedHost360 Hosting"],
    challenge:
      "[Describe the real business problem this project solved, replace before publishing.]",
    solution:
      "[Describe what was actually built and why, replace before publishing.]",
    gallery: [{ alt: "[Replace with real project screenshot]" }],
    resultsNote:
      "Results will be published here only once verified with the client.",
  },
  {
    slug: "placeholder-project-two",
    isPlaceholder: true,
    projectName: "[Replace with real project name]",
    industry: "[Client industry]",
    services: ["Managed Hosting", "Digital Marketing"],
    technology: ["Managed Infrastructure", "SEO"],
    challenge:
      "[Describe the real business problem this project solved, replace before publishing.]",
    solution:
      "[Describe what was actually built and why, replace before publishing.]",
    gallery: [{ alt: "[Replace with real project screenshot]" }],
    resultsNote:
      "Results will be published here only once verified with the client.",
  },
  {
    slug: "placeholder-project-three",
    isPlaceholder: true,
    projectName: "[Replace with real project name]",
    industry: "[Client industry]",
    services: ["Web Development", "Digital Marketing"],
    technology: ["E-commerce", "Paid Campaigns"],
    challenge:
      "[Describe the real business problem this project solved, replace before publishing.]",
    solution:
      "[Describe what was actually built and why, replace before publishing.]",
    gallery: [{ alt: "[Replace with real project screenshot]" }],
    resultsNote:
      "Results will be published here only once verified with the client.",
  },
];
