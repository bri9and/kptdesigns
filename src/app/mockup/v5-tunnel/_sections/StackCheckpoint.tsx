"use client";

import { Inter, JetBrains_Mono } from "next/font/google";
import {
  Zap,
  Code2,
  Palette,
  Shield,
  Globe2,
  Cpu,
  Bot,
  Globe,
  Server,
  Hammer,
} from "lucide-react";

const inter = Inter({ subsets: ["latin"], weight: ["200", "400", "500", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

const C = {
  void: "#000812",
  cyan: "#00E5FF",
  blue: "#0066FF",
  white: "#E8F1FF",
  amber: "#FFB000",
  magenta: "#FF00AA",
  grey: "#9BA3C7",
} as const;

type Feature = {
  icon: typeof Zap;
  number: string;
  name: string;
  desc: string;
  spec: string;
  hot?: boolean;
};

const FEATURES: Feature[] = [
  {
    icon: Zap, number: "SYS_01", name: "Next.js 16",
    desc: "Server components, edge functions, partial pre-rendering. Pages load instantly with built-in SEO.",
    spec: "App Router · RSC · Edge",
  },
  {
    icon: Code2, number: "SYS_02", name: "React 19",
    desc: "Component architecture built for scale. Interactive UIs that stay fast and easy to update.",
    spec: "Hooks · Suspense · Server Components",
  },
  {
    icon: Palette, number: "SYS_03", name: "Tailwind v4",
    desc: "Utility-first styling, zero dead CSS. Pixel-perfect, responsive, and tree-shaken on every build.",
    spec: "JIT · < 10KB",
  },
  {
    icon: Shield, number: "SYS_04", name: "TypeScript",
    desc: "Full type safety from database to DOM. Bugs caught at build time, not by your customers.",
    spec: "Strict · End-to-End",
  },
  {
    icon: Globe2, number: "SYS_05", name: "Vercel Edge",
    desc: "Global edge deployment. Loads fast no matter where your visitors are. SSL and DDoS protection included.",
    spec: "194 PoPs · 99.99% Uptime",
  },
  {
    icon: Cpu, number: "SYS_06", name: "Custom Code",
    desc: "No templates. No page builders. Every line written for your business — and the source ships with the site.",
    spec: "Zero Templates · Hand-Crafted",
  },
  {
    icon: Bot, number: "SYS_07", name: "KPT Agents",
    desc: "Inbound AI phone agents through KPT Agents. Pick up calls, qualify leads, and book meetings 24/7.",
    spec: "Voice AI · 24/7 Inbound",
    hot: true,
  },
];

const PILLARS = [
  { Icon: Globe, label: "REGISTRAR", note: "Your name, secured" },
  { Icon: Server, label: "HOST", note: "Edge-deployed, 99.99% uptime" },
  { Icon: Hammer, label: "BUILDER", note: "Hand-coded, owned outright" },
  { Icon: Bot, label: "AGENTS", note: "Inbound AI, 24/7" },
];

/**
 * StackCheckpoint — checkpoint 03 of 08
 *
 * 7-card HUD grid (6 stack tools + KPT Agents) plus the 4-in-1 pillar strip.
 * Pure HTML / Tailwind-free inline styles for full control over chrome.
 */
export default function StackCheckpoint() {
  return (
    <div
      className={inter.className}
      style={{
        position: "relative",
        width: "min(1180px, 94vw)",
        margin: "0 auto",
        padding: "clamp(20px, 3vw, 36px)",
        background: "rgba(0,8,18,0.62)",
        backdropFilter: "blur(14px) saturate(120%)",
        WebkitBackdropFilter: "blur(14px) saturate(120%)",
        border: `1px solid ${C.cyan}33`,
        boxShadow: `inset 0 0 0 1px rgba(0,229,255,0.06), 0 0 60px rgba(0,8,18,0.55)`,
        color: C.white,
      }}
    >
      {/* eyebrow */}
      <div
        className={mono.className}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 12,
          fontSize: 11,
          letterSpacing: "0.26em",
          color: C.cyan,
          textTransform: "uppercase",
          marginBottom: 18,
        }}
      >
        <span>{"//"} CHECKPOINT 03 · STACK_HUD</span>
        <span style={{ color: C.amber }}>● INBOUND VECTOR LOCKED</span>
      </div>

      {/* headline */}
      <h2
        style={{
          fontWeight: 200,
          fontSize: "clamp(32px, 4.6vw, 60px)",
          lineHeight: 1.04,
          letterSpacing: "-0.02em",
          margin: 0,
          color: C.white,
        }}
      >
        Four systems.{" "}
        <span style={{ color: C.cyan, fontWeight: 700 }}>One operator.</span>
      </h2>
      <p
        className={mono.className}
        style={{
          marginTop: 12,
          fontSize: 12,
          letterSpacing: "0.06em",
          color: `${C.white}aa`,
          maxWidth: 620,
          fontWeight: 400,
        }}
      >
        Registrar. Host. Designer/builder. Inbound AI. Wired together, owned
        outright, billed once.
      </p>

      {/* 4-in-1 pillar strip */}
      <div
        style={{
          marginTop: 22,
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 0,
          border: `1px solid ${C.cyan}44`,
          background: "rgba(0,8,18,0.55)",
          boxShadow: `inset 0 0 0 1px ${C.cyan}11`,
        }}
        className="kpt-pillars"
      >
        {PILLARS.map((p, i) => (
          <div
            key={p.label}
            style={{
              padding: "14px 16px",
              borderRight: i < PILLARS.length - 1 ? `1px dashed ${C.cyan}33` : "none",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 28,
                height: 28,
                display: "grid",
                placeItems: "center",
                border: `1px solid ${C.cyan}66`,
                background: `${C.cyan}10`,
                boxShadow: `0 0 14px ${C.cyan}33`,
              }}
            >
              <p.Icon size={14} color={C.cyan} strokeWidth={1.6} />
            </span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                className={mono.className}
                style={{
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  color: C.cyan,
                  fontWeight: 500,
                }}
              >
                {p.label}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: C.grey,
                  fontWeight: 300,
                  letterSpacing: 0,
                }}
              >
                {p.note}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* feature grid */}
      <div
        style={{
          marginTop: 26,
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 12,
        }}
        className="kpt-stack-grid"
      >
        {FEATURES.map((f) => (
          <FeatureCard key={f.number} f={f} />
        ))}
      </div>

      {/* footer chips */}
      <div
        className={mono.className}
        style={{
          marginTop: 22,
          display: "flex",
          flexWrap: "wrap",
          gap: "1.6ch",
          fontSize: 10,
          letterSpacing: "0.28em",
          color: `${C.white}80`,
          textTransform: "uppercase",
        }}
      >
        <span><span style={{ color: C.cyan }}>◆</span> ONE PROCESS</span>
        <span><span style={{ color: C.cyan }}>◆</span> ONE BILL</span>
        <span><span style={{ color: C.cyan }}>◆</span> ONE TEAM</span>
        <span style={{ marginLeft: "auto", color: C.magenta }}>EST. 2004</span>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .kpt-stack-grid { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
          .kpt-pillars { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
          .kpt-pillars > div:nth-child(2) { border-right: none !important; }
          .kpt-pillars > div:nth-child(1), .kpt-pillars > div:nth-child(2) {
            border-bottom: 1px dashed ${C.cyan}33 !important;
          }
        }
        @media (max-width: 640px) {
          .kpt-stack-grid { grid-template-columns: 1fr !important; }
          .kpt-pillars { grid-template-columns: 1fr !important; }
          .kpt-pillars > div { border-right: none !important; border-bottom: 1px dashed ${C.cyan}33 !important; }
          .kpt-pillars > div:last-child { border-bottom: none !important; }
        }
      `}</style>
    </div>
  );
}

function FeatureCard({ f }: { f: Feature }) {
  const accent = f.hot ? C.magenta : C.cyan;
  return (
    <article
      style={{
        position: "relative",
        padding: 18,
        background: f.hot ? "rgba(255,0,170,0.05)" : "rgba(0,8,18,0.55)",
        border: `1px solid ${accent}3a`,
        boxShadow: f.hot
          ? `inset 0 0 0 1px ${C.magenta}22, 0 0 24px ${C.magenta}22`
          : `inset 0 0 0 1px ${C.cyan}10`,
        overflow: "hidden",
      }}
    >
      {/* top accent line */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, ${accent} 0%, transparent 80%)`,
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span
          aria-hidden
          style={{
            width: 30,
            height: 30,
            display: "grid",
            placeItems: "center",
            border: `1px solid ${accent}66`,
            background: `${accent}10`,
            boxShadow: `0 0 14px ${accent}33, inset 0 0 8px ${accent}1a`,
          }}
        >
          <f.icon size={15} color={accent} strokeWidth={1.6} />
        </span>
        <span
          className={mono.className}
          style={{
            fontSize: 10,
            letterSpacing: "0.28em",
            color: f.hot ? C.amber : `${C.cyan}cc`,
            textTransform: "uppercase",
          }}
        >
          {f.number}
          {f.hot && <span style={{ marginLeft: 8, color: C.magenta }}>· NEW</span>}
        </span>
      </div>

      <h3
        style={{
          margin: 0,
          fontSize: 17,
          fontWeight: 600,
          letterSpacing: "0.01em",
          color: C.white,
        }}
      >
        {f.name}
      </h3>
      <p
        style={{
          marginTop: 8,
          marginBottom: 0,
          fontSize: 13,
          lineHeight: 1.6,
          color: C.grey,
          fontWeight: 300,
        }}
      >
        {f.desc}
      </p>

      <div
        className={mono.className}
        style={{
          marginTop: 14,
          paddingTop: 12,
          borderTop: `1px solid ${accent}22`,
          fontSize: 10,
          letterSpacing: "0.22em",
          color: f.hot ? C.amber : `${C.cyan}aa`,
          textTransform: "uppercase",
        }}
      >
        {f.spec}
      </div>
    </article>
  );
}
