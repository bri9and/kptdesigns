"use client";

import { Fraunces, JetBrains_Mono } from "next/font/google";
import { motion } from "framer-motion";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const PAPER = "#F5F1EA";
const INK = "#0F0F0F";
const TERRACOTTA = "#C56738";
const GRAPHITE = "#5C5852";
const HAIRLINE = "rgba(15,15,15,0.08)";

const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.22, 0.61, 0.36, 1] as const },
  },
};

type Chapter = {
  num: "01" | "02" | "03" | "04";
  roman: "ONE" | "TWO" | "THREE" | "FOUR";
  title: string;
  body: string;
  side: "left" | "right";
};

const CHAPTERS: Chapter[] = [
  {
    num: "01",
    roman: "ONE",
    title: "The Discovery",
    body: "We talk briefly. You describe what your business does, who you sell to, and what's not working. We listen. The conversation is short. The notes are detailed.",
    side: "left",
  },
  {
    num: "02",
    roman: "TWO",
    title: "The Build",
    body: "We design. We code. You see progress weekly. There are no surprise reveals. Revisions are included until the work feels right.",
    side: "right",
  },
  {
    num: "03",
    roman: "THREE",
    title: "The Review",
    body: "We launch privately first. You read every page. Once approved we deploy publicly, configure analytics, verify each path.",
    side: "left",
  },
  {
    num: "04",
    roman: "FOUR",
    title: "The Delivery",
    body: "The repository, the deployment, the documentation — handed over. No lock-in. No retainer required. Your website. Your code.",
    side: "right",
  },
];

export default function ProcessEditorial() {
  return (
    <section
      className={fraunces.className}
      style={{
        position: "relative",
        background: PAPER,
        color: INK,
        padding: "clamp(96px, 14vw, 192px) 0 clamp(96px, 14vw, 184px)",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "0 clamp(20px, 5vw, 56px)" }}>
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: "clamp(64px, 9vw, 128px)" }}
        >
          <span style={{ display: "block", height: 1, width: 56, background: TERRACOTTA }} />
          <span
            className={mono.className}
            style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: TERRACOTTA, whiteSpace: "nowrap" }}
          >
            § 05 — Process · the four chapters
          </span>
          <span style={{ flex: 1, display: "block", height: 1, background: HAIRLINE }} />
          <span
            className={mono.className}
            style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: GRAPHITE }}
          >
            Folio 037
          </span>
        </motion.div>

        <div className="proc-chapters">
          {CHAPTERS.map((c, i) => (
            <motion.article
              key={c.num}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-12% 0px" }}
              className={`proc-chapter proc-${c.side}`}
            >
              <div className="proc-numblock">
                <div
                  aria-hidden
                  className="proc-numeral"
                  style={{
                    fontFamily: "inherit",
                    fontWeight: 200,
                    fontVariationSettings: "'opsz' 144, 'wght' 200",
                    color: INK,
                    fontSize: "clamp(140px, 19vw, 220px)",
                    lineHeight: 0.82,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {c.num}
                </div>
                <div
                  className={mono.className}
                  style={{ marginTop: 14, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: TERRACOTTA }}
                >
                  — {c.roman}.
                </div>
              </div>

              <div className="proc-textblock">
                <h3
                  style={{
                    margin: 0,
                    marginBottom: "clamp(18px, 1.6vw, 24px)",
                    fontFamily: "inherit",
                    fontWeight: 500,
                    fontSize: "clamp(30px, 3.6vw, 48px)",
                    lineHeight: 1.04,
                    letterSpacing: "-0.02em",
                    color: INK,
                    textTransform: "uppercase",
                  }}
                >
                  {c.title}
                </h3>
                <p className="proc-body">{c.body}</p>
              </div>

              {i < CHAPTERS.length - 1 && (
                <div className="proc-break" aria-hidden>
                  <span style={{ flex: 1, height: 1, background: HAIRLINE }} />
                  <span className={mono.className} style={{ fontSize: 13, color: TERRACOTTA, letterSpacing: "0.1em", lineHeight: 1 }}>
                    §
                  </span>
                  <span style={{ flex: 1, height: 1, background: HAIRLINE }} />
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .proc-chapters { display: flex; flex-direction: column; }
        .proc-chapter {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: clamp(24px, 3vw, 40px);
          padding-bottom: clamp(72px, 11vw, 120px);
          margin-bottom: clamp(72px, 11vw, 120px);
        }
        .proc-chapter:last-child { padding-bottom: 0; margin-bottom: 0; }
        .proc-numeral { font-feature-settings: "lnum" 1, "tnum" 1, "kern" 1; }
        .proc-textblock { max-width: 560px; }
        .proc-body {
          margin: 0;
          font-family: inherit;
          font-weight: 400;
          font-size: clamp(17px, 1.22vw, 20px);
          line-height: 1.55;
          color: ${INK};
          text-align: left;
          hyphens: auto;
          -webkit-hyphens: auto;
        }
        .proc-body::first-letter {
          font-family: inherit;
          font-weight: 700;
          color: ${TERRACOTTA};
          font-size: 3.4em;
          line-height: 0.86;
          float: left;
          padding: 0.06em 0.12em 0 0;
          margin-right: 0.04em;
          letter-spacing: -0.04em;
        }
        .proc-break {
          position: absolute; left: 0; right: 0; bottom: 0;
          display: flex; align-items: center; gap: 18px;
        }
        @media (min-width: 768px) {
          .proc-chapter {
            grid-template-columns: minmax(0, 0.8fr) minmax(0, 1fr);
            align-items: end;
            gap: clamp(36px, 5vw, 80px);
          }
          .proc-left .proc-numblock { grid-column: 1; text-align: left; }
          .proc-left .proc-textblock { grid-column: 2; }
          .proc-right .proc-numblock { grid-column: 2; grid-row: 1; text-align: right; justify-self: end; }
          .proc-right .proc-textblock { grid-column: 1; grid-row: 1; justify-self: end; text-align: right; }
          .proc-right .proc-body { text-align: right; }
          .proc-right .proc-body::first-letter {
            float: none; display: inline; font-size: 1em;
            color: ${TERRACOTTA}; padding: 0; margin: 0;
          }
        }
      `}</style>
    </section>
  );
}
