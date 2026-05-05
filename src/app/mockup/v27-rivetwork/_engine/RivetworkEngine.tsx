"use client";

/**
 * RivetworkEngine — V27 Rivetwork
 *
 * Cold-rolled steel plate. Plasma-cut wordmark. Weld bead dividers.
 * Plates slide in with a thunk; rivets pop in row by row; hover pulses
 * the weld seam with hot-orange that cools to slag.
 */

import { useEffect, useRef, useState } from "react";

const PLATES = [
  {
    code: "PLATE 01",
    title: "TEAR-OFF",
    headline: "Strip to deck. Inspect every sheet.",
    body: "Three-layer tear-offs handled by hand. Every nail pulled. Sheathing inspected for rot at every valley and around every chimney chase. Trash-haul on-site, broom-clean before sundown.",
    list: ["Layered tear-off (1, 2, 3 layers)", "Sheathing replacement at rot", "Magnetic-sweep yard cleanup", "Same-day trash haul"],
  },
  {
    code: "PLATE 02",
    title: "DRY-IN",
    headline: "Ice-and-water at every valley. Synthetic on the field.",
    body: "Self-adhered membrane runs eaves, valleys, around skylights and pipe boots. Synthetic underlayment over the field. Drip edge installed before the first ice-and-water course goes down. Six-nail pattern on every shingle.",
    list: ["Ice-and-water 6 ft up from eave", "Synthetic field underlay", "Drip edge under ice-and-water at eaves", "6-nail pattern, 1\" from edges"],
  },
  {
    code: "PLATE 03",
    title: "RIDGE CAP",
    headline: "Cap before sundown. Clean perimeter.",
    body: "Ridge vent cut and capped before the last shingle goes down. Step flashing tied into siding at every wall. Pipe boots in graduated sizes, color-matched to the cap. Manufacturer cert filed, registration uploaded.",
    list: ["Ridge vent + cap shingle", "Step flashing tied to siding", "Color-matched pipe boots", "Mfg. cert filed same week"],
  },
];

const NAIL_PATTERN = [
  { row: 1, col: 1 },
  { row: 1, col: 2 },
  { row: 2, col: 1 },
  { row: 2, col: 2 },
  { row: 3, col: 1 },
  { row: 3, col: 2 },
];

const RECENT_ROOFS = [
  {
    addr: "44 Wachusett Drive &middot; Concord, MA",
    sf: "2,840 SF",
    pitch: "8/12",
    note: "Three-layer tear-off, full ice-and-water, GAF Timberline HDZ Charcoal.",
  },
  {
    addr: "207 Beacon Street &middot; Boston, MA",
    sf: "1,920 SF",
    pitch: "12/12",
    note: "Slate replacement on a Mansard. Copper step flashing. Lead boot caps.",
  },
  {
    addr: "Holiday Inn Rt-1 &middot; Saugus, MA",
    sf: "12,400 SF",
    pitch: "1/12",
    note: "Commercial TPO over ISO insulation. Ridge attenuation, fully welded seams.",
  },
  {
    addr: "8 Hayfield Lane &middot; Lincoln, MA",
    sf: "3,420 SF",
    pitch: "10/12",
    note: "Cedar shake-to-asphalt conversion. Perimeter metal, kick-out at every wall.",
  },
];

