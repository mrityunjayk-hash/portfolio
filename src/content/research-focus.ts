/**
 * Research categories. Articles in src/content/research/*.mdx use one of
 * these ids as their `category`. Focus areas are shown while there are no
 * (or few) published articles.
 */

export const researchCategories = [
  { id: "web", label: "Web Application Security" },
  { id: "vuln-research", label: "Vulnerability Research" },
  { id: "ai", label: "AI / LLM Security" },
  { id: "pentest", label: "Penetration Testing" },
  { id: "ctf", label: "CTF Writeups" },
  { id: "engineering", label: "Security Engineering" },
  { id: "experiments", label: "Technical Experiments" },
] as const;

export type ResearchCategoryId = (typeof researchCategories)[number]["id"];

export const categoryLabel = (id: string) =>
  researchCategories.find((c) => c.id === id)?.label ?? id;

export const researchFocus = [
  {
    code: "AC",
    title: "Authorization & IDOR",
    body: "Object- and function-level access control in multi-tenant APIs: whose data a session can reach, and what a scoped token is really allowed to read.",
  },
  {
    code: "AU",
    title: "Authentication logic",
    body: "How frameworks and middleware decide a request is authenticated — and the edge cases where that decision quietly gets skipped.",
  },
  {
    code: "BL",
    title: "Workflow & business logic",
    body: "Mandatory steps that turn out to be optional: approvals, reviews and state transitions enforced in the UI but not on the server.",
  },
  {
    code: "CI",
    title: "CI/CD & secrets exposure",
    body: "Pipelines as attack surface — workflow triggers, privileged tokens and credentials that leak into places untrusted code can reach.",
  },
  {
    code: "AI",
    title: "LLM application security",
    body: "Prompt injection, system-prompt leakage, tool abuse and data exfiltration in chatbots, RAG pipelines and agents.",
  },
] as const;
