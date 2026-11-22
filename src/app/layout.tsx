import type { Metadata, Viewport } from "next";
import { Fira_Code, Inter } from "next/font/google";
import localFont from "next/font/local";
import { MotionConfig } from "motion/react";
import { site, socials } from "@/content/site";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { RevealObserver } from "@/components/ui/reveal-observer";
import "./globals.css";

// Typography system: Clash Display (headings), Inter (body, navigation), Fira Code (technical labels, code).
const clashDisplay = localFont({
  variable: "--font-clash-display",
  display: "swap",
  src: [
    { path: "../fonts/clash-display/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/clash-display/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/clash-display/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
});
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const firaCode = Fira_Code({ variable: "--font-fira-code", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Offensive Security Researcher`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    site.name,
    "offensive security",
    "penetration testing",
    "web application security",
    "API security",
    "vulnerability research",
    "AI security",
    "LLM security",
    "eJPT",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: `${site.name} — Offensive Security Researcher`,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Offensive Security Researcher`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  knowsAbout: ["Penetration testing", "Web application security", "API security", "Vulnerability research", "LLM security"],
  sameAs: socials.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${clashDisplay.variable} ${inter.variable} ${firaCode.variable}`} suppressHydrationWarning>
      <head>
        {/* Flags JS so scroll-reveal styles only apply when they can be undone. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <MotionConfig reducedMotion="user">
          <SiteHeader />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
        </MotionConfig>
        <RevealObserver />
      </body>
    </html>
  );
}
