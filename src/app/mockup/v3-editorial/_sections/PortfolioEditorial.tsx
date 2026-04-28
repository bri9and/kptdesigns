"use client";

import { Fraunces, JetBrains_Mono } from "next/font/google";
import { motion } from "framer-motion";
import { portfolio, type PortfolioItem } from "@/lib/portfolio";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const ASPECTS = ["4 / 5", "3 / 2", "3 / 2", "4 / 5", "4 / 5", "3 / 2"] as const;

const CSS = `
  .v3pl-section { background: #F5F1EA; color: #0F0F0F; padding: 120px 0 160px; }
  .v3pl-wrap { max-width: 1280px; margin: 0 auto; padding: 0 32px; }
  .v3pl-rule { height: 1px; background: #C56738; opacity: 0.85; }
  .v3pl-eyebrow { margin-top: 14px; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #C56738; }
  .v3pl-h2 { margin-top: 24px; font-size: clamp(34px,5vw,64px); font-weight: 300; letter-spacing: -0.02em; line-height: 1.02; max-width: 880px; font-style: italic; }
  .v3pl-grid { max-width: 1280px; margin: 96px auto 0; padding: 0 32px; display: grid; grid-template-columns: 1fr; column-gap: 72px; row-gap: 96px; }
  @media (min-width: 768px) {
    .v3pl-grid { grid-template-columns: 1fr 1fr; row-gap: 112px; }
    .v3pl:nth-child(even) { margin-top: 56px; }
  }
  .v3pl-a { display: block; color: inherit; text-decoration: none; }
  .v3pl-frame { width: 100%; overflow: hidden; background: #EAE3D6; border-radius: 1px; }
  .v3pl-img { width: 100%; height: 100%; object-fit: cover; display: block; filter: grayscale(0.15) sepia(0.05) contrast(0.95) saturate(0.92); transition: filter 900ms cubic-bezier(0.16,1,0.3,1); }
  .v3pl-fallback { width: 100%; height: 100%; background: repeating-linear-gradient(45deg,#EAE3D6 0 6px,#E2D9C7 6px 12px); }
  .v3pl-cap { margin-top: 22px; padding-bottom: 4px; border-bottom: 1px solid rgba(15,15,15,0.08); }
  .v3pl-folio { font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase; color: #C56738; margin-bottom: 10px; }
  .v3pl-name { font-size: clamp(22px,2.4vw,28px); font-weight: 500; letter-spacing: -0.012em; line-height: 1.1; color: #0F0F0F; margin: 0; position: relative; display: inline-block; }
  .v3pl-u { position: absolute; left: 0; right: 0; bottom: -3px; height: 1px; background: #0F0F0F; clip-path: inset(0 100% 0 0); transition: clip-path 600ms cubic-bezier(0.16,1,0.3,1); }
  .v3pl-cat { margin-top: 8px; font-style: italic; font-size: 15px; color: #5C5852; }
  .v3pl-desc { margin-top: 14px; margin-bottom: 0; font-size: 15px; line-height: 1.55; color: #0F0F0F; max-width: 52ch; }
  .v3pl-url { margin-top: 18px; font-size: 11px; font-style: italic; color: #5C5852; text-align: right; letter-spacing: 0.02em; }
  .v3pl-arrow { color: #C56738; }
  .v3pl-foot { max-width: 1280px; margin: 120px auto 0; padding: 14px 32px 0; display: flex; justify-content: space-between; font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase; color: #5C5852; border-top: 1px solid rgba(15,15,15,0.08); }
  .v3pl-a:hover .v3pl-img { filter: grayscale(1) contrast(0.95); }
  .v3pl-a:hover .v3pl-u { clip-path: inset(0 0 0 0); }
`;

function plateHref(p: PortfolioItem) {
  return p.href
    ? { href: p.href, external: false }
    : { href: `https://${p.url}`, external: true };
}

export default function PortfolioEditorial() {
  const plates = portfolio.slice(0, 6);
  return (
    <section id="plates" className={`${fraunces.className} v3pl-section`}>
      <style>{CSS}</style>

      <div className="v3pl-wrap">
        <div className="v3pl-rule" />
        <div className={`${mono.className} v3pl-eyebrow`}>
          § 04 — Plates · selected work
        </div>
        <h2 className="v3pl-h2">
          A monograph of work, set in type and shipped to the open web.
        </h2>
      </div>

      <div className="v3pl-grid">
        {plates.map((p, i) => {
          const { href, external } = plateHref(p);
          const aspect = ASPECTS[i] ?? "4 / 5";
          const plateNo = String(i + 1).padStart(2, "0");
          return (
            <motion.article
              key={p.url}
              className="v3pl"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: (i % 2) * 0.08 + Math.floor(i / 2) * 0.06,
              }}
            >
              <a
                className="v3pl-a"
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <div className="v3pl-frame" style={{ aspectRatio: aspect }}>
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="v3pl-img"
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                    />
                  ) : (
                    <div className="v3pl-fallback" />
                  )}
                </div>

                <div className="v3pl-cap">
                  <div className={`${mono.className} v3pl-folio`}>
                    Plate {plateNo} · {String(i + 1).padStart(3, "0")}
                  </div>
                  <h3 className="v3pl-name">
                    {p.name}
                    <span className="v3pl-u" aria-hidden />
                  </h3>
                  <div className="v3pl-cat">{p.category}</div>
                  <p className="v3pl-desc">{p.desc}</p>
                  <div className={`${mono.className} v3pl-url`}>
                    {p.url} <span className="v3pl-arrow">→</span>
                  </div>
                </div>
              </a>
            </motion.article>
          );
        })}
      </div>

      <div className={`${mono.className} v3pl-foot`}>
        <span>Plates 01 — 06 of {portfolio.length}</span>
        <span className="v3pl-arrow">End § 04</span>
      </div>
    </section>
  );
}
