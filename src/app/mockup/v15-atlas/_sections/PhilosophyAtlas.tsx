"use client";

import { EB_Garamond, JetBrains_Mono } from "next/font/google";
import { motion } from "framer-motion";

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const PAPER = "#F4EFE3";
const CONTOUR = "#3D2817";
const FOREST = "#2D5A3F";
const OCEAN = "#3D6E94";
const RUST = "#A0432A";
const HAIRLINE = "rgba(61,40,23,0.18)";

const reveal = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 1.05, ease: [0.22, 0.61, 0.36, 1] as const } },
};
const view = { once: true, margin: "-12% 0px" } as const;

// faint contour-line bg pattern (concentric ovals, repeating tile)
const contourBg =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='520' height='520' viewBox='0 0 520 520'><g fill='none' stroke='%233D2817' stroke-width='0.6' stroke-opacity='0.10'><ellipse cx='260' cy='260' rx='40' ry='28'/><ellipse cx='260' cy='260' rx='80' ry='56'/><ellipse cx='260' cy='260' rx='124' ry='86'/><ellipse cx='260' cy='260' rx='172' ry='118'/><ellipse cx='260' cy='260' rx='224' ry='154'/><ellipse cx='90' cy='110' rx='44' ry='30'/><ellipse cx='90' cy='110' rx='84' ry='58'/><ellipse cx='430' cy='420' rx='52' ry='36'/><ellipse cx='430' cy='420' rx='96' ry='66'/></g></svg>\")";

const marginalia = [
  { label: "v. ROAND BRYANT · ATLAS GENERAL · 1898", fol: "pl. 014" },
  { label: "elev. 1247 ft · pittsburgh", fol: "lat. 40°26′" },
  { label: "scale 1 : 24,000", fol: "decl. 9°W" },
  { label: "datum NAD-27 · contour 20 ft", fol: "qd. SE" },
];

