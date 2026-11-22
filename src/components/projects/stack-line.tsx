import type { Project } from "@/content/projects";
import { TechMark } from "@/components/ui/tech-mark";

/** A project's technology stack as one quiet inline line: logo where one exists, dot separators, no boxes. */
export function StackLine({ stack, className = "" }: { stack: Project["stack"]; className?: string }) {
  return (
    <ul aria-label="Technologies" className={`flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-muted ${className}`}>
      {stack.map((s, i) => (
        <li key={s.label} className="group flex items-center gap-3">
          {i > 0 && <span aria-hidden="true" className="h-[3px] w-[3px] rounded-full bg-subtle" />}
          <span className="flex items-center gap-1.5">
            {s.logo && <TechMark logo={s.logo} size={14} className="text-fg" />}
            <span className={s.logo ? "text-fg" : ""}>{s.label}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
