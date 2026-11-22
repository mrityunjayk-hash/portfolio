"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, PenLine } from "lucide-react";
import type { Post } from "@/lib/research";
import { categoryLabel, researchCategories } from "@/content/research-focus";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });

export function ResearchIndex({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<string>("all");
  const used = useMemo(() => new Set(posts.map((p) => p.category)), [posts]);
  const shown = filter === "all" ? posts : posts.filter((p) => p.category === filter);

  return (
    <div data-reveal>
      <div className="mb-6 flex flex-wrap gap-x-6 gap-y-1" role="group" aria-label="Filter by category">
        <Chip active={filter === "all"} onClick={() => setFilter("all")} count={posts.length}>
          All
        </Chip>
        {researchCategories.map((c) => (
          <Chip
            key={c.id}
            active={filter === c.id}
            disabled={!used.has(c.id)}
            onClick={() => setFilter(c.id)}
            count={posts.filter((p) => p.category === c.id).length}
          >
            {c.label}
          </Chip>
        ))}
      </div>

      <div className="border-t border-line">
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <ul>
            <AnimatePresence initial={false}>
              {shown.map((p) => (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-b border-line"
                >
                  <Link
                    href={`/research/${p.slug}`}
                    className="group grid gap-3 py-7 transition-colors md:grid-cols-12 md:items-baseline md:gap-6"
                  >
                    <span className="font-mono text-[12px] text-subtle md:col-span-2">{fmt(p.date)}</span>
                    <span className="md:col-span-7">
                      <span className="flex items-start gap-2 font-display text-xl font-medium text-fg transition-colors group-hover:text-accent sm:text-2xl">
                        {p.title}
                        <ArrowUpRight size={18} className="mt-1 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                      </span>
                      <span className="mt-2 block text-[15px] leading-relaxed text-muted">{p.summary}</span>
                    </span>
                    <span className="flex flex-wrap gap-x-3 gap-y-1 md:col-span-3 md:justify-end">
                      <span className="label-mono text-fg">{categoryLabel(p.category)}</span>
                      <span className="label-mono">{p.readingMinutes} min</span>
                      {p.draft && <span className="label-mono text-danger">draft</span>}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
}

function Chip({
  active,
  disabled,
  onClick,
  count,
  children,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`group relative inline-flex items-baseline gap-1 py-1.5 text-[14px] transition-colors disabled:cursor-not-allowed disabled:text-subtle/60 ${
        active ? "text-fg" : "text-muted enabled:hover:text-fg"
      }`}
    >
      {children}
      <sup className={`font-mono text-[10px] ${active ? "text-accent" : "text-subtle"}`}>{count}</sup>
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 h-px origin-left bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] ${
          active ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </button>
  );
}

function EmptyState() {
  return (
    <div className="relative overflow-hidden py-14 sm:py-20">
      <div aria-hidden="true" className="hairline-grid absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative grid gap-6 md:grid-cols-12">
        <div className="md:col-span-2">
          <span className="inline-flex text-accent">
            <PenLine size={16} aria-hidden="true" />
          </span>
        </div>
        <div className="md:col-span-8">
          <p className="font-display text-2xl font-medium text-fg sm:text-3xl">First writeups are in preparation.</p>
          <p className="mt-3 max-w-xl leading-relaxed text-muted">
            Writeups on web and API security, AI application security and security tooling will appear here as they are
            published — filterable by category, each with its own page.
          </p>
        </div>
      </div>
    </div>
  );
}
