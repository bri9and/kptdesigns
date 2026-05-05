"use client";

/**
 * V7 fallback — vertical stack for mobile / reduced-motion users.
 * No zoom, no scroll-hijack — plain document flow with section dividers.
 */

import { JSX } from "react";
import { SkipLink, formatZoom } from "./RecursiveHud";

const PAPER = "#FCFCFA";
const INK = "#0A0A0A";
const RED = "#FF1E1E";
const MONO =
  '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

type LevelDef = {
  Component: () => JSX.Element;
  code: string;
  name: string;
};

export function FallbackStack({
  levels, zoomLevels,
}: {
  levels: LevelDef[];
  zoomLevels: number[];
}) {
  return (
    <main id="v7-content" style={{ background: PAPER, color: INK }}>
      <SkipLink />
      {levels.map((l, i) => {
        const Comp = l.Component;
        return (
          <section
            key={l.code}
            id={`level-${l.code}`}
            aria-label={`${l.name} — zoom ${formatZoom(zoomLevels[i])}`}
            style={{
              position: "relative",
              borderTop: i === 0 ? "none" : `1px solid ${RED}`,
            }}
          >
            <span
              aria-hidden
              style={{
                position: "absolute", top: 16, right: 16, zIndex: 50,
                fontFamily: MONO, fontSize: 10, letterSpacing: "0.28em",
                color: INK, background: PAPER, border: `1px solid ${INK}`,
                padding: "4px 8px", textTransform: "uppercase",
              }}
            >
              ZOOM {formatZoom(zoomLevels[i])}
            </span>
            <Comp />
          </section>
        );
      })}
    </main>
  );
}
