"use client";

/**
 * StrataHud — V6 Strata HUD chrome (top bar, dot nav, background field).
 *
 * Extracted from StrataEngine to keep that file under the 500-line cap.
 * All MotionValue subscriptions live here; no useTransform inside .map
 * children — we mirror progress to dedicated MotionValues via .on("change").
 */

import { useEffect, useMemo } from "react";
import { motion, motionValue, type MotionValue } from "framer-motion";

export const PALETTE = {
  void: "#0B0B0F",
  paper: "#F4F1EB",
  molten: "#FF5E1A",
  sage: "#7B8E6F",
  ink: "#1A1A22",
} as const;

export const MONO =
  "ui-monospace, 'JetBrains Mono', SFMono-Regular, Menlo, monospace";

export type PlaneDef = {
  id: string;
  label: string;
  Component: React.ComponentType;
};

/* ---------- static stack fallback (mobile + reduced-motion) ---------- */

export function StaticStack({ planes }: { planes: readonly PlaneDef[] }) {
  return (
    <main
      style={{
        background: PALETTE.void,
        color: PALETTE.paper,
        minHeight: "100vh",
      }}
    >
      <a
        href="#strata-content"
        style={{
          position: "fixed",
          left: -9999,
          top: 0,
          background: PALETTE.molten,
          color: PALETTE.paper,
          padding: "10px 16px",
          zIndex: 100,
          fontFamily: MONO,
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
        }}
        onFocus={(e) => {
          e.currentTarget.style.left = "16px";
          e.currentTarget.style.top = "16px";
        }}
        onBlur={(e) => {
          e.currentTarget.style.left = "-9999px";
        }}
      >
        Skip to content
      </a>
      <div id="strata-content">
        {planes.map((p) => {
          const C = p.Component;
          return (
            <section
              key={p.id}
              id={`stratum-${p.id}`}
              style={{ position: "relative", minHeight: "100vh" }}
            >
              <C />
            </section>
          );
        })}
      </div>
    </main>
  );
}

/* ---------- inline style block (extracted from engine) ---------- */

export function StrataStyles() {
  return (
    <style>{`
        .strata-sr-only { position: absolute !important; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
        .strata-skip { position: fixed; left: -9999px; top: 8px; background: ${PALETTE.molten}; color: ${PALETTE.paper}; padding: 10px 16px; z-index: 100; font-family: ${MONO}; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; }
        .strata-skip:focus { left: 8px !important; outline: 2px solid ${PALETTE.molten}; }
        html, body { overflow: hidden !important; height: 100%; }
        .strata-panel-settled { box-shadow: 0 0 0 1px ${PALETTE.molten}66, 0 0 28px ${PALETTE.molten}33, 0 0 80px ${PALETTE.molten}1a; transition: box-shadow 360ms ease-out; }
        .strata-nav-btn { all: unset; width: 36px; height: 36px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid ${PALETTE.molten}55; background: rgba(11,11,15,0.78); color: ${PALETTE.molten}; font-family: ${MONO}; font-size: 16px; letter-spacing: 0.04em; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); transition: background 200ms, border-color 200ms, transform 200ms, box-shadow 200ms; }
        .strata-nav-btn:hover:not(:disabled) { background: ${PALETTE.molten}1a; border-color: ${PALETTE.molten}; box-shadow: 0 0 14px ${PALETTE.molten}66; transform: translateY(-1px); }
        .strata-nav-btn:focus-visible { outline: none; box-shadow: 0 0 0 2px ${PALETTE.paper}, 0 0 14px ${PALETTE.molten}66; }
        .strata-nav-btn:disabled { cursor: default; }
        .strata-next-hint { opacity: 0; transition: opacity 600ms ease-out; }
        .strata-next-hint.is-on { opacity: 0.85; }
        .strata-next-arrow { display: inline-block; animation: strata-bounce 1.6s ease-in-out infinite; }
        @keyframes strata-bounce { 0%, 100% { transform: translateY(0); opacity: 0.6; } 50% { transform: translateY(4px); opacity: 1; } }
        [data-panel]::-webkit-scrollbar { width: 6px; }
        [data-panel]::-webkit-scrollbar-track { background: transparent; }
        [data-panel]::-webkit-scrollbar-thumb { background: ${PALETTE.molten}33; border-radius: 3px; }
        [data-panel]::-webkit-scrollbar-thumb:hover { background: ${PALETTE.molten}66; }
        .strata-dot:hover .strata-dot-label { opacity: 1 !important; }
        .strata-dot:focus-visible { outline: 2px solid ${PALETTE.molten}; outline-offset: 4px; }
        @media (prefers-reduced-motion: reduce) { .strata-next-arrow { animation: none; } }
      `}</style>
  );
}

