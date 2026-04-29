"use client";

/**
 * BroadsheetEngine — V51 Broadsheet
 *
 * Tabloid-newsprint front page. 96pt cap-height banner, halftone-dot single-
 * color photos on pulp newsprint, classifieds in 6pt agate at the right rail,
 * register marks at the gutter. Working-class print register, agnostic with
 * a plumbing showcase.
 *
 * No Tailwind. Inline <style> only. Reduced-motion drops the dot-develop
 * animation and presents the full halftone instantly.
 */

import { useEffect, useState } from "react";

const STORIES = [
  {
    head: "RAINSTORM CLEARS MAIN AT 04:08",
    dek: "Service crew on Elm responds to a 3:14 a.m. backup. Cleanout cap pops, snake at 38 ft, water on the floor for nineteen minutes. Owner sleeps through it.",
    byline: "BY M. KARDOS · LATE EDITION",
    body: [
      "The call came in over the dispatch line at 03:14 — homeowner heard \"a noise\" in the basement and walked into water at the foot of the stairs. Two-inch standing in the laundry. The truck rolled at 03:21.",
      "Cleanout cap was buried under a stack of holiday boxes. We popped it at 03:42. Snake at 38 ft hit the line — wipes, the answer it always is, downstream of the kitchen group. Cleared at 04:08.",
      "Owner woke at 06:30 and never knew the difference. The bill said RAIN AT NIGHT, CLEARED BEFORE BREAKFAST.",
    ],
    rt: "RESPONSE TIME · 7 MIN",
  },
  {
    head: "STACK PRESSURE-TESTED, NO FAIL",
    dek: "Repipe job on Oak Court holds 80 psi for 15 minutes. Inspector signs off without writing a punch list.",
    byline: "BY M. KARDOS",
    body: [
      "Pressure test ran at 80 psi from 11:02 to 11:17. Gauge held. Inspector dropped by at 11:24, looked once, signed off.",
      "Tomorrow: drywall closes the wall. The trade behind the trade is the inspection that didn't punch.",
    ],
    rt: "INSPECTION · NO PUNCH",
  },
];

const CLASSIFIEDS = [
  { line: "SVC PLUMBING · 24 HR · LIC PB-04412 · (555) 014-0200" },
  { line: "REPIPE · WHOLE-HOUSE · COPPER-TO-PEX · FREE EST" },
  { line: "DRAIN CLEAR · CAMERA INSPECTION · $189 FLAT" },
  { line: "WATER HEATERS · TANK / TANKLESS · NEXT-DAY INSTALL" },
  { line: "SLAB LEAK DETECTION · ELECTRONIC + ACOUSTIC · 2 HR" },
  { line: "COMMERCIAL JOBS · BUSINESS HOURS RATE · NET 15" },
  { line: "AFTER-HOURS CALLOUT · $185/HR · 1 HR MIN · ALL DAY SUN" },
  { line: "BACKFLOW CERT · ANNUAL · DEQ-FILED · $145" },
  { line: "GAS LINE · BLACK IRON · CSST · LICENSED PB GAS" },
  { line: "FIXTURE TRIM · MOEN/KOHLER/DELTA · WARRANTIED" },
];

