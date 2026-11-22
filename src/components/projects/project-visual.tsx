import type { Project } from "@/content/projects";
import { CanaryStage } from "./canary-stage";
import { FlagInstrument } from "./flag-instrument";
import { ProbeCatalogue } from "./probe-catalogue";

/** The project's interactive demonstration, as used on its case-study page. */
export function ProjectVisual({ visual }: { visual: Project["visual"] }) {
  if (visual === "flags") return <FlagInstrument />;
  return (
    <div className="space-y-24">
      <CanaryStage />
      <ProbeCatalogue />
    </div>
  );
}
