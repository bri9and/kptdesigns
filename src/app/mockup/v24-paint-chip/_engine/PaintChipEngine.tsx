"use client";

/**
 * PaintChipEngine — V24 Paint Chip
 *
 * Hardware-store paint deck as navigation. Fanned chips, each one a
 * service. Cursor near a chip lifts it 8px and reveals the swatch
 * underneath. Click expands the chip into a section card.
 */

import { useState } from "react";

type ChipDef = {
  id: string;
  name: string;
  code: string;
  color: string;
  ink: string;
  swatch: string;
  body: string;
  starting: string;
  examples: string[];
};

const CHIPS: ChipDef[] = [
  {
    id: "patch",
    name: "Patch & Paint",
    code: "PP-1042",
    color: "#D44525",
    ink: "#FFFFFF",
    swatch: "#9B2D14",
    body: "Drywall ding, scuff, hairline crack. We feather, prime, and blend so the patch loses itself in the wall.",
    starting: "from $185",
    examples: ["nail-pop fix", "doorknob hole", "kid-with-sharpie wall", "ceiling water mark"],
  },
  {
    id: "caulk",
    name: "Caulk & Call It",
    code: "CC-2118",
    color: "#3B6E91",
    ink: "#FFFFFF",
    swatch: "#1F4E70",
    body: "Tub line, baseboard gap, corner trim. New bead, cleaner than what was there. Done before the kid's bus.",
    starting: "from $145",
    examples: ["tub-to-tile reseal", "trim corner gap", "exterior siding joint", "window perimeter"],
  },
  {
    id: "honey",
    name: "Honey-Do List",
    code: "HD-3091",
    color: "#E5B53A",
    ink: "#0E0E0E",
    swatch: "#A88018",
    body: "The list on the fridge. We bring the truck, the Channellocks, and a Packout. You go to the store.",
    starting: "from $245 / hour bundled",
    examples: ["towel bar reset", "smoke detector swap", "leaky faucet cartridge", "stuck slider track"],
  },
  {
    id: "turn",
    name: "Turnover Special",
    code: "TR-4067",
    color: "#5C8A3A",
    ink: "#FFFFFF",
    swatch: "#3F6322",
    body: "Tenant out Sunday, tenant in Tuesday. Patch, paint, swap rusted hardware, photograph for the file.",
    starting: "from $580 / unit",
    examples: ["1BR flip in 18 hrs", "porch-light swap", "blind re-string", "appliance pull-and-clean"],
  },
  {
    id: "emerg",
    name: "Driveway Emergency",
    code: "EM-5012",
    color: "#9C2BB1",
    ink: "#FFFFFF",
    swatch: "#6A1A7E",
    body: "Garbage disposal stuck, garage door off-track, washer hose burst. Pick up by 4 means we are on-site by dinner.",
    starting: "from $225 service call",
    examples: ["garage track reset", "washer hose burst", "disposal jam", "frozen exterior bib"],
  },
  {
    id: "small",
    name: "No Job Too Small",
    code: "NJ-6155",
    color: "#0F8576",
    ink: "#FFFFFF",
    swatch: "#085D52",
    body: "The picture frame. The shelf. The toilet seat. The tasks the big-name pros won't show up for. We will.",
    starting: "from $95 (30-min minimum)",
    examples: ["picture-hang grid", "shelf install", "toilet seat replace", "doorbell rewire"],
  },
];

const COVERAGE = [
  {
    head: "TURNOVER",
    tag: "TR-4067",
    color: "#5C8A3A",
    desc: "Property managers run on cycles. We run with them. Patch / paint / hardware / photos before the next showing.",
    bullets: ["1 BR flip in 18 hrs", "2 BR flip in 28 hrs", "Same-day photo deck", "14-day net invoicing"],
  },
  {
    head: "HONEY-DO",
    tag: "HD-3091",
    color: "#E5B53A",
    desc: "Owners stack the fridge list. We knock it down in one truck-roll &mdash; the magnetic-tray, scrap-bin discount.",
    bullets: ["Bundled hourly rates", "One trip, no return fees", "Carbonless yellow-copy invoice", "Cash, card, or Zelle"],
  },
  {
    head: "EMERGENCY",
    tag: "EM-5012",
    color: "#9C2BB1",
    desc: "Burst hose, stuck disposal, garage off-track. Pick up by 4pm and we&rsquo;re in your driveway by 6.",
    bullets: ["Same-day service call", "Saturdays answered", "Flat $225 trip charge", "Shop credit on parts"],
  },
];

