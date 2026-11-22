import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { getPosts } from "@/lib/research";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await getPosts()).filter((p) => !p.draft);
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...posts.map((p) => ({ url: `${site.url}/research/${p.slug}`, lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
