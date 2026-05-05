"use client";

import { Inter } from "next/font/google";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], display: "swap" });

const SOFT_WHITE = "#FAFAFA";
const AGENT = "#1A1A2E";
const PURPLE = "#6B4EE6";
const GREY = "#E5E5E8";

const STEPS = [
  { num: "01", name: "Discovery", desc: "A short call to capture the goal and scope." },
  { num: "02", name: "Build", desc: "Design + code with weekly check-ins." },
  { num: "03", name: "Review", desc: "Private staging, feedback, public deploy." },
  { num: "04", name: "Delivery", desc: "Source code transferred. AI agent connected if you want one." },
];

const META: React.CSSProperties = { fontSize: 11, letterSpacing: "0.04em", color: "rgba(26,26,46,0.5)", fontWeight: 500 };
const REVEAL = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const };
const VIEW = { once: true, margin: "0px 0px -80px 0px" };

export default function ProcessConversation() {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "0px 0px -120px 0px" });

  return (
    <section
      className={inter.className}
      style={{ background: SOFT_WHITE, color: AGENT, padding: "120px 24px 140px", display: "flex", justifyContent: "center" }}
    >
      <div style={{ width: "100%", maxWidth: 760, display: "flex", flexDirection: "column", gap: 28 }}>
        {/* Section meta */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: 0.65 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: PURPLE, boxShadow: "0 0 0 4px rgba(107,78,230,0.16)" }} />
          <span style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}>Process · Thread #04</span>
        </div>

        {/* USER bubble */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEW} transition={REVEAL}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, maxWidth: "78%" }}>
            <div style={META}>You</div>
            <div style={{ background: GREY, color: AGENT, padding: "14px 18px", borderRadius: "20px 20px 6px 20px", fontSize: 16, lineHeight: 1.45 }}>
              How does the process work?
            </div>
          </div>
        </motion.div>

        {/* AGENT bubble + embedded process card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEW} transition={{ ...REVEAL, delay: 0.25 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10 }}
        >
          {/* Agent identity */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: 4 }}>
            <div aria-hidden style={{
              width: 26, height: 26, borderRadius: 999,
              background: `radial-gradient(circle at 30% 30%, ${PURPLE}, ${AGENT})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 700, color: "#fff",
            }}>KA</div>
            <div style={{ ...META, color: "rgba(26,26,46,0.6)" }}>
              KPT Agent <span style={{ opacity: 0.5 }}>· just now</span>
            </div>
          </div>

          {/* Agent text bubble */}
          <div style={{
            background: AGENT, color: SOFT_WHITE, padding: "16px 20px",
            borderRadius: "20px 20px 20px 6px", fontSize: 16, lineHeight: 1.5, maxWidth: "82%",
          }}>
            Four steps. <span style={{ color: PURPLE, fontWeight: 600 }}>47 days</span> on average. Here&rsquo;s the timeline:
          </div>

          {/* Embedded process card */}
          <div ref={cardRef} style={{
            alignSelf: "stretch", maxWidth: 560, background: "#fff",
            border: `1px solid ${GREY}`, borderRadius: 18, padding: "22px 22px 18px",
            boxShadow: "0 1px 0 rgba(26,26,46,0.02), 0 12px 32px -18px rgba(26,26,46,0.18)",
            marginLeft: 4,
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              marginBottom: 18, paddingBottom: 14, borderBottom: `1px solid ${GREY}`,
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em" }}>The KPT Process</span>
              <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: PURPLE, fontWeight: 600 }}>
                4 steps · 47 days
              </span>
            </div>

            <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {STEPS.map((s, i) => (
                <motion.li key={s.num}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ ...REVEAL, delay: 0.4 + i * 0.2 }}
                  style={{ display: "grid", gridTemplateColumns: "36px 1fr", gap: 14, alignItems: "flex-start", position: "relative" }}
                >
                  {i < STEPS.length - 1 && (
                    <span aria-hidden style={{
                      position: "absolute", left: 17, top: 36, bottom: -14, width: 2,
                      background: `linear-gradient(${PURPLE}33, ${PURPLE}11)`,
                    }} />
                  )}
                  <div style={{
                    width: 36, height: 36, borderRadius: 999, background: PURPLE, color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 600, boxShadow: "0 0 0 4px rgba(107,78,230,0.10)",
                  }}>{s.num}</div>
                  <div style={{ paddingTop: 6 }}>
                    <div style={{ fontSize: 15, fontWeight: 500, color: AGENT }}>{s.name}</div>
                    <div style={{ fontSize: 14, color: "rgba(26,26,46,0.62)", lineHeight: 1.45, marginTop: 3 }}>
                      {s.desc}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>

        {/* Follow-up suggestion */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEW} transition={{ ...REVEAL, delay: 1.3 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, marginTop: 4 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 4 }}>
            <span aria-hidden style={{ width: 5, height: 5, borderRadius: 999, background: PURPLE, animation: "v13Pulse 1.6s ease-in-out infinite" }} />
            <span style={{ ...META, color: "rgba(26,26,46,0.5)" }}>Suggested follow-up</span>
          </div>
          <button type="button"
            style={{
              background: "transparent", color: AGENT, padding: "12px 18px",
              borderRadius: "16px 16px 16px 4px", fontSize: 15, fontWeight: 500,
              border: `1px dashed ${PURPLE}66`, cursor: "pointer", fontFamily: "inherit",
              transition: "background 200ms ease, border-color 200ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(107,78,230,0.06)";
              e.currentTarget.style.borderColor = PURPLE;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = `${PURPLE}66`;
            }}
          >
            Want me to send this to your inbox?
          </button>
        </motion.div>
      </div>

      <style>{`@keyframes v13Pulse { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.4)} }`}</style>
    </section>
  );
}
