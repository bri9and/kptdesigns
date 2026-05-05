"use client";

/**
 * GreenhouseEngine — V61 Greenhouse
 *
 * Glass mullion grid with condensation drift. Terracotta pots line a bench
 * in the lower third; filtered sun stripes the page through the mullions.
 * Hover on a pot lifts the plant slightly and reveals the Latin name +
 * USDA zone. Reduced motion stops condensation + dewdrop trail.
 */

import { useEffect, useState } from "react";

type Plant = {
  pot: string;
  common: string;
  latin: string;
  zone: string;
  use: string;
  fill: string;
  fronds: number;
};

const PLANTS: Plant[] = [
  { pot: "P-1", common: "Limelight Hydrangea", latin: "Hydrangea paniculata 'Limelight'", zone: "USDA 3–8", use: "Hardscape edge", fill: "#9CB36C", fronds: 5 },
  { pot: "P-2", common: "Crimson Pygmy Barberry", latin: "Berberis thunbergii 'Crimson Pygmy'", zone: "USDA 4–8", use: "Soft border", fill: "#A6483B", fronds: 6 },
  { pot: "P-3", common: "Dwarf Mountain Laurel", latin: "Kalmia latifolia 'Elf'", zone: "USDA 5–9", use: "Shade pocket", fill: "#5C8753", fronds: 4 },
  { pot: "P-4", common: "Karl Foerster Grass", latin: "Calamagrostis × acutiflora", zone: "USDA 4–9", use: "Wind break", fill: "#C9A85C", fronds: 7 },
  { pot: "P-5", common: "Russian Sage", latin: "Perovskia atriplicifolia", zone: "USDA 5–9", use: "Pollinator drift", fill: "#7B86A5", fronds: 5 },
  { pot: "P-6", common: "Coral Bark Maple", latin: "Acer palmatum 'Sango Kaku'", zone: "USDA 5–8", use: "Specimen", fill: "#C0533A", fronds: 6 },
];

const SEASONS = [
  { name: "Spring", color: "#9CB36C", potting: ["Itea virginica", "Aronia 'Brilliantissima'", "Amsonia hubrichtii", "Carex appalachica"] },
  { name: "Summer", color: "#5C8753", potting: ["Hydrangea quercifolia", "Echinacea 'Magnus'", "Salvia 'Caradonna'", "Pennisetum alopecuroides"] },
  { name: "Fall", color: "#C9A85C", potting: ["Aster 'October Skies'", "Solidago rugosa 'Fireworks'", "Schizachyrium scoparium", "Sedum 'Autumn Joy'"] },
  { name: "Winter", color: "#7B86A5", potting: ["Ilex verticillata", "Cornus sericea 'Cardinal'", "Pinus mugo", "Betula nigra (bark)"] },
];

const INSTALLS = [
  { name: "The Brookline Patio", spec: "1,200 SF · bluestone · 18 species", season: "Installed Apr 2025" },
  { name: "Wellesley Front Garden", spec: "Native drift · USDA 6a tested", season: "Installed Sep 2024" },
  { name: "Carlisle Pollinator Mead", spec: "0.4 acre meadow · spring sown", season: "Installed Jun 2024" },
  { name: "Concord Shade Walk", spec: "Native fern + Kalmia · clay loam", season: "Installed May 2024" },
];

