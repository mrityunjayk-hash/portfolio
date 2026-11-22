import { Fragment } from "react";

/**
 * Splits text into words that rise out of a mask one after another when the
 * element scrolls into view (driven by RevealObserver + CSS, so it renders on
 * the server and stays readable without JavaScript).
 *
 * Pass plain strings; segments marked `muted` render in the muted colour.
 */

type Segment = string | { text: string; muted?: boolean; className?: string };

export function RevealWords({ segments, startIndex = 0 }: { segments: Segment[]; startIndex?: number }) {
  let i = startIndex;
  return segments.flatMap((seg, s) => {
    const { text, muted, className } = typeof seg === "string" ? { text: seg, muted: false, className: "" } : seg;
    return text
      .split(/\s+/)
      .filter(Boolean)
      .map((word, w) => (
        // The space must sit outside the masked box, or the browser collapses it.
        <Fragment key={`${s}-${w}`}>
          <span className={`w ${muted ? "text-muted" : ""} ${className ?? ""}`}>
            <span style={{ "--i": i++ } as React.CSSProperties}>{word}</span>
          </span>{" "}
        </Fragment>
      ));
  });
}
