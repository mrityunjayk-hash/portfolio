import type { Project } from "@/content/projects";
import { TextLink } from "@/components/ui/button-link";

export function ProjectLinks({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-x-8 gap-y-3 ${className}`}>
      <TextLink href={`/projects/${project.slug}`} className="text-[15px]">
        Read the case study
      </TextLink>
      <TextLink href={project.repo} external arrow="up-right" className="text-[15px] text-muted">
        Source on GitHub
      </TextLink>
      {project.demo && (
        <TextLink href={project.demo} external arrow="up-right" className="text-[15px] text-muted">
          Live demo
        </TextLink>
      )}
    </div>
  );
}
