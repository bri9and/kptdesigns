"use client";

/**
 * TraderTarpEngine — V50 Trader Tarp
 *
 * Yellow corrugated polypropylene with stenciled black text — borrowed from
 * the "FRESH OIL — DO NOT DRIVE" temporary jobsite sign — reset as a TYPE
 * SYSTEM. Headings live on corrugated panels with vertical scan-line ridges.
 * Trade: Paving (sealcoat / crack-fill / small-job).
 *
 * Cliché-trap notes followed: no curving-road-line logo, no "smooth as
 * glass" puns, no steamroller mascot. Sign is structural, not decorative.
 */

import { useState } from "react";

const TODAY = [
  { id: "ELM-1408", line1: "ELM ST · 1408", line2: "SEALCOAT 4,200 SF", state: "CURING" },
  { id: "RIVER-22", line1: "RIVERSIDE · 22", line2: "CRACK-FILL 320 LF", state: "DONE" },
  { id: "MEADOW-7", line1: "MEADOW LN · 07", line2: "PATCH 6 SF + SEAL", state: "CURING" },
  { id: "OAK-310", line1: "OAK CT · 310", line2: "STRIPE RE-PAINT", state: "QUEUED" },
  { id: "PINE-44", line1: "PINE BLVD · 44", line2: "MILL-AND-FILL 600 SF", state: "QUEUED" },
];

const CURE = [
  { time: "0:00", note: "Crew off the lot. Tape down. Cones in." },
  { time: "0:30", note: "Surface skin sets. No foot traffic yet." },
  { time: "2:00", note: "Walk-able for residents. Bag the can off the curb." },
  { time: "4:00", note: "Bicycles, strollers OK." },
  { time: "8:00", note: "Tires. Move the car back on slow." },
  { time: "24:00", note: "Heavy. Trash truck, delivery box. Park anywhere." },
];

const CRACK = [
  {
    label: "ROUTE & SEAL",
    width: "≥ 1/4\"",
    method: "Diamond-blade router, hot-pour rubberized sealant, squeegee finish.",
    life: "5–7 yrs",
  },
  {
    label: "OVERBAND",
    width: "1/8\" – 1/4\"",
    method: "Hot-pour banded across crack with 4\" tape strike. Fast, jobsite-true.",
    life: "3–5 yrs",
  },
  {
    label: "CLEAN & FILL",
    width: "≤ 1/8\"",
    method: "Compressed-air clean, cold-pour for hairline mapping. Surface-only.",
    life: "1–2 yrs",
  },
];

