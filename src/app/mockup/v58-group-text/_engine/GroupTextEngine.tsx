"use client";

/**
 * GroupTextEngine — V58 Group Text (radio-dispatch chrome)
 *
 * Fleet-dispatch terminal: charcoal console panel, channel tabs (FRAMERS /
 * MASONRY / MEP / INSPECT) across the top, monospace timestamps, RX-amber
 * + TX-green LED indicators, magnetic-strip channel tabs. Industrial
 * dispatch register only — no consumer-OS chrome whatsoever.
 *
 * Trade: general contracting. The page reads as a job-trailer dispatch
 * board for an 8-15-thread GC.
 *
 * No Tailwind. Inline <style> only.
 */

import { useEffect, useState } from "react";

type Entry = {
  ts: string;
  who: string;
  channel: number;
  line: string;
  badge?: "photo" | "memo" | "ack";
  memoLen?: string;
};

const CHANNELS = [
  { id: 1, name: "FRAMERS", color: "#4FB872" },
  { id: 2, name: "MASONRY", color: "#5BB6D1" },
  { id: 3, name: "MEP", color: "#D89A4F" },
  { id: 4, name: "INSPECT", color: "#C97A6A" },
] as const;

const LOG: Record<number, Entry[]> = {
  1: [
    { ts: "07:14", who: "MK", channel: 1, line: "Crew on site. Decking by ten.", badge: "ack" },
    { ts: "07:31", who: "JR", channel: 1, line: "Window order short two — checking returns.", badge: "photo" },
    { ts: "08:02", who: "MK", channel: 1, line: "OK on returns. Drop at bay 3.", badge: "ack" },
    { ts: "08:46", who: "DT", channel: 1, line: "South wall raised. Bracing in.", badge: "photo" },
    { ts: "09:18", who: "MK", channel: 1, line: "Inspector called. He says noon.", badge: "memo", memoLen: "0:09" },
    { ts: "09:45", who: "JR", channel: 1, line: "Ridge beam set. Plumb to within 1/8 over 32.", badge: "ack" },
    { ts: "10:22", who: "DT", channel: 1, line: "Sheathing started east elevation.", badge: "photo" },
  ],
  2: [
    { ts: "07:00", who: "AC", channel: 2, line: "Block delivered. Pallets at 4, 5, 6.", badge: "photo" },
    { ts: "07:48", who: "MK", channel: 2, line: "Mortar mix to 1:3 lime. Verify with Tony.", badge: "ack" },
    { ts: "08:30", who: "TN", channel: 2, line: "Mix ratio confirmed. Course 1 in.", badge: "memo", memoLen: "0:14" },
    { ts: "09:42", who: "AC", channel: 2, line: "Course 4. Plumb good. Joints uniform.", badge: "photo" },
    { ts: "10:55", who: "TN", channel: 2, line: "Lintel set. Course 7 by lunch.", badge: "ack" },
  ],
  3: [
    { ts: "07:15", who: "EL", channel: 3, line: "Rough plumbing in north bath. Pressure test 11:00.", badge: "ack" },
    { ts: "08:04", who: "ELC", channel: 3, line: "Panel pulled to bus. Romex by 2.", badge: "photo" },
    { ts: "09:30", who: "EL", channel: 3, line: "Trap arms set. 1/4 per foot all over.", badge: "ack" },
    { ts: "10:15", who: "HVAC", channel: 3, line: "Ductwork chase done. Trunk on Mon.", badge: "memo", memoLen: "0:11" },
  ],
  4: [
    { ts: "11:58", who: "INSP", channel: 4, line: "On site, 5 minutes out.", badge: "ack" },
    { ts: "12:14", who: "INSP", channel: 4, line: "Walked rough. No punch. Moving on framing Tue.", badge: "memo", memoLen: "0:18" },
    { ts: "12:20", who: "MK", channel: 4, line: "Copy. Logged for permit file.", badge: "ack" },
  ],
};

const PHOTO_DROPS = [
  { meta: "MK / 0729 / SLAB DRY-IN / 62F", caption: "Slab dry-in, north elevation. Backfill cured." },
  { meta: "JR / 0846 / S WALL RAISED / 64F", caption: "South wall up. Bracing temp pinned." },
  { meta: "DT / 1022 / SHEATH E ELEV / 67F", caption: "East elevation sheathed. Tape next." },
  { meta: "AC / 0942 / COURSE 4 / 61F", caption: "Masonry course 4. Joints uniform." },
];

