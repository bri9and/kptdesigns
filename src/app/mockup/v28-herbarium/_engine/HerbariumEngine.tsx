"use client";

/**
 * HerbariumEngine — V28 Herbarium
 *
 * Pressed-specimen sheets on archival linen. Latin nomenclature, dated stamps,
 * linen-tape petiole anchors. Quiet scholarship for landscape designers who
 * already think in cultivars before catalog SKUs.
 */

import { useState } from "react";

const SPECIMENS = [
  {
    latin: "Acer rubrum",
    cultivar: "'October Glory'",
    common: "red maple",
    zone: "4–9",
    install: "OCT 14, 2024",
    site: "Wellesley — front lawn specimen",
    notes:
      "Lifted at the canopy. Mulched in a 4-foot ring. Owner asked for fall color over spring bloom — earned it.",
    tape: "linen",
    leaf: "maple",
    cat: "REG-2024-014",
  },
  {
    latin: "Hydrangea paniculata",
    cultivar: "'Limelight'",
    common: "panicle hydrangea",
    zone: "3–8",
    install: "JUN 02, 2024",
    site: "Newton — bed-line repeat",
    notes:
      "Spaced 5 feet on center along the south fence. Lime in summer, dried-rose by November. Holds the eye through frost.",
    tape: "ochre",
    leaf: "ovate",
    cat: "REG-2024-027",
  },
  {
    latin: "Hakonechloa macra",
    cultivar: "'Aureola'",
    common: "Japanese forest grass",
    zone: "5–9",
    install: "MAY 09, 2024",
    site: "Brookline — north walk",
    notes:
      "Mass-planted at 18 inches on center under a maple drip-line. Reads gold in shade. Replaces a failed liriope.",
    tape: "linen",
    leaf: "blade",
    cat: "REG-2024-031",
  },
  {
    latin: "Pennisetum alopecuroides",
    cultivar: "'Hameln'",
    common: "dwarf fountain grass",
    zone: "5–9",
    install: "SEP 21, 2024",
    site: "Glenview — front-of-bed rhythm",
    notes:
      "Twenty-two specimens at 24 inches on center. Plumes carry the bed line into October. Cut to four inches in March.",
    tape: "ochre",
    leaf: "blade",
    cat: "REG-2024-040",
  },
  {
    latin: "Geranium",
    cultivar: "'Rozanne'",
    common: "cranesbill",
    zone: "5–8",
    install: "MAY 22, 2024",
    site: "Needham — west border",
    notes:
      "Eighteen plants. Blooms cobalt from June to frost without dead-heading. The most reliable groundcover we spec.",
    tape: "linen",
    leaf: "lobed",
    cat: "REG-2024-052",
  },
  {
    latin: "Cornus florida",
    cultivar: "'Cherokee Princess'",
    common: "flowering dogwood",
    zone: "5–9",
    install: "APR 08, 2024",
    site: "Concord — understory accent",
    notes:
      "Single specimen, sited 14 feet off the porch. Bracts in white the third week of April. Fall color holds two weeks longer than the species.",
    tape: "ochre",
    leaf: "ovate",
    cat: "REG-2024-058",
  },
];

const INDEX = [
  ["Acer", "Amsonia", "Aronia", "Asclepias", "Aster"],
  ["Baptisia", "Betula", "Buxus"],
  ["Calamagrostis", "Carpinus", "Ceanothus", "Cornus"],
  ["Echinacea", "Epimedium", "Eupatorium"],
  ["Fothergilla", "Fagus"],
  ["Geranium", "Gillenia"],
  ["Hakonechloa", "Hamamelis", "Heuchera", "Hydrangea"],
  ["Itea", "Iris"],
  ["Liatris", "Liriope", "Lobelia"],
  ["Monarda", "Muhlenbergia"],
  ["Nyssa"],
  ["Pennisetum", "Phlox", "Polygonatum"],
  ["Quercus"],
  ["Rudbeckia"],
  ["Salvia", "Sedum", "Solidago", "Sporobolus"],
  ["Tiarella"],
];

