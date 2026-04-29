"use client";

/**
 * ChannellockEngine — V49 Channellock
 *
 * Turquoise pegboard. Tools hang on hooks with Sharpie outlines drawn behind.
 * Hover lifts a tool off its hook revealing the outline. Hand-painted wordmark.
 * Trade: Handyman.
 */

import { useState } from "react";

const TOOLS = [
  {
    id: "channellock",
    name: "CHANNELLOCK 420",
    role: "TURNOVER WORK",
    note: "PM repeat list. 14-day net. Friday morning slots.",
    angle: -2.4,
  },
  {
    id: "klein",
    name: "KLEIN 5-IN-1",
    role: "PATCH & PAINT",
    note: "Drywall, trim, switch plates. The small list, finished.",
    angle: 1.8,
  },
  {
    id: "tape",
    name: "STANLEY 25'",
    role: "HANGING & MOUNTING",
    note: "TVs, shelves, blinds. Studs found, levels true.",
    angle: -0.6,
  },
  {
    id: "drill",
    name: "MILWAUKEE M18",
    role: "ASSEMBLY DAY",
    note: "Flatpack, closet kits, garage racks. One trip.",
    angle: 2.6,
  },
  {
    id: "caulk",
    name: "CAULK GUN",
    role: "CAULK & CALL IT",
    note: "Bathrooms, baseboard, exterior bead. Right the first time.",
    angle: -1.4,
  },
  {
    id: "pencil",
    name: "FLAT PENCIL",
    role: "QUOTES & WALK-THROUGHS",
    note: "Honey-do walk. Free estimate. Saturday windows.",
    angle: 1.2,
  },
];

const TURNOVER = [
  { tier: "BASIC", price: "$285", per: "/UNIT", scope: "Touch-up paint, caulk reset, bulb sweep, hardware tighten." },
  { tier: "STANDARD", price: "$465", per: "/UNIT", scope: "Above + drywall patches ≤ 4\", tile re-grout, blind repair." },
  { tier: "DEEP", price: "$720", per: "/UNIT", scope: "Above + paint one accent wall, vanity swap, fixture re-trim." },
];

const PACKOUT = [
  { row: "TOP", item: "ORGANIZER · COMPACT", contents: "wirenuts · anchors · #8 screws" },
  { row: "MID", item: "DEEP TOOLBOX", contents: "drill · driver · multitool · headlamp" },
  { row: "MID", item: "ROLLING BOX", contents: "caulk gun · putty knives · taping kit" },
  { row: "BASE", item: "DOLLY PLATFORM", contents: "extension cord · drop cloth · shop vac" },
];

