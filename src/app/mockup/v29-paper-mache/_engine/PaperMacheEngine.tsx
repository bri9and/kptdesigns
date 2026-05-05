"use client";

/**
 * PaperMacheEngine — V29 Paper Mâché
 *
 * Three depths of torn paper at gentle parallax. Masking-tape callouts pinned
 * over copy. Iron-oxide accents. Crafted, not printed — finish carpentry made
 * by people who think in pencils and shop drawings.
 */

import { useState } from "react";

const PROJECTS = [
  {
    name: "Brookline brownstone — full millwork",
    where: "Brookline, MA",
    body:
      "Three-room baseboard run, hand-fit pilasters at the parlor doors, an inset bookcase scribed to a wall that hadn't been plumb since 1903.",
    tape: "blue",
    layer: 0,
  },
  {
    name: "Newton kitchen — paint-grade cabinets",
    where: "Newton, MA",
    body:
      "Twenty-eight inset doors, soft-close, beaded face-frames. Owner wanted shop-built, not flat-packed — we built it shop-built.",
    tape: "ochre",
    layer: 1,
  },
  {
    name: "Concord library — built-in",
    where: "Concord, MA",
    body:
      "Fourteen feet of shelving, three plinths, crown returned at both ends. Site-finished in oil-and-wax. Reads as if it grew there.",
    tape: "blue",
    layer: 2,
  },
  {
    name: "Cambridge mudroom — bench &amp; cubbies",
    where: "Cambridge, MA",
    body:
      "Bench seat with seat-board scribed to plaster. Six cubbies, six hooks, one secret compartment behind the dog's coat.",
    tape: "ochre",
    layer: 0,
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Story Pole",
    body:
      "Before any cut we transfer a wall to a 1x4 — every elevation, every height that matters. The pole walks back to the shop. Tape measures lie; story poles don't.",
    tape: "ochre",
  },
  {
    n: "02",
    title: "Plumb Cut",
    body:
      "Trim cuts get a level on the saw. Plumb when it should be plumb. Out of plumb when the wall asks us to be — and only then.",
    tape: "blue",
  },
  {
    n: "03",
    title: "Scribe to the Wall",
    body:
      "Old houses move. We scribe the back of every cabinet, every casing, every cope to the wall it's against — pencil, divider, file, fit.",
    tape: "ochre",
  },
];

const SHOP_TOOLS = [
  { name: "Stabila 78\" plate level", note: "in the corner, vials lit by work-light" },
  { name: "Festool Domino + MFT", note: "the only loose-tenon machine that earns its money" },
  { name: "Lufkin red folding rule", note: "kept in a back pocket, drawn before a tape measure" },
  { name: "Shop-vac on the saw", note: "it's not a clean shop, but the cuts are clean" },
  { name: "Occidental framer's bag", note: "tongue darkened from the hammer ball, twenty years on" },
  { name: "Carpenter's pencil", note: "sharpened with the utility knife on the bench" },
];

