/** About section copy. Paragraphs render in order. */

export const about = {
  statement:
    "Most serious bugs aren't exotic. They're a missing check in a place everyone assumed was safe.",
  paragraphs: [
    "I work on the offensive side of security, mostly web applications and APIs. A lot of my time goes into reading how an application decides who is allowed to do what — and then testing what happens when that decision is made in the wrong place, against the wrong object, or not at all.",
    "That has taken me through authorization and IDOR issues, authentication logic, approval workflows that can be skipped and credentials exposed through CI/CD pipelines, reported through private bug bounty programs on HackerOne and Bugcrowd.",
    "When I want to understand a technique properly, I build it. PortForge reimplements network reconnaissance down to hand-built TCP packets; LLMSec turns LLM-application attacks into repeatable probes. Right now most of my curiosity goes to AI systems — RAG pipelines and agents that hold tools and secrets — where the trust boundaries are still being worked out.",
  ],
  method: [
    {
      step: "Map",
      body: "Enumerate the surface: hosts, services, endpoints, roles, and the data each one touches.",
    },
    {
      step: "Model trust",
      body: "Work out who the application believes you are, and where that belief is actually checked.",
    },
    {
      step: "Break",
      body: "Test each assumption — other users' objects, skipped steps, forged context, over-scoped credentials.",
    },
    {
      step: "Build",
      body: "Turn techniques that repeat into tooling, so the next test is faster and more consistent.",
    },
  ],
} as const;