export default function ChannellockEngine() {
  const [lifted, setLifted] = useState<string | null>(null);

  return (
    <>
      <style>{css}</style>
      <div className="cl-shell">
        <div className="cl-board" aria-hidden />

        {/* Wordmark */}
        <header className="cl-marquee">
          <h1 className="cl-wordmark">KPT&nbsp;HANDYMAN</h1>
          <div className="cl-tagline">
            <span>EST. 2009</span>
            <span className="cl-dot" aria-hidden>•</span>
            <span>HONEY-DO · TURNOVERS · "WHILE I'M HERE…"</span>
            <span className="cl-dot" aria-hidden>•</span>
            <span>BONDED + INSURED</span>
          </div>
        </header>

        {/* HERO */}
        <section className="cl-hero">
          <div className="cl-hero-text">
            <h2 className="cl-h1">
              <span>Honey-do done.</span>
              <span>Patch and paint,</span>
              <span>caulk and call it.</span>
            </h2>
            <p className="cl-sub">
              Property managers and homeowners — turnover work, weekend windows,
              the whole "while I'm here…" list. Bonded, insured, on the schedule
              you actually need.
            </p>
            <div className="cl-cta-row">
              <button className="cl-cta cl-cta-red" type="button">
                Book a Saturday
              </button>
              <button className="cl-cta cl-cta-ghost" type="button">
                See the pegboard
              </button>
            </div>
          </div>

          {/* PEGBOARD with TOOLS */}
          <div className="cl-pegboard">
            <ul className="cl-tools">
              {TOOLS.map((t) => (
                <li
                  key={t.id}
                  className={`cl-tool ${lifted === t.id ? "is-lifted" : ""}`}
                  style={{ ["--angle" as never]: `${t.angle}deg` }}
                >
                  <button
                    type="button"
                    className="cl-tool-btn"
                    onMouseEnter={() => setLifted(t.id)}
                    onMouseLeave={() => setLifted(null)}
                    onFocus={() => setLifted(t.id)}
                    onBlur={() => setLifted(null)}
                    aria-label={`${t.name} — ${t.role}`}
                  >
                    <span className="cl-outline" aria-hidden>
                      <ToolSvg id={t.id} mode="outline" />
                    </span>
                    <span className="cl-toolart" aria-hidden>
                      <ToolSvg id={t.id} mode="solid" />
                    </span>
                    <span className="cl-tool-label">{t.name}</span>
                  </button>
                  <div className="cl-tool-card" role="status">
                    <span className="cl-tool-card-role">{t.role}</span>
                    <span className="cl-tool-card-note">{t.note}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* TURNOVER PRICING */}
        <section className="cl-section">
          <h3 className="cl-h2">TURNOVER PACKAGES</h3>
          <p className="cl-section-sub">
            Property managers — fixed scope, known price, photos in your inbox the
            same day. Net 14 on a PO.
          </p>
          <div className="cl-tier-grid">
            {TURNOVER.map((p) => (
              <article key={p.tier} className="cl-tier" tabIndex={0}>
                <div className="cl-tier-tape" aria-hidden>
                  <span>{p.tier}</span>
                </div>
                <div className="cl-tier-body">
                  <div className="cl-tier-price">
                    <span className="cl-tier-amt">{p.price}</span>
                    <span className="cl-tier-per">{p.per}</span>
                  </div>
                  <p className="cl-tier-scope">{p.scope}</p>
                  <span className="cl-tier-cta">REQUEST PO →</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* THE TRUCK */}
        <section className="cl-section">
          <h3 className="cl-h2">THE TRUCK · TRANSIT CONNECT</h3>
          <p className="cl-section-sub">
            Packout stack labeled by row. One trip is the goal — three is the
            limit. Past three, we go pro.
          </p>
          <div className="cl-stack">
            {PACKOUT.map((row, i) => (
              <div key={i} className={`cl-stack-row cl-stack-row-${row.row.toLowerCase()}`} tabIndex={0}>
                <span className="cl-stack-tab">{row.row}</span>
                <span className="cl-stack-name">{row.item}</span>
                <span className="cl-stack-contents">{row.contents}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="cl-foot">
          <div className="cl-foot-card">
            <span className="cl-foot-magnet" aria-hidden />
            <div>
              <div className="cl-foot-name">KPT HANDYMAN LLC</div>
              <div className="cl-foot-line">ONE CALL DOES IT ALL · TX HSCL 4421188</div>
              <div className="cl-foot-phone">512.555.0144</div>
            </div>
          </div>
          <div className="cl-foot-sharpie">
            <span>Drawn on the shop wall —</span>
            <span>Mike, since '09</span>
          </div>
        </footer>
      </div>
    </>
  );
}

function ToolSvg({ id, mode }: { id: string; mode: "outline" | "solid" }) {
  const stroke = mode === "outline" ? "rgba(19,19,17,0.55)" : "#131311";
  const dash = mode === "outline" ? "3 3" : "0";
  const fill = mode === "outline" ? "none" : "#262423";
  const accent = mode === "outline" ? "none" : "#B62A28";

  if (id === "channellock") {
    return (
      <svg viewBox="0 0 80 200" width="100%" height="100%">
        <path d="M40 6 L52 60 L42 110 L42 188 L38 188 L38 110 L28 60 Z" fill={fill} stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
        <rect x="32" y="120" width="16" height="64" fill={accent} stroke={stroke} strokeWidth="1.5" strokeDasharray={dash} />
        <circle cx="40" cy="80" r="6" fill={mode === "outline" ? "none" : "#1A1A18"} stroke={stroke} strokeWidth="1.5" strokeDasharray={dash} />
      </svg>
    );
  }
  if (id === "klein") {
    return (
      <svg viewBox="0 0 80 200" width="100%" height="100%">
        <rect x="34" y="12" width="12" height="120" fill={fill} stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
        <path d="M36 8 L44 8 L44 18 L36 18 Z" fill={fill} stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
        <rect x="28" y="130" width="24" height="58" rx="6" fill={accent} stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
        <line x1="40" y1="138" x2="40" y2="180" stroke={mode === "outline" ? stroke : "#5C0F0E"} strokeWidth="1.4" strokeDasharray={dash} />
      </svg>
    );
  }
  if (id === "tape") {
    return (
      <svg viewBox="0 0 80 200" width="100%" height="100%">
        <rect x="14" y="40" width="52" height="60" rx="10" fill={accent} stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
        <circle cx="40" cy="70" r="14" fill={fill} stroke={stroke} strokeWidth="1.6" strokeDasharray={dash} />
        <rect x="36" y="100" width="8" height="60" fill={mode === "outline" ? "none" : "#E9D77C"} stroke={stroke} strokeWidth="1.6" strokeDasharray={dash} />
      </svg>
    );
  }
  if (id === "drill") {
    return (
      <svg viewBox="0 0 80 200" width="100%" height="100%">
        <rect x="20" y="40" width="44" height="46" rx="6" fill={accent} stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
        <rect x="32" y="86" width="22" height="80" rx="4" fill={fill} stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
        <rect x="58" y="56" width="18" height="14" fill={fill} stroke={stroke} strokeWidth="1.6" strokeDasharray={dash} />
        <rect x="20" y="160" width="44" height="22" rx="3" fill={mode === "outline" ? "none" : "#1F1D1C"} stroke={stroke} strokeWidth="1.6" strokeDasharray={dash} />
      </svg>
    );
  }
  if (id === "caulk") {
    return (
      <svg viewBox="0 0 80 200" width="100%" height="100%">
        <rect x="22" y="36" width="36" height="100" rx="2" fill={mode === "outline" ? "none" : "#E9D77C"} stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
        <rect x="34" y="14" width="12" height="22" fill={fill} stroke={stroke} strokeWidth="1.6" strokeDasharray={dash} />
        <rect x="20" y="136" width="40" height="14" fill={fill} stroke={stroke} strokeWidth="1.6" strokeDasharray={dash} />
        <path d="M40 150 L40 188 L46 188 L34 188" fill={fill} stroke={stroke} strokeWidth="1.6" strokeDasharray={dash} />
      </svg>
    );
  }
  // pencil
  return (
    <svg viewBox="0 0 80 200" width="100%" height="100%">
      <rect x="28" y="20" width="24" height="156" fill={mode === "outline" ? "none" : "#E9D77C"} stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
      <path d="M28 176 L52 176 L40 196 Z" fill={fill} stroke={stroke} strokeWidth="1.6" strokeDasharray={dash} />
      <path d="M28 20 L52 20 L46 12 L34 12 Z" fill={accent} stroke={stroke} strokeWidth="1.6" strokeDasharray={dash} />
    </svg>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bowlby+One+SC&family=Permanent+Marker&family=DM+Sans:wght@400;500;700&display=swap');

  .cl-shell {
    --board: #44A5A0;
    --board-shadow: #2C7E7A;
    --board-hole: #2A6E6A;
    --sharpie: #131311;
    --sharpie-soft: rgba(19,19,17,0.55);
    --klein: #B62A28;
    --paper: #F5EFD8;
    font-family: 'DM Sans', system-ui, sans-serif;
    color: var(--sharpie);
    position: relative;
    min-height: 100vh;
    padding: 32px 28px 64px 28px;
    box-sizing: border-box;
  }
  .cl-board {
    position: absolute; inset: 0; z-index: 0;
    background: var(--board);
    background-image:
      radial-gradient(circle at center, var(--board-hole) 2px, transparent 2.5px),
      radial-gradient(circle at center, rgba(0,0,0,0.18) 2.5px, transparent 3px);
    background-size: 28px 28px, 28px 28px;
    background-position: 0 0, 1px 1px;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 0 200px rgba(0,0,0,0.18);
  }

  .cl-shell > * { position: relative; z-index: 1; }

  /* MARQUEE */
  .cl-marquee {
    display: flex; flex-direction: column; align-items: center;
    padding: 12px 0 28px 0;
    border-bottom: 3px solid var(--sharpie);
    margin-bottom: 28px;
  }
  .cl-wordmark {
    font-family: 'Permanent Marker', cursive;
    font-size: clamp(48px, 8vw, 96px);
    margin: 0;
    letter-spacing: -0.01em;
    color: var(--sharpie);
    text-shadow: 2px 2px 0 rgba(255,255,255,0.18);
    transform: rotate(-1.4deg);
  }
  .cl-tagline {
    display: flex; gap: 14px; align-items: center;
    font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;
    font-weight: 700;
  }
  .cl-dot { color: var(--klein); }

  /* HERO */
  .cl-hero {
    display: grid;
    grid-template-columns: minmax(320px, 1fr) minmax(420px, 1.1fr);
    gap: 36px;
    background: var(--paper);
    border: 3px solid var(--sharpie);
    box-shadow: 8px 8px 0 var(--sharpie);
    padding: 36px 36px 32px 36px;
    margin-bottom: 56px;
  }
  .cl-hero-text { display: flex; flex-direction: column; justify-content: center; gap: 22px; }
  .cl-h1 {
    font-family: 'Bowlby One SC', serif;
    font-size: clamp(36px, 5.6vw, 80px);
    line-height: 0.96;
    margin: 0;
    color: var(--sharpie);
    letter-spacing: -0.01em;
    display: flex; flex-direction: column;
  }
  .cl-h1 span:nth-child(2) { color: var(--klein); }
  .cl-sub {
    font-size: 16px; line-height: 1.55; max-width: 50ch;
    color: rgba(19,19,17,0.85);
    margin: 0;
  }
  .cl-cta-row { display: flex; gap: 14px; flex-wrap: wrap; }
  .cl-cta {
    font: inherit;
    font-size: 12px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 700;
    padding: 16px 26px;
    border: 3px solid var(--sharpie);
    background: var(--paper);
    color: var(--sharpie);
    cursor: pointer;
    box-shadow: 4px 4px 0 var(--sharpie);
    transition: transform 100ms, box-shadow 100ms, background 100ms;
  }
  .cl-cta-red { background: var(--klein); color: var(--paper); }
  .cl-cta:hover, .cl-cta:focus-visible {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 var(--sharpie);
    outline: none;
  }
  .cl-cta:active { transform: translate(2px, 2px); box-shadow: 1px 1px 0 var(--sharpie); }

  /* PEGBOARD */
  .cl-pegboard {
    background:
      radial-gradient(circle at center, var(--board-hole) 2px, transparent 2.5px) 0 0 / 24px 24px,
      var(--board);
    border: 3px solid var(--sharpie);
    padding: 28px 18px 36px 18px;
    position: relative;
    min-height: 460px;
    box-shadow: 4px 4px 0 var(--sharpie), inset 0 0 80px rgba(0,0,0,0.16);
  }
  .cl-tools {
    list-style: none; padding: 0; margin: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px 12px;
  }
  .cl-tool {
    position: relative;
    aspect-ratio: 1 / 1.7;
    transform: rotate(var(--angle, 0deg));
  }
  .cl-tool-btn {
    position: absolute; inset: 0;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    flex-direction: column;
  }
  .cl-tool-btn:focus-visible { outline: 2px solid var(--klein); outline-offset: 4px; }
  .cl-outline {
    position: absolute; inset: 14% 22% 10% 22%;
    pointer-events: none;
    opacity: 0.55;
  }
  .cl-toolart {
    position: absolute; inset: 12% 20% 8% 20%;
    transition: transform 220ms cubic-bezier(0.34, 1.36, 0.64, 1);
    pointer-events: none;
    transform-origin: 50% 5%;
  }
  .cl-tool.is-lifted .cl-toolart {
    transform: translate(8px, -16px) rotate(8deg);
  }
  @media (prefers-reduced-motion: reduce) {
    .cl-toolart { transition: none; }
    .cl-tool.is-lifted .cl-toolart { transform: translate(2px, -4px) rotate(2deg); }
  }
  .cl-tool-label {
    position: absolute; bottom: -2px; left: 0; right: 0;
    text-align: center;
    font-family: 'Permanent Marker', cursive;
    font-size: 11px;
    letter-spacing: 0.04em;
    color: var(--sharpie);
  }
  .cl-tool-card {
    position: absolute; left: 50%; top: 100%;
    transform: translate(-50%, 12px);
    background: var(--paper);
    border: 2px solid var(--sharpie);
    padding: 8px 10px;
    width: 220px;
    opacity: 0;
    pointer-events: none;
    z-index: 5;
    box-shadow: 3px 3px 0 var(--sharpie);
    transition: opacity 140ms, transform 140ms;
    display: flex; flex-direction: column; gap: 4px;
    rotate: var(--angle, 0deg);
  }
  .cl-tool.is-lifted .cl-tool-card {
    opacity: 1;
    transform: translate(-50%, 18px);
  }
  .cl-tool-card-role {
    font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--klein); font-weight: 700;
  }
  .cl-tool-card-note {
    font-size: 12px; line-height: 1.4;
  }

  /* SECTIONS */
  .cl-section {
    background: var(--paper);
    border: 3px solid var(--sharpie);
    box-shadow: 6px 6px 0 var(--sharpie);
    padding: 32px 36px;
    margin-bottom: 40px;
  }
  .cl-h2 {
    font-family: 'Bowlby One SC', serif;
    font-size: clamp(28px, 3vw, 40px);
    margin: 0 0 6px 0;
    letter-spacing: -0.01em;
  }
  .cl-section-sub {
    font-size: 15px; max-width: 60ch; margin: 0 0 24px 0;
    color: rgba(19,19,17,0.78);
  }

  /* TIER GRID */
  .cl-tier-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .cl-tier {
    border: 2px solid var(--sharpie);
    background: #FFFAE6;
    cursor: pointer;
    transition: transform 140ms, box-shadow 140ms;
    display: flex; flex-direction: column;
  }
  .cl-tier:hover, .cl-tier:focus-visible {
    transform: translate(-3px, -3px);
    box-shadow: 6px 6px 0 var(--klein);
    outline: none;
  }
  .cl-tier-tape {
    background: var(--klein); color: var(--paper);
    padding: 8px 12px;
    font-family: 'Permanent Marker', cursive;
    letter-spacing: 0.06em;
    font-size: 18px;
  }
  .cl-tier-body { padding: 18px 18px 22px 18px; display: flex; flex-direction: column; gap: 12px; }
  .cl-tier-price {
    display: flex; align-items: baseline; gap: 6px;
    border-bottom: 1px dashed var(--sharpie); padding-bottom: 10px;
  }
  .cl-tier-amt { font-family: 'Bowlby One SC', serif; font-size: 36px; }
  .cl-tier-per { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(19,19,17,0.6); }
  .cl-tier-scope { font-size: 14px; line-height: 1.5; margin: 0; flex: 1; }
  .cl-tier-cta {
    font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--klein); font-weight: 700;
  }

  /* STACK */
  .cl-stack { display: flex; flex-direction: column; gap: 6px; }
  .cl-stack-row {
    display: grid;
    grid-template-columns: 70px 240px 1fr;
    gap: 18px;
    align-items: center;
    border: 2px solid var(--sharpie);
    background: #1F1D1C;
    color: #F2EFE6;
    padding: 14px 16px;
    cursor: pointer;
    transition: transform 100ms, background 100ms;
  }
  .cl-stack-row-top { background: #B62A28; }
  .cl-stack-row-base { background: #2C2A28; }
  .cl-stack-row:hover, .cl-stack-row:focus-visible {
    transform: translateX(4px);
    outline: none;
  }
  .cl-stack-tab {
    font-family: 'Permanent Marker', cursive;
    background: var(--paper); color: var(--sharpie);
    padding: 4px 8px;
    text-align: center;
  }
  .cl-stack-name {
    font-weight: 700; letter-spacing: 0.08em; font-size: 13px;
  }
  .cl-stack-contents {
    font-size: 13px; opacity: 0.86;
  }

  /* FOOTER */
  .cl-foot {
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 28px;
    padding: 28px 32px;
    border: 3px solid var(--sharpie);
    background: var(--paper);
    box-shadow: 6px 6px 0 var(--sharpie);
  }
  .cl-foot-card {
    display: flex; gap: 18px; align-items: center;
  }
  .cl-foot-magnet {
    width: 60px; height: 60px;
    background: var(--klein);
    border: 3px solid var(--sharpie);
    border-radius: 50%;
    box-shadow: inset 0 -6px 0 rgba(0,0,0,0.18);
  }
  .cl-foot-name { font-family: 'Bowlby One SC', serif; font-size: 22px; }
  .cl-foot-line { font-size: 12px; letter-spacing: 0.1em; color: rgba(19,19,17,0.7); }
  .cl-foot-phone { font-family: 'Permanent Marker', cursive; font-size: 22px; color: var(--klein); }
  .cl-foot-sharpie {
    font-family: 'Permanent Marker', cursive;
    display: flex; flex-direction: column;
    text-align: right;
    transform: rotate(-2deg);
    color: var(--sharpie);
  }
  .cl-foot-sharpie span:first-child { font-size: 14px; }
  .cl-foot-sharpie span:last-child { font-size: 22px; }

  @media (max-width: 900px) {
    .cl-hero { grid-template-columns: 1fr; }
    .cl-tools { grid-template-columns: repeat(2, 1fr); }
    .cl-tier-grid { grid-template-columns: 1fr; }
    .cl-stack-row { grid-template-columns: 1fr; gap: 6px; }
  }
`;
