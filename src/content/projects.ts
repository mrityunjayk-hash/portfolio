/**
 * Projects. Every claim here is taken from the project's public repository.
 * `visual` selects the interactive illustration rendered for the project.
 */

export type Project = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  summary: string;
  problem: string;
  implementation: string[];
  features: string[];
  stack: string[];
  roadmap?: string[];
  usage: { label: string; command: string }[];
  repo: string;
  demo?: string;
  license: string;
  visual: "flags" | "canary";
};

export const projects: Project[] = [
  {
    slug: "llmsec",
    index: "01",
    name: "LLMSec",
    tagline: "Repeatable attack probes for LLM-powered applications.",
    summary:
      "A zero-dependency Python tool that tests chatbots, RAG apps and agents for prompt injection, system-prompt leakage, data leakage, tool abuse and unsafe output handling.",
    problem:
      "LLM applications fail in ways traditional scanners never look for: instructions smuggled in through user input or retrieved documents, system prompts repeated back verbatim, secrets surfaced from context, and tools invoked on an attacker's behalf. Models are also non-deterministic, so a single manual test proves very little. LLMSec makes these checks repeatable against any chat endpoint.",
    implementation: [
      "13 probes across five categories — prompt injection, prompt leak, data leak, tool abuse and output handling — each with a severity and its own response check.",
      "Every probe runs multiple times (--tries) with a fresh random canary token, because models don't answer the same way twice.",
      "The canary is split into two halves inside the prompt, so an application that merely echoes input can't trigger a false positive — only a model that follows the instruction reassembles it.",
      "Response checks look for the reassembled canary, system-prompt markers and known prompt fragments (--known), secret patterns (API keys, AWS keys, private keys), cloud-metadata responses, `id` command output and markdown-image exfiltration links.",
      "A generic target adapter: any JSON chat API works via a request template with a {{PROMPT}} placeholder, a dotted response path and custom headers.",
      "Writes report.md and report.json, and exits non-zero when a probe succeeds.",
    ],
    features: [
      "Direct, fake-system-tag, indirect (document), base64 and roleplay injection",
      "System-prompt extraction checks",
      "Credential and cross-user data leakage checks",
      "SSRF-via-browse-tool and command-execution-via-code-tool checks",
      "Markdown image exfiltration detection",
      "Explicit --authorized flag required to run",
      "Bundled intentionally vulnerable demo app",
    ],
    stack: ["Python 3.9+", "Standard library only", "Prompt injection", "RAG security", "AI application security"],
    roadmap: ["Multi-turn attacks", "RAG poisoning (upload a document, query it later)", "SARIF output", "LLM judge instead of regex checks"],
    usage: [
      { label: "Local demo", command: "python -m llmsec --url http://127.0.0.1:8000 --authorized --known sk-acme" },
      {
        label: "Real target",
        command:
          "python -m llmsec --url https://app.example.com/api/chat \\\n  --template '{\"messages\":[{\"role\":\"user\",\"content\":\"{{PROMPT}}\"}]}' \\\n  --path choices.0.message.content --authorized",
      },
    ],
    repo: "https://github.com/mrityunjayk-hash/llmsec",
    license: "MIT",
    visual: "canary",
  },
  {
    slug: "portforge",
    index: "02",
    name: "PortForge",
    tagline: "A port scanner built from raw packets up.",
    summary:
      "A zero-dependency Python port scanner with SYN, connect, UDP, NULL, FIN, XMAS and ACK scans, banner-based service detection, TTL-based OS guessing and signature-based vulnerability checks.",
    problem:
      "Production scanners are powerful but opaque — it's easy to run a SYN scan without understanding what actually goes on the wire. PortForge reimplements the core of network reconnaissance in a single readable Python file, constructing its own IP and TCP headers, so every technique can be inspected, modified and learned from — and run anywhere without installing a toolchain.",
    implementation: [
      "A raw-socket scanner that hand-builds IPv4 and TCP headers (flags, window, checksums) for SYN, ACK and flag-based (NULL, FIN, XMAS) scans, and interprets SYN-ACK / RST responses.",
      "ICMP host discovery with a TCP connect fallback; -Pn skips discovery.",
      "TTL-based OS guess from the ICMP reply (Linux/Unix, Windows, network device).",
      "Banner grabbing with protocol-specific probes (HTTP, SSH, FTP, SMTP, MySQL, Redis, MongoDB) and regex version detection for services such as OpenSSH, Apache, nginx, IIS, vsftpd, ProFTPD, Postfix, Exim, MySQL and MariaDB.",
      "--script runs signature checks against banners, e.g. flagging vsFTPd 2.3.4 (CVE-2011-2523) or unauthenticated Redis.",
      "Concurrent scanning with ThreadPoolExecutor, timing profiles T0–T5, adjustable threads, delay and port-order randomisation.",
    ],
    features: [
      "Targets as IP, hostname, CIDR or range",
      "Top-1000, custom lists, ranges or all 65,535 ports",
      "TCP connect scan without root; raw scans with sudo",
      "Output as JSON, XML or grepable text",
      "Single file, no pip installs",
    ],
    stack: ["Python", "Raw sockets", "TCP/IP", "ICMP", "Multi-threading"],
    usage: [
      { label: "SYN scan, ports 1–1000", command: "sudo python3 portforge.py 192.168.1.1 -sS -p 1-1000" },
      { label: "Service checks + JSON", command: "python3 portforge.py 192.168.1.1 --script -o results.json" },
    ],
    repo: "https://github.com/mrityunjayk-hash/PortForge",
    license: "MIT",
    visual: "flags",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
