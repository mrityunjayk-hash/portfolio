import { about } from "@/content/about";
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
        <h2 id="about-title" className="font-display text-2xl font-medium text-fg" data-reveal="left">
          About
        </h2>
        <p
          className="mt-10 max-w-4xl text-[clamp(1.2rem,2.1vw,1.6rem)] leading-[1.65] text-muted"
          data-reveal="blur"
          style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
        >
          <Highlighted text={about.paragraph} />
        </p>
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