export default function GreenhouseEngine() {
  const [hover, setHover] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);
  const [drops, setDrops] = useState<{ x: number; y: number; id: number }[]>([]);
  const [season, setSeason] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let n = 0;
    const onMove = (e: MouseEvent) => {
      n += 1;
      if (n % 6 !== 0) return;
      const id = Date.now() + Math.random();
      setDrops((d) => [...d.slice(-12), { x: e.clientX, y: e.clientY, id }]);
      setTimeout(() => {
        setDrops((d) => d.filter((p) => p.id !== id));
      }, 1200);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  return (
    <>
      <style>{css}</style>
      <div className="gh-shell">
        {/* GLASS MULLION GRID */}
        <div className="gh-mullions" aria-hidden>
          <div className="gh-vmull" style={{ left: "16%" }} />
          <div className="gh-vmull" style={{ left: "32%" }} />
          <div className="gh-vmull" style={{ left: "48%" }} />
          <div className="gh-vmull" style={{ left: "64%" }} />
          <div className="gh-vmull" style={{ left: "80%" }} />
          <div className="gh-hmull" style={{ top: "22%" }} />
          <div className="gh-hmull" style={{ top: "44%" }} />
          <div className="gh-hmull" style={{ top: "66%" }} />
          <div className="gh-sun" />
          <div className="gh-conden" />
          <div className="gh-conden gh-conden-2" />
        </div>

        {!reduced && drops.map((d) => (
          <span key={d.id} className="gh-drop" style={{ left: d.x, top: d.y }} aria-hidden />
        ))}

        {/* MASTHEAD */}
        <header className="gh-mast">
          <div className="gh-mark">
            <span className="gh-mark-leaf" aria-hidden>
              <svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2C7 6 4 11 4 16c0 3 2 6 6 6 4 0 6-3 6-6 0-1-1-3-2-4 4-1 4-7 0-10z" fill="#5C8753" /></svg>
            </span>
            <div>
              <span className="gh-mark-name">FERNCROFT &amp; SCRIBE</span>
              <span className="gh-mark-est">Design–build · USDA 6a · Est. 2008</span>
            </div>
          </div>
          <nav className="gh-nav" aria-label="Primary">
            <a href="#growing">What&rsquo;s growing</a>
            <a href="#season">By season</a>
            <a href="#installs">Recent installs</a>
            <a href="#contact">Visit the bench</a>
          </nav>
        </header>

        {/* HERO */}
        <section className="gh-hero">
          <div className="gh-eyebrow">— Working greenhouse · Bench No. 4 · 67° F · 64% RH —</div>
          <h1 className="gh-headline">
            Hardscape, softscape,
            <br />
            <em>and a greenhouse</em>
            <br />
            full of what comes next.
          </h1>
          <p className="gh-sub">
            Residential landscape design and install — a working greenhouse
            on-site, every spec lifted from a plant we&rsquo;ve actually grown.
            Pollinator-first, native-leaning, watered by hand the first season.
          </p>
          <div className="gh-cta-row">
            <a className="gh-cta gh-cta-primary" href="#growing">Walk the greenhouse</a>
            <a className="gh-cta" href="#installs">See the spec</a>
          </div>
        </section>

        {/* WHAT'S GROWING — POT BENCH */}
        <section id="growing" className="gh-bench-section">
          <div className="gh-h2-row">
            <h2 className="gh-h2">What&rsquo;s growing on the bench</h2>
            <span className="gh-aside">Hover a pot — the plant lifts.</span>
          </div>
          <div className="gh-bench">
            <div className="gh-bench-board" aria-hidden />
            {PLANTS.map((p, i) => (
              <button
                key={p.pot}
                type="button"
                className={`gh-pot${hover === i ? " is-hover" : ""}`}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                aria-describedby={`tag-${p.pot}`}
              >
                <span className="gh-fronds" aria-hidden style={{ ["--fill" as string]: p.fill }}>
                  {Array.from({ length: p.fronds }).map((_, k) => (
                    <span
                      key={k}
                      className="gh-frond"
                      style={{
                        ["--rot" as string]: `${-(p.fronds - 1) * 8 + k * 16}deg`,
                        ["--scale" as string]: 0.85 + (k % 3) * 0.08,
                      }}
                    />
                  ))}
                </span>
                <span className="gh-pot-vessel" aria-hidden />
                <span id={`tag-${p.pot}`} className="gh-tag">
                  <span className="gh-tag-pot">{p.pot}</span>
                  <span className="gh-tag-common">{p.common}</span>
                  <span className="gh-tag-latin">{p.latin}</span>
                  <span className="gh-tag-zone">{p.zone} · {p.use}</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* BY SEASON */}
        <section id="season" className="gh-season-section">
          <div className="gh-h2-row">
            <h2 className="gh-h2">By season</h2>
            <span className="gh-aside">What we&rsquo;re potting up right now.</span>
          </div>
          <div className="gh-season-tabs" role="tablist">
            {SEASONS.map((s, i) => (
              <button
                key={s.name}
                type="button"
                role="tab"
                aria-selected={season === i}
                className={`gh-tab${season === i ? " is-on" : ""}`}
                style={{ ["--accent" as string]: s.color }}
                onClick={() => setSeason(i)}
              >
                {s.name}
              </button>
            ))}
          </div>
          <ul className="gh-season-list" role="tabpanel">
            {SEASONS[season].potting.map((spec, k) => (
              <li key={spec} className="gh-season-row">
                <span className="gh-season-num">{String(k + 1).padStart(2, "0")}</span>
                <span className="gh-season-spec">{spec}</span>
                <span className="gh-season-fill" style={{ background: SEASONS[season].color }} />
              </li>
            ))}
          </ul>
        </section>

        {/* RECENT INSTALLS */}
        <section id="installs" className="gh-installs-section">
          <div className="gh-h2-row">
            <h2 className="gh-h2">Recent installs</h2>
            <span className="gh-aside">Mounted on the glass behind the bench.</span>
          </div>
          <div className="gh-glass-mount">
            {INSTALLS.map((p) => (
              <article key={p.name} className="gh-glass-card" tabIndex={0}>
                <div className="gh-glass-tape" aria-hidden />
                <h3>{p.name}</h3>
                <p>{p.spec}</p>
                <span className="gh-glass-meta">{p.season}</span>
              </article>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className="gh-foot">
          <div className="gh-foot-stamp">
            <span aria-hidden>
              <svg viewBox="0 0 64 64" width="40" height="40">
                <rect x="4" y="4" width="56" height="56" fill="none" stroke="#5C8753" strokeWidth="1.4" />
                <line x1="20" x2="20" y1="4" y2="60" stroke="#5C8753" strokeWidth="0.8" />
                <line x1="44" x2="44" y1="4" y2="60" stroke="#5C8753" strokeWidth="0.8" />
                <line x1="4" x2="60" y1="22" y2="22" stroke="#5C8753" strokeWidth="0.8" />
                <line x1="4" x2="60" y1="44" y2="44" stroke="#5C8753" strokeWidth="0.8" />
              </svg>
            </span>
            <div>
              <span className="gh-foot-title">FERNCROFT &amp; SCRIBE</span>
              <span className="gh-foot-sub">Design · install · maintain</span>
            </div>
          </div>
          <div className="gh-foot-grid">
            <div>
              <span className="gh-foot-tag">FIELD</span>
              <span>14 Stafford Hill Rd.</span>
              <span>Carlisle, MA 01741</span>
            </div>
            <div>
              <span className="gh-foot-tag">CALL</span>
              <span>+1 (978) 555-0142</span>
              <span>Visits by appointment</span>
            </div>
            <div>
              <span className="gh-foot-tag">CREDENTIALS</span>
              <span>ASLA member</span>
              <span>USDA Hardiness Zone 6a</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

const css = `
  .gh-shell {
    --glass: #DCE6E1;
    --glass-deep: #C9D6CF;
    --terracotta: #B6553B;
    --terracotta-dark: #7C3923;
    --leaf: #5C8753;
    --leaf-dark: #2C4A30;
    --mullion: #1A201E;
    --soil: #4A372A;
    --bench: #8B6F4E;
    --bench-dark: #5A4632;
    --tag: #F4EFDF;
    --rule: rgba(26,32,30,0.18);
    background: var(--glass);
    color: var(--mullion);
    min-height: 100vh;
    font-family: "Tiempos Text", "Source Serif Pro", Georgia, serif;
    padding: clamp(28px, 5vw, 64px);
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }

  .gh-mullions { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
  .gh-vmull, .gh-hmull {
    position: absolute;
    background: var(--mullion);
    opacity: 0.92;
    box-shadow: 1px 0 0 rgba(255,255,255,0.18) inset;
  }
  .gh-vmull { top: 0; bottom: 0; width: 6px; }
  .gh-hmull { left: 0; right: 0; height: 6px; }
  .gh-sun {
    position: absolute; inset: 0;
    background:
      linear-gradient(105deg,
        rgba(255,236,180,0.32) 0%,
        rgba(255,236,180,0) 18%,
        rgba(255,236,180,0.22) 36%,
        rgba(255,236,180,0) 56%,
        rgba(255,236,180,0.18) 74%,
        rgba(255,236,180,0) 92%);
    mix-blend-mode: screen;
  }
  .gh-conden {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 60%),
      radial-gradient(120% 50% at 50% 0%, rgba(255,255,255,0.18), transparent 60%);
    animation: gh-drift 30s linear infinite;
    mix-blend-mode: screen;
  }
  .gh-conden-2 {
    background:
      radial-gradient(80% 40% at 30% 10%, rgba(255,255,255,0.22), transparent 70%),
      radial-gradient(70% 30% at 80% 20%, rgba(255,255,255,0.16), transparent 75%);
    animation-duration: 45s;
    animation-direction: reverse;
    opacity: 0.7;
  }
  @keyframes gh-drift {
    0% { transform: translate3d(0, 0, 0); }
    50% { transform: translate3d(2%, 2%, 0); }
    100% { transform: translate3d(0, 0, 0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .gh-conden, .gh-conden-2 { animation: none; }
  }

  .gh-drop {
    position: fixed;
    width: 4px; height: 6px;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    background: rgba(255,255,255,0.7);
    pointer-events: none;
    z-index: 1;
    transform: translate(-50%, -50%);
    animation: gh-drop 1.2s ease-out forwards;
    box-shadow: inset -1px -1px 0 rgba(0,0,0,0.05);
  }
  @keyframes gh-drop {
    0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
    25% { opacity: 0.9; }
    100% { transform: translate(-50%, calc(-50% + 50px)) scale(0.6); opacity: 0; }
  }

  .gh-mast {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 1px solid var(--rule);
    padding-bottom: 16px;
    margin-bottom: 36px;
    flex-wrap: wrap;
    gap: 16px;
  }
  .gh-mark { display: flex; gap: 10px; align-items: center; }
  .gh-mark-leaf { display: inline-flex; }
  .gh-mark-name { display: block; font-weight: 700; letter-spacing: 0.04em; font-size: 14px; font-family: "Fraunces Soft", "Fraunces", "Iowan Old Style", Georgia, serif; }
  .gh-mark-est { display: block; font-style: italic; font-size: 12px; color: rgba(26,32,30,0.7); }

  .gh-nav { display: flex; gap: 22px; flex-wrap: wrap; }
  .gh-nav a {
    color: var(--mullion);
    text-decoration: none;
    font-size: 14px;
    border-bottom: 1px solid transparent;
    padding-bottom: 1px;
    transition: border-color 160ms ease, color 160ms ease;
    font-style: italic;
  }
  .gh-nav a:hover, .gh-nav a:focus-visible { color: var(--leaf-dark); border-color: var(--leaf-dark); outline: none; }

  .gh-hero { position: relative; z-index: 2; padding: 32px 0 56px; }
  .gh-eyebrow {
    font-style: italic;
    font-size: 13px;
    color: var(--leaf-dark);
    letter-spacing: 0.06em;
    margin-bottom: 22px;
  }
  .gh-headline {
    font-family: "Fraunces Soft", "Fraunces", "Iowan Old Style", Georgia, serif;
    font-weight: 600;
    font-size: clamp(40px, 6vw, 96px);
    line-height: 1.02;
    letter-spacing: -0.02em;
    margin: 0 0 24px;
    color: var(--mullion);
  }
  .gh-headline em {
    color: var(--leaf-dark);
    font-style: italic;
  }
  .gh-sub {
    font-size: 18px;
    line-height: 1.6;
    max-width: 60ch;
    color: #2C342F;
    margin: 0 0 32px;
  }

  .gh-cta-row { display: flex; gap: 14px; flex-wrap: wrap; }
  .gh-cta {
    display: inline-block;
    padding: 14px 28px;
    border: 1.5px solid var(--mullion);
    color: var(--mullion);
    background: rgba(255,255,255,0.4);
    backdrop-filter: blur(2px);
    text-decoration: none;
    font-weight: 500;
    letter-spacing: 0.02em;
    font-size: 15px;
    transition: background 160ms ease, color 160ms ease, transform 160ms ease;
    font-family: "Fraunces Soft", Georgia, serif;
  }
  .gh-cta:hover, .gh-cta:focus-visible { background: var(--mullion); color: var(--glass); transform: translateY(-1px); outline: none; }
  .gh-cta-primary { background: var(--leaf-dark); color: #F2F5EE; border-color: var(--leaf-dark); }
  .gh-cta-primary:hover, .gh-cta-primary:focus-visible { background: #1F3622; }

  .gh-h2-row { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 18px; }
  .gh-h2 {
    font-family: "Fraunces Soft", Georgia, serif;
    font-weight: 600;
    font-size: clamp(26px, 3.2vw, 40px);
    margin: 0;
    letter-spacing: -0.01em;
  }
  .gh-aside { font-style: italic; color: rgba(26,32,30,0.7); font-size: 13px; }

  .gh-bench-section { position: relative; z-index: 2; padding: 36px 0; border-top: 1px solid var(--rule); }
  .gh-bench {
    position: relative;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 14px;
    padding: 28px 18px 20px;
    min-height: 280px;
  }
  @media (max-width: 900px) { .gh-bench { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 540px) { .gh-bench { grid-template-columns: repeat(2, 1fr); } }
  .gh-bench-board {
    position: absolute;
    left: 0; right: 0;
    bottom: 64px;
    height: 24px;
    background:
      linear-gradient(180deg, var(--bench) 0%, var(--bench-dark) 100%);
    box-shadow: 0 6px 0 rgba(26,32,30,0.18), inset 0 1px 0 rgba(255,255,255,0.18);
  }
  .gh-pot {
    position: relative;
    background: transparent;
    border: none;
    padding: 0 0 14px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: inherit;
    font: inherit;
    transition: transform 240ms cubic-bezier(0.2, 0.9, 0.3, 1.1);
  }
  .gh-pot:hover, .gh-pot:focus-visible, .gh-pot.is-hover {
    transform: translateY(-12px);
    outline: none;
  }

  .gh-fronds {
    --fill: ${"#5C8753"};
    position: relative;
    width: 96px;
    height: 90px;
    margin-bottom: -10px;
    z-index: 2;
  }
  .gh-frond {
    position: absolute;
    left: 50%;
    bottom: 4px;
    width: 16px;
    height: 70px;
    background: var(--fill);
    border-radius: 50% 50% 30% 30% / 70% 70% 30% 30%;
    transform-origin: 50% 100%;
    transform: translateX(-50%) rotate(var(--rot, 0deg)) scaleY(var(--scale, 1));
    box-shadow: inset -3px 0 0 rgba(0,0,0,0.18), inset 3px 0 0 rgba(255,255,255,0.16);
  }

  .gh-pot-vessel {
    width: 80px;
    height: 64px;
    background:
      linear-gradient(180deg, var(--terracotta) 0%, var(--terracotta-dark) 100%);
    border-radius: 4px 4px 14px 14px / 4px 4px 26px 26px;
    box-shadow:
      inset 0 -4px 0 rgba(0,0,0,0.18),
      inset 0 1px 0 rgba(255,255,255,0.14),
      0 6px 12px rgba(26,32,30,0.18);
    position: relative;
    z-index: 1;
  }
  .gh-pot-vessel::before {
    content: "";
    position: absolute;
    top: 0; left: -4px; right: -4px;
    height: 10px;
    background: linear-gradient(180deg, #C26146 0%, #983F2F 100%);
    border-radius: 4px 4px 0 0;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.16);
  }

  .gh-tag {
    margin-top: 8px;
    background: var(--tag);
    color: var(--mullion);
    padding: 6px 10px;
    font-size: 12px;
    line-height: 1.3;
    text-align: left;
    width: 100%;
    box-shadow: 0 1px 0 rgba(0,0,0,0.18);
    border-left: 3px solid var(--leaf);
    display: flex;
    flex-direction: column;
    gap: 1px;
    transform-origin: top center;
    transition: transform 220ms ease, opacity 220ms ease;
  }
  .gh-tag-pot { font-family: monospace; font-size: 10px; color: var(--leaf-dark); letter-spacing: 0.16em; }
  .gh-tag-common { font-weight: 600; font-size: 13px; }
  .gh-tag-latin { font-style: italic; color: rgba(26,32,30,0.7); }
  .gh-tag-zone { font-size: 10px; letter-spacing: 0.06em; color: rgba(26,32,30,0.7); }

  .gh-pot.is-hover .gh-tag { transform: rotate(-1.4deg) translateY(-2px); box-shadow: 2px 4px 0 rgba(26,32,30,0.16); }
  .gh-pot:focus-visible .gh-tag { outline: 2px solid var(--leaf-dark); outline-offset: 2px; }

  .gh-season-section { position: relative; z-index: 2; padding: 36px 0; border-top: 1px solid var(--rule); }
  .gh-season-tabs { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 18px; }
  .gh-tab {
    --accent: var(--leaf);
    background: rgba(255,255,255,0.5);
    color: var(--mullion);
    border: 1.5px solid var(--accent);
    padding: 8px 18px;
    font-family: "Fraunces Soft", Georgia, serif;
    font-size: 14px;
    cursor: pointer;
    transition: background 160ms ease, color 160ms ease, transform 160ms ease;
  }
  .gh-tab:hover, .gh-tab:focus-visible { transform: translateY(-1px); outline: none; }
  .gh-tab.is-on { background: var(--accent); color: #FFF; }

  .gh-season-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0; border: 1px solid var(--rule); background: rgba(255,255,255,0.4); }
  .gh-season-row {
    display: grid;
    grid-template-columns: 60px 1fr 12px;
    gap: 12px;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px dashed var(--rule);
    font-size: 16px;
    font-style: italic;
    transition: background 140ms ease;
  }
  .gh-season-row:last-child { border-bottom: none; }
  .gh-season-row:hover, .gh-season-row:focus-within { background: rgba(255,255,255,0.7); }
  .gh-season-num { font-family: monospace; font-size: 12px; color: var(--leaf-dark); letter-spacing: 0.12em; font-style: normal; }
  .gh-season-fill { width: 12px; height: 12px; border-radius: 50%; }

  .gh-installs-section { position: relative; z-index: 2; padding: 36px 0; border-top: 1px solid var(--rule); }
  .gh-glass-mount {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 18px;
    background:
      repeating-linear-gradient(0deg, rgba(255,255,255,0.32) 0 1px, transparent 1px 12px),
      rgba(220,230,225,0.6);
    padding: 22px;
    border: 1.5px solid var(--mullion);
  }
  .gh-glass-card {
    position: relative;
    background: rgba(255,255,255,0.78);
    border: 1px solid var(--rule);
    padding: 18px 16px 14px;
    transition: transform 180ms ease, box-shadow 180ms ease;
  }
  .gh-glass-card h3 { margin: 0 0 6px; font-family: "Fraunces Soft", Georgia, serif; font-size: 18px; }
  .gh-glass-card p { margin: 0 0 6px; font-size: 14px; color: #2C342F; }
  .gh-glass-meta { font-style: italic; font-size: 12px; color: rgba(26,32,30,0.6); }
  .gh-glass-tape {
    position: absolute;
    top: -8px; left: 14px;
    width: 60px; height: 14px;
    background: rgba(255,236,180,0.7);
    box-shadow: inset 0 0 0 1px rgba(255,236,180,0.9);
    transform: rotate(-3deg);
  }
  .gh-glass-card:hover, .gh-glass-card:focus-visible {
    transform: translate(-2px, -3px);
    box-shadow: 4px 6px 0 rgba(26,32,30,0.18);
    outline: none;
  }
  .gh-glass-card:focus-visible { box-shadow: 4px 6px 0 rgba(26,32,30,0.18), 0 0 0 2px var(--leaf-dark); }

  .gh-foot {
    position: relative;
    z-index: 2;
    padding: 36px 0 12px;
    border-top: 1px solid var(--rule);
    margin-top: 12px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 28px;
  }
  @media (max-width: 760px) { .gh-foot { grid-template-columns: 1fr; } }
  .gh-foot-stamp { display: flex; gap: 12px; align-items: center; }
  .gh-foot-title { display: block; font-family: "Fraunces Soft", Georgia, serif; font-weight: 600; font-size: 16px; letter-spacing: 0.04em; }
  .gh-foot-sub { display: block; font-style: italic; color: rgba(26,32,30,0.7); font-size: 12px; }

  .gh-foot-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 22px;
    font-size: 13px;
    line-height: 1.55;
  }
  .gh-foot-grid > div { display: flex; flex-direction: column; gap: 4px; }
  .gh-foot-tag {
    font-family: "Fraunces Soft", Georgia, serif;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--leaf-dark);
    font-size: 11px;
    margin-bottom: 4px;
  }
`;
