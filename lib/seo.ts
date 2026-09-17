import type { Metadata } from "next";
import { siteConfig } from "./data/site";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const resolvedImage = image ?? `/og?title=${encodeURIComponent(title)}`;
  const imageUrl = resolvedImage.startsWith("http")
    ? resolvedImage
    : `${siteConfig.url}${resolvedImage}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}
