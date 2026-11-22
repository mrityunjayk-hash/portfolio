"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-line-strong pb-5">
      <a href={`mailto:${email}`} className="group min-w-0">
        <span className="label-mono block">Email</span>
        <span className="mt-2 flex items-center gap-2 text-[clamp(1.15rem,3.4vw,1.6rem)] tracking-tight text-fg">
          <span className="truncate bg-[linear-gradient(var(--accent),var(--accent))] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[var(--ease-out-expo)] group-hover:bg-[length:100%_1px]">
            {email}
          </span>
          <ArrowUpRight size={18} aria-hidden="true" className="shrink-0 text-accent transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </a>
      <button
        type="button"
        onClick={copy}
        className="flex items-center gap-1.5 py-1 font-mono text-[11px] tracking-[0.06em] text-muted uppercase transition-colors hover:text-fg"
        aria-label={copied ? "Email copied" : "Copy email address"}
      >
        {copied ? <Check size={13} className="text-accent" aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
        {copied ? "Copied" : "Copy"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
