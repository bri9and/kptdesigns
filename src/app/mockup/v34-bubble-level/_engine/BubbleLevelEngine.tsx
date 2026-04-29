"use client";

/**
 * BubbleLevelEngine — V34 Bubble Level
 *
 * A torpedo-level instrument as the page rail. Three glass vials run across
 * the top — PLUMB / LEVEL / 45° — and the bubble glides toward the active
 * section's vial as the user scrolls. Brass end-caps mark sections; copy
 * lives in the milled-aluminum body of the level. Trade: service plumbing.
 *
 * No Tailwind. Inline <style> only. Reduced-motion locks the bubble center.
 */

import { useEffect, useRef, useState } from "react";

const VIALS = [
  { id: "plumb", label: "PLUMB", note: "Vertical work" },
  { id: "level", label: "LEVEL", note: "Horizontal runs" },
  { id: "forty", label: "45°", note: "Offsets, traps" },
] as const;

const PLUMB_ITEMS = [
  { spec: "DWV STACK · 3\" PVC", note: "Vent up through plate, plumb to within 1/8\" over 8'." },
  { spec: "RISER · COPPER L", note: "Lav rough-in trued to the stud, no kicked plumb." },
  { spec: "CLOSET FLANGE", note: "Top of flange 1/4\" proud of finished tile, dead level." },
];

const LEVEL_ITEMS = [
  { spec: "TRAP ARM · 1/4 IN/FT", note: "Lav to stack, fall scribed on the joist." },
  { spec: "BUILDING DRAIN · 4\" PVC", note: "Cleanout to street, 1/8\"/ft minimum, 1/4\"/ft preferred." },
  { spec: "WATER MAIN · 3/4\" PEX-A", note: "Run buried, pressure-tested 80 psi for 15 min — held." },
];

const FORTY_ITEMS = [
  { spec: "OFFSET · 22.5° + 22.5°", note: "Around the joist drop, no double-trap." },
  { spec: "TWO 45° SWEEPS", note: "Cleaner flow than a single 90° at the stack." },
  { spec: "P-TRAP DEPTH · 2\"", note: "Sealed by the seal — measured wet." },
];

const FLANGES = [
  { id: "F-01", caption: "Closet flange, shimmed plumb with cedar shake — winter rough." },
  { id: "F-02", caption: "Hub-and-spigot wiped clean, still warm from the iron." },
  { id: "F-03", caption: "1/2\" copper stub-out, sweat joint cooled, no flux smear." },
  { id: "F-04", caption: "PEX-A manifold, color-coded, labeled by fixture." },
];

