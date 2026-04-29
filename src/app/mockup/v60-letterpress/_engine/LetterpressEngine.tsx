"use client";

/**
 * LetterpressEngine — V60 Letterpress
 *
 * Crane's Lettra cotton paper with deep impression letterforms. Headlines
 * carry visible bite + ink halo + sub-pixel squish-and-rebound on load.
 * Hover on a heading deepens the bite (text-shadow gets harder, paper
 * indents). Reduced motion drops squish + halo animation.
 */

import { useState } from "react";

const SERVICES = [
  {
    plate: "MORTISE",
    body: "Mortise & tenon joinery",
    detail: "Hardwood doors, table aprons, bed-rail beds. Drawbore-pinned, glue-line tight, no fasteners showing on the face.",
    register: "P1 — set in 12 pt Caslon, 1.2 pt bite",
  },
  {
    plate: "DADO",
    body: "Cabinet & casework",
    detail: "Inset face frames, dovetailed drawer boxes, hand-fit hardware. Finish before final dado so the joint stays crisp.",
    register: "P2 — Caslon Doric Display, 0.9 pt bite",
  },
  {
    plate: "SCRIBE",
    body: "Built-ins & millwork",
    detail: "Scribed to plaster, racked-wall shimmed, applied moldings cope-and-stick. Period-appropriate profiles when the room asks.",
    register: "P3 — Caslon Pro Italic kicker, 1.1 pt bite",
  },
];

const REGISTER_NOTES = [
  { mark: "▢", label: "Stock", body: "8/4 white oak from Hearne, dried 6%, milled and acclimated 14 days before layout." },
  { mark: "◯", label: "Layout", body: "Story pole carries every dim. Marking gauge knife-line, never pencil, on cut faces." },
  { mark: "△", label: "Cut", body: "Domino & dado for primary, hand-cut dovetails on drawer faces. Test-fit dry, dry, glue, repeat." },
  { mark: "✚", label: "Finish", body: "Schedule of penetrating oil and shellac built up over a week. Buffed with cabinet wax, never lacquered." },
];

const PLATES = [
  { label: "Walnut sideboard", commission: "2025 / Brookline", swatch: "linear-gradient(135deg,#5A3A24 0%,#2C1A0E 60%,#11070A 100%)" },
  { label: "White-oak entryway", commission: "2025 / Concord", swatch: "linear-gradient(135deg,#B89567 0%,#5C3F22 60%,#241608 100%)" },
  { label: "Cherry library wall", commission: "2024 / Cambridge", swatch: "linear-gradient(135deg,#82412A 0%,#4A1F12 60%,#220A04 100%)" },
  { label: "Ash kitchen island", commission: "2024 / Newton", swatch: "linear-gradient(135deg,#D6BC95 0%,#7B5C36 60%,#2E1F12 100%)" },
];

