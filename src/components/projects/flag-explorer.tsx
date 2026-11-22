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

export function FlagExplorer() {
  const [scanId, setScanId] = useState("xmas");
  const scan = SCANS.find((s) => s.id === scanId)!;
  const byte = FLAGS.reduce((acc, f, i) => (scan.flags.includes(f) ? acc | (1 << (7 - i)) : acc), 0);
  const tabsId = useId();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <p className="label-mono">TCP flag explorer</p>
        <p className="label-mono text-subtle">Illustrative visual</p>
      </div>

      <div role="tablist" aria-label="Scan technique" className="flex flex-wrap gap-1.5 px-5 pt-5">
        {SCANS.map((s) => (
          <button
            key={s.id}
            role="tab"
            id={`${tabsId}-${s.id}`}
            aria-selected={s.id === scanId}
            aria-controls={`${tabsId}-panel`}
            onClick={() => setScanId(s.id)}
            className={`h-8 rounded-[3px] border px-3 font-mono text-[12px] transition-colors ${
              s.id === scanId
                ? "border-accent bg-accent-dim text-accent"
                : "border-line text-muted hover:border-line-strong hover:text-fg"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div id={`${tabsId}-panel`} role="tabpanel" aria-labelledby={`${tabsId}-${scanId}`} className="flex flex-1 flex-col gap-6 p-5">
        {/* flag byte */}
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <p className="label-mono">{scan.proto === "TCP" ? "TCP flags byte" : "UDP has no flags"}</p>
            <p className="font-mono text-[12px] text-muted">
              {scan.proto === "TCP" ? `0x${byte.toString(16).padStart(2, "0")}` : "—"}
            </p>
          </div>
          <div className="grid grid-cols-8 gap-1">
            {FLAGS.map((f) => {
              const on = scan.flags.includes(f);
              return (
                <div
                  key={f}
                  className={`flex flex-col items-center gap-1 rounded-[3px] border py-2 transition-colors duration-300 ${
                    scan.proto === "UDP"
                      ? "border-line/50 opacity-30"
                      : on
                        ? "border-accent/60 bg-accent-dim"
                        : "border-line"
                  }`}
                >
                  <span className={`font-mono text-[13px] ${on ? "text-accent" : "text-subtle"}`}>{on ? 1 : 0}</span>
                  <span className={`font-mono text-[9px] sm:text-[10px] ${on ? "text-fg" : "text-subtle"}`}>{f}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* packet path */}
        <div className="relative flex items-center justify-between gap-3 font-mono text-[11px] text-muted">
          <span className="rounded-[3px] border border-line px-2 py-1">portforge</span>
          <div className="relative h-px flex-1 bg-line-strong">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={scanId}
                className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-accent"
                initial={{ left: "0%", opacity: 0 }}
                animate={{ left: ["0%", "100%", "0%"], opacity: [1, 1, 0.4] }}
                transition={{ duration: 1.8, ease: "easeInOut", times: [0, 0.5, 1] }}
              />
            </AnimatePresence>
          </div>
          <span className="rounded-[3px] border border-line px-2 py-1">target:port</span>
        </div>

        {/* outcomes */}
        <div className="overflow-hidden rounded-[4px] border border-line">
          <table className="w-full text-left font-mono text-[12px]">
            <thead>
              <tr className="border-b border-line text-subtle">
                <th scope="col" className="px-3 py-2 font-normal">Reply</th>
                <th scope="col" className="px-3 py-2 font-normal">Port verdict</th>
              </tr>
            </thead>
            <tbody>
              {scan.outcomes.map((o) => (
                <tr key={o.reply} className="border-b border-line last:border-0">
                  <td className="px-3 py-2 text-fg">{o.reply}</td>
                  <td className={`px-3 py-2 ${toneCls[o.tone]}`}>{o.verdict}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-auto flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-muted">{scan.note}</p>
          <code className="shrink-0 font-mono text-[12px] text-fg">
            <span className="text-subtle">$ sudo portforge.py</span> {scan.cli}
          </code>
        </div>
      </div>
    </div>
  );
}
