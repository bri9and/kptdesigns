"use client";

/**
 * ZincRoofEngine — V71 Zinc Roof
 *
 * Standing-seam zinc panels run vertically as the page substrate.
 * Patina blue-gray oxidizes at panel edges; rivets repeat in clip
 * rhythm. Hover causes a panel to catch sun (specular shimmer).
 * Scroll runs a slow ridge-to-eave cursor light.
 *
 * Trade showcase: architectural metal roofers (zinc, copper, terne).
 */

import { useEffect, useState } from "react";

const MATERIALS = [
  {
    key: "zinc",
    label: "Zinc",
    sub: "VMZINC · QUARTZ-ZINC",
    swatch: "linear-gradient(180deg, #b8bdb6 0%, #8c948e 35%, #5a6562 70%, #455d6e 100%)",
    body:
      "Self-healing patina. Centuries-old material, tightest seams, lowest ongoing maintenance. Weathers from mill bright to dove-gray to that final blue-gray architects spec when they say &lsquo;zinc roof.&rsquo;",
    detail: ["Quartz-Zinc &mdash; 75-yr life expectancy", ".8mm panel stock standard", "Self-healing scratch-to-patina"],
  },
  {
    key: "copper",
    label: "Copper",
    sub: "16 OZ · COLD-ROLLED",
    swatch: "linear-gradient(180deg, #d39068 0%, #c46f3d 30%, #8d4521 60%, #4d6d54 90%, #3a614e 100%)",
    body:
      "16-ounce cold-rolled copper, soldered seams on dormer transitions, lap-soldered eaves. Patina runs salmon &rarr; dark bronze &rarr; verdigris over 20-30 years; seaside jobs reach verdigris in seven.",
    detail: ["16 oz standard, 20 oz on commercial", "Lock-folded with hand brake", "Soldered dormer flashings"],
  },
  {
    key: "terne",
    label: "Terne",
    sub: "TCS-II · TERNE-COATED STAINLESS",
    swatch: "linear-gradient(180deg, #b9bbb5 0%, #6e6f6a 40%, #404341 80%, #2a2c2a 100%)",
    body:
      "Terne-coated stainless &mdash; the historic specification for federal and high-end ecclesiastical work. Ages to a true gun-metal gray, no green. We solder it, not crimp it, on 4/12 and below.",
    detail: ["TCS-II per ASTM A480", "Soldered seams below 4/12 pitch", "100-year life in inland climates"],
  },
];

const EAVE_DETAILS = [
  {
    tag: "01 / EAVE",
    title: "Hand-formed eave with continuous cleat",
    body:
      "We form the eave on site to match the gable&rsquo;s actual line, not the contractor&rsquo;s rough. Continuous cleat, hemmed return, no exposed fastener at the rake.",
  },
  {
    tag: "02 / SEAM",
    title: "Double-lock standing seam, crimped on-site",
    body:
      "Double-lock at 1.5 inches, crimped with a Schlebach roller on the deck. Single-lock on hidden faces. We don&rsquo;t snap-lock zinc &mdash; the seam is the roof.",
  },
  {
    tag: "03 / RIDGE",
    title: "Hand-soldered ridge cap, vented or closed",
    body:
      "Vented when the assembly calls for it (with screened ridge cleat); closed and soldered when the design wants the line. Either way, water moves. Always.",
  },
];

const RECENT_ROOFS = [
  {
    name: "Tower &amp; Garden &mdash; Hudson, NY",
    pitch: "Pitch 9/12",
    seam: "Seam spacing 16in",
    sub: "Quartz-Zinc, 4,400 sf. Six dormers hand-formed, conservatory ridge soldered. 18 weeks.",
  },
  {
    name: "Edge House &mdash; Lenox, MA",
    pitch: "Pitch 6/12",
    seam: "Seam spacing 18in",
    sub: "16oz copper, 2,800 sf. Lap-soldered eaves, two soldered cricket transitions. 11 weeks.",
  },
  {
    name: "St. Joseph&rsquo;s Chapel &mdash; Norwich, CT",
    pitch: "Pitch 12/12",
    seam: "Seam spacing 14in",
    sub: "TCS-II terne, 1,950 sf. Spire flashing, three radius valleys hand-formed in the shop. 9 weeks.",
  },
  {
    name: "Anglesey Residence &mdash; Newport, RI",
    pitch: "Pitch 5/12 &amp; 8/12",
    seam: "Seam spacing 18in",
    sub: "Quartz-Zinc, 6,200 sf. Two pitch transitions, soldered cricket, gabled bay flashings. 22 weeks.",
  },
];