export default function BubbleLevelEngine() {
  const [active, setActive] = useState<number>(1); // start on LEVEL (centered)
  const [reduced, setReduced] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const opts = { threshold: 0.45, rootMargin: "-20% 0px -30% 0px" };
    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length === 0) return;
      const top = visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      const idx = Number((top.target as HTMLElement).dataset.vial);
      if (!Number.isNaN(idx)) setActive(idx);
    }, opts);

    sectionRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [reduced]);

  // Bubble position: 0 → left vial, 1 → middle, 2 → right.
  const bubblePct = reduced ? 50 : 16.6 + active * 33.3;

  return (
    <div className="bl-root">
      <style>{css}</style>

      {/* ── HERO — torpedo level body ──────────────────────────────── */}
      <header className="bl-hero">
        <div className="bl-aluminum">
          <div className="bl-stencil">
            <div className="bl-stencil-line">KPT · INSTRUMENT GRADE</div>
            <div className="bl-stencil-serial">SN · 0034 · TORPEDO · 9IN</div>
          </div>

          <div className="bl-vial-rail" role="presentation">
            {VIALS.map((v, i) => {
              const isActive = active === i;
              return (
                <button
                  type="button"
                  key={v.id}
                  className={`bl-cap${isActive ? " bl-cap-on" : ""}`}
                  onClick={() => {
                    setActive(i);
                    sectionRefs.current[i]?.scrollIntoView({
                      behavior: reduced ? "auto" : "smooth",
                      block: "start",
                    });
                  }}
                  aria-label={`Jump to ${v.label} section`}
                >
                  <span className="bl-cap-label">{v.label}</span>
                  <span className="bl-cap-note">{v.note}</span>
                </button>
              );
            })}

            {/* the long vial chamber */}
            <div className="bl-vial-glass" aria-hidden>
              <div className="bl-vial-fluid" />
              <div className="bl-vial-marks">
                <span style={{ left: "16.6%" }} />
                <span style={{ left: "50%" }} />
                <span style={{ left: "83.3%" }} />
              </div>
              <div
                className="bl-bubble"
                style={{ left: `calc(${bubblePct}% - 22px)` }}
              />
            </div>
          </div>

          <div className="bl-headline">
            <div className="bl-eyebrow">DISPATCH 04 · 28 · LATE EDITION</div>
            <h1>
              Plumb. <em>Level.</em> Tested.
            </h1>
            <p>
              Service plumbing for the houses where nothing&rsquo;s supposed to leave plumb &mdash;
              DWV rough-in, repipe, and the inspection that didn&rsquo;t punch.
            </p>
            <div className="bl-cta-row">
              <a className="bl-btn bl-btn-primary" href="#run-the-vials">Call a plumber</a>
              <a className="bl-btn bl-btn-ghost" href="#inspection">Book a level-check</a>
            </div>
          </div>
        </div>
      </header>

      {/* ── RUN THE VIALS ───────────────────────────────────────────── */}
      <section
        id="run-the-vials"
        className="bl-section"
        data-vial={0}
        ref={(el) => { sectionRefs.current[0] = el; }}
      >
        <div className="bl-section-head">
          <span className="bl-section-tag">VIAL 01</span>
          <h2>Plumb &mdash; vertical work</h2>
          <p>The stack rises, the riser stands, the flange sits proud of the tile. We don&rsquo;t leave a job until a 9&Prime; torpedo says yes on every face.</p>
        </div>
        <ul className="bl-spec-list">
          {PLUMB_ITEMS.map((it) => (
            <li key={it.spec}>
              <span className="bl-spec-label">{it.spec}</span>
              <span className="bl-spec-note">{it.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="bl-section"
        data-vial={1}
        ref={(el) => { sectionRefs.current[1] = el; }}
      >
        <div className="bl-section-head">
          <span className="bl-section-tag">VIAL 02</span>
          <h2>Level &mdash; horizontal runs</h2>
          <p>Drains have to fall. Mains have to hold. Trap arms run 1/4&Prime; per foot or the inspector hands you a punch list.</p>
        </div>
        <ul className="bl-spec-list">
          {LEVEL_ITEMS.map((it) => (
            <li key={it.spec}>
              <span className="bl-spec-label">{it.spec}</span>
              <span className="bl-spec-note">{it.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="bl-section"
        data-vial={2}
        ref={(el) => { sectionRefs.current[2] = el; }}
      >
        <div className="bl-section-head">
          <span className="bl-section-tag">VIAL 03</span>
          <h2>45&deg; &mdash; offsets and traps</h2>
          <p>Two 22.5&deg; sweeps beat a single 90&deg;. Two 45&deg; offsets clear a joist without doubling the trap. The vial reads truth at the bevel.</p>
        </div>
        <ul className="bl-spec-list">
          {FORTY_ITEMS.map((it) => (
            <li key={it.spec}>
              <span className="bl-spec-label">{it.spec}</span>
              <span className="bl-spec-note">{it.note}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── CLOSET FLANGE GALLERY ───────────────────────────────────── */}
      <section className="bl-gallery">
        <div className="bl-section-head">
          <span className="bl-section-tag">GALLERY · TRIM-OUT</span>
          <h2>Closet flange, copper stub, manifold</h2>
          <p>Macro detail captioned in monospace. The work is the proof.</p>
        </div>
        <div className="bl-gallery-grid">
          {FLANGES.map((f) => (
            <figure key={f.id} className="bl-flange">
              <div className="bl-flange-art" aria-hidden>
                <svg viewBox="0 0 200 200" width="100%" height="100%">
                  <defs>
                    <radialGradient id={`grad-${f.id}`} cx="50%" cy="50%" r="55%">
                      <stop offset="0%" stopColor="#2A2C30" />
                      <stop offset="60%" stopColor="#1B1D21" />
                      <stop offset="100%" stopColor="#0F1114" />
                    </radialGradient>
                  </defs>
                  <rect width="200" height="200" fill={`url(#grad-${f.id})`} />
                  <circle cx="100" cy="100" r="58" fill="none" stroke="#C7C9CB" strokeWidth="2.5" />
                  <circle cx="100" cy="100" r="44" fill="none" stroke="#C7C9CB" strokeWidth="1" opacity="0.55" />
                  <circle cx="100" cy="100" r="22" fill="#0F1114" stroke="#E0B348" strokeWidth="1" />
                  {[0, 60, 120, 180, 240, 300].map((deg) => {
                    const r = 58;
                    const x = 100 + r * Math.cos((deg * Math.PI) / 180);
                    const y = 100 + r * Math.sin((deg * Math.PI) / 180);
                    return <circle key={deg} cx={x} cy={y} r="2.5" fill="#E0B348" />;
                  })}
                  <line x1="100" y1="20" x2="100" y2="180" stroke="#E0B348" strokeWidth="0.5" opacity="0.35" />
                  <line x1="20" y1="100" x2="180" y2="100" stroke="#E0B348" strokeWidth="0.5" opacity="0.35" />
                </svg>
              </div>
              <figcaption>
                <span className="bl-flange-id">{f.id}</span>
                <span className="bl-flange-cap">{f.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── INSPECTION SLIP ─────────────────────────────────────────── */}
      <section id="inspection" className="bl-inspect">
        <div className="bl-slip">
          <div className="bl-slip-head">
            <span>BUILDING DEPT &middot; ROUGH INSPECTION</span>
            <span>FORM IR-12</span>
          </div>
          <div className="bl-slip-body">
            <div className="bl-slip-row">
              <span>PROJECT</span>
              <span>2218 ELM &middot; SFR REPIPE</span>
            </div>
            <div className="bl-slip-row">
              <span>CONTRACTOR</span>
              <span>KPT PLUMBING &middot; LIC PB-04412</span>
            </div>
            <div className="bl-slip-row">
              <span>DATE</span>
              <span>2026 &middot; 04 &middot; 28</span>
            </div>
            <div className="bl-slip-row">
              <span>INSPECTOR</span>
              <span>R. M.</span>
            </div>
            <div className="bl-stamp">
              <span>PASS</span>
              <span>NO PUNCH</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="bl-foot">
        <div>KPT &middot; SERVICE PLUMBING</div>
        <div>MASTER PLUMBER LIC PB-04412</div>
        <div>UPC &sect;1101 &middot; DWV CHAPTER 7</div>
      </footer>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap');

  .bl-root {
    --aluminum: #C7C9CB;
    --aluminum-deep: #9B9DA0;
    --aluminum-dark: #5C5E62;
    --vial-amber: #E0B348;
    --vial-glow: #F4CC6B;
    --plumb-black: #131516;
    --plumb-deep: #0A0B0C;
    --paper: #ECECEA;
    --brass: #C99A4A;
    font-family: 'Inter', system-ui, sans-serif;
    color: var(--paper);
    background: var(--plumb-black);
    min-height: 100vh;
    line-height: 1.55;
  }

  .bl-root *, .bl-root *::before, .bl-root *::after { box-sizing: border-box; }
  .bl-root h1, .bl-root h2 {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  .bl-hero {
    padding: clamp(40px, 6vw, 80px) clamp(20px, 4vw, 60px) 60px;
  }

  .bl-aluminum {
    position: relative;
    background:
      linear-gradient(180deg, #D9DBDC 0%, #B5B7BA 30%, #C7C9CB 55%, #9B9DA0 100%);
    border: 1px solid #2C2E32;
    border-radius: 6px;
    padding: clamp(28px, 3vw, 48px) clamp(24px, 4vw, 56px) clamp(36px, 4vw, 56px);
    color: var(--plumb-black);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.6),
      inset 0 -1px 0 rgba(0,0,0,0.25),
      0 24px 60px -32px rgba(0,0,0,0.85);
    overflow: hidden;
  }
  .bl-aluminum::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      repeating-linear-gradient(90deg, rgba(0,0,0,0.04) 0 1px, transparent 1px 4px),
      repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 3px);
    pointer-events: none;
    mix-blend-mode: multiply;
    opacity: 0.6;
  }

  .bl-stencil {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    color: var(--plumb-black);
    opacity: 0.7;
    margin-bottom: 28px;
    border-top: 1px solid rgba(0,0,0,0.18);
    border-bottom: 1px solid rgba(0,0,0,0.18);
    padding: 8px 0;
    text-transform: uppercase;
  }

  .bl-vial-rail {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0;
    align-items: stretch;
    margin-bottom: 36px;
    background: linear-gradient(180deg, #84878B 0%, #6B6E72 100%);
    border-top: 1px solid #2C2E32;
    border-bottom: 1px solid #2C2E32;
    border-radius: 4px;
    padding: 18px 0 36px;
  }

  .bl-cap {
    background: linear-gradient(180deg, #D8AF5C 0%, #B98C36 100%);
    border: 1px solid #6F5320;
    border-radius: 3px;
    margin: 0 8px;
    padding: 10px 14px;
    color: var(--plumb-black);
    text-align: left;
    font-family: 'JetBrains Mono', monospace;
    cursor: pointer;
    transition: transform 140ms ease, box-shadow 140ms ease, background 140ms ease;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 0 rgba(0,0,0,0.35);
    z-index: 2;
  }
  .bl-cap:hover, .bl-cap:focus-visible {
    transform: translateY(-2px);
    background: linear-gradient(180deg, #E5BB66 0%, #C8993E 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.6), 0 4px 0 rgba(0,0,0,0.4);
    outline: none;
  }
  .bl-cap-on {
    background: linear-gradient(180deg, #F0C66E 0%, #D2A042 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.7), 0 5px 0 rgba(0,0,0,0.5);
  }
  .bl-cap-label {
    display: block;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.16em;
  }
  .bl-cap-note {
    display: block;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0.7;
    margin-top: 2px;
  }

  .bl-vial-glass {
    position: absolute;
    left: 18%;
    right: 18%;
    bottom: 6px;
    height: 22px;
    background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.18) 50%, rgba(0,0,0,0.15));
    border: 1px solid rgba(0,0,0,0.45);
    border-radius: 12px;
    overflow: visible;
    box-shadow: inset 0 1px 2px rgba(255,255,255,0.45), inset 0 -2px 4px rgba(0,0,0,0.35);
  }
  .bl-vial-fluid {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, rgba(224,179,72,0.55) 0%, rgba(196,140,40,0.4) 60%, rgba(120,84,20,0.3) 100%);
    border-radius: 12px;
    mix-blend-mode: screen;
  }
  .bl-vial-marks { position: absolute; inset: 0; }
  .bl-vial-marks span {
    position: absolute;
    top: -4px;
    bottom: -4px;
    width: 1px;
    background: rgba(0,0,0,0.55);
  }
  .bl-bubble {
    position: absolute;
    top: -2px;
    width: 44px;
    height: 24px;
    border-radius: 14px;
    background: radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 30%, rgba(255,235,180,0.18) 60%, transparent 80%);
    border: 1px solid rgba(255,255,255,0.55);
    box-shadow: inset 0 0 8px rgba(255,255,255,0.6);
    transition: left 580ms cubic-bezier(0.22, 0.96, 0.32, 1);
    pointer-events: none;
  }
  @media (prefers-reduced-motion: reduce) {
    .bl-bubble { transition: none; }
  }

  .bl-headline {
    position: relative;
    z-index: 2;
    display: grid;
    gap: 16px;
    max-width: 880px;
  }
  .bl-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--plumb-black);
    opacity: 0.65;
  }
  .bl-headline h1 {
    font-size: clamp(36px, 6vw, 76px);
    line-height: 0.96;
    letter-spacing: -0.02em;
    margin: 0;
    color: var(--plumb-black);
  }
  .bl-headline h1 em {
    font-style: normal;
    color: #6F5320;
    border-bottom: 4px solid #6F5320;
    padding-bottom: 2px;
  }
  .bl-headline p {
    font-size: clamp(15px, 1.4vw, 18px);
    margin: 4px 0 8px;
    color: #1F2126;
    max-width: 640px;
  }

  .bl-cta-row { display: flex; gap: 12px; flex-wrap: wrap; }
  .bl-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 3px;
    transition: transform 140ms ease, background 140ms ease, color 140ms ease;
  }
  .bl-btn-primary {
    background: var(--plumb-black);
    color: var(--vial-glow);
    border: 1px solid var(--plumb-black);
  }
  .bl-btn-primary:hover, .bl-btn-primary:focus-visible {
    background: var(--vial-amber);
    color: var(--plumb-black);
    transform: translateY(-1px);
    outline: none;
  }
  .bl-btn-ghost {
    background: transparent;
    color: var(--plumb-black);
    border: 1px solid var(--plumb-black);
  }
  .bl-btn-ghost:hover, .bl-btn-ghost:focus-visible {
    background: var(--plumb-black);
    color: var(--vial-glow);
    transform: translateY(-1px);
    outline: none;
  }

  .bl-section {
    max-width: 1080px;
    margin: 0 auto;
    padding: clamp(40px, 5vw, 80px) clamp(20px, 4vw, 48px);
    border-top: 1px solid rgba(199,201,203,0.08);
  }
  .bl-section-head { margin-bottom: 28px; }
  .bl-section-tag {
    display: inline-block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.22em;
    color: var(--vial-amber);
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .bl-section-head h2 {
    font-size: clamp(26px, 3vw, 40px);
    margin: 0 0 8px;
  }
  .bl-section-head p {
    font-size: 15px;
    color: rgba(236,236,234,0.78);
    max-width: 640px;
  }

  .bl-spec-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 1px;
    background: rgba(199,201,203,0.12);
    border: 1px solid rgba(199,201,203,0.15);
  }
  .bl-spec-list li {
    background: var(--plumb-black);
    padding: 16px 20px;
    display: grid;
    grid-template-columns: minmax(220px, 280px) 1fr;
    gap: 24px;
    transition: background 140ms ease;
  }
  .bl-spec-list li:hover { background: #1A1D20; }
  .bl-spec-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    color: var(--vial-amber);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .bl-spec-note { color: rgba(236,236,234,0.92); font-size: 14px; }

  .bl-gallery {
    max-width: 1080px;
    margin: 0 auto;
    padding: clamp(40px, 5vw, 80px) clamp(20px, 4vw, 48px);
    border-top: 1px solid rgba(199,201,203,0.08);
  }
  .bl-gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    margin-top: 24px;
  }
  .bl-flange {
    margin: 0;
    border: 1px solid rgba(199,201,203,0.18);
    background: var(--plumb-deep);
    transition: transform 220ms ease, border-color 220ms ease;
  }
  .bl-flange:hover, .bl-flange:focus-within {
    transform: translateY(-3px);
    border-color: var(--vial-amber);
  }
  .bl-flange-art { aspect-ratio: 1 / 1; background: #0F1114; }
  .bl-flange figcaption { padding: 12px 14px; display: grid; gap: 4px; font-size: 12px; }
  .bl-flange-id {
    font-family: 'JetBrains Mono', monospace;
    color: var(--vial-amber);
    letter-spacing: 0.14em;
  }
  .bl-flange-cap { color: rgba(236,236,234,0.85); line-height: 1.5; }

  .bl-inspect {
    max-width: 720px;
    margin: 0 auto;
    padding: clamp(40px, 5vw, 80px) clamp(20px, 4vw, 48px);
  }
  .bl-slip {
    background: #F2EEE2;
    color: var(--plumb-black);
    border: 1px solid #1F2126;
    border-radius: 2px;
    overflow: hidden;
    box-shadow: 0 18px 50px -28px rgba(0,0,0,0.6);
    background-image: repeating-linear-gradient(0deg, rgba(0,0,0,0.025) 0 1px, transparent 1px 28px);
  }
  .bl-slip-head {
    display: flex;
    justify-content: space-between;
    background: var(--plumb-black);
    color: var(--paper);
    padding: 10px 18px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }
  .bl-slip-body { padding: 24px 22px; }
  .bl-slip-row {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px dashed rgba(0,0,0,0.18);
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.05em;
  }
  .bl-slip-row span:first-child { color: rgba(0,0,0,0.55); }
  .bl-stamp {
    margin-top: 22px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 14px 24px;
    border: 3px solid #B0241B;
    color: #B0241B;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    letter-spacing: 0.18em;
    transform: rotate(-4deg);
    background: rgba(176,36,27,0.04);
  }
  .bl-stamp span:first-child { font-size: 22px; }
  .bl-stamp span:last-child { font-size: 11px; }

  .bl-foot {
    border-top: 1px solid rgba(199,201,203,0.12);
    padding: 20px clamp(20px, 4vw, 48px);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(236,236,234,0.65);
  }

  @media (max-width: 720px) {
    .bl-cap-note { display: none; }
    .bl-spec-list li { grid-template-columns: 1fr; gap: 6px; }
    .bl-slip-row { grid-template-columns: 100px 1fr; }
    .bl-vial-glass { left: 6%; right: 6%; }
  }
`;