export default function LetterpressEngine() {
  const [biteIdx, setBiteIdx] = useState<number | null>(null);

  return (
    <>
      <style>{css}</style>
      <div className="lp-shell">
        {/* PAPER GRAIN */}
        <div className="lp-grain" aria-hidden />
        <div className="lp-deckle" aria-hidden />

        {/* REGISTER MARKS */}
        <span className="lp-reg lp-reg-tl" aria-hidden>+</span>
        <span className="lp-reg lp-reg-tr" aria-hidden>+</span>
        <span className="lp-reg lp-reg-bl" aria-hidden>+</span>
        <span className="lp-reg lp-reg-br" aria-hidden>+</span>

        {/* MASTHEAD */}
        <header className="lp-mast">
          <div className="lp-mark">
            <span className="lp-mark-rule" />
            <span className="lp-mark-name">HOLDING &amp; SCRIBE — JOINERS</span>
            <span className="lp-mark-est">EST. MMXII · BARRE, MASS.</span>
          </div>
          <nav className="lp-nav" aria-label="Primary">
            <a href="#impression">The impression</a>
            <a href="#register">Register marks</a>
            <a href="#plates">Recent plates</a>
            <a href="#commission">Commission</a>
          </nav>
        </header>

        {/* HERO */}
        <section className="lp-hero">
          <div className="lp-eyebrow">Vol. XII · No. 4 · Setting laid down by hand</div>
          <h1 className="lp-headline">
            <span className="lp-line lp-line-1">Mortise.</span>
            <span className="lp-line lp-line-2">Tenon.</span>
            <span className="lp-line lp-line-3">Dado.</span>
          </h1>
          <p className="lp-kicker">
            <em>Held under a bite that shows.</em>
          </p>
          <p className="lp-sub">
            Hardwood furniture and custom millwork — work that earns the
            impression it leaves. Every plate is set on Crane&rsquo;s Lettra,
            inked oil-based, run at full bite, and registered by eye against
            the corner cross-marks.
          </p>

          <div className="lp-cta-row">
            <a className="lp-cta lp-cta-primary" href="#commission">Commission a piece</a>
            <a className="lp-cta" href="#plates">Browse the press</a>
          </div>

          <div className="lp-meta">
            <div><span>Stock</span> Crane&rsquo;s Lettra · 220 lb · cotton</div>
            <div><span>Ink</span> Oil-based · letterpress black</div>
            <div><span>Bite</span> 1.2 pt · halo allowed</div>
            <div><span>Press</span> Vandercook 4 · proof / shop</div>
          </div>
        </section>

        {/* THE IMPRESSION */}
        <section id="impression" className="lp-section">
          <div className="lp-h2-row">
            <span className="lp-h2-numeral">I</span>
            <h2 className="lp-h2">The impression</h2>
          </div>
          <p className="lp-section-sub">
            Each service set as a letterpressed plate. Hover a plate to deepen
            the bite — every additional millimeter of impression earns a
            wider ink halo on Lettra cotton.
          </p>

          <div className="lp-plates">
            {SERVICES.map((s, i) => (
              <article
                key={s.plate}
                className={`lp-plate${biteIdx === i ? " is-deep" : ""}`}
                onMouseEnter={() => setBiteIdx(i)}
                onMouseLeave={() => setBiteIdx(null)}
                onFocus={() => setBiteIdx(i)}
                onBlur={() => setBiteIdx(null)}
                tabIndex={0}
              >
                <h3 className="lp-plate-head">{s.plate}</h3>
                <div className="lp-plate-rule" />
                <div className="lp-plate-body">{s.body}</div>
                <p className="lp-plate-detail">{s.detail}</p>
                <span className="lp-plate-register">{s.register}</span>
              </article>
            ))}
          </div>
        </section>

        {/* REGISTER MARKS */}
        <section id="register" className="lp-section lp-section-alt">
          <div className="lp-h2-row">
            <span className="lp-h2-numeral">II</span>
            <h2 className="lp-h2">Register marks</h2>
          </div>
          <p className="lp-section-sub">
            Process notes — every commission walks the same four marks.
          </p>
          <ol className="lp-register-list">
            {REGISTER_NOTES.map((n) => (
              <li key={n.label} className="lp-register-item">
                <span className="lp-register-mark" aria-hidden>{n.mark}</span>
                <span className="lp-register-label">{n.label}</span>
                <span className="lp-register-body">{n.body}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* RECENT PLATES */}
        <section id="plates" className="lp-section">
          <div className="lp-h2-row">
            <span className="lp-h2-numeral">III</span>
            <h2 className="lp-h2">Recent plates</h2>
          </div>
          <p className="lp-section-sub">
            Past commissions, photographed against Lettra. Each card is keyed
            to the plate that printed its commission card.
          </p>
          <div className="lp-plate-grid">
            {PLATES.map((p) => (
              <figure key={p.label} className="lp-print-card" tabIndex={0}>
                <div className="lp-print-image" style={{ background: p.swatch }} aria-hidden />
                <figcaption>
                  <span className="lp-print-name">{p.label}</span>
                  <span className="lp-print-meta">{p.commission}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer id="commission" className="lp-foot">
          <div className="lp-foot-rule" aria-hidden />
          <div className="lp-foot-grid">
            <div>
              <span className="lp-foot-tag">SHOP</span>
              <span>14 Stafford Hill Rd.</span>
              <span>Barre, Mass. 01005</span>
            </div>
            <div>
              <span className="lp-foot-tag">CALL</span>
              <span>+1 (978) 555-0184</span>
              <span>by appointment</span>
            </div>
            <div>
              <span className="lp-foot-tag">FINISH</span>
              <span>Five-year warranty on every joint.</span>
              <span>Lifetime on the maker&rsquo;s mark.</span>
            </div>
            <div>
              <span className="lp-foot-tag">PRESSED</span>
              <span>Vol. XII · No. 4</span>
              <span>Set in Caslon Doric Display</span>
            </div>
          </div>
          <div className="lp-foot-mark">[ HOLDING &amp; SCRIBE — JOINERS · EST. MMXII ]</div>
        </footer>
      </div>
    </>
  );
}

const css = `
  .lp-shell {
    --paper: #F2EBDC;
    --paper-2: #E8E0CD;
    --ink: #131312;
    --ink-soft: rgba(19,19,18,0.78);
    --bite: rgba(19,19,18,0.32);
    --halo: rgba(19,19,18,0.18);
    --shadow: #C2B79E;
    --rule: rgba(19,19,18,0.22);
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
    font-family: "Caslon Pro", "Adobe Caslon Pro", "Hoefler Text", "Big Caslon", "Iowan Old Style", Georgia, serif;
    padding: clamp(28px, 5vw, 72px);
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }
  .lp-grain {
    position: absolute; inset: 0;
    pointer-events: none;
    background:
      radial-gradient(rgba(19,19,18,0.06) 0.6px, transparent 1px) 0 0 / 4px 4px,
      radial-gradient(rgba(19,19,18,0.04) 0.4px, transparent 1px) 2px 2px / 7px 7px;
    mix-blend-mode: multiply;
    opacity: 0.85;
  }
  .lp-deckle {
    position: absolute;
    inset: 14px;
    pointer-events: none;
    border: 1px solid var(--rule);
    box-shadow:
      inset 0 0 0 4px var(--paper),
      inset 0 0 22px rgba(194,183,158,0.5);
  }

  .lp-reg {
    position: absolute;
    font-family: "Caslon Pro", Georgia, serif;
    color: var(--bite);
    font-size: 22px;
    font-weight: 400;
    pointer-events: none;
    user-select: none;
  }
  .lp-reg-tl { top: 22px; left: 22px; }
  .lp-reg-tr { top: 22px; right: 22px; }
  .lp-reg-bl { bottom: 22px; left: 22px; }
  .lp-reg-br { bottom: 22px; right: 22px; }

  .lp-mast {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 2px solid var(--ink);
    padding-bottom: 14px;
    margin-bottom: 36px;
    flex-wrap: wrap;
    gap: 16px;
  }
  .lp-mark { display: flex; flex-direction: column; gap: 4px; }
  .lp-mark-rule { width: 60px; height: 4px; background: var(--ink); }
  .lp-mark-name {
    font-family: "Caslon Doric Display", "Caslon Pro", Georgia, serif;
    font-weight: 600;
    letter-spacing: 0.16em;
    font-size: 14px;
    text-transform: uppercase;
  }
  .lp-mark-est { font-size: 11px; letter-spacing: 0.18em; color: var(--ink-soft); text-transform: uppercase; }

  .lp-nav { display: flex; gap: 24px; flex-wrap: wrap; font-style: italic; font-size: 14px; }
  .lp-nav a {
    color: var(--ink);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    padding-bottom: 1px;
    transition: border-color 160ms ease, color 160ms ease;
  }
  .lp-nav a:hover, .lp-nav a:focus-visible { border-color: var(--ink); outline: none; }

  .lp-hero {
    position: relative;
    z-index: 2;
    padding: 32px 0 64px;
    border-bottom: 1px solid var(--rule);
    margin-bottom: 48px;
  }
  .lp-eyebrow {
    font-style: italic;
    font-size: 14px;
    color: var(--ink-soft);
    letter-spacing: 0.04em;
    margin-bottom: 28px;
  }

  .lp-headline {
    font-family: "Caslon Doric Display", "Adobe Caslon Pro", Georgia, serif;
    font-weight: 700;
    font-size: clamp(64px, 12vw, 200px);
    line-height: 0.92;
    letter-spacing: -0.02em;
    margin: 0 0 16px;
    color: var(--ink);
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .lp-line {
    display: inline-block;
    text-shadow:
      0 1px 0 rgba(19,19,18,0.18),
      0 0 0.4px rgba(19,19,18,0.85),
      0 0.4px 0 rgba(19,19,18,0.6);
    animation: lp-impress 720ms cubic-bezier(0.16, 0.9, 0.32, 1.2) both;
  }
  .lp-line-1 { animation-delay: 80ms; }
  .lp-line-2 { animation-delay: 220ms; }
  .lp-line-3 { animation-delay: 360ms; font-style: italic; }
  @keyframes lp-impress {
    0% {
      opacity: 0;
      transform: translateY(-3px) scaleY(1.06);
      letter-spacing: 0;
      text-shadow: 0 0 12px rgba(19,19,18,0.45);
    }
    62% {
      opacity: 1;
      transform: translateY(2px) scaleY(0.985);
      letter-spacing: -0.02em;
      text-shadow: 0 1px 0 rgba(19,19,18,0.32);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scaleY(1);
      text-shadow:
        0 1px 0 rgba(19,19,18,0.18),
        0 0 0.4px rgba(19,19,18,0.85);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .lp-line { animation: none; opacity: 1; transform: none; }
  }

  .lp-kicker {
    font-family: "Caslon Pro", Georgia, serif;
    font-style: italic;
    font-size: clamp(20px, 2.6vw, 32px);
    color: var(--ink);
    margin: 0 0 20px;
  }
  .lp-kicker em {
    background: linear-gradient(180deg, transparent 64%, rgba(19,19,18,0.12) 64%);
    padding: 0 4px;
  }
  .lp-sub {
    font-size: 18px;
    line-height: 1.55;
    max-width: 60ch;
    color: #1F1F1D;
    margin: 0 0 28px;
    font-family: "Caslon Pro", Georgia, serif;
  }

  .lp-cta-row { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 28px; }
  .lp-cta {
    font-family: "Caslon Doric Display", Georgia, serif;
    display: inline-block;
    padding: 14px 28px;
    border: 1.5px solid var(--ink);
    color: var(--ink);
    background: transparent;
    text-decoration: none;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    transition: background 160ms ease, color 160ms ease, transform 160ms ease;
  }
  .lp-cta:hover, .lp-cta:focus-visible {
    background: var(--ink);
    color: var(--paper);
    transform: translateY(-1px);
    outline: none;
    box-shadow: 0 4px 0 var(--shadow);
  }
  .lp-cta-primary { background: var(--ink); color: var(--paper); }
  .lp-cta-primary:hover, .lp-cta-primary:focus-visible { background: #2A2A26; }

  .lp-meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 0;
    border-top: 1px solid var(--rule);
    padding-top: 14px;
    font-size: 13px;
  }
  .lp-meta > div { padding: 6px 12px 6px 0; border-right: 1px dashed var(--rule); }
  .lp-meta > div:last-child { border-right: none; }
  .lp-meta span {
    display: block;
    font-style: italic;
    color: var(--ink-soft);
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin-bottom: 2px;
  }

  .lp-section { padding: 36px 0; border-bottom: 1px solid var(--rule); position: relative; z-index: 2; }
  .lp-section-alt { background: linear-gradient(180deg, var(--paper) 0%, var(--paper-2) 100%); margin: 0 -24px; padding-left: 24px; padding-right: 24px; }

  .lp-h2-row { display: flex; align-items: baseline; gap: 16px; }
  .lp-h2-numeral {
    font-family: "Caslon Pro", Georgia, serif;
    font-style: italic;
    font-size: 28px;
    color: var(--ink-soft);
  }
  .lp-h2 {
    font-family: "Caslon Doric Display", Georgia, serif;
    font-size: clamp(28px, 4.4vw, 56px);
    margin: 0;
    letter-spacing: -0.01em;
    text-shadow: 0 0.5px 0 rgba(19,19,18,0.32);
  }
  .lp-section-sub {
    font-style: italic;
    font-size: 15px;
    line-height: 1.55;
    max-width: 56ch;
    color: var(--ink-soft);
    margin: 8px 0 28px;
  }

  .lp-plates {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 24px;
  }
  .lp-plate {
    background: var(--paper);
    border: 2px solid var(--ink);
    padding: 22px;
    cursor: pointer;
    transition: transform 220ms cubic-bezier(0.2, 0.9, 0.3, 1.1), box-shadow 220ms ease, background 220ms ease;
    position: relative;
  }
  .lp-plate-head {
    font-family: "Caslon Doric Display", Georgia, serif;
    font-size: clamp(28px, 4vw, 44px);
    letter-spacing: -0.01em;
    margin: 0 0 8px;
    text-shadow: 0 1px 0 rgba(19,19,18,0.18);
    transition: text-shadow 220ms ease, transform 220ms ease;
  }
  .lp-plate-rule { height: 2px; background: var(--ink); width: 32px; margin-bottom: 12px; }
  .lp-plate-body { font-style: italic; font-size: 16px; margin-bottom: 12px; }
  .lp-plate-detail { font-size: 14px; line-height: 1.5; color: var(--ink-soft); margin: 0 0 12px; }
  .lp-plate-register {
    display: block;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-soft);
    border-top: 1px dashed var(--rule);
    padding-top: 10px;
  }
  .lp-plate.is-deep {
    transform: translateY(2px);
    box-shadow: inset 0 4px 12px rgba(19,19,18,0.18), inset 0 0 0 1px rgba(19,19,18,0.4);
    background: var(--paper-2);
  }
  .lp-plate.is-deep .lp-plate-head {
    text-shadow:
      0 2px 0 rgba(19,19,18,0.55),
      0 0 1px rgba(19,19,18,1),
      0 -1px 0 rgba(255,255,255,0.4),
      0 0 14px rgba(19,19,18,0.2);
    transform: translateY(1px);
  }
  .lp-plate:focus-visible { outline: 2px solid var(--ink); outline-offset: 4px; }

  .lp-register-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
  .lp-register-item {
    display: grid;
    grid-template-columns: 40px 140px 1fr;
    gap: 16px;
    align-items: baseline;
    padding: 12px 0;
    border-bottom: 1px dashed var(--rule);
  }
  .lp-register-item:last-child { border-bottom: none; }
  .lp-register-mark {
    font-size: 22px;
    color: var(--ink);
    text-align: center;
    text-shadow: 0 1px 0 rgba(19,19,18,0.32);
  }
  .lp-register-label {
    font-family: "Caslon Doric Display", Georgia, serif;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-size: 14px;
  }
  .lp-register-body { font-size: 15px; line-height: 1.55; font-style: italic; color: #1F1F1D; }
  @media (max-width: 640px) { .lp-register-item { grid-template-columns: 32px 1fr; } .lp-register-body { grid-column: 1 / -1; } }

  .lp-plate-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 18px;
  }
  .lp-print-card {
    margin: 0;
    background: var(--paper);
    border: 1.5px solid var(--ink);
    padding: 14px;
    transition: transform 200ms ease, box-shadow 200ms ease;
    cursor: pointer;
  }
  .lp-print-image {
    aspect-ratio: 4 / 3;
    width: 100%;
    margin-bottom: 12px;
    box-shadow: inset 0 0 0 1px rgba(19,19,18,0.25), 0 1px 0 rgba(255,255,255,0.7);
  }
  .lp-print-card figcaption { display: flex; flex-direction: column; gap: 2px; }
  .lp-print-name {
    font-family: "Caslon Doric Display", Georgia, serif;
    font-weight: 600;
    letter-spacing: 0.04em;
    font-size: 16px;
  }
  .lp-print-meta { font-style: italic; color: var(--ink-soft); font-size: 13px; }
  .lp-print-card:hover, .lp-print-card:focus-visible {
    transform: translate(-2px, -3px);
    box-shadow: 4px 5px 0 var(--shadow);
    outline: none;
  }
  .lp-print-card:focus-visible { box-shadow: 4px 5px 0 var(--shadow), 0 0 0 2px var(--ink); }

  .lp-foot { position: relative; z-index: 2; padding: 36px 0 12px; }
  .lp-foot-rule {
    height: 14px;
    background:
      repeating-linear-gradient(90deg, var(--ink) 0 4px, transparent 4px 12px),
      var(--paper);
    margin-bottom: 22px;
  }
  .lp-foot-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 22px;
    font-size: 13px;
    line-height: 1.55;
    margin-bottom: 22px;
  }
  .lp-foot-grid > div { display: flex; flex-direction: column; gap: 4px; }
  .lp-foot-tag {
    font-family: "Caslon Doric Display", Georgia, serif;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-soft);
    font-size: 11px;
    margin-bottom: 4px;
  }
  .lp-foot-mark {
    font-family: "Caslon Doric Display", Georgia, serif;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-size: 12px;
    text-align: center;
    border-top: 1px solid var(--rule);
    padding-top: 18px;
    text-shadow: 0 1px 0 rgba(19,19,18,0.28);
  }
`;
