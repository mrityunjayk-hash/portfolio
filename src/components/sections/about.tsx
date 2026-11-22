import { about } from "@/content/about";
import { RevealWords } from "@/components/ui/reveal-words";
import { Parallax } from "@/components/ui/parallax";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      {/* background detail drifting slower than the content */}
      <Parallax distance={120} className="pointer-events-none absolute top-0 -right-40 -z-10 h-[560px] w-[560px]">
        <div
          aria-hidden="true"
          className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(198,244,50,0.06),transparent_65%)]"
        />
      </Parallax>

      <div className="container-x">
        <p className="font-display text-2xl font-medium text-fg" data-reveal="left">
          About
        </p>
        <h2
          id="about-title"
          className="display mt-8 text-[clamp(2.6rem,7vw,5.5rem)] font-bold text-balance"
          data-reveal="words"
        >
          {about.title.map((line, l) => (
            <span key={line} className="block">
              <RevealWords segments={[line]} startIndex={l * 3} />
            </span>
          ))}
        </h2>

        <div className="mt-12 max-w-4xl space-y-6 text-[17px] leading-[1.75] text-muted sm:mt-14 sm:text-lg">
          {about.paragraphs.map((p, i) => (
            <p key={i} data-reveal="blur" style={{ "--reveal-delay": `${150 + i * 140}ms` } as React.CSSProperties}>
              <Highlighted text={p} />
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Renders **phrase** segments as highlighted text with an accent sweep. */
function Highlighted({ text }: { text: string }) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 ? (
      <strong key={i} className="mark font-semibold text-fg">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}
