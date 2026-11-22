import type { Project } from "@/content/projects";
import { CanaryFlow } from "./canary-flow";
import { FlagExplorer } from "./flag-explorer";

export function ProjectVisual({ visual }: { visual: Project["visual"] }) {
  return (
    <figure className="relative overflow-hidden rounded-[3px] border border-line bg-[linear-gradient(180deg,var(--surface),rgba(17,19,23,0.4))] shadow-[0_50px_100px_-50px_rgba(0,0,0,0.9)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />
      {visual === "flags" ? <FlagExplorer /> : <CanaryFlow />}
      <figcaption className="sr-only">
        Interactive illustration of how {visual === "flags" ? "PortForge's scan techniques" : "LLMSec's split-canary check"} work. Not a
        screenshot.
      </figcaption>
    </figure>
  );
}
