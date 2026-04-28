"use client";

import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { Zap, Shield, Code2, Palette, Globe2, Cpu, Phone, type LucideIcon } from "lucide-react";

const fraunces = Fraunces({ subsets: ["latin"], axes: ["opsz", "SOFT"], display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const PAPER = "#F4F1EB";
const INK = "#1A1A22";
const ORANGE = "#FF5E1A";
const SAGE = "#7B8E6F";
const VOID = "#0B0B0F";

type Feature = { icon: LucideIcon; number: string; name: string; desc: string; spec: string; rule: "sage" | "orange" };

// 6 features from page.tsx (Next.js 16, React 19, Tailwind, TS, Vercel Edge, Custom Code) + 7th KPT Agents.
const FEATURES: Feature[] = [
  { icon: Zap, number: "SYS_01", name: "Next.js 16", desc: "Server-side rendering, static generation, and edge functions. Pages load instantly with built-in SEO optimization.", spec: "App Router · RSC · Edge", rule: "orange" },
  { icon: Code2, number: "SYS_02", name: "React 19", desc: "Component architecture built for scale. Interactive UIs that are fast, maintainable, and easy to update.", spec: "Hooks · Suspense · Server Components", rule: "sage" },
  { icon: Palette, number: "SYS_03", name: "Tailwind CSS", desc: "Utility-first styling with zero dead CSS. Pixel-perfect responsive designs on every device.", spec: "JIT · Tree-shaken · < 10KB", rule: "sage" },
  { icon: Shield, number: "SYS_04", name: "TypeScript", desc: "Full type safety from database to DOM. Bugs caught at build time, not by your customers.", spec: "Strict · End-to-End Types", rule: "orange" },
  { icon: Globe2, number: "SYS_05", name: "Vercel Edge", desc: "Global edge deployment so your site loads fast no matter where visitors are. Built-in SSL and DDoS protection.", spec: "194 PoPs · 99.99% Uptime", rule: "orange" },
  { icon: Cpu, number: "SYS_06", name: "Custom Code", desc: "No templates. No page builders. Every line written for your business. You own the source forever.", spec: "Zero Templates · Hand-Crafted", rule: "sage" },
  { icon: Phone, number: "SYS_07", name: "KPT Agents", desc: "AI inbound phone agents from our sister studio. Answer, qualify, and book — 24/7 with your voice.", spec: "Inbound Voice · Booked + Briefed", rule: "orange" },
];

const STRIATIONS: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage: `repeating-linear-gradient(180deg, transparent 0 119px, rgba(26,26,34,0.05) 119px 120px)`,
  pointerEvents: "none",
};

const EDGE_FADE: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: `radial-gradient(ellipse at center, rgba(11,11,15,0) 38%, rgba(11,11,15,0.18) 70%, ${VOID} 100%)`,
  pointerEvents: "none",
};

export default function StackPlane() {
  return (
    <section
      className={inter.className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        background: PAPER,
        color: INK,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        padding: "clamp(48px, 6vh, 80px) clamp(24px, 5vw, 64px)",
      }}
      aria-labelledby="strata-stack-title"
    >
      <div aria-hidden style={STRIATIONS} />
      <div aria-hidden style={EDGE_FADE} />

      <div style={{ position: "relative", width: "100%", maxWidth: 1240, margin: "0 auto", zIndex: 2 }}>
        <header style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: "clamp(20px, 3vh, 32px)" }}>
          <span className={mono.className} style={{ fontSize: 11, letterSpacing: "0.32em", textTransform: "uppercase", color: ORANGE, fontWeight: 600 }}>
            Stratum 03 · Stack
          </span>
          <span aria-hidden style={{ flex: 1, height: 1, background: ORANGE, opacity: 0.6 }} />
          <span className={mono.className} style={{ fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: INK, opacity: 0.55 }}>
            07 SYSTEMS
          </span>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "clamp(20px, 3vw, 40px)", alignItems: "end", marginBottom: "clamp(28px, 4vh, 44px)" }}>
          <h2
            id="strata-stack-title"
            className={fraunces.className}
            style={{
              margin: 0,
              fontSize: "clamp(2.1rem, 4.4vw, 3.6rem)",
              fontWeight: 300,
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
              fontVariationSettings: '"opsz" 144, "SOFT" 50',
              color: INK,
            }}
          >
            Four disciplines, <em style={{ fontStyle: "italic", color: ORANGE, fontWeight: 300 }}>one</em> roof.
            <br />
            <span style={{ color: SAGE }}>One process.</span> One bill.
          </h2>
          <p style={{ fontSize: "clamp(12px, 1vw, 14px)", lineHeight: 1.65, color: INK, opacity: 0.7, maxWidth: 320, fontWeight: 300, margin: 0 }}>
            Domain, server, design, build — and now AI inbound phone agents via sister studio KPT Agents. Drafted as a single signature.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1px", background: "rgba(26,26,34,0.12)", border: "1px solid rgba(26,26,34,0.12)" }}>
          {FEATURES.map((f, i) => {
            const ruleColor = f.rule === "orange" ? ORANGE : SAGE;
            const Icon = f.icon;
            const span2 = i === FEATURES.length - 1 && FEATURES.length % 2 === 1;
            return (
              <article
                key={f.number}
                style={{
                  position: "relative",
                  padding: "clamp(18px, 2.4vh, 28px) clamp(20px, 2.4vw, 32px)",
                  background: PAPER,
                  gridColumn: span2 ? "span 2" : "auto",
                  display: "flex",
                  gap: 18,
                  alignItems: "flex-start",
                }}
              >
                <span aria-hidden style={{ position: "absolute", left: 0, top: 0, height: 2, width: span2 ? "30%" : "44%", background: ruleColor }} />
                <div style={{ flexShrink: 0, width: 36, height: 36, border: `1px solid ${ruleColor}`, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", color: ruleColor }}>
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                    <h3 className={fraunces.className} style={{ margin: 0, fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)", fontWeight: 500, letterSpacing: "-0.015em", color: INK }}>
                      {f.name}
                    </h3>
                    <span className={mono.className} style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: ruleColor, fontWeight: 500 }}>
                      {f.number}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: "clamp(12px, 0.95vw, 13.5px)", lineHeight: 1.55, color: INK, opacity: 0.75, fontWeight: 300, maxWidth: span2 ? "62ch" : "38ch" }}>
                    {f.desc}
                  </p>
                  <div className={mono.className} style={{ marginTop: 10, paddingTop: 8, borderTop: `1px solid rgba(26,26,34,0.1)`, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: INK, opacity: 0.55 }}>
                    {f.spec}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
