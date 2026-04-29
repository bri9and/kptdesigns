"use client";

/**
 * AnvilEngine — V38 Anvil
 *
 * Hot-iron, hand-struck identity for a custom carpenter. Headings hammer in
 * over three strikes; slag-orange pools at the base of each letter and cools
 * to ash. Brutalist-Industrial. "Made not assembled."
 */

import { useEffect, useRef, useState } from "react";

const HOT_WORK = [
  {
    id: "01",
    title: "Walnut library",
    where: "Brookline, MA",
    note: "Floor-to-ceiling built-ins, hand-cut dovetailed drawer banks, scribed to a 7° out-of-plumb chimney run.",
    spec: "QSWO · 1¼\" face frames · NK lacquer",
  },
  {
    id: "02",
    title: "Mortised barn door",
    where: "Lincoln, MA",
    note: "Eight-foot through-tenon door for a tractor bay. Pegged with white-oak drawbore. No metal in the joint.",
    spec: "White oak · drawbore peg · linseed",
  },
  {
    id: "03",
    title: "Inglenook bench",
    where: "Concord, MA",
    note: "Settle bench at a stone fireplace. Half-lap rails, mortise-and-tenon stiles. Ten coats of hand-rubbed oil.",
    spec: "Cherry · M&T · oil/wax",
  },
  {
    id: "04",
    title: "Stair newel + cap",
    where: "Beacon Hill, Boston",
    note: "Replacement of a 1903 newel rotten at the foot. Turned cap matched on a wood-lathe to the original profile.",
    spec: "Mahogany · turned cap · shellac",
  },
];

const JOINTS = [
  {
    name: "Mortise & Tenon",
    abbr: "M/T",
    blurb: "The carpenter's wedding ring. Cut tight, glued lean, pegged when the load asks.",
  },
  {
    name: "Through Dovetail",
    abbr: "DT",
    blurb: "Pins and tails fitted by hand. Visible from the side because we want it visible.",
  },
  {
    name: "Half-Lap",
    abbr: "HL",
    blurb: "Two members give half each. The strongest framing joint a hammer can true up.",
  },
  {
    name: "Drawbore Peg",
    abbr: "DB",
    blurb: "Tenon and mortise pulled tight by a 1/16\" offset peg. Tightens with seasonal wood movement.",
  },
];

const TOOLS = [
  { label: "8 lb cross-peen", note: "for the strikes that set the iron" },
  { label: "Stanley #4½ smoother", note: "Hock A2 iron, tuned mouth" },
  { label: "Lie-Nielsen dovetail saw", note: "filed rip, 15 ppi" },
  { label: "Starrett 12\" combo square", note: "trued every quarter" },
  { label: "Festool Domino DF 500", note: "for runs we can't hand-fit by Friday" },
  { label: "Pfeil 1/4\" mortise chisel", note: "honed to 8000, stropped to glass" },
];

