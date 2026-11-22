import { ArrowDownRight, ArrowRight } from "lucide-react";
import { site, socials } from "@/content/site";
import { ButtonLink } from "@/components/ui/button-link";
import { SocialIcon } from "@/components/ui/icons";
import { SurfaceMap } from "./surface-map";

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[var(--header-h)]"
    >
      {/* backdrop */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="hairline-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,black,transparent)]" />
        <SurfaceMap className="absolute inset-0 h-full w-full opacity-70 [mask-image:linear-gradient(to_right,transparent_0%,black_45%,black_100%)] max-md:opacity-40 max-md:[mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="absolute -top-40 right-[-10%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(198,244,50,0.07),transparent_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="container-x flex flex-1 flex-col justify-center py-16 sm:py-24">
        <p className="label-mono fade-in flex items-center gap-3" style={{ "--d": "100ms" } as React.CSSProperties}>
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {site.role}
        </p>

        <h1
          id="hero-title"
          className="display mt-6 text-[clamp(3.4rem,13vw,10.5rem)] text-fg"
          aria-label={site.name}
        >
          <span className="line-mask" aria-hidden="true">
            <span style={{ "--d": "150ms" } as React.CSSProperties}>{site.firstName}</span>
          </span>
          <span className="line-mask" aria-hidden="true">
            <span style={{ "--d": "260ms" } as React.CSSProperties} className="text-muted">
              {site.lastName}
              <span className="text-accent">.</span>
            </span>
          </span>
        </h1>

        <ul
          className="fade-in mt-8 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[12px] tracking-[0.06em] text-fg uppercase sm:text-[13px]"
          style={{ "--d": "500ms" } as React.CSSProperties}
          aria-label="Focus areas"
        >
          {site.headline.map((h, i) => (
            <li key={h} className="flex items-center gap-3">
              {i > 0 && <span className="text-subtle" aria-hidden="true">/</span>}
              {h}
            </li>
          ))}
        </ul>

        <p
          className="fade-in mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          style={{ "--d": "620ms" } as React.CSSProperties}
        >
          {site.intro}
        </p>

        <div
          className="fade-in mt-10 flex flex-wrap items-center gap-3"
          style={{ "--d": "760ms" } as React.CSSProperties}
        >
          <ButtonLink href="/#projects">
            Explore my work <ArrowDownRight size={16} aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/#contact" variant="ghost">
            Get in touch <ArrowRight size={16} aria-hidden="true" />
          </ButtonLink>
          <span className="mx-1 hidden h-6 w-px bg-line-strong sm:block" aria-hidden="true" />
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.label} (opens in a new tab)`}
              className="inline-flex h-12 w-12 items-center justify-center rounded-[4px] border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <SocialIcon icon={s.icon} className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>
      </div>

      <div className="container-x fade-in pb-8" style={{ "--d": "1000ms" } as React.CSSProperties}>
        <div className="flex flex-col gap-2 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono">
            <span className="text-subtle">Currently exploring —</span>{" "}
            <span className="text-fg normal-case tracking-normal">{site.currentFocus}</span>
          </p>
          <p className="label-mono hidden md:block">Move your cursor to probe the surface ↗</p>
        </div>
      </div>
    </section>
  );
}
