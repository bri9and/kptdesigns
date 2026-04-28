"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], axes: ["opsz", "SOFT"], style: ["normal", "italic"], display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const PAPER = "#F4F1EB";
const INK = "#1A1A22";
const ORANGE = "#FF5E1A";
const SAGE = "#7B8E6F";
const VOID = "#0B0B0F";

const FAQS = [
  { q: "How long does a website take to build?", a: "Most projects take 1-4 weeks depending on complexity. A simple 3-5 page site can be done in a week. Larger projects with ecommerce or custom features take 2-4 weeks." },
  { q: "Do I own the code when it is done?", a: "Yes, 100%. When your site is finished, we deliver the complete source code. It is yours — no lock-in, no proprietary platforms, no monthly fees unless you want hosting and support." },
  { q: "What if I already have a website?", a: "We handle the full migration. We will redesign and rebuild your site, move your content, and set up redirects so you do not lose any search engine rankings." },
  { q: "Do you work with businesses outside your area?", a: "We work with businesses nationwide. Everything is done remotely — from the initial call to final delivery. Location is never a barrier." },
  { q: "What technologies do you use?", a: "We use modern frameworks like Next.js, React, and Tailwind CSS. Your site will be fast, secure, and built with the same tools used by top tech companies." },
  { q: "Can you help with SEO?", a: "Every site we build includes foundational SEO — proper meta tags, fast load times, mobile responsiveness, and clean code structure. We also offer ongoing SEO optimization as part of our Growth Plan." },
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

function FaqItem({ q, a, index, open, onToggle }: { q: string; a: string; index: number; open: boolean; onToggle: () => void }) {
  const idxLabel = String(index + 1).padStart(2, "0");
  const id = `strata-faq-${index}`;

  return (
    <div style={{ borderBottom: `1px solid ${SAGE}55` }}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        id={`${id}-trigger`}
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 18,
          padding: "clamp(14px, 1.8vh, 22px) 4px",
          background: "transparent",
          border: "none",
          textAlign: "left",
          cursor: "pointer",
          color: INK,
          fontFamily: "inherit",
        }}
      >
        <span style={{ display: "flex", alignItems: "baseline", gap: 16, flex: 1, minWidth: 0 }}>
          <span className={mono.className} aria-hidden style={{ fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: open ? ORANGE : SAGE, flexShrink: 0, fontWeight: 600, transition: "color 200ms ease" }}>
            {idxLabel}
          </span>
          <span className={fraunces.className} style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)", fontWeight: 400, lineHeight: 1.3, color: INK, letterSpacing: "-0.01em", flex: 1 }}>
            {q}
          </span>
        </span>
        <span aria-hidden className={mono.className} style={{ flexShrink: 0, width: 28, height: 28, border: `1px solid ${open ? ORANGE : INK}`, borderRadius: 999, display: "inline-flex", alignItems: "center", justifyContent: "center", color: open ? ORANGE : INK, opacity: open ? 1 : 0.6, fontSize: 14, lineHeight: 1, transition: "all 220ms ease" }}>
          {open ? "–" : "+"}
        </span>
      </button>
      <motion.div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: "hidden" }}
      >
        <p style={{ margin: 0, padding: "0 0 clamp(16px, 2vh, 22px) 42px", fontSize: "clamp(13px, 1vw, 14.5px)", lineHeight: 1.65, color: INK, opacity: 0.78, fontWeight: 300, maxWidth: "62ch" }}>
          {a}
        </p>
      </motion.div>
    </div>
  );
}

export default function FaqPlane() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

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
      aria-labelledby="strata-faq-title"
    >
      <div aria-hidden style={STRIATIONS} />
      <div aria-hidden style={EDGE_FADE} />

      <div style={{ position: "relative", width: "100%", maxWidth: 1080, margin: "0 auto", zIndex: 2 }}>
        <header style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: "clamp(24px, 3.5vh, 40px)" }}>
          <span className={mono.className} style={{ fontSize: 11, letterSpacing: "0.32em", textTransform: "uppercase", color: ORANGE, fontWeight: 600 }}>
            Stratum 07 · FAQ
          </span>
          <span aria-hidden style={{ flex: 1, height: 1, background: SAGE, opacity: 0.7 }} />
          <span className={mono.className} style={{ fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: INK, opacity: 0.55 }}>
            06 ITEMS
          </span>
        </header>

        <h2
          id="strata-faq-title"
          className={fraunces.className}
          style={{
            margin: 0,
            fontSize: "clamp(2.1rem, 4.4vw, 3.4rem)",
            fontWeight: 300,
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
            fontVariationSettings: '"opsz" 144, "SOFT" 50',
            color: INK,
            marginBottom: "clamp(24px, 3vh, 36px)",
          }}
        >
          Common <em style={{ fontStyle: "italic", color: ORANGE, fontWeight: 300 }}>questions.</em>
        </h2>

        <div style={{ borderTop: `1px solid ${SAGE}55` }}>
          {FAQS.map((faq, i) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
