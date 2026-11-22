"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReplayInView } from "@/components/ui/use-replay-in-view";
import { FLAGS, SCANS } from "./scan-data";

/**
 * PortForge's scan techniques as a packet instrument: the flags byte on a
 * wire, the header bytes it lives in, and the probe/reply exchange that
 * decides each port verdict. Logic lives in scan-data.ts.
 */

const ease = [0.16, 1, 0.3, 1] as const;

const toneCls = { open: "text-accent", closed: "text-fg", unknown: "text-muted" } as const;

const byteHex = (n: number) => n.toString(16).padStart(2, "0");

/** Illustrative headers. Window 5840 (0x16d0) and data offset 5 match PortForge's _build_tcp_header. */
function headerBytes(isUdp: boolean, flags: number): { hex: string; flags?: boolean; dim?: boolean }[] {
  if (isUdp) {
    return ["d4", "31", "00", "35", "00", "08", "··", "··"].map((hex) => ({ hex, dim: hex === "··" }));
  }
  const bytes = ["d4", "31", "00", "50", "00", "00", "03", "e8", "00", "00", "00", "00", "50", byteHex(flags), "16", "d0", "··", "··", "00", "00"];
  return bytes.map((hex, i) => ({ hex, flags: i === 13, dim: hex === "··" }));
}