export default function GroupTextEngine() {
  const [activeCh, setActiveCh] = useState<number>(1);
  const [reduced, setReduced] = useState(false);
  const [memoPlaying, setMemoPlaying] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const chColor = CHANNELS.find((c) => c.id === activeCh)?.color ?? "#4FB872";
  const entries = LOG[activeCh] ?? [];

  return (
    <div className="gt-root">
      <style>{css}</style>

      {/* HERO — console panel */}
      <header className="gt-console">
        <div className="gt-callsign" aria-hidden>
          <div className="gt-call-row">KPT &middot; DISPATCH</div>
          <div className="gt-call-row gt-call-sub">OP MK &middot; LIC GC-114882</div>
        </div>

        {/* channel tabs */}
        <div className="gt-tabs" role="tablist" aria-label="Channel select">
          {CHANNELS.map((c) => {
            const isActive = c.id === activeCh;
            return (
              <button
                type="button"
                key={c.id}
                role="tab"
                aria-selected={isActive}
                className={`gt-tab${isActive ? " gt-tab-on" : ""}`}
                onClick={() => setActiveCh(c.id)}
                style={{ ["--ch-color" as string]: c.color }}
              >
                <span className="gt-tab-id">CH-{c.id}</span>
                <span className="gt-tab-name">{c.name}</span>
              </button>
            );
          })}
          <div
            className="gt-magstrip"
            aria-hidden
            style={{
              transform: `translateX(${(activeCh - 1) * 100}%)`,
              background: chColor,
            }}
          />
        </div>

        <div className="gt-hero-grid">
          <div className="gt-hero-copy">
            <div className="gt-eyebrow">CHANNEL OPEN &middot; LIVE LOG</div>
            <h1 className="gt-headline">
              Framers in at 7. <br />Masonry at 9. <br />Dry-in by Friday.
            </h1>
            <p className="gt-sub">
              General contracting where the channel <em>is</em> the schedule &mdash; we run the dispatch, you read the log, the job ships clean.
            </p>
            <div className="gt-cta-row">
              <button type="button" className="gt-cta gt-cta-primary">
                <span className="gt-led gt-led-tx" aria-hidden />
                KEY UP
              </button>
              <button type="button" className="gt-cta gt-cta-ghost">
                <span className="gt-led gt-led-rx" aria-hidden />
                MONITOR
              </button>
            </div>
          </div>

          {/* RX rail */}
          <div className="gt-rxrail" aria-hidden>
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className={`gt-rx-led${i % 3 === 0 ? " gt-rx-led-on" : ""}`} />
            ))}
            <div className="gt-rxrail-label">RX</div>
          </div>
        </div>
      </header>

      {/* TODAY'S LOG */}
      <section className="gt-section">
        <div className="gt-section-head">
          <span className="gt-tag" style={{ color: chColor }}>
            CH-{activeCh} &middot; {CHANNELS.find((c) => c.id === activeCh)?.name} &middot; LIVE LOG
          </span>
          <h2>Today&rsquo;s log</h2>
          <p>Hover an entry for emphasis. Channel switch swaps the log without page reload.</p>
        </div>

        <div className="gt-log">
          <div className="gt-log-head">
            <span>TS</span>
            <span>OP</span>
            <span>LINE</span>
            <span>BADGE</span>
          </div>
          <ol className="gt-log-rows">
            {entries.map((e, i) => (
              <li
                key={`${activeCh}-${i}`}
                className={`gt-row${reduced ? " gt-row-static" : ""}`}
                style={{ animationDelay: `${reduced ? 0 : i * 60}ms` }}
                tabIndex={0}
              >
                <span className="gt-ts" style={{ color: chColor }}>{e.ts}</span>
                <span className="gt-who">{e.who}</span>
                <span className="gt-line">{e.line}</span>
                <span className="gt-badge">
                  {e.badge === "photo" ? <span className="gt-b gt-b-photo">[PHOTO]</span> : null}
                  {e.badge === "memo" ? <span className="gt-b gt-b-memo">[MEMO {e.memoLen}]</span> : null}
                  {e.badge === "ack" ? <span className="gt-b gt-b-ack">[ACK]</span> : null}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PHOTO DROPS */}
      <section className="gt-section">
        <div className="gt-section-head">
          <span className="gt-tag">SUB-RAIL &middot; PHOTO DROPS</span>
          <h2>Drops, captioned in mono</h2>
          <p>Each card a jobsite drop. Tap-to-expand within the row, no modal.</p>
        </div>
        <div className="gt-photos">
          {PHOTO_DROPS.map((p, i) => (
            <details key={i} className="gt-photo">
              <summary>
                <span className="gt-photo-meta">{p.meta}</span>
                <span className="gt-photo-toggle">[+]</span>
              </summary>
              <div className="gt-photo-art" aria-hidden>
                <PhotoArt seed={i} />
              </div>
              <div className="gt-photo-caption">{p.caption}</div>
            </details>
          ))}
        </div>
      </section>

      {/* MEMO TAPE */}
      <section className="gt-section">
        <div className="gt-section-head">
          <span className="gt-tag">CARRIER STRIP &middot; MEMO TAPE</span>
          <h2>Voice memos, tape-strip render</h2>
          <p>TX bars run while a memo is &ldquo;playing&rdquo;; transcript types out under the bar.</p>
        </div>
        <div className="gt-tape">
          <div className="gt-tape-row">
            <span className="gt-tape-id">MEMO 014 &middot; INSP &middot; 0:18</span>
            <button
              type="button"
              className={`gt-tape-btn${memoPlaying ? " gt-tape-btn-on" : ""}`}
              onClick={() => setMemoPlaying((v) => !v)}
              aria-pressed={memoPlaying}
            >
              {memoPlaying ? "STOP" : "PLAY"}
            </button>
          </div>
          <div className={`gt-bars${memoPlaying && !reduced ? " gt-bars-on" : ""}`} aria-hidden>
            {Array.from({ length: 32 }).map((_, i) => (
              <span key={i} style={{ animationDelay: `${(i % 8) * 60}ms` }} />
            ))}
          </div>
          <div className="gt-transcript">
            &gt; Walked rough. No punch on the framing. Moving inspection to Tuesday for the rest of the trades. Logging it.
          </div>
        </div>
      </section>

      {/* CHANNEL SWITCH HINT */}
      <section className="gt-section">
        <div className="gt-section-head">
          <span className="gt-tag">SCHEDULE BOARD &middot; CRITICAL PATH</span>
          <h2>One log per channel, one channel per trade</h2>
          <p>Click any tab above. The magnetic strip slides; the timestamp column re-tints to the channel hue.</p>
        </div>
        <div className="gt-channel-board">
          {CHANNELS.map((c) => (
            <button
              type="button"
              key={c.id}
              onClick={() => setActiveCh(c.id)}
              className={`gt-cb${c.id === activeCh ? " gt-cb-on" : ""}`}
              style={{ ["--ch-color" as string]: c.color }}
            >
              <span className="gt-cb-id">CH-{c.id}</span>
              <span className="gt-cb-name">{c.name}</span>
              <span className="gt-cb-count">{LOG[c.id]?.length ?? 0} ENTRIES</span>
            </button>
          ))}
        </div>
      </section>

      <footer className="gt-foot">
        <div>KPT-DISPATCH &middot; OP MK &middot; LIC GC-114882</div>
        <div>AIA MEMBER &middot; OSHA-30</div>
        <div>BOARD STAMP &middot; 04 / 28</div>
      </footer>
    </div>
  );
}