export default function BroadsheetEngine() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return (
    <div className="bs-root">
      <style>{css}</style>

      {/* register marks at the gutter */}
      <div className="bs-register bs-register-tl" aria-hidden>
        <Register />
      </div>
      <div className="bs-register bs-register-tr" aria-hidden>
        <Register />
      </div>

      <div className="bs-paper">
        {/* masthead */}
        <header className="bs-masthead">
          <div className="bs-masthead-row">
            <span>VOL. XII &middot; NO. 4</span>
            <span className="bs-masthead-title">THE KPT DAILY</span>
            <span>LATE EDITION &middot; 04 &middot; 28</span>
          </div>
          <div className="bs-masthead-rule" />
          <div className="bs-masthead-row bs-masthead-foot">
            <span>SERVICE PLUMBING &middot; CALLOUTS, CLEANOUTS, REPIPE</span>
            <span>PRINTED ON PULP &middot; 50 CENTS</span>
          </div>
        </header>

        {/* banner */}
        <h1 className="bs-banner">
          PIPE BURST &mdash; CALLS ANSWERED.
        </h1>
        <p className="bs-deck">
          Service plumbing, in print: callouts, cleanouts, and the 2 a.m. stack that didn&rsquo;t wait.
        </p>

        <div className="bs-cta-row">
          <a className="bs-btn bs-btn-primary" href="#frontpage">Read the late edition</a>
          <a className="bs-btn bs-btn-ghost" href="#classifieds">Place a callout</a>
        </div>

        {/* main grid: front page + classifieds rail */}
        <div className="bs-grid">
          <main className="bs-frontpage" id="frontpage">
            {/* halftone hero */}
            <figure className="bs-halftone">
              <Halftone reduced={reduced} />
              <figcaption>SNAKE-CABLE RUN, ELM STREET, 03:42 A.M. &mdash; PHOTO BY THE DESK</figcaption>
            </figure>

            <article className="bs-story bs-story-lead">
              <h2>{STORIES[0].head}</h2>
              <div className="bs-byline">{STORIES[0].byline}</div>
              <p className="bs-dek">{STORIES[0].dek}</p>
              <p className="bs-body">
                <span className="bs-dropcap">T</span>
                {STORIES[0].body[0].slice(1)}
              </p>
              {STORIES[0].body.slice(1).map((p, i) => (
                <p key={i} className="bs-body">{p}</p>
              ))}
              <div className="bs-rt">{STORIES[0].rt}</div>
            </article>

            <hr className="bs-hr" />

            <article className="bs-story">
              <h2>{STORIES[1].head}</h2>
              <div className="bs-byline">{STORIES[1].byline}</div>
              <p className="bs-dek">{STORIES[1].dek}</p>
              {STORIES[1].body.map((p, i) => (
                <p key={i} className="bs-body">{p}</p>
              ))}
              <div className="bs-rt">{STORIES[1].rt}</div>
            </article>

            <hr className="bs-hr" />

            {/* editorial cartoon */}
            <figure className="bs-cartoon">
              <Cartoon />
              <figcaption>&ldquo;The trap arm doesn&rsquo;t care what you call it.&rdquo; &mdash; EDITORIAL CARTOON, M.K.</figcaption>
            </figure>
          </main>

          {/* classifieds rail */}
          <aside id="classifieds" className="bs-classifieds">
            <div className="bs-class-head">CLASSIFIEDS</div>
            <ul>
              {CLASSIFIEDS.map((c, i) => (
                <li key={i}>{c.line}</li>
              ))}
            </ul>
            <div className="bs-class-foot">
              <div>RATE &middot; LINE/15c</div>
              <div>CALL DESK &middot; (555) 014-0200</div>
            </div>
          </aside>
        </div>

        <footer className="bs-foot">
          <div className="bs-foot-rule" />
          <div className="bs-foot-row">
            <span>THE KPT DAILY &middot; PRINTED IN-HOUSE</span>
            <span>MASTER PLUMBER LIC PB-04412</span>
            <span>UPC &sect;1101 &middot; DWV CHAPTER 7</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Register() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
      <circle cx="12" cy="12" r="6" fill="none" stroke="#0F0F0E" strokeWidth="0.8" />
      <line x1="12" y1="0" x2="12" y2="24" stroke="#0F0F0E" strokeWidth="0.8" />
      <line x1="0" y1="12" x2="24" y2="12" stroke="#0F0F0E" strokeWidth="0.8" />
    </svg>
  );
}

