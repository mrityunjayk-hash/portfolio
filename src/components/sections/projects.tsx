import { getProject } from "@/content/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { LlmsecShowcase } from "@/components/projects/llmsec-showcase";
import { PortforgeShowcase } from "@/components/projects/portforge-showcase";

export function Projects() {
  const llmsec = getProject("llmsec")!;
  const portforge = getProject("portforge")!;

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative pt-24 pb-24 sm:pt-32 sm:pb-32">
      <div className="container-x">
        <SectionHeading
          label="Projects"
          id="projects-title"
          title={["Tools I built to understand", { text: "how attacks actually work.", muted: true }]}
          lead="Both are open source, dependency-free Python. The demonstrations below are interactive illustrations of how each tool works — not screenshots."
        />
      </div>

      <LlmsecShowcase project={llmsec} />
      <PortforgeShowcase project={portforge} />
    </section>
  );
}