export default function PaintChipEngine() {
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const expanded = CHIPS.find((c) => c.id === activeChip);

  return (
    <>
      <style>{css}</style>
      <div className="pc-shell">
        {/* TOP BAR */}
        <header className="pc-top">
          <div className="pc-brand">
            <span className="pc-brand-square" aria-hidden />
            <div className="pc-brand-stack">
              <span className="pc-brand-name">FAIRFIELD HANDYMAN CO.</span>
              <span className="pc-brand-meta">DECK NO. 47 &middot; SPRING SHEET</span>
            </div>
          </div>
          <nav className="pc-nav">
            <a href="#deck" className="pc-link">The deck</a>
            <a href="#coverage" className="pc-link">Coverage</a>
            <a href="#price" className="pc-link">Pricing</a>
            <a href="#call" className="pc-link pc-link-primary">555.118.4242</a>
          </nav>
        </header>

        {/* HERO with FANNED DECK */}
        <section className="pc-hero">
          <div className="pc-hero-text">
            <span className="pc-eyebrow">FANNED &middot; CODED &middot; READY</span>
            <h1 className="pc-headline">
              Patch and paint.
              <br />
              Caulk and call it.
              <br />
              <span className="pc-headline-accent">Done before the kid&rsquo;s bus.</span>
            </h1>
            <p className="pc-sub">
              Pick the job. Pick the chip. We&rsquo;ll be in your driveway with
              the right Channellocks, the right caulk gun, and a yellow-copy
              invoice book.
            </p>
            <div className="pc-cta-row">
              <a href="#deck" className="pc-cta pc-cta-primary">Pick a chip</a>
              <a href="#coverage" className="pc-cta pc-cta-secondary">Browse the deck</a>
            </div>
          </div>

          <div className="pc-deck" id="deck" aria-label="Service chip deck">
            <div className="pc-pivot" aria-hidden>
              <div className="pc-pivot-rivet" />
            </div>
            <div className="pc-fan">
              {CHIPS.map((c, i) => {
                const total = CHIPS.length;
                const angle = -42 + (84 / (total - 1)) * i;
                return (
                  <button type="button"
                    key={c.id}
                    className={`pc-chip${activeChip === c.id ? " pc-chip-active" : ""}`}
                    style={{
                      ["--chip-angle" as string]: `${angle}deg`,
                      ["--chip-delay" as string]: `${i * 60}ms`,
                      ["--chip-color" as string]: c.color,
                      ["--chip-swatch" as string]: c.swatch,
                      ["--chip-ink" as string]: c.ink,
                    }}
                    onClick={() => setActiveChip(activeChip === c.id ? null : c.id)}
                    onFocus={() => { /* hover-equivalent state via :focus */ }}
                    aria-expanded={activeChip === c.id}
                    aria-controls={`chip-detail-${c.id}`}
                  >
                    <span className="pc-chip-back" aria-hidden />
                    <span className="pc-chip-face">
                      <span className="pc-chip-code">{c.code}</span>
                      <span className="pc-chip-name">{c.name}</span>
                      <span className="pc-chip-line" aria-hidden />
                      <span className="pc-chip-bullets">
                        {c.examples.slice(0, 2).map((b) => (
                          <span key={b}>{b}</span>
                        ))}
                      </span>
                      <span className="pc-chip-cta">tap</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* EXPANDED CHIP DETAIL */}
        {expanded && (
          <section
            id={`chip-detail-${expanded.id}`}
            className="pc-detail"
            style={{
              ["--chip-color" as string]: expanded.color,
              ["--chip-ink" as string]: expanded.ink,
            }}
          >
            <div className="pc-detail-head">
              <div className="pc-detail-tag">
                <span>{expanded.code}</span>
              </div>
              <h2 className="pc-detail-name">{expanded.name}</h2>
              <button type="button"
                className="pc-detail-close"
                onClick={() => setActiveChip(null)}
                aria-label="Close chip detail"
              >
                close
              </button>
            </div>
            <div className="pc-detail-body">
              <p className="pc-detail-text">{expanded.body}</p>
              <p className="pc-detail-price">{expanded.starting}</p>
              <ul className="pc-detail-examples">
                {expanded.examples.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
              <div className="pc-detail-cta">
                <a href="#call" className="pc-cta pc-cta-primary">Book it</a>
                <a href="#coverage" className="pc-cta pc-cta-secondary">See coverage</a>
              </div>
            </div>
          </section>
        )}

        {/* COVERAGE */}
        <section id="coverage" className="pc-section">
          <header className="pc-section-head">
            <span className="pc-section-eyebrow">COVERAGE / 03 COLUMNS</span>
            <h2 className="pc-section-title">The recurring jobs.</h2>
            <p className="pc-section-lead">
              Three columns of work that keeps the truck moving. Color-coded
              to a chip family. Each column lives in a single deck panel.
            </p>
          </header>
          <div className="pc-coverage">
            {COVERAGE.map((col) => (
              <article
                key={col.head}
                className="pc-cov-card"
                style={{
                  ["--cov-color" as string]: col.color,
                }}
              >
                <div className="pc-cov-tag">{col.tag}</div>
                <h3 className="pc-cov-head">{col.head}</h3>
                <p
                  className="pc-cov-desc"
                  dangerouslySetInnerHTML={{ __html: col.desc }}
                />
                <ul className="pc-cov-list">
                  {col.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <span className="pc-cov-stripe" aria-hidden />
              </article>
            ))}
          </div>
        </section>

        {/* PRICING CARD — chip enlarged into a deal */}
        <section id="price" className="pc-section pc-section-price">
          <header className="pc-section-head">
            <span className="pc-section-eyebrow">PRICING / DEALT FROM THE DECK</span>
            <h2 className="pc-section-title">One chip, one number.</h2>
          </header>
          <div className="pc-price-card">
            <div className="pc-price-back" aria-hidden />
            <div className="pc-price-face">
              <div className="pc-price-tag">
                <span>SC-7800</span>
                <span>SERVICE CALL</span>
              </div>
              <div className="pc-price-num">
                $145
                <span className="pc-price-sub">first hour, on-site</span>
              </div>
              <ul className="pc-price-list">
                <li>One truck. One handyman. One Packout stack.</li>
                <li>$95 each additional hour, billed in 15-min blocks.</li>
                <li>Materials at receipt cost &mdash; we bring the receipt.</li>
                <li>Carbonless yellow copy left on the counter.</li>
              </ul>
              <div className="pc-price-cta">
                <a href="#call" className="pc-cta pc-cta-primary">Book a service call</a>
              </div>
            </div>
          </div>
        </section>

        {/* TRUCK PANEL CALL CTA */}
        <section id="call" className="pc-section pc-call">
          <div className="pc-truck-panel">
            <div className="pc-truck-corners" aria-hidden>
              <span /><span /><span /><span />
            </div>
            <span className="pc-truck-eyebrow">MAGNETIC TRUCK SIGN</span>
            <div className="pc-truck-name">FAIRFIELD HANDYMAN CO.</div>
            <div className="pc-truck-phone">555 &middot; 118 &middot; 4242</div>
            <div className="pc-truck-meta">
              <span>LICENSED &amp; INSURED MA #HIC-148922</span>
              <span>SUFFOLK &middot; MIDDLESEX &middot; NORFOLK</span>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pc-footer">
          <div className="pc-footer-row">
            <span>HARDWARE-AISLE END-CAP &middot; AISLE 14</span>
            <span>&copy; 2026 FAIRFIELD HANDYMAN CO.</span>
            <span>YELLOW-COPY INVOICE NO. 04-2618</span>
          </div>
          <p className="pc-footer-meta">
            All chips printed on hardware-store deck stock. Pull a chip,
            keep a chip.
          </p>
        </footer>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700;800&family=Archivo+Narrow:wght@400;700&family=JetBrains+Mono:wght@400;700&display=swap');

.pc-shell {
  min-height: 100vh;
  background: #F0EBE2;
  background-image:
    radial-gradient(circle at 18% 12%, rgba(212, 69, 37, 0.06) 0px, transparent 280px),
    radial-gradient(circle at 88% 88%, rgba(15, 133, 118, 0.05) 0px, transparent 320px),
    repeating-linear-gradient(0deg, transparent 0px, transparent 39px, rgba(14, 14, 14, 0.025) 40px);
  color: #0E0E0E;
  font-family: 'Archivo', system-ui, sans-serif;
  padding: 24px 28px 56px;
}

.pc-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 4px 18px;
  border-bottom: 2px solid #0E0E0E;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}
.pc-brand { display: flex; align-items: center; gap: 14px; }
.pc-brand-square {
  width: 36px;
  height: 36px;
  background: #D44525;
  border: 2px solid #0E0E0E;
  position: relative;
}
.pc-brand-square::after {
  content: '';
  position: absolute;
  top: 4px; left: 4px;
  width: 8px; height: 8px;
  background: #F0EBE2;
}
.pc-brand-stack { display: flex; flex-direction: column; line-height: 1.05; }
.pc-brand-name {
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: 700;
  letter-spacing: 0.06em;
  font-size: 15px;
}
.pc-brand-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  color: #4A4A4A;
}
.pc-nav {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
}
.pc-link {
  color: #0E0E0E;
  text-decoration: none;
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  position: relative;
  padding: 6px 2px;
}
.pc-link::after {
  content: '';
  position: absolute;
  left: 0; bottom: 0;
  width: 100%; height: 2px;
  background: #D44525;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 220ms cubic-bezier(0.7, 0, 0.3, 1);
}
.pc-link:hover::after, .pc-link:focus-visible::after { transform: scaleX(1); }
.pc-link:focus-visible { outline: none; }
.pc-link-primary {
  background: #0E0E0E;
  color: #F0EBE2;
  padding: 8px 14px;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.1em;
}
.pc-link-primary::after { display: none; }
.pc-link-primary:hover, .pc-link-primary:focus-visible {
  background: #D44525;
  outline: none;
}
@media (prefers-reduced-motion: reduce) {
  .pc-link::after { transition: none; }
}

.pc-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  padding: 36px 0 80px;
  border-bottom: 1px dashed rgba(14, 14, 14, 0.25);
}

.pc-eyebrow {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.24em;
  background: #0E0E0E;
  color: #F0EBE2;
  padding: 6px 10px;
  margin-bottom: 24px;
}
.pc-headline {
  font-family: 'Archivo', sans-serif;
  font-weight: 800;
  font-size: clamp(46px, 7vw, 96px);
  line-height: 0.95;
  letter-spacing: -0.02em;
  margin: 0 0 24px;
  color: #0E0E0E;
}
.pc-headline-accent { color: #D44525; }
.pc-sub {
  font-family: 'Archivo', sans-serif;
  font-size: 18px;
  line-height: 1.5;
  color: #2A2A2A;
  max-width: 480px;
  margin: 0 0 32px;
}

.pc-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.pc-cta {
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 14px;
  padding: 14px 22px;
  text-decoration: none;
  border: 2px solid #0E0E0E;
  display: inline-block;
  transition: transform 180ms ease, background 180ms ease, color 180ms ease;
  cursor: pointer;
}
.pc-cta-primary {
  background: #0E0E0E;
  color: #F0EBE2;
}
.pc-cta-primary:hover, .pc-cta-primary:focus-visible {
  outline: none;
  background: #D44525;
  border-color: #D44525;
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 #0E0E0E;
}
.pc-cta-secondary {
  background: transparent;
  color: #0E0E0E;
}
.pc-cta-secondary:hover, .pc-cta-secondary:focus-visible {
  outline: none;
  background: #0E0E0E;
  color: #F0EBE2;
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 #D44525;
}
@media (prefers-reduced-motion: reduce) {
  .pc-cta { transition: none; }
}

.pc-deck {
  position: relative;
  height: 540px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.pc-pivot {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: 36px;
  background: linear-gradient(180deg, #aaa 0%, #666 100%);
  border: 2px solid #0E0E0E;
  border-radius: 50%;
  z-index: 20;
  box-shadow: 0 3px 4px rgba(0,0,0,0.18);
}
.pc-pivot-rivet {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 10px; height: 10px;
  background: #0E0E0E;
  border-radius: 50%;
}

.pc-fan {
  position: absolute;
  top: 32px;
  left: 50%;
  width: 1px;
  height: 1px;
  transform: translateX(-50%);
}

.pc-chip {
  position: absolute;
  top: 0;
  left: -110px;
  width: 220px;
  height: 460px;
  border: none;
  padding: 0;
  cursor: pointer;
  background: transparent;
  transform-origin: 50% 0%;
  transform: rotate(var(--chip-angle));
  transition: transform 320ms cubic-bezier(0.34, 1.4, 0.64, 1) var(--chip-delay), filter 220ms ease;
  outline: none;
  font-family: inherit;
  filter: drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.18));
  animation: pc-chip-deal 700ms cubic-bezier(0.34, 1.4, 0.64, 1) var(--chip-delay) backwards;
}
@keyframes pc-chip-deal {
  from { transform: rotate(0deg) translateY(40px); opacity: 0; }
  to { transform: rotate(var(--chip-angle)); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .pc-chip { animation: none; transition: none; }
}

.pc-chip-back {
  position: absolute;
  inset: 0;
  background: var(--chip-swatch);
  border: 2px solid #0E0E0E;
  border-top: none;
  transform: translateY(0);
  transition: transform 280ms cubic-bezier(0.34, 1.4, 0.64, 1);
  background-image:
    repeating-linear-gradient(135deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 2px, transparent 2px, transparent 5px);
}

.pc-chip-face {
  position: absolute;
  inset: 0;
  background: var(--chip-color);
  color: var(--chip-ink);
  border: 2px solid #0E0E0E;
  display: flex;
  flex-direction: column;
  padding: 24px 18px 18px;
  transform: translateY(0);
  transition: transform 280ms cubic-bezier(0.34, 1.4, 0.64, 1);
}

.pc-chip:hover, .pc-chip:focus-visible {
  filter: drop-shadow(4px 8px 10px rgba(0, 0, 0, 0.32));
  z-index: 10;
}
.pc-chip:hover .pc-chip-face,
.pc-chip:focus-visible .pc-chip-face {
  transform: translateY(-12px);
}
.pc-chip:focus-visible .pc-chip-face { outline: 3px solid #FFFFFF; outline-offset: -5px; }
@media (prefers-reduced-motion: reduce) {
  .pc-chip-face, .pc-chip-back { transition: none; }
  .pc-chip:hover .pc-chip-face, .pc-chip:focus-visible .pc-chip-face { transform: none; }
}

.pc-chip-active { z-index: 12; }
.pc-chip-active .pc-chip-face { transform: translateY(-12px); }

.pc-chip-code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  opacity: 0.85;
  margin-bottom: 14px;
}
.pc-chip-name {
  font-family: 'Archivo', sans-serif;
  font-weight: 800;
  font-size: 22px;
  letter-spacing: -0.01em;
  line-height: 1;
  margin-bottom: 10px;
}
.pc-chip-line {
  display: block;
  width: 32px;
  height: 2px;
  background: currentColor;
  margin-bottom: 10px;
  opacity: 0.65;
}
.pc-chip-bullets {
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: auto;
  letter-spacing: 0.04em;
  opacity: 0.95;
  line-height: 1.3;
}
.pc-chip-cta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border-top: 1.5px solid currentColor;
  padding-top: 8px;
  opacity: 0.9;
  text-align: right;
}

.pc-detail {
  background: #FFFFFF;
  border: 2px solid #0E0E0E;
  margin: -56px 0 64px;
  padding: 28px 32px 36px;
  position: relative;
  box-shadow: 6px 6px 0 var(--chip-color);
  animation: pc-detail-in 320ms cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes pc-detail-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .pc-detail { animation: none; }
}

.pc-detail-head {
  display: flex;
  align-items: center;
  gap: 18px;
  border-bottom: 1.5px solid #0E0E0E;
  padding-bottom: 16px;
  margin-bottom: 18px;
}
.pc-detail-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.18em;
  background: var(--chip-color);
  color: var(--chip-ink);
  padding: 6px 10px;
  border: 2px solid #0E0E0E;
}
.pc-detail-name {
  font-family: 'Archivo', sans-serif;
  font-weight: 800;
  font-size: 32px;
  margin: 0;
  flex: 1;
}
.pc-detail-close {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.16em;
  background: transparent;
  border: 1.5px solid #0E0E0E;
  padding: 6px 12px;
  cursor: pointer;
  text-transform: uppercase;
  transition: background 180ms ease, color 180ms ease;
}
.pc-detail-close:hover, .pc-detail-close:focus-visible {
  background: #0E0E0E;
  color: #F0EBE2;
  outline: none;
}

.pc-detail-text {
  font-size: 18px;
  line-height: 1.5;
  color: #1A1A1A;
  max-width: 720px;
  margin: 0 0 16px;
}
.pc-detail-price {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  letter-spacing: 0.1em;
  color: var(--chip-color);
  font-weight: 700;
  margin: 0 0 18px;
}
.pc-detail-examples {
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
}
.pc-detail-examples li {
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 1.5px solid #0E0E0E;
  padding: 5px 10px;
  background: #F0EBE2;
}
.pc-detail-cta { display: flex; gap: 12px; flex-wrap: wrap; }

.pc-section { padding: 56px 0; border-top: 1px dashed rgba(14, 14, 14, 0.25); }

.pc-section-head { margin-bottom: 32px; }
.pc-section-eyebrow {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.24em;
  color: #4A4A4A;
  margin-bottom: 8px;
}
.pc-section-title {
  font-family: 'Archivo', sans-serif;
  font-weight: 800;
  font-size: clamp(36px, 5vw, 56px);
  line-height: 0.98;
  margin: 0 0 14px;
  color: #0E0E0E;
  letter-spacing: -0.015em;
}
.pc-section-lead {
  font-size: 17px;
  line-height: 1.55;
  color: #2A2A2A;
  max-width: 640px;
  margin: 0;
}

.pc-coverage {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 22px;
}
.pc-cov-card {
  background: #FFFFFF;
  border: 2px solid #0E0E0E;
  padding: 24px 22px 28px;
  position: relative;
  overflow: hidden;
  transition: transform 220ms ease;
}
.pc-cov-card:hover { transform: translate(-2px, -3px); }
.pc-cov-stripe {
  position: absolute;
  inset: 0 0 auto 0;
  height: 8px;
  background: var(--cov-color);
}
.pc-cov-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.18em;
  display: inline-block;
  background: var(--cov-color);
  color: #FFFFFF;
  padding: 5px 10px;
  margin: 12px 0 16px;
  border: 1.5px solid #0E0E0E;
}
.pc-cov-head {
  font-family: 'Archivo', sans-serif;
  font-weight: 800;
  font-size: 28px;
  letter-spacing: -0.01em;
  margin: 0 0 12px;
  color: #0E0E0E;
}
.pc-cov-desc {
  font-size: 15px;
  line-height: 1.5;
  color: #2A2A2A;
  margin: 0 0 18px;
}
.pc-cov-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-top: 1px dashed rgba(14, 14, 14, 0.3);
  padding-top: 14px;
}
.pc-cov-list li {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.06em;
  color: #1A1A1A;
}
.pc-cov-list li::before { content: '+ '; color: var(--cov-color); font-weight: 700; }
@media (prefers-reduced-motion: reduce) {
  .pc-cov-card { transition: none; }
}

.pc-section-price { padding-bottom: 80px; }

.pc-price-card {
  position: relative;
  max-width: 560px;
  margin: 0 auto;
  height: 360px;
  perspective: 1000px;
}
.pc-price-back {
  position: absolute;
  inset: 12px -16px -16px 12px;
  background: #9B2D14;
  border: 2px solid #0E0E0E;
  background-image: repeating-linear-gradient(135deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 2px, transparent 2px, transparent 5px);
}
.pc-price-face {
  position: relative;
  background: #D44525;
  color: #FFFFFF;
  border: 2px solid #0E0E0E;
  padding: 28px 32px 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.pc-price-tag {
  display: flex;
  justify-content: space-between;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.18em;
  border-bottom: 1.5px solid rgba(255,255,255,0.5);
  padding-bottom: 12px;
  margin-bottom: 16px;
}
.pc-price-num {
  font-family: 'Archivo', sans-serif;
  font-weight: 800;
  font-size: 88px;
  line-height: 1;
  letter-spacing: -0.04em;
  margin-bottom: 14px;
}
.pc-price-sub {
  display: block;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.04em;
  opacity: 0.92;
  margin-top: 4px;
}
.pc-price-list {
  list-style: none;
  padding: 0;
  margin: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.pc-price-list li {
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 14px;
  line-height: 1.4;
  letter-spacing: 0.02em;
}
.pc-price-list li::before { content: '> '; opacity: 0.7; }
.pc-price-cta { margin-top: 16px; }
.pc-price-cta .pc-cta-primary {
  background: #FFFFFF;
  color: #0E0E0E;
  border-color: #FFFFFF;
}
.pc-price-cta .pc-cta-primary:hover,
.pc-price-cta .pc-cta-primary:focus-visible {
  background: #0E0E0E;
  color: #FFFFFF;
  border-color: #FFFFFF;
}

.pc-call { padding-bottom: 20px; }
.pc-truck-panel {
  background: #FFFFFF;
  border: 4px solid #0E0E0E;
  padding: 36px 32px 32px;
  text-align: center;
  position: relative;
  max-width: 720px;
  margin: 0 auto;
  box-shadow: 8px 8px 0 #D44525;
}
.pc-truck-corners { position: absolute; inset: 8px; pointer-events: none; }
.pc-truck-corners span {
  position: absolute;
  width: 14px; height: 14px;
  border: 2px solid #0E0E0E;
  background: #F0EBE2;
  border-radius: 50%;
}
.pc-truck-corners span:nth-child(1) { top: 0; left: 0; }
.pc-truck-corners span:nth-child(2) { top: 0; right: 0; }
.pc-truck-corners span:nth-child(3) { bottom: 0; left: 0; }
.pc-truck-corners span:nth-child(4) { bottom: 0; right: 0; }

.pc-truck-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.24em;
  color: #4A4A4A;
}
.pc-truck-name {
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: 700;
  font-size: clamp(24px, 3.4vw, 36px);
  letter-spacing: 0.04em;
  margin: 6px 0 4px;
}
.pc-truck-phone {
  font-family: 'Archivo', sans-serif;
  font-weight: 800;
  font-size: clamp(54px, 8vw, 88px);
  letter-spacing: -0.02em;
  line-height: 1;
  color: #D44525;
  margin-bottom: 14px;
}
.pc-truck-meta {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: #1A1A1A;
}

.pc-footer {
  border-top: 2px solid #0E0E0E;
  padding: 18px 4px 4px;
  margin-top: 56px;
}
.pc-footer-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: #1A1A1A;
  margin-bottom: 8px;
}
.pc-footer-meta {
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 13px;
  letter-spacing: 0.04em;
  color: #4A4A4A;
  margin: 0;
}

@media (max-width: 880px) {
  .pc-hero { grid-template-columns: 1fr; }
  .pc-deck { height: 460px; }
  .pc-chip { width: 180px; height: 380px; left: -90px; }
}
`;
