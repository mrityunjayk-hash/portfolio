import { getPosts } from "@/lib/research";
import { researchFocus } from "@/content/research-focus";
import { SectionHeading } from "@/components/ui/section-heading";
import { ResearchIndex } from "@/components/research/research-index";

export async function Research() {
  const posts = await getPosts();

  return (
    <section id="research" aria-labelledby="research-title" className="relative border-t border-line py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="03"
          label="Research"
          id="research-title"
          title={
            <>
              Research &amp; writeups <span className="text-muted">— notes from the field.</span>
            </>
          }
          lead="Technical writeups on web, API and AI application security. Findings from private programs stay private; what gets published here is cleared for disclosure or comes from my own labs and tools."
        />

        <ResearchIndex posts={posts} />

        <div className="mt-20">
          <div className="mb-6 flex items-baseline justify-between gap-4" data-reveal>
            <h3 className="label-mono">Areas of focus</h3>
            <p className="label-mono hidden text-subtle sm:block">Vulnerability classes I spend the most time on</p>
          </div>
          <ol className="border-t border-line">
            {researchFocus.map((f, i) => (
              <li
                key={f.code}
                data-reveal
                style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
                className="group grid gap-2 border-b border-line py-6 transition-colors duration-500 md:grid-cols-12 md:items-baseline md:gap-6"
              >
                <span className="font-mono text-[12px] text-subtle transition-colors group-hover:text-accent md:col-span-1">
                  {f.code}
                </span>
                <h4 className="text-xl tracking-tight text-fg transition-transform duration-500 ease-[var(--ease-out-expo)] md:col-span-4 md:group-hover:translate-x-1">
                  {f.title}
                </h4>
                <p className="text-[15px] leading-relaxed text-muted md:col-span-7">{f.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
