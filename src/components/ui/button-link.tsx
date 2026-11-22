import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/**
 * Two action treatments, chosen by importance:
 *  - `CtaLink`: the single filled primary action in a view. Arrow slides on hover.
 *  - `TextLink`: secondary actions — text with an underline that draws in, no box.
 */

type Base = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  arrow?: "right" | "up-right" | "none";
};

function Anchor({ href, external, className, children, label }: Base & { label?: string }) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={className} aria-label={label}>
      {children}
    </Link>
  );
}

function Arrow({ kind }: { kind: Base["arrow"] }) {
  if (kind === "none") return null;
  const Icon = kind === "up-right" ? ArrowUpRight : ArrowRight;
  return (
    <span className="relative inline-flex h-4 w-4 overflow-hidden" aria-hidden="true">
      <Icon
        size={16}
        className={`absolute inset-0 transition-transform duration-500 ease-[var(--ease-out-expo)] ${
          kind === "up-right" ? "group-hover:translate-x-full group-hover:-translate-y-full" : "group-hover:translate-x-full"
        }`}
      />
      <Icon
        size={16}
        className={`absolute inset-0 transition-transform duration-500 ease-[var(--ease-out-expo)] ${
          kind === "up-right" ? "-translate-x-full translate-y-full group-hover:translate-0" : "-translate-x-full group-hover:translate-x-0"
        }`}
      />
    </span>
  );
}

export function CtaLink({ arrow = "right", className = "", ...props }: Base) {
  return (
    <Anchor
      {...props}
      className={`group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-[2px] bg-accent pr-5 pl-6 text-[14px] font-medium text-[#0a0b0d] transition-[background-color,box-shadow] duration-300 hover:shadow-[0_0_0_4px_rgba(198,244,50,0.12)] ${className}`}
    >
      {props.children}
      <Arrow kind={arrow} />
    </Anchor>
  );
}

export function TextLink({ arrow = "right", className = "", ...props }: Base) {
  return (
    <Anchor {...props} className={`group inline-flex items-center gap-2 text-[14px] text-fg ${className}`}>
      <span className="relative py-1">
        {props.children}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-line-strong"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
        />
      </span>
      <Arrow kind={arrow} />
    </Anchor>
  );
}
