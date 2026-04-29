"use client";

/**
 * GalaxyBrainEngine — V51 Galaxy Brain
 *
 * Cognition rendered cosmic — dendrites and galaxy filaments share morphology.
 * Network of synapse-cyan nodes connected by ember-gold filaments. Hover a
 * node to fire a synapse pulse along its connections. Trade: General
 * Contractors (network of subs, schedules, submittals).
 */

import { useMemo, useState } from "react";

type Node = {
  id: string;
  name: string;
  role: string;
  x: number; // 0..100
  y: number; // 0..100
  size: number;
  connections: string[];
};

const NODES: Node[] = [
  { id: "core", name: "PROJECT CORE", role: "GMP · Schedule · Cost", x: 50, y: 46, size: 26, connections: ["arch", "elec", "mech", "civil", "fin", "scope"] },
  { id: "arch", name: "ARCH OF RECORD", role: "Halverson Kim AIA", x: 28, y: 26, size: 14, connections: ["core", "scope"] },
  { id: "elec", name: "ELECTRICAL", role: "Meridian Power", x: 78, y: 28, size: 14, connections: ["core", "mech", "rfi"] },
  { id: "mech", name: "MECH/HVAC", role: "Aurora Mech.", x: 80, y: 60, size: 13, connections: ["core", "elec", "rfi"] },
  { id: "civil", name: "CIVIL/SITE", role: "Pratt Survey", x: 22, y: 66, size: 12, connections: ["core", "fin"] },
  { id: "fin", name: "OWNER FINANCE", role: "Riverside Holdings", x: 12, y: 42, size: 14, connections: ["core", "civil"] },
  { id: "scope", name: "SCOPE / SUBMITTALS", role: "63 packages tracked", x: 50, y: 18, size: 14, connections: ["core", "arch", "rfi"] },
  { id: "rfi", name: "RFI LOG", role: "14 open · 211 closed", x: 60, y: 78, size: 13, connections: ["core", "elec", "mech", "scope"] },
  { id: "punch", name: "PUNCH", role: "Day −7 walk", x: 30, y: 84, size: 11, connections: ["core", "rfi"] },
  { id: "tco", name: "TCO", role: "Critical path target", x: 86, y: 84, size: 12, connections: ["core", "rfi", "mech"] },
];

const PATH = [
  { day: "D−180", node: "Pre-con kickoff · GMP signed" },
  { day: "D−150", node: "Long-lead AHU released to vendor" },
  { day: "D−120", node: "Permit issued · IFC drawings" },
  { day: "D−72", node: "Slab pour / underground rough-in" },
  { day: "D−42", node: "Dry-in · roof / windows" },
  { day: "D−18", node: "Punch issue · 41 items" },
  { day: "D−0", node: "TCO · Owner walk · Closeout" },
];

const SUBS = [
  { name: "MERIDIAN POWER", scope: "Service, branch, fire alarm", last: "Albany 23-018 · TCO clean" },
  { name: "AURORA MECHANICAL", scope: "RTU, ductwork, controls", last: "Riverside 24-011 · Punch 3" },
  { name: "PRATT SURVEY", scope: "Civil, ALTA, layout", last: "Mass Ave 24-004 · As-builts" },
  { name: "BRIDGEWATER STEEL", scope: "Misc metals, stair, rail", last: "Waverly 23-027 · In progress" },
  { name: "NORTH FORK GLASS", scope: "Storefront, interior, ALU", last: "Albany 23-018 · Glazing in" },
  { name: "CARDINAL PAINT", scope: "Drywall, paint, finish", last: "Mass Ave 24-004 · Day 7 of 12" },
];

