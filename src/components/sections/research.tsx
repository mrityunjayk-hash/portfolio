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
          <ul className="grid gap-px overflow-hidden rounded-[6px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {researchFocus.map((f, i) => (
              <li
                key={f.code}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="group flex flex-col bg-bg p-6 transition-colors duration-500 hover:bg-surface"
              >
                <span className="font-mono text-[11px] text-subtle transition-colors group-hover:text-accent">{f.code}</span>
                <h4 className="mt-8 text-lg leading-snug tracking-tight text-fg">{f.title}</h4>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
