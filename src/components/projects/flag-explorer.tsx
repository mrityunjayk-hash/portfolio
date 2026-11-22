"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * Interactive TCP flag explorer for PortForge. Shows which flags each scan
 * technique sets and how a target's reply maps to a port verdict
 * (standard RFC 793 behaviour, as interpreted by PortForge).
 */

const FLAGS = ["CWR", "ECE", "URG", "ACK", "PSH", "RST", "SYN", "FIN"] as const;
type Flag = (typeof FLAGS)[number];

type Scan = {
  id: string;
  label: string;
  cli: string;
  root: boolean;
  proto: "TCP" | "UDP";
  flags: Flag[];
  note: string;
  outcomes: { reply: string; verdict: string; tone: "open" | "closed" | "unknown" }[];
};

const SCANS: Scan[] = [
  {
    id: "syn",
    label: "SYN",
    cli: "-sS",
    root: true,
    proto: "TCP",
    flags: ["SYN"],
    note: "Half-open: the handshake is never completed.",
    outcomes: [
      { reply: "SYN/ACK", verdict: "open", tone: "open" },
      { reply: "RST", verdict: "closed", tone: "closed" },
      { reply: "no reply", verdict: "filtered", tone: "unknown" },
    ],
  },
  {
    id: "null",
    label: "NULL",
    cli: "-sN",
    root: true,
    proto: "TCP",
    flags: [],
    note: "No flags at all. RFC-compliant stacks answer closed ports with RST.",
    outcomes: [
      { reply: "RST", verdict: "closed", tone: "closed" },
      { reply: "no reply", verdict: "open | filtered", tone: "unknown" },
    ],
  },
  {
    id: "fin",
    label: "FIN",
    cli: "-sF",
    root: true,
    proto: "TCP",
    flags: ["FIN"],
    note: "A FIN without a connection. Closed ports reset it.",
    outcomes: [
      { reply: "RST", verdict: "closed", tone: "closed" },
      { reply: "no reply", verdict: "open | filtered", tone: "unknown" },
    ],
  },
  {
    id: "xmas",
    label: "XMAS",
    cli: "-sX",
    root: true,
    proto: "TCP",
    flags: ["URG", "PSH", "FIN"],
    note: "FIN, PSH and URG lit up together — the packet is “lit like a tree”.",
    outcomes: [
      { reply: "RST", verdict: "closed", tone: "closed" },
      { reply: "no reply", verdict: "open | filtered", tone: "unknown" },
    ],
  },
  {
    id: "ack",
    label: "ACK",
    cli: "-sA",
    root: true,
    proto: "TCP",
    flags: ["ACK"],
    note: "Maps firewall rules rather than open ports.",
    outcomes: [
      { reply: "RST", verdict: "unfiltered", tone: "open" },
      { reply: "no reply", verdict: "filtered", tone: "unknown" },
    ],
  },
  {
    id: "udp",
    label: "UDP",
    cli: "-sU",
    root: true,
    proto: "UDP",
    flags: [],
    note: "No flags — silence is ambiguous, so UDP scans are slow and noisy.",
    outcomes: [
      { reply: "UDP data", verdict: "open", tone: "open" },
      { reply: "ICMP unreachable", verdict: "closed", tone: "closed" },
      { reply: "no reply", verdict: "open | filtered", tone: "unknown" },
    ],
  },
];

const toneCls = {
  open: "text-accent",
  closed: "text-fg",
  unknown: "text-muted",
};

const fmtBits = (n: number) => n.toString(2).padStart(8, "0").replace(/(\d{4})(\d{4})/, "$1 $2");

