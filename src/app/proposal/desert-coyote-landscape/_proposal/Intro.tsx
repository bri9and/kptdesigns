"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { palette, fonts } from "@/app/sites/desert-coyote-landscape/_lib/tokens";

const STORAGE_KEY = "kpt:proposal:desert-coyote-landscape:intro-seen";

export function Intro({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1") {
      setShow(false);
      onDone();
      return;
    }
    const t = setTimeout(() => {
      finish();
    }, 3500);
    return () => clearTimeout(t);
  }, []);

  function finish() {
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, "1");
    setShow(false);
    onDone();
  }

  useEffect(() => {
    function handler(e: KeyboardEvent | MouseEvent) {
      if ("key" in e && e.key === "Escape") return; // Esc allowed but not needed
      if (show) finish();
    }
    window.addEventListener("keydown", handler);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("click", handler);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="dc-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          role="dialog"
          aria-modal="true"
          aria-label="Proposal intro"
        >
          <motion.p className="dc-intro__presents" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}>
            KPT Designs presents
          </motion.p>
          <motion.h1 className="dc-intro__title" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}>
            <em>A proposal for</em><br />Desert Coyote Landscape
          </motion.h1>
          <motion.p className="dc-intro__where" initial={{ opacity: 0 }} animate={{ opacity: 0.85 }} transition={{ delay: 2.4, duration: 0.6 }}>
            Mesa, AZ · April 2026
          </motion.p>
          <motion.p className="dc-intro__skip" initial={{ opacity: 0 }} animate={{ opacity: 0.55 }} transition={{ delay: 1.5, duration: 0.6 }}>
            Click anywhere to continue
          </motion.p>
          <style>{css}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const css = `
.dc-intro { position: fixed; inset: 0; z-index: 70; background: ${palette.charcoal}; color: ${palette.sand}; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.5rem; padding: 2rem; cursor: pointer; }
.dc-intro__presents { font-family: ${fonts.body}; font-weight: 200; font-size: 0.85rem; letter-spacing: 0.34em; text-transform: uppercase; opacity: 0.75; margin: 0; }
.dc-intro__title { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(2.4rem, 6vw, 4.6rem); line-height: 1.1; margin: 0; text-align: center; }
.dc-intro__title em { font-style: italic; opacity: 0.95; font-size: 0.78em; display: inline-block; margin-bottom: 0.25rem; color: ${palette.sunGold}; }
.dc-intro__where { font-family: ${fonts.body}; font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase; margin: 1rem 0 0; }
.dc-intro__skip { position: absolute; bottom: 2.5rem; font-family: ${fonts.body}; font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; margin: 0; }
@media (prefers-reduced-motion: reduce) { .dc-intro * { animation: none !important; transition: none !important; } }
`;
