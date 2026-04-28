"use client";

import { JetBrains_Mono } from "next/font/google";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const PALETTE = {
  bg: "#000000",
  green: "#33FF66",
  amber: "#FFB000",
  offwhite: "#E0E0E0",
  dim: "#444",
  hairline: "#2A2A2A",
};

type Tool = {
  name: string;
  fill: number; // 0-24 of 24 cells
  version: string;
  spec: string;
};

const TOOLS: Tool[] = [
  { name: "NEXT.JS 16",  fill: 20, version: "16.1.6",   spec: "pkg/web  · framework" },
  { name: "REACT 19",    fill: 20, version: "19.2.3",   spec: "pkg/web  · runtime"   },
  { name: "TAILWIND 4",  fill: 21, version: "4.0.0",    spec: "pkg/web  · styling"   },
  { name: "TYPESCRIPT",  fill: 22, version: "5.x",      spec: "pkg/lang · types"     },
  { name: "VERCEL EDGE", fill: 24, version: "194 PoP",  spec: "net/edge · deploy"    },
  { name: "CUSTOM CODE", fill: 24, version: "∞",   spec: "pkg/kpt  · always"    },
];

const BAR_CELLS = 24;
// Pad name column to a fixed width so bars align in monospace.
const NAME_W = 12;
const VER_W  = 8;

function pad(str: string, width: number) {
  if (str.length >= width) return str;
  return str + " ".repeat(width - str.length);
}

export default function StackTerminal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section
      ref={ref}
      className={jetbrains.className}
      style={{
        background: PALETTE.bg,
        color: PALETTE.offwhite,
        padding: "96px 20px",
        borderTop: `1px solid ${PALETTE.hairline}`,
        borderBottom: `1px solid ${PALETTE.hairline}`,
        fontSize: 13,
        lineHeight: 1.5,
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        {/* ASCII boxed header */}
        <pre
          aria-hidden
          style={{
            color: PALETTE.green,
            margin: 0,
            fontSize: 13,
            lineHeight: 1.2,
            whiteSpace: "pre",
            overflowX: "auto",
          }}
        >
{`┌──────────────────────────────┐
│  § 03 / STACK · system info  │
└──────────────────────────────┘`}
        </pre>

        {/* Meta row, neofetch-ish */}
        <div
          style={{
            marginTop: 24,
            color: PALETTE.dim,
            fontSize: 12,
            display: "flex",
            flexWrap: "wrap",
            gap: 18,
          }}
        >
          <span>host: <span style={{ color: PALETTE.offwhite }}>kpt-designs</span></span>
          <span>kernel: <span style={{ color: PALETTE.offwhite }}>v4.0.1-prod</span></span>
          <span>shell: <span style={{ color: PALETTE.offwhite }}>zsh 5.9</span></span>
          <span>cpu: <span style={{ color: PALETTE.offwhite }}>22yr/exp</span></span>
        </div>

        {/* Stack table */}
        <div
          role="table"
          aria-label="Tech stack utilization"
          style={{
            marginTop: 28,
            border: `1px dashed ${PALETTE.dim}`,
            padding: "18px 20px",
            overflowX: "auto",
          }}
        >
          {TOOLS.map((tool, i) => (
            <Row key={tool.name} tool={tool} index={i} animate={inView} />
          ))}
        </div>

        {/* htop summary */}
        <div
          style={{
            marginTop: 18,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 12,
            color: PALETTE.dim,
            paddingLeft: 4,
          }}
        >
          <span>
            load avg: <span style={{ color: PALETTE.green }}>0.04</span>,{" "}
            <span style={{ color: PALETTE.green }}>0.02</span>,{" "}
            <span style={{ color: PALETTE.green }}>0.01</span>
          </span>
          <span>
            uptime: <span style={{ color: PALETTE.amber }}>22 yrs · 4 mo</span>
          </span>
        </div>

        {/* Prose sub-block */}
        <p
          style={{
            marginTop: 40,
            maxWidth: 640,
            color: PALETTE.offwhite,
            fontSize: 13,
            lineHeight: 1.7,
          }}
        >
          <span style={{ color: PALETTE.green }}>{"//"} </span>
          tools chosen for longevity, not novelty. each one earns its slot by
          surviving real client work — not by trending on a feed. boring on the
          outside, dependable on the inside, easy to hand off to the next dev.
        </p>
      </div>
    </section>
  );
}

function Row({ tool, index, animate }: { tool: Tool; index: number; animate: boolean }) {
  const filled = "█".repeat(tool.fill);
  const empty = "░".repeat(BAR_CELLS - tool.fill);
  const pct = Math.round((tool.fill / BAR_CELLS) * 100);

  return (
    <div
      role="row"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        whiteSpace: "pre",
        fontSize: 13,
        lineHeight: 1.6,
        flexWrap: "nowrap",
      }}
    >
      <span style={{ color: PALETTE.offwhite, flexShrink: 0 }}>
        {pad(tool.name, NAME_W)}
      </span>

      <span
        aria-label={`${tool.name} ${pct}%`}
        style={{
          position: "relative",
          flexShrink: 0,
          letterSpacing: 0,
        }}
      >
        {/* Static bracket + dim track always visible (24 cells wide) */}
        <span style={{ color: PALETTE.dim }}>
          [{"░".repeat(BAR_CELLS)}]
        </span>
        {/* Animated phosphor-green fill, clipped left-to-right */}
        <motion.span
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={
            animate
              ? { clipPath: "inset(0 0% 0 0)" }
              : { clipPath: "inset(0 100% 0 0)" }
          }
          transition={{
            duration: 1.2,
            ease: "easeOut",
            delay: 0.15 + index * 0.12,
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            color: PALETTE.green,
            whiteSpace: "pre",
            pointerEvents: "none",
          }}
        >
          {/* leading bracket (transparent) + filled cells + trailing empty cells + bracket (transparent) */}
          <span style={{ color: "transparent" }}>[</span>
          {filled}
          <span style={{ color: "transparent" }}>{empty}]</span>
        </motion.span>
      </span>

      <span style={{ color: PALETTE.amber, flexShrink: 0 }}>
        {pad(tool.version, VER_W)}
      </span>
      <span
        style={{
          color: PALETTE.dim,
          fontSize: 12,
          flexShrink: 1,
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {tool.spec}
      </span>
    </div>
  );
}