export default function AnvilEngine() {
  const [strikes, setStrikes] = useState(0);
  const [reignite, setReignite] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStrikes(3);
      return;
    }
    const t1 = setTimeout(() => setStrikes(1), 280);
    const t2 = setTimeout(() => setStrikes(2), 760);
    const t3 = setTimeout(() => setStrikes(3), 1240);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="anv-shell">
        <div className="anv-grit" aria-hidden />
        <div className="anv-peen" aria-hidden />

        {/* TOP BAR */}
        <header className="anv-top">
          <div className="anv-stamp" aria-label="Forge stamp">
            <span className="anv-stamp-line">FORGED</span>
            <span className="anv-stamp-line">EST. 2008</span>
          </div>
          <nav className="anv-nav" aria-label="Primary">
            <a href="#hot-work">Hot Work</a>
            <a href="#joinery">Joinery</a>
            <a href="#bench">The Bench</a>
            <a href="#shop">Shop</a>
          </nav>
          <a className="anv-cta-mini" href="#spec">Spec a piece →</a>
        </header>

        {/* HERO */}
        <section className="anv-hero" ref={heroRef}>
          <div className="anv-iron" aria-hidden />

          <h1 className={`anv-h1 strikes-${strikes}`} aria-label="Mortise and tenon. Plumb cuts. Built to outlast the receipt.">
            <span className="anv-line">
              <span className="anv-word">Mortise</span>{" "}
              <span className="anv-word">and</span>{" "}
              <span className="anv-word">tenon.</span>
            </span>
            <span className="anv-line">
              <span className="anv-word">Plumb</span>{" "}
              <span className="anv-word">cuts.</span>
            </span>
            <span className="anv-line">
              <span className="anv-word">Built</span>{" "}
              <span className="anv-word">to</span>{" "}
              <span className="anv-word">outlast</span>{" "}
              <span className="anv-word">the</span>{" "}
              <span className="anv-word">receipt.</span>
            </span>
            <span className="anv-slag" aria-hidden />
          </h1>

          <p className="anv-sub">
            Custom carpentry — story poles drawn, joints fitted by hand, finishes that
            take a knock without a flinch.
          </p>

          <div className="anv-ctas">
            <button
              className={`anv-cta primary${reignite ? " hot" : ""}`}
              onMouseEnter={() => setReignite(true)}
              onMouseLeave={() => setReignite(false)}
              onFocus={() => setReignite(true)}
              onBlur={() => setReignite(false)}
            >
              <span className="anv-cta-text">Spec a piece</span>
              <span className="anv-cta-glow" aria-hidden />
            </button>
            <button className="anv-cta ghost">
              <span className="anv-cta-text">Walk the shop</span>
            </button>
          </div>

          <div className="anv-hero-meta" aria-hidden>
            <span>WORKSHOP · WALTHAM, MA</span>
            <span className="anv-dot" />
            <span>17 yrs · 412 commissions</span>
            <span className="anv-dot" />
            <span>By appointment</span>
          </div>
        </section>

        {/* HOT WORK */}
        <section id="hot-work" className="anv-hot">
          <div className="anv-section-label">
            <span className="anv-section-num">§ I</span>
            <span className="anv-section-name">Hot Work</span>
            <span className="anv-section-rule" aria-hidden />
          </div>

          <h2 className="anv-h2">Recent commissions, struck and finished.</h2>

          <ul className="anv-hot-grid" role="list">
            {HOT_WORK.map((p) => (
              <li key={p.id} className="anv-hot-card" tabIndex={0}>
                <div className="anv-hot-id">{p.id}</div>
                <div className="anv-hot-title">{p.title}</div>
                <div className="anv-hot-where">{p.where}</div>
                <p className="anv-hot-note">{p.note}</p>
                <div className="anv-hot-spec">{p.spec}</div>
                <div className="anv-hot-glow" aria-hidden />
              </li>
            ))}
          </ul>
        </section>

        {/* JOINERY */}
        <section id="joinery" className="anv-joinery">
          <div className="anv-section-label">
            <span className="anv-section-num">§ II</span>
            <span className="anv-section-name">The Joinery</span>
            <span className="anv-section-rule" aria-hidden />
          </div>

          <h2 className="anv-h2">Joints we cut. By hand, when the wood asks.</h2>

          <ul className="anv-joints" role="list">
            {JOINTS.map((j) => (
              <li key={j.name} className="anv-joint" tabIndex={0}>
                <svg className="anv-joint-svg" viewBox="0 0 100 100" aria-hidden>
                  {j.abbr === "M/T" && (
                    <g fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="14" y="40" width="40" height="20" />
                      <rect x="44" y="46" width="12" height="8" fill="currentColor" />
                      <rect x="56" y="40" width="30" height="20" />
                    </g>
                  )}
                  {j.abbr === "DT" && (
                    <g fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M10 30 L46 30 L42 50 L46 70 L10 70 Z" />
                      <path d="M46 30 L54 38 L46 50 L54 62 L46 70" />
                      <path d="M54 38 L90 38 L90 62 L54 62" />
                    </g>
                  )}
                  {j.abbr === "HL" && (
                    <g fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="10" y="30" width="80" height="18" />
                      <rect x="40" y="30" width="20" height="40" strokeDasharray="3 3" />
                      <rect x="10" y="48" width="80" height="22" />
                    </g>
                  )}
                  {j.abbr === "DB" && (
                    <g fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="14" y="40" width="72" height="20" />
                      <line x1="46" y1="34" x2="46" y2="66" />
                      <circle cx="46" cy="50" r="4" fill="currentColor" />
                    </g>
                  )}
                </svg>
                <div className="anv-joint-name">{j.name}</div>
                <div className="anv-joint-abbr">{j.abbr}</div>
                <p className="anv-joint-blurb">{j.blurb}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* THE BENCH */}
        <section id="bench" className="anv-bench">
          <div className="anv-section-label">
            <span className="anv-section-num">§ III</span>
            <span className="anv-section-name">The Bench</span>
            <span className="anv-section-rule" aria-hidden />
          </div>

          <div className="anv-bench-row">
            <div className="anv-bench-copy">
              <h2 className="anv-h2">What's on the bench, what stays sharp.</h2>
              <p className="anv-bench-intro">
                A working shop is a list of decisions. These are ours, hand-engraved on
                their own labels.
              </p>
              <p className="anv-bench-fineprint">
                Sharpened weekly. Squared every quarter. Replaced when the steel says so —
                not when the catalog wants us to.
              </p>
            </div>
            <ul className="anv-tools" role="list">
              {TOOLS.map((t) => (
                <li key={t.label} className="anv-tool" tabIndex={0}>
                  <div className="anv-tool-engraving">{t.label}</div>
                  <div className="anv-tool-note">{t.note}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SHOP / CTA */}
        <section id="shop" className="anv-shop">
          <h2 className="anv-shop-h">Bring a sketch. We'll bring the iron.</h2>
          <p className="anv-shop-sub">
            Visits by appointment Tuesday and Thursday. Commission queue runs about
            14 weeks; small repairs slot in faster.
          </p>
          <div className="anv-ctas">
            <button className="anv-cta primary"><span className="anv-cta-text">Spec a piece</span><span className="anv-cta-glow" aria-hidden /></button>
            <button className="anv-cta ghost"><span className="anv-cta-text">Walk the shop</span></button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="anv-foot">
          <div className="anv-foot-row">
            <div className="anv-foot-mark">
              <span className="anv-foot-mark-1">FORGED</span>
              <span className="anv-foot-mark-2">CARPENTRY CO.</span>
            </div>
            <div className="anv-foot-cols">
              <div>
                <div className="anv-foot-h">Shop</div>
                <div>1218 Moody St, Waltham MA</div>
                <div>Tue/Thu, by appointment</div>
              </div>
              <div>
                <div className="anv-foot-h">Reach</div>
                <div>shop@forged-carpentry.test</div>
                <div>(781) 555-0184</div>
              </div>
              <div>
                <div className="anv-foot-h">Guarantee</div>
                <div>Custom millwork — joints repaired free, for life of the piece.</div>
              </div>
            </div>
          </div>
          <div className="anv-foot-stamp" aria-hidden>
            ⚒ HAND-STRUCK · MADE NOT ASSEMBLED · MMVIII
          </div>
        </footer>
      </div>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Inter:wght@400;500;600&family=Cormorant+Garamond:ital,wght@1,400&display=swap');

  .anv-shell {
    --iron: #2C2A28;
    --iron-2: #1F1D1B;
    --slag: #D24D1F;
    --slag-cool: #6E4032;
    --ash: #8C8881;
    --bone: #E8E2D6;
    font-family: 'Inter', system-ui, sans-serif;
    color: var(--bone);
    position: relative;
    min-height: 100vh;
    background: radial-gradient(ellipse at 20% 0%, #3A3633 0%, var(--iron) 45%, var(--iron-2) 100%);
    overflow: hidden;
  }
  .anv-grit {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      radial-gradient(rgba(0,0,0,0.20) 1px, transparent 1px);
    background-size: 3px 3px, 5px 5px;
    background-position: 0 0, 1px 2px;
    mix-blend-mode: overlay;
    opacity: 0.6;
  }
  .anv-peen {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(circle at 12% 18%, rgba(255,255,255,0.04) 0 6px, transparent 7px),
      radial-gradient(circle at 22% 33%, rgba(0,0,0,0.22) 0 4px, transparent 5px),
      radial-gradient(circle at 76% 14%, rgba(0,0,0,0.18) 0 5px, transparent 6px),
      radial-gradient(circle at 88% 62%, rgba(255,255,255,0.05) 0 5px, transparent 6px),
      radial-gradient(circle at 38% 78%, rgba(0,0,0,0.20) 0 4px, transparent 5px),
      radial-gradient(circle at 60% 42%, rgba(255,255,255,0.03) 0 7px, transparent 8px);
    opacity: 0.7;
  }
  .anv-shell > * { position: relative; z-index: 1; }

  .anv-top {
    display: flex; align-items: center; justify-content: space-between;
    padding: 22px 48px;
    border-bottom: 1px solid rgba(232,226,214,0.08);
  }
  .anv-stamp {
    border: 1.5px solid var(--bone);
    padding: 6px 12px;
    font-family: 'Oswald', sans-serif;
    font-size: 11px;
    letter-spacing: 0.2em;
    line-height: 1.15;
    transform: rotate(-1.5deg);
    color: var(--bone);
  }
  .anv-stamp-line { display: block; }
  .anv-nav { display: flex; gap: 28px; }
  .anv-nav a {
    color: var(--ash); text-decoration: none;
    font-family: 'Oswald', sans-serif;
    font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;
    padding: 6px 0; border-bottom: 1px solid transparent;
    transition: color 180ms, border-color 180ms;
  }
  .anv-nav a:hover, .anv-nav a:focus-visible {
    color: var(--slag); border-bottom-color: var(--slag); outline: none;
  }
  .anv-cta-mini {
    color: var(--bone); text-decoration: none;
    font-family: 'Oswald', sans-serif;
    font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;
    padding: 8px 16px;
    border: 1px solid var(--ash);
    transition: background 180ms, border-color 180ms, color 180ms;
  }
  .anv-cta-mini:hover, .anv-cta-mini:focus-visible {
    background: var(--slag); border-color: var(--slag); color: #1B0E07; outline: none;
  }

  .anv-hero {
    padding: 100px 48px 80px;
    position: relative;
    isolation: isolate;
  }
  .anv-iron {
    position: absolute; inset: 60px 24px 40px; z-index: -1;
    background:
      linear-gradient(160deg, #1A1816 0%, #2D2A27 50%, #19171583 100%),
      repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0 2px, transparent 2px 6px);
    box-shadow: inset 0 0 60px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(0,0,0,0.4);
    filter: contrast(1.05);
  }
  .anv-h1 {
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: clamp(48px, 7.6vw, 124px);
    line-height: 0.92;
    letter-spacing: -0.01em;
    text-transform: uppercase;
    margin: 0 0 36px 0;
    max-width: 17ch;
    position: relative;
  }
  .anv-line { display: block; }
  .anv-word {
    display: inline-block;
    color: var(--bone);
    text-shadow: 0 0 0 transparent;
    transform: translateY(-12px);
    opacity: 0;
    transition: transform 220ms cubic-bezier(.2,1.4,.4,1), opacity 200ms, text-shadow 1200ms ease-out;
  }
  .strikes-1 .anv-line:nth-child(1) .anv-word {
    transform: translateY(0); opacity: 1;
    text-shadow: 0 -2px 0 rgba(210,77,31,0.85), 0 4px 18px rgba(210,77,31,0.4);
  }
  .strikes-2 .anv-line:nth-child(1) .anv-word,
  .strikes-2 .anv-line:nth-child(2) .anv-word {
    transform: translateY(0); opacity: 1;
  }
  .strikes-2 .anv-line:nth-child(1) .anv-word { text-shadow: 0 -1px 0 rgba(110,64,50,0.5); }
  .strikes-2 .anv-line:nth-child(2) .anv-word {
    text-shadow: 0 -2px 0 rgba(210,77,31,0.85), 0 4px 18px rgba(210,77,31,0.4);
  }
  .strikes-3 .anv-word { transform: translateY(0); opacity: 1; }
  .strikes-3 .anv-line:nth-child(1) .anv-word { text-shadow: none; }
  .strikes-3 .anv-line:nth-child(2) .anv-word { text-shadow: 0 -1px 0 rgba(110,64,50,0.4); }
  .strikes-3 .anv-line:nth-child(3) .anv-word {
    text-shadow: 0 -2px 0 rgba(210,77,31,0.85), 0 4px 18px rgba(210,77,31,0.4);
  }
  .anv-slag {
    position: absolute;
    left: 0; right: 12%;
    bottom: -4px;
    height: 3px;
    background: linear-gradient(90deg, transparent, rgba(210,77,31,0.85), transparent);
    filter: blur(1px);
    opacity: 0;
    animation: anv-slag-cool 1500ms ease-out 1300ms forwards;
  }
  @keyframes anv-slag-cool {
    0% { opacity: 1; background: linear-gradient(90deg, transparent, rgba(255,140,40,0.95), transparent); }
    60% { opacity: 0.6; background: linear-gradient(90deg, transparent, rgba(180,80,40,0.5), transparent); }
    100% { opacity: 0.18; background: linear-gradient(90deg, transparent, rgba(140,136,129,0.25), transparent); }
  }
  .anv-sub {
    font-family: 'Inter', sans-serif;
    color: #C7C2B6;
    font-size: clamp(15px, 1.3vw, 19px);
    line-height: 1.5;
    max-width: 56ch;
    margin: 0 0 28px 0;
  }
  .anv-ctas { display: flex; gap: 14px; flex-wrap: wrap; }

  .anv-cta {
    position: relative;
    font-family: 'Oswald', sans-serif;
    font-size: 13px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    padding: 14px 26px;
    background: var(--iron-2);
    color: var(--bone);
    border: 1.5px solid var(--bone);
    cursor: pointer;
    overflow: hidden;
    transition: color 200ms, border-color 200ms, background 200ms;
  }
  .anv-cta.primary { border-color: var(--slag); background: linear-gradient(180deg, #3a1f12, #1f1310); }
  .anv-cta.primary:hover, .anv-cta.primary:focus-visible, .anv-cta.primary.hot {
    background: linear-gradient(180deg, #d24d1f, #6e2912);
    color: #1B0E07;
    outline: none;
  }
  .anv-cta-glow {
    position: absolute; inset: -2px;
    border: 2px solid rgba(210,77,31,0);
    box-shadow: 0 0 0 0 rgba(210,77,31,0);
    transition: box-shadow 260ms;
    pointer-events: none;
  }
  .anv-cta.primary:hover .anv-cta-glow,
  .anv-cta.primary:focus-visible .anv-cta-glow,
  .anv-cta.primary.hot .anv-cta-glow {
    box-shadow: 0 0 0 1px rgba(210,77,31,0.5), 0 0 28px 4px rgba(210,77,31,0.55);
  }
  .anv-cta.ghost { background: transparent; }
  .anv-cta.ghost:hover, .anv-cta.ghost:focus-visible {
    background: var(--bone); color: var(--iron); outline: none;
  }
  .anv-cta-text { position: relative; z-index: 2; }

  .anv-hero-meta {
    margin-top: 38px;
    display: flex; flex-wrap: wrap; gap: 12px; align-items: center;
    font-family: 'Oswald', sans-serif;
    font-size: 11px; letter-spacing: 0.22em; color: var(--ash);
  }
  .anv-dot { width: 4px; height: 4px; background: var(--slag); border-radius: 50%; }

  .anv-section-label {
    display: flex; align-items: center; gap: 16px;
    margin-bottom: 16px;
  }
  .anv-section-num {
    font-family: 'Cormorant Garamond', serif; font-style: italic;
    font-size: 26px; color: var(--slag);
  }
  .anv-section-name {
    font-family: 'Oswald', sans-serif;
    font-size: 13px; letter-spacing: 0.32em; text-transform: uppercase;
    color: var(--bone);
  }
  .anv-section-rule { flex: 1; height: 1px; background: linear-gradient(90deg, var(--ash), transparent); }

  .anv-h2 {
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: clamp(28px, 3.4vw, 48px);
    line-height: 1.05;
    letter-spacing: -0.005em;
    text-transform: uppercase;
    margin: 0 0 36px 0;
    max-width: 22ch;
  }

  .anv-hot { padding: 80px 48px; border-top: 1px solid rgba(232,226,214,0.08); }
  .anv-hot-grid {
    list-style: none; padding: 0; margin: 0;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 18px;
  }
  .anv-hot-card {
    position: relative;
    padding: 24px 22px 22px;
    background: linear-gradient(170deg, #221F1D, #15130F);
    border: 1px solid rgba(232,226,214,0.10);
    cursor: default;
    overflow: hidden;
    transition: transform 220ms, border-color 220ms;
  }
  .anv-hot-card:hover, .anv-hot-card:focus-visible {
    transform: translateY(-2px);
    border-color: var(--slag);
    outline: none;
  }
  .anv-hot-glow {
    position: absolute; left: 0; right: 0; bottom: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--slag), transparent);
    opacity: 0;
    transition: opacity 320ms;
  }
  .anv-hot-card:hover .anv-hot-glow,
  .anv-hot-card:focus-visible .anv-hot-glow { opacity: 1; }
  .anv-hot-id {
    font-family: 'Cormorant Garamond', serif; font-style: italic;
    color: var(--slag); font-size: 22px; line-height: 1; margin-bottom: 6px;
  }
  .anv-hot-title {
    font-family: 'Oswald', sans-serif; text-transform: uppercase;
    font-size: 22px; letter-spacing: 0.02em; line-height: 1.05;
  }
  .anv-hot-where {
    font-family: 'Oswald', sans-serif; font-size: 11px; letter-spacing: 0.22em;
    color: var(--ash); margin-bottom: 14px; margin-top: 2px;
  }
  .anv-hot-note {
    font-size: 14px; line-height: 1.5; color: #C7C2B6; margin: 0 0 14px 0;
  }
  .anv-hot-spec {
    font-family: 'Oswald', sans-serif; font-size: 11px; letter-spacing: 0.22em;
    color: var(--bone); padding-top: 12px; border-top: 1px dashed rgba(232,226,214,0.18);
  }

  .anv-joinery { padding: 80px 48px; }
  .anv-joints {
    list-style: none; padding: 0; margin: 0;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 14px;
  }
  .anv-joint {
    padding: 22px 20px;
    border: 1px solid rgba(232,226,214,0.10);
    background: rgba(20,18,17,0.5);
    color: var(--ash);
    transition: color 220ms, border-color 220ms, background 220ms, transform 220ms;
    cursor: default;
  }
  .anv-joint:hover, .anv-joint:focus-visible {
    color: var(--bone);
    border-color: var(--slag);
    background: linear-gradient(160deg, rgba(210,77,31,0.18), rgba(20,18,17,0.5));
    outline: none;
  }
  .anv-joint-svg { width: 100%; height: 100px; color: var(--ash); transition: color 240ms; }
  .anv-joint:hover .anv-joint-svg, .anv-joint:focus-visible .anv-joint-svg { color: var(--slag); }
  .anv-joint-name {
    margin-top: 10px;
    font-family: 'Oswald', sans-serif; font-size: 17px; text-transform: uppercase;
    letter-spacing: 0.02em; color: var(--bone);
  }
  .anv-joint-abbr {
    font-family: 'Cormorant Garamond', serif; font-style: italic;
    font-size: 13px; color: var(--slag); margin: 2px 0 8px 0;
  }
  .anv-joint-blurb { font-size: 13.5px; line-height: 1.55; margin: 0; }

  .anv-bench { padding: 80px 48px; border-top: 1px solid rgba(232,226,214,0.08); }
  .anv-bench-row {
    display: grid; grid-template-columns: 1fr 1.4fr; gap: 56px;
    align-items: start;
  }
  @media (max-width: 880px) {
    .anv-bench-row { grid-template-columns: 1fr; gap: 28px; }
  }
  .anv-bench-intro { font-size: 15px; line-height: 1.55; color: #C7C2B6; max-width: 38ch; }
  .anv-bench-fineprint {
    margin-top: 14px;
    font-size: 13px; line-height: 1.55; color: var(--ash);
    border-left: 2px solid var(--slag); padding-left: 12px;
  }
  .anv-tools {
    list-style: none; padding: 0; margin: 0;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 12px;
  }
  .anv-tool {
    padding: 16px 18px;
    background: linear-gradient(160deg, #211E1B, #14110F);
    border: 1px solid rgba(232,226,214,0.10);
    transition: border-color 200ms, transform 200ms;
    cursor: default;
  }
  .anv-tool:hover, .anv-tool:focus-visible {
    border-color: var(--slag); transform: translateX(2px); outline: none;
  }
  .anv-tool-engraving {
    font-family: 'Oswald', sans-serif; font-size: 14px;
    text-transform: uppercase; letter-spacing: 0.04em;
    color: var(--bone);
    text-shadow: 0 1px 0 rgba(0,0,0,0.6), 0 -1px 0 rgba(255,255,255,0.05);
  }
  .anv-tool-note {
    margin-top: 4px;
    font-family: 'Cormorant Garamond', serif; font-style: italic;
    font-size: 13px; color: var(--ash);
  }

  .anv-shop {
    padding: 96px 48px; border-top: 1px solid rgba(232,226,214,0.08);
    text-align: center;
  }
  .anv-shop-h {
    font-family: 'Oswald', sans-serif; font-weight: 700;
    font-size: clamp(32px, 4vw, 56px); line-height: 1.05;
    text-transform: uppercase; margin: 0 0 14px 0;
    letter-spacing: -0.005em;
  }
  .anv-shop-sub {
    font-size: 16px; line-height: 1.55; color: #C7C2B6;
    max-width: 50ch; margin: 0 auto 28px;
  }
  .anv-shop .anv-ctas { justify-content: center; }

  .anv-foot {
    padding: 56px 48px 36px;
    border-top: 1.5px solid var(--slag);
    background: linear-gradient(180deg, rgba(0,0,0,0.2), transparent);
  }
  .anv-foot-row {
    display: grid; grid-template-columns: 1fr 2fr; gap: 36px;
    align-items: start;
  }
  @media (max-width: 880px) { .anv-foot-row { grid-template-columns: 1fr; } }
  .anv-foot-mark {
    display: flex; flex-direction: column;
    font-family: 'Oswald', sans-serif; line-height: 0.95;
  }
  .anv-foot-mark-1 {
    font-size: 38px; letter-spacing: 0.04em; color: var(--slag);
  }
  .anv-foot-mark-2 {
    font-size: 14px; letter-spacing: 0.32em; color: var(--bone);
  }
  .anv-foot-cols {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
    font-size: 13px; line-height: 1.55; color: #C7C2B6;
  }
  @media (max-width: 720px) { .anv-foot-cols { grid-template-columns: 1fr; } }
  .anv-foot-h {
    font-family: 'Oswald', sans-serif; font-size: 11px; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--bone); margin-bottom: 6px;
  }
  .anv-foot-stamp {
    margin-top: 36px; padding-top: 18px;
    border-top: 1px dashed rgba(232,226,214,0.18);
    font-family: 'Oswald', sans-serif; font-size: 11px; letter-spacing: 0.32em;
    color: var(--ash); text-align: center;
  }

  @media (prefers-reduced-motion: reduce) {
    .anv-word { transform: none !important; opacity: 1 !important; transition: none !important; }
    .anv-slag { animation: none; opacity: 0.18; }
    .anv-cta, .anv-hot-card, .anv-joint, .anv-tool, .anv-nav a { transition: none; }
  }
`;