const FIELD_NOTES = [
  {
    when: "APR 19, 2026 — 06:42",
    place: "Glenview",
    body:
      "Bed line lifts a foot off the slate path. Re-staked at the corner. Owner walked the curve at 6:30 with the dog and signed off without me.",
  },
  {
    when: "APR 21, 2026 — 14:08",
    place: "Wellesley",
    body:
      "Mulch ring on the maple at four feet, four inches deep, no volcano. Crew wrote the phrase 'no volcano' in chalk on the hardpan as a self-reminder.",
  },
  {
    when: "APR 23, 2026 — 11:30",
    place: "Brookline",
    body:
      "Hakonechloa coming up gold against the cedar. Counted nineteen of twenty-two clumps at full break. The three slow ones are due south of the downspout.",
  },
];

export default function HerbariumEngine() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);

  return (
    <>
      <style>{css}</style>
      <div className="hb-shell">
        <div className="hb-grain" aria-hidden />

        <header className="hb-masthead">
          <div className="hb-mast-left">
            <div className="hb-mast-mark">
              <span className="hb-mast-mark-arc">KPT &middot; HERBARIUM</span>
              <span className="hb-mast-mark-mid">EST. MMXVIII</span>
            </div>
            <div className="hb-mast-meta">
              <div>VOL. VII &middot; SPRING REGISTER</div>
              <div>USDA ZONE 6A &middot; NEW ENGLAND</div>
            </div>
          </div>
          <nav className="hb-mast-nav" aria-label="Primary">
            <a href="#register">The Register</a>
            <a href="#fieldnotes">Field Notes</a>
            <a href="#index">Specimen Index</a>
            <a href="#colophon">Colophon</a>
          </nav>
        </header>

        <section className="hb-hero">
          <div className="hb-hero-sheet">
            <div className="hb-hero-tape" aria-hidden />
            <div className="hb-hero-tag">
              <div className="hb-hero-tag-line">
                <span>Acer rubrum</span> &nbsp;&middot;&nbsp; <em>'October Glory'</em>
              </div>
              <div className="hb-hero-tag-line hb-tiny">red maple &middot; coll. C. Bedford &middot; OCT 14, 2024</div>
              <div className="hb-hero-tag-stamp">REG-2024-014</div>
            </div>
            <div className="hb-hero-leaf" aria-hidden>
              <svg viewBox="0 0 320 360" width="100%" height="100%" aria-hidden>
                <defs>
                  <radialGradient id="hb-leaf-grad" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#7A4D2A" stopOpacity="0.92" />
                    <stop offset="60%" stopColor="#5A4632" stopOpacity="0.88" />
                    <stop offset="100%" stopColor="#3A2C1E" stopOpacity="0.82" />
                  </radialGradient>
                </defs>
                <path
                  d="M160 30 L196 86 L246 56 L228 122 L294 130 L240 168 L286 218 L218 214 L208 282 L160 240 L112 282 L102 214 L34 218 L80 168 L26 130 L92 122 L74 56 L124 86 Z"
                  fill="url(#hb-leaf-grad)"
                  stroke="#3A2C1E"
                  strokeWidth="1"
                />
                <path d="M160 30 L160 240" stroke="#2A1E12" strokeWidth="1.2" opacity="0.75" />
                <path
                  d="M160 90 L120 110 M160 110 L96 130 M160 140 L80 168 M160 170 L100 200 M160 200 L120 230"
                  stroke="#2A1E12"
                  strokeWidth="0.7"
                  opacity="0.6"
                  fill="none"
                />
                <path
                  d="M160 90 L200 110 M160 110 L224 130 M160 140 L240 168 M160 170 L220 200 M160 200 L200 230"
                  stroke="#2A1E12"
                  strokeWidth="0.7"
                  opacity="0.6"
                  fill="none"
                />
                <line
                  x1="160"
                  y1="240"
                  x2="160"
                  y2="340"
                  stroke="#3A2C1E"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          <div className="hb-hero-copy">
            <div className="hb-hero-eyebrow">SPECIMEN NO. 014 &middot; SPRING REGISTER</div>
            <h1 className="hb-hero-headline">
              <em>Acer rubrum</em> 'October Glory.'
              <span className="hb-hero-line">Spec'd to plan, lifted at the canopy, mulched in a four-foot ring.</span>
            </h1>
            <p className="hb-hero-sub">
              Ornamental and native plantings, designed and installed by people who know the cultivar before
              the catalog. We catalog every specimen we plant — Latin name, hardiness zone, install date, and
              the year a planting matures.
            </p>
            <div className="hb-hero-ctas">
              <a className="hb-cta hb-cta-primary" href="#register">Catalog a property &rarr;</a>
              <a className="hb-cta hb-cta-ghost" href="#index">Browse the herbarium</a>
            </div>
            <div className="hb-hero-meta">
              <span>FRAUNCES &middot; ARCHIVAL RED #8C2A1F</span>
              <span>COLLECTOR &middot; C. BEDFORD</span>
              <span>FIELD &middot; WELLESLEY, MA</span>
            </div>
          </div>
        </section>

        <section id="register" className="hb-register">
          <div className="hb-section-head">
            <div className="hb-section-head-num">I.</div>
            <div>
              <h2>The Register</h2>
              <p>
                Every install enters the book. A specimen sheet — Latin name, cultivar, hardiness zone, the
                date we set it. Hover a sheet to lift its linen tape.
              </p>
            </div>
          </div>

          <div className="hb-register-grid">
            {SPECIMENS.map((s, i) => (
              <article
                key={s.cat}
                className={`hb-sheet${hovered === i ? " hb-sheet-on" : ""}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
                aria-label={`${s.latin} ${s.cultivar} — installed ${s.install}`}
              >
                <div className={`hb-sheet-tape hb-tape-${s.tape}`} aria-hidden />
                <div className="hb-sheet-leaf" aria-hidden>
                  <Leaf shape={s.leaf} />
                </div>
                <div className="hb-sheet-tag">
                  <div className="hb-sheet-latin">
                    <em>{s.latin}</em> {s.cultivar}
                  </div>
                  <div className="hb-sheet-common">{s.common}</div>
                  <dl className="hb-sheet-meta">
                    <div>
                      <dt>ZONE</dt>
                      <dd>{s.zone}</dd>
                    </div>
                    <div>
                      <dt>INSTALL</dt>
                      <dd>{s.install}</dd>
                    </div>
                    <div>
                      <dt>SITE</dt>
                      <dd>{s.site}</dd>
                    </div>
                  </dl>
                  <p className="hb-sheet-note">{s.notes}</p>
                  <div className="hb-sheet-stamp">{s.cat}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="fieldnotes" className="hb-fieldnotes">
          <div className="hb-section-head">
            <div className="hb-section-head-num">II.</div>
            <div>
              <h2>Field Notes</h2>
              <p>
                Hand-written observations on softscape lift, edge-and-blow rhythm, and the year a planting
                actually matures. The book that the truck cab keeps.
              </p>
            </div>
          </div>

          <div className="hb-notes">
            {FIELD_NOTES.map((n) => (
              <article key={n.when} className="hb-note">
                <div className="hb-note-head">
                  <div className="hb-note-when">{n.when}</div>
                  <div className="hb-note-place">{n.place}</div>
                </div>
                <p className="hb-note-body">{n.body}</p>
                <div className="hb-note-rule" aria-hidden />
              </article>
            ))}
          </div>
        </section>

        <section id="index" className="hb-index">
          <div className="hb-section-head">
            <div className="hb-section-head-num">III.</div>
            <div>
              <h2>Specimen Index</h2>
              <p>
                A — Z of plants the firm specs. Hover a letter to highlight its Latin entries; we plant from
                this list because we know how each performs in zone 6A.
              </p>
            </div>
          </div>

          <div className="hb-index-grid">
            {INDEX.map((bucket) => {
              const letter = bucket[0][0];
              const on = hoveredLetter === letter;
              return (
                <div
                  key={letter}
                  className={`hb-index-bucket${on ? " hb-index-bucket-on" : ""}`}
                  onMouseEnter={() => setHoveredLetter(letter)}
                  onMouseLeave={() => setHoveredLetter(null)}
                  onFocus={() => setHoveredLetter(letter)}
                  onBlur={() => setHoveredLetter(null)}
                  tabIndex={0}
                >
                  <div className="hb-index-letter">{letter}</div>
                  <ul>
                    {bucket.map((g) => (
                      <li key={g}>
                        <em>{g}</em>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section id="colophon" className="hb-cta-band">
          <div className="hb-cta-band-inner">
            <div>
              <h3>Bring us a property and we'll start a register.</h3>
              <p>
                Design walks open March 1. We catalog the site, file specimen sheets, and return a planting
                book before we lift a shovel.
              </p>
            </div>
            <a className="hb-cta hb-cta-primary" href="#contact">Catalog a property &rarr;</a>
          </div>
        </section>

        <footer className="hb-footer">
          <div className="hb-footer-row">
            <div className="hb-footer-press">
              <div className="hb-footer-mark">KPT</div>
              <div>
                <div>KPT LANDSCAPE STUDIO &middot; ARCHIVAL PRESS</div>
                <div className="hb-tiny">Composed in Fraunces &middot; Printed on linen card &middot; Filed in zone 6A</div>
              </div>
            </div>
            <div className="hb-footer-affil">
              <div>ASLA member firm</div>
              <div>USDA Hardiness Zone 6A &middot; certified arborist on staff</div>
              <div>Designed &amp; installed in MA, RI, southern NH</div>
            </div>
            <div className="hb-footer-stamp">
              <span>REG. NO.</span>
              <span className="hb-footer-stamp-num">047</span>
              <span>04 / 28 / 2026</span>
            </div>
          </div>
          <div className="hb-footer-rule" aria-hidden />
          <div className="hb-footer-tiny">
            &copy; KPT Landscape Studio. All specimens collected and pressed in-house. Latin names per Royal
            Horticultural Society register.
          </div>
        </footer>
      </div>
    </>
  );
}

function Leaf({ shape }: { shape: string }) {
  if (shape === "maple") {
    return (
      <svg viewBox="0 0 120 140" width="100%" height="100%">
        <path
          d="M60 12 L74 38 L94 24 L86 54 L114 56 L92 74 L108 100 L82 96 L78 124 L60 108 L42 124 L38 96 L12 100 L28 74 L6 56 L34 54 L26 24 L46 38 Z"
          fill="#5A4632"
          opacity="0.85"
        />
        <line x1="60" y1="12" x2="60" y2="108" stroke="#2A1E12" strokeWidth="0.8" />
        <line x1="60" y1="120" x2="60" y2="140" stroke="#3A2C1E" strokeWidth="1.4" />
      </svg>
    );
  }
  if (shape === "ovate") {
    return (
      <svg viewBox="0 0 120 140" width="100%" height="100%">
        <path d="M60 14 C 18 30 18 110 60 124 C 102 110 102 30 60 14 Z" fill="#5A4632" opacity="0.82" />
        <line x1="60" y1="14" x2="60" y2="124" stroke="#2A1E12" strokeWidth="0.8" />
        <path
          d="M60 30 Q 36 50 30 70 M60 50 Q 32 68 28 86 M60 70 Q 36 86 32 102 M60 30 Q 84 50 90 70 M60 50 Q 88 68 92 86 M60 70 Q 84 86 88 102"
          stroke="#2A1E12"
          strokeWidth="0.5"
          fill="none"
          opacity="0.55"
        />
        <line x1="60" y1="124" x2="60" y2="140" stroke="#3A2C1E" strokeWidth="1.4" />
      </svg>
    );
  }
  if (shape === "lobed") {
    return (
      <svg viewBox="0 0 120 140" width="100%" height="100%">
        <path
          d="M60 16 Q 32 24 22 50 Q 14 76 30 96 Q 22 110 36 120 Q 52 116 60 100 Q 68 116 84 120 Q 98 110 90 96 Q 106 76 98 50 Q 88 24 60 16 Z"
          fill="#5A4632"
          opacity="0.82"
        />
        <line x1="60" y1="20" x2="60" y2="118" stroke="#2A1E12" strokeWidth="0.7" />
        <line x1="60" y1="120" x2="60" y2="140" stroke="#3A2C1E" strokeWidth="1.4" />
      </svg>
    );
  }
  // blade (grass)
  return (
    <svg viewBox="0 0 120 140" width="100%" height="100%">
      <path d="M58 4 Q 50 60 30 134 L 36 134 Q 56 70 60 6 Z" fill="#5A4632" opacity="0.78" />
      <path d="M62 6 Q 70 60 86 134 L 80 134 Q 64 70 60 6 Z" fill="#5A4632" opacity="0.72" />
      <path d="M60 20 Q 40 80 18 132 L 24 132 Q 52 80 60 22 Z" fill="#5A4632" opacity="0.55" />
    </svg>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,700;1,9..144,400;1,9..144,600&display=swap');

  .hb-shell {
    --linen: #EFE8DC;
    --linen-deep: #E4DCC9;
    --ink: #2A2418;
    --ink-soft: #4A3F2C;
    --brown: #5A4632;
    --red: #8C2A1F;
    --tape: #DCD0B5;
    --tape-ochre: #C9A16C;
    font-family: 'Fraunces', 'Iowan Old Style', Georgia, serif;
    color: var(--ink);
    background: var(--linen);
    position: relative;
    overflow-x: hidden;
  }
  .hb-grain {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      radial-gradient(circle at 20% 18%, rgba(90,70,50,0.05) 0 1px, transparent 1px),
      radial-gradient(circle at 70% 60%, rgba(90,70,50,0.05) 0 1px, transparent 1px),
      radial-gradient(circle at 40% 80%, rgba(90,70,50,0.04) 0 1px, transparent 1px);
    background-size: 7px 7px, 11px 11px, 13px 13px;
    mix-blend-mode: multiply;
    z-index: 1;
  }
  .hb-shell > *:not(.hb-grain) { position: relative; z-index: 2; }
  .hb-tiny { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-soft); }

  /* MASTHEAD */
  .hb-masthead {
    display: flex; justify-content: space-between; align-items: flex-start;
    padding: 28px 56px 24px;
    border-bottom: 1px solid rgba(60,40,20,0.25);
  }
  .hb-mast-left { display: flex; gap: 28px; align-items: center; }
  .hb-mast-mark {
    width: 90px; height: 90px; border-radius: 50%;
    border: 1.5px solid var(--red);
    color: var(--red);
    display: grid; place-items: center; position: relative;
    font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase;
    flex-shrink: 0;
  }
  .hb-mast-mark-arc { position: absolute; top: 8px; }
  .hb-mast-mark-arc-bottom { top: auto; bottom: 8px; }
  .hb-mast-mark-mid { font-family: 'Fraunces', serif; font-style: italic; font-weight: 600; font-size: 18px; letter-spacing: 0.04em; }
  .hb-mast-meta { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-soft); line-height: 1.7; }
  .hb-mast-nav { display: flex; gap: 22px; align-items: center; }
  .hb-mast-nav a {
    font-style: italic; font-size: 15px; color: var(--ink); text-decoration: none;
    border-bottom: 1px solid transparent; padding-bottom: 2px;
    transition: border-color 200ms, color 200ms;
  }
  .hb-mast-nav a:hover, .hb-mast-nav a:focus-visible { color: var(--red); border-bottom-color: var(--red); outline: none; }

  /* HERO */
  .hb-hero {
    padding: 64px 56px 72px;
    display: grid; grid-template-columns: 1.1fr 1fr; gap: 56px;
    align-items: center;
  }
  .hb-hero-sheet {
    background: #F6EFDF;
    border: 1px solid rgba(60,40,20,0.2);
    box-shadow: 0 22px 36px -28px rgba(60,40,20,0.5), inset 0 0 0 8px rgba(0,0,0,0.02);
    aspect-ratio: 4 / 5;
    position: relative;
    padding: 24px;
    display: grid; grid-template-rows: 1fr auto; gap: 16px;
  }
  .hb-hero-tape {
    position: absolute; top: -10px; left: 44%; width: 12%; height: 80px;
    background: var(--tape);
    background-image: linear-gradient(90deg, rgba(0,0,0,0.04) 0 2px, transparent 2px 6px);
    box-shadow: 0 4px 8px -4px rgba(60,40,20,0.4);
    transform: rotate(-2deg);
  }
  .hb-hero-leaf { width: 70%; max-width: 340px; justify-self: center; align-self: end; }
  .hb-hero-tag {
    border-top: 1px solid rgba(60,40,20,0.3); padding-top: 14px;
    display: grid; grid-template-columns: 1fr auto; column-gap: 12px;
  }
  .hb-hero-tag-line { font-size: 18px; line-height: 1.4; }
  .hb-hero-tag-line.hb-tiny { grid-column: 1 / -1; }
  .hb-hero-tag-stamp {
    grid-column: 2; grid-row: 1;
    align-self: start; padding: 4px 10px;
    border: 1.5px solid var(--red); color: var(--red);
    font-family: 'Fraunces', serif; font-weight: 700; font-size: 11px; letter-spacing: 0.14em;
    transform: rotate(-3deg);
  }

  .hb-hero-eyebrow { font-size: 11px; letter-spacing: 0.2em; color: var(--red); text-transform: uppercase; margin-bottom: 18px; }
  .hb-hero-headline {
    font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(36px, 4.4vw, 56px); line-height: 1.06; margin: 0 0 18px;
    letter-spacing: -0.01em;
  }
  .hb-hero-headline em { font-style: italic; color: var(--brown); }
  .hb-hero-line { display: block; font-size: clamp(20px, 2.1vw, 26px); font-style: italic; color: var(--ink-soft); margin-top: 14px; line-height: 1.3; font-weight: 400; }
  .hb-hero-sub { font-size: 17px; line-height: 1.55; color: var(--ink-soft); max-width: 540px; }
  .hb-hero-ctas { display: flex; gap: 16px; margin: 26px 0 22px; flex-wrap: wrap; }
  .hb-hero-meta { display: flex; flex-wrap: wrap; gap: 18px; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-soft); }

  /* CTAs */
  .hb-cta {
    display: inline-block; padding: 14px 22px; font-size: 15px;
    font-style: italic; text-decoration: none; border-radius: 0;
    transition: background 200ms, color 200ms, transform 200ms;
  }
  .hb-cta-primary { background: var(--red); color: #FAF6EC; border: 1.5px solid var(--red); }
  .hb-cta-primary:hover, .hb-cta-primary:focus-visible { background: #6E2218; outline: none; transform: translateY(-1px); }
  .hb-cta-ghost { color: var(--ink); border: 1.5px solid var(--ink); background: transparent; }
  .hb-cta-ghost:hover, .hb-cta-ghost:focus-visible { background: var(--ink); color: var(--linen); outline: none; }

  /* SECTION HEADS */
  .hb-section-head { display: grid; grid-template-columns: 80px 1fr; gap: 28px; align-items: start; padding: 0 56px; margin-bottom: 36px; }
  .hb-section-head-num { font-family: 'Fraunces', serif; font-style: italic; font-size: 56px; color: var(--red); line-height: 1; }
  .hb-section-head h2 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 36px; margin: 0 0 8px; letter-spacing: -0.01em; }
  .hb-section-head p { font-size: 16px; line-height: 1.55; color: var(--ink-soft); max-width: 620px; margin: 0; font-style: italic; }

  /* REGISTER */
  .hb-register { padding: 32px 0 80px; }
  .hb-register-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px 28px; padding: 0 56px; }
  .hb-sheet {
    background: #F6EFDF;
    border: 1px solid rgba(60,40,20,0.18);
    padding: 22px;
    position: relative;
    box-shadow: 0 16px 24px -22px rgba(60,40,20,0.5);
    transition: transform 220ms ease, box-shadow 220ms ease;
    cursor: default;
    outline: none;
  }
  .hb-sheet:focus-visible { box-shadow: 0 0 0 2px var(--red), 0 16px 24px -22px rgba(60,40,20,0.5); }
  .hb-sheet-on { transform: translateY(-3px); box-shadow: 0 22px 30px -22px rgba(60,40,20,0.6); }
  .hb-sheet-tape {
    position: absolute; top: -8px; left: 48%; width: 14%; height: 28px;
    background: var(--tape);
    background-image: linear-gradient(90deg, rgba(0,0,0,0.05) 0 2px, transparent 2px 6px);
    box-shadow: 0 3px 6px -3px rgba(60,40,20,0.4);
    transform: rotate(-2deg);
    transition: transform 220ms ease;
  }
  .hb-tape-ochre { background-color: var(--tape-ochre); }
  .hb-sheet-on .hb-sheet-tape { transform: rotate(-3deg) translateY(-1px); }
  .hb-sheet-leaf { height: 130px; display: grid; place-items: center; margin-bottom: 12px; }
  .hb-sheet-leaf svg { max-height: 130px; }
  .hb-sheet-tag { border-top: 1px solid rgba(60,40,20,0.25); padding-top: 12px; }
  .hb-sheet-latin { font-size: 18px; line-height: 1.25; margin-bottom: 4px; }
  .hb-sheet-latin em { font-style: italic; }
  .hb-sheet-common { font-size: 13px; font-style: italic; color: var(--ink-soft); margin-bottom: 12px; }
  .hb-sheet-meta { display: grid; grid-template-columns: auto auto auto; gap: 6px 14px; margin: 0 0 14px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; }
  .hb-sheet-meta div { display: flex; flex-direction: column; }
  .hb-sheet-meta dt { color: var(--ink-soft); font-size: 9px; }
  .hb-sheet-meta dd { margin: 0; color: var(--ink); }
  .hb-sheet-note { font-size: 14px; line-height: 1.5; color: var(--ink-soft); font-style: italic; margin: 0 0 12px; }
  .hb-sheet-stamp {
    display: inline-block; padding: 3px 8px; border: 1.5px solid var(--red); color: var(--red);
    font-size: 10px; letter-spacing: 0.16em; transform: rotate(-2deg);
  }

  /* FIELD NOTES */
  .hb-fieldnotes {
    background: var(--linen-deep);
    padding: 64px 0 72px;
    border-top: 1px solid rgba(60,40,20,0.18);
    border-bottom: 1px solid rgba(60,40,20,0.18);
  }
  .hb-notes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; padding: 0 56px; }
  .hb-note {
    background: #F6EFDF;
    border: 1px solid rgba(60,40,20,0.18);
    padding: 22px 24px;
    position: relative;
    box-shadow: 0 12px 22px -22px rgba(60,40,20,0.4);
  }
  .hb-note-head { display: flex; justify-content: space-between; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--red); margin-bottom: 12px; }
  .hb-note-place { color: var(--ink-soft); }
  .hb-note-body { font-size: 16px; line-height: 1.6; font-style: italic; color: var(--ink); margin: 0 0 16px; }
  .hb-note-rule { height: 1px; background: repeating-linear-gradient(90deg, rgba(60,40,20,0.3) 0 4px, transparent 4px 8px); }

  /* INDEX */
  .hb-index { padding: 64px 0 56px; }
  .hb-index-grid {
    display: grid; grid-template-columns: repeat(8, 1fr); gap: 12px;
    padding: 0 56px;
  }
  .hb-index-bucket {
    background: #F6EFDF;
    border: 1px solid rgba(60,40,20,0.18);
    padding: 14px 12px;
    transition: background 200ms, border-color 200ms;
    outline: none;
  }
  .hb-index-bucket-on { background: #FAF3E1; border-color: var(--red); }
  .hb-index-bucket:focus-visible { border-color: var(--red); }
  .hb-index-letter { font-family: 'Fraunces', serif; font-style: italic; font-size: 28px; color: var(--red); margin-bottom: 8px; line-height: 1; }
  .hb-index-bucket ul { list-style: none; padding: 0; margin: 0; }
  .hb-index-bucket li { font-size: 12px; line-height: 1.6; color: var(--ink-soft); transition: color 200ms; }
  .hb-index-bucket-on li { color: var(--ink); }

  /* CTA BAND */
  .hb-cta-band {
    padding: 56px 56px 64px;
    background: var(--ink);
    color: var(--linen);
    border-top: 1px solid rgba(60,40,20,0.4);
  }
  .hb-cta-band-inner {
    display: grid; grid-template-columns: 1fr auto; gap: 36px;
    align-items: end;
  }
  .hb-cta-band h3 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 38px; line-height: 1.1; margin: 0 0 12px; letter-spacing: -0.01em; }
  .hb-cta-band p { font-size: 16px; line-height: 1.55; color: rgba(239,232,220,0.78); margin: 0; max-width: 540px; font-style: italic; }
  .hb-cta-band .hb-cta-primary { background: #B6391F; color: #FAF6EC; border-color: #B6391F; }
  .hb-cta-band .hb-cta-primary:hover, .hb-cta-band .hb-cta-primary:focus-visible { background: #D14525; }

  /* FOOTER */
  .hb-footer { padding: 36px 56px 28px; background: var(--linen); border-top: 1px solid rgba(60,40,20,0.25); }
  .hb-footer-row { display: grid; grid-template-columns: 1.2fr 1fr auto; gap: 36px; align-items: start; padding-bottom: 22px; }
  .hb-footer-press { display: flex; gap: 18px; align-items: center; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-soft); line-height: 1.7; }
  .hb-footer-mark {
    width: 56px; height: 56px; border: 1.5px solid var(--red); color: var(--red);
    display: grid; place-items: center; font-family: 'Fraunces', serif; font-weight: 700; font-size: 22px;
    border-radius: 50%;
  }
  .hb-footer-affil { font-size: 13px; line-height: 1.6; color: var(--ink-soft); font-style: italic; }
  .hb-footer-stamp {
    display: inline-grid; gap: 2px; padding: 8px 14px; border: 1.5px solid var(--red); color: var(--red);
    font-size: 10px; letter-spacing: 0.18em; transform: rotate(-2deg); align-self: start;
    text-align: center;
  }
  .hb-footer-stamp-num { font-family: 'Fraunces', serif; font-style: italic; font-size: 22px; color: var(--red); }
  .hb-footer-rule { height: 1px; background: rgba(60,40,20,0.22); margin-bottom: 14px; }
  .hb-footer-tiny { font-size: 11px; letter-spacing: 0.06em; color: var(--ink-soft); }

  @media (max-width: 980px) {
    .hb-masthead { flex-direction: column; gap: 20px; padding: 24px 28px; }
    .hb-mast-nav { flex-wrap: wrap; }
    .hb-hero { grid-template-columns: 1fr; padding: 36px 28px 48px; }
    .hb-section-head { padding: 0 28px; grid-template-columns: 56px 1fr; gap: 16px; }
    .hb-section-head-num { font-size: 40px; }
    .hb-register-grid { grid-template-columns: 1fr; padding: 0 28px; }
    .hb-notes { grid-template-columns: 1fr; padding: 0 28px; }
    .hb-index-grid { grid-template-columns: repeat(4, 1fr); padding: 0 28px; }
    .hb-cta-band { padding: 40px 28px 48px; }
    .hb-cta-band-inner { grid-template-columns: 1fr; }
    .hb-footer { padding: 28px 28px 24px; }
    .hb-footer-row { grid-template-columns: 1fr; gap: 22px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .hb-sheet, .hb-sheet-tape, .hb-cta, .hb-mast-nav a, .hb-index-bucket {
      transition: none !important;
    }
    .hb-sheet-on { transform: none; }
  }
`;
