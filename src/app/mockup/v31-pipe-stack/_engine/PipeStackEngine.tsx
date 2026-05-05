"use client";

/**
 * PipeStackEngine — V31 Pipe Stack
 *
 * Isometric DWV stack. Vent rises top-right, drain runs bottom-left.
 * Branches enter from the left at lavatory, kitchen, and water-closet heights.
 * Hover a fixture — its branch lights copper. JetBrains Mono throughout.
 */

import { useState } from "react";

type Fixture = "vent" | "lav" | "kitchen" | "wc" | "cleanout";

const FIXTURES: { id: Fixture; label: string; spec: string; depth: string; pipe: string }[] = [
  { id: "vent", label: "VENT THROUGH ROOF", spec: "2\" × 12\" min above flashing", depth: "+18'", pipe: "PVC SCH40" },
  { id: "lav", label: "LAV — 2ND FLOOR", spec: "1-1/2\" trap arm — 60\" max from vent", depth: "+9' 6\"", pipe: "1-1/2\" CU/PVC" },
  { id: "kitchen", label: "KITCHEN SINK — 1ST", spec: "2\" trap arm + dishwasher hi-loop", depth: "+3' 2\"", pipe: "2\" PVC" },
  { id: "wc", label: "WATER CLOSET — 1ST", spec: "3\" closet flange — wax to subfloor", depth: "+1' 4\"", pipe: "3\" PVC" },
  { id: "cleanout", label: "CLEANOUT", spec: "Brass cleanout cap — accessible @ rim", depth: "−2' 6\"", pipe: "4\" PVC" },
];

const CODE = [
  {
    sec: "UPC §905.4",
    title: "Vent terminations",
    body: "Vents through roof shall extend at least twelve (12) inches above the roof. Where exposed to frost — 24 inches.",
    note: "We ream every penetration and flash with EPDM, not lead, unless the AHJ insists.",
  },
  {
    sec: "UPC §1002.1",
    title: "Trap requirements",
    body: "Every plumbing fixture shall be separately trapped by a water-seal trap with vertical depth of two (2) to four (4) inches.",
    note: "P-traps only. No S-traps. Drum traps only on tubs that already had one.",
  },
  {
    sec: "UPC §1003.2",
    title: "Trap arm length",
    body: "Trap arm length shall not exceed the values in Table 1003.2 — sized by trap arm diameter.",
    note: "1-1/2\" trap arm runs 60\" max. Plan the vent location before you call for sheetrock.",
  },
  {
    sec: "IPC §906.1",
    title: "Cleanouts required",
    body: "Cleanouts shall be installed at every change of direction greater than 45° in the building drain.",
    note: "And at the building drain stub-out, every time. Brass cap, accessible.",
  },
];

const FLOORS = [
  {
    label: "2ND FLOOR",
    runs: [
      { fix: "Hall bath — lav, tub, WC", branch: "WET-VENT GROUP", note: "Lav vents the tub; both vent the closet. UPC §908.0." },
      { fix: "Master bath — lav (2), shower, WC", branch: "INDIVIDUALLY VENTED", note: "Each lav individually vented; shower trapped to a 2\" stub." },
    ],
  },
  {
    label: "1ST FLOOR",
    runs: [
      { fix: "Kitchen — sink, DW, disposal", branch: "2\" TRAP ARM + AAV (if needed)", note: "Hi-loop the dishwasher to keep waste from back-feeding." },
      { fix: "Half bath — lav, WC", branch: "WET-VENT", note: "Vent rises in the wall behind the lav, ties to stack at the ceiling." },
      { fix: "Laundry — washer standpipe", branch: "2\" TRAP, 36\" STANDPIPE", note: "Trap arm 30\" min, 60\" max from the vent. We measure." },
    ],
  },
  {
    label: "BASEMENT",
    runs: [
      { fix: "Floor drain", branch: "TRAP-PRIMER FED", note: "Connect to a fixture supply so the trap doesn't dry out and gas the basement." },
      { fix: "Sump — graywater", branch: "CHECK + UNION", note: "Two checks if the run is over 12 vertical feet. Always a union for service." },
      { fix: "Building drain — to main", branch: "4\" PVC, 1/4\" PER FOOT", note: "Cleanout at the wall stub-out. Camera-able the day we leave." },
    ],
  },
];