/* ---------- prev / next nav buttons ---------- */

export function NavButtons({
  onPrev,
  onNext,
  atFirst,
  atLast,
}: {
  onPrev: () => void;
  onNext: () => void;
  atFirst: boolean;
  atLast: boolean;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 56,
        right: 56,
        zIndex: 56,
        display: "flex",
        gap: 8,
      }}
    >
      <button
        type="button"
        onClick={onPrev}
        disabled={atFirst}
        aria-label="Previous plane"
        className="strata-nav-btn"
        style={{
          opacity: atFirst ? 0.32 : 1,
          cursor: atFirst ? "default" : "pointer",
        }}
      >
        ↑
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={atLast}
        aria-label="Next plane"
        className="strata-nav-btn"
        style={{
          opacity: atLast ? 0.32 : 1,
          cursor: atLast ? "default" : "pointer",
        }}
      >
        ↓
      </button>
    </div>
  );
}

/* ---------- bottom-center "scroll for next" hint ---------- */

export function NextHint({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden
      className={`strata-next-hint ${visible ? "is-on" : ""}`}
      style={{
        position: "fixed",
        bottom: 38,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 51,
        fontFamily: MONO,
        fontSize: 10,
        letterSpacing: "0.32em",
        textTransform: "uppercase",
        color: PALETTE.molten,
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
        gap: 10,
        pointerEvents: "none",
      }}
    >
      <span>SCROLL FOR NEXT</span>
      <span className="strata-next-arrow">↓</span>
    </div>
  );
}

/* ---------- top progress bar + identity pill ---------- */

function useMotionWidth(progress: MotionValue<number>) {
  const widthMV = useMemo(() => motionValue("0%"), []);
  useEffect(() => {
    const apply = (v: number) => widthMV.set(`${(v * 100).toFixed(2)}%`);
    apply(progress.get());
    const unsub = progress.on("change", apply);
    return () => unsub();
  }, [progress, widthMV]);
  return widthMV;
}

export function TopChrome({
  progress,
  activeIndex,
  planes,
}: {
  progress: MotionValue<number>;
  activeIndex: number;
  planes: readonly PlaneDef[];
}) {
  const plane = planes[activeIndex];
  const idx = String(activeIndex + 1).padStart(2, "0");
  const total = String(planes.length).padStart(2, "0");
  const width = useMotionWidth(progress);

  return (
    <>
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "rgba(244,241,235,0.06)",
          zIndex: 60,
          pointerEvents: "none",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width,
            background: PALETTE.molten,
            boxShadow: `0 0 12px ${PALETTE.molten}`,
          }}
        />
      </div>

      <div
        style={{
          position: "fixed",
          top: 18,
          left: 24,
          zIndex: 55,
          fontFamily: MONO,
          fontSize: 11,
          letterSpacing: "0.2em",
          color: PALETTE.paper,
          mixBlendMode: "difference",
          pointerEvents: "none",
        }}
      >
        <span style={{ color: PALETTE.molten, fontWeight: 600 }}>
          KPT // STRATA v6
        </span>
        <span style={{ opacity: 0.55, marginLeft: 12 }}>EST. 2004</span>
      </div>

      <div
        role="status"
        aria-live="polite"
        style={{
          position: "fixed",
          top: 14,
          left: "50%",
          translate: "-50% 0",
          zIndex: 55,
          padding: "8px 16px",
          background: "rgba(11,11,15,0.7)",
          border: `1px solid rgba(255,94,26,0.35)`,
          borderRadius: 999,
          backdropFilter: "blur(6px)",
          fontFamily: MONO,
          fontSize: 10,
          letterSpacing: "0.28em",
          color: PALETTE.paper,
          textTransform: "uppercase",
          pointerEvents: "none",
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <span style={{ color: PALETTE.molten, fontWeight: 700 }}>
          STRATUM {idx}
        </span>
        <span style={{ opacity: 0.4 }}>/</span>
        <span>{plane.label.toUpperCase()}</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span style={{ opacity: 0.6 }}>
          {idx} / {total}
        </span>
      </div>
    </>
  );
}