export function FlagExplorer() {
  const [scanId, setScanId] = useState("xmas");
  const scan = SCANS.find((s) => s.id === scanId)!;
  const isUdp = scan.proto === "UDP";
  const byte = FLAGS.reduce((acc, f, i) => (scan.flags.includes(f) ? acc | (1 << (7 - i)) : acc), 0);
  const probeLabel = isUdp ? "UDP datagram" : scan.flags.length ? scan.flags.join(" · ") : "no flags set";
  const tabsId = useId();

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = SCANS.findIndex((s) => s.id === scanId);
    const next = SCANS[(i + (e.key === "ArrowRight" ? 1 : -1) + SCANS.length) % SCANS.length];
    setScanId(next.id);
    document.getElementById(`${tabsId}-${next.id}`)?.focus();
  };

  return (
    <div className="p-5 sm:p-7">
      {/* scan selector */}
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div role="tablist" aria-label="Scan technique" className="-ml-1 flex flex-wrap gap-x-1" onKeyDown={onKeyDown}>
          {SCANS.map((s) => {
            const active = s.id === scanId;
            return (
              <button
                key={s.id}
                role="tab"
                id={`${tabsId}-${s.id}`}
                aria-selected={active}
                aria-controls={`${tabsId}-panel`}
                tabIndex={active ? 0 : -1}
                onClick={() => setScanId(s.id)}
                className={`relative px-2 py-2 font-mono text-[13px] tracking-[0.04em] transition-colors duration-300 ${
                  active ? "text-fg" : "text-subtle hover:text-muted"
                }`}
              >
                {s.label}
                {active && (
                  <motion.span
                    layoutId={`${tabsId}-underline`}
                    className="absolute inset-x-2 bottom-0 h-px bg-accent"
                    transition={{ type: "spring", stiffness: 420, damping: 38 }}
                  />
                )}
              </button>
            );
          })}
        </div>
        <p className="label-mono text-subtle">Illustrative · RFC 793 behaviour</p>
      </div>

      <div id={`${tabsId}-panel`} role="tabpanel" aria-labelledby={`${tabsId}-${scanId}`} className="mt-8">
        {/* flag register */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <p className="label-mono">{isUdp ? "No TCP header — UDP carries no flags" : "TCP flags · header offset 13"}</p>
          <p className="font-mono text-[12px] whitespace-nowrap text-subtle" aria-live="polite">
            {isUdp ? "—" : (
              <>
                <span className="text-muted">{fmtBits(byte)}</span>
                <span className="ml-3 text-fg">0x{byte.toString(16).padStart(2, "0")}</span>
              </>
            )}
          </p>
        </div>

        <ol
          aria-label="TCP flag bits"
          className={`mt-3 grid grid-cols-8 transition-opacity duration-500 ${isUdp ? "opacity-25" : ""}`}
        >
          {FLAGS.map((f, i) => {
            const on = !isUdp && scan.flags.includes(f);
            return (
              <li key={f} className="relative" aria-label={`${f} ${on ? "set" : "not set"}`}>
                <span className="block pb-2 text-center font-mono text-[9px] text-subtle" aria-hidden="true">
                  {7 - i}
                </span>
                <div
                  className={`relative flex h-14 items-center justify-center border-y border-line sm:h-16 ${
                    i === 0 ? "border-l" : ""
                  } border-r ${i === 7 ? "" : "border-r-line/60"}`}
                >
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 bg-accent"
                    initial={false}
                    animate={{ scaleY: on ? 1 : 0, opacity: on ? 1 : 0 }}
                    style={{ originY: 1 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: on ? i * 0.03 : 0 }}
                  />
                  <span
                    aria-hidden="true"
                    className={`relative font-mono text-lg transition-colors duration-300 sm:text-xl ${on ? "text-[#0a0b0d]" : "text-subtle"}`}
                  >
                    {on ? 1 : 0}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className={`block pt-2 text-center font-mono text-[10px] tracking-[0.04em] transition-colors duration-300 sm:text-[11px] ${
                    on ? "text-fg" : "text-subtle"
                  }`}
                >
                  {f}
                </span>
              </li>
            );
          })}
        </ol>

        {/* exchange */}
        <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_1.2fr] sm:gap-8">
          <div>
            <p className="label-mono mb-3">Probe</p>
            <div className="flex items-center gap-3 font-mono text-[12px]">
              <span className="text-muted">portforge</span>
              <span className="relative h-px flex-1 bg-line-strong">
                <motion.span
                  key={scanId}
                  aria-hidden="true"
                  className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent"
                  initial={{ left: "0%", opacity: 0 }}
                  animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
                />
                <span aria-hidden="true" className="absolute top-1/2 -right-px h-[7px] w-[7px] -translate-y-1/2 rotate-45 border-t border-r border-line-strong" />
              </span>
              <span className="text-muted">target</span>
            </div>
            <p className="mt-3 font-mono text-[13px] text-fg">{probeLabel}</p>
            <p className="mt-4 text-[14px] leading-relaxed text-muted">{scan.note}</p>
          </div>

          <div>
            <p className="label-mono mb-1">Reply → port verdict</p>
            <dl>
              <AnimatePresence mode="popLayout" initial={false}>
                {scan.outcomes.map((o, i) => (
                  <motion.div
                    key={`${scanId}-${o.reply}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 font-mono text-[13px] last:border-0"
                  >
                    <dt className="text-fg">
                      <span className="mr-2 text-subtle" aria-hidden="true">←</span>
                      {o.reply}
                    </dt>
                    <dd className={toneCls[o.tone]}>{o.verdict}</dd>
                  </motion.div>
                ))}
              </AnimatePresence>
            </dl>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-4">
          <code className="font-mono text-[12px] text-muted">
            <span className="text-subtle">$ </span>
            {scan.root ? "sudo " : ""}python3 portforge.py &lt;target&gt; <span className="text-fg">{scan.cli}</span>
          </code>
          <span className="hidden font-mono text-[11px] text-subtle sm:block">← → to switch</span>
        </div>
      </div>
    </div>
  );
}