function PhotoArt({ seed }: { seed: number }) {
  // Deterministic abstract jobsite "photo" — gradient + grid + tone bands
  const hues = ["#3A4A52", "#5C4A3A", "#3A3F4A", "#4A3F38"];
  const bg = hues[seed % hues.length];
  return (
    <svg viewBox="0 0 320 200" width="100%" height="100%" aria-hidden>
      <defs>
        <linearGradient id={`gt-grad-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={bg} />
          <stop offset="100%" stopColor="#11141A" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#gt-grad-${seed})`} />
      <line x1="0" y1="120" x2="320" y2="120" stroke="rgba(232,160,58,0.45)" strokeWidth="1" />
      {[40, 100, 160, 220, 280].map((x) => (
        <rect key={x} x={x} y="60" width="6" height="100" fill="rgba(0,0,0,0.55)" />
      ))}
      <rect x="0" y="180" width="320" height="20" fill="rgba(0,0,0,0.6)" />
    </svg>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=IBM+Plex+Sans:wght@500;600;700&display=swap');

  .gt-root {
    --console: #1B1E22;
    --console-deep: #11141A;
    --console-up: #2A2E34;
    --bezel: #6F7480;
    --tx: #4FB872;
    --tx-glow: #6FE090;
    --rx: #E8A03A;
    --rx-glow: #FFC066;
    --paper: #E6E6E1;
    --paper-soft: rgba(230,230,225,0.7);
    background: var(--console);
    color: var(--paper);
    min-height: 100vh;
    font-family: 'IBM Plex Mono', ui-monospace, monospace;
    line-height: 1.55;
    animation: gt-poweron 700ms ease both;
  }
  .gt-root *, .gt-root *::before, .gt-root *::after { box-sizing: border-box; }
  @keyframes gt-poweron {
    0% { filter: brightness(0.4) blur(2px); opacity: 0.6; }
    40% { filter: brightness(1.2); }
    100% { filter: none; opacity: 1; }
  }
  @media (prefers-reduced-motion: reduce) {
    .gt-root { animation: none; }
  }

  .gt-console {
    position: relative;
    margin: clamp(20px, 3vw, 40px) clamp(16px, 4vw, 48px);
    border: 2px solid var(--bezel);
    background: linear-gradient(180deg, #232730 0%, #1B1E22 50%, #14171B 100%);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.08),
      inset 0 -1px 0 rgba(0,0,0,0.5),
      0 24px 60px -28px rgba(0,0,0,0.7);
    border-radius: 4px;
    overflow: hidden;
  }
  .gt-callsign {
    position: absolute;
    top: 12px;
    left: 14px;
    background: rgba(0,0,0,0.4);
    border: 1px solid rgba(232,160,58,0.45);
    border-radius: 2px;
    padding: 4px 10px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 10px;
    letter-spacing: 0.18em;
    color: var(--rx-glow);
    text-transform: uppercase;
    z-index: 5;
  }
  .gt-call-sub { font-size: 9px; opacity: 0.75; letter-spacing: 0.22em; }

  .gt-tabs {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background: linear-gradient(180deg, #14171B 0%, #1B1E22 100%);
    border-bottom: 1px solid #0B0D10;
    padding-top: 44px;
  }
  .gt-tab {
    background: transparent;
    border: none;
    border-right: 1px solid rgba(0,0,0,0.55);
    padding: 14px 12px 18px;
    color: var(--paper-soft);
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: flex-start;
    transition: color 140ms ease, background 140ms ease;
  }
  .gt-tab:last-child { border-right: none; }
  .gt-tab:hover, .gt-tab:focus-visible {
    color: var(--paper);
    background: rgba(255,255,255,0.03);
    outline: none;
  }
  .gt-tab-on { color: var(--paper); }
  .gt-tab-id { font-size: 11px; opacity: 0.7; }
  .gt-tab-name { font-size: 14px; letter-spacing: 0.22em; }
  .gt-magstrip {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 25%;
    height: 3px;
    background: var(--tx);
    transition: transform 220ms cubic-bezier(0.22, 0.96, 0.32, 1), background 220ms ease;
    box-shadow: 0 0 12px var(--tx-glow);
  }
  @media (prefers-reduced-motion: reduce) {
    .gt-magstrip { transition: none; }
  }

  .gt-hero-grid {
    display: grid;
    grid-template-columns: 1fr 80px;
    gap: 24px;
    padding: clamp(28px, 4vw, 56px) clamp(20px, 4vw, 48px);
  }
  .gt-eyebrow {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 11px;
    letter-spacing: 0.32em;
    color: var(--rx);
    text-transform: uppercase;
    margin-bottom: 14px;
  }
  .gt-headline {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 700;
    font-size: clamp(34px, 5.4vw, 64px);
    line-height: 1.06;
    letter-spacing: -0.01em;
    margin: 0 0 20px;
    color: var(--paper);
  }
  .gt-sub {
    font-family: 'IBM Plex Mono', monospace;
    font-size: clamp(14px, 1.5vw, 17px);
    color: rgba(230,230,225,0.85);
    margin: 0 0 24px;
    max-width: 640px;
    line-height: 1.55;
  }
  .gt-sub em {
    font-style: normal;
    color: var(--tx-glow);
    border-bottom: 2px solid var(--tx);
    padding-bottom: 1px;
  }
  .gt-cta-row { display: flex; gap: 12px; flex-wrap: wrap; }
  .gt-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    background: linear-gradient(180deg, #2A2E34 0%, #1B1E22 100%);
    border: 1px solid var(--bezel);
    border-radius: 3px;
    color: var(--paper);
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform 140ms ease, border-color 140ms ease, box-shadow 140ms ease;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 0 rgba(0,0,0,0.5);
  }
  .gt-cta:hover, .gt-cta:focus-visible {
    transform: translateY(-1px);
    border-color: var(--tx);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 0 rgba(0,0,0,0.6), 0 0 14px rgba(79,184,114,0.25);
    outline: none;
  }
  .gt-cta-primary { border-color: var(--tx); }
  .gt-cta-ghost { opacity: 0.85; }
  .gt-led {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    box-shadow: 0 0 6px currentColor;
  }
  .gt-led-tx { background: var(--tx); color: var(--tx); animation: gt-pulse 2s ease-in-out infinite; }
  .gt-led-rx { background: var(--rx); color: var(--rx); opacity: 0.65; }
  @keyframes gt-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.55; }
  }
  @media (prefers-reduced-motion: reduce) {
    .gt-led-tx { animation: none; }
  }

  .gt-rxrail {
    position: relative;
    border-left: 1px solid rgba(255,255,255,0.06);
    padding: 8px 8px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  .gt-rx-led {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(232,160,58,0.18);
    box-shadow: inset 0 0 2px rgba(0,0,0,0.5);
  }
  .gt-rx-led-on {
    background: var(--rx);
    box-shadow: 0 0 6px var(--rx-glow);
    animation: gt-pulse 1.4s ease-in-out infinite;
  }
  .gt-rxrail-label {
    margin-top: auto;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 9px;
    letter-spacing: 0.32em;
    color: var(--rx);
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }
  @media (prefers-reduced-motion: reduce) {
    .gt-rx-led-on { animation: none; }
  }

  .gt-section {
    max-width: 1180px;
    margin: 0 auto;
    padding: clamp(40px, 5vw, 72px) clamp(20px, 4vw, 48px);
    border-top: 1px solid rgba(255,255,255,0.05);
  }
  .gt-section-head { margin-bottom: 24px; max-width: 720px; }
  .gt-tag {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 10px;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--tx);
    display: inline-block;
    margin-bottom: 10px;
  }
  .gt-section-head h2 {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 700;
    font-size: clamp(22px, 2.6vw, 32px);
    margin: 0 0 6px;
  }
  .gt-section-head p { font-size: 14px; color: rgba(230,230,225,0.75); }

  .gt-log {
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(0,0,0,0.35);
    border-radius: 2px;
  }
  .gt-log-head {
    display: grid;
    grid-template-columns: 80px 60px 1fr 130px;
    gap: 12px;
    padding: 10px 16px;
    background: var(--console-deep);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 10px;
    letter-spacing: 0.22em;
    color: rgba(230,230,225,0.65);
    text-transform: uppercase;
  }
  .gt-log-rows { list-style: none; margin: 0; padding: 0; }
  .gt-row {
    display: grid;
    grid-template-columns: 80px 60px 1fr 130px;
    gap: 12px;
    padding: 10px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    font-size: 13px;
    align-items: baseline;
    transition: background 140ms ease, opacity 140ms ease;
    opacity: 0;
    transform: translateY(2px);
    animation: gt-rowin 320ms ease forwards;
    cursor: default;
  }
  .gt-row-static { animation: none; opacity: 1; transform: none; }
  @keyframes gt-rowin {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .gt-row { animation: none; opacity: 1; transform: none; }
  }
  .gt-row:hover, .gt-row:focus-visible {
    background: rgba(255,255,255,0.04);
    outline: none;
  }
  .gt-log-rows:hover li:not(:hover), .gt-log-rows:focus-within li:not(:focus-visible) { opacity: 0.45; }

  .gt-ts { font-weight: 700; letter-spacing: 0.06em; }
  .gt-who {
    background: rgba(232,160,58,0.15);
    color: var(--rx-glow);
    border: 1px solid rgba(232,160,58,0.4);
    padding: 2px 6px;
    border-radius: 2px;
    font-size: 11px;
    text-align: center;
    letter-spacing: 0.1em;
  }
  .gt-line { color: var(--paper); }
  .gt-badge { text-align: right; font-size: 11px; }
  .gt-b { padding: 2px 6px; border: 1px solid currentColor; border-radius: 2px; letter-spacing: 0.1em; }
  .gt-b-photo { color: #6FA8E0; }
  .gt-b-memo { color: var(--tx-glow); }
  .gt-b-ack { color: var(--paper-soft); }

  .gt-photos { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; }
  .gt-photo {
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(0,0,0,0.35);
    transition: border-color 140ms ease;
  }
  .gt-photo:hover, .gt-photo:focus-within { border-color: var(--tx); }
  .gt-photo summary {
    list-style: none;
    cursor: pointer;
    padding: 10px 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    color: var(--paper-soft);
    letter-spacing: 0.06em;
  }
  .gt-photo summary::-webkit-details-marker { display: none; }
  .gt-photo-toggle { color: var(--tx); }
  .gt-photo[open] .gt-photo-toggle { color: var(--rx); }
  .gt-photo-art { aspect-ratio: 16 / 10; background: var(--console-deep); }
  .gt-photo-caption {
    padding: 10px 14px;
    border-top: 1px solid rgba(255,255,255,0.08);
    font-size: 12px;
    color: rgba(230,230,225,0.85);
  }

  .gt-tape {
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(0,0,0,0.4);
    padding: 16px;
  }
  .gt-tape-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  .gt-tape-id {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--paper-soft);
  }
  .gt-tape-btn {
    background: var(--console-up);
    border: 1px solid var(--bezel);
    color: var(--paper);
    padding: 6px 14px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.22em;
    cursor: pointer;
    transition: background 140ms ease, color 140ms ease, border-color 140ms ease;
  }
  .gt-tape-btn:hover, .gt-tape-btn:focus-visible {
    background: var(--tx);
    border-color: var(--tx);
    color: var(--console);
    outline: none;
  }
  .gt-tape-btn-on { background: var(--tx); color: var(--console); border-color: var(--tx); }
  .gt-bars {
    display: grid;
    grid-template-columns: repeat(32, 1fr);
    gap: 2px;
    height: 56px;
    align-items: end;
    padding: 4px;
    background: var(--console-deep);
    border: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 12px;
  }
  .gt-bars span {
    height: 30%;
    background: rgba(79,184,114,0.25);
    border-radius: 1px;
  }
  .gt-bars-on span {
    animation: gt-bar 720ms ease-in-out infinite;
    background: var(--tx);
    box-shadow: 0 0 4px var(--tx-glow);
  }
  @keyframes gt-bar {
    0%, 100% { height: 18%; }
    50% { height: 92%; }
  }
  @media (prefers-reduced-motion: reduce) {
    .gt-bars-on span { animation: none; height: 60%; }
  }
  .gt-transcript {
    font-size: 14px;
    line-height: 1.6;
    color: var(--paper);
    border-left: 2px solid var(--tx);
    padding-left: 12px;
  }

  .gt-channel-board { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; }
  .gt-cb {
    background: linear-gradient(180deg, var(--console-up) 0%, var(--console) 100%);
    border: 1px solid var(--bezel);
    color: var(--paper);
    padding: 18px 16px;
    text-align: left;
    cursor: pointer;
    display: grid;
    gap: 4px;
    transition: transform 140ms ease, border-color 140ms ease, box-shadow 140ms ease;
  }
  .gt-cb:hover, .gt-cb:focus-visible {
    transform: translateY(-2px);
    border-color: var(--ch-color);
    box-shadow: 0 0 12px rgba(255,255,255,0.05);
    outline: none;
  }
  .gt-cb-on {
    border-color: var(--ch-color);
    box-shadow: inset 0 0 0 2px var(--ch-color);
  }
  .gt-cb-id { font-size: 11px; letter-spacing: 0.22em; color: var(--ch-color); }
  .gt-cb-name { font-family: 'IBM Plex Sans', sans-serif; font-size: 16px; font-weight: 700; letter-spacing: 0.22em; }
  .gt-cb-count { font-size: 10px; letter-spacing: 0.16em; color: var(--paper-soft); }

  .gt-foot {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding: 18px clamp(20px, 4vw, 48px);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 10px;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: rgba(230,230,225,0.55);
  }

  @media (max-width: 720px) {
    .gt-log-head, .gt-row { grid-template-columns: 60px 50px 1fr; }
    .gt-badge { display: none; }
    .gt-hero-grid { grid-template-columns: 1fr; }
    .gt-rxrail { display: none; }
    .gt-tab-id { display: none; }
  }
`;
