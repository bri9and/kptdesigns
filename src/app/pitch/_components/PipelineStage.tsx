"use client";

import { motion, AnimatePresence } from "framer-motion";
import { type ReactNode } from "react";
import { palette, fonts } from "@/app/sites/lake-arthur/_lib/tokens";

export type PipelineStageProps = {
  /** Two-digit step number, e.g. "01" */
  stepNumber: string;
  /** Eyebrow label, e.g. "Brand DNA" */
  eyebrow: string;
  /** Big in-progress label that pulses while active. */
  workingLabel: string;
  /** True while this stage is the current one. */
  isActive: boolean;
  /** True once the stage has revealed its payload (kept visible after). */
  hasRevealed: boolean;
  children: ReactNode;
};

export function PipelineStage({
  stepNumber,
  eyebrow,
  workingLabel,
  isActive,
  hasRevealed,
  children,
}: PipelineStageProps) {
  return (
    <section
      className={`ps-stage${isActive ? " is-active" : ""}${hasRevealed ? " is-revealed" : ""}`}
      aria-live={isActive ? "polite" : undefined}
    >
      <header className="ps-head">
        <p className="ps-eyebrow">
          <span className="ps-num">{stepNumber}</span>
          <span className="ps-dot">·</span>
          <span>{eyebrow}</span>
        </p>
        <p className={`ps-working${isActive && !hasRevealed ? " is-pulse" : ""}`}>
          {workingLabel}
          {isActive && !hasRevealed && (
            <span className="ps-dots" aria-hidden="true">
              <span>.</span><span>.</span><span>.</span>
            </span>
          )}
        </p>
      </header>

      <AnimatePresence>
        {hasRevealed && (
          <motion.div
            className="ps-payload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 0.96, 0.32, 1] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{css}</style>
    </section>
  );
}

const css = `
.ps-stage { padding: 2rem 0; border-top: 1px solid rgba(244,239,223,0.08); opacity: 0.55; transition: opacity 350ms ease; }
.ps-stage.is-active, .ps-stage.is-revealed { opacity: 1; }
.ps-stage:first-child { border-top: none; }
.ps-head { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.25rem; }
.ps-eyebrow { display: inline-flex; align-items: center; gap: 0.5rem; font-family: ${fonts.body}; font-size: 0.7rem; letter-spacing: 0.32em; text-transform: uppercase; opacity: 0.7; margin: 0; color: ${palette.dawn}; }
.ps-num { font-family: ${fonts.mono}; font-size: 0.7rem; letter-spacing: 0.18em; opacity: 0.85; }
.ps-dot { opacity: 0.5; }
.ps-working { font-family: ${fonts.display}; font-style: italic; font-weight: 400; font-size: clamp(1.4rem, 2.6vw, 1.95rem); margin: 0; color: ${palette.cream}; line-height: 1.2; display: inline-flex; align-items: baseline; gap: 0.35em; }
.ps-working.is-pulse { animation: ps-pulse 1500ms ease-in-out infinite; }
.ps-dots { display: inline-flex; gap: 0.15em; }
.ps-dots span { animation: ps-dot 1200ms ease-in-out infinite; opacity: 0.4; }
.ps-dots span:nth-child(2) { animation-delay: 200ms; }
.ps-dots span:nth-child(3) { animation-delay: 400ms; }
.ps-payload { margin-top: 0.5rem; }
@keyframes ps-pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.55; }
}
@keyframes ps-dot {
  0%, 100% { opacity: 0.2; }
  50%      { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .ps-working.is-pulse { animation: none; }
  .ps-dots span { animation: none; opacity: 0.7; }
  .ps-stage { transition: none; }
}
`;
