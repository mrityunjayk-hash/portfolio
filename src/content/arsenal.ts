import type { LogoId } from "./logos";

/**
 * Technical arsenal. No proficiency ratings by design — each item can carry
 * a short note describing what it is used for.
 *
 * Visual mark per item, in order of preference:
 *  - `logo`: an official brand mark from src/content/logos.ts
 *  - `icon`: a Lucide icon name (see ICONS in components/arsenal/arsenal-icon.tsx) for concepts
 *  - `mark`: a short typographic monogram for tools without an available official logo
 */

export type ArsenalIcon =
  | "network"
  | "cable"
  | "activity"
  | "database"
  | "scroll"
  | "shield"
  | "syringe"
  | "file-lock"
  | "library"
  | "wrench"
  | "image-up";

export type ArsenalItem = { name: string; note?: string; logo?: LogoId; icon?: ArsenalIcon; mark?: string };
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
      { name: "Burp Suite", logo: "burpsuite", note: "Intercepting, replaying and tampering with web/API traffic" },
      { name: "Nmap", mark: "nmap", note: "Host discovery, port and service scanning" },
      { name: "Metasploit", logo: "metasploit", note: "Exploitation and post-exploitation in labs" },
      { name: "BloodHound", mark: "BH", note: "Mapping Active Directory attack paths" },
      { name: "Wireshark", logo: "wireshark", note: "Packet capture and protocol analysis" },
      { name: "Gobuster", mark: "gb", note: "Directory, vhost and DNS brute-forcing" },
      { name: "Hydra", mark: "hy", note: "Online credential attacks against services" },
      { name: "John the Ripper", mark: "JtR", note: "Offline password hash cracking" },
    ],
  },
  {
    id: "ai",
    title: "AI / LLM Security",
    blurb: "Built into LLMSec.",
    items: [
      { name: "Prompt injection", icon: "syringe", note: "Direct, indirect, encoded and roleplay variants" },
      { name: "System-prompt leakage", icon: "file-lock" },
      { name: "RAG security", icon: "library", note: "Instructions hidden in retrieved content" },
      { name: "Tool / agent abuse", icon: "wrench", note: "SSRF and command execution through model tools" },
      { name: "Output handling", icon: "image-up", note: "Markdown image exfiltration" },
    ],
  },
  {
    id: "code",
    title: "Programming & Scripting",
    blurb: "For tooling, automation and reading target code.",
    items: [
      { name: "Python", logo: "python", note: "Primary language — PortForge and LLMSec" },
      { name: "Bash", logo: "bash", note: "Automation and recon glue" },
      { name: "JavaScript", logo: "javascript", note: "Reading and testing client-side code" },
      { name: "C", logo: "c" },
      { name: "SQL", icon: "database" },
    ],
  },
  {
    id: "platforms",
    title: "Platforms & OS",
    blurb: "Where the work runs.",
    items: [
      { name: "Kali Linux", logo: "kali" },
      { name: "Parrot OS", logo: "parrot" },
      { name: "Linux", logo: "linux" },
      { name: "Windows", logo: "windows" },
      { name: "Docker", logo: "docker" },
      { name: "VMware Workstation", logo: "vmware" },
      { name: "VirtualBox", logo: "virtualbox" },
    ],
  },
  {
    id: "network",
    title: "Networking",
    blurb: "The layer under every test.",
    items: [
      { name: "TCP/IP", icon: "network", note: "Down to header flags — see PortForge" },
      { name: "Socket programming", icon: "cable" },
      { name: "Packet analysis", icon: "activity" },
    ],
  },
  {
    id: "defensive",
    title: "Defensive Awareness",
    blurb: "Knowing what the blue team sees.",
    items: [
      { name: "Splunk", logo: "splunk", note: "SIEM" },
      { name: "Wazuh", mark: "wz", note: "SIEM / XDR" },
      { name: "Log analysis", icon: "scroll" },
      { name: "MITRE ATT&CK", mark: "ATT&CK" },
      { name: "Infrastructure hardening", icon: "shield" },
    ],
  },
];