export default function PaperMacheEngine() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [hoveredProcess, setHoveredProcess] = useState<number | null>(null);

  return (
    <>
      <style>{css}</style>
      <div className="pm-shell">
        <div className="pm-bg-layer pm-bg-back" aria-hidden />
        <div className="pm-bg-layer pm-bg-mid" aria-hidden />
        <div className="pm-bg-layer pm-bg-front" aria-hidden />

        <header className="pm-nav">
          <div className="pm-mark">
            <div className="pm-mark-stack">
              <span className="pm-mark-name">KPT</span>
              <span className="pm-mark-sub">Finish carpentry &amp; millwork</span>
            </div>
          </div>
          <nav aria-label="Primary">
            <a href="#portfolio">Torn portfolio</a>
            <a href="#shop">The shop</a>
            <a href="#process">Process</a>
            <a href="#contact">Bring a drawing</a>
          </nav>
          <div className="pm-nav-tape pm-tape-blue" aria-hidden>
            <span>SHOP NO. 014</span>
          </div>
        </header>

        <section className="pm-hero">
          <div className="pm-hero-paper pm-paper-back" aria-hidden />
          <div className="pm-hero-paper pm-paper-mid" aria-hidden />
          <div className="pm-hero-paper pm-paper-front" aria-hidden />

          <div className="pm-hero-tape pm-tape-ochre">CALLOUT &middot; HEADLINE</div>

          <div className="pm-hero-content">
            <div className="pm-hero-eyebrow">
              <span className="pm-dot" aria-hidden />
              <span>Crafted by hand, built by us</span>
            </div>
            <h1 className="pm-hero-headline">
              Story poles. Plumb cuts. Scribe to the wall.
            </h1>
            <p className="pm-hero-sub">
              Finish carpentry — built piece by piece, by the same crew who hung the trim on your neighbor's
              place. We measure twice in the truck, once on the wall, and we cut once.
            </p>
            <div className="pm-hero-ctas">
              <a className="pm-cta pm-cta-primary" href="#contact">Bring me a drawing &rarr;</a>
              <a className="pm-cta pm-cta-ghost" href="#portfolio">See the millwork</a>
            </div>
            <div className="pm-hero-meta">
              <span>Three depths of paper, masking tape, iron oxide.</span>
              <span>Shop in Watertown, MA.</span>
            </div>
          </div>

          <div className="pm-hero-pin pm-tape-blue" aria-hidden>
            PINNED &middot; APR 2026
          </div>
        </section>

        <section id="portfolio" className="pm-portfolio">
          <div className="pm-section-head">
            <div className="pm-section-num">01</div>
            <div>
              <h2>Torn Portfolio</h2>
              <p>Recent jobs, layered as torn paper. Hover a card to lift it off the bench.</p>
            </div>
          </div>

          <div className="pm-cards">
            {PROJECTS.map((p, i) => (
              <article
                key={p.name}
                className={`pm-card pm-card-l${p.layer}${hovered === i ? " pm-card-on" : ""}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
              >
                <div className={`pm-card-tape pm-tape-${p.tape}`} aria-hidden>
                  <span>{p.where}</span>
                </div>
                <div className="pm-card-edge" aria-hidden />
                <h3 dangerouslySetInnerHTML={{ __html: p.name }} />
                <p>{p.body}</p>
                <div className="pm-card-meta">
                  <span>HAND-FIT</span>
                  <span>SHOP-BUILT</span>
                  <span>SITE-FINISHED</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="shop" className="pm-shop">
          <div className="pm-section-head">
            <div className="pm-section-num">02</div>
            <div>
              <h2>The Shop</h2>
              <p>A torn cross-section of the bench. Tools labeled in pencil, in our hand.</p>
            </div>
          </div>

          <div className="pm-shop-grid">
            <div className="pm-shop-illo" aria-hidden>
              <svg viewBox="0 0 600 360" width="100%" height="100%">
                <defs>
                  <pattern id="pm-paper" width="6" height="6" patternUnits="userSpaceOnUse">
                    <rect width="6" height="6" fill="#E9E1CE" />
                    <circle cx="2" cy="3" r="0.5" fill="#A89878" opacity="0.4" />
                  </pattern>
                </defs>
                <rect x="20" y="200" width="560" height="14" fill="url(#pm-paper)" stroke="#241B14" strokeWidth="1.2" />
                <rect x="40" y="214" width="14" height="120" fill="#5C4830" />
                <rect x="540" y="214" width="14" height="120" fill="#5C4830" />
                <rect x="270" y="214" width="14" height="120" fill="#5C4830" />
                <rect x="80" y="170" width="120" height="30" fill="#B14B2A" stroke="#241B14" strokeWidth="1.5" />
                <rect x="220" y="156" width="100" height="44" fill="#3D5C7A" stroke="#241B14" strokeWidth="1.5" />
                <rect x="350" y="170" width="180" height="30" fill="#7A8C5C" stroke="#241B14" strokeWidth="1.5" />
                <line x1="20" y1="60" x2="580" y2="60" stroke="#241B14" strokeWidth="0.8" strokeDasharray="4 6" />
                <text x="30" y="54" fontFamily="ui-monospace, SF Mono, Consolas, monospace" fontSize="11" fill="#241B14">CEILING — 8' 2"</text>
                <line x1="60" y1="60" x2="60" y2="200" stroke="#B14B2A" strokeWidth="1" strokeDasharray="3 3" />
                <text x="68" y="130" fontFamily="ui-monospace, SF Mono, Consolas, monospace" fontSize="10" fill="#B14B2A">HEAD HEIGHT</text>
                <text x="100" y="190" fontFamily="ui-monospace, SF Mono, Consolas, monospace" fontSize="10" fill="#241B14" transform="rotate(-3 100 190)">DOMINO</text>
                <text x="240" y="150" fontFamily="ui-monospace, SF Mono, Consolas, monospace" fontSize="10" fill="#241B14">FESTOOL TS75</text>
                <text x="380" y="190" fontFamily="ui-monospace, SF Mono, Consolas, monospace" fontSize="10" fill="#241B14">MFT/3 TABLE</text>
                <text x="36" y="350" fontFamily="ui-monospace, SF Mono, Consolas, monospace" fontSize="10" fill="#241B14">SAWHORSE — A</text>
                <text x="266" y="350" fontFamily="ui-monospace, SF Mono, Consolas, monospace" fontSize="10" fill="#241B14">SAWHORSE — B (COFFEE)</text>
                <text x="476" y="350" fontFamily="ui-monospace, SF Mono, Consolas, monospace" fontSize="10" fill="#241B14">SAWHORSE — C</text>
                <path d="M0 234 Q 40 224 80 234 T 200 234 T 380 234 T 580 234" fill="none" stroke="#5C8A3A" strokeWidth="3" />
                <text x="180" y="252" fontFamily="ui-monospace, SF Mono, Consolas, monospace" fontSize="10" fill="#3F6A22">VAC HOSE — IN A HELIX</text>
              </svg>
            </div>

            <ul className="pm-shop-list">
              {SHOP_TOOLS.map((t) => (
                <li key={t.name}>
                  <span className="pm-shop-name">{t.name}</span>
                  <span className="pm-shop-note">{t.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="process" className="pm-process">
          <div className="pm-section-head">
            <div className="pm-section-num">03</div>
            <div>
              <h2>Process</h2>
              <p>Three layered cards. Hover the topmost — it lifts.</p>
            </div>
          </div>

          <div className="pm-process-stack">
            {PROCESS.map((p, i) => (
              <div
                key={p.n}
                className={`pm-proc pm-proc-l${i}${hoveredProcess === i ? " pm-proc-on" : ""}`}
                onMouseEnter={() => setHoveredProcess(i)}
                onMouseLeave={() => setHoveredProcess(null)}
                onFocus={() => setHoveredProcess(i)}
                onBlur={() => setHoveredProcess(null)}
                tabIndex={0}
              >
                <div className={`pm-proc-tape pm-tape-${p.tape}`} aria-hidden>
                  STEP {p.n}
                </div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="pm-cta-band">
          <div className="pm-cta-band-paper" aria-hidden />
          <div className="pm-cta-band-tape pm-tape-ochre" aria-hidden>READY TO SCRIBE</div>
          <h3>Got a drawing? We'll meet at the kitchen table.</h3>
          <p>
            We work from drawings, sketches, magazine tear-outs, or a photo on a phone. Whichever the
            architect speaks. We'll pencil the rest.
          </p>
          <a className="pm-cta pm-cta-primary" href="mailto:shop@kptcarpentry.com">Bring me a drawing &rarr;</a>
        </section>

        <footer className="pm-footer">
          <div className="pm-footer-tape pm-tape-blue" aria-hidden>SHOP TAG</div>
          <div className="pm-footer-cols">
            <div className="pm-footer-col">
              <div className="pm-footer-mark">KPT</div>
              <div className="pm-footer-credit">
                Finish carpentry &amp; millwork.<br />
                Built piece by piece, by the same crew who answers the phone.
              </div>
            </div>
            <div className="pm-footer-col">
              <div className="pm-footer-h">SHOP</div>
              <div>14 Sawmill Road</div>
              <div>Watertown, MA 02472</div>
              <div className="pm-footer-pencil">By appointment — knock twice.</div>
            </div>
            <div className="pm-footer-col">
              <div className="pm-footer-h">PHONE</div>
              <div className="pm-footer-pencil">(617) 555-0144</div>
              <div className="pm-footer-h pm-footer-h-spaced">EMAIL</div>
              <div>shop@kptcarpentry.com</div>
            </div>
          </div>
          <div className="pm-footer-tiny">
            &copy; KPT &middot; MA license CSL-091873 &middot; insured to a million &middot; ASLA &mdash; sorry, AWI member.
          </div>
        </footer>
      </div>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Recoleta&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&family=Caveat:wght@500;600&display=swap');

  .pm-shell {
    --bone: #F4F1EB;
    --bone-deep: #ECE6D6;
    --news: #BFB9AB;
    --news-dark: #95907F;
    --iron: #B14B2A;
    --iron-deep: #863418;
    --ink: #241B14;
    --ink-soft: #4D3F30;
    --tape-ochre: #D6B280;
    --tape-blue: #93B0C4;
    font-family: 'Newsreader', 'Iowan Old Style', Georgia, serif;
    color: var(--ink);
    background: var(--bone);
    position: relative;
    overflow: hidden;
    min-height: 100vh;
  }
  .pm-shell h1, .pm-shell h2, .pm-shell h3 {
    font-family: 'Recoleta', 'Newsreader', Georgia, serif;
  }

  /* Background layers — three depths */
  .pm-bg-layer { position: absolute; inset: 0; pointer-events: none; }
  .pm-bg-back {
    background:
      radial-gradient(ellipse 80% 60% at 30% 20%, rgba(149,144,127,0.18), transparent 70%),
      radial-gradient(ellipse 60% 50% at 80% 70%, rgba(149,144,127,0.16), transparent 70%);
    z-index: 0;
  }
  .pm-bg-mid {
    background-image:
      radial-gradient(circle at 18% 18%, rgba(60,40,20,0.06) 0 1px, transparent 1px),
      radial-gradient(circle at 70% 60%, rgba(60,40,20,0.05) 0 1px, transparent 1px);
    background-size: 9px 9px, 13px 13px;
    z-index: 1;
  }
  .pm-bg-front {
    background-image: linear-gradient(180deg, transparent 0 60%, rgba(177,75,42,0.04) 100%);
    z-index: 2;
  }
  .pm-shell > *:not(.pm-bg-layer) { position: relative; z-index: 3; }

  /* Tape (shared) */
  .pm-tape-ochre, .pm-tape-blue {
    background-image: linear-gradient(90deg, rgba(0,0,0,0.05) 0 2px, transparent 2px 8px);
    box-shadow: 0 6px 10px -6px rgba(36,27,20,0.5);
    color: var(--ink); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
    font-family: 'Caveat', 'Newsreader', cursive; font-weight: 600; font-size: 13px;
  }
  .pm-tape-ochre { background-color: var(--tape-ochre); }
  .pm-tape-blue { background-color: var(--tape-blue); }

  /* NAV */
  .pm-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 56px 18px;
    border-bottom: 1px dashed rgba(36,27,20,0.18);
    position: relative;
  }
  .pm-mark { display: flex; align-items: center; gap: 14px; }
  .pm-mark-stack { display: flex; flex-direction: column; }
  .pm-mark-name { font-family: 'Recoleta', serif; font-weight: 700; font-size: 30px; line-height: 1; letter-spacing: -0.02em; }
  .pm-mark-sub { font-style: italic; color: var(--ink-soft); font-size: 13px; }
  .pm-nav nav { display: flex; gap: 22px; }
  .pm-nav nav a {
    color: var(--ink); text-decoration: none; font-size: 15px;
    border-bottom: 1.5px dotted transparent; padding-bottom: 2px;
    transition: border-color 200ms, color 200ms;
  }
  .pm-nav nav a:hover, .pm-nav nav a:focus-visible { color: var(--iron); border-bottom-color: var(--iron); outline: none; }
  .pm-nav-tape {
    position: absolute; top: 6px; right: 56px;
    padding: 4px 10px; transform: rotate(3deg);
    font-size: 11px;
  }

  /* HERO */
  .pm-hero {
    padding: 72px 56px 96px;
    position: relative;
    min-height: 540px;
  }
  .pm-hero-paper {
    position: absolute;
    border: 0;
    box-shadow: 0 16px 32px -24px rgba(36,27,20,0.5);
  }
  .pm-paper-back {
    inset: 60px 24% 90px 6%;
    background: var(--news);
    transform: rotate(-1.6deg);
    clip-path: polygon(0 6%, 4% 0, 24% 4%, 50% 0%, 78% 5%, 100% 0%, 100% 92%, 78% 100%, 50% 96%, 22% 100%, 0% 96%);
  }
  .pm-paper-mid {
    inset: 90px 8% 60px 18%;
    background: var(--bone-deep);
    transform: rotate(0.8deg);
    clip-path: polygon(0 4%, 16% 0%, 38% 5%, 60% 0%, 84% 4%, 100% 0%, 100% 96%, 84% 100%, 60% 94%, 38% 100%, 16% 95%, 0% 100%);
  }
  .pm-paper-front {
    inset: 70px 14% 70px 30%;
    background: #FBF7EB;
    transform: rotate(-0.6deg);
    clip-path: polygon(0 6%, 12% 0%, 36% 4%, 64% 0%, 88% 4%, 100% 0%, 100% 94%, 88% 100%, 64% 96%, 36% 100%, 12% 96%, 0% 100%);
    box-shadow: 0 28px 48px -28px rgba(36,27,20,0.55);
  }
  .pm-hero-tape {
    position: absolute; top: 38px; left: 8%; padding: 6px 14px;
    transform: rotate(-3deg);
    font-size: 12px;
  }
  .pm-hero-pin {
    position: absolute; bottom: 28px; right: 9%;
    padding: 6px 14px; transform: rotate(2deg); font-size: 12px;
  }
  .pm-hero-content {
    position: relative; z-index: 4;
    max-width: 720px;
    margin: 80px auto 0; padding: 0 24px;
  }
  .pm-hero-eyebrow {
    display: flex; align-items: center; gap: 10px; font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--iron); margin-bottom: 24px;
  }
  .pm-dot { display: inline-block; width: 8px; height: 8px; background: var(--iron); border-radius: 50%; box-shadow: 0 0 0 3px rgba(177,75,42,0.18); }
  .pm-hero-headline {
    font-size: clamp(40px, 5.6vw, 76px); line-height: 1.02; margin: 0 0 18px;
    font-weight: 700; letter-spacing: -0.025em; color: var(--ink);
  }
  .pm-hero-sub { font-size: 18px; line-height: 1.55; color: var(--ink-soft); max-width: 560px; margin-bottom: 24px; }
  .pm-hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 22px; }
  .pm-hero-meta { display: flex; flex-wrap: wrap; gap: 18px; font-size: 13px; color: var(--ink-soft); font-style: italic; }

  /* CTAs */
  .pm-cta {
    display: inline-block; padding: 14px 22px; font-size: 15px;
    text-decoration: none; border: 1.5px solid; transition: background 200ms, color 200ms, transform 200ms;
    font-weight: 500;
  }
  .pm-cta-primary { background: var(--iron); color: var(--bone); border-color: var(--iron); }
  .pm-cta-primary:hover, .pm-cta-primary:focus-visible { background: var(--iron-deep); border-color: var(--iron-deep); outline: none; transform: translateY(-1px); }
  .pm-cta-ghost { background: transparent; color: var(--ink); border-color: var(--ink); }
  .pm-cta-ghost:hover, .pm-cta-ghost:focus-visible { background: var(--ink); color: var(--bone); outline: none; }

  /* SECTIONS — heads */
  .pm-section-head {
    display: grid; grid-template-columns: 80px 1fr; gap: 24px; align-items: start;
    padding: 0 56px; margin-bottom: 32px;
  }
  .pm-section-num {
    font-family: 'Recoleta', serif; font-weight: 700; font-size: 56px;
    color: var(--iron); line-height: 1;
  }
  .pm-section-head h2 { font-size: 38px; margin: 0 0 8px; letter-spacing: -0.02em; font-weight: 700; }
  .pm-section-head p { font-size: 16px; color: var(--ink-soft); margin: 0; max-width: 560px; font-style: italic; }

  /* PORTFOLIO */
  .pm-portfolio { padding: 64px 0 80px; }
  .pm-cards {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px;
    padding: 0 56px;
  }
  .pm-card {
    position: relative;
    padding: 44px 28px 24px;
    border: 0;
    transition: transform 220ms ease, box-shadow 220ms ease;
    cursor: default;
    outline: none;
  }
  .pm-card:focus-visible { box-shadow: 0 0 0 2px var(--iron), 0 18px 28px -22px rgba(36,27,20,0.5) !important; }
  .pm-card-l0 { background: var(--bone-deep); transform: rotate(-0.5deg); }
  .pm-card-l1 { background: #FBF7EB; transform: rotate(0.4deg); }
  .pm-card-l2 { background: var(--news); transform: rotate(-0.3deg); }
  .pm-card-l0::before, .pm-card-l1::before, .pm-card-l2::before {
    content: ""; position: absolute; inset: -8px -10px -6px -10px;
    background: rgba(36,27,20,0.08); z-index: -1;
    clip-path: polygon(0 6%, 12% 0, 32% 4%, 60% 0, 88% 4%, 100% 0, 100% 96%, 88% 100%, 60% 94%, 32% 100%, 12% 96%, 0% 100%);
  }
  .pm-card { box-shadow: 0 14px 22px -22px rgba(36,27,20,0.5); }
  .pm-card-on { transform: translateY(-4px) rotate(-0.5deg); box-shadow: 0 22px 30px -22px rgba(36,27,20,0.6); }
  .pm-card-l1.pm-card-on { transform: translateY(-4px) rotate(0.4deg); }
  .pm-card-l2.pm-card-on { transform: translateY(-4px) rotate(-0.3deg); }
  .pm-card-tape {
    position: absolute; top: -10px; left: 18%; width: 64%; padding: 5px 10px;
    transform: rotate(-1.4deg); display: flex; justify-content: center;
  }
  .pm-card-tape span { font-family: 'Caveat', cursive; font-size: 14px; }
  .pm-card-edge { position: absolute; inset: 0; border: 1px dashed rgba(36,27,20,0.1); pointer-events: none; }
  .pm-card h3 { font-size: 22px; margin: 0 0 10px; font-weight: 600; letter-spacing: -0.01em; }
  .pm-card p { font-size: 15px; line-height: 1.55; color: var(--ink-soft); margin: 0 0 14px; }
  .pm-card-meta { display: flex; gap: 12px; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--iron); flex-wrap: wrap; }

  /* SHOP */
  .pm-shop { padding: 56px 0 72px; background: var(--bone-deep); border-top: 1px dashed rgba(36,27,20,0.18); border-bottom: 1px dashed rgba(36,27,20,0.18); }
  .pm-shop-grid {
    display: grid; grid-template-columns: 1.4fr 1fr; gap: 36px;
    padding: 0 56px;
  }
  .pm-shop-illo {
    background: #FBF7EB;
    border: 1px solid rgba(36,27,20,0.15);
    box-shadow: 0 16px 24px -22px rgba(36,27,20,0.5);
    padding: 22px 14px;
  }
  .pm-shop-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 14px; align-content: start; }
  .pm-shop-list li {
    background: #FBF7EB;
    border: 1px solid rgba(36,27,20,0.12);
    padding: 14px 16px;
    display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: baseline;
  }
  .pm-shop-name { font-weight: 600; font-size: 15px; }
  .pm-shop-note { font-style: italic; color: var(--ink-soft); font-size: 13px; }

  /* PROCESS */
  .pm-process { padding: 64px 0 88px; }
  .pm-process-stack {
    position: relative; max-width: 760px; margin: 0 auto; padding: 0 56px;
    display: grid; gap: 14px;
  }
  .pm-proc {
    position: relative; padding: 30px 32px 26px;
    border: 1px solid rgba(36,27,20,0.18);
    box-shadow: 0 14px 22px -22px rgba(36,27,20,0.5);
    transition: transform 220ms ease, box-shadow 220ms ease;
    outline: none;
  }
  .pm-proc-l0 { background: #FBF7EB; transform: rotate(-0.4deg); }
  .pm-proc-l1 { background: var(--bone-deep); transform: rotate(0.3deg); margin-left: 10%; }
  .pm-proc-l2 { background: var(--news); transform: rotate(-0.2deg); margin-left: 5%; margin-right: 5%; }
  .pm-proc-on { transform: translateY(-4px) rotate(-0.4deg); box-shadow: 0 24px 30px -22px rgba(36,27,20,0.6); }
  .pm-proc-l1.pm-proc-on { transform: translateY(-4px) rotate(0.3deg); }
  .pm-proc-l2.pm-proc-on { transform: translateY(-4px) rotate(-0.2deg); }
  .pm-proc:focus-visible { box-shadow: 0 0 0 2px var(--iron), 0 14px 22px -22px rgba(36,27,20,0.5); }
  .pm-proc-tape {
    position: absolute; top: -10px; left: 24px; padding: 5px 12px;
    transform: rotate(-2deg); font-size: 11px;
  }
  .pm-proc h3 { font-size: 26px; margin: 4px 0 10px; font-weight: 600; letter-spacing: -0.01em; }
  .pm-proc p { font-size: 15px; line-height: 1.6; color: var(--ink-soft); margin: 0; max-width: 560px; }

  /* CTA BAND */
  .pm-cta-band { position: relative; padding: 72px 56px 80px; text-align: center; }
  .pm-cta-band-paper {
    position: absolute; inset: 32px 14%; background: var(--bone-deep);
    box-shadow: 0 20px 36px -24px rgba(36,27,20,0.5);
    clip-path: polygon(0 6%, 12% 0, 32% 4%, 56% 0, 80% 4%, 100% 0%, 100% 94%, 80% 100%, 56% 96%, 32% 100%, 12% 96%, 0% 100%);
    z-index: 0;
  }
  .pm-cta-band-tape {
    position: absolute; top: 50px; left: 42%; padding: 6px 14px;
    transform: rotate(-2deg); z-index: 2; font-size: 12px;
  }
  .pm-cta-band h3, .pm-cta-band p, .pm-cta-band a { position: relative; z-index: 1; }
  .pm-cta-band h3 { font-size: clamp(30px, 3.6vw, 44px); margin: 18px 0 14px; font-weight: 700; letter-spacing: -0.02em; }
  .pm-cta-band p { font-size: 17px; color: var(--ink-soft); max-width: 540px; margin: 0 auto 26px; line-height: 1.55; font-style: italic; }

  /* FOOTER */
  .pm-footer {
    position: relative;
    background: var(--ink);
    color: var(--bone);
    padding: 48px 56px 36px;
  }
  .pm-footer-tape {
    position: absolute; top: -14px; left: 56px; padding: 6px 14px;
    transform: rotate(-2deg);
  }
  .pm-footer-cols { display: grid; grid-template-columns: 1.3fr 1fr 1fr; gap: 36px; padding-bottom: 24px; border-bottom: 1px dashed rgba(244,241,235,0.25); }
  .pm-footer-col { display: grid; gap: 6px; font-size: 14px; line-height: 1.6; }
  .pm-footer-mark { font-family: 'Recoleta', serif; font-weight: 700; font-size: 36px; letter-spacing: -0.02em; }
  .pm-footer-credit { font-style: italic; color: rgba(244,241,235,0.78); font-size: 14px; line-height: 1.55; }
  .pm-footer-h { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--tape-ochre); }
  .pm-footer-h-spaced { margin-top: 12px; }
  .pm-footer-pencil { font-family: 'Caveat', cursive; font-size: 18px; color: #F4F1EB; }
  .pm-footer-tiny { padding-top: 18px; font-size: 12px; color: rgba(244,241,235,0.6); letter-spacing: 0.04em; }

  @media (max-width: 980px) {
    .pm-nav { padding: 20px 24px; flex-wrap: wrap; gap: 12px; }
    .pm-nav-tape { display: none; }
    .pm-hero { padding: 48px 16px 64px; }
    .pm-paper-back, .pm-paper-mid, .pm-paper-front { inset: 30px 4%; }
    .pm-hero-content { padding: 0 16px; margin-top: 40px; }
    .pm-hero-tape, .pm-hero-pin { display: none; }
    .pm-section-head { padding: 0 24px; grid-template-columns: 56px 1fr; gap: 16px; }
    .pm-section-num { font-size: 38px; }
    .pm-cards { grid-template-columns: 1fr; padding: 0 24px; }
    .pm-shop-grid { grid-template-columns: 1fr; padding: 0 24px; }
    .pm-process-stack { padding: 0 24px; }
    .pm-proc-l1, .pm-proc-l2 { margin-left: 0; margin-right: 0; }
    .pm-cta-band { padding: 56px 24px 64px; }
    .pm-cta-band-paper { inset: 24px 4%; }
    .pm-footer { padding: 36px 24px 28px; }
    .pm-footer-cols { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    .pm-card, .pm-proc, .pm-cta, .pm-nav nav a {
      transition: none !important;
    }
    .pm-card-on, .pm-proc-on, .pm-card-l0.pm-card-on, .pm-card-l1.pm-card-on, .pm-card-l2.pm-card-on,
    .pm-proc-l0.pm-proc-on, .pm-proc-l1.pm-proc-on, .pm-proc-l2.pm-proc-on {
      transform: none !important;
    }
  }
`;
