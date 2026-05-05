"use client";

import { Playfair_Display, Inter } from "next/font/google";
import { motion } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"], display: "swap" });

const CHAMPAGNE = "#F4E4DC";
const CREAM = "#F8F2EA";
const INK = "#1A1612";
const GOLD = "#C9A861";
const GOLD_DEEP = "#A8884A";
const OXBLOOD = "#5E1A1A";
const CHARCOAL = "#3A3530";
const HAIRLINE = "rgba(26,22,18,0.10)";

const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.22, 0.61, 0.36, 1] as const } },
};
const view = { once: true, margin: "-12% 0px" } as const;

const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.10 0 0 0 0 0.08 0 0 0 0 0.07 0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const goldFoil = `linear-gradient(100deg, ${GOLD_DEEP} 0%, ${GOLD} 38%, #F0D8A2 52%, ${GOLD} 66%, ${GOLD_DEEP} 100%)`;
const foilText = {
  backgroundImage: goldFoil,
  backgroundClip: "text" as const,
  WebkitBackgroundClip: "text" as const,
  color: "transparent",
  WebkitTextFillColor: "transparent" as const,
};

const marginalia = [
  "v. CHANEL ATELIER 1939",
  "cf. BALENCIAGA WINTER 1959",
  "see DIOR, AVENUE MONTAIGNE 1947",
  "n.b. SAVILE ROW, RULE OF TWELVE",
];

export default function PhilosophyAtelier() {
  return (
    <section
      className={playfair.className}
      style={{
        position: "relative",
        background: CHAMPAGNE,
        color: INK,
        padding: "clamp(110px,15vw,200px) 0",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: grain,
          backgroundSize: "240px 240px",
          opacity: 0.55,
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(120% 80% at 50% 0%, ${CREAM} 0%, transparent 55%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 clamp(28px,7vw,96px)" }}>
        <motion.header
          variants={reveal} initial="hidden" whileInView="show" viewport={view}
          style={{ display: "flex", alignItems: "center", gap: 22, marginBottom: "clamp(64px,9vw,128px)" }}
        >
          <span
            className={inter.className}
            style={{ ...foilText, fontSize: 11, fontWeight: 500, letterSpacing: "0.42em", textTransform: "uppercase" }}
          >
            Éditorial · No. II
          </span>
          <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_DEEP} 50%, transparent 100%)` }} />
          <span
            className={inter.className}
            style={{ fontSize: 10, fontWeight: 400, letterSpacing: "0.32em", textTransform: "uppercase", color: CHARCOAL, opacity: 0.7 }}
          >
            Printemps · MMXXVI
          </span>
        </motion.header>

        <div className="atelier-philo-grid" style={{ display: "grid", gap: "clamp(40px,5vw,72px)" }}>
          <motion.div
            variants={reveal} initial="hidden" whileInView="show" viewport={view}
            className="atelier-philo-letter"
          >
            <p style={{ margin: 0, fontSize: "clamp(18px,1.35vw,22px)", lineHeight: 1.62, color: INK, fontWeight: 400, letterSpacing: "0.005em" }}>
              <span
                aria-hidden
                style={{
                  ...foilText,
                  float: "left",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  fontSize: "clamp(96px,11vw,148px)",
                  lineHeight: 0.82,
                  paddingRight: 16,
                  paddingTop: 10,
                  letterSpacing: "-0.04em",
                }}
              >
                E
              </span>
              ach season the conversation about web turns louder, more frantic. We have spent
              twenty-two years quieting that noise, garment by garment. We hand-cut every site from
              raw markup. We do not stock templates; we draft to specification. The repository, the
              deploy, the agent that answers the inbound call — all are passed to you upon
              completion, no proprietary thread retained.
            </p>

            <motion.figure
              variants={reveal} initial="hidden" whileInView="show" viewport={view}
              style={{
                margin: "clamp(56px,7vw,96px) 0 0",
                padding: "clamp(28px,3vw,44px) 0 clamp(20px,2.2vw,32px)",
                borderTop: `1px solid ${HAIRLINE}`,
                borderBottom: `1px solid ${HAIRLINE}`,
                position: "relative",
              }}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: "-0.36em",
                  top: "0.04em",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: OXBLOOD,
                  fontSize: "clamp(96px,13vw,168px)",
                  lineHeight: 1,
                  userSelect: "none",
                  opacity: 0.92,
                }}
              >
                “
              </span>
              <blockquote
                style={{
                  margin: 0,
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: OXBLOOD,
                  fontSize: "clamp(34px,4.4vw,64px)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.012em",
                }}
              >
                Couture is what survives
                <br />
                the season.
              </blockquote>
              <figcaption
                className={inter.className}
                style={{ ...foilText, marginTop: 22, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.32em", textTransform: "uppercase" }}
              >
                — Maison KPT · Studio Notation
              </figcaption>
            </motion.figure>

            <p
              className={inter.className}
              style={{
                marginTop: "clamp(40px,5vw,64px)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.36em",
                textTransform: "uppercase",
                color: CHARCOAL,
              }}
            >
              The Editor · K. P. T.
            </p>
          </motion.div>

          <motion.aside
            variants={reveal} initial="hidden" whileInView="show" viewport={view}
            aria-label="Marginalia"
            className={`atelier-philo-margin ${inter.className}`}
          >
            {marginalia.map((m, i) => (
              <div key={m} style={{ marginBottom: i === marginalia.length - 1 ? 0 : 26 }}>
                <div style={{ height: 1, width: 24, background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_DEEP} 100%)`, marginBottom: 10 }} />
                <div style={{ ...foilText, fontSize: 10, fontWeight: 500, letterSpacing: "0.32em", textTransform: "uppercase", lineHeight: 1.6 }}>
                  {m}
                </div>
                <div
                  className={playfair.className}
                  style={{ marginTop: 6, fontSize: 11, fontStyle: "italic", color: CHARCOAL, opacity: 0.62, letterSpacing: "0.02em" }}
                >
                  fol. {String(i + 14).padStart(3, "0")}
                </div>
              </div>
            ))}
          </motion.aside>
        </div>
      </div>

      <style>{`
        .atelier-philo-grid { grid-template-columns: 1fr; }
        .atelier-philo-letter { max-width: 720px; }
        .atelier-philo-margin { align-self: start; }
        @media (min-width: 900px) {
          .atelier-philo-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 0.32fr);
            column-gap: clamp(48px, 6vw, 96px);
            align-items: start;
          }
          .atelier-philo-letter { margin-left: clamp(0px, 4vw, 64px); }
          .atelier-philo-margin {
            padding-left: clamp(20px, 2vw, 32px);
            border-left: 1px solid ${HAIRLINE};
            padding-top: 6px;
          }
        }
      `}</style>
    </section>
  );
}
