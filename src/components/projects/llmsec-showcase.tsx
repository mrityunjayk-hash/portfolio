import type { Project } from "@/content/projects";
import { CanaryStage } from "./canary-stage";
import { ProbeCatalogue } from "./probe-catalogue";
import { ProjectLinks } from "./project-links";
import { StackLine } from "./stack-line";
import { RevealWords } from "@/components/ui/reveal-words";

/** LLMSec: typography-led intro, a full-width three-act demonstration, then the probe index. */
export function LlmsecShowcase({ project: p }: { project: Project }) {
  return (
    <article aria-labelledby="project-llmsec" className="relative isolate pt-8 pb-32 sm:pb-48">
      <div
        aria-hidden="true"
        className="absolute top-40 -left-40 -z-10 h-[640px] w-[640px] max-w-full rounded-full bg-[radial-gradient(circle,rgba(198,244,50,0.05),transparent_65%)]"
      />

      <div className="container-x">
        <header className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h3 id="project-llmsec" className="font-display text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.9] font-semibold tracking-[-0.02em]" data-reveal="words">
              <RevealWords segments={[p.name]} />
            </h3>
            <p className="mt-6 max-w-xl text-xl text-fg sm:text-2xl" data-reveal="blur" style={{ "--reveal-delay": "200ms" } as React.CSSProperties}>
              {p.tagline}
            </p>
          </div>
          <div className="lg:col-span-5" data-reveal="right" style={{ "--reveal-delay": "300ms" } as React.CSSProperties}>
            <p className="text-[17px] leading-relaxed text-muted">{p.summary}</p>
            <ProjectLinks project={p} className="mt-7" />
          </div>
        </header>

        <div className="mt-24 sm:mt-32">
          <CanaryStage />
        </div>

        <div className="mt-28 sm:mt-36" data-reveal="scale">
          <ProbeCatalogue />
        </div>

        <div className="mt-24 grid gap-12 sm:mt-32 md:grid-cols-3 md:gap-10" data-reveal="stagger">
          <div style={{ "--si": 0 } as React.CSSProperties}>
            <h4 className="text-[15px] font-medium text-fg">Why it exists</h4>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.problem}</p>
          </div>
          <div style={{ "--si": 2 } as React.CSSProperties}>
            <h4 className="text-[15px] font-medium text-fg">What it checks</h4>
            <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div style={{ "--si": 4 } as React.CSSProperties}>
            <h4 className="text-[15px] font-medium text-fg">Built with</h4>
            <StackLine stack={p.stack} className="mt-3" />
            {p.roadmap && (
              <>
                <h4 className="mt-8 text-[15px] font-medium text-fg">Next on the roadmap</h4>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.roadmap.join(" · ")}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
