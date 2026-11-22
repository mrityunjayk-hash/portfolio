import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { certifications, fieldWork } from "@/content/credentials";

export function Credentials() {
  return (
    <section id="certification" aria-labelledby="credentials-title" className="relative border-t border-line py-24 sm:py-32">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-14">
        {/* Field work */}
        <div className="lg:col-span-7">
          <p className="label-mono flex items-center gap-3" data-reveal>
            <span className="text-accent">05</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            Field work
          </p>
          <h2 id="credentials-title" className="display mt-6 text-4xl sm:text-5xl" data-reveal>
            Where the practice happens.
          </h2>
          <ol className="mt-10 border-t border-line">
            {fieldWork.map((f, i) => (
              <li
                key={f.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                className="grid gap-3 border-b border-line py-7 sm:grid-cols-[2.5rem_1fr]"
              >
                <span className="font-mono text-[11px] text-subtle">0{i + 1}</span>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-xl tracking-tight text-fg">{f.title}</h3>
                    <p className="label-mono">{f.context}</p>
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.body}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {f.tags.map((t) => (
                      <li key={t} className="rounded-[3px] border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Certification */}
        <div className="lg:col-span-5">
          <p className="label-mono flex items-center gap-3" data-reveal>
            <span className="text-accent">06</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            Certification
          </p>
          <div className="mt-6 space-y-4 lg:sticky lg:top-28">
            {certifications.map((c) => (
              <article key={c.short} data-reveal className="panel group relative overflow-hidden p-6 sm:p-8">
                <div aria-hidden="true" className="hairline-grid absolute inset-0 opacity-30 [mask-image:linear-gradient(135deg,black,transparent_60%)]" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <p className="display text-6xl sm:text-7xl">{c.short}</p>
                    <BadgeCheck className="mt-2 h-6 w-6 text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-lg tracking-tight text-fg">{c.name}</h3>
                  <p className="label-mono mt-1">
                    {c.issuer}
                    {c.date && <> · {c.date}</>}
                  </p>
                  <ul className="mt-6 space-y-2 border-t border-line pt-5" aria-label="Exam domains">
                    {c.scope.map((s) => (
                      <li key={s} className="flex gap-3 text-[14px] text-muted">
                        <span className="mt-[9px] h-px w-3 shrink-0 bg-line-strong" aria-hidden="true" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  {c.verifyUrl && (
                    <a
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-1.5 text-sm text-fg underline decoration-accent underline-offset-4"
                    >
                      Verify credential <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
