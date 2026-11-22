/**
 * Technical arsenal. No proficiency ratings by design — each item can carry
 * a short note describing what it is used for.
 */

export type ArsenalItem = { name: string; note?: string };
export type ArsenalGroup = {
  id: string;
  title: string;
  blurb: string;
  items: ArsenalItem[];
  featured?: boolean;
};

export const arsenal: ArsenalGroup[] = [
  {
    id: "offensive",
    title: "Offensive Security",
    blurb: "The core of the work: finding where an application or network trusts the wrong thing.",
    featured: true,
    items: [
      { name: "Web application pentesting", note: "Auth, session handling, injection and business logic" },
      { name: "API pentesting", note: "Object- and function-level authorization, token scoping" },
      { name: "Access control & IDOR", note: "Cross-tenant and cross-role data exposure" },
      { name: "Authentication bypass", note: "Middleware and logic flaws in auth flows" },
      { name: "Network pentesting", note: "Discovery, enumeration and service exploitation" },
      { name: "Reconnaissance & enumeration" },
      { name: "Exploitation" },
      { name: "Privilege escalation", note: "Linux and Windows" },
      { name: "Tunneling & pivoting", note: "Reaching internal segments from a foothold" },
      { name: "Vulnerability assessment" },
    ],
  },
  {
    id: "tools",
    title: "Security Tools",
    blurb: "Day-to-day tooling.",
    items: [
      { name: "Burp Suite", note: "Intercepting, replaying and tampering with web/API traffic" },
      { name: "Nmap", note: "Host discovery, port and service scanning" },
      { name: "Metasploit", note: "Exploitation and post-exploitation in labs" },
      { name: "BloodHound", note: "Mapping Active Directory attack paths" },
      { name: "Wireshark", note: "Packet capture and protocol analysis" },
      { name: "Gobuster", note: "Directory, vhost and DNS brute-forcing" },
      { name: "Hydra", note: "Online credential attacks against services" },
      { name: "John the Ripper", note: "Offline password hash cracking" },
    ],
  },
  {
    id: "ai",
    title: "AI / LLM Security",
    blurb: "Built into LLMSec.",
    items: [
      { name: "Prompt injection", note: "Direct, indirect, encoded and roleplay variants" },
      { name: "System-prompt leakage" },
      { name: "RAG security", note: "Instructions hidden in retrieved content" },
      { name: "Tool / agent abuse", note: "SSRF and command execution through model tools" },
      { name: "Output handling", note: "Markdown image exfiltration" },
    ],
  },
  {
    id: "code",
    title: "Programming & Scripting",
    blurb: "For tooling, automation and reading target code.",
    items: [
      { name: "Python", note: "Primary language — PortForge and LLMSec" },
      { name: "Bash", note: "Automation and recon glue" },
      { name: "JavaScript", note: "Reading and testing client-side code" },
      { name: "C" },
      { name: "SQL" },
    ],
  },
  {
    id: "platforms",
    title: "Platforms & OS",
    blurb: "Where the work runs.",
    items: [
      { name: "Kali Linux" },
      { name: "Parrot OS" },
      { name: "Linux" },
      { name: "Windows" },
      { name: "Docker" },
      { name: "VMware Workstation" },
      { name: "VirtualBox" },
    ],
  },
  {
    id: "network",
    title: "Networking",
    blurb: "The layer under every test.",
    items: [
      { name: "TCP/IP", note: "Down to header flags — see PortForge" },
      { name: "Socket programming" },
      { name: "Packet analysis" },
    ],
  },
  {
    id: "defensive",
    title: "Defensive Awareness",
    blurb: "Knowing what the blue team sees.",
    items: [
      { name: "SIEM — Splunk, Wazuh" },
      { name: "Log analysis" },
      { name: "MITRE ATT&CK" },
      { name: "Infrastructure hardening" },
    ],
  },
];
