type Props = {
  index: string;
  label: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  id?: string;
};

export function SectionHeading({ index, label, title, lead, id }: Props) {
  return (
    <header className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12" data-reveal>
      <div className="md:col-span-3">
        <p className="label-mono flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
          {label}
        </p>
      </div>
      <div className="md:col-span-9">
        <h2 id={id} className="display text-4xl text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        {lead && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{lead}</p>}
      </div>
    </header>
  );
}
