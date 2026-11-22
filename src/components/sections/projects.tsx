import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { GithubIcon } from "@/components/ui/icons";
import { ProjectVisual } from "@/components/projects/project-visual";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="02"
          label="Projects"
          id="projects-title"
          title={
            <>
              Tools I built to understand <span className="text-muted">how attacks actually work.</span>
            </>
          }
          lead="Both are open source, dependency-free Python. The visuals beside each project are interactive illustrations of how the tool works — not screenshots."
        />

        <div className="flex flex-col gap-24 sm:gap-32">
          {projects.map((p, i) => (
            <article key={p.slug} aria-labelledby={`project-${p.slug}`} className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
              <div className={`flex flex-col lg:col-span-5 ${i % 2 ? "lg:order-2" : ""}`} data-reveal>
                <p className="label-mono flex items-center gap-3">
                  <span className="text-accent">{p.index}</span> Case file
                  <span className="h-px flex-1 bg-line" aria-hidden="true" />
                  {p.license}
                </p>
                <h3 id={`project-${p.slug}`} className="display mt-6 text-5xl sm:text-6xl">
                  {p.name}
                </h3>
                <p className="mt-4 text-lg text-fg">{p.tagline}</p>
                <p className="mt-4 leading-relaxed text-muted">{p.summary}</p>

                <dl className="mt-8 space-y-5 border-t border-line pt-6">
                  <div>
                    <dt className="label-mono mb-2">Problem</dt>
                    <dd className="text-[15px] leading-relaxed text-muted">{p.problem}</dd>
                  </div>
                  <div>
                    <dt className="label-mono mb-2">Key features</dt>
                    <dd>
                      <ul className="space-y-1.5 text-[15px] text-fg">
                        {p.features.slice(0, 4).map((f) => (
                          <li key={f} className="flex gap-3">
                            <span className="mt-[9px] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>

                <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
                  {p.stack.map((s) => (
                    <li key={s} className="rounded-[3px] border border-line px-2 py-1 font-mono text-[11px] text-muted">
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group inline-flex h-11 items-center gap-2 rounded-[4px] bg-fg px-4 text-sm font-medium text-bg transition-colors hover:bg-accent"
                  >
                    Read the case study
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </Link>
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-[4px] border border-line-strong px-4 text-sm text-fg transition-colors hover:border-fg/40"
                  >
                    <GithubIcon className="h-4 w-4" /> Source
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </div>
              </div>

              <div className={`lg:col-span-7 ${i % 2 ? "lg:order-1" : ""}`} data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
                <ProjectVisual visual={p.visual} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