export default function ZincRoofEngine() {
  const [hoverMat, setHoverMat] = useState<number | null>(null);
  const [scrollPct, setScrollPct] = useState<number>(0);
  const [activePanel, setActivePanel] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const t = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setScrollPct(t * 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 14 vertical panels in the substrate
  const panels = Array.from({ length: 14 });

  return (
    <>
      <style>{css}</style>
      <div
        className="zr-shell"
        style={{ ["--ridge" as string]: `${scrollPct}%` }}
      >
        {/* SUBSTRATE — VERTICAL ZINC PANELS */}
        <div className="zr-roof" aria-hidden>
          {panels.map((_, i) => (
            <span
              key={i}
              className={`zr-panel${activePanel === i ? " zr-panel-sun" : ""}`}
              style={{ ["--p" as string]: i }}
              onMouseEnter={() => setActivePanel(i)}
              onMouseLeave={() => setActivePanel((p) => (p === i ? null : p))}
            />
          ))}
        </div>
        <div className="zr-rivet-row" aria-hidden />
        <div className="zr-cursor-light" aria-hidden />
        <div className="zr-vignette" aria-hidden />

        {/* TOP NAV */}
        <header className="zr-top">
          <div className="zr-brand">
            <div className="zr-brand-mark" aria-hidden>
              <span className="zr-brand-seam" />
              <span className="zr-brand-seam" />
              <span className="zr-brand-seam" />
            </div>
            <div className="zr-brand-stack">
              <span className="zr-brand-name">Halverson &amp; Mott</span>
              <span className="zr-brand-meta">ARCHITECTURAL METAL &middot; EST. 1962 &middot; HUDSON VALLEY</span>
            </div>
          </div>
          <nav className="zr-nav">
            <a href="#material" className="zr-link">By material</a>
            <a href="#eave" className="zr-link">The eave</a>
            <a href="#roofs" className="zr-link">Recent roofs</a>
            <a href="#contact" className="zr-link zr-link-cta">Spec a metal roof</a>
          </nav>
        </header>

        {/* HERO */}
        <section className="zr-hero">
          <div className="zr-hero-text">
            <div className="zr-eyebrow">ZINC &middot; COPPER &middot; TERNE</div>
            <h1 className="zr-headline">
              <span>Standing seam,</span>
              <span>hand-formed eaves,</span>
              <span className="zr-headline-em">patina that earns its years.</span>
            </h1>
            <p className="zr-sub">
              Architectural metal roofing &mdash; zinc, copper, terne &mdash; with seams crimped on-site,
              eaves hand-formed to the gable. Forty-eight years of work, two surnames on the
              wallet, three Schlebach rollers in the truck.
            </p>
            <div className="zr-cta-row">
              <a href="#contact" className="zr-cta zr-cta-primary">Spec a metal roof</a>
              <a href="#eave" className="zr-cta zr-cta-ghost">See the seams</a>
            </div>
          </div>
          <aside className="zr-hero-spec">
            <div className="zr-spec-line">
              <span className="zr-spec-tag">SPECIFICATION SHEET</span>
              <span className="zr-spec-rev">REV B &middot; 04/28/26</span>
            </div>
            <dl className="zr-spec-list">
              <div><dt>SUBSTRATE</dt><dd>Quartz-Zinc, .8mm</dd></div>
              <div><dt>PANEL WIDTH</dt><dd>16&quot; on center</dd></div>
              <div><dt>SEAM TYPE</dt><dd>Double-lock 1.5&quot;</dd></div>
              <div><dt>UNDERLAYMENT</dt><dd>VENTITHERM mat</dd></div>
              <div><dt>FASTENER</dt><dd>Stainless cleat, hidden</dd></div>
              <div><dt>EAVE</dt><dd>Hand-formed continuous</dd></div>
              <div><dt>WARRANTY</dt><dd>Material 30yr / Workmanship 25yr</dd></div>
            </dl>
            <div className="zr-spec-rule" />
            <div className="zr-spec-foot">
              <span>Stamped on the deck. Not on the slide.</span>
              <span className="zr-spec-init">— H&amp;M</span>
            </div>
          </aside>
        </section>

        {/* BY MATERIAL */}
        <section id="material" className="zr-section">
          <header className="zr-section-head">
            <div className="zr-section-tag">BY MATERIAL / 03 SUBSTRATES</div>
            <h2 className="zr-section-title">Three metals. Three patinas.</h2>
            <p className="zr-section-lead">
              Zinc weathers to dove-gray, then blue-gray. Copper runs through salmon, brown,
              and verdigris. Terne ages true gun-metal. Pick the one whose forty-year photo
              is the building you want.
            </p>
          </header>

          <div className="zr-materials">
            {MATERIALS.map((m, i) => (
              <article
                key={m.key}
                className={`zr-mat${hoverMat === i ? " zr-mat-active" : ""}`}
                onMouseEnter={() => setHoverMat(i)}
                onMouseLeave={() => setHoverMat((h) => (h === i ? null : h))}
                onFocus={() => setHoverMat(i)}
                onBlur={() => setHoverMat((h) => (h === i ? null : h))}
                tabIndex={0}
              >
                <div className="zr-mat-swatch" style={{ background: m.swatch }} aria-hidden>
                  <div className="zr-mat-shimmer" />
                  <div className="zr-mat-rivets" aria-hidden>
                    <span /><span /><span /><span /><span />
                  </div>
                </div>
                <div className="zr-mat-body">
                  <div className="zr-mat-tag">{m.sub}</div>
                  <h3 className="zr-mat-label">{m.label}</h3>
                  <p
                    className="zr-mat-text"
                    dangerouslySetInnerHTML={{ __html: m.body }}
                  />
                  <ul className="zr-mat-detail">
                    {m.detail.map((d) => (
                      <li key={d} dangerouslySetInnerHTML={{ __html: d }} />
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* THE EAVE */}
        <section id="eave" className="zr-section zr-section-eave">
          <header className="zr-section-head">
            <div className="zr-section-tag">THE EAVE / 03 DETAILS</div>
            <h2 className="zr-section-title">
              The detail that separates architectural metal from contractor metal.
            </h2>
            <p className="zr-section-lead">
              Anyone can roll a panel. The seam is what tells you whether the metal man
              is on the deck or in the truck.
            </p>
          </header>

          <div className="zr-eaves">
            {EAVE_DETAILS.map((e, i) => (
              <article key={e.tag} className="zr-eave-card" tabIndex={0} style={{ ["--ei" as string]: i }}>
                <div className="zr-eave-rivet" aria-hidden />
                <div className="zr-eave-tag">{e.tag}</div>
                <h3 className="zr-eave-title">{e.title}</h3>
                <p className="zr-eave-body" dangerouslySetInnerHTML={{ __html: e.body }} />
                <div className="zr-eave-section-svg" aria-hidden>
                  <SectionDrawing variant={i} />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* RECENT ROOFS */}
        <section id="roofs" className="zr-section">
          <header className="zr-section-head">
            <div className="zr-section-tag">RECENT ROOFS / 04 PROJECTS</div>
            <h2 className="zr-section-title">Pitch &amp; seam called out.</h2>
            <p className="zr-section-lead">
              Each elevation drawn to scale on the panel substrate. Pitch and seam
              spacing are part of the spec, not the brochure.
            </p>
          </header>

          <div className="zr-roofs">
            {RECENT_ROOFS.map((r, i) => (
              <article key={r.name} className="zr-roof-card" tabIndex={0} style={{ ["--ri" as string]: i }}>
                <div className="zr-roof-elevation" aria-hidden>
                  <ElevationDrawing variant={i} />
                </div>
                <div className="zr-roof-info">
                  <h3 className="zr-roof-name" dangerouslySetInnerHTML={{ __html: r.name }} />
                  <div className="zr-roof-meta">
                    <span>{r.pitch}</span>
                    <span className="zr-roof-meta-dot">·</span>
                    <span>{r.seam}</span>
                  </div>
                  <p className="zr-roof-sub" dangerouslySetInnerHTML={{ __html: r.sub }} />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="zr-section zr-section-contact">
          <div className="zr-contact">
            <div className="zr-contact-rivets" aria-hidden>
              <span /><span /><span /><span /><span /><span /><span /><span />
            </div>
            <div className="zr-contact-body">
              <div className="zr-section-tag">SPEC A METAL ROOF</div>
              <h2 className="zr-contact-title">
                Send the elevations.
                <br />
                <span>We&rsquo;ll come measure the eave.</span>
              </h2>
              <p className="zr-contact-text">
                Architects: full submittal package returned in 10 business days, including
                seam-spacing diagrams and wind-uplift calculations to ASCE 7. Owners: site
                visit before any number leaves the office.
              </p>
              <div className="zr-contact-row">
                <a href="mailto:specs@halversonmott.example" className="zr-contact-mail">
                  specs@halversonmott.example
                </a>
                <span className="zr-contact-sep" aria-hidden />
                <a href="tel:5184472200" className="zr-contact-phone">
                  518 . 447 . 2200
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="zr-footer">
          <div className="zr-footer-row">
            <span className="zr-footer-stub">VMZINC ACCREDITED</span>
            <span className="zr-footer-stub">CDA TECH AUTHORITY</span>
            <span className="zr-footer-stub">NRCA MEMBER</span>
            <span className="zr-footer-stub">NY HIC #11-44882</span>
          </div>
          <p className="zr-footer-credit">
            Drawn on the deck, 4:48 pm, October light. Three Schlebach rollers in the truck,
            two new apprentices on the brake. &copy; 2026 Halverson &amp; Mott Architectural
            Metal.
          </p>
        </footer>
      </div>
    </>
  );
}

function SectionDrawing({ variant }: { variant: number }) {
  // Simple architectural section line drawings
  if (variant === 0) {
    return (
      <svg viewBox="0 0 220 80" fill="none" aria-hidden>
        <path d="M10 60 L120 60 L120 30" stroke="#E8ECEC" strokeWidth="1.4" />
        <path d="M120 30 L210 30 L210 18 L200 18 L200 22 L210 22" stroke="#E8ECEC" strokeWidth="1.4" />
        <path d="M120 60 Q123 70 110 70 L20 70 Q10 70 10 60" stroke="#E8ECEC" strokeWidth="1.4" />
        <text x="14" y="76" fill="#9BA0A0" fontSize="7" fontFamily="JetBrains Mono">CONT. CLEAT</text>
        <text x="160" y="14" fill="#9BA0A0" fontSize="7" fontFamily="JetBrains Mono">RAKE EDGE</text>
      </svg>
    );
  }
  if (variant === 1) {
    return (
      <svg viewBox="0 0 220 80" fill="none" aria-hidden>
        <path d="M40 70 L40 20 L48 12 L56 20 L56 70" stroke="#E8ECEC" strokeWidth="1.4" />
        <path d="M120 70 L120 20 L128 12 L136 20 L136 70" stroke="#E8ECEC" strokeWidth="1.4" />
        <path d="M48 18 L128 18" stroke="#E8ECEC" strokeWidth="0.8" strokeDasharray="3,2" />
        <text x="60" y="14" fill="#9BA0A0" fontSize="7" fontFamily="JetBrains Mono">DBL-LOCK</text>
        <text x="14" y="76" fill="#9BA0A0" fontSize="7" fontFamily="JetBrains Mono">PANEL</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 220 80" fill="none" aria-hidden>
      <path d="M20 60 L110 18 L200 60" stroke="#E8ECEC" strokeWidth="1.4" />
      <path d="M104 22 L116 22 L116 28 L104 28 Z" stroke="#E8ECEC" strokeWidth="1.2" fill="rgba(232,236,236,0.1)" />
      <path d="M30 65 L190 65" stroke="#E8ECEC" strokeWidth="0.8" strokeDasharray="4,2" />
      <text x="58" y="76" fill="#9BA0A0" fontSize="7" fontFamily="JetBrains Mono">VENTED RIDGE CLEAT</text>
    </svg>
  );
}

function ElevationDrawing({ variant }: { variant: number }) {
  if (variant === 0) {
    return (
      <svg viewBox="0 0 240 130" aria-hidden fill="none">
        <path d="M30 100 L120 30 L210 100 L210 110 L30 110 Z" fill="rgba(111,124,123,0.5)" stroke="#E8ECEC" strokeWidth="1.2" />
        <g stroke="#E8ECEC" strokeWidth="0.6" opacity="0.85">
          <line x1="50" y1="95" x2="100" y2="55" />
          <line x1="68" y1="95" x2="118" y2="55" />
          <line x1="86" y1="95" x2="120" y2="65" />
          <line x1="104" y1="95" x2="138" y2="65" />
          <line x1="122" y1="95" x2="156" y2="65" />
          <line x1="140" y1="95" x2="174" y2="65" />
          <line x1="158" y1="95" x2="192" y2="65" />
          <line x1="176" y1="95" x2="195" y2="80" />
        </g>
        <path d="M88 88 L92 80 L100 80 L96 88 Z" fill="rgba(232,236,236,0.4)" />
        <path d="M126 88 L130 80 L138 80 L134 88 Z" fill="rgba(232,236,236,0.4)" />
        <path d="M164 88 L168 80 L176 80 L172 88 Z" fill="rgba(232,236,236,0.4)" />
      </svg>
    );
  }
  if (variant === 1) {
    return (
      <svg viewBox="0 0 240 130" aria-hidden fill="none">
        <path d="M20 100 L110 50 L130 50 L220 100 L220 110 L20 110 Z" fill="rgba(196,111,61,0.45)" stroke="#E8ECEC" strokeWidth="1.2" />
        <g stroke="#E8ECEC" strokeWidth="0.6" opacity="0.85">
          <line x1="40" y1="98" x2="92" y2="68" />
          <line x1="60" y1="98" x2="112" y2="68" />
          <line x1="80" y1="98" x2="120" y2="74" />
          <line x1="100" y1="98" x2="140" y2="74" />
          <line x1="140" y1="98" x2="180" y2="74" />
          <line x1="160" y1="98" x2="200" y2="74" />
          <line x1="180" y1="98" x2="208" y2="84" />
        </g>
      </svg>
    );
  }
  if (variant === 2) {
    return (
      <svg viewBox="0 0 240 130" aria-hidden fill="none">
        <path d="M40 110 L40 60 L80 60 L120 14 L160 60 L200 60 L200 110 Z" fill="rgba(64,67,65,0.55)" stroke="#E8ECEC" strokeWidth="1.2" />
        <g stroke="#E8ECEC" strokeWidth="0.6" opacity="0.85">
          <line x1="50" y1="108" x2="50" y2="62" />
          <line x1="60" y1="108" x2="60" y2="62" />
          <line x1="70" y1="108" x2="70" y2="62" />
          <line x1="84" y1="58" x2="120" y2="22" />
          <line x1="100" y1="58" x2="124" y2="32" />
          <line x1="116" y1="58" x2="124" y2="48" />
          <line x1="140" y1="58" x2="120" y2="32" />
          <line x1="156" y1="58" x2="120" y2="22" />
          <line x1="170" y1="108" x2="170" y2="62" />
          <line x1="180" y1="108" x2="180" y2="62" />
          <line x1="190" y1="108" x2="190" y2="62" />
        </g>
        <path d="M118 14 L118 8 L120 6 L122 8 L122 14" stroke="#E8ECEC" strokeWidth="1.2" fill="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 240 130" aria-hidden fill="none">
      <path d="M20 100 L80 50 L130 80 L210 30 L210 110 L20 110 Z" fill="rgba(111,124,123,0.45)" stroke="#E8ECEC" strokeWidth="1.2" />
      <g stroke="#E8ECEC" strokeWidth="0.6" opacity="0.85">
        <line x1="34" y1="98" x2="74" y2="68" />
        <line x1="50" y1="98" x2="90" y2="68" />
        <line x1="64" y1="98" x2="104" y2="68" />
        <line x1="80" y1="98" x2="120" y2="78" />
        <line x1="120" y1="100" x2="180" y2="64" />
        <line x1="140" y1="100" x2="200" y2="58" />
        <line x1="160" y1="100" x2="208" y2="56" />
      </g>
    </svg>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;500&display=swap');

.zr-shell {
  position: relative;
  min-height: 100vh;
  background: #2A2F30;
  color: #E8ECEC;
  font-family: 'Inter', system-ui, sans-serif;
  padding: 28px 28px 56px;
  isolation: isolate;
  overflow: hidden;
}

/* SUBSTRATE */
.zr-roof {
  position: fixed;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  z-index: -3;
}
.zr-panel {
  position: relative;
  background:
    linear-gradient(180deg,
      rgba(180, 200, 200, 0.08) 0%,
      transparent 25%,
      transparent 75%,
      rgba(40, 50, 50, 0.4) 100%),
    linear-gradient(90deg,
      rgba(255,255,255,0.06) 0%,
      transparent 6%,
      transparent 94%,
      rgba(0,0,0,0.35) 100%),
    linear-gradient(180deg, #6F7C7B 0%, #5C6968 30%, #4A5556 60%, #455D6E 100%);
  border-right: 1.5px solid #1A1F20;
  border-left: 1.5px solid rgba(255,255,255,0.06);
  position: relative;
  cursor: default;
  transition: filter 360ms ease;
}
.zr-panel::before {
  /* patina edge */
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(70, 110, 130, 0.45) 0%, transparent 8%, transparent 92%, rgba(70, 110, 130, 0.45) 100%);
  pointer-events: none;
}
.zr-panel::after {
  /* shimmer line */
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg,
      transparent 0%,
      rgba(255,255,255,0.0) 30%,
      rgba(255,255,255,0.18) 50%,
      rgba(255,255,255,0.0) 70%,
      transparent 100%);
  background-size: 100% 200%;
  background-position: 0 -100%;
  opacity: 0;
  transition: opacity 280ms ease, background-position 1200ms ease-out;
  pointer-events: none;
}
.zr-panel:hover, .zr-panel-sun {
  filter: brightness(1.18) saturate(1.05);
}
.zr-panel:hover::after, .zr-panel-sun::after {
  opacity: 1;
  background-position: 0 100%;
}
@media (prefers-reduced-motion: reduce) {
  .zr-panel { transition: none; }
  .zr-panel::after { transition: none; }
}

.zr-rivet-row {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 30px;
  z-index: -2;
  background-image:
    radial-gradient(circle at 50% 50%, #b0b8b8 0%, #4d5757 60%, #2a3030 100%);
  background-size: calc(100% / 14) 100%;
  background-repeat: repeat-x;
  background-position: 0 0;
  pointer-events: none;
  filter: drop-shadow(0 2px 1px rgba(0,0,0,0.5));
  /* crude rivets via mask */
  -webkit-mask-image:
    radial-gradient(circle at 50% 50%, black 22%, transparent 24%);
  -webkit-mask-size: calc(100% / 14) 100%;
  mask-image: radial-gradient(circle at 50% 50%, black 22%, transparent 24%);
  mask-size: calc(100% / 14) 100%;
}

.zr-cursor-light {
  position: fixed;
  left: 0; right: 0;
  top: var(--ridge, 0%);
  height: 320px;
  margin-top: -160px;
  background: linear-gradient(180deg, transparent 0%, rgba(255, 245, 220, 0.18) 50%, transparent 100%);
  filter: blur(14px);
  pointer-events: none;
  mix-blend-mode: screen;
  z-index: -1;
  transition: top 260ms ease-out;
}
@media (prefers-reduced-motion: reduce) {
  .zr-cursor-light { display: none; }
}

.zr-vignette {
  position: fixed;
  inset: 0;
  background: radial-gradient(ellipse 80% 70% at 50% 40%, transparent 50%, rgba(20, 25, 26, 0.6) 100%);
  pointer-events: none;
  z-index: -1;
}

/* TOP NAV */
.zr-top {
  position: relative;
  z-index: 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(20, 28, 28, 0.65);
  backdrop-filter: blur(10px) saturate(140%);
  -webkit-backdrop-filter: blur(10px) saturate(140%);
  border: 1px solid rgba(232, 236, 236, 0.18);
  padding: 12px 22px;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 18px;
  border-radius: 2px;
}
.zr-brand { display: flex; align-items: center; gap: 14px; }
.zr-brand-mark {
  position: relative;
  width: 40px; height: 40px;
  display: flex;
  gap: 4px;
  border: 1px solid rgba(232, 236, 236, 0.4);
  padding: 4px;
  background: rgba(40, 50, 50, 0.6);
}
.zr-brand-seam {
  display: block;
  flex: 1;
  background: linear-gradient(180deg, #b0b8b8 0%, #4d5757 100%);
  border: 0.5px solid rgba(255,255,255,0.2);
}
.zr-brand-stack { display: flex; flex-direction: column; line-height: 1.05; }
.zr-brand-name {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 18px;
  letter-spacing: -0.01em;
  color: #F4F6F6;
}
.zr-brand-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  color: rgba(232, 236, 236, 0.7);
  margin-top: 4px;
}
.zr-nav { display: flex; gap: 22px; align-items: center; flex-wrap: wrap; }
.zr-link {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: rgba(232, 236, 236, 0.82);
  text-decoration: none;
  position: relative;
  padding: 4px 2px;
  text-transform: uppercase;
  transition: color 200ms ease;
}
.zr-link::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -2px;
  height: 1.5px;
  background: #C8D8DC;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 220ms ease;
  box-shadow: 0 0 6px rgba(200, 216, 220, 0.5);
}
.zr-link:hover, .zr-link:focus-visible {
  outline: none;
  color: #F4F6F6;
}
.zr-link:hover::after, .zr-link:focus-visible::after { transform: scaleX(1); }
.zr-link-cta {
  background: #F4F6F6;
  color: #1A1F20;
  border: 1px solid #F4F6F6;
  padding: 8px 14px;
  font-weight: 700;
}
.zr-link-cta::after { display: none; }
.zr-link-cta:hover, .zr-link-cta:focus-visible {
  background: #C8D8DC;
  border-color: #C8D8DC;
  color: #1A1F20;
}

/* HERO */
.zr-hero {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 56px;
  padding: 80px 12px 96px;
  align-items: stretch;
}
.zr-hero-text { max-width: 720px; align-self: center; }
.zr-eyebrow {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.32em;
  color: #C8D8DC;
  border: 1px solid rgba(200, 216, 220, 0.5);
  padding: 6px 12px;
  margin-bottom: 32px;
  background: rgba(20, 28, 28, 0.4);
}
.zr-headline {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(48px, 7vw, 96px);
  line-height: 0.96;
  letter-spacing: -0.025em;
  margin: 0 0 28px;
  color: #F4F6F6;
  text-shadow: 0 2px 4px rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
}
.zr-headline span { display: block; }
.zr-headline-em {
  background: linear-gradient(120deg, #F4F6F6 0%, #C8D8DC 60%, #6FA0B8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-style: italic;
  font-weight: 700;
  text-shadow: none;
}
.zr-sub {
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  line-height: 1.6;
  color: rgba(232, 236, 236, 0.85);
  max-width: 560px;
  margin: 0 0 36px;
}
.zr-cta-row { display: flex; flex-wrap: wrap; gap: 14px; }
.zr-cta {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 14px 28px;
  border: 2px solid;
  display: inline-block;
  transition: transform 220ms ease, background 220ms ease, color 220ms ease, box-shadow 220ms ease;
}
.zr-cta-primary {
  background: #F4F6F6;
  border-color: #F4F6F6;
  color: #1A1F20;
  box-shadow: 0 6px 14px rgba(0,0,0,0.4);
}
.zr-cta-primary:hover, .zr-cta-primary:focus-visible {
  outline: none;
  background: #C8D8DC;
  border-color: #C8D8DC;
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(0,0,0,0.5);
}
.zr-cta-ghost {
  background: rgba(20, 28, 28, 0.4);
  border-color: rgba(232, 236, 236, 0.5);
  color: #F4F6F6;
}
.zr-cta-ghost:hover, .zr-cta-ghost:focus-visible {
  outline: none;
  background: rgba(232, 236, 236, 0.12);
  border-color: #F4F6F6;
  transform: translateY(-2px);
}

.zr-hero-spec {
  background: rgba(20, 28, 28, 0.78);
  border: 1px solid rgba(232, 236, 236, 0.32);
  padding: 28px 28px 22px;
  font-family: 'JetBrains Mono', monospace;
  position: relative;
  align-self: center;
}
.zr-spec-line {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid rgba(232, 236, 236, 0.3);
  padding-bottom: 10px;
  margin-bottom: 14px;
}
.zr-spec-tag {
  font-size: 11px;
  letter-spacing: 0.18em;
  color: #C8D8DC;
  font-weight: 700;
}
.zr-spec-rev {
  font-size: 10px;
  letter-spacing: 0.14em;
  color: rgba(232, 236, 236, 0.6);
}
.zr-spec-list {
  margin: 0;
  display: flex;
  flex-direction: column;
}
.zr-spec-list > div {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 14px;
  padding: 8px 0;
  border-bottom: 1px dashed rgba(232, 236, 236, 0.18);
}
.zr-spec-list > div:last-child { border-bottom: none; }
.zr-spec-list dt {
  font-size: 10px;
  letter-spacing: 0.16em;
  color: rgba(232, 236, 236, 0.6);
  margin: 0;
}
.zr-spec-list dd {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #F4F6F6;
  margin: 0;
  text-align: right;
}
.zr-spec-rule {
  border-top: 2px solid rgba(232, 236, 236, 0.4);
  margin: 14px 0 10px;
}
.zr-spec-foot {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  letter-spacing: 0.08em;
  color: rgba(232, 236, 236, 0.65);
  font-style: italic;
}

/* SECTIONS */
.zr-section {
  position: relative;
  z-index: 2;
  padding: 64px 12px 80px;
}
.zr-section-head { max-width: 720px; margin-bottom: 40px; }
.zr-section-tag {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  color: #C8D8DC;
  border: 1px solid rgba(200, 216, 220, 0.45);
  padding: 4px 10px;
  margin-bottom: 18px;
  background: rgba(20, 28, 28, 0.4);
}
.zr-section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(32px, 4.6vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: #F4F6F6;
  margin: 0 0 14px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
.zr-section-lead {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: rgba(232, 236, 236, 0.82);
  max-width: 600px;
  margin: 0;
}

/* MATERIALS */
.zr-materials {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}
.zr-mat {
  background: rgba(20, 28, 28, 0.7);
  border: 1px solid rgba(232, 236, 236, 0.22);
  outline: none;
  transition: transform 280ms ease, border-color 280ms ease, box-shadow 280ms ease;
  cursor: default;
}
.zr-mat:hover, .zr-mat:focus-visible, .zr-mat-active {
  transform: translateY(-4px);
  border-color: #F4F6F6;
  box-shadow: 0 14px 28px rgba(0,0,0,0.5);
}
@media (prefers-reduced-motion: reduce) {
  .zr-mat { transition: border-color 280ms ease; }
  .zr-mat:hover, .zr-mat:focus-visible, .zr-mat-active { transform: none; }
}
.zr-mat-swatch {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-bottom: 1px solid rgba(0,0,0,0.4);
}
.zr-mat-shimmer {
  position: absolute;
  top: 0; bottom: 0;
  width: 60%;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.16) 50%, transparent 100%);
  transform: translateX(-150%);
  transition: transform 1100ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.zr-mat:hover .zr-mat-shimmer,
.zr-mat:focus-visible .zr-mat-shimmer,
.zr-mat-active .zr-mat-shimmer {
  transform: translateX(220%);
}
@media (prefers-reduced-motion: reduce) {
  .zr-mat-shimmer { transition: none; transform: none; opacity: 0.25; }
}
.zr-mat-rivets {
  position: absolute;
  top: 8px; right: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  opacity: 0.6;
}
.zr-mat-rivets span {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #c0c8c8, #404545);
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.5);
}

.zr-mat-body { padding: 24px 24px 26px; }
.zr-mat-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  color: #C8D8DC;
  margin-bottom: 4px;
}
.zr-mat-label {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 32px;
  letter-spacing: -0.02em;
  color: #F4F6F6;
  margin: 0 0 14px;
}
.zr-mat-text {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(232, 236, 236, 0.85);
  margin: 0 0 16px;
}
.zr-mat-detail {
  list-style: none;
  margin: 0;
  padding: 12px 0 0;
  border-top: 1px solid rgba(232, 236, 236, 0.16);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.zr-mat-detail li {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.04em;
  color: rgba(232, 236, 236, 0.78);
}
.zr-mat-detail li::before { content: '+ '; color: #C8D8DC; }

/* EAVE */
.zr-section-eave {
  background: rgba(20, 28, 28, 0.55);
  margin: 0 -28px;
  padding: 80px 40px 96px;
  border-top: 1px solid rgba(232, 236, 236, 0.16);
  border-bottom: 1px solid rgba(232, 236, 236, 0.16);
}
.zr-eaves {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 22px;
}
.zr-eave-card {
  position: relative;
  background:
    repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 4px),
    rgba(40, 50, 50, 0.55);
  border: 1px solid rgba(232, 236, 236, 0.22);
  padding: 32px 28px 28px;
  outline: none;
  transition: transform 280ms ease, border-color 280ms ease;
}
.zr-eave-card:hover, .zr-eave-card:focus-visible {
  transform: translateY(-4px);
  border-color: #F4F6F6;
}
@media (prefers-reduced-motion: reduce) {
  .zr-eave-card { transition: border-color 280ms ease; }
  .zr-eave-card:hover, .zr-eave-card:focus-visible { transform: none; }
}
.zr-eave-rivet {
  position: absolute;
  top: 12px; right: 12px;
  width: 12px; height: 12px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #c0c8c8, #404545);
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.5);
}
.zr-eave-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  color: #C8D8DC;
  margin-bottom: 14px;
}
.zr-eave-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: #F4F6F6;
  margin: 0 0 12px;
  letter-spacing: -0.01em;
  line-height: 1.15;
}
.zr-eave-body {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(232, 236, 236, 0.82);
  margin: 0 0 18px;
}
.zr-eave-section-svg {
  background: rgba(0,0,0,0.25);
  border: 1px dashed rgba(232, 236, 236, 0.24);
  padding: 12px;
}
.zr-eave-section-svg svg { width: 100%; height: auto; display: block; }

/* RECENT ROOFS */
.zr-roofs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
.zr-roof-card {
  position: relative;
  background: rgba(20, 28, 28, 0.7);
  border: 1px solid rgba(232, 236, 236, 0.2);
  padding: 0;
  outline: none;
  display: flex;
  flex-direction: column;
  transition: transform 280ms ease, border-color 280ms ease, box-shadow 280ms ease;
}
.zr-roof-card:hover, .zr-roof-card:focus-visible {
  transform: translateY(-3px);
  border-color: #F4F6F6;
  box-shadow: 0 14px 28px rgba(0,0,0,0.45);
}
@media (prefers-reduced-motion: reduce) {
  .zr-roof-card { transition: border-color 280ms ease; }
  .zr-roof-card:hover, .zr-roof-card:focus-visible { transform: none; }
}
.zr-roof-elevation {
  background:
    linear-gradient(180deg, rgba(180, 200, 200, 0.1) 0%, rgba(40, 50, 50, 0.55) 100%);
  padding: 24px;
  border-bottom: 1.5px solid rgba(0,0,0,0.4);
  height: 200px;
  display: grid;
  place-items: center;
}
.zr-roof-elevation svg { width: 100%; height: 100%; }
.zr-roof-info { padding: 22px 22px 26px; }
.zr-roof-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #F4F6F6;
  margin: 0 0 6px;
  letter-spacing: -0.005em;
}
.zr-roof-meta {
  display: flex;
  gap: 8px;
  align-items: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: #C8D8DC;
  margin-bottom: 10px;
}
.zr-roof-meta-dot { color: rgba(232, 236, 236, 0.4); }
.zr-roof-sub {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.55;
  color: rgba(232, 236, 236, 0.78);
  margin: 0;
}

/* CONTACT */
.zr-section-contact {
  padding: 80px 12px 96px;
}
.zr-contact {
  position: relative;
  max-width: 880px;
  margin: 0 auto;
  background:
    repeating-linear-gradient(180deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 4px),
    rgba(20, 28, 28, 0.78);
  border: 1.5px solid rgba(232, 236, 236, 0.32);
  padding: 56px 56px 56px;
  overflow: hidden;
}
.zr-contact::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, transparent 0%, rgba(200, 216, 220, 0.06) 50%, transparent 100%);
  pointer-events: none;
}
.zr-contact-rivets {
  position: absolute;
  inset: 14px 14px auto 14px;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}
.zr-contact-rivets span {
  width: 12px; height: 12px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #c0c8c8, #404545);
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.5);
}
.zr-contact-body { position: relative; z-index: 2; }
.zr-contact-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: #F4F6F6;
  margin: 16px 0;
}
.zr-contact-title span {
  background: linear-gradient(120deg, #C8D8DC 0%, #6FA0B8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-style: italic;
  font-weight: 700;
}
.zr-contact-text {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: rgba(232, 236, 236, 0.85);
  max-width: 580px;
  margin: 0 0 32px;
}
.zr-contact-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 22px;
}
.zr-contact-mail {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  letter-spacing: 0.04em;
  color: #C8D8DC;
  text-decoration: none;
  border-bottom: 1.5px solid rgba(200, 216, 220, 0.4);
  padding-bottom: 2px;
  transition: color 220ms ease, border-color 220ms ease;
}
.zr-contact-mail:hover, .zr-contact-mail:focus-visible {
  outline: none;
  color: #F4F6F6;
  border-bottom-color: #F4F6F6;
}
.zr-contact-sep {
  width: 1px; height: 32px;
  background: rgba(232, 236, 236, 0.3);
}
.zr-contact-phone {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(28px, 4vw, 40px);
  letter-spacing: -0.01em;
  color: #F4F6F6;
  text-decoration: none;
  transition: color 220ms ease;
}
.zr-contact-phone:hover, .zr-contact-phone:focus-visible {
  outline: none;
  color: #C8D8DC;
}

/* FOOTER */
.zr-footer {
  position: relative;
  z-index: 2;
  border-top: 1px solid rgba(232, 236, 236, 0.18);
  padding: 22px 4px 4px;
  margin-top: 56px;
}
.zr-footer-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 14px;
}
.zr-footer-stub {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.22em;
  color: rgba(232, 236, 236, 0.78);
  border: 1px solid rgba(232, 236, 236, 0.25);
  padding: 4px 10px;
}
.zr-footer-credit {
  font-family: 'Inter', sans-serif;
  font-style: italic;
  font-size: 13px;
  color: rgba(232, 236, 236, 0.6);
  margin: 0;
}

/* RESPONSIVE */
@media (max-width: 980px) {
  .zr-hero { grid-template-columns: 1fr; padding: 56px 12px 72px; }
  .zr-roof { grid-template-columns: repeat(8, 1fr); }
  .zr-rivet-row { background-size: calc(100% / 8) 100%; -webkit-mask-size: calc(100% / 8) 100%; mask-size: calc(100% / 8) 100%; }
  .zr-contact { padding: 40px 24px; }
}
`;
