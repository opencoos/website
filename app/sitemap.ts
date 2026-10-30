import type { MetadataRoute } from "next";
import { docsNav } from "@/lib/content/docs-nav";
import { absoluteUrl } from "@/lib/site";
import { getDomains, getEntities } from "@/lib/spec/load";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "/",
    "/standard",
    "/standard/jurisdictions",
    "/standard/shared-definitions",
    "/data-model",
    "/use-cases",
    "/governance",
    "/about",
    "/contribute",
    "/changelog",
    ...docsNav.flatMap((g) => g.items.map((i) => i.href)),
    ...getDomains().map((d) => `/standard/${d.id}`),
    ...getEntities().map((e) => `/data-model/${e.name}`),
  ];
  return pages.map((path) => ({ url: absoluteUrl(path) }));
}
