"use client";

/**
 * V7 HUD — top progress, zoom pill, corner readout, scroll dots, reticle.
 * Pure presentation; reads MotionValue progress + plain numeric activeIndex.
 */

import { motion, useTransform, type MotionValue } from "framer-motion";

const PAPER = "#FCFCFA";
const INK = "#0A0A0A";
const RED = "#FF1E1E";
const GREY = "#9A9A9A";
const MONO =
  '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

export type LevelMeta = { code: string; name: string };

function formatZoom(z: number): string {
  if (z < 1000) return `${Math.round(z)}×`;
  if (z < 1_000_000) return `${(z / 1000).toFixed(z < 10_000 ? 1 : 0)}K×`;
  return `${(z / 1_000_000).toFixed(2)}M×`;
}

/* ---------- Top progress bar ---------- */

export function TopProgress({ progress }: { progress: MotionValue<number> }) {
  const width = useTransform(progress, (p) => `${p * 100}%`);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 120, pointerEvents: "none", background: "rgba(10,10,10,0.06)" }}>
      <motion.div style={{ height: "100%", width, background: RED, boxShadow: `0 0 12px rgba(255,30,30,0.55)` }} />
    </div>
  );
}

/* ---------- Zoom HUD: center pill + corner readout ---------- */

export function ZoomHUD({
  progress, activeIndex, levels, zoomLevels, liveZoom,
}: {
  progress: MotionValue<number>;
  activeIndex: number;
  levels: LevelMeta[];
  zoomLevels: number[];
  liveZoom: (p: number) => number;
}) {
  const zoomText = useTransform(progress, (p) => formatZoom(liveZoom(p)));
  const scrollPct = useTransform(progress, (p) => `${(p * 100).toFixed(1)}%`);

  const pillS: React.CSSProperties = {
    position: "fixed", top: 18, left: "50%", transform: "translateX(-50%)",
    zIndex: 110, pointerEvents: "none", display: "inline-flex",
    alignItems: "center", gap: 12, padding: "8px 16px",
    background: INK, color: PAPER, fontFamily: MONO, fontSize: 10.5,
    letterSpacing: "0.32em", textTransform: "uppercase", borderRadius: 999,
    boxShadow: "0 14px 40px rgba(10,10,10,0.18)",
  };
  const cornerS: React.CSSProperties = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    pointerEvents: "none", padding: "20px 28px", display: "flex",
    justifyContent: "space-between", alignItems: "flex-start",
    fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em", color: INK,
  };

  const cur = levels[activeIndex];

  return (
    <>
      <div style={pillS}>
        <span aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", background: RED, boxShadow: `0 0 10px ${RED}` }} />
        <span>§ {cur.code} / {cur.name}</span>
        <span style={{ color: GREY }}>·</span>
        <span style={{ color: RED }}>ZOOM {formatZoom(zoomLevels[activeIndex])}</span>
      </div>
      <div style={cornerS}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, background: RED, borderRadius: "50%", boxShadow: "0 0 0 2px rgba(255,30,30,0.18)" }} />
            <span style={{ fontWeight: 600, letterSpacing: "0.18em" }}>KPT — RECURSIVE ZOOM / V7</span>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", maxWidth: 520 }}>
            {zoomLevels.map((z, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, opacity: i === activeIndex ? 1 : 0.32 }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: i === activeIndex ? RED : GREY }} />
                <span style={{ fontVariantNumeric: "tabular-nums" }}>{formatZoom(z)}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 6, minWidth: 200 }}>
          <div style={{ fontSize: 10, opacity: 0.55, letterSpacing: "0.22em" }}>ZOOM LEVEL</div>
          <motion.div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "0.04em", lineHeight: 1, color: RED, fontVariantNumeric: "tabular-nums" }}>
            {zoomText}
          </motion.div>
          <motion.div style={{ fontSize: 10, opacity: 0.55, letterSpacing: "0.18em", fontVariantNumeric: "tabular-nums" }}>
            {scrollPct}
          </motion.div>
        </div>
      </div>
    </>
  );
}

/* ---------- Scroll dots (right rail) ---------- */

