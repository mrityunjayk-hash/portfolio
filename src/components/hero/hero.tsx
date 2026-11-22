import { site, socials } from "@/content/site";
import { SocialIcon } from "@/components/ui/icons";
import { CtaLink, TextLink } from "@/components/ui/button-link";
import { Parallax } from "@/components/ui/parallax";
import { Magnetic } from "@/components/ui/magnetic";
import { SurfaceMap } from "./surface-map";
import { HeroReplay } from "./hero-replay";

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
        <Parallax distance={220} className="absolute inset-0">
          <SurfaceMap className="absolute inset-0 h-full w-full opacity-70 [mask-image:linear-gradient(to_right,transparent_0%,black_45%,black_100%)] max-md:opacity-40 max-md:[mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        </Parallax>
        <div className="absolute -top-40 right-[-10%] h-[620px] w-[620px] max-w-full rounded-full bg-[radial-gradient(circle,rgba(198,244,50,0.07),transparent_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <Parallax distance={-120} fade scaleTo={0.96} className="container-x flex flex-1 flex-col justify-center py-16 sm:py-24">
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
            <Letters text={site.firstName} start={150} />
          </span>
          <span className="line-mask text-muted" aria-hidden="true">
            <Letters text={site.lastName} start={150 + site.firstName.length * 38} />
            <span className="letter text-accent" style={{ "--d": `${200 + (site.firstName.length + site.lastName.length) * 38}ms` } as React.CSSProperties}>
              .
            </span>
          </span>
        </h1>

        <p
          className="fade-in mt-8 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 font-display text-[clamp(1.15rem,2vw,1.6rem)] font-medium text-muted"
          style={{ "--d": "650ms" } as React.CSSProperties}
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
              style={{ "--d": "780ms" } as React.CSSProperties}
            >
              {site.intro}
            </p>
          </div>

          <div
            className="fade-in flex flex-wrap items-center gap-x-8 gap-y-5 lg:col-span-5 lg:justify-end"
            style={{ "--d": "900ms" } as React.CSSProperties}
          >
            <Magnetic>
              <CtaLink href="/#projects">Explore my work</CtaLink>
            </Magnetic>
            <Magnetic strength={0.2}>
              <TextLink href="/#contact" arrow="up-right">
                Get in touch
              </TextLink>
            </Magnetic>
            <ul className="-ml-2 flex items-center" aria-label="Profiles">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="inline-flex h-10 w-10 items-center justify-center text-muted transition-[color,transform] duration-300 hover:-translate-y-0.5 hover:text-fg"
                  >
                    <SocialIcon icon={s.icon} className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Parallax>
      <HeroReplay targetId="home" />
    </section>
  );
}

/** Letters that rise in sequence (pure CSS, so it plays before hydration). */
function Letters({ text, start }: { text: string; start: number }) {
  return text.split("").map((ch, i) => (
    <span key={i} className="letter" style={{ "--d": `${start + i * 38}ms` } as React.CSSProperties}>
      {ch}
    </span>
  ));
}
