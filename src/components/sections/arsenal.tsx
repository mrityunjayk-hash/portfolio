import { arsenal, type ArsenalGroup } from "@/content/arsenal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechMark } from "@/components/ui/tech-mark";
import { ArsenalMark } from "@/components/arsenal/arsenal-mark";

export function Arsenal() {
  const featured = arsenal.find((g) => g.featured)!;
  const rest = arsenal.filter((g) => !g.featured);
  const branded = rest.flatMap((g) => g.items).filter((i) => i.logo);

  return (
    <section id="arsenal" aria-labelledby="arsenal-title" className="relative overflow-hidden border-t border-line py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="04"
          label="Arsenal"
          id="arsenal-title"
          title={
            <>
              Technical arsenal. <span className="text-muted">What I work with, and what for.</span>
            </>
          }
          lead="No ratings or percentage bars — just the disciplines, tools and platforms the work actually runs on. Hover or focus a tool for context."
        />
      </div>

      {/* Slow logo marquee — decorative; every item is listed accessibly below. */}
      <div
        aria-hidden="true"
        className="group/marquee relative border-y border-line py-7 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        <div className="marquee flex w-max group-hover/marquee:[animation-play-state:paused]">
          {[0, 1].map((dup) => (
            <ul key={dup} className="flex shrink-0 items-center gap-14 pr-14">
              {branded.map((item) => (
                <li key={`${dup}-${item.name}`} className="group flex items-center gap-3 text-muted">
                  <TechMark logo={item.logo} size={22} />
                  <span className="font-mono text-[12px] tracking-[0.04em] whitespace-nowrap uppercase transition-colors group-hover:text-fg">
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="container-x">
        {/* Primary focus */}
        <div className="grid gap-10 py-16 sm:py-20 lg:grid-cols-12" data-reveal>
          <div className="lg:col-span-4">
            <p className="label-mono flex items-center gap-2 text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" /> Primary focus
            </p>
            <h3 className="display mt-6 text-5xl sm:text-6xl">
              Offensive
              <br />
              <span className="text-muted">Security</span>
            </h3>
            <p className="mt-6 max-w-xs leading-relaxed text-muted">{featured.blurb}</p>
          </div>
          <ul className="grid self-end sm:grid-cols-2 sm:gap-x-10 lg:col-span-8">
            {featured.items.map((item, i) => (
              <li key={item.name} className="group flex gap-4 border-t border-line py-4">
                <span className="w-6 shrink-0 font-mono text-[11px] leading-6 text-subtle transition-colors group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-[16px] leading-6 text-fg">{item.name}</p>
                  {item.note && <p className="mt-1 text-[13px] leading-snug text-subtle">{item.note}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Toolkit rows */}
        <div className="border-b border-line">
          {rest.map((g, i) => (
            <ToolkitRow key={g.id} group={g} index={i + 1} large={g.id === "tools"} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolkitRow({ group, index, large }: { group: ArsenalGroup; index: number; large?: boolean }) {
  return (
    <div className="grid gap-6 border-t border-line py-10 lg:grid-cols-12 lg:gap-10" data-reveal>
      <div className="lg:col-span-3">
        <p className="font-mono text-[11px] text-subtle">
          {String(index).padStart(2, "0")} — {String(group.items.length).padStart(2, "0")} items
        </p>
        <h3 className={`mt-3 tracking-tight text-fg ${large ? "text-3xl" : "text-2xl"}`}>{group.title}</h3>
        <p className="mt-2 text-[14px] text-muted">{group.blurb}</p>
      </div>
      <ul
        className={`grid gap-x-2 gap-y-1 lg:col-span-9 ${
          large ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5"
        }`}
      >
        {group.items.map((item) => {
          const tipId = item.note ? `tip-${group.id}-${slug(item.name)}` : undefined;
          return (
            <li key={item.name} className="group/tip relative">
              <div
                tabIndex={item.note ? 0 : undefined}
                aria-describedby={tipId}
                className={`group flex items-center gap-3.5 rounded-[2px] px-3 text-muted transition-colors duration-300 outline-none hover:bg-white/[0.025] hover:text-fg focus-visible:bg-white/[0.025] focus-visible:text-fg ${
                  large ? "py-4" : "py-3"
                }`}
              >
                <ArsenalMark item={item} size={large ? 26 : 22} />
                <span className={`leading-tight ${large ? "text-[15px]" : "text-[14px]"}`}>{item.name}</span>
              </div>
              {item.note && (
                <span
                  role="tooltip"
                  id={tipId}
                  className="pointer-events-none absolute bottom-[calc(100%+4px)] left-3 z-20 w-max max-w-[220px] translate-y-1 rounded-[2px] border border-line-strong bg-surface-2 px-3 py-2 text-[12px] leading-snug text-muted opacity-0 shadow-xl transition-all duration-200 group-hover/tip:translate-y-0 group-hover/tip:opacity-100 group-focus-within/tip:translate-y-0 group-focus-within/tip:opacity-100"
                >
                  {item.note}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
