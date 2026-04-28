"use client";

import { Fraunces, JetBrains_Mono } from "next/font/google";
import { motion } from "framer-motion";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["300", "400", "700", "900"], style: ["normal", "italic"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"], display: "swap" });

const PAPER = "#F5F1EA", INK = "#0F0F0F", TERRA = "#C56738", OXBLOOD = "#6B1F1F";
const HAIRLINE = "rgba(15,15,15,0.08)";

const reveal = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 0.61, 0.36, 1] as const } },
};
const view = { once: true, margin: "-10% 0px" } as const;

const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.06 0 0 0 0 0.06 0 0 0 0 0.06 0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const refs = [
  "Ref. 01 — Jost, ‘Typographie’ · 1949",
  "Ref. 02 — Tschichold, ‘Asym. Typ.’ · 1928",
  "Ref. 03 — Bringhurst, ‘Elements’ · 1992",
];

export default function PhilosophyEditorial() {
  return (
    <section
      className={fraunces.className}
      style={{ position: "relative", background: PAPER, color: INK, padding: "clamp(96px,14vw,192px) 0", overflow: "hidden" }}
    >
      <div
        aria-hidden
        style={{ position: "absolute", inset: 0, backgroundImage: grain, backgroundSize: "220px 220px", opacity: 0.35, mixBlendMode: "multiply", pointerEvents: "none" }}
      />
      <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "0 clamp(20px,5vw,56px)" }}>
        <motion.div
          variants={reveal} initial="hidden" whileInView="show" viewport={view}
          style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: "clamp(48px,7vw,96px)" }}
        >
          <span style={{ height: 1, width: 56, background: TERRA }} />
          <span className={mono.className} style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: TERRA }}>
            § 02 — Philosophy
          </span>
          <span style={{ flex: 1, height: 1, background: HAIRLINE }} />
          <span className={mono.className} style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5C5852" }}>
            Folio 014
          </span>
        </motion.div>

        <motion.h2
          variants={reveal} initial="hidden" whileInView="show" viewport={view}
          style={{ fontWeight: 300, fontStyle: "italic", fontSize: "clamp(34px,5.4vw,68px)", lineHeight: 1.04, letterSpacing: "-0.02em", margin: "0 0 clamp(40px,6vw,72px)", maxWidth: 880, textIndent: "-0.06em" }}
        >
          On <span style={{ color: OXBLOOD }}>craft</span>, ownership,
          <br />
          and the long quiet of well-set type.
        </motion.h2>

        <div className="philo-grid" style={{ display: "grid", gap: "clamp(28px,4vw,56px)" }}>
          <motion.div
            variants={reveal} initial="hidden" whileInView="show" viewport={view} className="philo-cols"
            style={{ columnGap: "clamp(28px,3.4vw,56px)", fontSize: "clamp(17px,1.18vw,20px)", lineHeight: 1.62, textAlign: "justify", hyphens: "auto", WebkitHyphens: "auto" }}
          >
            <p style={{ margin: 0 }}>
              <span
                aria-hidden
                style={{ float: "left", fontWeight: 900, color: TERRA, fontSize: "clamp(86px,10.4vw,132px)", lineHeight: 0.86, paddingRight: 14, paddingTop: 6, letterSpacing: "-0.04em" }}
              >
                W
              </span>
              e hand-code every site from scratch. No templates. No page builders. No WordPress. Each line of markup is set with the same care a typographer sets type — for spacing, rhythm, voice.
            </p>
            <p style={{ margin: "1.15em 0 0" }}>
              When a project completes, you receive the entire source — the repository, the deployment configuration, the documentation. No lock-in. No ransom. Your website. Your code. Forever.
            </p>
          </motion.div>

          <motion.figure
            variants={reveal} initial="hidden" whileInView="show" viewport={view} className="philo-pull"
            style={{ margin: 0, padding: "clamp(20px,2.4vw,32px) 0", borderTop: `1px solid ${HAIRLINE}`, borderBottom: `1px solid ${HAIRLINE}`, position: "relative" }}
          >
            <span
              aria-hidden
              style={{ position: "absolute", left: "-0.32em", top: "0.05em", fontStyle: "italic", color: OXBLOOD, fontSize: "clamp(72px,11vw,140px)", lineHeight: 1, userSelect: "none" }}
            >
              “
            </span>
            <blockquote
              style={{ margin: 0, fontStyle: "italic", color: OXBLOOD, fontSize: "clamp(36px,4.6vw,72px)", lineHeight: 1.04, letterSpacing: "-0.015em" }}
            >
              Type is craft.
              <br />
              Code is type set in time.
            </blockquote>
            <figcaption
              className={mono.className}
              style={{ marginTop: 18, fontSize: 10.5, letterSpacing: "0.22em", textTransform: "uppercase", color: TERRA }}
            >
              — Studio Note, KPT · MMXXVI
            </figcaption>
          </motion.figure>

          <motion.aside
            variants={reveal} initial="hidden" whileInView="show" viewport={view}
            className={`philo-margin ${mono.className}`} aria-label="Marginalia"
            style={{ fontSize: 10.5, lineHeight: 1.55, letterSpacing: "0.18em", textTransform: "uppercase", color: TERRA, display: "grid", gap: 22, alignContent: "start" }}
          >
            {refs.map((r) => (
              <div key={r}>
                <div style={{ height: 1, width: 22, background: TERRA, marginBottom: 8 }} />
                {r}
              </div>
            ))}
          </motion.aside>
        </div>
      </div>

      <style>{`
        .philo-cols { columns: 1; }
        .philo-cols p { orphans: 3; widows: 3; }
        @media (min-width: 768px) {
          .philo-grid {
            grid-template-columns: minmax(0,1fr) minmax(0,0.46fr);
            grid-template-areas: "cols margin" "pull margin";
            row-gap: clamp(36px,4.4vw,64px);
          }
          .philo-cols { grid-area: cols; columns: 2; }
          .philo-pull { grid-area: pull; max-width: 880px; }
          .philo-margin {
            grid-area: margin;
            border-left: 1px solid ${HAIRLINE};
            padding-left: clamp(20px,2vw,32px);
            margin-top: 4px;
          }
        }
      `}</style>
    </section>
  );
}
