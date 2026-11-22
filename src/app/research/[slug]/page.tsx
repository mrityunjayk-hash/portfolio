import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatDate, getPost, getPosts } from "@/lib/research";
import { categoryLabel } from "@/content/research-focus";
import { site } from "@/content/site";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/research/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const { meta } = post;
  return {
    title: meta.title,
    description: meta.summary,
    alternates: { canonical: `/research/${slug}` },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.summary,
      url: `/research/${slug}`,
      publishedTime: meta.date,
      authors: [site.name],
      tags: meta.tags,
    },
    robots: meta.draft ? { index: false, follow: false } : undefined,
  };
}

export default async function ArticlePage({ params }: PageProps<"/research/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const { meta, Content } = post;

  return (
    <article className="pt-[calc(var(--header-h)+48px)] pb-24">
      <div className="container-x">
        <Link href="/#research" className="label-mono inline-flex items-center gap-2 transition-colors hover:text-fg">
          <ArrowLeft size={14} aria-hidden="true" /> Research
        </Link>

        <header className="mx-auto mt-12 max-w-3xl border-b border-line pb-10">
          <p className="label-mono fade-in flex flex-wrap gap-x-3 gap-y-1">
            <span className="text-accent">{categoryLabel(meta.category)}</span>
            <time dateTime={meta.date}>{formatDate(meta.date)}</time>
            <span>{meta.readingMinutes} min read</span>
            {meta.draft && <span className="text-danger">Draft</span>}
          </p>
          <h1 className="display fade-in mt-6 text-4xl leading-[1.02] text-balance sm:text-6xl" style={{ "--d": "120ms" } as React.CSSProperties}>
            {meta.title}
          </h1>
          <p className="fade-in mt-6 text-lg leading-relaxed text-muted" style={{ "--d": "220ms" } as React.CSSProperties}>
            {meta.summary}
          </p>
          {meta.tags.length > 0 && (
            <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.04em] text-muted uppercase" aria-label="Technologies">
              {meta.tags.map((t, i) => (
                <li key={t} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden="true" className="h-[3px] w-[3px] rounded-full bg-line-strong" />}
                  {t}
                </li>
              ))}
            </ul>
          )}
        </header>

        <div className="prose-research mx-auto mt-12 max-w-3xl">
          <Content />
        </div>

        <footer className="mx-auto mt-16 max-w-3xl border-t border-line pt-8">
          <p className="text-muted">
            Written by <span className="text-fg">{site.name}</span>. Questions or corrections?{" "}
            <Link href="/#contact" className="text-fg underline decoration-accent underline-offset-4">
              Get in touch
            </Link>
            .
          </p>
        </footer>
      </div>
    </article>
  );
}
