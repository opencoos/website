import type { Metadata } from "next";
import { site } from "./site";

/**
 * Per-page metadata: title, description, canonical URL, and Open Graph / Twitter
 * tags that point at this page rather than inheriting the homepage's. The shared
 * Open Graph image comes from app/opengraph-image.tsx.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  /** Use `title` as-is instead of applying the "%s · OpenCOOS" template. */
  absoluteTitle?: boolean;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} · ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: site.name,
      locale: "en_CA",
      url: path,
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
