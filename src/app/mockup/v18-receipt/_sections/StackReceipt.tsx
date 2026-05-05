"use client";

import { VT323 } from "next/font/google";

const vt = VT323({ subsets: ["latin"], weight: "400" });

type Item = {
  sku: string;
  name: string;
  desc: string;
  pricelessNote?: boolean;
};

const ITEMS: Item[] = [
  { sku: "001", name: "NEXT.JS 16", desc: "framework" },
  { sku: "002", name: "REACT 19", desc: "runtime" },
  { sku: "003", name: "TAILWIND 4", desc: "styling" },
  { sku: "004", name: "TYPESCRIPT", desc: "types" },
  { sku: "005", name: "VERCEL EDGE", desc: "194 PoPs" },
  { sku: "006", name: "KPT AGENTS", desc: "inbound AI" },
];

const PAPER = "#FBFBFB";
const INK = "#1A1A1A";
const FADE = "rgba(26,26,26,0.55)";
const RECEIPT_WIDTH = 520;

// Pseudo-deterministic jitter so the strip looks hand-fed but doesn't reflow on re-render.
function jitter(seed: number, max = 1.2) {
  const s = Math.sin(seed * 9173.17) * 43758.5453;
  return ((s - Math.floor(s)) - 0.5) * 2 * max;
}

function Line({
  children,
  seed,
  className = "",
  size = 22,
  weight = 400,
}: {
  children: React.ReactNode;
  seed: number;
  className?: string;
  size?: number;
  weight?: number;
}) {
  const jx = jitter(seed, 0.7);
  const jr = jitter(seed + 11, 0.35);
  const inkAlpha = 0.78 + (jitter(seed + 3, 0.18));
  return (
    <div
      className={className}
      style={{
        transform: `translateX(${jx}px) rotate(${jr}deg)`,
        color: `rgba(26,26,26,${Math.min(0.95, Math.max(0.55, inkAlpha))})`,
        fontSize: `${size}px`,
        lineHeight: 1.05,
        letterSpacing: "0.02em",
        fontWeight: weight,
        whiteSpace: "pre",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {children}
    </div>
  );
}

function dotted(label: string, value: string, total = 38) {
  const base = `${label} `;
  const tail = ` ${value}`;
  const dots = Math.max(3, total - base.length - tail.length);
  return `${base}${".".repeat(dots)}${tail}`;
}

export default function StackReceipt() {
  return (
    <section
      aria-label="Stack — SKU manifest"
      className={vt.className}
      style={{
        background: PAPER,
        color: INK,
        display: "flex",
        justifyContent: "center",
        padding: "0 16px 8px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: `${RECEIPT_WIDTH}px`,
          position: "relative",
          padding: "28px 26px 36px",
          // Faded ink at edges + faint paper grain
          background: `
            radial-gradient(120% 60% at 50% 0%, rgba(251,251,251,0) 60%, rgba(251,251,251,0.95) 100%),
            radial-gradient(120% 60% at 50% 100%, rgba(251,251,251,0) 60%, rgba(251,251,251,0.95) 100%),
            linear-gradient(90deg, rgba(251,251,251,0.95) 0%, rgba(251,251,251,0) 8%, rgba(251,251,251,0) 92%, rgba(251,251,251,0.95) 100%),
            ${PAPER}
          `,
          boxShadow:
            "0 1px 0 rgba(0,0,0,0.04), 0 -1px 0 rgba(0,0,0,0.04)",
          animation: "kpt-roller 6.2s ease-in-out infinite",
        }}
      >
        {/* Header */}
        <Line seed={1} size={26} weight={700}>
          {centered("*** SKU MANIFEST ***")}
        </Line>
        <div style={{ height: 6 }} />
        <Line seed={2} size={18} className="opacity-80">
          {centered("KPT DESIGNS / STACK")}
        </Line>
        <Line seed={3} size={18} className="opacity-80">
          {centered("REG #04 — EST. 2004")}
        </Line>

        <Divider seed={4} />

        {/* Column header */}
        <Line seed={5} size={20} weight={700}>
          {`SKU   ITEM            QTY`}
        </Line>
        <Divider seed={6} />

        {/* Items */}
        {ITEMS.map((item, i) => (
          <div key={item.sku} style={{ marginBottom: 6 }}>
            <Line seed={20 + i * 3} size={22} weight={700}>
              {formatItemLine(item)}
            </Line>
            <Line seed={21 + i * 3} size={18} className="pl-[3.6ch]">
              {`         ${item.desc}`}
            </Line>
          </div>
        ))}

        <Divider seed={50} />

        {/* Totals */}
        <Line seed={60} size={22} weight={700}>
          {dotted("TOTAL ITEMS", "6")}
        </Line>
        <Line seed={61} size={22} weight={700}>
          <span>
            {dotted("ESTIMATED VALUE", "")}
            <span
              style={{
                fontFamily: "var(--font-vt323, monospace)",
                letterSpacing: "0.12em",
                background: `repeating-linear-gradient(
                  90deg,
                  ${INK} 0 2px,
                  transparent 2px 3px
                )`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                textShadow:
                  "0.5px 0 0 rgba(26,26,26,0.85), -0.5px 0 0 rgba(26,26,26,0.4)",
              }}
            >
              PRICELESS
            </span>
          </span>
        </Line>

        <Divider seed={70} />

        <Line seed={80} size={18} className="opacity-70">
          {centered("ALL ITEMS INCL. — ONE BILL — ONE TEAM")}
        </Line>
        <Line seed={81} size={18} className="opacity-60">
          {centered("OWNED OUTRIGHT")}
        </Line>

        {/* Bottom edge fade is handled by gradient overlay above */}
      </div>

      <style>{`
        @keyframes kpt-roller {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25%      { transform: translateY(0.6px) rotate(0.05deg); }
          50%      { transform: translateY(-0.4px) rotate(-0.06deg); }
          75%      { transform: translateY(0.5px) rotate(0.04deg); }
        }
      `}</style>
    </section>
  );
}

function Divider({ seed }: { seed: number }) {
  return (
    <Line seed={seed} size={18} className="opacity-60">
      {"----------------------------------"}
    </Line>
  );
}

function centered(text: string, width = 34) {
  if (text.length >= width) return text;
  const pad = Math.floor((width - text.length) / 2);
  return `${" ".repeat(pad)}${text}`;
}

// "SKU 001  NEXT.JS 16     INCL."
function formatItemLine(item: Item) {
  const sku = `SKU ${item.sku}`;
  const name = item.name.padEnd(13, " ");
  return `${sku}  ${name}  INCL.`;
}
