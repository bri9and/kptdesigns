"use client";

/**
 * PegboardStackEngine — V55 Packout
 *
 * Modern handyman's truck = Milwaukee Packout stack. Site is a stack of modular
 * cases that click together; sections are individual cases; a top tote clips
 * on with the page nav.
 *
 * Trade showcase: Handyman.
 */

import { useState } from "react";

const CASES = [
  {
    id: "tote",
    label: "Top Tote — Nav",
    title: "The Top Tote",
    subtitle: "Recurring property-manager turnovers in the small-parts organizer.",
    rows: [
      { client: "Ridgeline PM (12 doors)", scope: "Turnover punch — paint, caulk, blinds, locks. 7-day window." },
      { client: "Saguaro PM (9 doors)", scope: "Per-unit checklist invoiced flat. Parts at cost; no markup." },
      { client: "Old Town Group (4 buildings)", scope: "Common-area honey-do — bulbs, hinges, gutter pulls." },
      { client: "Casita Holdings (5 doors)", scope: "Tenant repairs on call — three-hour quote-or-fix window." },
    ],
  },
  {
    id: "tier-1",
    label: "Case 01 — One-Call",
    title: "Case 01 — One-call-does-it-all",
    subtitle: "Hourly handyman work. Two-hour minimum, materials at cost +20%.",
    rows: [
      { client: "Hourly", scope: "$95/hr. First hour billable on arrival; truck-charge waived inside ZIP." },
      { client: "Same-day", scope: "Booked before 11 a.m., on the dolly by 2 p.m. — Tempe / Mesa / Chandler." },
      { client: "After-hours", scope: "$135/hr after 6 p.m. Two-hour minimum. Sat AM at standard rate." },
      { client: "Materials", scope: "At cost +20%. Receipts attached to the carbonless invoice." },
    ],
  },
  {
    id: "tier-2",
    label: "Case 02 — Patch & Paint",
    title: "Case 02 — Patch & paint",
    subtitle: "Drywall, ceilings, base, caulk. The 90% of a turnover the PM cares about.",
    rows: [
      { client: "Drywall patch", scope: "Up to 12&quot; — flat-rate $145 per patch, primed and ready for paint." },
      { client: "Wall paint, single room", scope: "Cut-and-roll one coat, owner-supplied paint — $325 + roll&deg;." },
      { client: "Ceiling repaint", scope: "Pop-out, prime, finish. Knockdown-texture match included." },
      { client: "Caulk &amp; call it", scope: "Tubs, baseboards, door casings. Whole-unit caulk pass — $185." },
    ],
  },
  {
    id: "tier-3",
    label: "Case 03 — Property Turnover",
    title: "Case 03 — Property Turnover",
    subtitle: "Net-14 invoiced packages for property managers. The bread-and-butter.",
    rows: [
      { client: "Studio / 1-bed", scope: "Standard turn — $485 flat. Patches, paint touch-up, blinds, lock re-key." },
      { client: "2-bed / 2-bath", scope: "$685 flat. Adds tub re-caulk, flapper swap, smoke-detector batteries." },
      { client: "3-bed", scope: "$895 flat. Adds garage-door cycle test and dryer-vent clean." },
      { client: "Move-in punch", scope: "Walk with PM, list-and-fix in one pass. Hourly billable above 90 min." },
    ],
  },
];

const DOLLY = [
  { make: "Milwaukee", model: "Packout 22\" Rolling Tool Box (48-22-8426)", note: "Bottom of the stack. Hauls everything." },
  { make: "Milwaukee", model: "Packout XL Tool Box (48-22-8429)", note: "Power tools, M18 batts, the M12 1/4\" hex." },
  { make: "Milwaukee", model: "Packout Compact Organizer (48-22-8435)", note: "Fasteners — sorted by gauge, length, head." },
  { make: "Milwaukee", model: "Packout Tool Tote (48-22-8316)", note: "Soft tools — pliers, drivers, levels, knives." },
  { make: "DeWalt", model: "ToughSystem 2.0 — borrowed", note: "Trim and base case — DW dadoes the foam better than MW." },
  { make: "Carbonless", model: "Yellow-copy invoice book", note: "Two copies. White goes to the office, yellow stays with you." },
];

