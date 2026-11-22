import { RevealWords } from "@/components/ui/reveal-words";
import { site, socials } from "@/content/site";
import { SocialIcon } from "@/components/ui/icons";
import { ContactForm } from "@/components/contact/contact-form";
import { CopyEmail } from "@/components/contact/copy-email";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line py-24 sm:py-32">
      <div aria-hidden="true" className="absolute -bottom-60 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(198,244,50,0.06),transparent_65%)]" />
      <div className="container-x relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="font-display text-2xl font-medium text-fg" data-reveal="left">
            Contact
          </p>
          <h2 id="contact-title" className="display mt-6 text-5xl text-balance sm:text-6xl lg:text-7xl" data-reveal="words">
            <RevealWords segments={["Let's talk security."]} />
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted" data-reveal="blur" style={{ "--reveal-delay": "250ms" } as React.CSSProperties}>
            Open to offensive security roles, penetration testing work and research collaboration. The fastest way to reach me is
            email — or use the form.
          </p>

          <div className="mt-12" data-reveal="stagger" style={{ "--reveal-delay": "300ms" } as React.CSSProperties}>
            <CopyEmail email={site.email} />
            {socials.map((s, i) => (
              <a
                key={s.label}
                style={{ "--si": i + 1 } as React.CSSProperties}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-line py-4 transition-colors"
              >
                <span className="flex items-center gap-3 text-fg">
                  <SocialIcon icon={s.icon} className="h-4 w-4 text-muted transition-colors group-hover:text-fg" />
                  <span className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1">{s.label}</span>
                </span>
                <span className="font-mono text-[12px] text-subtle transition-colors group-hover:text-fg">
                  {s.handle} ↗<span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6" data-reveal="right" style={{ "--reveal-delay": "200ms" } as React.CSSProperties}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
