"use client";

/**
 * NeuralHud — fixed-position chrome on top of the desktop neural scene:
 * - ProgressBar : top scroll-progress strip
 * - SectionPill : centered top label with section meta
 * - DotNav      : right-side dot navigation w/ hover label + settle pulse
 */

import { motion, useTransform, type MotionValue } from "framer-motion";

import { NEURAL_PALETTE, SECTIONS } from "./NeuralShared";

export function ProgressBar({ progress }: { progress: MotionValue<number> }) {
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-white/[0.04]" aria-hidden>
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX,
          background: `linear-gradient(90deg, ${NEURAL_PALETTE.cyan}, ${NEURAL_PALETTE.latent}, ${NEURAL_PALETTE.pink})`,
          boxShadow: `0 0 10px ${NEURAL_PALETTE.cyan}80`,
        }}
      />
    </div>
  );
}

export function SectionPill({ index }: { index: number }) {
  const s = SECTIONS[index] ?? SECTIONS[0];
  return (
    <div
      className="fixed top-5 left-1/2 -translate-x-1/2 z-[55] px-4 py-2 rounded-full backdrop-blur-md border pointer-events-none"
      style={{
        background: "rgba(2,3,10,0.55)",
        borderColor: "rgba(139,92,246,0.25)",
        boxShadow: "0 0 24px rgba(0,229,255,0.08)",
      }}
    >
      <span
        className="font-mono uppercase whitespace-nowrap"
        style={{ fontSize: 11, letterSpacing: "0.32em", color: NEURAL_PALETTE.text }}
      >
        <span style={{ color: NEURAL_PALETTE.cyan }}>§ {String(index + 1).padStart(2, "0")}</span>
        <span style={{ color: NEURAL_PALETTE.grey, margin: "0 10px" }}>/</span>
        {s.name}
        <span style={{ color: NEURAL_PALETTE.grey, margin: "0 10px" }}>·</span>
        <span style={{ color: NEURAL_PALETTE.latent }}>{s.layer}</span>
        <span style={{ color: NEURAL_PALETTE.grey, margin: "0 10px" }}>·</span>
        <span style={{ color: NEURAL_PALETTE.amber }}>α {s.activation}</span>
      </span>
    </div>
  );
}

export function DotNav({
  index,
  settledIndex,
  onJump,
}: {
  index: number;
  settledIndex: number | null;
  onJump: (i: number) => void;
}) {
  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-[55] flex flex-col gap-3"
    >
      {SECTIONS.map((s, i) => {
        const active = i === index;
        const settled = i === settledIndex;
        return (
          <button
            key={s.id}
            type="button"
            aria-label={`Jump to ${s.name}`}
            aria-current={active ? "true" : undefined}
            onClick={() => onJump(i)}
            className={`group relative flex items-center gap-3 outline-none kpt-n-dot${settled ? " kpt-n-dot--settled" : ""}`}
          >
            <span
              className="font-mono uppercase opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
              style={{ fontSize: 10, letterSpacing: "0.28em", color: NEURAL_PALETTE.text }}
            >
              {s.name}
            </span>
            <span
              className="block rounded-full transition-all"
              style={{
                width: active ? 12 : 6,
                height: active ? 12 : 6,
                background: active ? NEURAL_PALETTE.cyan : "rgba(155,163,199,0.35)",
                boxShadow: active ? `0 0 14px ${NEURAL_PALETTE.cyan}` : "none",
                outline: active ? `1px solid ${NEURAL_PALETTE.cyan}40` : "none",
                outlineOffset: 4,
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}

export function StaticBackdrop() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden
      style={{
        background: `
          radial-gradient(ellipse 60% 50% at 18% 30%, rgba(139,92,246,0.22), transparent 60%),
          radial-gradient(ellipse 70% 60% at 82% 65%, rgba(0,229,255,0.18), transparent 60%),
          radial-gradient(ellipse 40% 40% at 50% 90%, rgba(255,0,128,0.12), transparent 60%),
          ${NEURAL_PALETTE.void}
        `,
      }}
    />
  );
}
