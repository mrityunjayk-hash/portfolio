import { arsenal, type ArsenalGroup } from "@/content/arsenal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Arsenal() {
  const [featured, ...rest] = [...arsenal].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

  return (
    <section id="arsenal" aria-labelledby="arsenal-title" className="relative border-t border-line py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="04"
          label="Arsenal"
          id="arsenal-title"
          title={
            <>
              Technical arsenal. <span className="text-muted">No percentage bars.</span>
            </>
          }
          lead="What I work with and what I use it for. Hover or focus an item for context."
        />

        <div className="grid gap-4 lg:grid-cols-12">
          <Featured group={featured} />
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {rest.map((g, i) => (
              <Group key={g.id} group={g} delay={i * 60} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Featured({ group }: { group: ArsenalGroup }) {
  return (
    <div data-reveal className="panel relative overflow-hidden p-6 sm:p-8 lg:col-span-5">
      <div aria-hidden="true" className="hairline-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
      <div aria-hidden="true" className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(198,244,50,0.1),transparent_65%)]" />
      <div className="relative">
        <p className="label-mono flex items-center gap-2 text-accent">
          <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" /> Primary focus
        </p>
        <h3 className="display mt-6 text-4xl sm:text-5xl">{group.title}</h3>
        <p className="mt-4 max-w-sm text-muted">{group.blurb}</p>
        <ul className="mt-8 border-t border-line">
          {group.items.map((item) => (
            <li key={item.name} className="group border-b border-line">
              <div tabIndex={item.note ? 0 : undefined} className="flex flex-col gap-0.5 py-3 outline-none">
                <span className="text-[15px] text-fg transition-colors group-hover:text-accent group-focus-within:text-accent">
                  {item.name}
                </span>
                {item.note && (
                  <span className="text-[13px] text-subtle transition-colors group-hover:text-muted group-focus-within:text-muted">
                    {item.note}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Group({ group, delay }: { group: ArsenalGroup; delay: number }) {
  return (
    <div
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className="panel flex flex-col p-6"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg tracking-tight text-fg">{group.title}</h3>
        <span className="font-mono text-[11px] text-subtle">{String(group.items.length).padStart(2, "0")}</span>
      </div>
      <p className="mt-1 text-[13px] text-subtle">{group.blurb}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {group.items.map((item) => (
          <li key={item.name} className="group/tip relative">
            <span
              tabIndex={item.note ? 0 : undefined}
              aria-describedby={item.note ? `tip-${group.id}-${slug(item.name)}` : undefined}
              className={`inline-flex rounded-[3px] border border-line bg-bg/40 px-2.5 py-1.5 font-mono text-[12px] text-fg transition-colors ${
                item.note ? "cursor-help hover:border-line-strong focus-visible:border-accent" : ""
              }`}
            >
              {item.name}
            </span>
            {item.note && (
              <span
                role="tooltip"
                id={`tip-${group.id}-${slug(item.name)}`}
                className="pointer-events-none absolute bottom-[calc(100%+8px)] left-0 z-20 w-max max-w-[240px] translate-y-1 rounded-[4px] border border-line-strong bg-surface-2 px-3 py-2 text-[12px] leading-snug text-muted opacity-0 shadow-xl transition-all duration-200 group-hover/tip:translate-y-0 group-hover/tip:opacity-100 group-focus-within/tip:translate-y-0 group-focus-within/tip:opacity-100"
              >
                {item.note}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