export default function PipeStackEngine() {
  const [hover, setHover] = useState<Fixture | null>(null);

  return (
    <>
      <style>{css}</style>
      <div className="ps-shell">
        <div className="ps-bg" aria-hidden />

        <header className="ps-nav">
          <div className="ps-mark">
            <span className="ps-mark-name">KPT &middot; PLUMBING</span>
            <span className="ps-mark-sub">SERVICE / REPIPES / DWV</span>
          </div>
          <nav aria-label="Primary">
            <a href="#stack">The Stack</a>
            <a href="#code">Code</a>
            <a href="#service">Service Map</a>
            <a href="#contact">Book a rough-in</a>
          </nav>
          <div className="ps-nav-tag">
            <span>LIC. ML-014823</span>
            <span>24/7 DISPATCH</span>
          </div>
        </header>

        <section className="ps-hero">
          <div className="ps-hero-copy">
            <div className="ps-hero-eyebrow">DWV STACK &middot; ISOMETRIC</div>
            <h1 className="ps-hero-headline">
              Rough-in. Trap arm.<br />Cleanout.
            </h1>
            <p className="ps-hero-tagline">
              Done with pipe dope, not promises.
            </p>
            <p className="ps-hero-sub">
              Service plumbing, repipes, and DWV — your stack drawn before we cut a hole. We hand the
              homeowner an isometric and the inspector a clean run. Hover any fixture in the diagram to
              light its branch in copper.
            </p>
            <div className="ps-hero-ctas">
              <a className="ps-cta ps-cta-primary" href="#contact">Book a rough-in &rarr;</a>
              <a className="ps-cta ps-cta-ghost" href="#stack">Open a cleanout</a>
            </div>
            <dl className="ps-hero-meta">
              <div><dt>LIC</dt><dd>ML-014823 &middot; MA</dd></div>
              <div><dt>RES</dt><dd>response &lt; 90 min</dd></div>
              <div><dt>WTY</dt><dd>2 yr labor, 5 yr fixture</dd></div>
            </dl>
          </div>

          <figure className="ps-hero-stack" aria-label="Isometric DWV stack diagram">
            <svg viewBox="0 0 600 720" width="100%" height="100%">
              <defs>
                <linearGradient id="ps-pvc" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFFEF8" />
                  <stop offset="50%" stopColor="#ECEAE2" />
                  <stop offset="100%" stopColor="#C0BDB0" />
                </linearGradient>
                <linearGradient id="ps-cu" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#D8945E" />
                  <stop offset="50%" stopColor="#B36A3D" />
                  <stop offset="100%" stopColor="#7C4520" />
                </linearGradient>
                <linearGradient id="ps-cu-hot" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#F0B484" />
                  <stop offset="50%" stopColor="#D88553" />
                  <stop offset="100%" stopColor="#9C5828" />
                </linearGradient>
                <linearGradient id="ps-brass" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E5C97A" />
                  <stop offset="50%" stopColor="#C8A557" />
                  <stop offset="100%" stopColor="#8A6F2C" />
                </linearGradient>
              </defs>

              <g stroke="#1B1B1B" strokeWidth="0.6" opacity="0.18">
                <line x1="0" y1="60" x2="600" y2="60" strokeDasharray="2 4" />
                <line x1="0" y1="240" x2="600" y2="240" strokeDasharray="2 4" />
                <line x1="0" y1="430" x2="600" y2="430" strokeDasharray="2 4" />
                <line x1="0" y1="600" x2="600" y2="600" strokeDasharray="2 4" />
              </g>
              <g fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="#1B1B1B" opacity="0.5">
                <text x="14" y="56">+18'  ROOF FLASH</text>
                <text x="14" y="236">+9' 6"  2ND FLOOR</text>
                <text x="14" y="426">+3' 2"  1ST CEIL</text>
                <text x="14" y="596">−2' 6"  BLDG DRAIN</text>
              </g>

              <line x1="380" y1="60" x2="380" y2="640"
                stroke={hover ? "url(#ps-cu-hot)" : "url(#ps-pvc)"}
                strokeWidth="22"
                style={{ transition: "stroke 360ms" }}
              />
              <line x1="380" y1="60" x2="380" y2="640" stroke="#1B1B1B" strokeWidth="0.8" />

              <ellipse cx="380" cy="60" rx="26" ry="6" fill="#444" />
              <rect x="370" y="48" width="20" height="10" fill="#1B1B1B" />
              <text x="412" y="56" fontFamily="'JetBrains Mono', monospace" fontSize="11" fill="#1B1B1B">
                <tspan fontWeight="700">VTR</tspan> · 2" PVC
              </text>

              <g style={{ opacity: hover === "lav" ? 1 : 0.55, transition: "opacity 360ms" }}>
                <line x1="160" y1="240" x2="376" y2="240" stroke="url(#ps-cu)" strokeWidth="14" />
                <line x1="160" y1="240" x2="160" y2="320" stroke="url(#ps-cu)" strokeWidth="14" />
                <rect x="120" y="316" width="80" height="14" fill="#C8A557" stroke="#1B1B1B" strokeWidth="0.6" />
                <text x="120" y="306" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="#1B1B1B" fontWeight="700">LAV — 2ND</text>
                <text x="120" y="346" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="#1B1B1B">1-1/2" trap arm</text>
              </g>

              <g style={{ opacity: hover === "kitchen" ? 1 : 0.55, transition: "opacity 360ms" }}>
                <line x1="180" y1="430" x2="376" y2="430" stroke="url(#ps-cu)" strokeWidth="16" />
                <line x1="180" y1="430" x2="180" y2="510" stroke="url(#ps-cu)" strokeWidth="16" />
                <rect x="140" y="506" width="84" height="14" fill="#C8A557" stroke="#1B1B1B" strokeWidth="0.6" />
                <text x="140" y="496" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="#1B1B1B" fontWeight="700">KITCHEN SINK</text>
                <text x="140" y="538" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="#1B1B1B">2" + DW hi-loop</text>
              </g>

              <g style={{ opacity: hover === "wc" ? 1 : 0.55, transition: "opacity 360ms" }}>
                <line x1="190" y1="552" x2="376" y2="552" stroke="url(#ps-cu)" strokeWidth="20" />
                <ellipse cx="190" cy="552" rx="32" ry="14" fill="#C0BDB0" stroke="#1B1B1B" strokeWidth="0.8" />
                <ellipse cx="190" cy="552" rx="20" ry="8" fill="#ECEAE2" stroke="#1B1B1B" strokeWidth="0.6" />
                <text x="138" y="548" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="#1B1B1B" fontWeight="700" textAnchor="end">WC — 1ST</text>
                <text x="138" y="566" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="#1B1B1B" textAnchor="end">3" closet flange</text>
              </g>

              <g style={{ opacity: hover === "cleanout" ? 1 : 0.6, transition: "opacity 360ms" }}>
                <line x1="380" y1="640" x2="540" y2="640" stroke="url(#ps-pvc)" strokeWidth="22" />
                <line x1="380" y1="640" x2="540" y2="640" stroke="#1B1B1B" strokeWidth="0.8" />
                <circle cx="540" cy="640" r="12" fill="url(#ps-brass)" stroke="#1B1B1B" strokeWidth="0.8" />
                <text x="556" y="636" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="#1B1B1B" fontWeight="700">CLEANOUT</text>
                <text x="556" y="650" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="#1B1B1B">brass — accessible</text>
              </g>

              <g style={{ opacity: hover === "vent" ? 1 : 0.6, transition: "opacity 360ms" }}>
                <text x="412" y="78" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="#1B1B1B">12" min over flashing</text>
              </g>

              <line x1="430" y1="100" x2="500" y2="120" stroke="#1B1B1B" strokeWidth="0.8" />
              <rect x="498" y="120" width="80" height="20" fill="#FFFEF8" stroke="#1B1B1B" strokeWidth="0.8" />
              <text x="538" y="134" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="#1B1B1B" fontWeight="700">KPT</text>

              <g fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#1B1B1B" opacity="0.6">
                <text x="394" y="170">3" PVC SCH40 STACK</text>
                <text x="394" y="380">4" PVC BLDG DRAIN</text>
              </g>
            </svg>

            <div className="ps-hero-callouts" aria-hidden>
              <button
                type="button"
                className={`ps-call ps-call-vent${hover === "vent" ? " ps-call-on" : ""}`}
                onMouseEnter={() => setHover("vent")}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover("vent")}
                onBlur={() => setHover(null)}
                aria-label="Vent through roof"
              >
                VTR
              </button>
              <button
                type="button"
                className={`ps-call ps-call-lav${hover === "lav" ? " ps-call-on" : ""}`}
                onMouseEnter={() => setHover("lav")}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover("lav")}
                onBlur={() => setHover(null)}
                aria-label="Lavatory branch"
              >
                LAV
              </button>
              <button
                type="button"
                className={`ps-call ps-call-kitchen${hover === "kitchen" ? " ps-call-on" : ""}`}
                onMouseEnter={() => setHover("kitchen")}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover("kitchen")}
                onBlur={() => setHover(null)}
                aria-label="Kitchen branch"
              >
                KIT
              </button>
              <button
                type="button"
                className={`ps-call ps-call-wc${hover === "wc" ? " ps-call-on" : ""}`}
                onMouseEnter={() => setHover("wc")}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover("wc")}
                onBlur={() => setHover(null)}
                aria-label="Water closet branch"
              >
                WC
              </button>
              <button
                type="button"
                className={`ps-call ps-call-co${hover === "cleanout" ? " ps-call-on" : ""}`}
                onMouseEnter={() => setHover("cleanout")}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover("cleanout")}
                onBlur={() => setHover(null)}
                aria-label="Cleanout"
              >
                CO
              </button>
            </div>
          </figure>
        </section>

        <section id="stack" className="ps-stack">
          <div className="ps-section-head">
            <div className="ps-section-num">01</div>
            <div>
              <h2>The Stack</h2>
              <p>Sections live at fixture branches. Each branch has its spec, depth, and pipe schedule.</p>
            </div>
          </div>

          <div className="ps-fixtures">
            {FIXTURES.map((f) => (
              <article
                key={f.id}
                className={`ps-fixture${hover === f.id ? " ps-fixture-on" : ""}`}
                onMouseEnter={() => setHover(f.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(f.id)}
                onBlur={() => setHover(null)}
                tabIndex={0}
              >
                <div className="ps-fixture-tag">{f.id.toUpperCase()}</div>
                <h3>{f.label}</h3>
                <dl>
                  <div><dt>SPEC</dt><dd>{f.spec}</dd></div>
                  <div><dt>DEPTH</dt><dd>{f.depth}</dd></div>
                  <div><dt>PIPE</dt><dd>{f.pipe}</dd></div>
                </dl>
                <div className="ps-fixture-vein" aria-hidden />
              </article>
            ))}
          </div>
        </section>

        <section id="code" className="ps-code">
          <div className="ps-section-head">
            <div className="ps-section-num">02</div>
            <div>
              <h2>Code</h2>
              <p>UPC / IPC excerpts with our notes — small-caps section heads, hand-marked margin questions
                answered.</p>
            </div>
          </div>

          <div className="ps-code-grid">
            {CODE.map((c) => (
              <article key={c.sec} className="ps-code-row">
                <div className="ps-code-sec">{c.sec}</div>
                <div className="ps-code-body">
                  <h3>{c.title}</h3>
                  <p className="ps-code-quote">"{c.body}"</p>
                  <p className="ps-code-note"><span>OUR NOTE &mdash;</span> {c.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="service" className="ps-service">
          <div className="ps-section-head">
            <div className="ps-section-num">03</div>
            <div>
              <h2>Service Map</h2>
              <p>Every floor, every fixture, every branch — drawn before we cut a hole.</p>
            </div>
          </div>

          <div className="ps-floors">
            {FLOORS.map((floor) => (
              <div key={floor.label} className="ps-floor">
                <div className="ps-floor-label">{floor.label}</div>
                <div className="ps-floor-runs">
                  {floor.runs.map((r) => (
                    <div key={r.fix} className="ps-run">
                      <div className="ps-run-fix">{r.fix}</div>
                      <div className="ps-run-branch">{r.branch}</div>
                      <div className="ps-run-note">{r.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="ps-cta-band">
          <div className="ps-cta-band-inner">
            <div>
              <div className="ps-cta-band-eyebrow">CALL OR BOOK</div>
              <h3>The stack drawn before we cut a hole.</h3>
              <p>
                We don't open walls until we know where we're going. Send us a photo of the meter and the
                floor plan; we'll draw the iso back to you within the day.
              </p>
            </div>
            <a className="ps-cta ps-cta-primary" href="tel:+16175550144">Book a rough-in &rarr;</a>
          </div>
        </section>

        <footer className="ps-footer">
          <div className="ps-footer-cols">
            <div>
              <div className="ps-footer-mark">KPT &middot; PLUMBING</div>
              <div className="ps-footer-tag">SERVICE / REPIPES / DWV</div>
            </div>
            <div className="ps-footer-stamp">
              <div className="ps-footer-stamp-name">MASTER PLUMBER</div>
              <div className="ps-footer-stamp-num">ML-014823</div>
              <div className="ps-footer-stamp-state">Commonwealth of Massachusetts</div>
            </div>
            <div className="ps-footer-dispatch">
              <div>AFTER-HOURS DISPATCH</div>
              <div className="ps-footer-num">(617) 555 — 0144</div>
              <div>shop@kptplumbing.com</div>
            </div>
          </div>
          <div className="ps-footer-line" aria-hidden />
          <div className="ps-footer-tiny">
            All work under permit. Insured to a million. Service trucks stocked to UPC §1003.2 trap-arm tables.
          </div>
        </footer>
      </div>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

  .ps-shell {
    --pvc: #ECEAE2;
    --pvc-deep: #DCDAD0;
    --copper: #B36A3D;
    --copper-hot: #D8854F;
    --brass: #C8A557;
    --teflon: #6FA8C4;
    --ink: #1B1B1B;
    --ink-soft: #444;
    font-family: 'JetBrains Mono', ui-monospace, SF Mono, Consolas, monospace;
    color: var(--ink);
    background: var(--pvc);
    position: relative;
    overflow-x: hidden;
  }
  .ps-shell h1, .ps-shell h2, .ps-shell h3 { font-family: 'JetBrains Mono', monospace; font-weight: 700; }

  .ps-bg {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(0deg, transparent 0 23px, rgba(27,27,27,0.04) 24px),
      linear-gradient(90deg, transparent 0 23px, rgba(27,27,27,0.04) 24px);
    background-size: 24px 24px, 24px 24px;
    z-index: 1;
  }
  .ps-shell > *:not(.ps-bg) { position: relative; z-index: 2; }

  /* NAV */
  .ps-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 22px 56px 18px;
    border-bottom: 1.5px solid var(--ink);
  }
  .ps-mark { display: flex; flex-direction: column; gap: 2px; }
  .ps-mark-name { font-size: 16px; font-weight: 700; letter-spacing: 0.06em; }
  .ps-mark-sub { font-size: 11px; letter-spacing: 0.18em; color: var(--ink-soft); }
  .ps-nav nav { display: flex; gap: 24px; }
  .ps-nav nav a {
    color: var(--ink); text-decoration: none; font-size: 13px;
    letter-spacing: 0.08em; padding-bottom: 2px; border-bottom: 1.5px solid transparent;
    transition: border-color 200ms, color 200ms;
  }
  .ps-nav nav a:hover, .ps-nav nav a:focus-visible { color: var(--copper); border-bottom-color: var(--copper); outline: none; }
  .ps-nav-tag {
    display: flex; flex-direction: column; gap: 2px; align-items: flex-end;
    font-size: 10px; letter-spacing: 0.14em; color: var(--ink-soft);
  }

  /* HERO */
  .ps-hero {
    display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
    padding: 64px 56px 80px;
    align-items: center;
  }
  .ps-hero-eyebrow { font-size: 11px; letter-spacing: 0.22em; color: var(--copper); margin-bottom: 22px; }
  .ps-hero-headline { font-size: clamp(48px, 6vw, 80px); line-height: 0.96; margin: 0 0 18px; letter-spacing: -0.02em; }
  .ps-hero-tagline { font-size: clamp(20px, 2.4vw, 28px); margin: 0 0 22px; color: var(--copper); font-weight: 500; }
  .ps-hero-sub { font-family: 'Inter', system-ui, sans-serif; font-size: 17px; line-height: 1.55; color: var(--ink); max-width: 520px; margin-bottom: 26px; }
  .ps-hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 28px; }
  .ps-hero-meta { display: grid; grid-template-columns: repeat(3, auto); gap: 22px; margin: 0; }
  .ps-hero-meta div { display: flex; flex-direction: column; gap: 2px; }
  .ps-hero-meta dt { font-size: 10px; letter-spacing: 0.18em; color: var(--ink-soft); }
  .ps-hero-meta dd { margin: 0; font-size: 14px; color: var(--ink); font-weight: 500; }

  .ps-hero-stack { position: relative; aspect-ratio: 1 / 1.2; max-height: 720px; margin: 0; background: rgba(255,253,244,0.6); border: 1.5px solid var(--ink); }
  .ps-hero-callouts { position: absolute; inset: 0; pointer-events: none; }
  .ps-call {
    position: absolute; pointer-events: auto;
    background: var(--pvc); border: 1.5px solid var(--ink);
    color: var(--ink); padding: 4px 9px; font-size: 11px;
    font-family: 'JetBrains Mono', monospace; font-weight: 700; letter-spacing: 0.14em;
    cursor: default;
    transition: background 200ms, color 200ms, border-color 200ms;
  }
  .ps-call:focus-visible { outline: 2px solid var(--copper); outline-offset: 2px; }
  .ps-call-vent { top: 6%; right: 8%; }
  .ps-call-lav { top: 32%; left: 8%; }
  .ps-call-kitchen { top: 56%; left: 10%; }
  .ps-call-wc { top: 74%; left: 14%; }
  .ps-call-co { bottom: 8%; right: 6%; }
  .ps-call-on { background: var(--copper); border-color: var(--copper); color: #FFF; }

  /* CTAs */
  .ps-cta {
    display: inline-block; padding: 14px 22px; font-size: 13px;
    text-decoration: none; letter-spacing: 0.14em; text-transform: uppercase;
    border: 1.5px solid; transition: background 200ms, color 200ms, transform 200ms;
    font-weight: 700;
  }
  .ps-cta-primary { background: var(--copper); color: #FFF; border-color: var(--copper); }
  .ps-cta-primary:hover, .ps-cta-primary:focus-visible { background: var(--copper-hot); border-color: var(--copper-hot); outline: none; transform: translateY(-1px); }
  .ps-cta-ghost { background: transparent; color: var(--ink); border-color: var(--ink); }
  .ps-cta-ghost:hover, .ps-cta-ghost:focus-visible { background: var(--ink); color: var(--pvc); outline: none; }

  /* SECTIONS */
  .ps-stack, .ps-code, .ps-service { padding: 56px 56px 72px; border-top: 1.5px solid var(--ink); }
  .ps-section-head { display: grid; grid-template-columns: 70px 1fr; gap: 20px; align-items: start; margin-bottom: 32px; }
  .ps-section-num { font-size: 36px; font-weight: 800; color: var(--copper); line-height: 1; }
  .ps-section-head h2 { font-size: 28px; margin: 0 0 6px; letter-spacing: -0.01em; text-transform: uppercase; }
  .ps-section-head p { font-family: 'Inter', sans-serif; font-size: 15px; color: var(--ink-soft); margin: 0; max-width: 620px; }

  /* FIXTURES */
  .ps-fixtures { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
  .ps-fixture {
    background: rgba(255,253,244,0.6); border: 1.5px solid var(--ink);
    padding: 18px 18px 20px; position: relative;
    transition: background 200ms, border-color 200ms;
    outline: none;
  }
  .ps-fixture:focus-visible { box-shadow: 0 0 0 2px var(--copper); }
  .ps-fixture-on { background: rgba(179,106,61,0.08); border-color: var(--copper); }
  .ps-fixture-tag { font-size: 10px; letter-spacing: 0.18em; color: var(--copper); margin-bottom: 8px; font-weight: 700; }
  .ps-fixture h3 { font-size: 14px; margin: 0 0 12px; letter-spacing: 0; line-height: 1.3; }
  .ps-fixture dl { display: grid; gap: 8px; margin: 0; }
  .ps-fixture dl div { display: grid; grid-template-columns: 56px 1fr; gap: 10px; }
  .ps-fixture dt { font-size: 9px; letter-spacing: 0.16em; color: var(--ink-soft); padding-top: 1px; }
  .ps-fixture dd { margin: 0; font-size: 12px; line-height: 1.45; }
  .ps-fixture-vein {
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: var(--copper);
    transform: scaleX(0); transform-origin: left center;
    transition: transform 280ms ease;
  }
  .ps-fixture-on .ps-fixture-vein { transform: scaleX(1); }

  /* CODE */
  .ps-code-grid { display: grid; gap: 18px; }
  .ps-code-row { display: grid; grid-template-columns: 140px 1fr; gap: 24px; padding: 18px 0; border-top: 1px dashed rgba(27,27,27,0.25); }
  .ps-code-row:first-child { border-top-width: 1.5px; border-top-style: solid; border-top-color: var(--ink); }
  .ps-code-sec { font-size: 12px; letter-spacing: 0.14em; color: var(--copper); font-variant: small-caps; font-weight: 700; }
  .ps-code-body h3 { font-size: 16px; margin: 0 0 6px; letter-spacing: 0; }
  .ps-code-quote { font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.55; color: var(--ink); margin: 0 0 8px; font-style: italic; }
  .ps-code-note { font-family: 'Inter', sans-serif; font-size: 13px; line-height: 1.5; color: var(--ink-soft); margin: 0; }
  .ps-code-note span { font-family: 'JetBrains Mono', monospace; color: var(--copper); font-weight: 700; letter-spacing: 0.1em; }

  /* SERVICE FLOORS */
  .ps-floors { display: grid; gap: 24px; }
  .ps-floor { display: grid; grid-template-columns: 140px 1fr; gap: 24px; padding-top: 16px; border-top: 1.5px solid var(--ink); }
  .ps-floor-label { font-size: 14px; font-weight: 700; letter-spacing: 0.16em; color: var(--copper); padding-top: 4px; }
  .ps-floor-runs { display: grid; gap: 12px; }
  .ps-run {
    display: grid; grid-template-columns: 1.4fr 1fr 1.6fr; gap: 18px; padding: 12px 0;
    border-bottom: 1px dashed rgba(27,27,27,0.2);
    align-items: start;
  }
  .ps-run-fix { font-size: 13px; font-weight: 500; }
  .ps-run-branch { font-size: 11px; letter-spacing: 0.14em; color: var(--copper); }
  .ps-run-note { font-family: 'Inter', sans-serif; font-size: 13px; line-height: 1.5; color: var(--ink-soft); }

  /* CTA BAND */
  .ps-cta-band {
    padding: 56px 56px 64px;
    background: var(--ink); color: var(--pvc);
    border-top: 1.5px solid var(--ink);
  }
  .ps-cta-band-inner { display: grid; grid-template-columns: 1fr auto; gap: 32px; align-items: end; }
  .ps-cta-band-eyebrow { font-size: 11px; letter-spacing: 0.22em; color: var(--brass); margin-bottom: 16px; }
  .ps-cta-band h3 { font-size: clamp(28px, 3.4vw, 40px); margin: 0 0 12px; letter-spacing: -0.01em; text-transform: uppercase; }
  .ps-cta-band p { font-family: 'Inter', sans-serif; font-size: 16px; color: rgba(236,234,226,0.78); margin: 0; max-width: 540px; line-height: 1.55; }
  .ps-cta-band .ps-cta-primary { background: var(--brass); color: var(--ink); border-color: var(--brass); }
  .ps-cta-band .ps-cta-primary:hover, .ps-cta-band .ps-cta-primary:focus-visible { background: #E5C97A; border-color: #E5C97A; }

  /* FOOTER */
  .ps-footer { padding: 40px 56px 28px; background: var(--pvc-deep); border-top: 1.5px solid var(--ink); }
  .ps-footer-cols { display: grid; grid-template-columns: 1.2fr 1.2fr 1fr; gap: 28px; padding-bottom: 22px; align-items: start; }
  .ps-footer-mark { font-size: 18px; font-weight: 700; letter-spacing: 0.06em; }
  .ps-footer-tag { font-size: 11px; letter-spacing: 0.18em; color: var(--copper); margin-top: 4px; }
  .ps-footer-stamp { display: grid; gap: 4px; padding: 12px 16px; border: 1.5px solid var(--copper); color: var(--copper); width: max-content; transform: rotate(-1deg); }
  .ps-footer-stamp-name { font-size: 11px; letter-spacing: 0.18em; font-weight: 700; }
  .ps-footer-stamp-num { font-size: 18px; font-weight: 800; }
  .ps-footer-stamp-state { font-family: 'Inter', sans-serif; font-size: 11px; font-style: italic; }
  .ps-footer-dispatch { font-size: 12px; line-height: 1.6; }
  .ps-footer-dispatch > div:first-child { font-size: 10px; letter-spacing: 0.18em; color: var(--ink-soft); margin-bottom: 4px; }
  .ps-footer-num { font-size: 18px; font-weight: 700; letter-spacing: 0.04em; margin-bottom: 4px; }
  .ps-footer-line { height: 1px; background: var(--ink); opacity: 0.5; margin-bottom: 12px; }
  .ps-footer-tiny { font-family: 'Inter', sans-serif; font-size: 11px; color: var(--ink-soft); letter-spacing: 0.04em; line-height: 1.5; }

  @media (max-width: 1080px) {
    .ps-hero { grid-template-columns: 1fr; padding: 40px 24px 56px; }
    .ps-hero-stack { aspect-ratio: 4 / 5; max-height: 560px; }
    .ps-nav { padding: 18px 24px; flex-wrap: wrap; gap: 12px; }
    .ps-stack, .ps-code, .ps-service, .ps-cta-band, .ps-footer { padding-left: 24px; padding-right: 24px; }
    .ps-fixtures { grid-template-columns: repeat(2, 1fr); }
    .ps-code-row, .ps-floor { grid-template-columns: 1fr; gap: 12px; }
    .ps-run { grid-template-columns: 1fr; }
    .ps-cta-band-inner { grid-template-columns: 1fr; }
    .ps-footer-cols { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ps-fixture-vein, .ps-cta, .ps-call, .ps-fixture, .ps-nav nav a {
      transition: none !important;
    }
  }
`;
