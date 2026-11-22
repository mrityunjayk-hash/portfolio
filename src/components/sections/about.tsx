import { about } from "@/content/about";
import { SectionHeading } from "@/components/ui/section-heading";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading index="01" label="About" id="about-title" title={about.statement} />

        <div className="grid gap-10 md:grid-cols-12">
          <div className="space-y-6 text-[17px] leading-relaxed text-muted md:col-span-8 md:col-start-4 lg:col-span-7 lg:col-start-4">
            {about.paragraphs.map((p, i) => (
              <p key={i} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties} className={i === 0 ? "text-fg" : ""}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-24 md:mt-32">
          <div className="mb-8 flex items-baseline justify-between gap-6" data-reveal>
            <h3 className="label-mono">
              <span className="text-accent">Method</span> — how I approach a target
            </h3>
            <p className="label-mono hidden text-subtle md:block">04 stages</p>
          </div>

          <ol
            className="relative border-line max-lg:border-l lg:grid lg:grid-cols-4 lg:border lg:divide-x lg:divide-line"
            data-reveal
          >
            {about.method.map((m, i) => (
              <li
                key={m.step}
                className="group relative pb-10 pl-8 outline-none last:pb-0 lg:px-8 lg:py-10 lg:last:pb-10"
              >
                {/* node: on the left rail (mobile) or on the top edge (desktop) */}
                <span
                  aria-hidden="true"
                  className="absolute top-1 -left-[5px] h-[9px] w-[9px] rounded-full border border-line-strong bg-bg transition-colors duration-300 group-hover:border-accent group-hover:bg-accent lg:top-[-5px] lg:left-8"
                />
                {/* segment that draws along the top edge on hover (desktop) */}
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 hidden h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 lg:block"
                />
                <div className="flex items-baseline gap-4 lg:mt-6 lg:flex-col lg:gap-0">
                  <span className="font-mono text-[11px] tracking-[0.08em] text-subtle transition-colors group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")} / {String(about.method.length).padStart(2, "0")}
                  </span>
                  <h4 className="text-2xl tracking-tight text-fg lg:mt-6 lg:text-[28px]">{m.step}</h4>
                </div>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted transition-colors group-hover:text-fg/80 lg:mt-4">
                  {m.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
