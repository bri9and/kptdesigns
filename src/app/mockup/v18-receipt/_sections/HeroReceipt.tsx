"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { VT323 } from "next/font/google";

const receipt = VT323({ subsets: ["latin"], weight: ["400"], variable: "--font-receipt" });

const PAPER = "#FBFBFB";
const PAPER_EDGE = "#F0EDE6";
const INK = "#1A1A1A";
const INK_FADE = "#3D3D3D";
const INK_GHOST = "#9A9A9A";
const CARBON_RED = "#B53D3D";
const CARBON_BLUE = "#3D5A8A";

const ASCII_KPT = [
  "  ██  ██   █████   ████████  ",
  "  ██ ██    ██  ██     ██     ",
  "  ████     █████      ██     ",
  "  ██ ██    ██         ██     ",
  "  ██  ██   ██         ██     ",
];

const ITEMS: { label: string; price: string }[] = [
  { label: "1 x DOMAIN", price: "INCL." },
  { label: "1 x HOSTING (1 YR)", price: "INCL." },
  { label: "1 x WEB DESIGN", price: "INCL." },
  { label: "1 x AI AGENT (KPT)", price: "INCL." },
];

const TORN_TOP =
  "polygon(0% 14px,2.5% 4px,5% 12px,7.5% 2px,10% 11px,12.5% 3px,15% 12px,17.5% 4px,20% 11px,22.5% 2px,25% 12px,27.5% 3px,30% 11px,32.5% 5px,35% 12px,37.5% 2px,40% 11px,42.5% 4px,45% 12px,47.5% 3px,50% 11px,52.5% 4px,55% 12px,57.5% 2px,60% 11px,62.5% 5px,65% 12px,67.5% 3px,70% 11px,72.5% 4px,75% 12px,77.5% 2px,80% 11px,82.5% 4px,85% 12px,87.5% 3px,90% 11px,92.5% 5px,95% 12px,97.5% 2px,100% 14px,100% 100%,0% 100%)";

function leader(label: string, price: string, width = 32) {
  const dots = Math.max(3, width - label.length - price.length);
  return `${label} ${".".repeat(dots)} ${price}`;
}

