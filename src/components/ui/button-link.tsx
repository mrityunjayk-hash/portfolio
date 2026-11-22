import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-fg text-bg hover:bg-accent [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5",
  ghost:
    "border border-line-strong text-fg hover:border-fg/40 hover:bg-white/[0.03]",
};

type Props = ComponentProps<typeof Link> & { variant?: Variant; external?: boolean };

export function ButtonLink({ variant = "primary", external, className = "", ...props }: Props) {
  const cls = `group inline-flex h-12 items-center justify-center gap-2 rounded-[4px] px-5 text-sm font-medium transition-colors duration-300 ${styles[variant]} ${className}`;
  if (external) {
    return (
      <a
        className={cls}
        href={String(props.href)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={props["aria-label"]}
      >
        {props.children}
      </a>
    );
  }
  return <Link className={cls} {...props} />;
}