/** Halftone hero — single-color dot field that animates dot-by-dot */
function Halftone({ reduced }: { reduced: boolean }) {
  // Build a 24×16 grid of dots whose radius is driven by a faux-image function.
  const cols = 28;
  const rows = 18;
  const dots: { cx: number; cy: number; r: number; delay: number }[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const u = x / (cols - 1);
      const v = y / (rows - 1);
      // A wrench-like silhouette: dark center band, lighter at edges
      const cx = 0.5;
      const dx = u - cx;
      const dy = v - 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const horizontal = Math.abs(v - 0.55) < 0.15 ? 1 : 0;
      const tone = Math.max(0, 1 - dist * 1.6) * 0.7 + horizontal * 0.5;
      const r = Math.min(7, Math.max(0.5, tone * 7));
      const delay = (x + y) * 8;
      dots.push({ cx: u * 100, cy: v * 100, r, delay });
    }
  }
  return (
    <div className="bs-halftone-wrap">
      <svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice" className="bs-halftone-svg" aria-hidden>
        <rect width="100" height="60" fill="#E9E2D2" />
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.cx}
            cy={d.cy * 0.6}
            r={d.r * 0.18}
            fill="#0F0F0E"
            style={{
              animation: reduced ? "none" : `bs-dot 600ms ease ${d.delay}ms both`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function Cartoon() {
  return (
    <svg viewBox="0 0 320 200" width="100%" height="auto" aria-hidden>
      <rect width="320" height="200" fill="#E9E2D2" />
      {/* trap arm silhouette */}
      <path
        d="M 30 110 Q 30 60 80 60 L 200 60 Q 230 60 240 90 L 260 130 L 290 130"
        fill="none"
        stroke="#B12A28"
        strokeWidth="14"
        strokeLinecap="square"
      />
      <path
        d="M 30 110 Q 30 60 80 60 L 200 60 Q 230 60 240 90 L 260 130 L 290 130"
        fill="none"
        stroke="#0F0F0E"
        strokeWidth="2"
        strokeLinecap="square"
      />
      {/* drip */}
      <ellipse cx="180" cy="170" rx="14" ry="10" fill="#B12A28" />
      <ellipse cx="180" cy="170" rx="14" ry="10" fill="none" stroke="#0F0F0E" strokeWidth="1.5" />
      {/* squiggle stink lines */}
      <path d="M 110 35 q 4 -8 8 0 t 8 0 t 8 0" fill="none" stroke="#0F0F0E" strokeWidth="1.5" />
      <path d="M 150 25 q 4 -8 8 0 t 8 0 t 8 0" fill="none" stroke="#0F0F0E" strokeWidth="1.5" />
    </svg>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@500;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

  .bs-root {
    --pulp: #E9E2D2;
    --pulp-deep: #D8CFB8;
    --ink: #0F0F0E;
    --ink-soft: #2A2A28;
    --cherry: #B12A28;
    background: var(--pulp);
    color: var(--ink);
    min-height: 100vh;
    font-family: 'Source Serif 4', Georgia, serif;
    line-height: 1.55;
  }
  .bs-root *, .bs-root *::before, .bs-root *::after { box-sizing: border-box; }

  /* pulp paper texture */
  .bs-root::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-image:
      radial-gradient(circle at 20% 30%, rgba(216,207,184,0.55) 0%, transparent 50%),
      radial-gradient(circle at 75% 70%, rgba(216,207,184,0.45) 0%, transparent 60%),
      repeating-linear-gradient(0deg, rgba(15,15,14,0.018) 0 1px, transparent 1px 3px);
    mix-blend-mode: multiply;
  }

  .bs-paper {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: clamp(40px, 5vw, 64px) clamp(20px, 4vw, 60px);
  }

  .bs-register {
    position: absolute;
    top: 12px;
    width: 24px;
    height: 24px;
    z-index: 2;
    opacity: 0.55;
  }
  .bs-register-tl { left: 12px; }
  .bs-register-tr { right: 12px; }

  /* MASTHEAD */
  .bs-masthead {
    border-bottom: 4px solid var(--ink);
    padding-bottom: 12px;
    margin-bottom: 12px;
  }
  .bs-masthead-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink);
  }
  .bs-masthead-foot { font-size: 10px; opacity: 0.75; margin-top: 6px; }
  .bs-masthead-title {
    font-family: 'Bebas Neue', 'Oswald', sans-serif;
    font-size: clamp(22px, 2.4vw, 30px);
    letter-spacing: 0.22em;
    color: var(--ink);
  }
  .bs-masthead-rule { height: 2px; background: var(--ink); margin: 8px 0; }

  /* BANNER */
  .bs-banner {
    font-family: 'Bebas Neue', 'Oswald', 'Impact', sans-serif;
    font-size: clamp(56px, 11vw, 132px);
    line-height: 0.86;
    letter-spacing: -0.005em;
    margin: 16px 0 4px;
    color: var(--ink);
    text-transform: uppercase;
    animation: bs-slam 360ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }
  @keyframes bs-slam {
    0% { opacity: 0; transform: scaleY(0.9) translateY(-4px); filter: blur(2px); }
    70% { opacity: 1; transform: scaleY(1.03) translateY(1px); filter: blur(0); }
    100% { opacity: 1; transform: scaleY(1); }
  }
  @media (prefers-reduced-motion: reduce) {
    .bs-banner { animation: none; }
  }
  .bs-deck {
    font-family: 'Source Serif 4', Georgia, serif;
    font-style: italic;
    font-size: clamp(15px, 1.5vw, 18px);
    color: var(--ink-soft);
    margin: 0 0 18px;
    max-width: 720px;
  }

  .bs-cta-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 28px; }
  .bs-btn {
    display: inline-flex;
    padding: 10px 18px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    text-decoration: none;
    border: 1.5px solid var(--ink);
    transition: background 140ms ease, color 140ms ease, transform 140ms ease;
  }
  .bs-btn-primary { background: var(--ink); color: var(--pulp); }
  .bs-btn-primary:hover, .bs-btn-primary:focus-visible {
    background: var(--cherry);
    color: var(--pulp);
    border-color: var(--cherry);
    transform: translateY(-1px);
    outline: none;
  }
  .bs-btn-ghost { background: transparent; color: var(--ink); }
  .bs-btn-ghost:hover, .bs-btn-ghost:focus-visible {
    background: var(--ink); color: var(--pulp); transform: translateY(-1px); outline: none;
  }

  /* GRID */
  .bs-grid {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: clamp(24px, 3vw, 48px);
    border-top: 2px solid var(--ink);
    padding-top: 18px;
  }
  @media (max-width: 880px) { .bs-grid { grid-template-columns: 1fr; } }

  .bs-frontpage { min-width: 0; }

  .bs-halftone {
    margin: 0 0 18px;
    border: 1.5px solid var(--ink);
    background: var(--pulp);
    overflow: hidden;
  }
  .bs-halftone-wrap { aspect-ratio: 5 / 3; background: var(--pulp); position: relative; }
  .bs-halftone-svg { width: 100%; height: 100%; display: block; }
  @keyframes bs-dot {
    from { opacity: 0; transform: scale(0.4); transform-origin: center; }
    to { opacity: 1; transform: scale(1); }
  }
  .bs-halftone figcaption {
    padding: 8px 12px;
    border-top: 1px solid var(--ink);
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-soft);
  }

  .bs-story {
    margin-bottom: 18px;
    column-count: 2;
    column-gap: 28px;
    column-rule: 1px solid rgba(15,15,14,0.18);
  }
  @media (max-width: 720px) {
    .bs-story { column-count: 1; }
  }
  .bs-story h2 {
    font-family: 'Oswald', 'Bebas Neue', sans-serif;
    font-weight: 700;
    font-size: clamp(22px, 2.4vw, 32px);
    line-height: 1.05;
    text-transform: uppercase;
    letter-spacing: -0.005em;
    margin: 0 0 6px;
    column-span: all;
  }
  .bs-story-lead h2 { font-size: clamp(28px, 3vw, 42px); }
  .bs-byline {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--cherry);
    margin-bottom: 10px;
    column-span: all;
  }
  .bs-dek {
    font-family: 'Source Serif 4', Georgia, serif;
    font-style: italic;
    font-size: 15px;
    color: var(--ink-soft);
    margin: 0 0 12px;
    column-span: all;
  }
  .bs-body {
    font-size: 14px;
    line-height: 1.65;
    margin: 0 0 10px;
    color: var(--ink);
    text-align: justify;
    hyphens: auto;
  }
  .bs-dropcap {
    float: left;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 56px;
    line-height: 0.85;
    padding: 4px 8px 0 0;
    color: var(--cherry);
  }
  .bs-rt {
    column-span: all;
    margin-top: 8px;
    display: inline-block;
    padding: 4px 8px;
    background: var(--ink);
    color: var(--pulp);
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }
  .bs-hr {
    border: none;
    height: 1px;
    background: var(--ink);
    margin: 14px 0;
  }

  .bs-cartoon {
    margin: 0;
    border: 1.5px solid var(--ink);
  }
  .bs-cartoon figcaption {
    padding: 8px 12px;
    border-top: 1px solid var(--ink);
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-soft);
  }

  /* CLASSIFIEDS */
  .bs-classifieds {
    border-left: 1px solid var(--ink);
    padding-left: clamp(16px, 2vw, 24px);
    align-self: start;
    position: sticky;
    top: 20px;
  }
  @media (max-width: 880px) {
    .bs-classifieds { border-left: none; border-top: 2px solid var(--ink); padding: 18px 0 0; position: static; }
  }
  .bs-class-head {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 24px;
    letter-spacing: 0.22em;
    border-bottom: 2px solid var(--ink);
    padding-bottom: 6px;
    margin-bottom: 10px;
  }
  .bs-classifieds ul { list-style: none; margin: 0; padding: 0; }
  .bs-classifieds li {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px;
    letter-spacing: 0.04em;
    line-height: 1.45;
    padding: 6px 0;
    border-bottom: 1px solid rgba(15,15,14,0.25);
    color: var(--ink);
    text-transform: uppercase;
    transition: background 120ms ease, color 120ms ease;
    cursor: default;
  }
  .bs-classifieds li:hover {
    background: rgba(177,42,40,0.08);
    color: var(--cherry);
    border-bottom-color: var(--cherry);
  }
  .bs-class-foot {
    margin-top: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-soft);
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  /* FOOTER */
  .bs-foot { margin-top: 32px; }
  .bs-foot-rule { height: 4px; background: var(--ink); margin-bottom: 10px; }
  .bs-foot-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-soft);
  }
`;
