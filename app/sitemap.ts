import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data/site";
import { serviceList } from "@/lib/data/services";
import { getPublishedPosts } from "@/lib/blog";
import { caseStudies } from "@/lib/data/case-studies";
import { portfolioItems } from "@/lib/data/portfolio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/services`, changeFrequency: "monthly", priority: 0.9 },
    ...serviceList.map((s) => ({
      url: `${siteConfig.url}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/free-website-audit`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/terms-of-service`, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Case studies and portfolio are noindexed while empty, so only list them
  // once real entries exist.
  const workRoutes: MetadataRoute.Sitemap = [
    ...(caseStudies.length
      ? [{ url: `${siteConfig.url}/case-studies`, changeFrequency: "monthly" as const, priority: 0.7 }]
      : []),
    ...caseStudies.map((c) => ({
      url: `${siteConfig.url}/case-studies/${c.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...(portfolioItems.length
      ? [{ url: `${siteConfig.url}/portfolio`, changeFrequency: "monthly" as const, priority: 0.6 }]
      : []),
  ];

  const posts = await getPublishedPosts();
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...workRoutes, ...postRoutes];
}
