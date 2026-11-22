import { site } from "@/content/site";
import { certifications } from "@/content/credentials";
import { CtaLink, TextLink } from "@/components/ui/button-link";
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

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
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

          <ul
            className="fade-in flex flex-wrap gap-2 lg:mb-6 lg:flex-col lg:items-end"
            style={{ "--d": "700ms" } as React.CSSProperties}
            aria-label="Certifications"
          >
            {certifications.map((c) => (
              <li
                key={c.short}
                title={`${c.name} — ${c.issuer}`}
                className="inline-flex items-center gap-2.5 rounded-[3px] border border-line-strong bg-surface/70 px-4 py-2.5 text-[13px] font-medium text-fg backdrop-blur-sm"
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                {c.short}
                <span className="sr-only">
                  {" "}
                  — {c.name}, {c.issuer}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p
          className="fade-in mt-8 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 font-display text-[clamp(1.15rem,2vw,1.6rem)] font-medium text-muted"
          style={{ "--d": "500ms" } as React.CSSProperties}
        >
          <span className="font-semibold text-fg">{site.handle}</span>
          {site.headline.map((h) => (
            <span key={h} className="flex items-baseline gap-2.5">
              <span className="text-subtle" aria-hidden="true">·</span>
              {h}
            </span>
          ))}
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">


            <p
              className="fade-in max-w-xl text-base leading-relaxed text-muted sm:text-lg"
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
    </section>
  );
}
