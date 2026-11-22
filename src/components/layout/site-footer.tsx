import Link from "next/link";
import { site, socials } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="label-mono">
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${site.email}`} className="hover:text-fg">
              Email
            </a>
          </li>
          <li>
            <Link href="/#home" className="hover:text-fg">
              Back to top ↑
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
