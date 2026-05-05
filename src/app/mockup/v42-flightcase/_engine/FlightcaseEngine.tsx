"use client";

/**
 * FlightcaseEngine — V42 Flight Case
 *
 * Anvil-style ABS road case. Lid lifts on load to 110°. Butterfly latches
 * pop. Foam interior houses tools — hover slides each tool out 12px. The
 * "show up with what the job needs" thesis for service electricians.
 */

import { useEffect, useState } from "react";

const TOOLS = [
  {
    id: "FLK",
    name: "Fluke 87V",
    cat: "Diagnostics",
    blurb: "True-RMS multimeter for arc-fault hunts and motor-start currents.",
    shape: "meter",
  },
  {
    id: "KLN",
    name: "Klein 9-in-1",
    cat: "Hand tools",
    blurb: "Linesman pliers, side-cutter, hex set. The thing that solves 60% of calls.",
    shape: "pliers",
  },
  {
    id: "GRN",
    name: "Greenlee 555 bender",
    cat: "Conduit",
    blurb: "Stub-up, offset, saddle. Up to 1¼\" EMT and rigid in the same head.",
    shape: "bender",
  },
  {
    id: "HSL",
    name: "Heat-shrink labels",
    cat: "Identification",
    blurb: "Brady BMP21, black-on-white. Goes on every conductor we touch.",
    shape: "label",
  },
  {
    id: "AMP",
    name: "Fluke 376FC clamp",
    cat: "Load metering",
    blurb: "Inrush, harmonics, 1000A AC/DC. Pairs with the iFlex for tight panels.",
    shape: "clamp",
  },
  {
    id: "TRQ",
    name: "Wiha torque driver",
    cat: "Termination",
    blurb: "10–50 in-lb. Every lug torqued, every callback closed on the first pass.",
    shape: "driver",
  },
];

const VANS = [
  { id: "01", driver: "Sam Whelan", town: "South Boston", case: "Service-A", cb: "8:14 AM" },
  { id: "02", driver: "Pat Lavigne", town: "Cambridge", case: "EV-Hardwire", cb: "9:02 AM" },
  { id: "03", driver: "Diego Cuevas", town: "Quincy", case: "Service-B", cb: "8:48 AM" },
  { id: "04", driver: "Kelsey Boyd", town: "Medford", case: "Diagnostic", cb: "10:11 AM" },
];

