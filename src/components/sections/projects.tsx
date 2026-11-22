import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/button-link";
import { ProjectVisual } from "@/components/projects/project-visual";
import { StackLine } from "@/components/projects/stack-line";

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

        <div className="flex flex-col">
          {projects.map((p, i) => (
            <article
              key={p.slug}
              aria-labelledby={`project-${p.slug}`}
              className="border-t border-line pt-10 pb-24 last:pb-0 sm:pt-14 sm:pb-32"
            >
              {/* title band */}
              <header className="grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal>
                <div className="flex items-start gap-5 lg:col-span-8 sm:gap-8">
                  <span className="pt-3 font-mono text-[12px] text-accent sm:pt-5">{p.index}</span>
                  <div>
                    <h3 id={`project-${p.slug}`} className="display text-[clamp(3rem,9vw,7rem)]">
                      {p.name}
                    </h3>
                    <p className="mt-4 max-w-xl text-lg text-fg sm:text-xl">{p.tagline}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-7 gap-y-3 pl-10 sm:pl-14 lg:col-span-4 lg:justify-end lg:pl-0">
                  <TextLink href={`/projects/${p.slug}`} arrow="right" className="text-[15px]">
                    Read the case study
                  </TextLink>
                  <TextLink href={p.repo} external arrow="up-right" className="text-muted">
                    Source on GitHub
                  </TextLink>
                </div>
              </header>

              <div className="mt-12 grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
                <div className={`lg:col-span-5 ${i % 2 ? "lg:order-2" : ""}`} data-reveal>
                  <p className="text-[17px] leading-relaxed text-fg/90">{p.summary}</p>

                  <dl className="mt-10 space-y-8">
                    <div>
                      <dt className="label-mono mb-3">The problem</dt>
                      <dd className="text-[15px] leading-relaxed text-muted">{p.problem}</dd>
                    </div>
                    <div>
                      <dt className="label-mono mb-3">Key features</dt>
                      <dd>
                        <ul className="divide-y divide-line border-y border-line text-[15px] text-fg">
                          {p.features.slice(0, 4).map((f, n) => (
                            <li key={f} className="flex gap-4 py-2.5">
                              <span className="w-5 shrink-0 font-mono text-[11px] leading-[22px] text-subtle">
                                {String(n + 1).padStart(2, "0")}
                              </span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>

                  <StackLine stack={p.stack} className="mt-8" />
                </div>

                <div
                  className={`lg:sticky lg:top-24 lg:col-span-7 ${i % 2 ? "lg:order-1" : ""}`}
                  data-reveal
                  style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
                >
                  <ProjectVisual visual={p.visual} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