export function FlagInstrument() {
  const [scanId, setScanId] = useState("xmas");
  const scan = SCANS.find((s) => s.id === scanId)!;
  const isUdp = scan.proto === "UDP";
  // "Boot" the instrument each time it scrolls into view.
  const rootRef = useRef<HTMLDivElement>(null);
  // Replays the boot sequence on every visit; resets once fully off screen.
  const inView = useReplayInView(rootRef, { enterMargin: "0px 0px -20% 0px" });
  // Markup must not depend on the reduced-motion setting (it differs between
  // server and client), so booting is driven only by visibility.
  const booted = inView;
  const byte = FLAGS.reduce((acc, f, i) => (scan.flags.includes(f) ? acc | (1 << (7 - i)) : acc), 0);
  const probeLabel = isUdp ? "UDP datagram" : scan.flags.length ? scan.flags.join(" · ") : "no flags";
  const bytes = headerBytes(isUdp, byte);
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
    <div ref={rootRef} className="@container">
      {/* scan technique */}
      <div role="tablist" aria-label="Scan technique" onKeyDown={onKeyDown} className="-ml-0.5 flex flex-wrap gap-x-6 gap-y-1 @xl:gap-x-8">
        {SCANS.map((s) => {
          const active = s.id === scanId;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              id={`${tabsId}-${s.id}`}
              aria-selected={active}
              aria-controls={`${tabsId}-panel`}
              tabIndex={active ? 0 : -1}
              onClick={() => setScanId(s.id)}
              className={`relative pb-2 font-display text-[1.7rem] font-medium transition-colors duration-300 @xl:text-[2.4rem] ${
                active ? "text-fg" : "text-subtle hover:text-muted"
              }`}
            >
              {s.label}
              {active && (
                <motion.span
                  layoutId={`${tabsId}-scan`}
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-accent"
                  transition={{ type: "spring", stiffness: 420, damping: 38 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div id={`${tabsId}-panel`} role="tabpanel" aria-labelledby={`${tabsId}-${scanId}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={scanId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted"
          >
            {scan.note}
          </motion.p>
        </AnimatePresence>

        {/* the flags byte, on a wire */}
        <div className="mt-14">
          <div className="flex items-baseline justify-between gap-4 text-[14px]">
            <span className="text-subtle">{isUdp ? "UDP carries no flags" : "Flags byte"}</span>
            <span className="font-mono text-subtle" aria-live="polite">
              {isUdp ? "—" : (
                <>
                  {byte.toString(2).padStart(8, "0").replace(/(\d{4})(\d{4})/, "$1 $2")}
                  <span className="ml-3 text-fg">0x{byteHex(byte)}</span>
                </>
              )}
            </span>
          </div>

          <ol aria-label="TCP flag bits" className={`relative mt-4 grid grid-cols-8 transition-opacity duration-500 ${isUdp ? "opacity-30" : ""}`}>
            <motion.span
              aria-hidden="true"
              className={`absolute inset-x-0 top-12 h-px origin-left ${isUdp ? "border-t border-dashed border-line-strong" : "bg-line-strong"}`}
              initial={false}
              animate={{ scaleX: booted ? 1 : 0 }}
              transition={{ duration: 1.1, ease }}
            />
            {FLAGS.map((f, i) => {
              const on = booted && !isUdp && scan.flags.includes(f);
              return (
                <li key={f} className="relative flex flex-col items-center" aria-label={`${f} ${on ? "set" : "not set"}`}>
                  <div aria-hidden="true" className="relative h-12 w-full">
                    <motion.span
                      className="absolute bottom-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-t from-accent to-transparent"
                      initial={false}
                      animate={{ height: on ? 40 : 0 }}
                      transition={{ duration: 0.55, ease, delay: on ? i * 0.04 : 0 }}
                    />
                  </div>
                  <motion.span
                    aria-hidden="true"
                    className="relative block rounded-full"
                    initial={false}
                    animate={{
                      width: on ? 11 : 5,
                      height: on ? 11 : 5,
                      marginTop: on ? -5.5 : -2.5,
                      backgroundColor: on ? "#c6f432" : "#2a2e35",
                      boxShadow: on ? "0 0 0 6px rgba(198,244,50,0.12)" : "0 0 0 0px rgba(198,244,50,0)",
                    }}
                    transition={{ duration: 0.45, ease, delay: on ? i * 0.04 : 0 }}
                  />
                  <span aria-hidden="true" className={`mt-5 font-mono text-xl transition-colors duration-300 @xl:text-2xl ${on ? "text-accent" : "text-subtle/70"}`}>
                    {on ? 1 : 0}
                  </span>
                  <span aria-hidden="true" className={`mt-1 font-mono text-[10px] transition-colors duration-300 @xl:text-[12px] ${on ? "text-fg" : "text-subtle"}`}>
                    {f}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-16 grid gap-14 @3xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] @3xl:gap-12">
          {/* header bytes */}
          <div>
            <p className="text-[14px] text-subtle">{isUdp ? "UDP header" : "TCP header"}, illustrative</p>
            <div className="mt-4 font-mono text-[13px] leading-[2] @xl:text-[14px]" aria-label={`${isUdp ? "UDP" : "TCP"} header bytes`}>
              {Array.from({ length: Math.ceil(bytes.length / 8) }, (_, row) => (
                <div key={row} className="flex gap-4">
                  <span className="text-subtle/70">{(row * 8).toString(16).padStart(4, "0")}</span>
                  <span className="flex flex-wrap gap-x-[0.6em]">
                    {bytes.slice(row * 8, row * 8 + 8).map((b, i) =>
                      b.flags ? (
                        <motion.span
                          key={`${row}-${i}-${b.hex}`}
                          className="text-accent"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, ease }}
                        >
                          {b.hex}
                        </motion.span>
                      ) : (
                        <motion.span
                          key={`${row}-${i}`}
                          className={b.dim ? "text-subtle/60" : "text-muted"}
                          initial={false}
                          animate={{ opacity: booted ? 1 : 0 }}
                          transition={{ duration: 0.25, delay: booted ? 0.5 + (row * 8 + i) * 0.03 : 0 }}
                        >
                          {b.hex}
                        </motion.span>
                      ),
                    )}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-subtle">
              {isUdp
                ? "Source port, destination port 53, length and checksum."
                : <>Flags at offset 13, <span className="text-accent">highlighted</span>; window 5840 as PortForge sets it; checksum computed per packet.</>}
            </p>
          </div>

          {/* probe / reply exchange */}
          <div>
            <div className="grid grid-cols-[7.5rem_1fr_3rem] text-[13px] text-subtle @xl:grid-cols-[8.5rem_1fr_4.5rem]">
              <span>portforge</span>
              <span />
              <span className="text-right">target</span>
            </div>
            <div className="relative mt-3">
              {/* lifelines */}
              <span aria-hidden="true" className="absolute inset-y-0 left-[7.5rem] w-px bg-line @xl:left-[8.5rem]" />
              <span aria-hidden="true" className="absolute inset-y-0 right-[3rem] w-px bg-line @xl:right-[4.5rem]" />

              {booted && <Exchange key={`probe-${scanId}`} dir="out" label={probeLabel} index={0} />}
              <AnimatePresence mode="popLayout" initial={false}>
                {booted && scan.outcomes.map((o, i) => (
                  <Exchange
                    key={`${scanId}-${o.reply}`}
                    dir="back"
                    label={o.reply}
                    index={i + 1}
                    verdict={<span className={toneCls[o.tone]}>{o.verdict}</span>}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <p className="mt-14 font-mono text-[13px] text-muted @xl:text-[14px]">
          <span className="text-subtle">$ </span>
          {scan.root ? "sudo " : ""}python3 portforge.py &lt;target&gt; <span className="text-accent">{scan.cli}</span>
        </p>
      </div>
    </div>
  );
}

function Exchange({ dir, label, index, verdict }: { dir: "out" | "back"; label: string; index: number; verdict?: React.ReactNode }) {
  const out = dir === "out";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.3, delay: index * 0.12 }}
      className="grid grid-cols-[7.5rem_1fr_3rem] items-center py-3 @xl:grid-cols-[8.5rem_1fr_4.5rem]"
    >
      <span className="pr-3 font-mono text-[11px] whitespace-nowrap @xl:text-[13px]">{verdict}</span>
      <span className="relative px-3">
        <span className={`mb-2 block text-center font-mono text-[12px] ${out ? "text-fg" : "text-muted"}`}>{label}</span>
        <span className="relative block h-px">
          <motion.span
            className={`absolute inset-0 ${out ? "bg-accent/80" : "border-t border-dashed border-line-strong"}`}
            style={{ originX: out ? 0 : 1 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.1 + index * 0.12 }}
          />
          <span
            aria-hidden="true"
            className={`absolute top-1/2 h-[7px] w-[7px] -translate-y-1/2 rotate-45 ${
              out ? "-right-px border-t border-r border-accent" : "-left-px border-b border-l border-line-strong"
            }`}
          />
          {/* the packet itself, crossing the wire once the arrow is drawn */}
          <motion.span
            aria-hidden="true"
            className={`absolute top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full ${out ? "bg-accent shadow-[0_0_0_4px_rgba(198,244,50,0.15)]" : "bg-fg/70"}`}
            initial={{ left: out ? "0%" : "100%", opacity: 0 }}
            animate={{ left: out ? "100%" : "0%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.45 + index * 0.35, times: [0, 0.1, 0.85, 1] }}
          />
        </span>
      </span>
      <span />
    </motion.div>
  );
}