export default function GalaxyBrainEngine() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const stars = useMemo(() => generateStars(120), []);

  const activeConns = activeId ? NODES.find((n) => n.id === activeId)?.connections ?? [] : [];

  return (
    <>
      <style>{css}</style>
      <div className="gb-shell">
        {/* Star field */}
        <div className="gb-stars" aria-hidden>
          {stars.map((s, i) => (
            <span
              key={i}
              className="gb-star"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                opacity: s.o,
              }}
            />
          ))}
          <div className="gb-nebula" />
          <div className="gb-nebula gb-nebula-2" />
        </div>

        {/* HERO */}
        <section className="gb-hero">
          <div className="gb-hero-text">
            <span className="gb-eyebrow">KPT&nbsp;·&nbsp;GENERAL&nbsp;CONTRACTING</span>
            <h1 className="gb-h1">
              Networks of <em>subs</em>,
              <br />schedules, and
              <br />submittals.
            </h1>
            <p className="gb-sub">
              General contracting on complex commercial work — the dendrite of
              dependencies that keeps a job on critical path. Every sub is a
              node, every RFI a synapse, every schedule a constellation.
            </p>
            <div className="gb-cta-row">
              <button type="button" className="gb-cta gb-cta-primary">
                Map a project
              </button>
              <button type="button" className="gb-cta gb-cta-ghost">
                See the network
              </button>
            </div>
          </div>

          {/* THE BRAIN */}
          <div className="gb-brain" role="figure" aria-label="Network of subs and submittals">
            <svg viewBox="0 0 100 100" className="gb-brain-svg" preserveAspectRatio="xMidYMid meet">
              {/* connections */}
              <g>
                {NODES.flatMap((n) =>
                  n.connections
                    .filter((c) => c > n.id)
                    .map((cid) => {
                      const c = NODES.find((x) => x.id === cid);
                      if (!c) return null;
                      const isActive =
                        activeId &&
                        ((activeId === n.id && n.connections.includes(c.id)) ||
                          (activeId === c.id && c.connections.includes(n.id)));
                      const dx = c.x - n.x;
                      const dy = c.y - n.y;
                      const mx = (n.x + c.x) / 2 + dy * 0.08;
                      const my = (n.y + c.y) / 2 - dx * 0.08;
                      return (
                        <path
                          key={`${n.id}-${cid}`}
                          d={`M${n.x} ${n.y} Q${mx} ${my} ${c.x} ${c.y}`}
                          className={`gb-line ${isActive ? "is-active" : ""}`}
                          fill="none"
                        />
                      );
                    })
                )}
              </g>
              {/* nodes */}
              <g>
                {NODES.map((n) => {
                  const isCore = n.id === "core";
                  const isActive = activeId === n.id;
                  const isLinked = activeConns.includes(n.id);
                  return (
                    <g
                      key={n.id}
                      className={`gb-node ${isCore ? "is-core" : ""} ${isActive ? "is-active" : ""} ${isLinked ? "is-linked" : ""}`}
                      tabIndex={0}
                      role="button"
                      aria-label={`${n.name} — ${n.role}`}
                      onMouseEnter={() => setActiveId(n.id)}
                      onMouseLeave={() => setActiveId(null)}
                      onFocus={() => setActiveId(n.id)}
                      onBlur={() => setActiveId(null)}
                    >
                      <circle cx={n.x} cy={n.y} r={n.size / 8 + 2.4} className="gb-node-halo" />
                      <circle cx={n.x} cy={n.y} r={n.size / 10 + 1.2} className="gb-node-core" />
                      <circle cx={n.x} cy={n.y} r={n.size / 22 + 0.4} className="gb-node-pulse" />
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* Floating label */}
            <div className={`gb-brain-label ${activeId ? "is-shown" : ""}`} role="status" aria-live="polite">
              {(() => {
                const n = NODES.find((x) => x.id === activeId);
                return n ? (
                  <>
                    <span className="gb-brain-label-name">{n.name}</span>
                    <span className="gb-brain-label-role">{n.role}</span>
                  </>
                ) : (
                  <>
                    <span className="gb-brain-label-name">HOVER A NODE</span>
                    <span className="gb-brain-label-role">Synapse fires along connections</span>
                  </>
                );
              })()}
            </div>
          </div>
        </section>

        {/* CRITICAL PATH */}
        <section className="gb-section">
          <h2 className="gb-h2"><em>Critical path.</em> One project, one sequence.</h2>
          <p className="gb-section-sub">
            Riverside Lab Holdings · 24-011 · 5,600 SF tenant work — the spine
            of dependencies between owner finance, MEPs, and TCO.
          </p>
          <ol className="gb-path">
            {PATH.map((p, i) => (
              <li key={p.day} className="gb-path-step" tabIndex={0}>
                <span className="gb-path-dot" aria-hidden>
                  <span />
                </span>
                <span className="gb-path-day">{p.day}</span>
                <span className="gb-path-node">{p.node}</span>
                {i < PATH.length - 1 && <span className="gb-path-line" aria-hidden />}
              </li>
            ))}
          </ol>
        </section>

        {/* SUBS CONSTELLATION */}
        <section className="gb-section">
          <h2 className="gb-h2"><em>Subs constellation.</em> The trade partners we orbit.</h2>
          <p className="gb-section-sub">
            Recurring trades by frequency. Hover a star for last work together.
          </p>
          <ul className="gb-subs">
            {SUBS.map((s, i) => (
              <li key={s.name} className="gb-sub" tabIndex={0} style={{ ["--seed" as never]: i }}>
                <span className="gb-sub-star" aria-hidden>
                  <span className="gb-sub-star-core" />
                  <span className="gb-sub-star-ring" />
                </span>
                <div className="gb-sub-text">
                  <span className="gb-sub-name">{s.name}</span>
                  <span className="gb-sub-scope">{s.scope}</span>
                  <span className="gb-sub-last">{s.last}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* FOOTER */}
        <footer className="gb-foot">
          <div className="gb-foot-l">
            <span className="gb-foot-mark">KPT</span>
            <span className="gb-foot-meta">GENERAL CONTRACTING · BSA/AIA · CSL 091184</span>
          </div>
          <div className="gb-foot-r">
            <span>Procore</span>
            <span>Bluebeam Studio</span>
            <span>Sage 300 CRE</span>
            <span>jobs@kpt.gc</span>
          </div>
        </footer>
      </div>
    </>
  );
}

function generateStars(n: number) {
  // deterministic so SSR matches
  const rng = mulberry32(8);
  return Array.from({ length: n }, () => ({
    x: rng() * 100,
    y: rng() * 100,
    size: 1 + rng() * 1.6,
    o: 0.3 + rng() * 0.7,
  }));
}
function mulberry32(seed: number) {
  let s = seed;
  return () => {
    s |= 0; s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500;1,700&family=Inter:wght@300;400;500;700&display=swap');

  .gb-shell {
    --ink: #06070C;
    --syn: #6CC8E5;
    --syn-bright: #9DE3F2;
    --ember: #E1A84F;
    --ember-bright: #F5C97A;
    --paper: #E9F2F6;
    --muted: rgba(233,242,246,0.6);
    font-family: 'Inter', system-ui, sans-serif;
    background:
      radial-gradient(circle at 20% 0%, rgba(108,200,229,0.07) 0%, transparent 50%),
      radial-gradient(circle at 80% 100%, rgba(225,168,79,0.06) 0%, transparent 55%),
      var(--ink);
    color: var(--paper);
    min-height: 100vh;
    padding: 24px 32px 64px 32px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }
  .gb-stars {
    position: absolute; inset: 0; pointer-events: none;
    z-index: 0;
  }
  .gb-star {
    position: absolute;
    background: var(--paper);
    border-radius: 50%;
    box-shadow: 0 0 4px rgba(255,255,255,0.6);
    animation: gb-twinkle 4s infinite ease-in-out;
  }
  .gb-star:nth-child(3n) { animation-delay: 1.5s; }
  .gb-star:nth-child(5n) { animation-delay: 2.7s; background: var(--syn); }
  .gb-star:nth-child(7n) { animation-delay: 0.6s; background: var(--ember); }
  @keyframes gb-twinkle {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 1; }
  }
  .gb-nebula {
    position: absolute;
    width: 60vw; height: 60vw;
    left: -15vw; top: -10vw;
    background: radial-gradient(circle, rgba(108,200,229,0.18), transparent 60%);
    filter: blur(40px);
  }
  .gb-nebula-2 {
    left: auto; right: -20vw; top: auto; bottom: -10vw;
    background: radial-gradient(circle, rgba(225,168,79,0.12), transparent 60%);
  }
  @media (prefers-reduced-motion: reduce) {
    .gb-star { animation: none; }
  }

  .gb-shell > section, .gb-shell > footer { position: relative; z-index: 1; }

  /* HERO */
  .gb-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
    gap: 48px;
    align-items: center;
    min-height: 78vh;
    padding: 28px 0;
  }
  .gb-eyebrow {
    display: inline-block;
    font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase;
    color: var(--syn);
    margin-bottom: 22px;
    padding: 4px 0 4px 0;
    border-top: 1px solid rgba(108,200,229,0.4);
    border-bottom: 1px solid rgba(108,200,229,0.4);
  }
  .gb-h1 {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-weight: 500;
    font-size: clamp(48px, 7vw, 96px);
    line-height: 1.0;
    letter-spacing: -0.01em;
    margin: 0 0 24px 0;
    color: var(--paper);
  }
  .gb-h1 em {
    font-style: italic;
    background: linear-gradient(120deg, var(--syn) 20%, var(--ember) 80%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: 700;
  }
  .gb-sub {
    font-size: 16px;
    line-height: 1.6;
    max-width: 56ch;
    color: var(--muted);
    margin: 0 0 28px 0;
  }
  .gb-cta-row { display: flex; gap: 12px; flex-wrap: wrap; }
  .gb-cta {
    font: inherit;
    font-size: 12px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 14px 22px;
    border-radius: 999px;
    border: 1px solid var(--syn);
    background: transparent;
    color: var(--paper);
    cursor: pointer;
    transition: background 160ms, color 160ms, transform 160ms, box-shadow 160ms;
  }
  .gb-cta-primary {
    background: linear-gradient(120deg, var(--syn), var(--ember));
    color: var(--ink);
    border: none;
    font-weight: 700;
  }
  .gb-cta:hover, .gb-cta:focus-visible {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(108,200,229,0.4);
    outline: none;
  }
  .gb-cta-ghost:hover {
    background: rgba(108,200,229,0.12);
  }

  /* BRAIN */
  .gb-brain {
    position: relative;
    aspect-ratio: 1 / 1;
    width: 100%;
    max-width: 620px;
    margin-left: auto;
  }
  .gb-brain-svg {
    width: 100%; height: 100%;
    overflow: visible;
  }
  .gb-line {
    stroke: rgba(108,200,229,0.22);
    stroke-width: 0.18;
    transition: stroke 200ms, stroke-width 200ms;
  }
  .gb-line.is-active {
    stroke: var(--ember);
    stroke-width: 0.45;
    stroke-dasharray: 1 1.8;
    animation: gb-pulse-line 1.4s linear infinite;
  }
  @keyframes gb-pulse-line {
    from { stroke-dashoffset: 0; }
    to { stroke-dashoffset: -8; }
  }
  @media (prefers-reduced-motion: reduce) {
    .gb-line.is-active { animation: none; stroke-dasharray: none; }
  }
  .gb-node { cursor: pointer; }
  .gb-node:focus { outline: none; }
  .gb-node-halo {
    fill: rgba(108,200,229,0.08);
    transition: fill 200ms, r 200ms;
  }
  .gb-node-core {
    fill: var(--syn);
    transition: fill 200ms, r 200ms;
    filter: drop-shadow(0 0 1.6px rgba(108,200,229,0.7));
  }
  .gb-node.is-core .gb-node-core { fill: var(--ember); }
  .gb-node.is-core .gb-node-halo { fill: rgba(225,168,79,0.18); }
  .gb-node-pulse {
    fill: var(--paper);
    opacity: 0.9;
  }
  .gb-node:hover .gb-node-halo, .gb-node.is-active .gb-node-halo, .gb-node:focus-visible .gb-node-halo {
    fill: rgba(225,168,79,0.32);
  }
  .gb-node:hover .gb-node-core, .gb-node.is-active .gb-node-core, .gb-node:focus-visible .gb-node-core {
    fill: var(--ember-bright);
  }
  .gb-node.is-linked .gb-node-core { fill: var(--syn-bright); }
  .gb-node.is-linked .gb-node-halo { fill: rgba(108,200,229,0.24); }

  .gb-brain-label {
    position: absolute;
    bottom: 0; left: 50%;
    transform: translate(-50%, 100%);
    background: rgba(6,7,12,0.86);
    border: 1px solid rgba(108,200,229,0.4);
    backdrop-filter: blur(10px);
    padding: 10px 16px;
    display: flex; flex-direction: column; gap: 4px;
    min-width: 240px; text-align: center;
    border-radius: 12px;
    box-shadow: 0 12px 32px rgba(0,0,0,0.6);
    transition: opacity 160ms;
    opacity: 0.6;
  }
  .gb-brain-label.is-shown { opacity: 1; }
  .gb-brain-label-name {
    font-size: 13px; letter-spacing: 0.18em; color: var(--ember);
    font-weight: 700;
  }
  .gb-brain-label-role { font-size: 12px; color: var(--muted); }

  /* SECTIONS */
  .gb-section {
    margin: 96px 0;
  }
  .gb-h2 {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-weight: 500;
    font-size: clamp(32px, 4vw, 56px);
    margin: 0 0 12px 0;
    color: var(--paper);
  }
  .gb-h2 em {
    background: linear-gradient(120deg, var(--syn), var(--ember));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: 700;
  }
  .gb-section-sub {
    font-size: 14px;
    color: var(--muted);
    margin: 0 0 28px 0;
    max-width: 60ch;
    line-height: 1.5;
  }

  /* PATH */
  .gb-path { list-style: none; padding: 0; margin: 0; display: grid; gap: 0; }
  .gb-path-step {
    display: grid;
    grid-template-columns: 36px 100px 1fr;
    align-items: center;
    gap: 18px;
    padding: 14px 0;
    position: relative;
    cursor: pointer;
    transition: padding 140ms;
  }
  .gb-path-step:hover, .gb-path-step:focus-visible {
    padding-left: 6px;
    outline: none;
  }
  .gb-path-dot {
    position: relative;
    width: 18px; height: 18px;
    display: inline-grid; place-items: center;
  }
  .gb-path-dot::before {
    content: "";
    position: absolute; inset: 4px;
    background: var(--syn);
    border-radius: 50%;
    box-shadow: 0 0 12px rgba(108,200,229,0.7);
  }
  .gb-path-step:hover .gb-path-dot::before, .gb-path-step:focus-visible .gb-path-dot::before {
    background: var(--ember);
    box-shadow: 0 0 16px rgba(225,168,79,0.7);
  }
  .gb-path-line {
    position: absolute;
    left: 17px; top: 100%;
    width: 1px; height: 100%;
    background: linear-gradient(to bottom, var(--syn), transparent);
    opacity: 0.32;
  }
  .gb-path-day {
    font-family: 'Inter', monospace;
    font-size: 12px; letter-spacing: 0.18em;
    color: var(--ember);
    font-weight: 700;
  }
  .gb-path-node { font-size: 14px; color: var(--paper); }

  /* SUBS */
  .gb-subs {
    list-style: none; padding: 0; margin: 0;
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px;
  }
  .gb-sub {
    display: flex; gap: 18px; align-items: flex-start;
    padding: 22px;
    border: 1px solid rgba(108,200,229,0.18);
    border-radius: 14px;
    background: rgba(108,200,229,0.04);
    cursor: pointer;
    transition: transform 160ms, border-color 160ms, background 160ms;
  }
  .gb-sub:hover, .gb-sub:focus-visible {
    transform: translateY(-3px);
    border-color: var(--ember);
    background: rgba(225,168,79,0.08);
    outline: none;
  }
  .gb-sub-star {
    position: relative;
    width: 28px; height: 28px;
    flex-shrink: 0;
  }
  .gb-sub-star-core {
    position: absolute; inset: 8px;
    background: var(--syn);
    border-radius: 50%;
    box-shadow: 0 0 12px var(--syn);
  }
  .gb-sub:hover .gb-sub-star-core, .gb-sub:focus-visible .gb-sub-star-core {
    background: var(--ember);
    box-shadow: 0 0 16px var(--ember);
  }
  .gb-sub-star-ring {
    position: absolute; inset: 0;
    border: 1px solid rgba(108,200,229,0.5);
    border-radius: 50%;
    animation: gb-orbit 6s linear infinite;
  }
  @keyframes gb-orbit {
    from { transform: rotate(0deg) scale(1); }
    to { transform: rotate(360deg) scale(1.04); }
  }
  @media (prefers-reduced-motion: reduce) {
    .gb-sub-star-ring { animation: none; }
  }
  .gb-sub-text { display: flex; flex-direction: column; gap: 4px; }
  .gb-sub-name { font-size: 13px; letter-spacing: 0.14em; font-weight: 700; }
  .gb-sub-scope { font-size: 13px; color: var(--muted); }
  .gb-sub-last { font-size: 12px; color: var(--ember); font-style: italic; margin-top: 6px; }

  /* FOOTER */
  .gb-foot {
    margin-top: 80px;
    padding-top: 28px;
    border-top: 1px solid rgba(108,200,229,0.2);
    display: flex; justify-content: space-between; align-items: baseline;
    flex-wrap: wrap; gap: 18px;
  }
  .gb-foot-mark {
    font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 700;
    font-size: 28px;
    background: linear-gradient(120deg, var(--syn), var(--ember));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-right: 16px;
  }
  .gb-foot-meta { font-size: 11px; letter-spacing: 0.18em; color: var(--muted); }
  .gb-foot-r { display: flex; gap: 22px; flex-wrap: wrap; font-size: 12px; color: var(--muted); }

  @media (max-width: 900px) {
    .gb-hero { grid-template-columns: 1fr; min-height: auto; }
    .gb-brain { max-width: 100%; }
    .gb-subs { grid-template-columns: 1fr; }
    .gb-path-step { grid-template-columns: 30px 80px 1fr; gap: 12px; }
  }
`;
