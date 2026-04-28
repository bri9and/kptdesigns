"use client";

import { useState } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const OFF_WHITE = "#FCFCFA";
const INK = "#0A0A0A";
const RED = "#FF1E1E";
const GREY = "#9A9A9A";

// next-level zoom anchor — the "Start your project" CTA pill at the bottom,
// where the FinaleLevel emerges.
export const ANCHOR_POINT = { x: 0.5, y: 0.92 };

const FAQS: { q: string; a: string }[] = [
  {
    q: "How long does a website take to build?",
    a: "Most projects take 1-4 weeks depending on complexity. A simple 3-5 page site can be done in a week. Larger projects with ecommerce or custom features take 2-4 weeks.",
  },
  {
    q: "Do I own the code when it's done?",
    a: "Yes, 100%. When your site is finished, we deliver the complete source code. It's yours — no lock-in, no proprietary platforms, no monthly fees unless you want hosting and support.",
  },
  {
    q: "What if I already have a website?",
    a: "We handle the full migration. We'll redesign and rebuild your site, move your content, and set up redirects so you don't lose any search engine rankings.",
  },
  {
    q: "Do you work with businesses outside your area?",
    a: "We work with businesses nationwide. Everything is done remotely — from the initial call to final delivery. Location is never a barrier.",
  },
  {
    q: "What technologies do you use?",
    a: "Modern frameworks like Next.js, React, and Tailwind CSS. Your site will be fast, secure, and built with the same tools used by top tech companies.",
  },
  {
    q: "Can you help with SEO?",
    a: "Every site we build includes foundational SEO — proper meta tags, fast load times, mobile responsiveness, and clean code structure. Ongoing SEO optimization is part of our Growth Plan.",
  },
];

/**
 * V7 — Recursive Zoom · Level 07 (FAQ). Six click-expand accordions.
 */
export default function FaqLevel() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className={inter.className}
      style={{
        position: "relative", width: "100%", height: "100%", minHeight: "100vh",
        background: OFF_WHITE, color: INK,
        padding: "clamp(40px, 5vw, 80px) clamp(20px, 4vw, 64px)",
        overflow: "hidden", display: "flex", flexDirection: "column",
      }}
    >
      <header
        className={mono.className}
        style={{ display: "flex", justifyContent: "space-between", fontSize: 11, letterSpacing: "0.22em", color: GREY, textTransform: "uppercase" }}
      >
        <span><span style={{ color: RED }}>●</span>&nbsp;LVL 07 — COMMON QUESTIONS</span>
        <span>kpt/faq.expand</span>
        <span>SCALE ×262K</span>
      </header>

      <div style={{ marginTop: 28, marginBottom: 28, display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", alignItems: "end", gap: 24 }}>
        <h2 style={{ margin: 0, fontSize: "clamp(36px, 5.2vw, 76px)", lineHeight: 0.92, letterSpacing: "-0.045em", fontWeight: 600 }}>
          <span
            className={mono.className}
            style={{ display: "block", fontSize: "clamp(11px, 0.9vw, 13px)", fontWeight: 500, letterSpacing: "0.32em", color: RED, marginBottom: 14, textTransform: "uppercase" }}
          >
            06 / FAQ
          </span>
          Common<br />
          <span style={{ borderBottom: `4px solid ${RED}`, paddingBottom: 4 }}>questions</span>
          <span style={{ color: GREY }}>.</span>
        </h2>
        <p
          className={mono.className}
          style={{ fontSize: 11.5, letterSpacing: "0.05em", color: GREY, margin: 0, maxWidth: "40ch", lineHeight: 1.6 }}
        >
          Click to expand. Six items, all answered before you have to ask.
        </p>
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "clamp(8px, 1vw, 16px)", alignContent: "start" }}>
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <button
              key={f.q}
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                textAlign: "left", position: "relative",
                background: isOpen ? INK : OFF_WHITE,
                color: isOpen ? OFF_WHITE : INK,
                border: `1px solid ${isOpen ? INK : INK + "22"}`,
                padding: "clamp(14px, 1.4vw, 20px)",
                cursor: "pointer", font: "inherit",
                transition: "background 240ms cubic-bezier(0.16,1,0.3,1), color 240ms cubic-bezier(0.16,1,0.3,1)",
                display: "flex", flexDirection: "column", gap: 10, minHeight: 92,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                <span
                  className={mono.className}
                  style={{ fontSize: 10, letterSpacing: "0.32em", color: isOpen ? RED : GREY, textTransform: "uppercase" }}
                >
                  Q.{String(i + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden
                  style={{
                    width: 18, height: 18,
                    border: `1px solid ${isOpen ? RED : INK + "55"}`,
                    color: isOpen ? RED : INK,
                    display: "grid", placeItems: "center",
                    fontSize: 11, fontWeight: 700,
                    transform: isOpen ? "rotate(45deg)" : "none",
                    transition: "transform 240ms cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  +
                </span>
              </div>
              <div style={{ fontSize: "clamp(13px, 1.05vw, 16px)", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
                {f.q}
              </div>
              <div
                style={{
                  fontSize: 12.5, lineHeight: 1.55,
                  opacity: isOpen ? 1 : 0,
                  maxHeight: isOpen ? 220 : 0, overflow: "hidden",
                  transition: "max-height 320ms cubic-bezier(0.16,1,0.3,1), opacity 240ms ease",
                  color: isOpen ? OFF_WHITE : INK,
                }}
              >
                {f.a}
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
        <div
          data-anchor="zoom-target"
          className={mono.className}
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "12px 18px", border: `1px solid ${INK}`,
            background: OFF_WHITE, fontSize: 11, letterSpacing: "0.32em",
            textTransform: "uppercase", color: INK, cursor: "zoom-in",
          }}
        >
          <span aria-hidden style={{ width: 8, height: 8, borderRadius: "50%", background: RED, boxShadow: `0 0 10px ${RED}` }} />
          next ×8 — start here
        </div>
      </div>

      <div className={mono.className} style={{ marginTop: 16, display: "flex", justifyContent: "space-between", fontSize: 10, letterSpacing: "0.22em", color: GREY, textTransform: "uppercase" }}>
        <span>scale 1 : 8</span>
        <span style={{ color: INK }}>↳ anchor → finale level</span>
        <span>frame 07 / 08</span>
      </div>
    </section>
  );
}
