"use client";

/**
 * FaqLiquid — V22 §07 QUERIES
 *
 * 6 click-expand FAQ items with chrome hairline separators.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChromeText, ChromePanel, ChromeHairline, MonoKicker,
  PALETTE, riseUp, stagger,
} from "../_engine/chrome";

const FAQS = [
  {
    q: "How long does a website take to forge?",
    a: "Most projects take 1-4 weeks depending on complexity. A 3-5 page site can be cast in a week. Larger projects with ecommerce or custom features take 2-4 weeks of forming and polish.",
  },
  {
    q: "Do I own the code when it's done?",
    a: "Yes — 100%. When your site is finished we deliver the complete source code. It's yours: no lock-in, no proprietary platforms, no monthly fees unless you opt into hosting and support.",
  },
  {
    q: "What if I already have a website?",
    a: "We handle the full migration. We'll redesign and rebuild your site, move your content, and set up redirects so you don't lose any search engine rankings.",
  },
  {
    q: "Do you work with businesses outside your area?",
    a: "We work nationwide. Everything is done remotely — from the initial call to final delivery. Pittsburgh and Phoenix are the foundry, but the metal ships anywhere.",
  },
  {
    q: "What technologies do you use?",
    a: "Modern frameworks — Next.js, React, TypeScript, Tailwind. Your site will be fast, secure, and built with the same alloys top tech companies use.",
  },
  {
    q: "Can you help with SEO?",
    a: "Every site we forge includes foundational SEO — proper meta tags, fast load times, mobile responsiveness, and clean code structure. We also offer ongoing optimization as part of our Growth Plan.",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: index < FAQS.length - 1 ? `1px solid ${PALETTE.hi}14` : "none",
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="v22-faq-btn"
        style={{
          all: "unset",
          cursor: "pointer",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 4px",
          color: PALETTE.mirror,
          fontFamily: "var(--v22-display), system-ui",
          fontWeight: 500,
          fontSize: "clamp(15px, 1.4vw, 18px)",
          letterSpacing: "-0.005em",
          transition: "color 280ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <span style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
          <span
            style={{
              fontFamily: "var(--v22-mono), monospace",
              fontSize: 10,
              letterSpacing: "0.28em",
              color: PALETTE.blue,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          {q}
        </span>
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            borderRadius: 999,
            border: `1px solid ${open ? PALETTE.blue : `${PALETTE.hi}33`}`,
            color: open ? PALETTE.void : PALETTE.hi,
            fontFamily: "var(--v22-mono), monospace",
            fontSize: 14,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 360ms cubic-bezier(0.16,1,0.3,1), background 360ms",
            background: open
              ? `radial-gradient(circle at 30% 30%, ${PALETTE.mirror}, ${PALETTE.mid})`
              : "transparent",
          }}
        >
          {open ? "×" : "+"}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: "hidden" }}
      >
        <p
          style={{
            margin: 0,
            padding: "4px 4px 24px 48px",
            fontFamily: "var(--v22-display), system-ui",
            fontWeight: 300,
            fontSize: "clamp(13px, 1.15vw, 15px)",
            lineHeight: 1.7,
            color: PALETTE.hi,
            maxWidth: 820,
          }}
        >
          {a}
        </p>
      </motion.div>
      <style>{`
        .v22-faq-btn:hover { color: ${PALETTE.cyan}; }
        .v22-faq-btn:focus-visible { outline: 2px solid ${PALETTE.blue}; outline-offset: 4px; }
      `}</style>
    </div>
  );
}

export default function FaqLiquid() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={stagger}
      style={{ position: "relative", width: "100%", maxWidth: 920, margin: "0 auto" }}
    >
      <motion.div variants={riseUp} style={{ marginBottom: 18 }}>
        <MonoKicker>§ 07 / KNOWN QUERIES</MonoKicker>
      </motion.div>

      <motion.h2 variants={riseUp} style={{ margin: 0, lineHeight: 0.95 }}>
        <ChromeText size="clamp(40px, 6vw, 88px)" weight={900} tracking="-0.04em" style={{ display: "inline" }}>
          Common
        </ChromeText>{" "}
        <ChromeText size="clamp(40px, 6vw, 88px)" weight={200} italic tracking="-0.02em" sweepDelay={0.5} style={{ display: "inline" }}>
          questions.
        </ChromeText>
      </motion.h2>

      <motion.div variants={riseUp} style={{ marginTop: 24, marginBottom: 28 }}>
        <ChromeHairline width={120} />
      </motion.div>

      <motion.div variants={riseUp}>
        <ChromePanel style={{ padding: "10px 24px" }}>
          {FAQS.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </ChromePanel>
      </motion.div>
    </motion.div>
  );
}
