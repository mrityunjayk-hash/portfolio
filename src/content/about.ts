/**
 * About section copy.
 * `title` lines render as one large heading. In paragraphs, wrap a phrase in
 * **double asterisks** to highlight it.
 */

export const about = {
  title: ["Offensive security,", "builder's mindset."],
  paragraphs: [
    "I'm **Mrityunjay Kumar** — an offensive security researcher focused on **web application and API security**. My work is about finding the places where software trusts the wrong thing: broken access control, authentication logic and workflows that can quietly be skipped.",
    "I hunt in private bug bounty programs on **HackerOne** and **Bugcrowd**, where my reports have covered **authorization and IDOR flaws**, **authentication bypasses**, approval workflows that could be skipped and **credentials exposed through CI/CD pipelines**. I'm **eJPT** certified and keep sharpening my skills on Hack The Box, TryHackMe and PortSwigger's Web Security Academy.",
    "When I want to understand a technique properly, I build it. **PortForge** reimplements network reconnaissance down to hand-built TCP packets, and **LLMSec** turns attacks on LLM applications into repeatable probes. Right now most of my time goes to the security of **RAG pipelines and tool-using agents**.",
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
