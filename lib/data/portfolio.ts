// Live client sites we've built or host, shown on /portfolio. Only add sites
// the client is happy to have listed. While empty, /portfolio shows an empty
// state and stays out of the sitemap and search index.

export type PortfolioItem = {
  name: string;
  liveUrl: string;
  services: string[];
  summary: string;
  /** Screenshot path under /public. */
  image?: { src: string; alt: string };
  /** Slug of a matching case study, if one exists. */
  caseStudySlug?: string;
};

export const portfolioItems: PortfolioItem[] = [];
