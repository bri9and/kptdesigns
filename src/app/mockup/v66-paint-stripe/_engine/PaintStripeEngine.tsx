"use client";

/**
 * PaintStripeEngine — V66 Stripe Day
 *
 * Hot-asphalt black ground. Thermoplastic-yellow stripes laid down on load
 * (left-to-right, like a striping truck pass). ADA-blue accents on the
 * compliance section. Trade showcase: parking-lot striping crew.
 */

import { useState } from "react";

const LOTS = [
  { id: "001", name: "Tannery Court", stalls: 184, ada: 8, cure: "90 min", note: "Reseal + restripe. Two ADA stalls re-aimed to the door." },
  { id: "002", name: "Briar Plaza", stalls: 246, ada: 12, cure: "75 min", note: "Standard stalls 9' x 18', fire-lane curb yellow refreshed." },
  { id: "003", name: "Mill End Center", stalls: 412, ada: 18, cure: "2 hr", note: "Thermoplastic for the longevity tier. ADA van-acc. lanes added." },
  { id: "004", name: "Riverside Office", stalls: 132, ada: 6, cure: "60 min", note: "EV stalls striped with green inset. 2026 ADA spec verified." },
  { id: "005", name: "Northgate Strip", stalls: 308, ada: 14, cure: "90 min", note: "Crosswalks repainted ahead of school year traffic." },
  { id: "006", name: "Quarry Run", stalls: 92, ada: 4, cure: "60 min", note: "Re-aimed flow. Drainage gully respected with offset stalls." },
];

const ADA_RULES = [
  { code: "§ 502.2", title: "Parking-space size", body: "Minimum 96\" wide; access aisle 60\" min for accessible, 96\" min for van-accessible." },
  { code: "§ 502.3", title: "Access aisle", body: "Adjacent &amp; parallel to the parking space. Marked. No vehicles in the aisle, ever." },
  { code: "§ 502.4", title: "Floor / ground surface", body: "Stable, firm, slip-resistant. Slope no steeper than 1:48 in any direction." },
  { code: "§ 502.6", title: "Identification", body: "Each accessible space marked with the international symbol of accessibility. Van-accessible spaces additionally marked &lsquo;Van Accessible.&rsquo;" },
];

const PAINTS = [
  { name: "Latex traffic paint", cure: "30 min surface", life: "12–18 months", note: "Standard. Matched to local DPW spec." },
  { name: "Thermoplastic", cure: "90–120 min", life: "5–7 years", note: "Hot-applied, glass beaded. Lasts through plow season." },
  { name: "MMA epoxy", cure: "60 min", life: "3–5 years", note: "Cold-temp install window. Fire-lane red, ADA blue." },
  { name: "Preformed thermoplastic", cure: "10 min", life: "5+ years", note: "Symbols, arrows, ADA pictogram. Torch-down install." },
];

