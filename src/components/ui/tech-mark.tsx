import { logos, type Logo, type LogoId } from "@/content/logos";

/**
 * A technology mark: the real brand logo when one exists, otherwise a
 * typographic monogram (never a look-alike icon). Monochrome by default;
 * parents can reveal the brand colour on hover via the `group` class.
 */

// Brand colours too dark to read on the near-black background fall back to the foreground colour.
function readableHex(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum < 0.38 ? "var(--fg)" : hex;
}

type Props = {
  logo?: LogoId;
  mark?: string;
  size?: number;
  className?: string;
  /** Reveal brand colour when an ancestor with `group` is hovered/focused. */
  brandOnHover?: boolean;
};

export function TechMark({ logo, mark, size = 20, className = "", brandOnHover = true }: Props) {
  if (logo) {
    const l: Logo = logos[logo];
    // Wordmarks get extra width so they stay legible next to square marks.
    const width = l.aspect ? Math.round(size * 2.2) : size;
    const height = l.aspect ? Math.round(width / l.aspect) : size;
    return (
      <svg
        viewBox={l.viewBox ?? "0 0 24 24"}
        width={width}
        height={height}
        aria-hidden="true"
        className={`shrink-0 fill-current transition-colors duration-300 ${
          brandOnHover ? "group-hover:text-[var(--brand)] group-focus-visible:text-[var(--brand)] group-focus-within:text-[var(--brand)]" : ""
        } ${className}`}
        style={{ "--brand": readableHex(l.hex) } as React.CSSProperties}
      >
        <path d={l.path} />
      </svg>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center font-mono font-medium tracking-tight transition-colors duration-300 group-hover:text-accent ${className}`}
      style={{ width: size, height: size, fontSize: Math.round(size * (mark && mark.length > 2 ? 0.42 : 0.55)) }}
    >
      {mark}
    </span>
  );
}
