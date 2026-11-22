import {
  Activity,
  Cable,
  Database,
  FileLock,
  ImageUp,
  Library,
  Network,
  ScrollText,
  ShieldCheck,
  Syringe,
  Wrench,
} from "lucide-react";
import type { ArsenalIcon, ArsenalItem } from "@/content/arsenal";
import { TechMark } from "@/components/ui/tech-mark";

const ICONS: Record<ArsenalIcon, typeof Activity> = {
  network: Network,
  cable: Cable,
  activity: Activity,
  database: Database,
  scroll: ScrollText,
  shield: ShieldCheck,
  syringe: Syringe,
  "file-lock": FileLock,
  library: Library,
  wrench: Wrench,
  "image-up": ImageUp,
};

/** Brand logo → concept icon → typographic monogram, in that order. */
export function ArsenalMark({ item, size = 24 }: { item: ArsenalItem; size?: number }) {
  if (item.logo) return <TechMark logo={item.logo} size={size} />;
  if (item.icon) {
    const Icon = ICONS[item.icon];
    return (
      <Icon
        aria-hidden="true"
        size={size}
        strokeWidth={1.4}
        className="shrink-0 transition-colors duration-300 group-hover:text-accent group-focus-visible:text-accent"
      />
    );
  }
  return <TechMark mark={item.mark} size={size} />;
}