export default function PaintStripeEngine() {
  const [openLot, setOpenLot] = useState<string>("001");

  return (
    <>
      <style>{css}</style>
      <div className="ps-shell">
        <div className="ps-asphalt" aria-hidden />
        <div className="ps-lane-grid" aria-hidden />

        {/* TOP BAR */}
        <header className="ps-top">
          <div className="ps-mark">
            <span className="ps-mark-name">KPT &middot; LOT-SPEC STRIPING</span>
            <span className="ps-mark-sub">PARKING + ADA + RESEAL · MA / NH / RI</span>
          </div>
          <nav className="ps-nav">
            <a href="#stalls" className="ps-nav-link">Stalls</a>
            <a href="#ada" className="ps-nav-link">ADA</a>
            <a href="#cure" className="ps-nav-link">Cure</a>
            <a href="#book" className="ps-nav-link">Book a stripe</a>
          </nav>
        </header>

        {/* HERO */}
        <section className="ps-hero">
          <div className="ps-hero-stripe ps-hero-stripe-1" aria-hidden />
          <div className="ps-hero-stripe ps-hero-stripe-2" aria-hidden />
          <div className="ps-hero-ada" aria-hidden>
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="22" r="9" fill="#FFFFFF" />
              <path
                d="M40 38 L40 58 L48 58 L48 76 L60 76 L60 58 L68 58 L68 38 Z"
                fill="#FFFFFF"
              />
              <path
                d="M62 60 Q72 64 72 78 Q72 88 60 90 L52 90"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="ps-hero-text">
            <span className="ps-tag">CREW 7 · TRUCK 04</span>
            <h1 className="ps-headline">
              <span className="ps-headline-line">Stripe day.</span>
              <span className="ps-headline-line">Lot-spec to ADA,</span>
              <span className="ps-headline-line ps-headline-em">painted in the cure window.</span>
            </h1>
            <p className="ps-sub">
              Parking-lot striping, ADA layouts, and lot reseal — fresh
              thermoplastic, true geometry, signed off the same day.
            </p>
            <div className="ps-cta-row">
              <a className="ps-cta ps-cta-primary" href="#book">Stripe my lot</a>
              <a className="ps-cta ps-cta-secondary" href="#ada">See ADA layouts</a>
            </div>
            <p className="ps-hero-meta">
              <span className="ps-arrow">→</span> Truck pass at 10mph · 4&quot; line ·
              90% recovery rate on faded substrate
            </p>
          </div>
        </section>

        {/* STALLS */}
        <section id="stalls" className="ps-section">
          <header className="ps-section-head">
            <span className="ps-section-num">001</span>
            <h2 className="ps-section-title">Stalls — recent lots</h2>
            <p className="ps-section-aside">Hover a stall to lift the day&rsquo;s notes.</p>
          </header>
          <div className="ps-lots">
            {LOTS.map((l) => (
              <button
                key={l.id}
                className={`ps-lot${openLot === l.id ? " open" : ""}`}
                onMouseEnter={() => setOpenLot(l.id)}
                onFocus={() => setOpenLot(l.id)}
                onClick={() => setOpenLot(l.id)}
                aria-pressed={openLot === l.id}
              >
                <div className="ps-lot-stripe-pair" aria-hidden>
                  <span className="ps-lot-stripe" />
                  <span className="ps-lot-stripe" />
                  <span className="ps-lot-stripe" />
                </div>
                <span className="ps-lot-num">LOT {l.id}</span>
                <span className="ps-lot-name">{l.name}</span>
                <div className="ps-lot-stats">
                  <span><strong>{l.stalls}</strong> stalls</span>
                  <span><strong className="ps-blue">{l.ada}</strong> ADA</span>
                  <span><strong>{l.cure}</strong> cure</span>
                </div>
                <p className="ps-lot-note">{l.note}</p>
              </button>
            ))}
          </div>
        </section>

        {/* ADA LAYOUT */}
        <section id="ada" className="ps-section ps-section-ada">
          <header className="ps-section-head">
            <span className="ps-section-num ps-section-num-ada">002</span>
            <h2 className="ps-section-title ps-section-title-ada">ADA Layout — 2010 Standards, 2026 confirmed</h2>
            <p className="ps-section-aside">Van-accessible aisle: 96&quot; minimum. Slope: &le; 1:48 every direction.</p>
          </header>
          <div className="ps-ada-grid">
            <div className="ps-ada-diagram" aria-hidden>
              <div className="ps-ada-diagram-stall ps-ada-diagram-stall-acc">
                <span className="ps-ada-diagram-symbol">
                  <svg viewBox="0 0 60 60">
                    <circle cx="30" cy="14" r="5" fill="#FFFFFF" />
                    <path d="M22 24 L22 38 L28 38 L28 50 L36 50 L36 38 L42 38 L42 24 Z" fill="#FFFFFF" />
                  </svg>
                </span>
                <span className="ps-ada-diagram-label">96&quot; STALL</span>
              </div>
              <div className="ps-ada-diagram-aisle">
                <span className="ps-ada-diagram-aisle-label">96&quot; ACCESS AISLE</span>
                <div className="ps-ada-diagram-hatch" />
              </div>
              <div className="ps-ada-diagram-stall ps-ada-diagram-stall-van">
                <span className="ps-ada-diagram-symbol">
                  <svg viewBox="0 0 60 60">
                    <circle cx="30" cy="14" r="5" fill="#FFFFFF" />
                    <path d="M22 24 L22 38 L28 38 L28 50 L36 50 L36 38 L42 38 L42 24 Z" fill="#FFFFFF" />
                  </svg>
                </span>
                <span className="ps-ada-diagram-label">VAN ACCESSIBLE</span>
              </div>
            </div>
            <ol className="ps-ada-rules">
              {ADA_RULES.map((r) => (
                <li key={r.code} className="ps-ada-rule" tabIndex={0}>
                  <span className="ps-ada-code">{r.code}</span>
                  <h3>{r.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: r.body }} />
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CURE TIMES */}
        <section id="cure" className="ps-section">
          <header className="ps-section-head">
            <span className="ps-section-num">003</span>
            <h2 className="ps-section-title">Cure times — when the lot reopens</h2>
            <p className="ps-section-aside">Crew leaves cones in the cure window. Lot reopens on the meter, not the eye.</p>
          </header>
          <div className="ps-cure-grid">
            {PAINTS.map((p) => (
              <article key={p.name} className="ps-cure-card" tabIndex={0}>
                <div className="ps-cure-stripe" aria-hidden />
                <h3>{p.name}</h3>
                <dl>
                  <dt>Cure</dt>
                  <dd>{p.cure}</dd>
                  <dt>Life</dt>
                  <dd>{p.life}</dd>
                </dl>
                <p>{p.note}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="book" className="ps-section ps-section-cta">
          <div className="ps-cta-card">
            <div className="ps-cta-stripe" aria-hidden />
            <span className="ps-tag">SAME-WEEK STRIPING WINDOW</span>
            <h2 className="ps-cta-headline">Bring us your lot drawing.</h2>
            <p className="ps-cta-body">
              Walk us the lot, hand us the as-built, we&rsquo;ll mark a layout in
              chalk and quote it before the trash trucks come Friday.
            </p>
            <div className="ps-cta-row">
              <a className="ps-cta ps-cta-primary" href="#">Stripe my lot</a>
              <a className="ps-cta ps-cta-secondary" href="#">Truck the cone trailer</a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="ps-footer">
          <div className="ps-footer-stripe" aria-hidden />
          <div className="ps-footer-row">
            <span className="ps-footer-mag">KPT · STRIPING · 04 / 26 / 26</span>
            <span>ADA-COMPLIANCE PLEDGE: ANY 2010-NON-CONFORMING LAYOUT WE STRIPE, WE FIX FREE.</span>
            <span>(508) 555-0117 · MAGNETIC TRUCK SIGN ON CHANNEL 4</span>
          </div>
        </footer>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;700;800&family=JetBrains+Mono:wght@400;700&display=swap');

.ps-shell {
  min-height: 100vh;
  background: #131211;
  color: #FAD230;
  font-family: 'Inter', system-ui, sans-serif;
  position: relative;
  padding: 28px 24px 0;
  overflow-x: hidden;
}
.ps-asphalt {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(circle at 18% 22%, rgba(255, 255, 255, 0.018) 0px, transparent 4px),
    radial-gradient(circle at 62% 48%, rgba(255, 255, 255, 0.022) 0px, transparent 5px),
    radial-gradient(circle at 84% 78%, rgba(255, 255, 255, 0.018) 0px, transparent 4px),
    radial-gradient(circle at 32% 86%, rgba(255, 255, 255, 0.02) 0px, transparent 4px),
    radial-gradient(circle at 92% 12%, rgba(255, 255, 255, 0.018) 0px, transparent 4px),
    linear-gradient(180deg, #1A1816 0%, #0E0D0C 100%);
  background-size: 220px 220px, 180px 180px, 240px 240px, 200px 200px, 160px 160px, 100% 100%;
}
.ps-lane-grid {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 80px,
    rgba(250, 210, 48, 0.03) 80px,
    rgba(250, 210, 48, 0.03) 81px
  );
}
.ps-shell > * { position: relative; z-index: 1; }

.ps-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;
  padding-bottom: 18px;
  margin-bottom: 36px;
  border-bottom: 4px solid #FAD230;
}
.ps-mark { display: flex; flex-direction: column; gap: 4px; }
.ps-mark-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 28px;
  letter-spacing: 0.08em;
  color: #FAD230;
}
.ps-mark-sub {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  color: rgba(250, 210, 48, 0.7);
}
.ps-nav { display: flex; gap: 22px; flex-wrap: wrap; }
.ps-nav-link {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 18px;
  letter-spacing: 0.16em;
  color: #FAD230;
  text-decoration: none;
  padding-bottom: 4px;
  position: relative;
  transition: color 200ms ease;
}
.ps-nav-link::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -2px;
  height: 4px;
  background: #FAD230;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 280ms cubic-bezier(0.7, 0, 0.3, 1);
}
.ps-nav-link:hover, .ps-nav-link:focus-visible {
  outline: none;
  color: #1660B7;
}
.ps-nav-link:hover::after, .ps-nav-link:focus-visible::after {
  transform: scaleX(1);
  background: #1660B7;
}
@media (prefers-reduced-motion: reduce) { .ps-nav-link::after { transition: none; } }

.ps-hero {
  position: relative;
  padding: 56px 0 80px;
  margin-bottom: 32px;
  border-bottom: 1px dashed rgba(250, 210, 48, 0.25);
  overflow: hidden;
}
.ps-hero-stripe {
  position: absolute;
  height: 18px;
  background: #FAD230;
  box-shadow: 0 0 16px rgba(250, 210, 48, 0.3);
  transform-origin: left;
  animation: ps-stripe-paint 1.4s cubic-bezier(0.7, 0, 0.3, 1) both;
}
.ps-hero-stripe-1 {
  top: 90px;
  left: 0;
  right: 0;
  animation-delay: 200ms;
}
.ps-hero-stripe-2 {
  top: 220px;
  left: 0;
  right: 0;
  animation-delay: 480ms;
  height: 14px;
}
@keyframes ps-stripe-paint {
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
}
@media (prefers-reduced-motion: reduce) {
  .ps-hero-stripe { animation: none; transform: scaleX(1); }
}

.ps-hero-ada {
  position: absolute;
  bottom: 80px;
  right: 24px;
  width: 130px;
  height: 130px;
  background: #1660B7;
  display: grid;
  place-items: center;
  box-shadow: inset 0 0 0 6px #FFFFFF;
  animation: ps-stripe-paint 1.2s cubic-bezier(0.7, 0, 0.3, 1) both;
  animation-delay: 760ms;
  transform-origin: right;
}
.ps-hero-ada svg { width: 80px; height: 80px; }
@media (prefers-reduced-motion: reduce) { .ps-hero-ada { animation: none; transform: scaleX(1); } }

.ps-hero-text {
  position: relative;
  padding: 60px 0 24px;
  max-width: 880px;
}
.ps-tag {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  color: #131211;
  background: #FAD230;
  padding: 4px 10px;
  margin-bottom: 18px;
}
.ps-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(56px, 9vw, 144px);
  line-height: 0.92;
  margin: 0 0 22px;
  color: #FAD230;
  letter-spacing: 0.005em;
}
.ps-headline-line { display: block; }
.ps-headline-em {
  background: #FAD230;
  color: #131211;
  padding: 0 12px;
  display: inline-block;
}
.ps-sub {
  font-family: 'Inter', sans-serif;
  font-size: 19px;
  line-height: 1.5;
  color: rgba(250, 210, 48, 0.85);
  max-width: 560px;
  margin: 0 0 28px;
}
.ps-cta-row { display: flex; gap: 14px; flex-wrap: wrap; }
.ps-cta {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 18px;
  letter-spacing: 0.18em;
  padding: 14px 26px;
  text-decoration: none;
  border: 3px solid #FAD230;
  transition: transform 200ms ease, background 200ms ease, color 200ms ease;
}
.ps-cta-primary { background: #FAD230; color: #131211; }
.ps-cta-primary:hover, .ps-cta-primary:focus-visible {
  outline: none;
  background: #1660B7;
  color: #FFFFFF;
  border-color: #1660B7;
  transform: translate(-1px, -1px);
}
.ps-cta-secondary { background: transparent; color: #FAD230; }
.ps-cta-secondary:hover, .ps-cta-secondary:focus-visible {
  outline: none;
  background: #FAD230;
  color: #131211;
  transform: translate(-1px, -1px);
}
@media (prefers-reduced-motion: reduce) { .ps-cta { transition: none; } }

.ps-hero-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.06em;
  color: rgba(250, 210, 48, 0.6);
  margin: 22px 0 0;
}
.ps-arrow { color: #1660B7; font-weight: 700; margin-right: 6px; }

.ps-section { padding: 56px 0 32px; }
.ps-section-head {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 20px;
  align-items: baseline;
  margin-bottom: 32px;
  padding-bottom: 14px;
  border-bottom: 4px solid #FAD230;
}
.ps-section-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 56px;
  color: #FAD230;
  line-height: 1;
}
.ps-section-num-ada { color: #1660B7; }
.ps-section-title {
  font-family: 'Bebas Neue', sans-serif;
  font-weight: 400;
  font-size: clamp(32px, 5vw, 56px);
  margin: 0;
  color: #FAD230;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.ps-section-title-ada { color: #1660B7; }
.ps-section-aside {
  grid-column: 2;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: rgba(250, 210, 48, 0.6);
  margin: 4px 0 0;
}

.ps-lots {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 4px;
  background: #FAD230;
  padding: 4px;
}
.ps-lot {
  background: #1A1816;
  border: 0;
  text-align: left;
  padding: 24px 22px 26px;
  font: inherit;
  color: #FAD230;
  cursor: pointer;
  position: relative;
  outline: none;
  transition: background 220ms ease, transform 220ms ease;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ps-lot-stripe-pair {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
  height: 6px;
}
.ps-lot-stripe {
  flex: 1;
  background: rgba(250, 210, 48, 0.4);
  transition: background 220ms ease;
}
.ps-lot:hover .ps-lot-stripe, .ps-lot:focus-visible .ps-lot-stripe, .ps-lot.open .ps-lot-stripe {
  background: #FAD230;
}
.ps-lot-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  color: #1660B7;
}
.ps-lot-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 28px;
  letter-spacing: 0.04em;
  color: #FAD230;
  line-height: 1;
}
.ps-lot-stats {
  display: flex;
  gap: 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: rgba(250, 210, 48, 0.7);
}
.ps-lot-stats strong {
  color: #FAD230;
  font-weight: 700;
  font-size: 16px;
  margin-right: 3px;
}
.ps-lot-stats .ps-blue { color: #4D9CE6; }
.ps-lot-note {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(250, 210, 48, 0.85);
  margin: 4px 0 0;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition: opacity 240ms ease, max-height 280ms ease, margin 240ms ease;
}
.ps-lot:hover .ps-lot-note,
.ps-lot:focus-visible .ps-lot-note,
.ps-lot.open .ps-lot-note {
  opacity: 1;
  max-height: 100px;
  margin-top: 6px;
}
.ps-lot:hover, .ps-lot:focus-visible, .ps-lot.open {
  background: #2A2622;
}
@media (prefers-reduced-motion: reduce) {
  .ps-lot, .ps-lot-stripe, .ps-lot-note { transition: none; }
  .ps-lot-note { opacity: 1; max-height: none; margin-top: 6px; }
}

.ps-section-ada { padding: 56px 0 56px; }
.ps-ada-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 36px;
  align-items: start;
}

.ps-ada-diagram {
  background: #131211;
  padding: 22px;
  border: 4px solid #FAD230;
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 4px;
  height: 360px;
}
.ps-ada-diagram-stall {
  background: #1660B7;
  display: grid;
  place-items: center;
  position: relative;
  border: 3px solid #FAD230;
}
.ps-ada-diagram-stall-acc { border-color: #FAD230; }
.ps-ada-diagram-stall-van { border-color: #FAD230; }
.ps-ada-diagram-symbol { display: grid; place-items: center; }
.ps-ada-diagram-symbol svg { width: 60px; height: 60px; }
.ps-ada-diagram-label {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  text-align: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  color: #FFFFFF;
}
.ps-ada-diagram-aisle {
  background: #131211;
  border: 3px dashed #FAD230;
  display: grid;
  place-items: center;
  position: relative;
}
.ps-ada-diagram-aisle-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  color: #FAD230;
  z-index: 1;
}
.ps-ada-diagram-hatch {
  position: absolute;
  inset: 6px;
  background-image: repeating-linear-gradient(
    -45deg,
    transparent 0px,
    transparent 14px,
    rgba(250, 210, 48, 0.55) 14px,
    rgba(250, 210, 48, 0.55) 16px
  );
}

.ps-ada-rules { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
.ps-ada-rule {
  border: 2px solid rgba(250, 210, 48, 0.3);
  padding: 18px 20px;
  background: rgba(22, 96, 183, 0.05);
  outline: none;
  transition: background 220ms ease, border-color 220ms ease, transform 220ms ease;
}
.ps-ada-code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  background: #1660B7;
  color: #FFFFFF;
  padding: 3px 8px;
}
.ps-ada-rule h3 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 22px;
  letter-spacing: 0.06em;
  margin: 10px 0 6px;
  color: #FAD230;
  text-transform: uppercase;
}
.ps-ada-rule p {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.55;
  color: rgba(250, 210, 48, 0.85);
  margin: 0;
}
.ps-ada-rule:hover, .ps-ada-rule:focus-visible {
  border-color: #1660B7;
  background: rgba(22, 96, 183, 0.18);
  transform: translateX(4px);
}
@media (prefers-reduced-motion: reduce) { .ps-ada-rule { transition: none; } }

.ps-cure-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.ps-cure-card {
  background: #1A1816;
  border: 2px solid #FAD230;
  padding: 24px 22px 26px;
  outline: none;
  transition: background 220ms ease, transform 220ms ease;
  position: relative;
}
.ps-cure-stripe {
  position: absolute;
  top: -2px;
  left: -2px;
  height: 8px;
  width: 0;
  background: #FAD230;
  transition: width 360ms cubic-bezier(0.7, 0, 0.3, 1);
}
.ps-cure-card:hover .ps-cure-stripe, .ps-cure-card:focus-visible .ps-cure-stripe {
  width: calc(100% + 4px);
}
.ps-cure-card h3 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 24px;
  letter-spacing: 0.04em;
  margin: 0 0 14px;
  color: #FAD230;
  text-transform: uppercase;
}
.ps-cure-card dl {
  margin: 0 0 14px;
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 4px 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
}
.ps-cure-card dt {
  color: rgba(250, 210, 48, 0.5);
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.ps-cure-card dd { margin: 0; color: #FAD230; }
.ps-cure-card p {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  color: rgba(250, 210, 48, 0.78);
  margin: 0;
}
.ps-cure-card:hover, .ps-cure-card:focus-visible {
  background: #2A2622;
  transform: translateY(-3px);
}
@media (prefers-reduced-motion: reduce) {
  .ps-cure-card, .ps-cure-stripe { transition: none; }
  .ps-cure-card:hover, .ps-cure-card:focus-visible { transform: none; }
}

.ps-section-cta { padding-bottom: 80px; }
.ps-cta-card {
  border: 4px solid #FAD230;
  background: #1A1816;
  padding: 56px 56px 64px;
  position: relative;
  overflow: hidden;
}
.ps-cta-stripe {
  position: absolute;
  top: 36%;
  left: -10%;
  right: -10%;
  height: 18px;
  background: #FAD230;
  transform: rotate(-2.5deg);
  opacity: 0.12;
}
.ps-cta-headline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(40px, 6vw, 80px);
  letter-spacing: 0.02em;
  margin: 14px 0 18px;
  color: #FAD230;
  text-transform: uppercase;
}
.ps-cta-body {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  line-height: 1.55;
  color: rgba(250, 210, 48, 0.85);
  max-width: 560px;
  margin: 0 0 28px;
}

.ps-footer {
  position: relative;
  padding: 24px 0 16px;
  margin-top: 32px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  color: rgba(250, 210, 48, 0.7);
  text-transform: uppercase;
}
.ps-footer-stripe {
  height: 6px;
  background: #FAD230;
  margin-bottom: 16px;
}
.ps-footer-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.ps-footer-mag {
  background: #FAD230;
  color: #131211;
  padding: 4px 10px;
}

@media (max-width: 880px) {
  .ps-ada-grid { grid-template-columns: 1fr; }
  .ps-ada-diagram { height: 240px; }
  .ps-cta-card { padding: 36px 24px 40px; }
  .ps-section-head { grid-template-columns: 56px 1fr; }
  .ps-section-aside { grid-column: 1 / -1; }
  .ps-hero-ada { right: 12px; bottom: 24px; width: 90px; height: 90px; }
}
`;
