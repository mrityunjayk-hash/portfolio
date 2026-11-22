import type { Project } from "@/content/projects";
import { CanaryFlow } from "./canary-flow";
import { FlagExplorer } from "./flag-explorer";

export function ProjectVisual({ visual }: { visual: Project["visual"] }) {
  return (
    <div className="panel relative h-full overflow-hidden shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-[radial-gradient(ellipse_at_center,rgba(198,244,50,0.06),transparent_70%)]"
      />
      {visual === "flags" ? <FlagExplorer /> : <CanaryFlow />}
    </div>
  );
}
