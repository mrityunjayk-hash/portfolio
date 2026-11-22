"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav, site, socials } from "@/content/site";
import { SocialIcon } from "@/components/ui/icons";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Solid background once past the top of the page.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: the section crossing the middle band of the viewport is active.
  useEffect(() => {
    if (!isHome) return;
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHome, pathname]);

  // Mobile menu: lock scroll, close on Escape, trap focus.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const toggle = toggleRef.current;
    const focusables = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []).concat(toggle ? [toggle] : []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle?.focus();
      }
      if (e.key === "Tab") {
        const els = focusables();
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close the menu whenever the route changes.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  // Off the home page, highlight the section the current route belongs to.
  const section = pathname.split("/")[1];
  const current = isHome ? active : section === "projects" || section === "research" ? section : "";

  const href = (id: string) => (id === "home" ? "/#home" : `/#${id}`);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded bg-accent px-4 py-2 font-medium text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? "border-b border-line bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/#home" className="group flex items-center gap-3" aria-label={`${site.name} — home`}>
            <Mark />
            <span className="hidden font-mono text-[12px] tracking-[0.08em] text-fg uppercase sm:inline">
              {site.firstName} <span className="text-muted">{site.lastName}</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.slice(1).map((item, i) => {
                const isActive = current === item.id;
                return (
                  <li key={item.id} className="relative">
                    <Link
                      href={href(item.id)}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative flex items-center gap-1.5 px-3 py-2 text-[13px] transition-colors duration-300 ${
                        isActive ? "text-fg" : "text-muted hover:text-fg"
                      }`}
                    >
                      <span className="font-mono text-[10px] text-subtle">0{i + 1}</span>
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-x-3 -bottom-px h-px bg-accent"
                          transition={{ type: "spring", stiffness: 420, damping: 36 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className="hidden h-9 items-center rounded-[4px] border border-line-strong px-4 text-[13px] text-fg transition-colors hover:border-accent hover:text-accent sm:inline-flex"
            >
              Get in touch
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[4px] border border-line-strong text-fg lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 top-[var(--header-h)] z-40 flex flex-col bg-bg/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Mobile" className="container-x flex-1 overflow-y-auto py-8">
              <ul className="border-t border-line">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.id}
                    className="border-b border-line"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={href(item.id)}
                      onClick={(e) => {
                        setOpen(false);
                        if (!isHome) return;
                        // Scroll after the menu unmounts and body scrolling is restored.
                        e.preventDefault();
                        setTimeout(() => {
                          document.getElementById(item.id)?.scrollIntoView();
                          history.replaceState(null, "", `#${item.id}`);
                        }, 60);
                      }}
                      className={`flex items-baseline justify-between py-4 text-3xl tracking-tight ${
                        current === item.id ? "text-accent" : "text-fg"
                      }`}
                    >
                      {item.label}
                      <span className="font-mono text-xs text-subtle">0{i}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-10 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] border border-line-strong text-muted hover:text-fg"
                  >
                    <SocialIcon icon={s.icon} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Mark() {
  return (
    <span
      aria-hidden="true"
      className="relative flex h-8 w-8 items-center justify-center rounded-[4px] border border-line-strong font-mono text-[11px] font-medium text-fg transition-colors group-hover:border-accent"
    >
      MK
      <span className="absolute -top-px -right-px h-1.5 w-1.5 bg-accent" />
    </span>
  );
}
