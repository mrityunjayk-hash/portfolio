/**
 * Core identity, links and navigation.
 * Edit this file to change the name, headline, intro or social links.
 */

export const site = {
  name: "Mrityunjay Kumar",
  firstName: "Mrityunjay",
  lastName: "Kumar",
  handle: "axel",
  role: "Offensive Security Researcher",
  headline: ["Offensive Security", "Web & API Pentesting", "Vulnerability Research"],
  intro:
    "I look for the places where software trusts the wrong thing — broken access control, authentication logic, skippable workflows and AI applications that follow the wrong instructions — and I build tooling to find them faster.",
  description:
    "Mrityunjay Kumar — offensive security researcher focused on web & API penetration testing, access-control and authentication vulnerabilities, AI/LLM application security and security tool development.",
  currentFocus: "Security of LLM applications, RAG pipelines and tool-using agents",
  email: "mrityunjayk1812@gmail.com",
  sourceRepo: "https://github.com/mrityunjayk-hash/portfolio",
  // Set NEXT_PUBLIC_SITE_URL in Vercel once the final domain is known.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mrityunjay-kumar.vercel.app").replace(/\/$/, ""),
  locale: "en_US",
} as const;

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
  icon: "github" | "linkedin" | "mail";
};

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/mrityunjayk-hash",
    handle: "mrityunjayk-hash",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mrityunjay-kumar-12a57b210/",
    handle: "mrityunjay-kumar",
    icon: "linkedin",
  },
];

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "arsenal", label: "Arsenal" },
  { id: "contact", label: "Contact" },
] as const;
