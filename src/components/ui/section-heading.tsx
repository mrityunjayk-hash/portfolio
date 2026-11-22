import { RevealWords } from "./reveal-words";

type Props = {
  label: string;
  /** Title words; `{ text, muted: true }` segments render muted. */
  title: React.ComponentProps<typeof RevealWords>["segments"];
  lead?: React.ReactNode;
  id?: string;
};

export function SectionHeading({ label, title, lead, id }: Props) {
  return (
    <header className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12">
      <div className="md:col-span-3">
        <p className="font-display text-2xl font-medium text-fg" data-reveal="left">
          {label}
        </p>
      </div>
      <div className="md:col-span-9">
        <h2 id={id} className="display text-4xl text-balance sm:text-5xl lg:text-6xl" data-reveal="words">
          <RevealWords segments={title} />
        </h2>
        {lead && (
          <p
            className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
            data-reveal="blur"
            style={{ "--reveal-delay": "350ms" } as React.CSSProperties}
          >
            {lead}
          </p>
        )}
      </div>
    </header>
  );
}
