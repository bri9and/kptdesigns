"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { palette, fonts } from "@/app/sites/desert-coyote-landscape/_lib/tokens";

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
      <div className="dc-ba" role="group" aria-label="Before/after toggle">
        <button
          className={`dc-ba__btn${!showBefore ? " is-active" : ""}`}
          onClick={() => setShowBefore(false)}
          aria-pressed={!showBefore}
        >
          After
        </button>
        <button
          className={`dc-ba__btn${showBefore ? " is-active" : ""}`}
          onClick={() => setShowBefore(true)}
          aria-pressed={showBefore}
        >
          Before
        </button>
        <span className="dc-ba__hint" aria-hidden="true">B</span>
      </div>
      <AnimatePresence>
        {showBefore && (
          <motion.div
            className="dc-ba__overlay"
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
    <div className="dc-ba__view">
      <div className="dc-ba__view-tag">desertcoyotelandscape.com — current site</div>
      {!imgError ? (
        <img
          src="/proposal/desert-coyote-landscape/before.png"
          alt="Screenshot of the current desertcoyotelandscape.com homepage"
          onError={() => setImgError(true)}
        />
      ) : (
        <BeforePlaceholder />
      )}
    </div>
  );
}

// Stylized fallback if the screenshot is missing — intentionally evokes a
// dated, basic 2010-era landscaping site to make the contrast obvious.
function BeforePlaceholder() {
  return (
    <div className="dc-ba__placeholder">
      <header>
        <p className="logo">Desert Coyote Landscape, LLC</p>
        <nav>Home · Trailer Rental · Photos · Facebook</nav>
      </header>
      <div className="banner">
        <h1>WELCOME!</h1>
        <p>Your East Valley landscaping experts</p>
      </div>
      <div className="body">
        <div className="col">
          <h2>About Us</h2>
          <p>Desert Coyote Landscape is a family owned and operated landscaping company serving Mesa, Gilbert, Chandler, and Queen Creek. We do pavers, walls, sod, turf, irrigation, and more!</p>
          <p>Call today for a free estimate!!</p>
        </div>
        <div className="col">
          <div className="photo">[ photo ]</div>
          <div className="photo">[ photo ]</div>
        </div>
      </div>
      <div className="band">FREE ESTIMATES — CALL (480) 936-0187</div>
    </div>
  );
}

const css = `
.dc-ba { position: fixed; bottom: 1.5rem; left: 1.5rem; z-index: 32; display: flex; align-items: center; gap: 0.4rem; background: rgba(237,228,210,0.94); border: 1px solid rgba(0,0,0,0.18); border-radius: 999px; padding: 0.3rem; box-shadow: 0 12px 28px rgba(0,0,0,0.18); font-family: ${fonts.body}; }
.dc-ba__btn { background: transparent; border: none; padding: 0.5rem 1rem; border-radius: 999px; font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: ${palette.rock}; cursor: pointer; transition: background 180ms, color 180ms; }
.dc-ba__btn.is-active { background: ${palette.charcoal}; color: ${palette.sand}; }
.dc-ba__btn:focus-visible { outline: 2px solid ${palette.terra}; outline-offset: 2px; }
.dc-ba__hint { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border: 1px solid rgba(0,0,0,0.22); border-radius: 4px; font-size: 0.68rem; color: ${palette.rock}; margin-right: 0.3rem; }
.dc-ba__overlay { position: fixed; inset: 0; z-index: 28; background: ${palette.charcoal}; overflow: auto; }
.dc-ba__view { padding: 4rem 2rem 8rem; max-width: 1200px; margin: 0 auto; color: ${palette.sand}; }
.dc-ba__view-tag { font-family: ${fonts.body}; font-size: 0.7rem; letter-spacing: 0.24em; text-transform: uppercase; opacity: 0.7; margin-bottom: 1.25rem; }
.dc-ba__view img { width: 100%; height: auto; border-radius: 4px; box-shadow: 0 24px 60px rgba(0,0,0,0.45); display: block; }
.dc-ba__placeholder { background: #fff; color: #222; font-family: "Comic Sans MS", "Marker Felt", "Trebuchet MS", sans-serif; padding: 0; min-height: 80vh; border-radius: 4px; box-shadow: 0 24px 60px rgba(0,0,0,0.45); overflow: hidden; }
.dc-ba__placeholder header { background: #c08a3e; color: #fff; padding: 1rem 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; border-bottom: 4px double #6e4a1e; }
.dc-ba__placeholder .logo { font-family: "Times New Roman", Times, serif; font-size: 1.5rem; font-weight: 700; margin: 0; letter-spacing: 0.02em; }
.dc-ba__placeholder nav { font-size: 0.85rem; opacity: 0.95; font-family: "Times New Roman", Times, serif; }
.dc-ba__placeholder .banner { background: #4f7a3a; color: #fffbe2; padding: 3rem 2rem; text-align: center; border-bottom: 6px ridge #2e5020; }
.dc-ba__placeholder .banner h1 { font-family: "Comic Sans MS", "Marker Felt", cursive; font-size: 3rem; margin: 0 0 0.5rem; text-shadow: 2px 2px 0 #2e5020; letter-spacing: 0.04em; }
.dc-ba__placeholder .banner p { font-family: "Times New Roman", Times, serif; font-size: 1.1rem; font-style: italic; margin: 0; }
.dc-ba__placeholder .body { display: grid; grid-template-columns: 1fr 1fr; gap: 0; padding: 2rem; background: #fffaec; }
.dc-ba__placeholder .body .col { padding: 0 1.25rem; }
.dc-ba__placeholder .body h2 { font-family: "Times New Roman", Times, serif; color: #4f7a3a; font-size: 1.5rem; margin: 0 0 0.75rem; border-bottom: 2px solid #c08a3e; padding-bottom: 0.35rem; }
.dc-ba__placeholder .body p { font-family: "Times New Roman", Times, serif; font-size: 1rem; line-height: 1.5; margin: 0 0 0.75rem; }
.dc-ba__placeholder .photo { background: #ddd; color: #888; height: 130px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; border: 2px solid #aaa; font-family: "Comic Sans MS", cursive; font-size: 0.9rem; }
.dc-ba__placeholder .band { background: #b94a2a; color: #fffbe2; text-align: center; padding: 1.25rem; font-family: "Comic Sans MS", "Marker Felt", cursive; font-size: 1.15rem; font-weight: 700; letter-spacing: 0.04em; }
@media (max-width: 720px) {
  .dc-ba__placeholder .body { grid-template-columns: 1fr; }
}
@media (max-width: 640px) { .dc-ba { left: 0.75rem; bottom: 0.75rem; } }
`;