export default function FlightcaseEngine() {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [latchOn, setLatchOn] = useState<{ a: boolean; b: boolean }>({ a: false, b: false });
  const [pricingUnlocked, setPricingUnlocked] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setOpen(true);
      return;
    }
    const t = setTimeout(() => setOpen(true), 380);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (latchOn.a && latchOn.b) setPricingUnlocked(true);
  }, [latchOn]);

  return (
    <>
      <style>{css}</style>
      <div className="fc-shell">
        <div className="fc-bg-grid" aria-hidden />

        {/* TOP */}
        <header className="fc-top">
          <div className="fc-mark">
            <span className="fc-mark-stencil">FLIGHTCASE</span>
            <span className="fc-mark-sub">SERVICE ELECTRIC · DISPATCH 24/7</span>
          </div>
          <nav className="fc-nav">
            <a href="#inventory">Inventory</a>
            <a href="#trucks">On-Truck</a>
            <a href="#latch">The Latch</a>
            <a href="#pricing">Pricing</a>
          </nav>
          <a className="fc-cta-mini" href="#latch">Open a case</a>
        </header>

        {/* HERO — opening case */}
        <section className="fc-hero">
          <div className="fc-hero-copy">
            <div className="fc-tag">
              <span className="fc-tag-bolts" aria-hidden>◉ ◉ ◉</span>
              <span>ROAD-READY · ANVIL-CASE GRADE</span>
            </div>
            <h1 className="fc-h1">
              Show up with what the job needs.
              <br />
              <span className="fc-h1-2">Pack it back the way you found it.</span>
            </h1>
            <p className="fc-sub">
              Service electricians — every truck stocked the same way, every callback
              closed on the first pass. The tools live in named pockets; the pockets
              live in named cases; the cases live in named vans.
            </p>
            <div className="fc-ctas">
              <button type="button" className="fc-cta primary">Open a case</button>
              <button type="button" className="fc-cta ghost">See what's inside</button>
            </div>
          </div>

          <div className={`fc-case ${open ? "open" : ""}`}>
            <div className="fc-case-stage">
              <div className="fc-case-shadow" aria-hidden />
              <div className="fc-case-body">
                <div className="fc-case-corner tl" aria-hidden />
                <div className="fc-case-corner tr" aria-hidden />
                <div className="fc-case-corner bl" aria-hidden />
                <div className="fc-case-corner br" aria-hidden />

                <div className="fc-case-foam">
                  <div className="fc-foam-pocket fc-pocket-meter" />
                  <div className="fc-foam-pocket fc-pocket-pliers" />
                  <div className="fc-foam-pocket fc-pocket-driver" />
                  <div className="fc-foam-pocket fc-pocket-clamp" />
                  <div className="fc-foam-stamp">FOAM-CUT FOR SERVICE-A</div>
                </div>

                <div className="fc-case-latches">
                  <button type="button"
                    className={`fc-latch ${latchOn.a ? "on" : ""}`}
                    onClick={() => setLatchOn((s) => ({ ...s, a: !s.a }))}
                    aria-label="Toggle left butterfly latch"
                  >
                    <span className="fc-latch-wing" />
                    <span className="fc-latch-pin" />
                  </button>
                  <button type="button"
                    className={`fc-latch ${latchOn.b ? "on" : ""}`}
                    onClick={() => setLatchOn((s) => ({ ...s, b: !s.b }))}
                    aria-label="Toggle right butterfly latch"
                  >
                    <span className="fc-latch-wing" />
                    <span className="fc-latch-pin" />
                  </button>
                </div>
              </div>

              <div className="fc-case-lid">
                <div className="fc-case-corner tl" aria-hidden />
                <div className="fc-case-corner tr" aria-hidden />
                <div className="fc-case-corner bl" aria-hidden />
                <div className="fc-case-corner br" aria-hidden />
                <div className="fc-lid-engrave">
                  <div className="fc-lid-engrave-1">FLIGHTCASE</div>
                  <div className="fc-lid-engrave-2">★ SERVICE ELECTRIC ★</div>
                  <div className="fc-lid-engrave-3">EST. 2014 · BOSTON</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INVENTORY */}
        <section id="inventory" className="fc-inv">
          <div className="fc-section-tag">
            <span className="fc-section-num">CASE / 01</span>
            <span className="fc-section-name">THE INVENTORY</span>
            <span className="fc-section-rule" aria-hidden />
          </div>
          <h2 className="fc-h2">Foam pockets, by service category.</h2>
          <p className="fc-inv-intro">
            Every Service-A van carries the same six tools in the same six pockets.
            Hover a cutout to slide it out.
          </p>

          <ul className="fc-inv-grid" role="list">
            {TOOLS.map((t) => (
              <li
                key={t.id}
                className={`fc-pocket ${hover === t.id ? "out" : ""}`}
                onMouseEnter={() => setHover(t.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(t.id)}
                onBlur={() => setHover(null)}
                tabIndex={0}
              >
                <div className="fc-pocket-shadow" aria-hidden>
                  <ToolShape shape={t.shape} />
                </div>
                <div className="fc-pocket-tool" aria-hidden>
                  <ToolShape shape={t.shape} />
                </div>
                <div className="fc-pocket-meta">
                  <div className="fc-pocket-id">{t.id}</div>
                  <div className="fc-pocket-name">{t.name}</div>
                  <div className="fc-pocket-cat">{t.cat}</div>
                  <p className="fc-pocket-blurb">{t.blurb}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ON-TRUCK */}
        <section id="trucks" className="fc-trucks">
          <div className="fc-section-tag">
            <span className="fc-section-num">CASE / 02</span>
            <span className="fc-section-name">ON-TRUCK</span>
            <span className="fc-section-rule" aria-hidden />
          </div>
          <h2 className="fc-h2">Which case ships on which van.</h2>

          <ul className="fc-trucks-grid" role="list">
            {VANS.map((v) => (
              <li key={v.id} className="fc-truck" tabIndex={0}>
                <div className="fc-truck-id">VAN-{v.id}</div>
                <div className="fc-truck-driver">{v.driver}</div>
                <div className="fc-truck-row"><span>TODAY</span><span className="fc-truck-val">{v.town}</span></div>
                <div className="fc-truck-row"><span>CASE</span><span className="fc-truck-val">{v.case}</span></div>
                <div className="fc-truck-row"><span>FIRST CB</span><span className="fc-truck-val">{v.cb}</span></div>
                <div className="fc-truck-route" aria-hidden>
                  <svg viewBox="0 0 200 24">
                    <path d="M 4 12 Q 50 4 100 16 T 196 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" />
                    <circle cx="4" cy="12" r="3" fill="currentColor" />
                    <circle cx="196" cy="12" r="3" fill="currentColor" />
                  </svg>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* THE LATCH — interaction */}
        <section id="latch" className="fc-latches-section">
          <div className="fc-section-tag">
            <span className="fc-section-num">CASE / 03</span>
            <span className="fc-section-name">THE LATCH</span>
            <span className="fc-section-rule" aria-hidden />
          </div>
          <h2 className="fc-h2">Two butterfly latches. One pricing card.</h2>
          <p className="fc-latch-intro">
            A flight case wants both latches popped before the lid lifts. Pop the
            latches at the top of the page (or here) to unlock pricing.
          </p>

          <div className="fc-latch-pair">
            <button type="button"
              className={`fc-latch big ${latchOn.a ? "on" : ""}`}
              onClick={() => setLatchOn((s) => ({ ...s, a: !s.a }))}
              aria-pressed={latchOn.a}
            >
              <span className="fc-latch-wing" />
              <span className="fc-latch-pin" />
              <span className="fc-latch-label">{latchOn.a ? "POPPED" : "LATCH 1"}</span>
            </button>
            <button type="button"
              className={`fc-latch big ${latchOn.b ? "on" : ""}`}
              onClick={() => setLatchOn((s) => ({ ...s, b: !s.b }))}
              aria-pressed={latchOn.b}
            >
              <span className="fc-latch-wing" />
              <span className="fc-latch-pin" />
              <span className="fc-latch-label">{latchOn.b ? "POPPED" : "LATCH 2"}</span>
            </button>
          </div>

          <div id="pricing" className={`fc-pricing ${pricingUnlocked ? "unlocked" : ""}`}>
            {pricingUnlocked ? (
              <div className="fc-pricing-card">
                <div className="fc-pricing-stamp">FLIGHTCASE / SERVICE RATES</div>
                <ul className="fc-pricing-list" role="list">
                  <li><span>Service call (M–F, 7a–5p)</span><b>$185 · 1st hr</b></li>
                  <li><span>After-hours dispatch</span><b>$285 · 1st hr</b></li>
                  <li><span>EV L2 hardwire (typ.)</span><b>$1,650</b></li>
                  <li><span>Panel swap, 200A (typ.)</span><b>$3,400</b></li>
                  <li><span>Diagnostic + report</span><b>$240 flat</b></li>
                </ul>
                <p className="fc-pricing-fine">Travel waived inside Rt-128. Permit fees billed at cost.</p>
              </div>
            ) : (
              <div className="fc-pricing-locked">
                <div className="fc-pricing-locked-icon" aria-hidden>⚿</div>
                <div className="fc-pricing-locked-text">
                  Pop both latches to open the pricing card.
                </div>
              </div>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="fc-foot">
          <div className="fc-foot-stencil" aria-hidden>FLIGHTCASE / SERVICE ELECTRIC / MA #E29481</div>
          <div className="fc-foot-row">
            <div>
              <div className="fc-foot-h">Dispatch</div>
              <div>(617) 555-0148</div>
              <div>24/7 · 7-day callback guarantee</div>
            </div>
            <div>
              <div className="fc-foot-h">Yard</div>
              <div>22 Drydock Ave, Boston MA</div>
              <div>4-bay shop · 14 vans</div>
            </div>
            <div>
              <div className="fc-foot-h">Cases shipped</div>
              <div>Service-A · Service-B</div>
              <div>EV-Hardwire · Diagnostic · Panel-Swap</div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function ToolShape({ shape }: { shape: string }) {
  switch (shape) {
    case "meter":
      return (
        <svg viewBox="0 0 80 80">
          <rect x="14" y="10" width="52" height="62" rx="4" fill="#3D2818" stroke="#161210" strokeWidth="1.5" />
          <rect x="20" y="18" width="40" height="22" fill="#A1C46B" stroke="#161210" />
          <text x="40" y="34" fontFamily="JetBrains Mono" fontSize="10" fill="#161210" textAnchor="middle" fontWeight="700">120.4</text>
          <circle cx="28" cy="56" r="4" fill="#1B1A1B" stroke="#A89D90" />
          <circle cx="40" cy="56" r="4" fill="#1B1A1B" stroke="#A89D90" />
          <circle cx="52" cy="56" r="4" fill="#1B1A1B" stroke="#A89D90" />
          <rect x="22" y="65" width="36" height="3" fill="#A89D90" />
        </svg>
      );
    case "pliers":
      return (
        <svg viewBox="0 0 80 80">
          <path d="M 30 8 L 30 42 L 36 48 L 36 72 L 28 72 L 28 50 L 22 44 L 22 8 Z" fill="#1B1B1B" stroke="#777" strokeWidth="1" />
          <path d="M 50 8 L 50 42 L 44 48 L 44 72 L 52 72 L 52 50 L 58 44 L 58 8 Z" fill="#1B1B1B" stroke="#777" strokeWidth="1" />
          <rect x="22" y="60" width="6" height="10" fill="#E0312D" />
          <rect x="52" y="60" width="6" height="10" fill="#E0312D" />
          <circle cx="40" cy="44" r="3" fill="#777" />
        </svg>
      );
    case "bender":
      return (
        <svg viewBox="0 0 80 80">
          <path d="M 14 20 L 60 20 Q 70 20 70 30 Q 70 40 60 40 L 30 40 L 30 70 L 22 70 L 22 30 Q 22 22 14 22 Z" fill="#FF7A1A" stroke="#1B1006" strokeWidth="1.5" />
          <rect x="14" y="20" width="20" height="6" fill="#1B1006" />
        </svg>
      );
    case "label":
      return (
        <svg viewBox="0 0 80 80">
          <rect x="10" y="22" width="60" height="36" rx="4" fill="#E8E5DD" stroke="#161210" strokeWidth="1" />
          <rect x="14" y="28" width="52" height="6" fill="#1B1B1B" />
          <rect x="14" y="38" width="40" height="3" fill="#777" />
          <rect x="14" y="44" width="48" height="3" fill="#777" />
          <rect x="14" y="50" width="36" height="3" fill="#777" />
        </svg>
      );
    case "clamp":
      return (
        <svg viewBox="0 0 80 80">
          <path d="M 40 10 Q 18 14 18 36 Q 18 50 28 50 L 28 56 L 22 56 L 22 60 L 58 60 L 58 56 L 52 56 L 52 50 Q 62 50 62 36 Q 62 14 40 10 Z" fill="#FFD23A" stroke="#1B1A0F" strokeWidth="1.5" />
          <rect x="22" y="60" width="36" height="14" rx="2" fill="#1B1A1B" />
          <rect x="26" y="64" width="28" height="4" fill="#A1C46B" />
        </svg>
      );
    case "driver":
      return (
        <svg viewBox="0 0 80 80">
          <rect x="34" y="6" width="12" height="40" rx="2" fill="#FF8A00" stroke="#1B1006" strokeWidth="1" />
          <rect x="36" y="46" width="8" height="22" fill="#A89D90" stroke="#161210" strokeWidth="1" />
          <rect x="34" y="68" width="12" height="6" fill="#161210" />
        </svg>
      );
    default:
      return null;
  }
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

  .fc-shell {
    --case: #18181B;
    --case-2: #232328;
    --foam: #2E2E2E;
    --foam-2: #1A1A1B;
    --chrome: #C7C9CC;
    --chrome-2: #8E9094;
    --bone: #E6E6E8;
    --hot: #E0312D;
    font-family: 'Inter', sans-serif;
    color: var(--bone);
    background: linear-gradient(180deg, #1F1F22 0%, var(--case) 60%, #0E0E11 100%);
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }
  .fc-bg-grid {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      repeating-linear-gradient(45deg, rgba(199,201,204,0.025) 0 1px, transparent 1px 14px),
      repeating-linear-gradient(-45deg, rgba(199,201,204,0.025) 0 1px, transparent 1px 14px);
  }
  .fc-shell > * { position: relative; z-index: 1; }

  .fc-top {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 48px;
    border-bottom: 1px solid rgba(199,201,204,0.18);
  }
  .fc-mark { display: flex; flex-direction: column; line-height: 1; }
  .fc-mark-stencil {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px; letter-spacing: 0.18em;
    color: var(--chrome);
    text-shadow: 0 1px 0 #000, 0 -1px 0 rgba(255,255,255,0.06);
  }
  .fc-mark-sub {
    margin-top: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; letter-spacing: 0.22em;
    color: var(--chrome-2);
  }
  .fc-nav { display: flex; gap: 22px; }
  .fc-nav a {
    color: var(--chrome-2); text-decoration: none;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px; letter-spacing: 0.16em;
    padding: 6px 0; border-bottom: 1px solid transparent;
    transition: color 180ms, border-color 180ms;
  }
  .fc-nav a:hover, .fc-nav a:focus-visible {
    color: var(--bone); border-bottom-color: var(--hot); outline: none;
  }
  .fc-cta-mini {
    color: var(--bone); text-decoration: none;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px; letter-spacing: 0.16em;
    padding: 8px 18px;
    background: var(--hot);
    border: 1px solid var(--hot);
    transition: background 180ms, transform 180ms;
  }
  .fc-cta-mini:hover, .fc-cta-mini:focus-visible {
    background: #FA433F; transform: translateY(-1px); outline: none;
  }

  .fc-hero {
    padding: 64px 48px 80px;
    display: grid;
    grid-template-columns: 1fr 1.05fr;
    gap: 48px;
    align-items: center;
    perspective: 1400px;
  }
  @media (max-width: 980px) { .fc-hero { grid-template-columns: 1fr; } }

  .fc-tag {
    display: inline-flex; align-items: center; gap: 10px;
    margin-bottom: 22px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 0.18em;
    color: var(--chrome-2);
  }
  .fc-tag-bolts { color: var(--chrome); letter-spacing: 0.4em; }

  .fc-h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(40px, 6vw, 88px);
    line-height: 0.95;
    letter-spacing: 0.005em;
    margin: 0 0 22px 0;
    color: var(--bone);
    text-shadow: 0 2px 12px rgba(0,0,0,0.6);
  }
  .fc-h1-2 { color: var(--chrome); display: inline; }

  .fc-sub {
    font-size: 16.5px; line-height: 1.55; color: #B7B7BC;
    max-width: 56ch; margin: 0 0 28px 0;
  }
  .fc-ctas { display: flex; gap: 14px; flex-wrap: wrap; }
  .fc-cta {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    letter-spacing: 0.16em;
    padding: 14px 24px;
    background: var(--case-2);
    color: var(--bone);
    border: 1.5px solid var(--chrome);
    cursor: pointer;
    transition: background 200ms, color 200ms, transform 200ms, box-shadow 200ms;
  }
  .fc-cta.primary { background: var(--hot); border-color: var(--hot); color: #1B0805; }
  .fc-cta.primary:hover, .fc-cta.primary:focus-visible {
    background: #FA433F; box-shadow: 0 0 24px rgba(224,49,45,0.5);
    transform: translateY(-1px); outline: none;
  }
  .fc-cta.ghost:hover, .fc-cta.ghost:focus-visible {
    background: var(--bone); color: var(--case); outline: none;
  }

  /* CASE — 3D opening */
  .fc-case {
    position: relative;
    perspective: 1400px;
    perspective-origin: 50% 80%;
  }
  .fc-case-stage {
    position: relative;
    width: 100%;
    aspect-ratio: 1.1 / 1;
    transform-style: preserve-3d;
  }
  .fc-case-shadow {
    position: absolute; left: 8%; right: 8%; bottom: -6%;
    height: 24px;
    background: radial-gradient(ellipse, rgba(0,0,0,0.6), transparent 70%);
    filter: blur(6px);
  }
  .fc-case-body {
    position: absolute; inset: 30% 0 0 0;
    background:
      linear-gradient(180deg, #1F1F22, #0E0E11),
      repeating-linear-gradient(90deg, rgba(199,201,204,0.02) 0 1px, transparent 1px 18px);
    border: 2px solid #07070A;
    box-shadow:
      inset 0 0 0 1px rgba(199,201,204,0.08),
      inset 0 8px 16px rgba(0,0,0,0.6),
      0 18px 30px rgba(0,0,0,0.5);
  }
  .fc-case-foam {
    position: absolute; inset: 14px;
    background:
      radial-gradient(circle at 50% 50%, #1F1F1F, #0F0F0F),
      repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0 1px, transparent 1px 4px);
    background-blend-mode: multiply;
  }
  .fc-foam-pocket {
    position: absolute;
    background: radial-gradient(ellipse at center, #050505, #1A1A1A 70%);
    box-shadow: inset 0 0 12px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(0,0,0,0.5);
    border-radius: 6px;
  }
  .fc-pocket-meter { left: 8%; top: 12%; width: 32%; height: 36%; }
  .fc-pocket-pliers { right: 8%; top: 10%; width: 22%; height: 56%; }
  .fc-pocket-driver { left: 10%; bottom: 14%; width: 20%; height: 32%; }
  .fc-pocket-clamp { left: 36%; bottom: 12%; width: 24%; height: 38%; }
  .fc-foam-stamp {
    position: absolute; bottom: 2%; right: 4%;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; letter-spacing: 0.22em;
    color: rgba(199,201,204,0.32);
  }

  .fc-case-corner {
    position: absolute;
    width: 28px; height: 28px;
    background: radial-gradient(circle at 30% 30%, #C7C9CC, #5A5C60);
    border: 1px solid #07070A;
    box-shadow: inset 0 1px 2px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.6);
  }
  .fc-case-corner.tl { top: -8px; left: -8px; border-radius: 4px 0 50% 0; }
  .fc-case-corner.tr { top: -8px; right: -8px; border-radius: 0 4px 0 50%; }
  .fc-case-corner.bl { bottom: -8px; left: -8px; border-radius: 0 50% 0 4px; }
  .fc-case-corner.br { bottom: -8px; right: -8px; border-radius: 50% 0 4px 0; }

  .fc-case-latches {
    position: absolute; left: 0; right: 0;
    top: -22px;
    display: flex; justify-content: space-around;
    pointer-events: auto;
  }
  .fc-latch {
    position: relative;
    width: 56px; height: 36px;
    background: linear-gradient(180deg, #DDDFE2, #8E9094);
    border: 1px solid #07070A;
    border-radius: 3px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.5);
    cursor: pointer;
    overflow: hidden;
    transition: background 200ms, transform 200ms;
  }
  .fc-latch:hover, .fc-latch:focus-visible {
    background: linear-gradient(180deg, #F0F2F4, #A8AAAE);
    outline: none;
  }
  .fc-latch-wing {
    position: absolute; left: 50%; top: 50%;
    transform: translate(-50%, -50%) rotate(0deg);
    width: 36px; height: 14px;
    background: linear-gradient(180deg, #5A5C60, #2A2C30);
    border: 1px solid #07070A;
    border-radius: 2px;
    transition: transform 250ms ease-out;
  }
  .fc-latch-pin {
    position: absolute; left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    width: 5px; height: 5px;
    background: #07070A;
    border-radius: 50%;
    z-index: 2;
  }
  .fc-latch.on .fc-latch-wing {
    transform: translate(-50%, -50%) rotate(60deg);
  }
  .fc-latch.on {
    background: linear-gradient(180deg, #FFD2D0, #B5302C);
  }

  .fc-case-lid {
    position: absolute; left: 0; right: 0; top: 0; height: 30%;
    background: linear-gradient(180deg, #232328 0%, #18181B 100%);
    border: 2px solid #07070A;
    box-shadow: inset 0 0 0 1px rgba(199,201,204,0.1), 0 -8px 18px rgba(0,0,0,0.6);
    transform-origin: 0 100%;
    transform: rotate(0deg);
    transition: transform 1100ms cubic-bezier(.2, .8, .25, 1.05);
  }
  .fc-case.open .fc-case-lid {
    transform: perspective(900px) rotateX(-110deg);
  }
  .fc-lid-engrave {
    position: absolute; inset: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center;
    color: var(--chrome-2);
    transform: rotate(180deg);
    backface-visibility: hidden;
  }
  .fc-lid-engrave-1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 30px; letter-spacing: 0.3em;
    color: var(--chrome);
    text-shadow: 0 1px 0 #000, 0 -1px 0 rgba(255,255,255,0.06);
  }
  .fc-lid-engrave-2 {
    margin-top: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; letter-spacing: 0.32em;
    color: var(--chrome-2);
  }
  .fc-lid-engrave-3 {
    margin-top: 2px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; letter-spacing: 0.22em;
    color: var(--chrome-2);
  }

  /* SECTIONS */
  .fc-section-tag {
    display: flex; align-items: center; gap: 16px;
    padding: 0 48px;
    margin-bottom: 18px;
  }
  .fc-section-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 0.22em;
    color: var(--hot);
    padding: 4px 10px;
    border: 1px solid var(--hot);
  }
  .fc-section-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px; letter-spacing: 0.2em;
    color: var(--chrome);
  }
  .fc-section-rule { flex: 1; height: 1px; background: linear-gradient(90deg, var(--chrome-2), transparent); }

  .fc-h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(28px, 3.6vw, 50px);
    letter-spacing: 0.02em;
    line-height: 1.05;
    color: var(--bone);
    padding: 0 48px;
    margin: 0 0 18px 0;
    max-width: 28ch;
  }

  .fc-inv { padding: 56px 0 80px; border-top: 1px solid rgba(199,201,204,0.10); }
  .fc-inv-intro {
    padding: 0 48px;
    font-size: 16px; line-height: 1.55; color: #B7B7BC;
    max-width: 60ch; margin: 0 0 32px 0;
  }
  .fc-inv-grid {
    list-style: none; padding: 0 48px; margin: 0;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 18px;
  }

  .fc-pocket {
    position: relative;
    background:
      radial-gradient(ellipse at 50% 50%, #161616, #0B0B0B),
      repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.018) 0 1px, transparent 1px 4px);
    background-blend-mode: multiply;
    border: 1px solid rgba(199,201,204,0.12);
    box-shadow: inset 0 0 18px rgba(0,0,0,0.9);
    padding: 18px 18px 16px;
    cursor: default;
    overflow: hidden;
    transition: border-color 220ms, box-shadow 220ms;
  }
  .fc-pocket:hover, .fc-pocket:focus-visible {
    border-color: var(--hot);
    box-shadow: inset 0 0 18px rgba(0,0,0,0.9), 0 0 22px rgba(224,49,45,0.18);
    outline: none;
  }
  .fc-pocket-shadow,
  .fc-pocket-tool {
    width: 100%;
    aspect-ratio: 1.6/1;
    margin-bottom: 12px;
    position: relative;
    transition: transform 280ms cubic-bezier(.2,.8,.25,1);
  }
  .fc-pocket-shadow { opacity: 0.35; filter: brightness(0.3) blur(0.5px); }
  .fc-pocket-shadow svg { width: 100%; height: 100%; }
  .fc-pocket-tool {
    position: absolute;
    top: 18px; left: 18px; right: 18px;
    aspect-ratio: 1.6/1;
    transform: translateY(0);
    filter: drop-shadow(0 6px 6px rgba(0,0,0,0.7));
  }
  .fc-pocket-tool svg { width: 100%; height: 100%; }
  .fc-pocket.out .fc-pocket-tool { transform: translateY(-12px); }
  .fc-pocket-id {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; letter-spacing: 0.22em;
    color: var(--hot);
  }
  .fc-pocket-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px; letter-spacing: 0.06em;
    color: var(--bone);
  }
  .fc-pocket-cat {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; letter-spacing: 0.18em;
    color: var(--chrome-2);
    margin-bottom: 8px;
  }
  .fc-pocket-blurb {
    font-size: 13px; line-height: 1.55;
    color: #B7B7BC; margin: 0;
  }

  .fc-trucks { padding: 56px 0 80px; border-top: 1px solid rgba(199,201,204,0.10); }
  .fc-trucks-grid {
    list-style: none; padding: 0 48px; margin: 0;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 14px;
  }
  .fc-truck {
    padding: 18px 20px 18px;
    background: linear-gradient(180deg, var(--case-2), #131318);
    border: 1px solid rgba(199,201,204,0.12);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
    cursor: default;
    transition: border-color 220ms, transform 220ms;
  }
  .fc-truck:hover, .fc-truck:focus-visible {
    border-color: var(--chrome); transform: translateY(-2px); outline: none;
  }
  .fc-truck-id {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 0.22em;
    color: var(--hot);
  }
  .fc-truck-driver {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px; letter-spacing: 0.06em;
    color: var(--bone);
    margin-bottom: 10px;
  }
  .fc-truck-row {
    display: flex; justify-content: space-between;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 0.16em;
    color: var(--chrome-2);
    padding: 4px 0;
    border-bottom: 1px dashed rgba(199,201,204,0.10);
  }
  .fc-truck-val { color: var(--bone); }
  .fc-truck-route {
    color: var(--chrome-2);
    margin-top: 12px;
    height: 24px;
    transition: color 220ms;
  }
  .fc-truck:hover .fc-truck-route, .fc-truck:focus-visible .fc-truck-route { color: var(--hot); }
  .fc-truck-route svg { width: 100%; height: 100%; }

  .fc-latches-section { padding: 56px 0 80px; border-top: 1px solid rgba(199,201,204,0.10); }
  .fc-latch-intro {
    padding: 0 48px;
    font-size: 16px; line-height: 1.55; color: #B7B7BC;
    max-width: 60ch; margin: 0 0 28px 0;
  }
  .fc-latch-pair {
    display: flex; gap: 24px; justify-content: center;
    padding: 24px 48px;
  }
  .fc-latch.big {
    width: 140px; height: 84px;
  }
  .fc-latch.big .fc-latch-wing { width: 86px; height: 30px; }
  .fc-latch-label {
    position: absolute;
    bottom: 4px; left: 0; right: 0;
    text-align: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; letter-spacing: 0.22em;
    color: #07070A;
    z-index: 3;
  }

  .fc-pricing {
    margin: 28px 48px 0;
    border: 1px solid rgba(199,201,204,0.18);
    background: rgba(11,11,13,0.7);
    transition: border-color 320ms, box-shadow 320ms;
    min-height: 220px;
    display: flex; align-items: center; justify-content: center;
    padding: 32px;
  }
  .fc-pricing.unlocked {
    border-color: var(--hot);
    box-shadow: 0 0 30px rgba(224,49,45,0.22);
  }
  .fc-pricing-locked {
    text-align: center; color: var(--chrome-2);
  }
  .fc-pricing-locked-icon {
    font-size: 48px; color: var(--chrome); line-height: 1;
    margin-bottom: 10px;
  }
  .fc-pricing-locked-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px; letter-spacing: 0.18em;
  }
  .fc-pricing-card {
    width: 100%;
    max-width: 720px;
  }
  .fc-pricing-stamp {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 0.22em;
    color: var(--hot);
    border: 1px solid var(--hot);
    padding: 4px 10px;
    display: inline-block;
    margin-bottom: 16px;
  }
  .fc-pricing-list {
    list-style: none; padding: 0; margin: 0 0 12px 0;
  }
  .fc-pricing-list li {
    display: flex; justify-content: space-between;
    padding: 10px 4px;
    border-bottom: 1px dashed rgba(199,201,204,0.18);
    font-size: 14.5px;
    color: #C8C8CB;
  }
  .fc-pricing-list b {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px; letter-spacing: 0.06em;
    color: var(--bone);
  }
  .fc-pricing-fine {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 0.10em;
    color: var(--chrome-2);
    margin: 0;
  }

  .fc-foot {
    padding: 36px 48px 32px;
    border-top: 2px solid rgba(199,201,204,0.18);
    background: linear-gradient(180deg, transparent, rgba(0,0,0,0.5));
  }
  .fc-foot-stencil {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px; letter-spacing: 0.32em;
    color: var(--chrome-2);
    margin-bottom: 18px;
    text-align: center;
  }
  .fc-foot-row {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
    font-size: 13px; line-height: 1.55; color: #B7B7BC;
  }
  @media (max-width: 720px) { .fc-foot-row { grid-template-columns: 1fr; } }
  .fc-foot-h {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px; letter-spacing: 0.16em;
    color: var(--bone); margin-bottom: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    .fc-case-lid, .fc-pocket-tool, .fc-latch-wing, .fc-pricing,
    .fc-cta, .fc-pocket, .fc-truck, .fc-nav a {
      transition: none !important;
    }
  }
`;
