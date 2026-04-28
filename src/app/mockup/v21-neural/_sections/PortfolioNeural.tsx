"use client";

import { motion } from "framer-motion";
import { portfolio } from "@/lib/portfolio";

const PALETTE = {
  void: "#02030A",
  latent: "#8B5CF6",
  cyan: "#00E5FF",
  pink: "#FF0080",
  amber: "#FFB000",
  text: "#F1F5FF",
  grey: "#9BA3C7",
};

export default function PortfolioNeural() {
  const items = portfolio.slice(0, 6);
  return (
    <div className="relative w-full min-h-screen flex items-center px-6 md:px-12 py-20">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1 }}
          className="font-mono uppercase mb-4"
          style={{ fontSize: 11, letterSpacing: "0.32em", color: PALETTE.grey }}
        >
          <span style={{ color: PALETTE.cyan }}>§ 05</span> · LAYER 03 · DATAPOINTS
        </motion.div>

        <motion.h2
          id="sec-4-title"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(36px, 5.4vw, 72px)",
            fontWeight: 800,
            letterSpacing: "0.04em",
            lineHeight: 1,
            color: PALETTE.text,
            marginBottom: 12,
          }}
        >
          Trained on real signal.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ fontSize: 16, color: PALETTE.grey, fontWeight: 300, maxWidth: 540, lineHeight: 1.7 }}
          className="mb-12"
        >
          47+ shipped. Every site hand-coded, mobile-ready, fast by default.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p, i) => (
            <motion.a
              key={p.url}
              href={p.href ?? `https://${p.url}`}
              {...(p.href ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group block relative rounded-lg overflow-hidden border backdrop-blur-md"
              style={{
                background: "rgba(2,3,10,0.55)",
                borderColor: "rgba(155,163,199,0.12)",
              }}
            >
              {/* Image */}
              <div
                className="relative h-44 overflow-hidden"
                style={{
                  background: p.image
                    ? `url(${p.image}) center/cover no-repeat`
                    : `linear-gradient(135deg, rgba(139,92,246,0.18), rgba(0,229,255,0.12))`,
                }}
              >
                <div
                  className="absolute inset-0 transition-opacity"
                  style={{ background: "linear-gradient(180deg, rgba(2,3,10,0.4), rgba(2,3,10,0.85))" }}
                />
                {/* cyan ring on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${PALETTE.cyan}, inset 0 0 24px rgba(0,229,255,0.18)`,
                  }}
                />
                {p.logo && (
                  <img
                    src={p.logo}
                    alt={`${p.name} logo`}
                    className="absolute inset-0 m-auto max-h-12 max-w-[120px] object-contain"
                    style={{ filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.5))" }}
                  />
                )}
                {/* Datapoint badge */}
                <div
                  className="absolute top-3 left-3 font-mono uppercase px-2 py-1 rounded backdrop-blur"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.28em",
                    color: PALETTE.cyan,
                    background: "rgba(2,3,10,0.6)",
                    border: `1px solid rgba(0,229,255,0.3)`,
                  }}
                >
                  D·{String(i + 1).padStart(3, "0")}
                </div>
                <div
                  className="absolute top-3 right-3 font-mono uppercase px-2 py-1 rounded"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.24em",
                    color: PALETTE.latent,
                    background: "rgba(139,92,246,0.12)",
                    border: `1px solid rgba(139,92,246,0.3)`,
                  }}
                >
                  {p.category}
                </div>
              </div>

              <div className="p-5">
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    letterSpacing: "0.005em",
                    color: PALETTE.text,
                    marginBottom: 8,
                  }}
                  className="group-hover:text-[var(--n-cyan,#00E5FF)] transition-colors"
                >
                  {p.name}
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: PALETTE.grey, fontWeight: 300 }}>
                  {p.desc}
                </p>
                <div
                  className="mt-4 pt-3 flex items-center justify-between font-mono uppercase"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.24em",
                    color: PALETTE.grey,
                    borderTop: "1px solid rgba(155,163,199,0.08)",
                  }}
                >
                  <span>{p.url}</span>
                  <span style={{ color: PALETTE.cyan }} className="opacity-0 group-hover:opacity-100 transition-opacity">
                    OPEN →
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
