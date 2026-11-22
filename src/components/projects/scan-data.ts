/**
 * Scan techniques PortForge implements and how a target's reply maps to a
 * port verdict (standard RFC 793 behaviour, as interpreted by PortForge).
 */

export const FLAGS = ["CWR", "ECE", "URG", "ACK", "PSH", "RST", "SYN", "FIN"] as const;
export type Flag = (typeof FLAGS)[number];

export type Scan = {
  id: string;
  label: string;
  cli: string;
  root: boolean;
  proto: "TCP" | "UDP";
  flags: Flag[];
  note: string;
  outcomes: { reply: string; verdict: string; tone: "open" | "closed" | "unknown" }[];
};

export const SCANS: Scan[] = [
  {
    id: "syn",
    label: "SYN",
    cli: "-sS",
    root: true,
    proto: "TCP",
    flags: ["SYN"],
    note: "Half-open: the handshake is never completed.",
    outcomes: [
      { reply: "SYN/ACK", verdict: "open", tone: "open" },
      { reply: "RST", verdict: "closed", tone: "closed" },
      { reply: "no reply", verdict: "filtered", tone: "unknown" },
    ],
  },
  {
    id: "null",
    label: "NULL",
    cli: "-sN",
    root: true,
    proto: "TCP",
    flags: [],
    note: "No flags at all. RFC-compliant stacks answer closed ports with RST.",
    outcomes: [
      { reply: "RST", verdict: "closed", tone: "closed" },
      { reply: "no reply", verdict: "open | filtered", tone: "unknown" },
    ],
  },
  {
    id: "fin",
    label: "FIN",
    cli: "-sF",
    root: true,
    proto: "TCP",
    flags: ["FIN"],
    note: "A FIN without a connection. Closed ports reset it.",
    outcomes: [
      { reply: "RST", verdict: "closed", tone: "closed" },
      { reply: "no reply", verdict: "open | filtered", tone: "unknown" },
    ],
  },
  {
    id: "xmas",
    label: "XMAS",
    cli: "-sX",
    root: true,
    proto: "TCP",
    flags: ["URG", "PSH", "FIN"],
    note: "FIN, PSH and URG lit up together — the packet is “lit like a tree”.",
    outcomes: [
      { reply: "RST", verdict: "closed", tone: "closed" },
      { reply: "no reply", verdict: "open | filtered", tone: "unknown" },
    ],
  },
  {
    id: "ack",
    label: "ACK",
    cli: "-sA",
    root: true,
    proto: "TCP",
    flags: ["ACK"],
    note: "Maps firewall rules rather than open ports.",
    outcomes: [
      { reply: "RST", verdict: "unfiltered", tone: "open" },
      { reply: "no reply", verdict: "filtered", tone: "unknown" },
    ],
  },
  {
    id: "udp",
    label: "UDP",
    cli: "-sU",
    root: true,
    proto: "UDP",
    flags: [],
    note: "No flags — silence is ambiguous, so UDP scans are slow and noisy.",
    outcomes: [
      { reply: "UDP data", verdict: "open", tone: "open" },
      { reply: "ICMP unreachable", verdict: "closed", tone: "closed" },
      { reply: "no reply", verdict: "open | filtered", tone: "unknown" },
    ],
  },
];
