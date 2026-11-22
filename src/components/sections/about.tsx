import { about } from "@/content/about";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <p className="font-display text-2xl font-medium text-fg" data-reveal>
            About
          </p>
        <h2
          id="about-title"
          className="display mt-8 text-[clamp(2.6rem,7vw,5.5rem)] font-bold text-balance"
          data-reveal
        >
          {about.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div className="mt-12 max-w-4xl space-y-6 text-[17px] leading-[1.75] text-muted sm:mt-14 sm:text-lg">
          {about.paragraphs.map((p, i) => (
            <p key={i} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}>
              <Highlighted text={p} />
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Renders **phrase** segments as highlighted text. */
function Highlighted({ text }: { text: string }) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-semibold text-fg">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}
