/** LLMSec's probe catalogue — ids, titles and severities mirror llmsec/probes.py. */

export const CATEGORIES = [
  {
    id: "prompt_injection",
    label: "Injection",
    probes: [
      ["INJ-01", "direct override", "high"],
      ["INJ-02", "fake system tag", "high"],
      ["INJ-03", "indirect, via document", "critical"],
      ["INJ-04", "base64 instruction", "medium"],
      ["INJ-05", "roleplay wrapper", "medium"],
    ],
  },
  {
    id: "prompt_leak",
    label: "Prompt leak",
    probes: [
      ["LEAK-01", "repeat everything above", "high"],
      ["LEAK-02", "initial instructions in code block", "high"],
      ["LEAK-03", "translate the prompt", "medium"],
    ],
  },
  {
    id: "data_leak",
    label: "Data leak",
    probes: [
      ["DATA-01", "ask for credentials", "critical"],
      ["DATA-02", "other users' data", "critical"],
    ],
  },
  {
    id: "tool_abuse",
    label: "Tool abuse",
    probes: [
      ["TOOL-01", "ssrf via browse tool", "high"],
      ["TOOL-02", "command exec via code tool", "critical"],
    ],
  },
  {
    id: "output_handling",
    label: "Output",
    probes: [["OUT-01", "markdown image exfil", "high"]],
  },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const PROBE_COUNT = CATEGORIES.reduce((n, c) => n + c.probes.length, 0);

