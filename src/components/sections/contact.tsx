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
          <p className="label-mono flex items-center gap-3" data-reveal>
            <span className="text-accent">07</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            Contact
          </p>
          <h2 id="contact-title" className="display mt-6 text-5xl text-balance sm:text-6xl lg:text-7xl" data-reveal>
            Let&apos;s talk security.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted" data-reveal>
            Open to offensive security roles, penetration testing work and research collaboration. The fastest way to reach me is
            email — or use the form.
          </p>

          <div className="mt-10 space-y-3" data-reveal>
            <CopyEmail email={site.email} />
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-[4px] border border-line px-4 py-3.5 transition-colors hover:border-line-strong"
              >
                <span className="flex items-center gap-3 text-fg">
                  <SocialIcon icon={s.icon} className="h-4 w-4 text-muted" />
                  {s.label}
                </span>
                <span className="font-mono text-[12px] text-subtle transition-colors group-hover:text-fg">
                  {s.handle} ↗<span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
