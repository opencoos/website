import type { MetadataRoute } from "next";
import { docsNav } from "@/lib/content/docs-nav";
import { absoluteUrl } from "@/lib/site";
import { getChangelog, getDomains, getEntities } from "@/lib/spec/load";

export default function sitemap(): MetadataRoute.Sitemap {
  // The date of the latest specification change; content is regenerated from it.
  const lastModified = getChangelog().entries[0]?.date;
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "weekly") => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1),
    entry("/standard", 0.9),
    entry("/data-model", 0.9),
    entry("/standard/jurisdictions", 0.8),
    entry("/docs", 0.8),
    ...getDomains().map((d) => entry(`/standard/${d.id}`, 0.7)),
    entry("/standard/shared-definitions", 0.6),
    ...docsNav.flatMap((g) => g.items).filter((i) => i.href !== "/docs").map((i) => entry(i.href, 0.6)),
    ...getEntities().map((e) => entry(`/data-model/${e.name}`, 0.6)),
    entry("/use-cases", 0.6, "monthly"),
    entry("/about", 0.5, "monthly"),
    entry("/contribute", 0.5, "monthly"),
    entry("/governance", 0.5, "monthly"),
    entry("/changelog", 0.5),
  ];
}
