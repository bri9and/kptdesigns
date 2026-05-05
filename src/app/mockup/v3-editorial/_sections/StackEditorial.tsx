"use client";

import { Fraunces, JetBrains_Mono } from "next/font/google";
import { motion } from "framer-motion";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const PAPER = "#F5F1EA";
const INK = "#0F0F0F";
const TERRACOTTA = "#C56738";
const GRAPHITE = "#5C5852";
const HAIRLINE = "rgba(15,15,15,0.08)";

type Spec = { n: string; name: string; body: string; spec: string };

const SPECS: Spec[] = [
  { n: "01", name: "Next.js 16", body: "The framework powering modern editorial websites: server-rendered, edge-cached, instant.", spec: "APP ROUTER · RSC · EDGE" },
  { n: "02", name: "React 19", body: "Component architecture that holds together as the site grows. Maintainable for the long arc.", spec: "HOOKS · SUSPENSE · RSC" },
  { n: "03", name: "Tailwind CSS v4", body: "Utility-first CSS. Zero unused bytes shipped to the browser.", spec: "JIT · TREE-SHAKEN · SUB 10KB" },
  { n: "04", name: "TypeScript", body: "Type safety from database to DOM. Errors caught before customers find them.", spec: "STRICT · END-TO-END" },
  { n: "05", name: "Vercel Edge", body: "Global edge deployment in 194 regions. SSL and DDoS included.", spec: "194 POPS · 99.99% UPTIME" },
  { n: "06", name: "Custom Code", body: "Hand-written for your business. No templates. No page builders.", spec: "ZERO TEMPLATES · HAND-CRAFTED" },
];

export default function StackEditorial() {
  return (
    <section
      className={fraunces.className}
      style={{
        background: PAPER,
        color: INK,
        padding: "clamp(80px, 12vw, 160px) clamp(20px, 5vw, 80px)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "clamp(60px, 8vw, 120px)" }}
        >
          <div style={{ height: 1, background: TERRACOTTA, width: "100%" }} />
          <div
            className={mono.className}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10,
              letterSpacing: "0.18em",
              color: TERRACOTTA,
              textTransform: "uppercase",
              padding: "14px 0 0",
            }}
          >
            <span>§ 03 — Specifications</span>
            <span style={{ color: GRAPHITE }}>The Stack · Vol. 01</span>
          </div>
          <h2
            style={{
              marginTop: "clamp(40px, 6vw, 80px)",
              fontWeight: 300,
              fontSize: "clamp(40px, 6vw, 84px)",
              lineHeight: 0.96,
              letterSpacing: "-0.02em",
              maxWidth: 900,
              fontVariationSettings: '"opsz" 144',
            }}
          >
            Six instruments,{" "}
            <span style={{ fontStyle: "italic", color: GRAPHITE }}>
              chosen deliberately
            </span>
            .
          </h2>
        </motion.div>

        <div>
          {SPECS.map((s, i) => {
            const flipped = i % 2 === 1;
            return (
              <motion.article
                key={s.n}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="stack-entry"
                data-flipped={flipped ? "true" : "false"}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 24,
                  padding: "clamp(40px, 6vw, 72px) 0",
                  borderTop: `1px solid ${HAIRLINE}`,
                  borderBottom:
                    i === SPECS.length - 1 ? `1px solid ${HAIRLINE}` : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: flipped ? "flex-end" : "flex-start",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      fontWeight: 200,
                      fontSize: "clamp(96px, 14vw, 168px)",
                      lineHeight: 0.85,
                      letterSpacing: "-0.04em",
                      color: INK,
                      fontVariationSettings: '"opsz" 144',
                    }}
                  >
                    {s.n}
                  </span>
                </div>
                <div
                  style={{
                    paddingTop: "clamp(8px, 1.5vw, 20px)",
                    textAlign: flipped ? "right" : "left",
                  }}
                >
                  <h3
                    style={{
                      fontWeight: 500,
                      fontSize: "clamp(26px, 3.4vw, 36px)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.015em",
                      margin: 0,
                      fontVariationSettings: '"opsz" 72',
                    }}
                  >
                    {s.name}
                  </h3>
                  <p
                    style={{
                      marginTop: 18,
                      fontSize: "clamp(16px, 1.25vw, 18px)",
                      lineHeight: 1.55,
                      color: GRAPHITE,
                      maxWidth: 600,
                      marginLeft: flipped ? "auto" : 0,
                    }}
                  >
                    {s.body}
                  </p>
                  <div
                    className={mono.className}
                    style={{
                      marginTop: 28,
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      color: TERRACOTTA,
                      textTransform: "uppercase",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      flexDirection: flipped ? "row-reverse" : "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <span
                      aria-hidden
                      style={{ width: 28, height: 1, background: TERRACOTTA }}
                    />
                    <span>{s.spec}</span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div
          className={mono.className}
          style={{
            marginTop: "clamp(40px, 6vw, 80px)",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 10,
            letterSpacing: "0.18em",
            color: GRAPHITE,
            textTransform: "uppercase",
          }}
        >
          <span>End § 03</span>
          <span>003 / KPT</span>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .stack-entry {
            grid-template-columns: minmax(180px, 1fr) minmax(0, 1.6fr) !important;
            grid-template-areas: "num txt";
            gap: clamp(32px, 5vw, 96px) !important;
            align-items: start;
          }
          .stack-entry > div:nth-child(1) { grid-area: num; }
          .stack-entry > div:nth-child(2) { grid-area: txt; }
          .stack-entry[data-flipped="true"] {
            grid-template-columns: minmax(0, 1.6fr) minmax(180px, 1fr) !important;
            grid-template-areas: "txt num";
          }
        }
      `}</style>
    </section>
  );
}
