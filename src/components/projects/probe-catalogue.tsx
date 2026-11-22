"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CATEGORIES, PROBE_COUNT, type CategoryId } from "./llmsec-data";

const severityCls = {
  critical: "text-danger",
  high: "text-fg",
  medium: "text-muted",
} as const;

/** LLMSec's probes, browsable by attack class. */
export function ProbeCatalogue() {
  const [cat, setCat] = useState<CategoryId>("prompt_injection");
  const category = CATEGORIES.find((c) => c.id === cat)!;
  const tabsId = useId();

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const i = CATEGORIES.findIndex((c) => c.id === cat);
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = CATEGORIES[(i + step + CATEGORIES.length) % CATEGORIES.length];
    setCat(next.id);
    document.getElementById(`${tabsId}-${next.id}`)?.focus();
  };

  return (
    <div className="@container">
      <div className="grid gap-10 @3xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] @3xl:gap-16">
        <div>
          <p className="text-[14px] text-subtle">
            {PROBE_COUNT} probes across {CATEGORIES.length} attack classes
          </p>
          <div
            role="tablist"
            aria-label="Probe category"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="mt-6 flex flex-wrap gap-x-5 gap-y-1 @3xl:flex-col @3xl:gap-0"
          >
            {CATEGORIES.map((c) => {
              const active = c.id === cat;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  id={`${tabsId}-${c.id}`}
                  aria-selected={active}
                  aria-controls={`${tabsId}-panel`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setCat(c.id)}
                  className={`group relative flex items-baseline gap-2 py-1 text-left font-display text-2xl font-medium transition-colors duration-300 @3xl:py-1.5 @3xl:pl-6 @3xl:text-[2.1rem] ${
                    active ? "text-fg" : "text-subtle hover:text-muted"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId={`${tabsId}-marker`}
                      aria-hidden="true"
                      className="absolute top-1/2 left-0 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent @3xl:block"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  {c.label}
                  <sup className="font-mono text-[11px] font-normal text-subtle">{c.probes.length}</sup>
                </button>
              );
            })}
          </div>
        </div>

        <div id={`${tabsId}-panel`} role="tabpanel" aria-labelledby={`${tabsId}-${cat}`} className="@3xl:pt-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul key={cat} initial="hidden" animate="show" exit="exit" className="space-y-1">
              {category.probes.map(([id, title, sev], i) => (
                <motion.li
                  key={id}
                  variants={{
                    hidden: { opacity: 0, x: 16 },
                    show: { opacity: 1, x: 0, transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                    exit: { opacity: 0, transition: { duration: 0.15 } },
                  }}
                  className="grid grid-cols-[4.75rem_1fr_auto] items-baseline gap-4 py-2.5"
                >
                  <span className="font-mono text-[12px] text-subtle">{id}</span>
                  <span className="text-[17px] text-fg">{title}</span>
                  <span className={`font-mono text-[12px] ${severityCls[sev]}`}>{sev}</span>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
