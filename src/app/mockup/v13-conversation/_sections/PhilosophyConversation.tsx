"use client";

import { Inter } from "next/font/google";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

type Turn =
  | { role: "user"; text: string }
  | { role: "agent"; text: string; typingMs: number };

const SCRIPT: Turn[] = [
  { role: "user", text: "Why hand-coded? Why not WordPress?" },
  {
    role: "agent",
    text:
      "Templates are convenient. They also ship every site that uses them with the same baggage. We hand-code from scratch — every layout decision is yours, every byte intentional.",
    typingMs: 1100,
  },
  { role: "user", text: "What about ownership when we're done?" },
  {
    role: "agent",
    text:
      "You get the full repository, the deployment, and the documentation. No retainer. No lock-in. You can hire any developer to maintain it.",
    typingMs: 1100,
  },
];

const PURPLE = "#6B4EE6";
const PURPLE_BG = "rgba(107, 78, 230, 0.10)";
const PURPLE_BORDER = "rgba(107, 78, 230, 0.28)";
const AGENT_SURFACE = "#1A1A2E";
const INK = "#1A1A2E";
const SOFT_WHITE = "#FAFAFA";
const SUBTLE = "#9A9AAE";

function TypingDots() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: "rgba(255,255,255,0.55)",
            display: "inline-block",
          }}
          animate={{ y: [0, -4, 0], opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

function Bubble({ turn, delay }: { turn: Turn; delay: number }) {
  const isUser = turn.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "min(560px, 78%)",
          padding: "14px 18px",
          borderRadius: 18,
          borderTopRightRadius: isUser ? 6 : 18,
          borderTopLeftRadius: isUser ? 18 : 6,
          background: isUser ? PURPLE_BG : AGENT_SURFACE,
          border: isUser ? `1px solid ${PURPLE_BORDER}` : "1px solid rgba(255,255,255,0.04)",
          color: isUser ? INK : "rgba(255,255,255,0.92)",
          fontSize: 15.5,
          lineHeight: 1.55,
          letterSpacing: -0.01,
          fontWeight: 400,
          boxShadow: isUser
            ? "0 1px 0 rgba(107,78,230,0.05)"
            : "0 12px 30px -18px rgba(26,26,46,0.45)",
        }}
      >
        {turn.text}
      </div>
    </motion.div>
  );
}

function TypingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
      aria-label="agent typing"
    >
      <div
        style={{
          padding: "12px 16px",
          borderRadius: 18,
          borderTopLeftRadius: 6,
          background: AGENT_SURFACE,
          minWidth: 56,
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <TypingDots />
      </div>
    </motion.div>
  );
}

export default function PhilosophyConversation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-15% 0px -15% 0px" });
  const [step, setStep] = useState(0); // index into SCRIPT that has been "committed"
  const [showTyping, setShowTyping] = useState(false);

  // Step state machine: when step is at an agent turn, show typing first, then commit it.
  useEffect(() => {
    if (!inView) return;
    if (step >= SCRIPT.length) return;
    const next = SCRIPT[step];
    if (next.role === "user") {
      // user message appears immediately (slight stagger after previous)
      const delay = step === 0 ? 350 : 450;
      const t = setTimeout(() => setStep((s) => s + 1), delay);
      return () => clearTimeout(t);
    }
    // agent: show typing indicator, then reveal bubble
    setShowTyping(true);
    const typingDuration = next.typingMs;
    const t = setTimeout(() => {
      setShowTyping(false);
      setStep((s) => s + 1);
    }, typingDuration);
    return () => clearTimeout(t);
  }, [inView, step]);

  return (
    <section
      ref={containerRef}
      className={inter.className}
      style={{
        background: SOFT_WHITE,
        color: INK,
        padding: "clamp(80px, 14vw, 160px) 24px",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Conversation meta strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 18,
            color: SUBTLE,
            fontSize: 12,
            letterSpacing: 0.04,
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          <span
            aria-hidden
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "#00C896",
              boxShadow: "0 0 0 4px rgba(0,200,150,0.12)",
            }}
          />
          <span>kpt agent · online</span>
          <span style={{ flex: 1, height: 1, background: "rgba(26,26,46,0.08)" }} />
          <span style={{ color: SUBTLE }}>philosophy</span>
        </motion.div>

        {SCRIPT.slice(0, step).map((turn, i) => (
          <Bubble key={i} turn={turn} delay={0} />
        ))}

        {showTyping && <TypingBubble />}
      </div>

      {/* Mobile: bubbles already stack single-column due to flex-direction column.
          Tighten max-width on small screens. */}
      <style jsx>{`
        @media (max-width: 640px) {
          section :global(div[style*="max-width: min(560px, 78%)"]) {
            max-width: 88% !important;
            font-size: 15px !important;
          }
        }
      `}</style>
    </section>
  );
}
