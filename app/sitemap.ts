import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data/site";
import { serviceList } from "@/lib/data/services";
import { caseStudies } from "@/lib/data/case-studies";
import { getPublishedPosts } from "@/lib/blog";

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
    { url: `${siteConfig.url}/case-studies`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/gallery`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/terms-of-service`, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Placeholder case studies are noindex until real content replaces them,
  // so they're intentionally left out of the sitemap until then.
  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies
    .filter((s) => !s.isPlaceholder)
    .map((s) => ({
      url: `${siteConfig.url}/case-studies/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  const posts = await getPublishedPosts();
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...postRoutes];
}
