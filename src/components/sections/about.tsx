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

        <div className="mt-20 md:mt-28">
          <p className="label-mono mb-6" data-reveal>
            Method
          </p>
          <ol className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {about.method.map((m, i) => (
              <li
                key={m.step}
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                className="group relative border-b border-line py-8 pr-6 sm:odd:border-r sm:even:pl-6 lg:border-r lg:pl-6 lg:first:pl-0 lg:last:border-r-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-[-1px] left-0 h-px w-0 bg-accent transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-full"
                />
                <p className="font-mono text-[11px] text-subtle">0{i + 1}</p>
                <h3 className="mt-4 text-2xl tracking-tight text-fg">{m.step}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
