import type { LogoId } from "./logos";

/**
 * Field work.
 */

export type FieldWorkItem = {
  title: string;
  context: string;
  logos?: LogoId[];
  body: string;
  tags: string[];
};

/**
 * Field work deliberately avoids program names, counts and severities —
 * private bug bounty programs restrict disclosure.
 */
export const fieldWork: FieldWorkItem[] = [
  {
    title: "Independent bug bounty research",
    context: "HackerOne · Bugcrowd",
    logos: ["hackerone", "bugcrowd"],
    body: "Testing production web applications and APIs in private programs and reporting validated vulnerabilities through coordinated disclosure.",
    tags: ["Access control", "IDOR", "Auth bypass", "Business logic", "CI/CD"],
  },
  {
    title: "Hands-on offensive labs",
    context: "Hack The Box · TryHackMe",
    logos: ["hackthebox", "tryhackme"],
    body: "Machine-based practice across reconnaissance, enumeration, exploitation and privilege escalation on Linux and Windows targets.",
    tags: ["Enumeration", "Exploitation", "PrivEsc"],
  },
  {
    title: "Web security practice",
    context: "PortSwigger Web Security Academy",
    logos: ["portswigger"],
    body: "Lab work covering authentication, access control, injection and other common web vulnerability classes.",
    tags: ["Authentication", "Access control", "Injection"],
  },
];
