"use client";

/**
 * LightboardEngine — V40 Lightboard
 *
 * Backlit acrylic schematic. Copper traces glow cyan, components ARE
 * sections (resistors, caps, breakers). Hero current path lights up first.
 * Hover on a component pulses voltage along its connected traces.
 */

import { useEffect, useRef, useState } from "react";

const SUB_CIRCUITS = [
  {
    id: "RES",
    label: "Residential",
    amps: "200A",
    desc: "Service upgrades, panel swaps, kitchen and bath rough-ins. Whole-home AFCI to NEC 2023.",
    bullets: ["Panel & meter base", "AFCI/GFCI throughout", "Whole-home surge"],
  },
  {
    id: "COM",
    label: "Commercial",
    amps: "800A",
    desc: "Tenant fit-outs, retail and light industrial. Pull boxes, conduit runs, transformer landings.",
    bullets: ["Tenant fit-outs", "Conduit + pull-boxes", "Step-down transformer"],
  },
  {
    id: "EVC",
    label: "EV Charging",
    amps: "60A",
    desc: "Hardwired 48A Level 2, 80A Wallbox, and DC fast-charge feasibility for small fleets.",
    bullets: ["L2 hardwire (48A)", "Load calc + derate", "WiFi commissioning"],
  },
  {
    id: "PNL",
    label: "Panel Work",
    amps: "100–400A",
    desc: "Replacements for FPE, Zinsco, and Challenger panels. Code-mark every breaker, label every circuit.",
    bullets: ["FPE/Zinsco swap", "Directory in draftsman caps", "Torque-wrenched lugs"],
  },
];

const INSPECTIONS = [
  { date: "2026-04-21", town: "Cambridge", scope: "200A service + sub", result: "PASS", inspector: "JMC" },
  { date: "2026-04-18", town: "Brookline", scope: "EV L2 hardwire", result: "PASS", inspector: "RDP" },
  { date: "2026-04-14", town: "Somerville", scope: "FPE → Eaton 200A", result: "PASS", inspector: "AML" },
  { date: "2026-04-09", town: "Quincy", scope: "Tenant fit-out, 60A 3ø", result: "PASS", inspector: "TKW" },
  { date: "2026-04-04", town: "Newton", scope: "AFCI retrofit, 1928 K&T", result: "PASS", inspector: "JMC" },
];

