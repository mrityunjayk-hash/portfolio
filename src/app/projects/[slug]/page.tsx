import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import { CtaLink, TextLink } from "@/components/ui/button-link";
import { StackLine } from "@/components/projects/stack-line";
import { ProjectVisual } from "@/components/projects/project-visual";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.tagline}`,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: `${p.name} — ${p.tagline}`, description: p.summary, url: `/projects/${p.slug}`, type: "article" },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];

  return (
    <article className="pt-[calc(var(--header-h)+48px)] pb-24">
      <div className="container-x">
        <Link href="/#projects" className="label-mono inline-flex items-center gap-2 transition-colors hover:text-fg">
          <ArrowLeft size={14} aria-hidden="true" /> All projects
        </Link>

        <header className="mt-10 grid gap-8 border-b border-line pb-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="label-mono fade-in">
              <span className="text-accent">{p.index}</span> · Case study · {p.license} licensed
            </p>
            <h1 className="display mt-5 text-6xl sm:text-8xl">
              <span className="line-mask">
                <span>{p.name}</span>
              </span>
            </h1>
            <p className="fade-in mt-6 max-w-2xl text-xl text-fg sm:text-2xl" style={{ "--d": "200ms" } as React.CSSProperties}>
              {p.tagline}
            </p>
          </div>
          <div className="fade-in flex flex-col justify-end gap-3 lg:col-span-4 lg:items-end" style={{ "--d": "300ms" } as React.CSSProperties}>
            <CtaLink href={p.repo} external arrow="up-right">
              View source on GitHub
            </CtaLink>
            {p.demo && (
              <TextLink href={p.demo} external arrow="up-right">
                Live demo
              </TextLink>
            )}
          </div>
        </header>

        <div className="grid gap-14 py-14 lg:grid-cols-12">
          <aside className="min-w-0 lg:col-span-4">
            <dl className="space-y-8 lg:sticky lg:top-28">
              <div>
                <dt className="label-mono mb-3">Stack</dt>
                <dd>
                  <StackLine stack={p.stack} />
                </dd>
              </div>
              <div>
                <dt className="label-mono mb-3">Features</dt>
                <dd>
                  <ul className="space-y-2 text-[15px] text-fg">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-3">
                        <span className="mt-[10px] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </aside>

          <div className="min-w-0 space-y-14 lg:col-span-8">
            <section data-reveal aria-labelledby="problem">
              <h2 id="problem" className="label-mono mb-4">
                The problem
              </h2>
              <p className="text-xl leading-relaxed text-fg">{p.problem}</p>
            </section>

            <section data-reveal aria-label="Interactive illustration">
              <ProjectVisual visual={p.visual} />
            </section>

            <section data-reveal aria-labelledby="impl">
              <h2 id="impl" className="label-mono mb-6">
                How it works
              </h2>
              <ol className="border-t border-line">
                {p.implementation.map((item, i) => (
                  <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-2 border-b border-line py-5">
                    <span className="font-mono text-[11px] text-subtle">{String(i + 1).padStart(2, "0")}</span>
                    <p className="leading-relaxed text-muted">{item}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section data-reveal aria-labelledby="usage">
              <h2 id="usage" className="label-mono mb-6">
                Usage
              </h2>
              <div className="space-y-4">
                {p.usage.map((u) => (
                  <figure key={u.label} className="overflow-hidden rounded-[6px] border border-line bg-surface">
                    <figcaption className="border-b border-line px-4 py-2 font-mono text-[11px] text-subtle">{u.label}</figcaption>
                    <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-fg">
                      <code>
                        <span className="text-subtle select-none">$ </span>
                        {u.command}
                      </code>
                    </pre>
                  </figure>
                ))}
              </div>
            </section>

            {p.roadmap && (
              <section data-reveal aria-labelledby="roadmap">
                <h2 id="roadmap" className="label-mono mb-2">
                  Roadmap
                </h2>
                <p className="mb-5 text-[14px] text-subtle">Planned in the repository — not implemented yet.</p>
                <ul className="divide-y divide-dashed divide-line border-y border-dashed border-line">
                  {p.roadmap.map((r) => (
                    <li key={r} className="flex items-center justify-between gap-4 py-3 text-[15px] text-muted">
                      {r}
                      <span className="font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">planned</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        {next.slug !== p.slug && (
          <Link
            href={`/projects/${next.slug}`}
            className="group flex flex-col gap-2 border-t border-line pt-10 sm:flex-row sm:items-end sm:justify-between"
          >
            <span>
              <span className="label-mono">Next case file</span>
              <span className="display mt-3 block text-5xl transition-colors group-hover:text-accent sm:text-6xl">{next.name}</span>
            </span>
            <ArrowRight className="h-8 w-8 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}
