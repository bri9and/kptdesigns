"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const PURPLE = "#6B4EE6";
const AGENT_SURFACE = "#1A1A2E";
const INK = "#1A1A2E";
const SOFT_WHITE = "#FAFAFA";
const SUBTLE = "#9A9AAE";
const SYSTEM_GREEN = "#00C896";

const MONO =
  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";

const chipBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "12px 22px",
  borderRadius: 999,
  fontSize: 14.5,
  fontWeight: 600,
  letterSpacing: -0.005,
  textDecoration: "none",
};

function Dots({ size = 6, color = "rgba(255,255,255,0.55)" }: { size?: number; color?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          style={{ width: size, height: size, borderRadius: 999, background: color, display: "inline-block" }}
          animate={{ y: [0, -4, 0], opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

function TypingPill({ topLeft = 6 }: { topLeft?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
    >
      <div
        style={{
          padding: "12px 16px",
          borderRadius: 18,
          borderTopLeftRadius: topLeft,
          background: AGENT_SURFACE,
          minWidth: 56,
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <Dots />
      </div>
    </motion.div>
  );
}

function AgentBubble({ text, isFollowUp }: { text: string; isFollowUp?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
    >
      <div
        style={{
          maxWidth: "min(560px, 82%)",
          padding: "14px 18px",
          borderRadius: 18,
          borderTopLeftRadius: isFollowUp ? 18 : 6,
          background: AGENT_SURFACE,
          border: "1px solid rgba(255,255,255,0.04)",
          color: "rgba(255,255,255,0.93)",
          fontSize: 15.5,
          lineHeight: 1.55,
          letterSpacing: -0.01,
          fontWeight: 400,
          boxShadow: "0 12px 30px -18px rgba(26,26,46,0.45)",
        }}
      >
        {text}
      </div>
    </motion.div>
  );
}

export default function CtaConversation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  // 0 wait → 1 typing#1 → 2 bubble#1 + typing#2 → 3 both bubbles → 4 chips
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);

  useEffect(() => {
    if (!inView || phase >= 4) return;
    const ms = [400, 1100, 950, 380][phase];
    const t = setTimeout(() => setPhase((p) => (p + 1) as 0 | 1 | 2 | 3 | 4), ms);
    return () => clearTimeout(t);
  }, [inView, phase]);

  const showChips = phase >= 4;

  return (
    <section
      ref={ref}
      className={inter.className}
      style={{
        background: SOFT_WHITE,
        color: INK,
        padding: "clamp(96px, 16vw, 180px) 24px clamp(120px, 18vw, 200px)",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, color: SUBTLE, fontSize: 12, letterSpacing: 0.04, textTransform: "uppercase", fontWeight: 500 }}
        >
          <span aria-hidden style={{ width: 8, height: 8, borderRadius: 999, background: SYSTEM_GREEN, boxShadow: `0 0 0 4px ${SYSTEM_GREEN}1f` }} />
          <span>kpt agent · ready to hand off</span>
          <span style={{ flex: 1, height: 1, background: "rgba(26,26,46,0.08)" }} />
          <span>cta</span>
        </motion.div>

        {phase === 1 && <TypingPill topLeft={6} />}
        {phase >= 2 && (
          <AgentBubble text="Ready to start? I can save your conversation and pass it to a real human at KPT, or you can pick up the phone." />
        )}
        {phase === 2 && <TypingPill topLeft={18} />}
        {phase >= 3 && <AgentBubble text="Either way, we'll reply within a day." isFollowUp />}

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={showChips ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10, paddingLeft: 4 }}
        >
          <Link href="/start" style={{ ...chipBase, background: PURPLE, color: "#fff", border: `1px solid ${PURPLE}`, gap: 8, boxShadow: "0 10px 24px -12px rgba(107,78,230,0.55)" }}>
            Get Started
            <span aria-hidden style={{ fontSize: 16, lineHeight: 1, transform: "translateY(-1px)" }}>→</span>
          </Link>
          <Link href="/pricing" style={{ ...chipBase, background: "transparent", color: PURPLE, border: `1.5px solid ${PURPLE}` }}>
            View Pricing
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={showChips ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 22, paddingLeft: 4, color: SUBTLE, fontSize: 12 }}
        >
          <motion.span aria-hidden animate={{ opacity: [0.35, 1, 0.35] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 10px", borderRadius: 999, background: "rgba(26,26,46,0.04)", border: "1px solid rgba(26,26,46,0.06)" }}
          >
            <Dots size={4} color="rgba(26,26,46,0.45)" />
          </motion.span>
          <span>agent is still listening</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={showChips ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
          style={{ marginTop: 28, paddingTop: 22, borderTop: "1px solid rgba(26,26,46,0.08)", color: SUBTLE, fontFamily: MONO, fontSize: 10.5, letterSpacing: 0.18, textTransform: "uppercase", fontWeight: 500 }}
        >
          EST. 2004 · KPT × KPT AGENTS · ALWAYS LISTENING
        </motion.div>
      </div>
    </section>
  );
}
