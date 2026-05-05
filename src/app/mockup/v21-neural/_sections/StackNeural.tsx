"use client";

import { motion } from "framer-motion";

const PALETTE = {
  void: "#02030A",
  latent: "#8B5CF6",
  cyan: "#00E5FF",
  pink: "#FF0080",
  amber: "#FFB000",
  text: "#F1F5FF",
  grey: "#9BA3C7",
};

const STACK = [
  { code: "L01·N01", name: "Next.js 16", spec: "App Router · RSC · Edge", desc: "Server-side rendering, edge functions, instant pages.", tone: "cyan" as const },
  { code: "L01·N02", name: "React 19", spec: "Hooks · Suspense · RSC", desc: "Component architecture built for scale.", tone: "cyan" as const },
  { code: "L01·N03", name: "Tailwind 4", spec: "JIT · Tree-shaken · <10KB", desc: "Utility-first styling. Pixel-perfect, every device.", tone: "latent" as const },
  { code: "L01·N04", name: "TypeScript", spec: "Strict · End-to-End", desc: "Full type safety database to DOM. Bugs caught at build.", tone: "latent" as const },
  { code: "L01·N05", name: "Vercel Edge", spec: "194 PoPs · 99.99% Uptime", desc: "Global edge deployment. Built-in SSL & DDoS.", tone: "cyan" as const },
  { code: "L01·N06", name: "Custom Code", spec: "Zero Templates · Yours Forever", desc: "Every line written for your business. Source code is yours.", tone: "latent" as const },
];

const FLAGSHIP = {
  code: "L05·OUT",
  name: "KPT Agents",
  spec: "AI INBOUND · 24/7 · ANSWERS WHEN YOU CAN'T",
  desc: "Sister-company. AI phone agents that answer your inbound calls — book jobs, qualify leads, route emergencies. The network is the receptionist.",
};

function NodeCard({
  code,
  name,
  spec,
  desc,
  tone,
  index,
}: {
  code: string;
  name: string;
  spec: string;
  desc: string;
  tone: "cyan" | "latent";
  index: number;
}) {
  const accent = tone === "cyan" ? PALETTE.cyan : PALETTE.latent;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, delay: 0.05 * index, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-7 rounded-lg border backdrop-blur-md group"
      style={{
        background: "rgba(2,3,10,0.55)",
        borderColor: "rgba(155,163,199,0.12)",
      }}
    >
      {/* Edge glints */}
      <svg className="absolute -top-3 left-1/2 -translate-x-1/2" width="80" height="14" aria-hidden>
        <line x1="0" y1="7" x2="80" y2="7" stroke={accent} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 3" />
        <circle cx="40" cy="7" r="3" fill={accent} />
      </svg>
      <svg className="absolute -bottom-3 left-1/2 -translate-x-1/2" width="80" height="14" aria-hidden>
        <line x1="0" y1="7" x2="80" y2="7" stroke={accent} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 3" />
      </svg>

      <div
        className="font-mono uppercase mb-4"
        style={{ fontSize: 10, letterSpacing: "0.32em", color: PALETTE.grey }}
      >
        <span style={{ color: accent }}>●</span> {code}
      </div>
      <h3
        style={{
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "0.01em",
          color: PALETTE.text,
          marginBottom: 8,
        }}
      >
        {name}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.65, color: PALETTE.grey, fontWeight: 300 }}>{desc}</p>
      <div
        className="font-mono uppercase mt-5 pt-4"
        style={{
          fontSize: 10,
          letterSpacing: "0.24em",
          color: PALETTE.grey,
          borderTop: "1px solid rgba(155,163,199,0.1)",
        }}
      >
        {spec}
      </div>
    </motion.div>
  );
}

export default function StackNeural() {
  return (
    <div className="relative w-full min-h-screen flex items-center px-6 md:px-12 py-20">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono uppercase mb-4"
          style={{ fontSize: 11, letterSpacing: "0.32em", color: PALETTE.grey }}
        >
          <span style={{ color: PALETTE.cyan }}>§ 03</span> · LAYER 01 · STACK
        </motion.div>

        <motion.h2
          id="sec-2-title"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(36px, 5.4vw, 72px)",
            fontWeight: 800,
            letterSpacing: "0.04em",
            lineHeight: 1,
            color: PALETTE.text,
            marginBottom: 24,
          }}
        >
          The hidden layers.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ fontSize: 16, color: PALETTE.grey, fontWeight: 300, maxWidth: 560, lineHeight: 1.7 }}
          className="mb-12"
        >
          The modern stack behind every site. Six core neurons feeding one
          flagship output —{" "}
          <span style={{ color: PALETTE.cyan }}>KPT Agents</span>, our AI
          inbound phone receptionist.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {STACK.map((s, i) => (
            <NodeCard key={s.name} {...s} index={i} />
          ))}
        </div>

        {/* Flagship row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-8 md:p-10 rounded-lg border backdrop-blur-md overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.14), rgba(0,229,255,0.08) 50%, rgba(255,0,128,0.06))",
            borderColor: "rgba(0,229,255,0.4)",
            boxShadow: `0 0 48px rgba(139,92,246,0.18), inset 0 0 24px rgba(0,229,255,0.06)`,
          }}
        >
          {/* edges flowing in from above */}
          <svg className="absolute -top-1 left-0 right-0 h-12 w-full pointer-events-none" aria-hidden>
            {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((p, i) => (
              <line
                key={i}
                x1={`${p * 100}%`}
                y1="0"
                x2="50%"
                y2="48"
                stroke={PALETTE.cyan}
                strokeOpacity="0.35"
                strokeWidth="1"
              />
            ))}
            <circle cx="50%" cy="48" r="4" fill={PALETTE.cyan} />
          </svg>

          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-3">
              <div
                className="font-mono uppercase"
                style={{ fontSize: 10, letterSpacing: "0.32em", color: PALETTE.cyan }}
              >
                ★ FLAGSHIP · {FLAGSHIP.code}
              </div>
              <h3
                style={{
                  fontSize: "clamp(28px, 3.6vw, 44px)",
                  fontWeight: 800,
                  letterSpacing: "0.02em",
                  marginTop: 8,
                  backgroundImage: `linear-gradient(120deg, ${PALETTE.cyan}, ${PALETTE.latent})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                KPT Agents
              </h3>
            </div>
            <div className="md:col-span-7">
              <p style={{ fontSize: 16, lineHeight: 1.7, color: PALETTE.text, fontWeight: 300 }}>
                {FLAGSHIP.desc}
              </p>
            </div>
            <div className="md:col-span-2">
              <div
                className="font-mono uppercase text-right"
                style={{ fontSize: 10, letterSpacing: "0.24em", color: PALETTE.grey, lineHeight: 1.8 }}
              >
                <div style={{ color: PALETTE.amber }}>● LIVE</div>
                <div>24 / 7</div>
                <div>0 MISSED</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