export default function PhilosophyAtlas() {
  return (
    <section
      className={garamond.className}
      style={{
        position: "relative",
        background: PAPER,
        color: CONTOUR,
        padding: "clamp(96px,13vw,180px) 0",
        overflow: "hidden",
      }}
    >
      {/* faint contour line background pattern */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: contourBg,
          backgroundSize: "520px 520px",
          opacity: 0.7,
          pointerEvents: "none",
        }}
      />
      {/* subtle paper warmth wash */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(110% 70% at 18% 8%, rgba(244,230,200,0.55) 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "0 clamp(28px,7vw,96px)" }}>
        {/* section header */}
        <motion.header
          variants={reveal} initial="hidden" whileInView="show" viewport={view}
          style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: "clamp(56px,8vw,104px)" }}
        >
          <span
            className={mono.className}
            style={{
              fontSize: 10.5,
              fontWeight: 500,
              letterSpacing: "0.30em",
              textTransform: "uppercase",
              color: CONTOUR,
              whiteSpace: "nowrap",
            }}
          >
            § PHILOSOPHY · CARTOGRAPHER&apos;S PREFACE
          </span>
          <span style={{ flex: 1, height: 1, background: CONTOUR, opacity: 0.55 }} />
          <span
            className={mono.className}
            style={{ fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: FOREST }}
          >
            sheet 02 / 06
          </span>
        </motion.header>

        <div className="atlas-philo-grid" style={{ display: "grid", gap: "clamp(40px,5vw,72px)" }}>
          {/* body */}
          <motion.div
            variants={reveal} initial="hidden" whileInView="show" viewport={view}
            className="atlas-philo-body"
          >
            <p
              style={{
                margin: 0,
                fontSize: "clamp(18px,1.32vw,20px)",
                lineHeight: 1.62,
                color: CONTOUR,
                fontWeight: 400,
                textAlign: "justify",
                hyphens: "auto",
              }}
            >
              <span
                aria-hidden
                style={{
                  float: "left",
                  fontWeight: 500,
                  color: RUST,
                  fontSize: "clamp(78px,9vw,118px)",
                  lineHeight: 0.82,
                  paddingRight: 12,
                  paddingTop: 8,
                  letterSpacing: "-0.03em",
                }}
              >
                E
              </span>
              very map is opinionated. We chose to render the modern web at 1:24,000 — close
              enough to see the streets, far enough to keep the watershed in frame. Each project is
              hand-drawn from raw markup. No tracings. No copies. The contours match the territory.
            </p>

            {/* hand-drawn elevation profile */}
            <motion.div
              variants={reveal} initial="hidden" whileInView="show" viewport={view}
              style={{ marginTop: "clamp(40px,5vw,64px)", marginBottom: "clamp(40px,5vw,64px)" }}
              aria-hidden
            >
              <svg
                viewBox="0 0 800 120"
                width="100%"
                height="110"
                preserveAspectRatio="none"
                style={{ display: "block" }}
              >
                <defs>
                  <pattern id="atlas-tick" width="40" height="120" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="92" x2="0" y2="100" stroke={CONTOUR} strokeWidth="0.5" opacity="0.35" />
                  </pattern>
                </defs>
                {/* baseline */}
                <line x1="0" y1="100" x2="800" y2="100" stroke={CONTOUR} strokeWidth="0.6" opacity="0.45" />
                <rect x="0" y="0" width="800" height="120" fill="url(#atlas-tick)" />
                {/* elevation gridlines */}
                <line x1="0" y1="40" x2="800" y2="40" stroke={CONTOUR} strokeWidth="0.4" strokeDasharray="2 4" opacity="0.25" />
                <line x1="0" y1="70" x2="800" y2="70" stroke={CONTOUR} strokeWidth="0.4" strokeDasharray="2 4" opacity="0.25" />
                {/* the wavy elevation profile, hand-drawn feel */}
                <path
                  d="M0,92 C40,88 70,72 110,70 C150,68 180,82 220,78 C260,74 290,46 340,42 C380,39 410,58 460,52 C500,48 540,28 600,32 C650,35 680,60 720,62 C750,64 780,54 800,50"
                  fill="none"
                  stroke={CONTOUR}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* a fainter shadow line for hand-drawn doubling */}
                <path
                  d="M0,94 C42,90 72,75 112,72 C152,70 182,84 222,80 C262,76 292,48 342,44 C382,41 412,60 462,54 C502,50 542,30 602,34 C652,37 682,62 722,64 C752,66 782,56 800,52"
                  fill="none"
                  stroke={RUST}
                  strokeWidth="0.6"
                  strokeOpacity="0.55"
                  strokeLinecap="round"
                />
                {/* peak marker */}
                <circle cx="340" cy="42" r="2.4" fill={RUST} />
                <text x="348" y="34" fontSize="9" fill={FOREST} fontFamily="ui-monospace,JetBrains Mono,monospace" letterSpacing="0.18em">
                  PK · 1247ft
                </text>
                {/* mile labels */}
                <text x="0" y="116" fontSize="8" fill={CONTOUR} fillOpacity="0.55" fontFamily="ui-monospace,JetBrains Mono,monospace" letterSpacing="0.16em">0 MI</text>
                <text x="392" y="116" fontSize="8" fill={CONTOUR} fillOpacity="0.55" fontFamily="ui-monospace,JetBrains Mono,monospace" letterSpacing="0.16em">2 MI</text>
                <text x="772" y="116" fontSize="8" fill={CONTOUR} fillOpacity="0.55" fontFamily="ui-monospace,JetBrains Mono,monospace" letterSpacing="0.16em">4 MI</text>
              </svg>
            </motion.div>

            {/* pull quote */}
            <motion.figure
              variants={reveal} initial="hidden" whileInView="show" viewport={view}
              style={{
                margin: "clamp(40px,5vw,64px) 0 0",
                padding: "clamp(28px,3vw,40px) 0 clamp(22px,2.4vw,32px)",
                borderTop: `1px solid ${HAIRLINE}`,
                borderBottom: `1px solid ${HAIRLINE}`,
                position: "relative",
              }}
            >
              {/* contour-line ornament (small concentric ovals) */}
              <svg
                aria-hidden
                width="64"
                height="20"
                viewBox="0 0 64 20"
                style={{ position: "absolute", top: -10, left: 0, background: PAPER, padding: "0 8px" }}
              >
                <ellipse cx="32" cy="10" rx="6" ry="3" fill="none" stroke={RUST} strokeWidth="0.7" />
                <ellipse cx="32" cy="10" rx="12" ry="5" fill="none" stroke={RUST} strokeWidth="0.6" opacity="0.7" />
                <ellipse cx="32" cy="10" rx="20" ry="7.5" fill="none" stroke={RUST} strokeWidth="0.5" opacity="0.45" />
              </svg>
              <blockquote
                style={{
                  margin: 0,
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: RUST,
                  fontSize: "clamp(28px,3.6vw,46px)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.008em",
                }}
              >
                Templates are not maps. They are stickers.
              </blockquote>
              <figcaption
                className={mono.className}
                style={{
                  marginTop: 18,
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.30em",
                  textTransform: "uppercase",
                  color: FOREST,
                }}
              >
                — KPT survey notes · field journal vii
              </figcaption>
            </motion.figure>
          </motion.div>

          {/* marginalia gutter */}
          <motion.aside
            variants={reveal} initial="hidden" whileInView="show" viewport={view}
            aria-label="Cartographic marginalia"
            className={`atlas-philo-margin ${mono.className}`}
          >
            {/* fake compass rose */}
            <svg aria-hidden width="56" height="56" viewBox="0 0 56 56" style={{ marginBottom: 22 }}>
              <circle cx="28" cy="28" r="22" fill="none" stroke={CONTOUR} strokeWidth="0.6" opacity="0.55" />
              <circle cx="28" cy="28" r="14" fill="none" stroke={CONTOUR} strokeWidth="0.4" opacity="0.4" />
              <path d="M28,4 L31,28 L28,52 L25,28 Z" fill={CONTOUR} fillOpacity="0.85" />
              <path d="M4,28 L28,25 L52,28 L28,31 Z" fill={RUST} fillOpacity="0.9" />
              <text x="28" y="3" fontSize="6" fill={FOREST} textAnchor="middle" fontFamily="ui-monospace,JetBrains Mono,monospace" letterSpacing="0.18em">N</text>
            </svg>

            {marginalia.map((m, i) => (
              <div key={m.label} style={{ marginBottom: i === marginalia.length - 1 ? 0 : 22 }}>
                <div style={{ height: 1, width: 22, background: FOREST, opacity: 0.55, marginBottom: 8 }} />
                <div
                  style={{
                    fontSize: 9.5,
                    fontWeight: 500,
                    letterSpacing: "0.26em",
                    textTransform: "uppercase",
                    lineHeight: 1.55,
                    color: FOREST,
                  }}
                >
                  {m.label}
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 9,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: OCEAN,
                    opacity: 0.78,
                  }}
                >
                  {m.fol}
                </div>
              </div>
            ))}
          </motion.aside>
        </div>
      </div>

      <style>{`
        .atlas-philo-grid { grid-template-columns: 1fr; }
        .atlas-philo-body { max-width: 720px; }
        .atlas-philo-margin { align-self: start; }
        @media (min-width: 920px) {
          .atlas-philo-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 0.30fr);
            column-gap: clamp(48px, 6vw, 96px);
            align-items: start;
          }
          .atlas-philo-body { margin-left: clamp(0px, 3vw, 48px); }
          .atlas-philo-margin {
            padding-left: clamp(20px, 2vw, 28px);
            border-left: 1px dashed ${HAIRLINE};
            padding-top: 4px;
          }
        }
      `}</style>
    </section>
  );
}
