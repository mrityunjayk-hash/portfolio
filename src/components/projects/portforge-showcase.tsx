import type { Project } from "@/content/projects";
import { FlagInstrument } from "./flag-instrument";
import { ProjectLinks } from "./project-links";
import { StackLine } from "./stack-line";

/** PortForge: a sticky narrative column beside a wide, borderless packet instrument. */
export function PortforgeShowcase({ project: p }: { project: Project }) {
  return (
    <article aria-labelledby="project-portforge" className="relative isolate pb-8">
      <div
        aria-hidden="true"
        className="hairline-grid absolute inset-y-0 right-0 -z-10 w-full opacity-40 [mask-image:radial-gradient(ellipse_55%_60%_at_70%_45%,black,transparent)] lg:w-2/3"
      />

      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4" data-reveal>
          <div className="lg:sticky lg:top-28">
            <h3 id="project-portforge" className="font-display text-[clamp(3rem,9vw,4rem)] leading-[0.92] font-semibold tracking-[-0.02em]">
              {p.name}
            </h3>
            <p className="mt-5 text-xl text-fg">{p.tagline}</p>
            <p className="mt-6 text-[16px] leading-relaxed text-muted">{p.summary}</p>
            <ProjectLinks project={p} className="mt-7" />

            <h4 className="mt-14 text-[15px] font-medium text-fg">Why it exists</h4>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.problem}</p>

            <h4 className="mt-10 text-[15px] font-medium text-fg">Highlights</h4>
            <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>

            <StackLine stack={p.stack} className="mt-10" />
          </div>
        </div>

        <div className="lg:col-span-8 lg:pt-4" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          <FlagInstrument />
        </div>
      </div>
    </article>
  );
}
