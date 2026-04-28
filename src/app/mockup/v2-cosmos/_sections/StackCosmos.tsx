"use client";

import { motion } from "framer-motion";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Zap, Code2, Palette, Shield, Globe2, Cpu } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const inter = Inter({ subsets: ["latin"], weight: ["200", "400", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

const EASE = [0.16, 1, 0.3, 1] as const;

type Tool = { id: string; name: string; desc: string; spec: string; Icon: LucideIcon };

const TOOLS: Tool[] = [
  { id: "SYS_01", name: "Next.js 16", desc: "Server-side rendering, edge functions, App Router. Pages load instantly.", spec: "App Router · RSC · Edge", Icon: Zap },
  { id: "SYS_02", name: "React 19", desc: "Component architecture built for scale. Fast, maintainable UIs.", spec: "Hooks · Suspense · Server Components", Icon: Code2 },
  { id: "SYS_03", name: "Tailwind v4", desc: "Utility-first, zero dead CSS, pixel-perfect responsive.", spec: "JIT · Tree-shaken · < 10KB", Icon: Palette },
  { id: "SYS_04", name: "TypeScript", desc: "Full type safety end-to-end. Bugs caught at build time.", spec: "Strict · End-to-End Types", Icon: Shield },
  { id: "SYS_05", name: "Vercel Edge", desc: "Global edge deployment. Built-in SSL and DDoS protection.", spec: "194 PoPs · 99.99% Uptime", Icon: Globe2 },
  { id: "SYS_06", name: "Custom Code", desc: "No templates. No page builders. Every line written for your business.", spec: "Zero Templates · Hand-Crafted", Icon: Cpu },
];

const STAR_FIELD = [
  "radial-gradient(1px 1px at 13% 22%, rgba(248,248,255,0.55), transparent 60%)",
  "radial-gradient(1px 1px at 27% 71%, rgba(248,248,255,0.35), transparent 60%)",
  "radial-gradient(1.5px 1.5px at 41% 14%, rgba(123,91,255,0.45), transparent 60%)",
  "radial-gradient(1px 1px at 58% 49%, rgba(248,248,255,0.4), transparent 60%)",
  "radial-gradient(1px 1px at 67% 83%, rgba(255,107,193,0.35), transparent 60%)",
  "radial-gradient(1.5px 1.5px at 79% 31%, rgba(248,248,255,0.5), transparent 60%)",
  "radial-gradient(1px 1px at 89% 67%, rgba(248,248,255,0.3), transparent 60%)",
  "radial-gradient(1px 1px at 7% 88%, rgba(123,91,255,0.4), transparent 60%)",
  "radial-gradient(1px 1px at 47% 92%, rgba(248,248,255,0.45), transparent 60%)",
  "radial-gradient(1.2px 1.2px at 95% 12%, rgba(248,248,255,0.4), transparent 60%)",
].join(",");

const CORNERS = [
  "left-0 top-0 border-l border-t",
  "right-0 top-0 border-r border-t",
  "bottom-0 left-0 border-b border-l",
  "bottom-0 right-0 border-b border-r",
];

export default function StackCosmos() {
  return (
    <section
      className={`${inter.className} relative overflow-hidden`}
      style={{
        background:
          "radial-gradient(ellipse at 15% 0%, rgba(123,91,255,0.08), transparent 55%), radial-gradient(ellipse at 85% 100%, rgba(255,107,193,0.06), transparent 55%), #02030A",
        color: "#F8F8FF",
        paddingBlock: "clamp(6rem, 12vw, 10rem)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ backgroundImage: STAR_FIELD, backgroundSize: "100% 100%" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(155,163,199,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.6, ease: EASE }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4">
            <span className={`${mono.className} text-[11px] tracking-[0.32em] uppercase`} style={{ color: "#7B5BFF" }}>
              § 02 / STACK
            </span>
            <span
              className="h-px flex-1"
              style={{ background: "linear-gradient(90deg, rgba(123,91,255,0.6), rgba(155,163,199,0.15) 60%, transparent)" }}
            />
            <span className={`${mono.className} text-[10px] tracking-[0.28em] uppercase`} style={{ color: "#9BA3C7" }}>
              06 SYSTEMS / ONLINE
            </span>
          </div>

          <h2
            className="mt-8 font-extralight leading-[0.95]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.25rem)", letterSpacing: "-0.02em" }}
          >
            Instruments of the <span style={{ color: "#7B5BFF", fontWeight: 400 }}>craft</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed" style={{ color: "#9BA3C7" }}>
            Six precision systems, calibrated for orbit. Each chosen for its signal-to-noise ratio — nothing
            decorative, nothing left behind.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-px md:grid-cols-3" style={{ background: "rgba(155,163,199,0.08)" }}>
          {TOOLS.map((tool, i) => (
            <Card key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ tool, index }: { tool: Tool; index: number }) {
  const { Icon } = tool;
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.8, delay: index * 0.08, ease: EASE }}
      className="group relative isolate overflow-hidden p-8 transition-colors duration-700 md:p-10"
      style={{ background: "#02030A" }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(123,91,255,0.18), transparent 60%)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1px rgba(123,91,255,0.55), 0 0 40px -10px rgba(123,91,255,0.45)" }}
      />
      {CORNERS.map((c) => (
        <span
          key={c}
          aria-hidden
          className={`pointer-events-none absolute h-3 w-3 ${c}`}
          style={{ borderColor: "rgba(248,248,255,0.35)" }}
        />
      ))}

      <div className="relative flex items-start justify-between">
        <span className={`${mono.className} text-[10px] tracking-[0.3em] uppercase`} style={{ color: "#9BA3C7" }}>
          {tool.id}
        </span>
        <span
          className={`${mono.className} flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase`}
          style={{ color: "#7B5BFF" }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "#7B5BFF", boxShadow: "0 0 8px #7B5BFF" }}
          />
          ACTIVE
        </span>
      </div>

      <div
        className="relative mt-10 inline-flex h-11 w-11 items-center justify-center"
        style={{
          background: "rgba(123,91,255,0.08)",
          boxShadow: "inset 0 0 0 1px rgba(123,91,255,0.45), 0 0 24px -8px rgba(123,91,255,0.6)",
        }}
      >
        <Icon size={18} strokeWidth={1.5} color="#F8F8FF" />
      </div>

      <h3
        className="relative mt-8 text-2xl font-light leading-tight transition-transform duration-700 group-hover:-translate-y-0.5"
        style={{ letterSpacing: "-0.01em" }}
      >
        {tool.name}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed" style={{ color: "#9BA3C7" }}>
        {tool.desc}
      </p>

      <div
        className="relative mt-10 flex items-center gap-3 pt-5"
        style={{ borderTop: "1px solid rgba(155,163,199,0.15)" }}
      >
        <span className={`${mono.className} text-[10px] tracking-[0.24em] uppercase`} style={{ color: "#9BA3C7" }}>
          SPEC
        </span>
        <span className={`${mono.className} text-[11px] tracking-[0.08em]`} style={{ color: "#F8F8FF" }}>
          {tool.spec}
        </span>
      </div>
    </motion.article>
  );
}
