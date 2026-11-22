import { RevealWords } from "@/components/ui/reveal-words";
import { fieldWork } from "@/content/credentials";
import { TechMark } from "@/components/ui/tech-mark";

export function FieldWork() {
  return (
    <section id="field-work" aria-labelledby="field-work-title" className="relative border-t border-line py-24 sm:py-32">
      <div className="container-x">
        <div className="max-w-4xl">
          <p className="font-display text-2xl font-medium text-fg" data-reveal="left">
            Field work
          </p>
          <h2 id="field-work-title" className="display mt-6 text-4xl sm:text-5xl" data-reveal="words">
            <RevealWords segments={["Where the practice happens."]} />
          </h2>
          <ol className="mt-10 border-t border-line">
            {fieldWork.map((f, i) => (
              <li
                key={f.title}
                data-reveal="left"
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                className="grid gap-3 border-b border-line py-7 sm:grid-cols-[2.5rem_1fr]"
              >
                <span className="font-mono text-[11px] text-subtle">0{i + 1}</span>
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    <h3 className="text-xl tracking-tight text-fg">{f.title}</h3>
                    <p className="group flex items-center gap-2.5 text-muted">
                      {f.logos?.map((l) => (
                        <TechMark key={l} logo={l} size={15} />
                      ))}
                      <span className="label-mono">{f.context}</span>
                    </p>
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.body}</p>
                  <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.04em] text-subtle uppercase">
                    {f.tags.map((t, n) => (
                      <li key={t} className="flex items-center gap-3">
                        {n > 0 && <span aria-hidden="true" className="h-[3px] w-[3px] rounded-full bg-line-strong" />}
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