export default function TraderTarpEngine() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      <style>{css}</style>
      <div className="tt-shell">

        {/* HERO SIGN */}
        <section className="tt-hero">
          <div className="tt-hero-sign tt-corrugated" data-tilt={hovered === "HERO" ? "1" : "0"}>
            <Zip pos="tl" />
            <Zip pos="tr" />
            <Zip pos="bl" />
            <Zip pos="br" />
            <span className="tt-hero-eyebrow">CAUTION · TEMPORARY · KPT PAVING CO.</span>
            <h1 className="tt-hero-line tt-stencil">FRESH OIL.</h1>
            <h1 className="tt-hero-line tt-stencil">CURING THROUGH</h1>
            <h1 className="tt-hero-line tt-stencil">SUNDOWN.</h1>
            <p className="tt-hero-sub">
              Sealcoating · crack-fill · small-job paving. The temporary signs
              are ours; the permanent driveways too.
            </p>
            <div className="tt-cta-row">
              <button className="tt-cta tt-cta-fill" type="button">
                QUOTE A SEALCOAT
              </button>
              <button className="tt-cta tt-cta-ghost" type="button">
                READ THE CURE SCHEDULE
              </button>
            </div>
          </div>

          <aside className="tt-hero-aside">
            <div className="tt-tag tt-corrugated tt-tag-small">
              <span className="tt-tag-no">SIGN 04</span>
              <span className="tt-tag-line tt-stencil">DO NOT</span>
              <span className="tt-tag-line tt-stencil">DRIVE</span>
            </div>
            <div className="tt-tag tt-corrugated tt-tag-small">
              <span className="tt-tag-no">SIGN 11</span>
              <span className="tt-tag-line tt-stencil">CONES</span>
              <span className="tt-tag-line tt-stencil">UP 24H</span>
            </div>
          </aside>
        </section>

        {/* TODAY'S SIGNS */}
        <section className="tt-section">
          <h2 className="tt-h2 tt-stencil">TODAY'S SIGNS</h2>
          <p className="tt-section-sub">
            Each is a job. Hover the sign for state, scope, address. The yard is
            a list of jobs we wouldn't fake.
          </p>
          <ul className="tt-yard">
            {TODAY.map((s) => (
              <li
                key={s.id}
                className={`tt-yard-sign tt-corrugated ${hovered === s.id ? "is-hovered" : ""}`}
                onMouseEnter={() => setHovered(s.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(s.id)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
                aria-label={`Job ${s.id}, ${s.line1}, ${s.line2}, ${s.state}`}
              >
                <Zip pos="tl" />
                <Zip pos="tr" />
                <Zip pos="bl" />
                <Zip pos="br" />
                <span className={`tt-yard-state tt-yard-state-${s.state.toLowerCase()}`}>{s.state}</span>
                <span className="tt-yard-line tt-stencil">{s.line1}</span>
                <span className="tt-yard-line tt-stencil tt-yard-line-sm">{s.line2}</span>
                <span className="tt-yard-id">JOB {s.id}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CURE TIMES */}
        <section className="tt-section">
          <h2 className="tt-h2 tt-stencil">CURE SCHEDULE</h2>
          <p className="tt-section-sub">
            Cure clock starts when the crew lifts off. Walk before you drive.
            Drive before you park heavy. No exceptions on day one.
          </p>
          <ol className="tt-cure">
            {CURE.map((c) => (
              <li key={c.time} className="tt-cure-row" tabIndex={0}>
                <span className="tt-cure-time tt-stencil">+{c.time}</span>
                <span className="tt-cure-bar" aria-hidden />
                <span className="tt-cure-note">{c.note}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* CRACK-FILL */}
        <section className="tt-section">
          <h2 className="tt-h2 tt-stencil">CRACK-FILL · METHODS</h2>
          <p className="tt-section-sub">
            Three ways, picked by crack width on the day. Hover for what each
            buys you in life-of-pavement.
          </p>
          <div className="tt-crack-grid">
            {CRACK.map((m) => (
              <article
                key={m.label}
                className="tt-crack tt-corrugated"
                tabIndex={0}
              >
                <Zip pos="tl" />
                <Zip pos="tr" />
                <Zip pos="bl" />
                <Zip pos="br" />
                <span className="tt-crack-label tt-stencil">{m.label}</span>
                <div className="tt-crack-illus" aria-hidden>
                  {m.label === "ROUTE & SEAL" && <CrackRoute />}
                  {m.label === "OVERBAND" && <CrackOverband />}
                  {m.label === "CLEAN & FILL" && <CrackClean />}
                </div>
                <dl className="tt-crack-dl">
                  <div><dt>WIDTH</dt><dd>{m.width}</dd></div>
                  <div><dt>LIFE</dt><dd>{m.life}</dd></div>
                </dl>
                <p className="tt-crack-method">{m.method}</p>
              </article>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="tt-foot tt-corrugated">
          <Zip pos="tl" /><Zip pos="tr" /><Zip pos="bl" /><Zip pos="br" />
          <div className="tt-foot-grid">
            <div>
              <span className="tt-foot-label">CO.</span>
              <span className="tt-foot-value tt-stencil">KPT PAVING</span>
            </div>
            <div>
              <span className="tt-foot-label">CERT.</span>
              <span className="tt-foot-value">NAPA · CFA</span>
            </div>
            <div>
              <span className="tt-foot-label">DOT MC</span>
              <span className="tt-foot-value">MC-770118</span>
            </div>
            <div>
              <span className="tt-foot-label">DISPATCH</span>
              <span className="tt-foot-value tt-stencil">315.555.0188</span>
            </div>
            <div>
              <span className="tt-foot-label">FRESH OIL</span>
              <span className="tt-foot-value">DO NOT DRIVE 24H</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function Zip({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  return <span aria-hidden className={`tt-zip tt-zip-${pos}`} />;
}
function CrackRoute() {
  return (
    <svg viewBox="0 0 200 60" width="100%" height="60">
      <rect x="0" y="0" width="200" height="60" fill="#1F1B12" />
      <path d="M0 30 L40 28 L52 36 L70 22 L96 32 L120 26 L150 38 L180 28 L200 32" stroke="#F2C400" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M0 30 L40 28 L52 36 L70 22 L96 32 L120 26 L150 38 L180 28 L200 32" stroke="#1F1B12" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
function CrackOverband() {
  return (
    <svg viewBox="0 0 200 60" width="100%" height="60">
      <rect x="0" y="0" width="200" height="60" fill="#1F1B12" />
      <rect x="0" y="22" width="200" height="16" fill="#F2C400" />
      <path d="M0 30 L40 28 L52 31 L70 26 L96 32 L120 28 L150 33 L180 29 L200 31" stroke="#1F1B12" strokeWidth="2" fill="none" />
    </svg>
  );
}
function CrackClean() {
  return (
    <svg viewBox="0 0 200 60" width="100%" height="60">
      <rect x="0" y="0" width="200" height="60" fill="#1F1B12" />
      <g stroke="#F2C400" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d="M10 30 L40 28 L48 32" />
        <path d="M60 22 L80 26 L92 24" />
        <path d="M100 36 L130 34 L140 38" />
        <path d="M150 28 L172 30 L190 27" />
      </g>
    </svg>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Stardos+Stencil:wght@400;700&family=IBM+Plex+Sans:wght@400;500;700&display=swap');

  .tt-shell {
    --coro: #F2C400;
    --coro-shadow: #B59000;
    --stencil: #100F0D;
    --tar: #3D2D1E;
    --night: #1A1916;
    --hot: #E04A1C;
    font-family: 'IBM Plex Sans', system-ui, sans-serif;
    background:
      radial-gradient(circle at 30% 0%, #25231D 0%, var(--night) 60%);
    color: var(--coro);
    min-height: 100vh;
    padding: 28px 24px 64px 24px;
    box-sizing: border-box;
  }

  .tt-stencil {
    font-family: 'Stardos Stencil', 'Courier New', monospace;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  /* CORRUGATED — vertical scan-line ridges on yellow ground */
  .tt-corrugated {
    background:
      repeating-linear-gradient(
        90deg,
        var(--coro) 0 12px,
        rgba(0,0,0,0.06) 12px 12.6px,
        var(--coro) 12.6px 14px,
        rgba(0,0,0,0.18) 14px 14.6px,
        var(--coro) 14.6px 16px,
        rgba(0,0,0,0.06) 16px 16.6px
      );
    color: var(--stencil);
    position: relative;
    box-shadow:
      inset 0 0 0 2px rgba(16,15,13,0.85),
      inset 0 0 60px rgba(0,0,0,0.08),
      0 6px 0 var(--coro-shadow),
      0 12px 26px rgba(0,0,0,0.4);
  }

  /* zip-tie corners */
  .tt-zip {
    position: absolute;
    width: 22px; height: 22px;
    background: #2A2925;
    border: 2px solid var(--stencil);
    box-shadow: inset 1px 1px 2px rgba(255,255,255,0.18), inset -1px -1px 2px rgba(0,0,0,0.4);
    border-radius: 4px;
    z-index: 2;
  }
  .tt-zip::after {
    content: "";
    position: absolute; inset: 6px;
    border: 1px solid #5A554C;
    border-radius: 1px;
  }
  .tt-zip-tl { top: 8px; left: 8px; }
  .tt-zip-tr { top: 8px; right: 8px; }
  .tt-zip-bl { bottom: 8px; left: 8px; }
  .tt-zip-br { bottom: 8px; right: 8px; }

  /* HERO */
  .tt-hero {
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(0, 1fr);
    gap: 20px;
    margin-bottom: 36px;
  }
  .tt-hero-sign {
    padding: 56px 56px 44px 56px;
    transform-origin: 50% 50%;
    transition: transform 220ms ease-out;
  }
  .tt-hero-sign[data-tilt="1"] { transform: rotate(0.6deg); }
  @media (prefers-reduced-motion: reduce) {
    .tt-hero-sign { transition: none; }
  }
  .tt-hero-eyebrow {
    display: block;
    font-size: 11px; letter-spacing: 0.28em;
    color: var(--stencil);
    border-top: 2px solid var(--stencil);
    border-bottom: 2px solid var(--stencil);
    padding: 6px 0;
    margin-bottom: 24px;
    font-weight: 700;
  }
  .tt-hero-line {
    display: block;
    margin: 0;
    color: var(--stencil);
    font-size: clamp(46px, 9vw, 132px);
    line-height: 0.92;
    letter-spacing: 0.01em;
  }
  .tt-hero-line:nth-child(4) { color: var(--hot); }
  .tt-hero-sub {
    margin: 28px 0 24px 0;
    font-size: 16px;
    line-height: 1.5;
    color: var(--stencil);
    max-width: 60ch;
    border-top: 2px dashed rgba(16,15,13,0.4);
    padding-top: 18px;
  }
  .tt-cta-row { display: flex; gap: 14px; flex-wrap: wrap; }
  .tt-cta {
    font: inherit;
    font-family: 'Stardos Stencil', monospace;
    font-size: 14px;
    letter-spacing: 0.16em;
    padding: 14px 22px;
    border: 3px solid var(--stencil);
    cursor: pointer;
    transition: transform 120ms, background 120ms, color 120ms;
  }
  .tt-cta-fill { background: var(--stencil); color: var(--coro); }
  .tt-cta-ghost { background: transparent; color: var(--stencil); }
  .tt-cta:hover, .tt-cta:focus-visible {
    background: var(--hot);
    color: var(--coro);
    border-color: var(--stencil);
    transform: translateY(-2px);
    outline: none;
  }
  .tt-cta-fill:hover, .tt-cta-fill:focus-visible { background: var(--hot); color: #fff; }

  .tt-hero-aside {
    display: flex; flex-direction: column; gap: 18px; justify-content: center;
  }
  .tt-tag {
    padding: 28px 22px 22px 22px;
    display: flex; flex-direction: column; gap: 6px; align-items: center;
    transform: rotate(-1.4deg);
    transition: transform 200ms;
  }
  .tt-tag:hover { transform: rotate(0deg) scale(1.02); }
  .tt-tag:nth-child(2) { transform: rotate(2deg); }
  .tt-tag:nth-child(2):hover { transform: rotate(0deg) scale(1.02); }
  .tt-tag-no {
    font-size: 10px; letter-spacing: 0.24em; color: rgba(16,15,13,0.6);
    margin-bottom: 4px;
  }
  .tt-tag-line { font-size: 28px; line-height: 1; color: var(--stencil); }

  /* SECTION */
  .tt-section { margin-bottom: 56px; }
  .tt-h2 {
    font-size: clamp(28px, 4vw, 56px);
    margin: 0 0 4px 0;
    color: var(--coro);
    line-height: 1;
    text-shadow: 2px 2px 0 var(--stencil);
  }
  .tt-section-sub {
    font-size: 14px;
    max-width: 64ch;
    color: rgba(242,196,0,0.78);
    margin: 8px 0 24px 0;
    line-height: 1.55;
    border-left: 3px solid var(--coro);
    padding-left: 14px;
  }

  /* YARD */
  .tt-yard {
    list-style: none; margin: 0; padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 18px;
  }
  .tt-yard-sign {
    padding: 36px 18px 18px 18px;
    display: flex; flex-direction: column; align-items: center;
    cursor: pointer;
    transition: transform 220ms;
    transform: rotate(-1deg);
    aspect-ratio: 1.4 / 1;
    justify-content: center;
    gap: 4px;
  }
  .tt-yard-sign:nth-child(2n) { transform: rotate(1deg); }
  .tt-yard-sign:nth-child(3n) { transform: rotate(-2deg); }
  .tt-yard-sign:hover, .tt-yard-sign.is-hovered, .tt-yard-sign:focus-visible {
    transform: rotate(0deg) scale(1.03);
    outline: none;
    box-shadow:
      inset 0 0 0 2px var(--stencil),
      inset 0 0 60px rgba(0,0,0,0.1),
      0 8px 0 var(--coro-shadow),
      0 14px 30px rgba(0,0,0,0.45);
  }
  @media (prefers-reduced-motion: reduce) {
    .tt-yard-sign { transition: none; }
    .tt-yard-sign:hover, .tt-yard-sign.is-hovered { transform: rotate(0deg); }
  }
  .tt-yard-state {
    position: absolute; top: 36px; right: 36px;
    font-family: 'Stardos Stencil', monospace;
    font-size: 10px; letter-spacing: 0.2em;
    padding: 3px 6px;
    border: 2px solid var(--stencil);
    background: var(--stencil); color: var(--coro);
  }
  .tt-yard-state-curing { background: var(--hot); color: var(--coro); }
  .tt-yard-state-done { background: var(--coro); color: var(--stencil); }
  .tt-yard-state-queued { background: var(--stencil); color: var(--coro); }
  .tt-yard-line { font-size: 28px; line-height: 1; color: var(--stencil); }
  .tt-yard-line-sm { font-size: 14px; opacity: 0.78; margin-top: 4px; }
  .tt-yard-id {
    margin-top: 8px;
    font-size: 10px; letter-spacing: 0.2em; color: rgba(16,15,13,0.6);
  }

  /* CURE */
  .tt-cure { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
  .tt-cure-row {
    display: grid;
    grid-template-columns: 96px 100px 1fr;
    gap: 18px; align-items: center;
    padding: 14px 16px;
    border-left: 4px solid var(--coro);
    background: rgba(242,196,0,0.06);
    color: var(--coro);
    cursor: pointer;
    transition: background 120ms, padding 120ms;
  }
  .tt-cure-row:hover, .tt-cure-row:focus-visible {
    background: rgba(242,196,0,0.16);
    padding-left: 22px;
    border-left-color: var(--hot);
    outline: none;
  }
  .tt-cure-time { font-size: 22px; color: var(--coro); }
  .tt-cure-bar {
    height: 8px;
    background: linear-gradient(90deg, var(--hot), var(--coro));
    border: 1px solid var(--coro);
  }
  .tt-cure-note { font-size: 14px; opacity: 0.86; }
  .tt-cure-row:nth-child(1) .tt-cure-bar { background: linear-gradient(90deg, var(--hot) 0%, var(--hot) 95%, var(--coro) 100%); }
  .tt-cure-row:nth-child(2) .tt-cure-bar { background: linear-gradient(90deg, var(--hot) 0%, var(--hot) 75%, var(--coro) 100%); }
  .tt-cure-row:nth-child(3) .tt-cure-bar { background: linear-gradient(90deg, var(--hot) 0%, var(--hot) 50%, var(--coro) 100%); }
  .tt-cure-row:nth-child(4) .tt-cure-bar { background: linear-gradient(90deg, var(--hot) 0%, var(--hot) 30%, var(--coro) 100%); }
  .tt-cure-row:nth-child(5) .tt-cure-bar { background: linear-gradient(90deg, var(--hot) 0%, var(--hot) 12%, var(--coro) 100%); }
  .tt-cure-row:nth-child(6) .tt-cure-bar { background: var(--coro); }

  /* CRACK */
  .tt-crack-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }
  .tt-crack {
    padding: 36px 22px 22px 22px;
    display: flex; flex-direction: column; gap: 14px;
    cursor: pointer;
    transition: transform 200ms;
  }
  .tt-crack:hover, .tt-crack:focus-visible {
    transform: translateY(-4px);
    outline: none;
  }
  .tt-crack-label { font-size: 22px; color: var(--stencil); letter-spacing: 0.04em; }
  .tt-crack-illus { border: 2px solid var(--stencil); }
  .tt-crack-dl {
    display: flex; gap: 18px; margin: 0;
    border-top: 2px solid var(--stencil); border-bottom: 2px solid var(--stencil);
    padding: 8px 0;
  }
  .tt-crack-dl div { display: flex; flex-direction: column; }
  .tt-crack-dl dt { font-size: 9px; letter-spacing: 0.22em; color: rgba(16,15,13,0.6); }
  .tt-crack-dl dd { margin: 0; font-family: 'Stardos Stencil', monospace; font-size: 18px; color: var(--stencil); }
  .tt-crack-method { font-size: 13px; line-height: 1.45; margin: 0; color: var(--stencil); }

  /* FOOTER */
  .tt-foot {
    padding: 36px 28px 28px 28px;
    margin-top: 24px;
  }
  .tt-foot-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 18px;
  }
  .tt-foot-grid > div { display: flex; flex-direction: column; gap: 4px; padding-right: 10px; border-right: 1px dashed rgba(16,15,13,0.4); }
  .tt-foot-grid > div:last-child { border-right: none; }
  .tt-foot-label {
    font-size: 9px; letter-spacing: 0.24em; color: rgba(16,15,13,0.6);
    text-transform: uppercase;
  }
  .tt-foot-value { color: var(--stencil); font-size: 16px; font-weight: 700; }

  @media (max-width: 900px) {
    .tt-hero { grid-template-columns: 1fr; }
    .tt-yard { grid-template-columns: repeat(2, 1fr); }
    .tt-crack-grid { grid-template-columns: 1fr; }
    .tt-foot-grid { grid-template-columns: repeat(2, 1fr); }
    .tt-cure-row { grid-template-columns: 70px 60px 1fr; gap: 10px; }
  }
`;
