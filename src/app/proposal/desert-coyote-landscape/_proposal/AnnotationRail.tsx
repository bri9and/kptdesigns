"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { annotations, type Annotation } from "./annotations";
import { palette, fonts } from "@/app/sites/desert-coyote-landscape/_lib/tokens";

const AUTO_DISMISS_MS = 5000;

export function AnnotationRail() {
  const [muted, setMuted] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
  const [poppedAnchor, setPoppedAnchor] = useState<string | null>(null);
  const [seenAnchors, setSeenAnchors] = useState<Set<string>>(new Set());
  const dismissTimer = useRef<number | null>(null);

  useEffect(() => {
    const observers = annotations.map((a) => {
      const el = document.getElementById(a.anchorId);
      if (!el) return null;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
              setActiveAnchor(a.anchorId);
              if (!muted && !seenAnchors.has(a.anchorId)) {
                setPoppedAnchor(a.anchorId);
                setSeenAnchors((prev) => new Set(prev).add(a.anchorId));
                if (dismissTimer.current) window.clearTimeout(dismissTimer.current);
                dismissTimer.current = window.setTimeout(() => setPoppedAnchor(null), AUTO_DISMISS_MS);
              }
            }
          });
        },
        { threshold: [0.4] }
      );
      obs.observe(el);
      return obs;
    });
    return () => {
      observers.forEach((o) => o?.disconnect());
      if (dismissTimer.current) window.clearTimeout(dismissTimer.current);
    };
  }, [muted, seenAnchors]);

  function showAnnotation(anchorId: string) {
    setPoppedAnchor(anchorId);
    if (dismissTimer.current) window.clearTimeout(dismissTimer.current);
    dismissTimer.current = window.setTimeout(() => setPoppedAnchor(null), AUTO_DISMISS_MS);
  }

  const popped: Annotation | null = poppedAnchor
    ? annotations.find((a) => a.anchorId === poppedAnchor) ?? null
    : null;

  return (
    <>
      <aside className="dc-rail" aria-label="Proposal annotations">
        <button
          className={`dc-rail__mute${muted ? " is-muted" : ""}`}
          onClick={() => setMuted((m) => !m)}
          aria-pressed={muted}
          aria-label={muted ? "Unmute annotations" : "Mute annotations"}
          title={muted ? "Annotations muted" : "Mute auto-pop annotations"}
        >
          {muted ? "🔕" : "🔔"}
        </button>
        <ol className="dc-rail__list">
          {annotations.map((a) => (
            <li key={a.anchorId}>
              <button
                className={`dc-rail__dot${activeAnchor === a.anchorId ? " is-active" : ""}`}
                onClick={() => showAnnotation(a.anchorId)}
                aria-label={`Show note for ${a.label}`}
                title={a.label}
              />
            </li>
          ))}
        </ol>
      </aside>
      <AnimatePresence>
        {popped && (
          <motion.div
            className="dc-rail__card"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.32 }}
          >
            <button className="dc-rail__close" onClick={() => setPoppedAnchor(null)} aria-label="Dismiss">×</button>
            <p className="dc-rail__what-label">What changed</p>
            <p className="dc-rail__what">{popped.what}</p>
            <p className="dc-rail__why-label">Why</p>
            <p className="dc-rail__why">{popped.why}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{css}</style>
    </>
  );
}

const css = `
.dc-rail { position: fixed; right: 0; top: 50%; transform: translateY(-50%); width: 28px; padding: 0.75rem 0; z-index: 30; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; pointer-events: auto; }
.dc-rail__mute { background: rgba(237,228,210,0.92); border: 1px solid rgba(0,0,0,0.18); border-radius: 999px; width: 26px; height: 26px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.78rem; cursor: pointer; padding: 0; transition: transform 180ms; }
.dc-rail__mute:hover { transform: scale(1.1); }
.dc-rail__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.55rem; align-items: center; background: rgba(237,228,210,0.88); padding: 0.7rem 0.4rem; border-radius: 999px; }
.dc-rail__dot { width: 9px; height: 9px; border-radius: 999px; background: rgba(26,22,18,0.35); border: none; cursor: pointer; padding: 0; transition: transform 180ms, background 180ms; }
.dc-rail__dot:hover, .dc-rail__dot:focus-visible { transform: scale(1.25); background: ${palette.charcoal}; outline: none; }
.dc-rail__dot.is-active { background: ${palette.terra}; box-shadow: 0 0 0 3px rgba(212,168,87,0.3); }
.dc-rail__card { position: fixed; right: 64px; top: 50%; transform: translateY(-50%); width: 320px; max-width: calc(100vw - 100px); background: ${palette.paper}; color: ${palette.charcoal}; border: 1px solid rgba(0,0,0,0.1); border-radius: 6px; padding: 1.5rem 1.6rem 1.4rem; box-shadow: 0 16px 48px rgba(0,0,0,0.18); font-family: ${fonts.body}; z-index: 31; }
.dc-rail__close { position: absolute; top: 0.55rem; right: 0.65rem; background: transparent; border: none; cursor: pointer; font-size: 1.2rem; line-height: 1; color: rgba(0,0,0,0.55); padding: 0.2rem 0.5rem; }
.dc-rail__close:hover { color: ${palette.charcoal}; }
.dc-rail__what-label, .dc-rail__why-label { font-size: 0.65rem; letter-spacing: 0.22em; text-transform: uppercase; color: ${palette.saguaro}; margin: 0 0 0.4rem; }
.dc-rail__why-label { margin-top: 1rem; color: ${palette.terra}; }
.dc-rail__what, .dc-rail__why { margin: 0; font-size: 0.92rem; line-height: 1.55; }
.dc-rail__what { font-family: ${fonts.display}; font-weight: 400; }
.dc-rail__why { color: ${palette.rock}; }
@media (prefers-reduced-motion: reduce) { .dc-rail__dot, .dc-rail__mute { transition: none; } }
@media (max-width: 640px) { .dc-rail { display: none; } }
`;
