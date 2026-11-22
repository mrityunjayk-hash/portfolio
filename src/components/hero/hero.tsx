import { site, socials } from "@/content/site";
import { CtaLink, TextLink } from "@/components/ui/button-link";
import { SocialIcon } from "@/components/ui/icons";
import { Parallax } from "@/components/ui/parallax";
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
        <div className="absolute -top-40 right-[-10%] h-[620px] w-[620px] max-w-full rounded-full bg-[radial-gradient(circle,rgba(198,244,50,0.07),transparent_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="container-x flex flex-1 flex-col justify-center py-16 sm:py-24">
        <p className="label-mono fade-in flex items-center gap-3" style={{ "--d": "100ms" } as React.CSSProperties}>
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {site.role}
        </p>

        <Parallax distance={-90} fade>
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
        </Parallax>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <ul
              className="fade-in flex flex-wrap gap-x-3 gap-y-2 font-mono text-[12px] tracking-[0.06em] text-fg uppercase sm:text-[13px]"
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
          </div>

          <div
            className="fade-in flex flex-wrap items-center gap-x-8 gap-y-5 lg:col-span-5 lg:justify-end"
            style={{ "--d": "760ms" } as React.CSSProperties}
          >
            <CtaLink href="/#projects">Explore my work</CtaLink>
            <TextLink href="/#contact" arrow="up-right">
              Get in touch
            </TextLink>
          </div>
        </div>
      </div>

      <div className="container-x fade-in pb-8" style={{ "--d": "1000ms" } as React.CSSProperties}>
        <div className="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono">
            <span className="text-subtle">Currently exploring —</span>{" "}
            <span className="text-fg normal-case tracking-normal">{site.currentFocus}</span>
          </p>
          <ul className="-ml-2.5 flex items-center gap-1 sm:ml-0">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in a new tab)`}
                  className="inline-flex h-10 w-10 items-center justify-center text-muted transition-colors duration-300 hover:text-fg"
                >
                  <SocialIcon icon={s.icon} className="h-[17px] w-[17px]" />
                </a>
              </li>
            ))}
            <li className="label-mono ml-3 hidden text-subtle md:block">Move your cursor to probe the surface ↗</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