/* ---------- right-side dot navigation ---------- */

export function ScrollDotNav({
  activeIndex,
  settledIndex,
  onJump,
  planes,
}: {
  activeIndex: number;
  settledIndex: number | null;
  onJump: (i: number) => void;
  planes: readonly PlaneDef[];
}) {
  return (
    <nav
      aria-label="Plane navigation"
      style={{
        position: "fixed",
        right: 22,
        top: "50%",
        translate: "0 -50%",
        zIndex: 55,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        alignItems: "flex-end",
      }}
    >
      {planes.map((p, i) => {
        const active = i === activeIndex;
        const settled = i === settledIndex;
        return (
          <button
            key={p.id}
            type="button"
            aria-label={`Jump to ${p.label} plane`}
            aria-current={active ? "true" : undefined}
            onClick={() => onJump(i)}
            className="strata-dot"
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: 0,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontFamily: MONO,
              fontSize: 9,
              letterSpacing: "0.24em",
              color: active ? PALETTE.molten : "rgba(244,241,235,0.45)",
              textTransform: "uppercase",
              transition: "color 200ms ease",
            }}
          >
            <span
              className="strata-dot-label"
              style={{
                opacity: active ? 1 : 0,
                transition: "opacity 200ms ease",
                pointerEvents: "none",
              }}
            >
              {String(i + 1).padStart(2, "0")} · {p.label}
            </span>
            <span
              aria-hidden
              style={{
                width: settled ? 14 : active ? 12 : 8,
                height: settled ? 14 : active ? 12 : 8,
                borderRadius: 999,
                background: active ? PALETTE.molten : "rgba(244,241,235,0.35)",
                boxShadow: settled
                  ? `0 0 16px ${PALETTE.molten}`
                  : active
                  ? `0 0 12px ${PALETTE.molten}`
                  : "none",
                transition: "all 220ms ease",
                border: `1px solid ${
                  active ? PALETTE.molten : "rgba(244,241,235,0.5)"
                }`,
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}

/* ---------- ambient background field ---------- */

export function BackgroundField({ progress }: { progress: MotionValue<number> }) {
  const hatchY = useMemo(() => motionValue("0px"), []);
  const sageOp = useMemo(() => motionValue(0.18), []);
  useEffect(() => {
    const apply = (v: number) => {
      hatchY.set(`${(-220 * v).toFixed(2)}px`);
      const o =
        v < 0.5
          ? 0.18 + (v / 0.5) * (0.32 - 0.18)
          : 0.32 + ((v - 0.5) / 0.5) * (0.12 - 0.32);
      sageOp.set(o);
    };
    apply(progress.get());
    const unsub = progress.on("change", apply);
    return () => unsub();
  }, [progress, hatchY, sageOp]);

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: PALETTE.void,
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: "-10% -10%",
          backgroundImage: [
            `repeating-linear-gradient(45deg, rgba(244,241,235,0.045) 0 1px, transparent 1px 14px)`,
            `repeating-linear-gradient(-45deg, rgba(244,241,235,0.035) 0 1px, transparent 1px 14px)`,
          ].join(", "),
          y: hatchY,
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          left: "12%",
          top: "30%",
          width: "55vmax",
          height: "55vmax",
          background: `radial-gradient(circle at center, ${PALETTE.sage} 0%, transparent 60%)`,
          filter: "blur(80px)",
          opacity: sageOp,
          mixBlendMode: "screen",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          right: "-10%",
          bottom: "-10%",
          width: "45vmax",
          height: "45vmax",
          background: `radial-gradient(circle at center, ${PALETTE.molten} 0%, transparent 55%)`,
          filter: "blur(100px)",
          opacity: 0.18,
          mixBlendMode: "screen",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.65) 100%)",
        }}
      />
    </div>
  );
}
