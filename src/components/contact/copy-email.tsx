"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";

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
    <div className="flex items-stretch overflow-hidden rounded-[4px] border border-line-strong">
      <a
        href={`mailto:${email}`}
        className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3.5 text-fg transition-colors hover:bg-white/[0.03]"
      >
        <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        <span className="truncate font-mono text-[13px] sm:text-sm">{email}</span>
      </a>
      <button
        type="button"
        onClick={copy}
        className="flex w-24 shrink-0 items-center justify-center gap-1.5 border-l border-line-strong font-mono text-[11px] text-muted uppercase transition-colors hover:text-fg"
        aria-label={copied ? "Email copied" : "Copy email address"}
      >
        {copied ? <Check size={14} className="text-accent" aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
        {copied ? "Copied" : "Copy"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
