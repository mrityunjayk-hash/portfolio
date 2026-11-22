import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import type { ResearchCategoryId } from "@/content/research-focus";

/**
 * Research articles live in src/content/research/<slug>.mdx and export:
 *
 *   export const metadata = {
 *     title: "…", summary: "…", category: "web", date: "2026-12-01",
 *     tags: ["Burp Suite"], draft: false,
 *   }
 *
 * Files starting with "_" (e.g. _template.mdx) are ignored.
 * Drafts are only listed in development.
 */

export type PostMeta = {
  title: string;
  summary: string;
  category: ResearchCategoryId;
  date: string;
  tags: string[];
  draft?: boolean;
};

export type Post = PostMeta & { slug: string; readingMinutes: number };

const DIR = path.join(process.cwd(), "src/content/research");
const showDrafts = process.env.NODE_ENV !== "production";

function slugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function readingMinutes(slug: string) {
  const words = fs.readFileSync(path.join(DIR, `${slug}.mdx`), "utf8").split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

async function load(slug: string) {
  const mod = (await import(`@/content/research/${slug}.mdx`)) as {
    default: ComponentType;
    metadata: PostMeta;
  };
  return mod;
}

export async function getPosts(): Promise<Post[]> {
  const posts = await Promise.all(
    slugs().map(async (slug) => {
      const { metadata } = await load(slug);
      return { ...metadata, slug, readingMinutes: readingMinutes(slug) };
    }),
  );
  return posts
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getPost(slug: string) {
  if (!slugs().includes(slug)) return null;
  const { default: Content, metadata } = await load(slug);
  if (metadata.draft && !showDrafts) return null;
  return { meta: { ...metadata, slug, readingMinutes: readingMinutes(slug) } as Post, Content };
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