const RECEIPTS = [
  { date: "04/24", code: "TURN-019", line: "Studio turn — Ridgeline #312", amt: "$485" },
  { date: "04/24", code: "HRLY-088", line: "Garage door spring — Casita #4", amt: "$245" },
  { date: "04/25", code: "TURN-020", line: "2BR/2BA turn — Saguaro #14", amt: "$685" },
  { date: "04/25", code: "TURN-021", line: "Studio turn — Old Town #B-201", amt: "$485" },
  { date: "04/26", code: "HRLY-089", line: "Drip irrigation pull — Casita #2", amt: "$165" },
  { date: "04/26", code: "TURN-022", line: "3BR turn + appliance haul — Ridgeline #418", amt: "$1,065" },
];

export default function PegboardStackEngine() {
  const [open, setOpen] = useState<string>("tier-2");

  return (
    <>
      <style>{css}</style>
      <div className="pb-shell">
        {/* TOP TOTE — NAV */}
        <header className="pb-tote">
          <div className="pb-tote-handle" aria-hidden>
            <span className="pb-handle-grip" />
            <span className="pb-handle-emboss">KPT&nbsp;PROPERTY&nbsp;CARE</span>
          </div>
          <div className="pb-tote-body">
            <div className="pb-tote-latch pb-latch-l" aria-hidden>
              <span className="pb-latch-tab" />
            </div>
            <nav className="pb-nav" aria-label="primary">
              <a href="#cases" className="pb-nav-link">Cases</a>
              <a href="#tote" className="pb-nav-link">Top Tote</a>
              <a href="#dolly" className="pb-nav-link">Dolly</a>
              <a href="#book" className="pb-nav-link">Invoice Book</a>
            </nav>
            <div className="pb-tote-latch pb-latch-r" aria-hidden>
              <span className="pb-latch-tab" />
            </div>
          </div>
        </header>

        {/* HERO */}
        <section className="pb-hero">
          <div className="pb-hero-grid">
            <div className="pb-hero-text">
              <p className="pb-eyebrow">Vol. 55 &middot; The Stack</p>
              <h1 className="pb-headline">
                One-call-does-it-all.
                <br />
                <span className="pb-headline-fin">Stacked, packed, on the dolly by 7.</span>
              </h1>
              <p className="pb-sub">
                Property turnovers, residential punch lists, commercial honey-do
                &mdash; invoiced net 14, ready next Friday. Tempe&ndash;Mesa&ndash;Chandler.
              </p>
              <div className="pb-cta-row">
                <a className="pb-cta pb-cta-fill" href="#book">Stack a job</a>
                <a className="pb-cta pb-cta-line" href="#cases">Open the cases</a>
              </div>
            </div>
            <div className="pb-hero-stack" aria-hidden>
              <div className="pb-stack-mini pb-mini-1">
                <span className="pb-mini-emboss">CASE 01</span>
              </div>
              <div className="pb-stack-mini pb-mini-2">
                <span className="pb-mini-emboss">CASE 02</span>
              </div>
              <div className="pb-stack-mini pb-mini-3">
                <span className="pb-mini-emboss">CASE 03</span>
              </div>
              <div className="pb-stack-mini pb-mini-tote">
                <span className="pb-mini-emboss">TOTE</span>
              </div>
            </div>
          </div>
        </section>

        {/* CASES */}
        <section id="cases" className="pb-section">
          <header className="pb-section-head">
            <span className="pb-tag">SECTION&nbsp;A</span>
            <h2 className="pb-section-title">Three cases, clicked together.</h2>
            <p className="pb-section-meta">
              Click a case to slide it out and open. Foam inside is cut to your job.
            </p>
          </header>
          <ul className="pb-stack-list">
            {CASES.map((c) => (
              <li key={c.id} className={`pb-case${open === c.id ? " open" : ""}`}>
                <button
                  className="pb-case-front"
                  onClick={() => setOpen(open === c.id ? "" : c.id)}
                  aria-expanded={open === c.id}
                >
                  <span className="pb-case-latch pb-latch-l-c" aria-hidden>
                    <span className="pb-latch-tab" />
                  </span>
                  <span className="pb-case-label">
                    <span className="pb-case-tag">{c.label.split(" — ")[0]}</span>
                    <span className="pb-case-title">{c.label.split(" — ")[1] ?? c.label}</span>
                  </span>
                  <span className="pb-case-latch pb-latch-r-c" aria-hidden>
                    <span className="pb-latch-tab" />
                  </span>
                  <span className="pb-case-arrow" aria-hidden>{open === c.id ? "▲" : "▼"}</span>
                </button>
                {open === c.id && (
                  <div className="pb-case-open">
                    <div className="pb-case-foam">
                      <h3 className="pb-case-h">{c.title}</h3>
                      <p className="pb-case-sub">{c.subtitle}</p>
                      <ul className="pb-case-rows">
                        {c.rows.map((r) => (
                          <li key={r.client} className="pb-case-row">
                            <span className="pb-row-client">{r.client}</span>
                            <span className="pb-row-scope">{r.scope}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* TOP TOTE EXPANDED */}
        <section id="tote" className="pb-section">
          <header className="pb-section-head">
            <span className="pb-tag">SECTION&nbsp;B</span>
            <h2 className="pb-section-title">The Top Tote.</h2>
            <p className="pb-section-meta">Recurring property-manager work. The list is the moat.</p>
          </header>
          <div className="pb-tote-grid">
            {CASES[0].rows.map((r) => (
              <article key={r.client} className="pb-tote-cell" tabIndex={0}>
                <span className="pb-cell-tag">PM</span>
                <h3 className="pb-cell-client">{r.client}</h3>
                <p className="pb-cell-scope">{r.scope}</p>
              </article>
            ))}
          </div>
        </section>

        {/* DOLLY */}
        <section id="dolly" className="pb-section">
          <header className="pb-section-head">
            <span className="pb-tag">SECTION&nbsp;C</span>
            <h2 className="pb-section-title">The Dolly.</h2>
            <p className="pb-section-meta">Equipment list with model numbers. We run a Packout stack.</p>
          </header>
          <table className="pb-dolly">
            <thead>
              <tr>
                <th>Make</th>
                <th>Model</th>
                <th>Pocket Note</th>
              </tr>
            </thead>
            <tbody>
              {DOLLY.map((d) => (
                <tr key={d.model}>
                  <td className="pb-dolly-make">{d.make}</td>
                  <td className="pb-dolly-model">{d.model}</td>
                  <td className="pb-dolly-note">{d.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* INVOICE BOOK */}
        <section id="book" className="pb-section pb-section-cta">
          <header className="pb-section-head">
            <span className="pb-tag">SECTION&nbsp;D</span>
            <h2 className="pb-section-title">Invoice book.</h2>
            <p className="pb-section-meta">Carbonless yellow-copy. White goes to the office; yellow stays with you.</p>
          </header>
          <div className="pb-cta-card">
            <div className="pb-receipt">
              <div className="pb-receipt-head">
                <span>KPT PROPERTY CARE</span>
                <span>NO. 4047</span>
              </div>
              <ul className="pb-receipt-list">
                {RECEIPTS.map((r) => (
                  <li key={r.code} className="pb-receipt-row">
                    <span className="pb-r-date">{r.date}</span>
                    <span className="pb-r-code">{r.code}</span>
                    <span className="pb-r-line">{r.line}</span>
                    <span className="pb-r-amt">{r.amt}</span>
                  </li>
                ))}
              </ul>
              <div className="pb-receipt-foot">
                <span>NET 14</span>
                <span>WK TOTAL</span>
                <span className="pb-r-tot">$3,130</span>
              </div>
            </div>
            <div className="pb-cta-text">
              <p className="pb-eyebrow">Stack a job</p>
              <h2 className="pb-cta-headline">Property managers, this is your moat.</h2>
              <p className="pb-cta-body">
                Send the unit list and the keys. We turn it Friday, the receipt&rsquo;s
                in your inbox Saturday, the invoice clears net 14. Quote-or-fix
                inside three hours during business days.
              </p>
              <div className="pb-cta-row">
                <a className="pb-cta pb-cta-fill" href="#">Open an account</a>
                <a className="pb-cta pb-cta-line" href="#">Hourly only — book online</a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pb-footer">
          <div className="pb-footer-stamp" aria-hidden>
            <span className="pb-footer-emboss">KPT&nbsp;PROPERTY&nbsp;CARE</span>
          </div>
          <div className="pb-footer-rows">
            <span>BUSINESS LIC. #44-291-K</span>
            <span>BONDED &amp; INSURED</span>
            <span>MAGNETIC SIGN: (480)&nbsp;555-PACK</span>
            <span>&copy; 2026 &middot; one-call-does-it-all</span>
          </div>
        </footer>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;700&family=DM+Mono:wght@400;500;700&display=swap');

.pb-shell {
  --pb-red: #C42024;
  --pb-red-dark: #A11317;
  --pb-black: #1A1A1A;
  --pb-shell: #232323;
  --pb-chrome: #B7BABE;
  --pb-foam: #2E2E2E;
  --pb-paper: #F1EFEC;
  --pb-paper-warm: #F5EFD8;
  background: var(--pb-black);
  color: var(--pb-paper);
  min-height: 100vh;
  font-family: 'Archivo', 'Inter', system-ui, sans-serif;
  padding: 0;
}

/* TOP TOTE NAV */
.pb-tote { padding: 22px 28px 0; }
.pb-tote-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--pb-shell);
  border: 2px solid var(--pb-black);
  border-radius: 26px;
  padding: 8px 16px;
  margin: 0 auto 0;
  width: fit-content;
  position: relative;
  z-index: 2;
  transform: translateY(14px);
  box-shadow: 0 4px 0 #0c0c0c, inset 0 1px 0 rgba(255,255,255,0.07);
}
.pb-handle-grip {
  width: 56px;
  height: 6px;
  background: linear-gradient(180deg, #444 0, #1c1c1c 100%);
  border-radius: 3px;
  margin-right: 14px;
}
.pb-handle-emboss {
  font-family: 'Archivo Black', sans-serif;
  letter-spacing: 0.16em;
  font-size: 11px;
  color: rgba(241, 239, 236, 0.55);
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.6), 0 -1px 0 rgba(255, 255, 255, 0.08);
}
.pb-tote-body {
  background: var(--pb-red);
  border: 2px solid var(--pb-black);
  padding: 24px 28px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 20px;
  align-items: center;
  border-radius: 6px;
  position: relative;
  box-shadow: 0 6px 0 var(--pb-red-dark), 0 12px 24px rgba(0, 0, 0, 0.5);
  background-image:
    repeating-linear-gradient(180deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 6px),
    radial-gradient(circle at 30% 20%, rgba(255,255,255,0.08), transparent 60%);
}
.pb-tote-latch {
  width: 38px;
  height: 26px;
  background: linear-gradient(180deg, var(--pb-chrome) 0, #7C7F82 100%);
  border: 1.5px solid var(--pb-black);
  border-radius: 4px;
  position: relative;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.5);
}
.pb-latch-tab {
  position: absolute;
  inset: 6px 8px;
  background: linear-gradient(180deg, #555 0, #2a2a2a 100%);
  border-radius: 2px;
}
.pb-nav {
  display: flex;
  justify-content: center;
  gap: 28px;
  flex-wrap: wrap;
  font-family: 'Archivo Black', sans-serif;
  font-size: 14px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.pb-nav-link {
  color: var(--pb-paper);
  text-decoration: none;
  padding: 10px 4px;
  position: relative;
  transition: color 180ms ease;
}
.pb-nav-link::after {
  content: '';
  position: absolute;
  inset: auto 0 4px 0;
  height: 2px;
  background: var(--pb-paper);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 240ms cubic-bezier(0.7, 0, 0.3, 1);
}
.pb-nav-link:hover, .pb-nav-link:focus-visible { outline: none; }
.pb-nav-link:hover::after, .pb-nav-link:focus-visible::after { transform: scaleX(1); }

/* HERO */
.pb-hero { padding: 36px 28px 64px; }
.pb-hero-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 36px;
  align-items: center;
}
.pb-eyebrow {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--pb-red);
  margin: 0 0 18px;
}
.pb-headline {
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(44px, 6.4vw, 92px);
  line-height: 0.96;
  margin: 0 0 22px;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--pb-paper);
}
.pb-headline-fin { color: var(--pb-red); }
.pb-sub {
  font-size: 17px;
  line-height: 1.5;
  margin: 0 0 28px;
  max-width: 540px;
  color: rgba(241, 239, 236, 0.85);
}
.pb-cta-row { display: flex; gap: 14px; flex-wrap: wrap; }
.pb-cta {
  display: inline-block;
  padding: 14px 22px;
  text-decoration: none;
  font-family: 'Archivo Black', sans-serif;
  font-size: 13px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  border: 2px solid var(--pb-paper);
  transition: background 200ms ease, color 200ms ease, transform 200ms ease;
}
.pb-cta-fill {
  background: var(--pb-red);
  color: var(--pb-paper);
  border-color: var(--pb-red);
  box-shadow: 0 3px 0 var(--pb-red-dark);
}
.pb-cta-fill:hover, .pb-cta-fill:focus-visible {
  background: var(--pb-paper);
  color: var(--pb-red);
  outline: none;
  transform: translate(-1px, -1px);
}
.pb-cta-line {
  background: transparent;
  color: var(--pb-paper);
}
.pb-cta-line:hover, .pb-cta-line:focus-visible {
  background: var(--pb-paper);
  color: var(--pb-black);
  outline: none;
  transform: translate(-1px, -1px);
}
@media (prefers-reduced-motion: reduce) {
  .pb-cta { transition: background 200ms ease, color 200ms ease; }
  .pb-cta:hover, .pb-cta:focus-visible { transform: none; }
}

/* HERO STACK ART */
.pb-hero-stack {
  position: relative;
  height: 460px;
  perspective: 1200px;
}
.pb-stack-mini {
  position: absolute;
  left: 50%;
  width: 280px;
  height: 92px;
  border-radius: 8px;
  background: var(--pb-red);
  border: 2px solid var(--pb-black);
  transform: translateX(-50%);
  box-shadow: 0 8px 0 var(--pb-red-dark), 0 14px 30px rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  background-image:
    repeating-linear-gradient(180deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 6px),
    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 70%);
  animation: pb-stack-click 600ms cubic-bezier(0.5, 1.6, 0.4, 1) both;
}
.pb-mini-1 { bottom: 12px; animation-delay: 0ms; }
.pb-mini-2 { bottom: 110px; animation-delay: 120ms; background: var(--pb-shell); border-color: var(--pb-black); }
.pb-mini-3 { bottom: 208px; animation-delay: 240ms; }
.pb-mini-tote { bottom: 306px; animation-delay: 360ms; background: var(--pb-shell); }
@keyframes pb-stack-click {
  0% { transform: translate(-50%, -120px); opacity: 0; }
  60% { transform: translate(-50%, 4px); opacity: 1; }
  100% { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .pb-stack-mini { animation: none; }
}
.pb-mini-emboss {
  font-family: 'Archivo Black', sans-serif;
  letter-spacing: 0.16em;
  font-size: 13px;
  color: rgba(255,255,255,0.85);
  text-shadow: 0 1px 0 rgba(0,0,0,0.6);
}

/* SECTIONS */
.pb-section { padding: 28px 28px 36px; }
.pb-section-head {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 18px;
  align-items: center;
  border-top: 2px dashed rgba(241,239,236,0.2);
  padding-top: 28px;
  margin-bottom: 28px;
}
.pb-tag {
  font-family: 'Archivo Black', sans-serif;
  letter-spacing: 0.18em;
  font-size: 11px;
  text-transform: uppercase;
  background: var(--pb-red);
  color: var(--pb-paper);
  padding: 6px 10px;
  border-radius: 3px;
}
.pb-section-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(24px, 3vw, 38px);
  letter-spacing: -0.01em;
  margin: 0;
  text-transform: uppercase;
  line-height: 1;
}
.pb-section-meta {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(241,239,236,0.7);
  margin: 0;
  text-align: right;
  max-width: 260px;
}

/* CASES */
.pb-stack-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.pb-case {
  background: var(--pb-shell);
  border: 2px solid var(--pb-black);
  border-radius: 6px;
  box-shadow: 0 6px 0 #0c0c0c;
  overflow: hidden;
  transition: transform 220ms ease;
}
.pb-case:nth-child(1) { background: var(--pb-red); }
.pb-case:nth-child(3) { background: var(--pb-red); }
.pb-case.open { transform: translateY(-3px); }
@media (prefers-reduced-motion: reduce) {
  .pb-case { transition: none; }
}
.pb-case-front {
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 16px;
  align-items: center;
  padding: 18px 20px;
  background: transparent;
  border: 0;
  cursor: pointer;
  font-family: inherit;
  color: inherit;
  text-align: left;
  background-image:
    repeating-linear-gradient(180deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 7px);
  transition: background 180ms ease;
}
.pb-case-front:hover, .pb-case-front:focus-visible {
  outline: none;
  background-color: rgba(255,255,255,0.06);
}
.pb-case-latch {
  width: 38px;
  height: 26px;
  background: linear-gradient(180deg, var(--pb-chrome) 0, #7C7F82 100%);
  border: 1.5px solid var(--pb-black);
  border-radius: 4px;
  position: relative;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.5);
  transition: transform 200ms ease;
}
.pb-case-front:hover .pb-case-latch,
.pb-case-front:focus-visible .pb-case-latch { transform: rotate(-8deg); }
@media (prefers-reduced-motion: reduce) {
  .pb-case-latch { transition: none; }
  .pb-case-front:hover .pb-case-latch { transform: none; }
}
.pb-case-label { display: flex; flex-direction: column; gap: 2px; }
.pb-case-tag {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(241,239,236,0.8);
}
.pb-case-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: 20px;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  color: var(--pb-paper);
}
.pb-case-arrow {
  font-size: 14px;
  color: var(--pb-paper);
  letter-spacing: 0;
}

.pb-case-open {
  border-top: 2px solid rgba(0,0,0,0.4);
}
.pb-case-foam {
  background: var(--pb-foam);
  color: var(--pb-paper);
  padding: 28px 24px;
  background-image:
    radial-gradient(circle at 25% 30%, rgba(241,239,236,0.05) 12px, transparent 14px),
    radial-gradient(circle at 75% 70%, rgba(241,239,236,0.05) 16px, transparent 18px),
    radial-gradient(circle at 60% 25%, rgba(241,239,236,0.04) 9px, transparent 11px);
}
.pb-case-h {
  font-family: 'Archivo Black', sans-serif;
  font-size: 24px;
  margin: 0 0 6px;
  letter-spacing: -0.01em;
  text-transform: uppercase;
}
.pb-case-sub {
  font-size: 14px;
  margin: 0 0 18px;
  color: rgba(241,239,236,0.78);
}
.pb-case-rows {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
}
.pb-case-row {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 18px;
  padding: 12px 14px;
  background: rgba(0, 0, 0, 0.35);
  border-left: 3px solid var(--pb-red);
}
.pb-row-client {
  font-family: 'Archivo Black', sans-serif;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.pb-row-scope {
  font-size: 14px;
  line-height: 1.45;
  color: rgba(241,239,236,0.88);
}

/* TOTE GRID */
.pb-tote-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
}
.pb-tote-cell {
  background: var(--pb-shell);
  border: 2px solid var(--pb-black);
  border-radius: 6px;
  padding: 18px 18px 22px;
  outline: none;
  transition: background 180ms ease, transform 180ms ease;
}
.pb-tote-cell:hover, .pb-tote-cell:focus-visible {
  background: var(--pb-red);
  transform: translateY(-2px);
}
@media (prefers-reduced-motion: reduce) {
  .pb-tote-cell { transition: background 180ms ease; }
  .pb-tote-cell:hover, .pb-tote-cell:focus-visible { transform: none; }
}
.pb-cell-tag {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  background: var(--pb-paper);
  color: var(--pb-black);
  padding: 3px 8px;
  display: inline-block;
  margin-bottom: 12px;
}
.pb-cell-client {
  font-family: 'Archivo Black', sans-serif;
  font-size: 18px;
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  line-height: 1.05;
}
.pb-cell-scope {
  font-size: 13px;
  line-height: 1.45;
  margin: 0;
  color: rgba(241,239,236,0.85);
}

/* DOLLY TABLE */
.pb-dolly {
  width: 100%;
  border-collapse: collapse;
  background: var(--pb-shell);
  border: 2px solid var(--pb-black);
  border-radius: 6px;
  overflow: hidden;
}
.pb-dolly thead th {
  background: var(--pb-red);
  color: var(--pb-paper);
  font-family: 'Archivo Black', sans-serif;
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-align: left;
  padding: 12px 14px;
}
.pb-dolly tbody tr {
  border-top: 1px solid rgba(241,239,236,0.12);
  transition: background 180ms ease;
}
.pb-dolly tbody tr:hover, .pb-dolly tbody tr:focus-within { background: rgba(255,255,255,0.06); }
.pb-dolly td {
  padding: 12px 14px;
  vertical-align: top;
  font-size: 14px;
}
.pb-dolly-make {
  font-family: 'Archivo Black', sans-serif;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  width: 130px;
  color: var(--pb-red);
}
.pb-dolly-model { font-family: 'DM Mono', monospace; font-size: 13px; color: var(--pb-paper); }
.pb-dolly-note { font-size: 13px; line-height: 1.45; color: rgba(241,239,236,0.78); }

/* CTA — INVOICE BOOK */
.pb-section-cta { padding-bottom: 64px; }
.pb-cta-card {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 32px;
  align-items: flex-start;
}
.pb-receipt {
  background: var(--pb-paper-warm);
  color: var(--pb-black);
  padding: 22px 22px 18px;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  border: 1.5px solid #B8AC85;
  background-image:
    repeating-linear-gradient(0deg, transparent 0px, transparent 22px, rgba(26,26,26,0.18) 23px),
    radial-gradient(circle at 0% 0%, rgba(0,0,0,0.04), transparent 80%);
  box-shadow: 6px 8px 0 rgba(0,0,0,0.45), inset 0 0 0 1px rgba(0,0,0,0.05);
  position: relative;
}
.pb-receipt::after {
  content: '';
  position: absolute;
  top: 8px;
  left: 50%;
  width: 14px;
  height: 14px;
  background: #2a1a0c;
  border-radius: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 0 2px rgba(0,0,0,0.18);
}
.pb-receipt-head, .pb-receipt-foot {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding-top: 14px;
  border-bottom: 1.5px solid var(--pb-black);
  padding-bottom: 8px;
  margin-bottom: 8px;
}
.pb-receipt-foot {
  border-top: 1.5px solid var(--pb-black);
  border-bottom: 0;
  padding-top: 10px;
  padding-bottom: 0;
  margin-top: 10px;
  margin-bottom: 0;
}
.pb-r-tot { color: var(--pb-red); }
.pb-receipt-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.pb-receipt-row {
  display: grid;
  grid-template-columns: 50px 76px 1fr 60px;
  gap: 8px;
  padding: 6px 0;
  align-items: baseline;
}
.pb-r-date { color: #6f6042; }
.pb-r-code { letter-spacing: 0.06em; color: var(--pb-red); }
.pb-r-line { color: var(--pb-black); font-weight: 500; }
.pb-r-amt { text-align: right; font-weight: 700; }

.pb-cta-text { padding-top: 6px; }
.pb-cta-headline {
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(28px, 3.4vw, 44px);
  line-height: 1;
  margin: 0 0 18px;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}
.pb-cta-body {
  font-size: 16px;
  line-height: 1.55;
  margin: 0 0 22px;
  max-width: 560px;
  color: rgba(241,239,236,0.85);
}

/* FOOTER */
.pb-footer {
  background: var(--pb-red);
  color: var(--pb-paper);
  border-top: 2px solid var(--pb-black);
  padding: 24px 28px 30px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 24px;
  align-items: center;
}
.pb-footer-stamp {
  border: 2px solid var(--pb-paper);
  padding: 10px 14px;
  border-radius: 4px;
  background:
    repeating-linear-gradient(180deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 7px);
}
.pb-footer-emboss {
  font-family: 'Archivo Black', sans-serif;
  letter-spacing: 0.16em;
  font-size: 13px;
}
.pb-footer-rows {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 26px;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(241,239,236,0.92);
  justify-content: flex-end;
}

/* FOCUS */
.pb-shell *:focus-visible { outline: 2px solid var(--pb-paper); outline-offset: 3px; }

@media (max-width: 980px) {
  .pb-hero-grid { grid-template-columns: 1fr; }
  .pb-hero-stack { height: 380px; }
  .pb-cta-card { grid-template-columns: 1fr; }
  .pb-section-head { grid-template-columns: 1fr; }
  .pb-section-meta { text-align: left; }
  .pb-tote-body { grid-template-columns: 1fr; }
  .pb-tote-latch { display: none; }
  .pb-case-front { grid-template-columns: 1fr auto; gap: 8px; }
  .pb-case-latch { display: none; }
  .pb-case-row { grid-template-columns: 1fr; }
  .pb-footer { grid-template-columns: 1fr; }
  .pb-footer-rows { justify-content: flex-start; }
}
`;