export function ScrollDots({
  activeIndex, settledIndex, levels, onJump,
}: {
  activeIndex: number;
  settledIndex: number | null;
  levels: LevelMeta[];
  onJump: (l: number) => void;
}) {
  return (
    <nav
      aria-label="Zoom level navigation"
      style={{
        position: "fixed", right: 28, top: "50%",
        transform: "translateY(-50%)", zIndex: 110,
        display: "flex", flexDirection: "column", gap: 14, alignItems: "center",
      }}
    >
      {levels.map((l, i) => {
        const isActive = i === activeIndex;
        const isSettled = i === settledIndex;
        return (
          <button
            key={l.code}
            type="button"
            aria-label={`Jump to level ${l.code} ${l.name}`}
            onClick={() => onJump(i)}
            style={{
              all: "unset", cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center",
              width: 18, height: 18,
            }}
          >
            <span
              style={{
                width: 8, height: 8, borderRadius: "50%",
                background: isActive ? RED : "rgba(10,10,10,0.28)",
                transform: `scale(${isActive ? 1.45 : 1})`,
                boxShadow: isSettled
                  ? "0 0 0 4px rgba(255,30,30,0.28)"
                  : isActive
                  ? "0 0 0 4px rgba(255,30,30,0.18)"
                  : "0 0 0 0 rgba(0,0,0,0)",
                display: "block",
                transition: "background 200ms ease, transform 200ms ease, box-shadow 200ms ease",
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}

/* ---------- Corner reticle ---------- */

export function Reticle() {
  const c = (extra: React.CSSProperties): React.CSSProperties => ({
    position: "absolute", width: 18, height: 18, borderColor: INK,
    opacity: 0.5, pointerEvents: "none", zIndex: 90, ...extra,
  });
  const B = "1px solid";
  return (
    <>
      <div style={c({ top: 16, left: 16, borderTop: B, borderLeft: B })} />
      <div style={c({ top: 16, right: 16, borderTop: B, borderRight: B })} />
      <div style={c({ bottom: 16, left: 16, borderBottom: B, borderLeft: B })} />
      <div style={c({ bottom: 16, right: 16, borderBottom: B, borderRight: B })} />
      <div
        style={{
          position: "absolute", top: "50%", left: "50%",
          width: 28, height: 28, transform: "translate(-50%, -50%)",
          pointerEvents: "none", zIndex: 91, opacity: 0.18,
        }}
      >
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: RED }} />
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: RED }} />
      </div>
    </>
  );
}

/* ---------- Prev/Next nav buttons (top-right) ---------- */

export function PrevNextNav({
  atFirst, atLast, onPrev, onNext,
}: {
  atFirst: boolean;
  atLast: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div style={{ position: "fixed", top: 56, right: 56, zIndex: 130, display: "flex", gap: 8 }}>
      <button
        type="button"
        onClick={onPrev}
        disabled={atFirst}
        aria-label="Zoom out one level"
        className="v7-nav-btn"
        style={{ opacity: atFirst ? 0.32 : 1, cursor: atFirst ? "default" : "pointer" }}
      >
        ↑
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={atLast}
        aria-label="Zoom in one level"
        className="v7-nav-btn"
        style={{ opacity: atLast ? 0.32 : 1, cursor: atLast ? "default" : "pointer" }}
      >
        ↓
      </button>
    </div>
  );
}

/* ---------- Bottom hint ---------- */

export function ScrollHint({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden
      className={`v7-next-hint ${visible ? "is-on" : ""}`}
      style={{
        position: "fixed", bottom: 38, left: "50%",
        transform: "translateX(-50%)", zIndex: 90,
        fontFamily: MONO, fontSize: 10, letterSpacing: "0.32em",
        textTransform: "uppercase", color: RED, whiteSpace: "nowrap",
        display: "flex", alignItems: "center", gap: 10, pointerEvents: "none",
      }}
    >
      <span>SCROLL TO ZOOM IN</span>
      <span className="v7-next-arrow">↓</span>
    </div>
  );
}

/* ---------- Engine-scoped CSS ---------- */

export function EngineStyles() {
  return (
    <style>{`
      .v7-sr-only { position: absolute !important; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
      html, body { overflow: hidden !important; height: 100%; }
      .v7-level-settled { box-shadow: inset 0 0 0 1px ${RED}88, inset 0 0 28px ${RED}33, 0 0 60px ${RED}1f; transition: box-shadow 360ms ease-out; }
      .v7-nav-btn { all: unset; width: 36px; height: 36px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid ${RED}66; background: rgba(252,252,250,0.92); color: ${RED}; font-family: ${MONO}; font-size: 16px; letter-spacing: 0.04em; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); transition: background 200ms, border-color 200ms, transform 200ms, box-shadow 200ms; }
      .v7-nav-btn:hover:not(:disabled) { background: ${RED}1a; border-color: ${RED}; box-shadow: 0 0 14px ${RED}66; transform: translateY(-1px); }
      .v7-nav-btn:focus-visible { outline: none; box-shadow: 0 0 0 2px ${INK}, 0 0 14px ${RED}66; }
      .v7-nav-btn:disabled { cursor: default; }
      .v7-next-hint { opacity: 0; transition: opacity 600ms ease-out; }
      .v7-next-hint.is-on { opacity: 0.85; }
      .v7-next-arrow { display: inline-block; animation: v7-bounce 1.6s ease-in-out infinite; }
      @keyframes v7-bounce { 0%, 100% { transform: translateY(0); opacity: 0.6; } 50% { transform: translateY(4px); opacity: 1; } }
      [data-level]::-webkit-scrollbar { width: 6px; }
      [data-level]::-webkit-scrollbar-track { background: transparent; }
      [data-level]::-webkit-scrollbar-thumb { background: ${RED}33; border-radius: 3px; }
      [data-level]::-webkit-scrollbar-thumb:hover { background: ${RED}66; }
      @media (prefers-reduced-motion: reduce) { .v7-next-arrow { animation: none; } }
    `}</style>
  );
}

/* ---------- Skip link ---------- */

export function SkipLink() {
  return (
    <a
      href="#v7-content"
      style={{ position: "absolute", top: -100, left: 0, padding: 12, background: INK, color: PAPER, zIndex: 200 }}
      onFocus={(e) => { e.currentTarget.style.top = "8px"; }}
      onBlur={(e) => { e.currentTarget.style.top = "-100px"; }}
    >
      Skip to content
    </a>
  );
}

export { formatZoom };