export default function LightboardEngine() {
  const [hot, setHot] = useState<string | null>(null);
  const [reduce, setReduce] = useState(false);
  const tracesRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(m.matches);
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="lb-shell">
        <div className="lb-acrylic" aria-hidden />
        <div className="lb-grid" aria-hidden />

        {/* TOP — labeled component wordmark */}
        <header className="lb-top">
          <div className="lb-mark">
            <svg viewBox="0 0 230 36" className="lb-mark-svg" aria-hidden>
              <rect x="2" y="6" width="60" height="22" rx="3" fill="none" stroke="#5DE3F0" strokeWidth="1.5" />
              <text x="32" y="22" fontFamily="JetBrains Mono, monospace" fontSize="13" fill="#5DE3F0" textAnchor="middle" fontWeight="700">U1</text>
              <line x1="62" y1="17" x2="78" y2="17" stroke="#5DE3F0" strokeWidth="1.5" />
              <text x="84" y="22" fontFamily="JetBrains Mono, monospace" fontSize="13" fill="#E6F5F8" fontWeight="700">LIGHTBOARD</text>
              <text x="84" y="33" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#80B6BC" letterSpacing="2">ELECTRIC · MA #E29481</text>
            </svg>
          </div>
          <nav className="lb-nav" aria-label="Primary">
            <a href="#schematic">Schematic</a>
            <a href="#circuits">Sub-circuits</a>
            <a href="#inspections">Inspections</a>
            <a href="#bid">Bid</a>
          </nav>
          <a className="lb-cta-mini" href="#bid">⚡ Energize bid</a>
        </header>

        {/* HERO + Schematic */}
        <section id="schematic" className="lb-hero">
          <div className="lb-hero-copy">
            <div className="lb-tag">
              <span className="lb-tag-dot" />
              <span>LIVE · 120/240 SERVICE · NEC 2023</span>
            </div>
            <h1 className="lb-h1">
              Service upgrades. <span className="lb-h1-2">Pull boxes.</span>
              <br />
              <span className="lb-h1-3">AFCI/GFCI to code,</span>
              <br />
              <span className="lb-h1-4">ampacity calculated, not guessed.</span>
            </h1>
            <p className="lb-sub">
              Commercial and residential electric — panel work, EV charging, and the
              schematic to back every change. We hand the inspector a drawing, not a
              promise.
            </p>
            <div className="lb-ctas">
              <button type="button" className="lb-cta primary">⚡ Energize the bid</button>
              <button type="button" className="lb-cta ghost">Open the schematic</button>
            </div>
            <div className="lb-meter" role="status" aria-label="Live load">
              <div className="lb-meter-row">
                <span className="lb-meter-lbl">VOLTAGE</span>
                <span className="lb-meter-val">240V</span>
                <span className="lb-meter-bar"><span className="lb-meter-fill" style={{ width: "92%" }} /></span>
              </div>
              <div className="lb-meter-row">
                <span className="lb-meter-lbl">DRAW</span>
                <span className="lb-meter-val">156A / 200A</span>
                <span className="lb-meter-bar"><span className="lb-meter-fill warn" style={{ width: "78%" }} /></span>
              </div>
              <div className="lb-meter-row">
                <span className="lb-meter-lbl">TORQUE</span>
                <span className="lb-meter-val">35 in-lb</span>
                <span className="lb-meter-bar"><span className="lb-meter-fill" style={{ width: "62%" }} /></span>
              </div>
            </div>
          </div>

          <div className="lb-board" aria-hidden>
            <svg ref={tracesRef} viewBox="0 0 480 540" className="lb-svg">
              {/* Power rails */}
              <rect x="20" y="20" width="440" height="12" fill="#1B2C30" stroke="#5DE3F0" strokeWidth="0.5" />
              <text x="28" y="29" fontFamily="JetBrains Mono" fontSize="8" fill="#5DE3F0">L1 · 120V</text>
              <rect x="20" y="508" width="440" height="12" fill="#1B2C30" stroke="#80B6BC" strokeWidth="0.5" />
              <text x="28" y="517" fontFamily="JetBrains Mono" fontSize="8" fill="#80B6BC">N · 0V</text>

              {/* Hero current path — animated */}
              <path
                className="lb-trace lb-trace-hero"
                d="M 60 32 L 60 110 L 200 110 L 200 200 L 360 200 L 360 290 L 220 290 L 220 380 L 60 380 L 60 508"
                fill="none"
                stroke="#5DE3F0"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Resistor (Service) */}
              <g
                className={`lb-comp ${hot === "RES" ? "lb-comp-hot" : ""}`}
                onMouseEnter={() => setHot("RES")}
                onMouseLeave={() => setHot(null)}
              >
                <rect x="40" y="100" width="40" height="18" fill="#0F1A1D" stroke="#5DE3F0" strokeWidth="1.2" />
                <path d="M 44 109 L 50 105 L 56 113 L 62 105 L 68 113 L 74 105 L 80 109" fill="none" stroke="#5DE3F0" strokeWidth="1" />
                <text x="60" y="93" fontFamily="JetBrains Mono" fontSize="8" fill="#5DE3F0" textAnchor="middle">R1 · SERVICE</text>
                <text x="60" y="130" fontFamily="JetBrains Mono" fontSize="7" fill="#80B6BC" textAnchor="middle">200Ω</text>
              </g>

              {/* Capacitor (Surge) */}
              <g
                className={`lb-comp ${hot === "SRG" ? "lb-comp-hot" : ""}`}
                onMouseEnter={() => setHot("SRG")}
                onMouseLeave={() => setHot(null)}
              >
                <line x1="195" y1="190" x2="195" y2="220" stroke="#5DE3F0" strokeWidth="1.5" />
                <line x1="205" y1="190" x2="205" y2="220" stroke="#5DE3F0" strokeWidth="1.5" />
                <text x="200" y="184" fontFamily="JetBrains Mono" fontSize="8" fill="#5DE3F0" textAnchor="middle">C1 · SURGE</text>
                <text x="200" y="234" fontFamily="JetBrains Mono" fontSize="7" fill="#80B6BC" textAnchor="middle">40kA</text>
              </g>

              {/* Breaker (Branch) */}
              <g
                className={`lb-comp ${hot === "BRK" ? "lb-comp-hot" : ""}`}
                onMouseEnter={() => setHot("BRK")}
                onMouseLeave={() => setHot(null)}
              >
                <rect x="340" y="180" width="40" height="40" fill="#0F1A1D" stroke="#5DE3F0" strokeWidth="1.2" />
                <line x1="350" y1="200" x2="370" y2="190" stroke="#5DE3F0" strokeWidth="1.4" />
                <circle cx="350" cy="200" r="2" fill="#5DE3F0" />
                <circle cx="370" cy="190" r="2" fill="#5DE3F0" />
                <text x="360" y="173" fontFamily="JetBrains Mono" fontSize="8" fill="#5DE3F0" textAnchor="middle">CB1 · 20A</text>
                <text x="360" y="234" fontFamily="JetBrains Mono" fontSize="7" fill="#80B6BC" textAnchor="middle">AFCI</text>
              </g>

              {/* GFCI outlet (Load) */}
              <g
                className={`lb-comp ${hot === "GFC" ? "lb-comp-hot" : ""}`}
                onMouseEnter={() => setHot("GFC")}
                onMouseLeave={() => setHot(null)}
              >
                <rect x="200" y="280" width="40" height="20" fill="#0F1A1D" stroke="#5DE3F0" strokeWidth="1.2" rx="3" />
                <circle cx="210" cy="290" r="1.6" fill="#5DE3F0" />
                <circle cx="220" cy="290" r="1.6" fill="#5DE3F0" />
                <rect x="226" y="285" width="8" height="10" fill="#E0312D" />
                <text x="220" y="274" fontFamily="JetBrains Mono" fontSize="8" fill="#5DE3F0" textAnchor="middle">GFCI · TRIP @ 5mA</text>
              </g>

              {/* Ground node */}
              <g
                className={`lb-comp ${hot === "GND" ? "lb-comp-hot" : ""}`}
                onMouseEnter={() => setHot("GND")}
                onMouseLeave={() => setHot(null)}
              >
                <circle cx="60" cy="380" r="6" fill="#5DE3F0" />
                <line x1="50" y1="392" x2="70" y2="392" stroke="#5DE3F0" strokeWidth="1.5" />
                <line x1="53" y1="396" x2="67" y2="396" stroke="#5DE3F0" strokeWidth="1.5" />
                <line x1="56" y1="400" x2="64" y2="400" stroke="#5DE3F0" strokeWidth="1.5" />
                <text x="78" y="384" fontFamily="JetBrains Mono" fontSize="8" fill="#5DE3F0">GND · &lt; 5Ω</text>
              </g>

              {/* Edge labels */}
              <text x="460" y="38" fontFamily="JetBrains Mono" fontSize="7" fill="#80B6BC" textAnchor="end">SHEET 1 / 4</text>
              <text x="460" y="528" fontFamily="JetBrains Mono" fontSize="7" fill="#80B6BC" textAnchor="end">REV C · 2026-04-21</text>
            </svg>
            <div className="lb-board-overlay" aria-hidden />
          </div>
        </section>

        {/* SUB-CIRCUITS */}
        <section id="circuits" className="lb-circuits">
          <div className="lb-section-head">
            <span className="lb-section-id">// SHEET 2</span>
            <h2 className="lb-h2">Sub-circuits we energize.</h2>
            <span className="lb-section-rule" aria-hidden />
          </div>
          <ul className="lb-circ-grid" role="list">
            {SUB_CIRCUITS.map((c) => (
              <li
                key={c.id}
                className={`lb-circ ${hot === c.id ? "hot" : ""}`}
                onMouseEnter={() => setHot(c.id)}
                onMouseLeave={() => setHot(null)}
                onFocus={() => setHot(c.id)}
                onBlur={() => setHot(null)}
                tabIndex={0}
              >
                <div className="lb-circ-id">
                  <span>{c.id}</span>
                  <span className="lb-circ-amps">{c.amps}</span>
                </div>
                <div className="lb-circ-label">{c.label}</div>
                <p className="lb-circ-desc">{c.desc}</p>
                <ul className="lb-circ-bullets" role="list">
                  {c.bullets.map((b) => (
                    <li key={b}><span className="lb-bullet-dot" />{b}</li>
                  ))}
                </ul>
                <div className="lb-circ-trace" aria-hidden>
                  <svg viewBox="0 0 200 8">
                    <line x1="0" y1="4" x2="200" y2="4" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="0" y1="4" x2="200" y2="4" stroke="#5DE3F0" strokeWidth="1.5" className="lb-trace-pulse" />
                  </svg>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* INSPECTION PASS */}
        <section id="inspections" className="lb-inspect">
          <div className="lb-section-head">
            <span className="lb-section-id">// SHEET 3</span>
            <h2 className="lb-h2">Inspection pass log.</h2>
            <span className="lb-section-rule" aria-hidden />
          </div>
          <div className="lb-table-wrap">
            <table className="lb-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Town</th>
                  <th>Scope</th>
                  <th>Result</th>
                  <th>Inspector</th>
                </tr>
              </thead>
              <tbody>
                {INSPECTIONS.map((r) => (
                  <tr key={r.date} tabIndex={0}>
                    <td>{r.date}</td>
                    <td>{r.town}</td>
                    <td>{r.scope}</td>
                    <td><span className="lb-pass">● {r.result}</span></td>
                    <td>{r.inspector}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* BID */}
        <section id="bid" className="lb-bid">
          <div className="lb-bid-card">
            <div className="lb-bid-tag">
              <span className="lb-tag-dot" />
              <span>READY · BID INPUT</span>
            </div>
            <h2 className="lb-bid-h">Closer to a number, faster.</h2>
            <p className="lb-bid-sub">
              Send a panel photo, a square-foot count, and a list of what you want
              powered. We'll have a load-calc, scope, and price back in 48 hours.
            </p>
            <div className="lb-ctas">
              <button type="button" className="lb-cta primary">⚡ Energize the bid</button>
              <button type="button" className="lb-cta ghost">Schedule a walk</button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="lb-foot">
          <div className="lb-foot-row">
            <div className="lb-foot-col">
              <div className="lb-foot-h">// LICENSE</div>
              <div>MA Master Electrician #E29481</div>
              <div>NH MEE 16442 · RI A009-1</div>
            </div>
            <div className="lb-foot-col">
              <div className="lb-foot-h">// CONTACT</div>
              <div>dispatch@lightboard.test</div>
              <div>(617) 555-0210 · 24/7</div>
            </div>
            <div className="lb-foot-col">
              <div className="lb-foot-h">// PLEDGE</div>
              <div>NEC 2023 throughout. Every job pulled, inspected, and recorded.</div>
            </div>
          </div>
          <div className="lb-foot-trace" aria-hidden>
            <svg viewBox="0 0 1200 8">
              <line x1="0" y1="4" x2="1200" y2="4" stroke="#5DE3F0" strokeWidth="1.5" strokeDasharray="2 6" />
            </svg>
          </div>
          <div className="lb-foot-stamp">
            ⚡ LIGHTBOARD ELECTRIC · MA #E29481 · MMXVII–MMXXVI
          </div>
        </footer>
      </div>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap');

  .lb-shell {
    --bg: #0A0F12;
    --bg-2: #0F171B;
    --acrylic: #102025;
    --cyan: #5DE3F0;
    --cyan-dim: #2C7C84;
    --hot: #E0312D;
    --bone: #E6F5F8;
    --ink: #80B6BC;
    font-family: 'JetBrains Mono', monospace;
    color: var(--bone);
    background: radial-gradient(ellipse at 80% 0%, #0E1A20 0%, var(--bg) 60%);
    position: relative;
    overflow: hidden;
    min-height: 100vh;
  }
  .lb-acrylic {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(circle at 75% 25%, rgba(93,227,240,0.08), transparent 50%),
      radial-gradient(circle at 25% 80%, rgba(93,227,240,0.06), transparent 55%);
  }
  .lb-grid {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(93,227,240,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(93,227,240,0.06) 1px, transparent 1px);
    background-size: 32px 32px;
    mask-image: radial-gradient(ellipse at 50% 30%, black 0%, transparent 80%);
  }
  .lb-shell > * { position: relative; z-index: 1; }

  .lb-top {
    display: flex; align-items: center; justify-content: space-between;
    padding: 22px 48px;
    border-bottom: 1px solid rgba(93,227,240,0.18);
  }
  .lb-mark { display: flex; align-items: center; }
  .lb-mark-svg { width: 230px; height: 36px; }
  .lb-nav { display: flex; gap: 24px; }
  .lb-nav a {
    color: var(--ink); text-decoration: none;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
    padding: 6px 0; border-bottom: 1px solid transparent;
    transition: color 180ms, border-color 180ms;
  }
  .lb-nav a:hover, .lb-nav a:focus-visible {
    color: var(--cyan); border-bottom-color: var(--cyan); outline: none;
  }
  .lb-cta-mini {
    color: var(--cyan); text-decoration: none;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; letter-spacing: 0.10em; text-transform: uppercase;
    padding: 8px 16px;
    border: 1px solid var(--cyan);
    transition: background 180ms, color 180ms, box-shadow 200ms;
  }
  .lb-cta-mini:hover, .lb-cta-mini:focus-visible {
    background: var(--cyan); color: var(--bg);
    box-shadow: 0 0 18px rgba(93,227,240,0.5);
    outline: none;
  }

  .lb-hero {
    padding: 72px 48px 80px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 56px;
    align-items: center;
  }
  @media (max-width: 980px) {
    .lb-hero { grid-template-columns: 1fr; }
  }
  .lb-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 0.18em; color: var(--cyan);
    border: 1px solid var(--cyan-dim);
    padding: 6px 12px;
    margin-bottom: 22px;
  }
  .lb-tag-dot {
    width: 8px; height: 8px; background: var(--cyan); border-radius: 50%;
    box-shadow: 0 0 8px var(--cyan);
    animation: lb-blink 1.6s ease-in-out infinite;
  }
  @keyframes lb-blink {
    0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--cyan); }
    50% { opacity: 0.5; box-shadow: 0 0 0 var(--cyan); }
  }
  .lb-h1 {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    font-size: clamp(28px, 3.4vw, 50px);
    line-height: 1.08;
    letter-spacing: -0.005em;
    margin: 0 0 24px 0;
    color: var(--bone);
  }
  .lb-h1-2 { color: var(--cyan); }
  .lb-h1-3 { color: var(--bone); }
  .lb-h1-4 { color: var(--ink); font-weight: 500; }
  .lb-sub {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    line-height: 1.55;
    color: #B7CFD3;
    max-width: 56ch;
    margin: 0 0 28px 0;
  }
  .lb-ctas { display: flex; gap: 14px; flex-wrap: wrap; }

  .lb-cta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 14px 22px;
    background: transparent;
    color: var(--cyan);
    border: 1px solid var(--cyan);
    cursor: pointer;
    transition: background 200ms, color 200ms, box-shadow 220ms, transform 200ms;
  }
  .lb-cta.primary { background: var(--cyan); color: var(--bg); }
  .lb-cta.primary:hover, .lb-cta.primary:focus-visible {
    background: #B5F1F7; box-shadow: 0 0 24px rgba(93,227,240,0.55);
    transform: translateY(-1px);
    outline: none;
  }
  .lb-cta.ghost:hover, .lb-cta.ghost:focus-visible {
    background: rgba(93,227,240,0.08); box-shadow: 0 0 16px rgba(93,227,240,0.3);
    outline: none;
  }

  .lb-meter {
    margin-top: 36px;
    border: 1px solid rgba(93,227,240,0.22);
    background: rgba(15,23,27,0.7);
    padding: 14px 16px;
  }
  .lb-meter-row {
    display: grid; grid-template-columns: 84px 110px 1fr;
    gap: 12px; align-items: center;
    padding: 6px 0;
    font-family: 'JetBrains Mono', monospace; font-size: 11px;
  }
  .lb-meter-lbl { color: var(--ink); letter-spacing: 0.16em; }
  .lb-meter-val { color: var(--bone); }
  .lb-meter-bar {
    display: block; height: 6px; background: rgba(93,227,240,0.10);
    border: 1px solid rgba(93,227,240,0.20);
    overflow: hidden;
    position: relative;
  }
  .lb-meter-fill {
    display: block; height: 100%; background: var(--cyan);
    box-shadow: 0 0 8px rgba(93,227,240,0.5);
  }
  .lb-meter-fill.warn { background: var(--hot); box-shadow: 0 0 8px rgba(224,49,45,0.5); }

  .lb-board {
    position: relative;
    background: linear-gradient(160deg, var(--acrylic), #0A1518);
    border: 1px solid rgba(93,227,240,0.22);
    box-shadow:
      inset 0 0 60px rgba(93,227,240,0.08),
      0 0 60px rgba(0,0,0,0.6);
    aspect-ratio: 480/540;
  }
  .lb-svg { width: 100%; height: 100%; display: block; }
  .lb-board-overlay {
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.4) 100%);
  }

  .lb-trace {
    stroke-dasharray: 1200;
    stroke-dashoffset: 1200;
    animation: lb-trace-draw 2.4s ease-out 0.4s forwards;
    filter: drop-shadow(0 0 4px rgba(93,227,240,0.6));
  }
  @keyframes lb-trace-draw {
    to { stroke-dashoffset: 0; }
  }
  .lb-trace-hero {
    animation: lb-trace-draw 2.4s ease-out 0.4s forwards, lb-pulse 3s ease-in-out 3.2s infinite;
  }
  @keyframes lb-pulse {
    0%, 100% { filter: drop-shadow(0 0 4px rgba(93,227,240,0.6)); }
    50% { filter: drop-shadow(0 0 14px rgba(93,227,240,0.9)); }
  }

  .lb-comp { cursor: pointer; transition: filter 220ms; }
  .lb-comp:hover, .lb-comp.lb-comp-hot {
    filter: drop-shadow(0 0 8px rgba(93,227,240,0.85));
  }

  .lb-section-head {
    display: flex; align-items: baseline; gap: 18px;
    padding: 0 48px;
    margin-bottom: 32px;
  }
  .lb-section-id {
    font-family: 'JetBrains Mono', monospace;
    color: var(--cyan); font-size: 12px; letter-spacing: 0.18em;
  }
  .lb-section-rule {
    flex: 1; height: 1px;
    background: linear-gradient(90deg, var(--cyan-dim), transparent);
  }
  .lb-h2 {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    font-size: clamp(22px, 2.4vw, 34px);
    line-height: 1.15;
    color: var(--bone);
    margin: 0;
  }

  .lb-circuits { padding: 48px 0 80px; }
  .lb-circ-grid {
    list-style: none; padding: 0 48px; margin: 0;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
  }
  .lb-circ {
    position: relative;
    padding: 22px 22px 24px;
    background: linear-gradient(180deg, rgba(15,23,27,0.85), rgba(10,15,18,0.85));
    border: 1px solid rgba(93,227,240,0.22);
    color: var(--ink);
    cursor: default;
    overflow: hidden;
    transition: border-color 220ms, transform 220ms, box-shadow 220ms;
  }
  .lb-circ:hover, .lb-circ:focus-visible, .lb-circ.hot {
    border-color: var(--cyan);
    transform: translateY(-2px);
    box-shadow: 0 0 24px rgba(93,227,240,0.25);
    outline: none;
  }
  .lb-circ-id {
    display: flex; align-items: center; justify-content: space-between;
    font-family: 'JetBrains Mono', monospace;
    color: var(--cyan); font-size: 12px; letter-spacing: 0.18em;
    margin-bottom: 8px;
  }
  .lb-circ-amps { color: var(--bone); }
  .lb-circ-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 22px; font-weight: 700; color: var(--bone);
    margin-bottom: 10px;
  }
  .lb-circ-desc {
    font-family: 'Inter', sans-serif;
    font-size: 14px; line-height: 1.55;
    color: #B7CFD3;
    margin: 0 0 12px 0;
  }
  .lb-circ-bullets {
    list-style: none; padding: 0; margin: 0 0 14px 0;
    font-family: 'JetBrains Mono', monospace; font-size: 11.5px;
    color: var(--ink);
  }
  .lb-circ-bullets li {
    padding: 3px 0; display: flex; align-items: center; gap: 8px;
  }
  .lb-bullet-dot {
    width: 6px; height: 6px; background: var(--cyan); border-radius: 50%;
    box-shadow: 0 0 6px rgba(93,227,240,0.5);
  }
  .lb-circ-trace {
    position: absolute; left: 0; right: 0; bottom: 0; height: 8px;
    color: rgba(93,227,240,0.2);
    overflow: hidden;
  }
  .lb-circ-trace svg { display: block; width: 100%; height: 100%; }
  .lb-trace-pulse {
    stroke-dasharray: 30 220;
    stroke-dashoffset: 0;
  }
  .lb-circ:hover .lb-trace-pulse, .lb-circ.hot .lb-trace-pulse {
    animation: lb-pulse-along 1.4s linear infinite;
  }
  @keyframes lb-pulse-along {
    from { stroke-dashoffset: 250; }
    to { stroke-dashoffset: 0; }
  }

  .lb-inspect { padding: 48px 0 80px; }
  .lb-table-wrap { padding: 0 48px; overflow-x: auto; }
  .lb-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
  }
  .lb-table th, .lb-table td {
    text-align: left;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(93,227,240,0.18);
  }
  .lb-table th {
    color: var(--cyan); font-weight: 500; letter-spacing: 0.10em;
    font-size: 11px; text-transform: uppercase;
    background: rgba(93,227,240,0.04);
  }
  .lb-table td { color: #C5DDE0; }
  .lb-table tbody tr {
    transition: background 200ms, color 200ms;
  }
  .lb-table tbody tr:hover, .lb-table tbody tr:focus-visible {
    background: rgba(93,227,240,0.06); outline: none;
  }
  .lb-pass {
    color: var(--cyan); letter-spacing: 0.10em;
    text-shadow: 0 0 8px rgba(93,227,240,0.4);
  }

  .lb-bid {
    padding: 56px 48px 80px;
    display: flex; justify-content: center;
  }
  .lb-bid-card {
    border: 1px solid rgba(93,227,240,0.30);
    background: linear-gradient(180deg, rgba(15,30,36,0.9), rgba(10,15,18,0.9));
    box-shadow: 0 0 60px rgba(93,227,240,0.12), inset 0 0 60px rgba(93,227,240,0.06);
    padding: 42px 48px;
    max-width: 760px;
    width: 100%;
    text-align: center;
  }
  .lb-bid-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 0.18em; color: var(--cyan);
    margin-bottom: 14px;
  }
  .lb-bid-h {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    font-size: clamp(26px, 3vw, 40px);
    line-height: 1.1;
    color: var(--bone);
    margin: 0 0 14px 0;
  }
  .lb-bid-sub {
    font-family: 'Inter', sans-serif;
    font-size: 16px; line-height: 1.55; color: #B7CFD3;
    max-width: 56ch; margin: 0 auto 24px;
  }
  .lb-bid .lb-ctas { justify-content: center; }

  .lb-foot {
    padding: 48px 48px 32px;
    border-top: 1px solid rgba(93,227,240,0.22);
    background: linear-gradient(180deg, transparent, rgba(0,0,0,0.4));
  }
  .lb-foot-row {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px; line-height: 1.55; color: #B7CFD3;
  }
  @media (max-width: 720px) { .lb-foot-row { grid-template-columns: 1fr; } }
  .lb-foot-h {
    color: var(--cyan); font-size: 11px; letter-spacing: 0.18em;
    margin-bottom: 6px;
  }
  .lb-foot-trace { margin-top: 28px; opacity: 0.5; }
  .lb-foot-stamp {
    margin-top: 12px;
    text-align: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 0.22em; color: var(--ink);
  }

  @media (prefers-reduced-motion: reduce) {
    .lb-trace, .lb-trace-hero, .lb-trace-pulse,
    .lb-tag-dot, .lb-cta, .lb-circ, .lb-comp, .lb-table tbody tr {
      animation: none !important;
      transition: none !important;
    }
    .lb-trace { stroke-dashoffset: 0; }
  }
`;