export default function HeroReceipt() {
  return (
    <section
      className={`${receipt.variable} relative w-full overflow-hidden`}
      style={{
        background:
          "radial-gradient(1200px 600px at 50% 0%, #ECE6D6 0%, #DCD3BD 60%, #C9BD9F 100%)",
        paddingTop: "calc(var(--nav-height, 80px) + 28px)",
        paddingBottom: "72px",
      }}
    >
      {/* warehouse-floor noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.25,
          mixBlendMode: "multiply",
          backgroundImage: "radial-gradient(rgba(0,0,0,0.18) 0.6px, transparent 0.6px)",
          backgroundSize: "3px 3px",
        }}
      />

      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: [0, 0.4, -0.3, 0], opacity: 1 }}
        transition={{
          opacity: { duration: 0.6 },
          y: { duration: 2.4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
        }}
        className="relative mx-auto"
        style={{
          width: "min(520px, 100%)",
          background: PAPER,
          color: INK,
          fontFamily: "var(--font-receipt), ui-monospace, monospace",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.6) inset, 0 18px 32px -8px rgba(0,0,0,0.32), 0 40px 60px -20px rgba(0,0,0,0.28)",
          clipPath: TORN_TOP,
        }}
      >
        {/* ink-fade vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(120% 90% at 50% 50%, transparent 55%, ${PAPER_EDGE} 100%)`,
            mixBlendMode: "multiply",
          }}
        />
        {/* scanlines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: 0.55,
            mixBlendMode: "multiply",
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(26,26,26,0.06) 0px, rgba(26,26,26,0.06) 1px, transparent 1px, transparent 3px)",
          }}
        />
        {/* print-head streaks */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: 0.18,
            mixBlendMode: "multiply",
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0px, transparent 17px, rgba(26,26,26,0.4) 17px, rgba(26,26,26,0.4) 18px)",
          }}
        />

        <div className="relative px-6 pt-7 pb-8 sm:px-8" style={{ fontSize: 18 }}>
          <pre
            aria-label="KPT pixel logo"
            className="mx-auto mb-3 select-none text-center leading-[0.95]"
            style={{
              fontSize: 11,
              color: INK,
              letterSpacing: "0.5px",
              filter: "blur(0.18px)",
              textShadow: "0 0 0.5px rgba(26,26,26,0.55)",
            }}
          >
            {ASCII_KPT.join("\n")}
          </pre>

          <div
            className="my-2 text-center"
            style={{ borderTop: `2px double ${INK}`, borderBottom: `2px double ${INK}`, padding: "6px 0" }}
          >
            <div className="leading-none tracking-[0.18em]" style={{ fontSize: 28, color: INK }}>
              *** KPT DESIGNS ***
            </div>
            <div className="mt-1 leading-none tracking-[0.32em]" style={{ fontSize: 14, color: INK_FADE }}>
              FULL-STACK · OWNED OUTRIGHT
            </div>
          </div>

          <div
            className="mt-2 text-center leading-tight"
            style={{ fontSize: 15, color: INK_FADE, letterSpacing: "0.04em" }}
          >
            RCPT #047 · TERMINAL: KPT-01
            <br />
            2026-04-28 14:32:01 · CASHIER: SK
            <br />
            CUSTOMER: A NEW SITE OWNER
          </div>

          <DashedRule />

          <h1
            className="text-center leading-[0.92]"
            style={{
              fontSize: "clamp(44px, 9vw, 64px)",
              letterSpacing: "0.02em",
              color: INK,
              textShadow: "0 0 0.6px rgba(26,26,26,0.55)",
            }}
          >
            WELCOME TO
            <br />
            KPT.WEB
          </h1>
          <p
            className="mt-2 text-center"
            style={{ fontSize: 17, color: INK_FADE, letterSpacing: "0.02em" }}
          >
            One process. One bill. One team.
            <br />
            Owned outright. Est. 2004.
          </p>

          <DashedRule />

          <ul className="mt-1 space-y-[2px]" style={{ fontSize: 17, lineHeight: 1.25, color: INK }}>
            {ITEMS.map((it) => (
              <li key={it.label} className="whitespace-pre">
                {leader(it.label, it.price)}
              </li>
            ))}
          </ul>

          <div className="my-2" style={{ borderTop: `1px solid ${INK}`, opacity: 0.85 }} />

          <ul className="space-y-[2px]" style={{ fontSize: 17, lineHeight: 1.25, color: INK }}>
            <li className="whitespace-pre">{leader("SUBTOTAL", "ALL-IN")}</li>
            <li className="whitespace-pre" style={{ color: INK_FADE }}>
              {leader("TAX", "0.00")}
            </li>
            <li
              className="whitespace-pre"
              style={{
                fontSize: 22,
                marginTop: 4,
                color: INK,
                background: "rgba(26,26,26,0.06)",
                padding: "2px 4px",
              }}
            >
              {leader("TOTAL", "ONE PROCESS", 28)}
            </li>
          </ul>

          <div
            className="mt-3 inline-block rotate-[-4deg] border-2 px-2 py-[2px] text-center"
            style={{
              borderColor: CARBON_RED,
              color: CARBON_RED,
              fontSize: 14,
              letterSpacing: "0.15em",
              opacity: 0.85,
              boxShadow: "0 0 0 1px rgba(181,61,61,0.35) inset",
            }}
          >
            ✓ PAID IN FULL · ONCE
          </div>

          <DashedRule />

          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Link
              href="/start"
              className="block text-center transition-transform hover:-translate-y-[1px]"
              style={{
                background: INK,
                color: PAPER,
                padding: "10px 12px",
                fontSize: 18,
                letterSpacing: "0.18em",
                border: `1px solid ${INK}`,
              }}
            >
              ▸ TEAR HERE — START
            </Link>
            <Link
              href="/pricing"
              className="block text-center transition-transform hover:-translate-y-[1px]"
              style={{
                background: PAPER,
                color: INK,
                padding: "10px 12px",
                fontSize: 18,
                letterSpacing: "0.18em",
                border: `1px dashed ${INK}`,
              }}
            >
              ◂ SEE RATE CARD
            </Link>
          </div>

          <DashedRule />

          <div className="mt-1 text-center" style={{ fontSize: 18, color: INK, letterSpacing: "0.04em" }}>
            ★ THANK YOU FOR CHOOSING KPT ★
          </div>
          <div
            className="text-center"
            style={{ fontSize: 14, color: INK_FADE, letterSpacing: "0.18em" }}
          >
            PLEASE COME AGAIN
          </div>

          <div className="mt-3 flex flex-col items-center">
            <Barcode />
            <div className="mt-1" style={{ fontSize: 14, color: INK_FADE, letterSpacing: "0.32em" }}>
              0 04 2004 KPT 047 8
            </div>
          </div>

          <div
            className="mt-3 text-center"
            style={{ fontSize: 12, color: INK_GHOST, letterSpacing: "0.08em" }}
          >
            REGISTRAR · HOST · DESIGN · BUILD · KPT AGENTS
            <br />
            REFUND POLICY: WE FIX IT. KEEP THE RECEIPT.
          </div>

          <div
            className="mt-2 text-center"
            style={{ fontSize: 13, color: CARBON_BLUE, letterSpacing: "0.22em", opacity: 0.85 }}
          >
            kptdesigns.com / start
          </div>
        </div>

        <div
          aria-hidden
          className="relative h-3 w-full"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 100%)" }}
        />
      </motion.div>

      <div
        className="mx-auto mt-4 text-center"
        style={{
          fontFamily: "var(--font-receipt), ui-monospace, monospace",
          color: "#3a3a3a",
          fontSize: 16,
          letterSpacing: "0.32em",
          opacity: 0.7,
        }}
      >
        ░ ░ SCROLL — PAPER STILL FEEDING ░ ░
      </div>
    </section>
  );
}

function DashedRule() {
  return (
    <div
      aria-hidden
      className="my-3 w-full"
      style={{ borderTop: `1px dashed ${INK}`, opacity: 0.85 }}
    />
  );
}

function Barcode() {
  const bars = [2, 1, 3, 1, 2, 2, 1, 3, 2, 1, 1, 3, 2, 1, 3, 1, 2, 1, 3, 2, 2, 1, 1, 3, 2, 1, 3, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 1, 2, 3, 2, 1, 3, 1, 2];
  let x = 0;
  return (
    <svg viewBox="0 0 260 60" width="260" height="60" role="img" aria-label="barcode" style={{ display: "block" }}>
      {bars.map((w, i) => {
        const isBar = i % 2 === 0;
        const rect = isBar ? <rect key={i} x={x} y={2} width={w} height={56} fill={INK} opacity={0.92} /> : null;
        x += w;
        return rect;
      })}
    </svg>
  );
}
