"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { palette, fonts } from "@/app/sites/lake-arthur/_lib/tokens";

export function BeforeAfter() {
  const [showBefore, setShowBefore] = useState(false);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "b" || e.key === "B") setShowBefore((s) => !s);
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <div className="la-ba" role="group" aria-label="Before/after toggle">
        <button
          className={`la-ba__btn${!showBefore ? " is-active" : ""}`}
          onClick={() => setShowBefore(false)}
          aria-pressed={!showBefore}
        >
          After
        </button>
        <button
          className={`la-ba__btn${showBefore ? " is-active" : ""}`}
          onClick={() => setShowBefore(true)}
          aria-pressed={showBefore}
        >
          Before
        </button>
        <span className="la-ba__hint" aria-hidden="true">B</span>
      </div>
      <AnimatePresence>
        {showBefore && (
          <motion.div
            className="la-ba__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <BeforeView />
          </motion.div>
        )}
      </AnimatePresence>
      <style>{css}</style>
    </>
  );
}

function BeforeView() {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="la-ba__view">
      <div className="la-ba__view-tag">lakearthur.com — current site</div>
      {!imgError ? (
        <img
          src="/proposal/lake-arthur/before.png"
          alt="Screenshot of the current lakearthur.com homepage"
          onError={() => setImgError(true)}
        />
      ) : (
        <BeforePlaceholder />
      )}
    </div>
  );
}

// Stylized fallback if the screenshot is missing.
function BeforePlaceholder() {
  return (
    <div className="la-ba__placeholder">
      <header>
        <p className="logo">Lake Arthur Golf Club</p>
        <nav>Home · Golf Course · Facilities · Tournaments · Banquets · Shop · Contact</nav>
      </header>
      <div className="banner">
        <h1>Welcome to Lake Arthur</h1>
        <p>Picturesque golf course · Butler, PA</p>
        <a href="#">Book online ›</a>
      </div>
      <div className="grid">
        <div>About</div>
        <div>Course details</div>
        <div>Rates</div>
        <div>Contact</div>
      </div>
      <p className="phone">(724) 865-2765</p>
    </div>
  );
}

const css = `
.la-ba { position: fixed; bottom: 1.5rem; left: 1.5rem; z-index: 32; display: flex; align-items: center; gap: 0.4rem; background: rgba(244,239,223,0.92); border: 1px solid rgba(0,0,0,0.18); border-radius: 999px; padding: 0.3rem; box-shadow: 0 12px 28px rgba(0,0,0,0.18); font-family: ${fonts.body}; }
.la-ba__btn { background: transparent; border: none; padding: 0.5rem 1rem; border-radius: 999px; font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: ${palette.smoke}; cursor: pointer; transition: background 180ms, color 180ms; }
.la-ba__btn.is-active { background: ${palette.charcoal}; color: ${palette.cream}; }
.la-ba__btn:focus-visible { outline: 2px solid ${palette.dawn}; outline-offset: 2px; }
.la-ba__hint { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border: 1px solid rgba(0,0,0,0.22); border-radius: 4px; font-size: 0.68rem; color: ${palette.smoke}; margin-right: 0.3rem; }
.la-ba__overlay { position: fixed; inset: 0; z-index: 28; background: ${palette.charcoal}; overflow: auto; }
.la-ba__view { padding: 4rem 2rem 8rem; max-width: 1200px; margin: 0 auto; color: ${palette.cream}; }
.la-ba__view-tag { font-family: ${fonts.body}; font-size: 0.7rem; letter-spacing: 0.24em; text-transform: uppercase; opacity: 0.7; margin-bottom: 1.25rem; }
.la-ba__view img { width: 100%; height: auto; border-radius: 4px; box-shadow: 0 24px 60px rgba(0,0,0,0.45); display: block; }
.la-ba__placeholder { background: #fff; color: #222; font-family: Georgia, serif; padding: 0; min-height: 80vh; border-radius: 4px; box-shadow: 0 24px 60px rgba(0,0,0,0.45); overflow: hidden; }
.la-ba__placeholder header { background: #1c4a2a; color: #fff; padding: 1rem 2rem; display: flex; flex-direction: column; gap: 0.5rem; }
.la-ba__placeholder .logo { font-family: 'Trajan Pro', serif; font-size: 1.4rem; margin: 0; }
.la-ba__placeholder nav { font-size: 0.78rem; opacity: 0.92; }
.la-ba__placeholder .banner { background: #6c8b48; color: #fff; padding: 4rem 2rem; text-align: center; }
.la-ba__placeholder .banner h1 { font-size: 2.2rem; margin: 0 0 0.5rem; }
.la-ba__placeholder .banner a { color: #fff; background: #224a2c; padding: 0.5rem 1.2rem; text-decoration: none; display: inline-block; margin-top: 1rem; border-radius: 2px; }
.la-ba__placeholder .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: #ccc; padding: 1px; }
.la-ba__placeholder .grid > div { background: #fff; padding: 2rem; text-align: center; font-size: 0.95rem; color: #1c4a2a; }
.la-ba__placeholder .phone { text-align: center; padding: 1.5rem; font-size: 1rem; margin: 0; }
@media (max-width: 640px) { .la-ba { left: 0.75rem; bottom: 0.75rem; } }
`;