export default function RivetworkEngine() {
  const [revealedPlates, setRevealedPlates] = useState<Set<number>>(new Set());
  const plateRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = Number(e.target.getAttribute("data-plate-idx"));
          if (e.isIntersecting) {
            setRevealedPlates((prev) => {
              if (prev.has(idx)) return prev;
              const next = new Set(prev);
              next.add(idx);
              return next;
            });
          }
        });
      },
      { threshold: 0.25 }
    );
    plateRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="rv-shell">
        <div className="rv-grit" aria-hidden />
        <div className="rv-hatch" aria-hidden />

        {/* TOP BAR */}
        <header className="rv-top">
          <div className="rv-mark">
            <svg className="rv-mark-cut" viewBox="0 0 220 48" aria-hidden>
              <defs>
                <linearGradient id="rv-cut" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0a0a0a" />
                  <stop offset="100%" stopColor="#222" />
                </linearGradient>
              </defs>
              <text
                x="0"
                y="38"
                fontFamily="Mona Sans, Arial Black, system-ui"
                fontSize="38"
                fontWeight="900"
                fill="url(#rv-cut)"
                stroke="#5A2E1E"
                strokeWidth="0.5"
                letterSpacing="0.04em"
              >
                NORTH FORK
              </text>
            </svg>
            <span className="rv-mark-tag">Roofing &middot; Plate &amp; Plasma &middot; Est. 1989</span>
          </div>
          <nav className="rv-nav">
            <a className="rv-nav-link" href="#plates">Plates</a>
            <a className="rv-nav-link" href="#pattern">Bolt pattern</a>
            <a className="rv-nav-link" href="#roofs">Recent roofs</a>
            <a className="rv-nav-link rv-nav-call" href="#call">555 &middot; ROOF &middot; 1B</a>
          </nav>
        </header>

        {/* HERO PLATE */}
        <section className="rv-hero">
          <div className="rv-rivets" aria-hidden>
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} style={{ ["--rv-i" as string]: String(i) }} />
            ))}
          </div>

          <svg className="rv-cut-mark" viewBox="0 0 960 160" aria-hidden>
            <defs>
              <filter id="rv-recess">
                <feOffset dx="0" dy="2" />
                <feGaussianBlur stdDeviation="1.5" result="blurOut" />
                <feComposite in="blurOut" in2="SourceGraphic" operator="arithmetic" k1="0" k2="-1" k3="1" k4="0" />
              </filter>
            </defs>
            <text
              x="0"
              y="120"
              fontFamily="Mona Sans, Arial Black, system-ui"
              fontSize="148"
              fontWeight="900"
              fill="#0a0a0a"
              stroke="#FF6B1C"
              strokeWidth="0.6"
              letterSpacing="0.02em"
            >
              NORTH FORK
            </text>
          </svg>

          <span className="rv-weld" aria-hidden />

          <div className="rv-hero-body">
            <span className="rv-eyebrow">PLATE STEEL &middot; PLASMA-CUT &middot; SHOP NO. 4</span>
            <h1 className="rv-headline">
              <span>TEAR-OFF.</span>
              <span>DRY-IN.</span>
              <span className="rv-headline-accent">DONE BEFORE THE RAIN.</span>
            </h1>
            <p className="rv-sub">
              Commercial and residential roofing. 6-nail pattern at every
              shingle. Ice-and-water at every valley. Ridge cap before sundown,
              every job.
            </p>
            <div className="rv-cta-row">
              <a href="#plates" className="rv-cta rv-cta-primary">Schedule a tear-off</a>
              <a href="#call" className="rv-cta rv-cta-secondary">Inspect my roof</a>
            </div>
          </div>
        </section>

        {/* PLATES */}
        <section id="plates" className="rv-plates">
          <header className="rv-section-head">
            <span className="rv-section-eyebrow">PLATES / 03 STAGES</span>
            <h2 className="rv-section-title">THE STACK.</h2>
            <p className="rv-section-lead">
              Three plates, three stages. Every roof we put on this house
              walks this stack &mdash; tear-off, dry-in, ridge cap.
            </p>
          </header>

          <div className="rv-plate-stack">
            {PLATES.map((p, i) => (
              <article
                key={p.title}
                ref={(el) => { plateRefs.current[i] = el; }}
                data-plate-idx={i}
                className={`rv-plate${revealedPlates.has(i) ? " rv-plate-in" : ""}`}
                style={{ ["--plate-i" as string]: String(i) }}
                tabIndex={0}
              >
                <div className="rv-plate-rivets" aria-hidden>
                  <span /><span /><span /><span />
                </div>
                <div className="rv-plate-stencil">{p.code}</div>
                <h3 className="rv-plate-title">{p.title}</h3>
                <span className="rv-plate-weld" aria-hidden />
                <div className="rv-plate-grid">
                  <div className="rv-plate-headline">{p.headline}</div>
                  <p className="rv-plate-body">{p.body}</p>
                  <ul className="rv-plate-list">
                    {p.list.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* THE BOLT PATTERN */}
        <section id="pattern" className="rv-pattern">
          <div className="rv-pattern-grid">
            <div className="rv-pattern-text">
              <span className="rv-section-eyebrow">THE 6-NAIL PATTERN</span>
              <h2 className="rv-section-title">SIX NAILS. EVERY SHINGLE.</h2>
              <p className="rv-pattern-body">
                The four-nail pattern is to spec. The six-nail pattern is
                North Fork. Two extra fasteners, every shingle, every roof,
                no charge. It&rsquo;s why our roofs survive 90mph gusts and
                the four-nail roofs across the street come off.
              </p>
              <ul className="rv-pattern-list">
                <li>One inch from each edge, two centered.</li>
                <li>1.25-inch ring-shank galvanized.</li>
                <li>Driven flush, never overdriven.</li>
                <li>Photographed at QC.</li>
              </ul>
            </div>

            <div className="rv-shingle">
              <div className="rv-shingle-plate">
                <div className="rv-shingle-grid" aria-hidden>
                  {NAIL_PATTERN.map((n, i) => (
                    <span
                      key={i}
                      className="rv-shingle-nail"
                      style={{
                        ["--nail-row" as string]: n.row,
                        ["--nail-col" as string]: n.col,
                        ["--nail-i" as string]: i,
                      }}
                    />
                  ))}
                </div>
                <div className="rv-shingle-tab" aria-hidden />
              </div>
              <div className="rv-shingle-caption">SHINGLE TAB &middot; 6-NAIL PATTERN</div>
            </div>
          </div>
        </section>

        {/* RECENT ROOFS */}
        <section id="roofs" className="rv-roofs">
          <header className="rv-section-head">
            <span className="rv-section-eyebrow">RECENT ROOFS / FIELD LOG</span>
            <h2 className="rv-section-title">THE LAST FOUR.</h2>
          </header>
          <div className="rv-roof-grid">
            {RECENT_ROOFS.map((r) => (
              <article key={r.addr} className="rv-roof-card">
                <div className="rv-roof-corners" aria-hidden>
                  <span /><span /><span /><span />
                </div>
                <div className="rv-roof-meta">
                  <span>{r.sf}</span>
                  <span>{r.pitch} PITCH</span>
                </div>
                <div
                  className="rv-roof-addr"
                  dangerouslySetInnerHTML={{ __html: r.addr }}
                />
                <span className="rv-roof-rule" aria-hidden />
                <p className="rv-roof-note">{r.note}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CALL CTA */}
        <section id="call" className="rv-call">
          <div className="rv-call-plate">
            <div className="rv-call-corners" aria-hidden>
              <span /><span /><span /><span />
            </div>
            <span className="rv-section-eyebrow">SCHEDULE A TEAR-OFF</span>
            <h2 className="rv-call-title">LIFETIME WARRANTY. 14-DAY LEAD.</h2>
            <p className="rv-call-body">
              We work every weekday and most Saturdays. Roof inspections are
              free and take forty minutes. Lead time is two weeks unless
              you&rsquo;ve got blue tarp on the roof &mdash; then we work
              you in this week.
            </p>
            <div className="rv-call-row">
              <a href="tel:5557663112" className="rv-cta rv-cta-primary">555 &middot; 766 &middot; 3112</a>
              <a href="#plates" className="rv-cta rv-cta-secondary">See our process</a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="rv-footer">
          <div className="rv-footer-row">
            <div className="rv-footer-cert">
              <span>OSHA</span>
              <span>30-HR</span>
            </div>
            <div className="rv-footer-cert">
              <span>GAF</span>
              <span>MASTER ELITE</span>
            </div>
            <div className="rv-footer-cert">
              <span>CERTAINTEED</span>
              <span>SELECT SHINGLEMASTER</span>
            </div>
            <div className="rv-footer-cert">
              <span>MA HIC</span>
              <span>#142284</span>
            </div>
          </div>
          <div className="rv-footer-base">
            <span>NORTH FORK ROOFING &mdash; PLATE &amp; PLASMA</span>
            <span>1442 INDUSTRIAL PKWY, WORCESTER, MA</span>
            <span>&copy; 2026 NORTH FORK</span>
          </div>
        </footer>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Mona+Sans:wght@400;500;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap');

.rv-shell {
  position: relative;
  min-height: 100vh;
  background:
    radial-gradient(ellipse at 30% 20%, #4A4A4D 0%, #2A2A2E 60%, #1B1B1B 100%);
  color: #E8E5DD;
  font-family: 'Mona Sans', system-ui, sans-serif;
  padding: 28px 28px 56px;
  overflow: hidden;
}

.rv-grit {
  position: fixed;
  inset: 0;
  background-image:
    repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px),
    radial-gradient(0.6px 0.6px at 12% 38%, rgba(0,0,0,0.18), transparent),
    radial-gradient(0.6px 0.6px at 48% 18%, rgba(0,0,0,0.14), transparent),
    radial-gradient(0.5px 0.5px at 82% 76%, rgba(0,0,0,0.16), transparent),
    radial-gradient(0.5px 0.5px at 22% 88%, rgba(0,0,0,0.12), transparent);
  pointer-events: none;
  z-index: 0;
  opacity: 0.55;
}
.rv-hatch {
  position: fixed;
  inset: 0;
  background-image: repeating-linear-gradient(135deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 2px, transparent 2px, transparent 6px);
  pointer-events: none;
  z-index: 0;
}

.rv-top {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 8px 4px 22px;
  border-bottom: 2px solid #5A2E1E;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
}
.rv-mark { display: flex; flex-direction: column; gap: 6px; }
.rv-mark-cut { width: 220px; height: 48px; }
.rv-mark-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  color: #B5B0A2;
  text-transform: uppercase;
}

.rv-nav {
  display: flex;
  gap: 28px;
  align-items: center;
  flex-wrap: wrap;
}
.rv-nav-link {
  color: #E8E5DD;
  text-decoration: none;
  font-family: 'Mona Sans', sans-serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-stretch: 125%;
  position: relative;
  padding: 4px 0;
  transition: color 220ms ease;
}
.rv-nav-link::after {
  content: '';
  position: absolute;
  left: 0; bottom: -2px;
  width: 100%; height: 2px;
  background: #FF6B1C;
  box-shadow: 0 0 8px rgba(255, 107, 28, 0.6);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 280ms cubic-bezier(0.7, 0, 0.3, 1);
}
.rv-nav-link:hover, .rv-nav-link:focus-visible {
  color: #FF6B1C;
  outline: none;
}
.rv-nav-link:hover::after, .rv-nav-link:focus-visible::after { transform: scaleX(1); }
.rv-nav-call {
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.1em;
  background: #FF6B1C;
  color: #1B1B1B;
  padding: 8px 14px;
  box-shadow: 0 0 16px rgba(255, 107, 28, 0.4);
}
.rv-nav-call::after { display: none; }
.rv-nav-call:hover, .rv-nav-call:focus-visible {
  background: #FFB347;
  color: #1B1B1B;
}
@media (prefers-reduced-motion: reduce) {
  .rv-nav-link::after { transition: none; }
}

.rv-hero {
  position: relative;
  z-index: 2;
  padding: 56px 24px 96px;
  background:
    radial-gradient(ellipse 90% 70% at 30% 30%, #6E7178 0%, #46484C 60%, #2A2A2E 100%);
  border: 1.5px solid #1A1A1A;
  border-bottom-color: #5A2E1E;
  margin-bottom: 64px;
  box-shadow:
    inset 0 0 80px rgba(90, 46, 30, 0.25),
    inset 0 -2px 0 rgba(255, 107, 28, 0.15),
    0 4px 16px rgba(0, 0, 0, 0.4);
  background-image:
    repeating-linear-gradient(135deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 8px),
    radial-gradient(ellipse 90% 70% at 30% 30%, #6E7178 0%, #46484C 60%, #2A2A2E 100%);
  overflow: hidden;
}
.rv-hero::before {
  content: '';
  position: absolute;
  top: 0; right: 0;
  bottom: 0; width: 24%;
  background: linear-gradient(90deg, transparent 0%, rgba(90, 46, 30, 0.65) 35%, rgba(90, 46, 30, 0.85) 100%);
  background-image:
    radial-gradient(ellipse at 100% 50%, rgba(80, 40, 20, 0.45), transparent 70%),
    repeating-linear-gradient(90deg, rgba(120, 60, 30, 0.12) 0px, rgba(120, 60, 30, 0.12) 2px, transparent 2px, transparent 6px);
  mix-blend-mode: multiply;
  pointer-events: none;
}

.rv-rivets {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  pointer-events: none;
  padding: 18px 28px;
}
.rv-rivets span {
  --rv-i: 0;
  align-self: flex-start;
  width: 14px; height: 14px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #888, #2A2A2A 70%, #0a0a0a);
  box-shadow: inset 0 0 0 1px #0a0a0a, 0 1px 2px rgba(0,0,0,0.4);
  animation: rv-pop 800ms cubic-bezier(0.22, 1.4, 0.36, 1) calc(var(--rv-i) * 60ms) backwards;
  justify-self: center;
}
@keyframes rv-pop {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.18); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .rv-rivets span { animation: none; }
}

.rv-cut-mark {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  max-width: 920px;
  height: auto;
  margin: 36px 0 16px;
  filter: drop-shadow(0 2px 0 rgba(0,0,0,0.5)) drop-shadow(0 -1px 0 rgba(255,255,255,0.04));
}

.rv-weld {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 12px;
  margin: 8px 0 32px;
  background:
    linear-gradient(180deg, #1A1A1A 0%, #5A2E1E 25%, #FF6B1C 45%, #FF8A3E 50%, #FF6B1C 55%, #5A2E1E 75%, #1A1A1A 100%);
  background-size: 18px 100%;
  background-image:
    linear-gradient(180deg, #1A1A1A 0%, #5A2E1E 25%, #FF6B1C 45%, #FF8A3E 50%, #FF6B1C 55%, #5A2E1E 75%, #1A1A1A 100%),
    repeating-linear-gradient(90deg,
      rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 1px,
      transparent 1px, transparent 5px,
      rgba(255, 138, 62, 0.4) 5px, rgba(255, 138, 62, 0.4) 7px,
      transparent 7px, transparent 12px);
  box-shadow:
    inset 0 0 4px rgba(0,0,0,0.6),
    0 0 12px rgba(255, 107, 28, 0.4);
}

.rv-hero-body { position: relative; z-index: 1; max-width: 880px; }
.rv-eyebrow {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.28em;
  color: #FF6B1C;
  background: rgba(0,0,0,0.55);
  padding: 6px 12px;
  margin-bottom: 28px;
  border: 1px solid rgba(255, 107, 28, 0.5);
}
.rv-headline {
  font-family: 'Mona Sans', sans-serif;
  font-weight: 900;
  font-stretch: 125%;
  font-size: clamp(48px, 7.4vw, 112px);
  line-height: 0.92;
  letter-spacing: -0.01em;
  color: #E8E5DD;
  margin: 0 0 28px;
  text-shadow: 0 2px 0 rgba(0,0,0,0.55), 0 0 18px rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
}
.rv-headline-accent { color: #FF6B1C; text-shadow: 0 0 12px rgba(255, 107, 28, 0.45), 0 2px 0 rgba(0,0,0,0.55); }

.rv-sub {
  font-family: 'Mona Sans', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.55;
  color: #C8C3B5;
  max-width: 560px;
  margin: 0 0 36px;
}

.rv-cta-row { display: flex; flex-wrap: wrap; gap: 14px; }
.rv-cta {
  font-family: 'Mona Sans', sans-serif;
  font-weight: 700;
  font-stretch: 125%;
  font-size: 14px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 14px 26px;
  text-decoration: none;
  border: 2px solid;
  display: inline-block;
  transition: all 220ms ease;
}
.rv-cta-primary {
  background: #FF6B1C;
  border-color: #FF6B1C;
  color: #1B1B1B;
  box-shadow: 0 0 16px rgba(255, 107, 28, 0.4), inset 0 -2px 0 rgba(0,0,0,0.25);
}
.rv-cta-primary:hover, .rv-cta-primary:focus-visible {
  outline: none;
  background: #FFB347;
  border-color: #FFB347;
  box-shadow: 0 0 28px rgba(255, 179, 71, 0.65);
  transform: translateY(-2px);
}
.rv-cta-secondary {
  background: transparent;
  border-color: #C8C3B5;
  color: #E8E5DD;
}
.rv-cta-secondary:hover, .rv-cta-secondary:focus-visible {
  outline: none;
  background: rgba(232, 229, 221, 0.1);
  border-color: #FF6B1C;
  color: #FF6B1C;
  transform: translateY(-2px);
}
@media (prefers-reduced-motion: reduce) {
  .rv-cta { transition: none; }
}

.rv-section-head { margin-bottom: 40px; max-width: 720px; }
.rv-section-eyebrow {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.28em;
  color: #FF6B1C;
  margin-bottom: 12px;
}
.rv-section-title {
  font-family: 'Mona Sans', sans-serif;
  font-weight: 900;
  font-stretch: 125%;
  font-size: clamp(36px, 5.4vw, 72px);
  line-height: 0.96;
  letter-spacing: -0.01em;
  color: #E8E5DD;
  margin: 0 0 16px;
  text-shadow: 0 2px 0 rgba(0,0,0,0.4);
}
.rv-section-lead {
  font-family: 'Mona Sans', sans-serif;
  font-size: 17px;
  line-height: 1.55;
  color: #C8C3B5;
  max-width: 600px;
  margin: 0;
}

.rv-plates {
  position: relative;
  z-index: 2;
  padding: 56px 0 64px;
  border-top: 1.5px solid #5A2E1E;
}

.rv-plate-stack {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.rv-plate {
  --plate-i: 0;
  position: relative;
  background:
    linear-gradient(180deg, #46484C 0%, #34363A 100%);
  border: 2px solid #1A1A1A;
  padding: 36px 36px 32px;
  box-shadow:
    inset 0 0 60px rgba(0,0,0,0.4),
    0 6px 18px rgba(0,0,0,0.45);
  background-image:
    repeating-linear-gradient(135deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 8px),
    linear-gradient(180deg, #46484C 0%, #34363A 100%);
  transform: translateX(calc((var(--plate-i) % 2 == 0 ? -1 : 1) * 80px)) translateY(40px);
  opacity: 0;
  transition: transform 720ms cubic-bezier(0.22, 1.0, 0.36, 1), opacity 600ms ease;
  outline: none;
  cursor: default;
}
.rv-plate-in {
  transform: translateX(0) translateY(0);
  opacity: 1;
}
@media (prefers-reduced-motion: reduce) {
  .rv-plate { transform: none; opacity: 1; transition: none; }
}

.rv-plate-rivets {
  position: absolute;
  inset: 12px;
  pointer-events: none;
}
.rv-plate-rivets span {
  position: absolute;
  width: 12px; height: 12px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #888, #2A2A2A 70%, #0a0a0a);
  box-shadow: inset 0 0 0 1px #0a0a0a, 0 1px 2px rgba(0,0,0,0.5);
}
.rv-plate-rivets span:nth-child(1) { top: 0; left: 0; }
.rv-plate-rivets span:nth-child(2) { top: 0; right: 0; }
.rv-plate-rivets span:nth-child(3) { bottom: 0; left: 0; }
.rv-plate-rivets span:nth-child(4) { bottom: 0; right: 0; }

.rv-plate-stencil {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.28em;
  color: #FF6B1C;
  margin-bottom: 12px;
}
.rv-plate-title {
  font-family: 'Mona Sans', sans-serif;
  font-weight: 900;
  font-stretch: 125%;
  font-size: clamp(36px, 5vw, 64px);
  line-height: 0.94;
  margin: 0 0 16px;
  letter-spacing: 0.01em;
  color: #E8E5DD;
  text-shadow: 0 1px 0 rgba(0,0,0,0.7), 0 -1px 0 rgba(255,255,255,0.06);
}
.rv-plate-weld {
  display: block;
  width: 80px;
  height: 6px;
  background: linear-gradient(180deg, #1A1A1A 0%, #5A2E1E 30%, #FF6B1C 50%, #5A2E1E 70%, #1A1A1A 100%);
  margin-bottom: 24px;
  transition: width 600ms ease, box-shadow 400ms ease, background 400ms ease;
  position: relative;
}
.rv-plate:hover .rv-plate-weld,
.rv-plate:focus-visible .rv-plate-weld {
  width: 100%;
  background: linear-gradient(180deg, #5A2E1E 0%, #FF6B1C 30%, #FFD68A 50%, #FF6B1C 70%, #5A2E1E 100%);
  box-shadow: 0 0 24px rgba(255, 107, 28, 0.7), 0 0 48px rgba(255, 107, 28, 0.4);
  animation: rv-weld-cool 1200ms ease-out;
}
@keyframes rv-weld-cool {
  0% {
    background: linear-gradient(180deg, #FFD68A 0%, #FFB347 50%, #FFD68A 100%);
    box-shadow: 0 0 32px rgba(255, 214, 138, 0.9);
  }
  100% {
    background: linear-gradient(180deg, #5A2E1E 0%, #FF6B1C 30%, #FFD68A 50%, #FF6B1C 70%, #5A2E1E 100%);
    box-shadow: 0 0 24px rgba(255, 107, 28, 0.7);
  }
}
@media (prefers-reduced-motion: reduce) {
  .rv-plate-weld { transition: none; }
  .rv-plate:hover .rv-plate-weld, .rv-plate:focus-visible .rv-plate-weld { animation: none; }
}

.rv-plate-grid {
  display: grid;
  grid-template-columns: 1.2fr 1.5fr 1fr;
  gap: 40px;
  align-items: flex-start;
}
.rv-plate-headline {
  font-family: 'Mona Sans', sans-serif;
  font-weight: 700;
  font-stretch: 110%;
  font-size: 22px;
  line-height: 1.2;
  color: #E8E5DD;
  letter-spacing: -0.005em;
}
.rv-plate-body {
  font-family: 'Mona Sans', sans-serif;
  font-size: 15px;
  line-height: 1.6;
  color: #C8C3B5;
  margin: 0;
}
.rv-plate-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-left: 2px solid #FF6B1C;
  padding-left: 14px;
}
.rv-plate-list li {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: #C8C3B5;
}
.rv-plate-list li::before { content: '+ '; color: #FF6B1C; font-weight: 700; }

.rv-pattern {
  position: relative;
  z-index: 2;
  padding: 64px 0 80px;
  border-top: 1.5px solid #5A2E1E;
}
.rv-pattern-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 56px;
  align-items: center;
}
.rv-pattern-body {
  font-family: 'Mona Sans', sans-serif;
  font-size: 17px;
  line-height: 1.6;
  color: #C8C3B5;
  margin: 16px 0 24px;
  max-width: 520px;
}
.rv-pattern-list {
  list-style: none;
  margin: 0;
  padding: 16px 0 0;
  border-top: 1px dashed rgba(232, 229, 221, 0.25);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.rv-pattern-list li {
  font-family: 'Mona Sans', sans-serif;
  font-size: 14px;
  letter-spacing: 0.02em;
  color: #C8C3B5;
}
.rv-pattern-list li::before { content: '\\2192  '; color: #FF6B1C; font-weight: 700; }

.rv-shingle { display: flex; flex-direction: column; align-items: center; }
.rv-shingle-plate {
  position: relative;
  width: 320px;
  height: 240px;
  background: linear-gradient(180deg, #2A2A2E 0%, #1A1A1C 100%);
  border: 2px solid #0a0a0a;
  display: grid;
  align-items: center;
  justify-content: center;
}
.rv-shingle-tab {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 240px;
  height: 96px;
  background:
    repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 1px, transparent 1px, transparent 12px),
    linear-gradient(180deg, #38383C 0%, #2A2A2E 100%);
  border: 1.5px solid #0a0a0a;
}
.rv-shingle-grid {
  position: relative;
  z-index: 1;
  width: 240px;
  height: 96px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}
.rv-shingle-nail {
  --nail-i: 0;
  align-self: center;
  justify-self: center;
  width: 18px; height: 18px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #FFB347, #FF6B1C 60%, #5A2E1E);
  box-shadow:
    inset 0 0 0 1px #0a0a0a,
    0 0 12px rgba(255, 107, 28, 0.7),
    0 1px 2px rgba(0,0,0,0.5);
  animation: rv-nail-pop 600ms cubic-bezier(0.22, 1.4, 0.36, 1) calc(var(--nail-i) * 120ms) backwards;
  position: relative;
  z-index: 2;
}
@keyframes rv-nail-pop {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .rv-shingle-nail { animation: none; }
}
.rv-shingle-caption {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  color: #FF6B1C;
  margin-top: 18px;
}

.rv-roofs {
  position: relative;
  z-index: 2;
  padding: 64px 0 80px;
  border-top: 1.5px solid #5A2E1E;
}
.rv-roof-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 22px;
}
.rv-roof-card {
  position: relative;
  background:
    linear-gradient(180deg, #38383C 0%, #2A2A2E 100%);
  border: 1.5px solid #0a0a0a;
  padding: 24px 22px 26px;
  box-shadow: inset 0 0 28px rgba(0,0,0,0.35), 0 4px 10px rgba(0,0,0,0.3);
  transition: transform 240ms ease, border-color 240ms ease;
}
.rv-roof-card:hover {
  transform: translateY(-3px);
  border-color: #FF6B1C;
}
.rv-roof-corners { position: absolute; inset: 8px; pointer-events: none; }
.rv-roof-corners span {
  position: absolute;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #888, #2A2A2A 70%);
  box-shadow: inset 0 0 0 0.5px #0a0a0a;
}
.rv-roof-corners span:nth-child(1) { top: 0; left: 0; }
.rv-roof-corners span:nth-child(2) { top: 0; right: 0; }
.rv-roof-corners span:nth-child(3) { bottom: 0; left: 0; }
.rv-roof-corners span:nth-child(4) { bottom: 0; right: 0; }

.rv-roof-meta {
  display: flex;
  justify-content: space-between;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  color: #FF6B1C;
  margin: 8px 0 12px;
  border-bottom: 1px dashed rgba(232, 229, 221, 0.18);
  padding-bottom: 8px;
}
.rv-roof-addr {
  font-family: 'Mona Sans', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.3;
  color: #E8E5DD;
  margin-bottom: 10px;
}
.rv-roof-rule {
  display: block;
  width: 28px;
  height: 2px;
  background: #FF6B1C;
  margin-bottom: 12px;
}
.rv-roof-note {
  font-family: 'Mona Sans', sans-serif;
  font-size: 13px;
  line-height: 1.55;
  color: #C8C3B5;
  margin: 0;
}
@media (prefers-reduced-motion: reduce) {
  .rv-roof-card { transition: none; }
}

.rv-call {
  position: relative;
  z-index: 2;
  padding: 64px 0 80px;
}
.rv-call-plate {
  position: relative;
  background:
    linear-gradient(180deg, #5A2E1E 0%, #2A1810 100%);
  border: 2px solid #1A1A1A;
  padding: 56px 48px;
  box-shadow:
    inset 0 0 80px rgba(0,0,0,0.5),
    0 8px 24px rgba(0,0,0,0.5);
  background-image:
    repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 6px),
    linear-gradient(180deg, #5A2E1E 0%, #2A1810 100%);
  text-align: center;
}
.rv-call-corners { position: absolute; inset: 14px; pointer-events: none; }
.rv-call-corners span {
  position: absolute;
  width: 16px; height: 16px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #aaa, #2A2A2A 70%, #0a0a0a);
  box-shadow: inset 0 0 0 1px #0a0a0a, 0 1px 3px rgba(0,0,0,0.6);
}
.rv-call-corners span:nth-child(1) { top: 0; left: 0; }
.rv-call-corners span:nth-child(2) { top: 0; right: 0; }
.rv-call-corners span:nth-child(3) { bottom: 0; left: 0; }
.rv-call-corners span:nth-child(4) { bottom: 0; right: 0; }

.rv-call-title {
  font-family: 'Mona Sans', sans-serif;
  font-weight: 900;
  font-stretch: 125%;
  font-size: clamp(36px, 5.4vw, 64px);
  line-height: 0.96;
  letter-spacing: -0.01em;
  color: #FFB347;
  margin: 12px 0 18px;
  text-shadow: 0 0 18px rgba(255, 179, 71, 0.4), 0 2px 0 rgba(0,0,0,0.55);
}
.rv-call-body {
  font-family: 'Mona Sans', sans-serif;
  font-size: 17px;
  line-height: 1.6;
  color: #E8E5DD;
  max-width: 600px;
  margin: 0 auto 32px;
}
.rv-call-row { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; }

.rv-footer {
  position: relative;
  z-index: 2;
  border-top: 2px solid #5A2E1E;
  padding: 24px 0 0;
  margin-top: 48px;
}
.rv-footer-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}
.rv-footer-cert {
  display: flex;
  flex-direction: column;
  border-left: 2px solid #FF6B1C;
  padding-left: 14px;
}
.rv-footer-cert span:first-child {
  font-family: 'Mona Sans', sans-serif;
  font-weight: 700;
  font-stretch: 125%;
  font-size: 11px;
  letter-spacing: 0.24em;
  color: #FF6B1C;
}
.rv-footer-cert span:last-child {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  letter-spacing: 0.06em;
  color: #E8E5DD;
}
.rv-footer-base {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  color: #B5B0A2;
  border-top: 1px solid rgba(232, 229, 221, 0.15);
  padding-top: 16px;
}

@media (max-width: 880px) {
  .rv-plate-grid { grid-template-columns: 1fr; gap: 18px; }
  .rv-pattern-grid { grid-template-columns: 1fr; gap: 32px; }
}
`;
