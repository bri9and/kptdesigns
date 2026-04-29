"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { palette, fonts } from "@/app/sites/lake-arthur/_lib/tokens";
import {
  PRICING_MATRIX,
  scopeSummaryFor,
  taglineFor,
  locationGuess,
  type Industry,
} from "./staged-data";

export type ProposalCardProps = {
  businessName: string;
  industry: Industry;
  customerEmail: string;
  elapsedSeconds: number;
};

export function ProposalCard({
  businessName,
  industry,
  customerEmail,
  elapsedSeconds,
}: ProposalCardProps) {
  const [revealed, setRevealed] = useState(false);
  const tagline = taglineFor(businessName, industry);
  const summary = scopeSummaryFor(businessName, industry);
  const pricing = PRICING_MATRIX[industry];
  const location = locationGuess(businessName);

  // Email body. Placeholder — real proposal link generated in follow-up.
  const subject = `Your KPT Designs proposal — ${businessName}`;
  const body = [
    `Hi —`,
    ``,
    `As promised, here's the proposal we put together for ${businessName}.`,
    ``,
    `Tagline direction: ${tagline}`,
    ``,
    `Scope highlights:`,
    ...summary.map((s) => `  • ${s}`),
    ``,
    `Investment:`,
    `  • Build (one-time): $${pricing.build.toLocaleString()}`,
    `  • Hosting + CMS: $${pricing.hosting}/mo`,
    `  • AI Agent: $${pricing.agent}/mo`,
    ``,
    `Live preview: https://kptdesigns.com/proposal/lake-arthur`,
    ``,
    `Happy to walk through it whenever works for you.`,
    `— KPT Designs`,
  ].join("\n");

  const mailto =
    `mailto:${encodeURIComponent(customerEmail || "")}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  return (
    <motion.article
      className="pc-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 0.96, 0.32, 1] }}
    >
      <header className="pc-head">
        <p className="pc-eyebrow">Proposal · ready to send</p>
        <h2 className="pc-title"><em>{businessName}</em></h2>
        <p className="pc-tagline">{tagline}</p>
        <p className="pc-meta">{industry} · {location}</p>
      </header>

      <section className="pc-section">
        <h3>Scope summary</h3>
        <ul className="pc-summary">
          {summary.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </section>

      <section className="pc-section">
        <h3>Investment</h3>
        {!revealed ? (
          <button type="button" className="pc-reveal" onClick={() => setRevealed(true)}>
            Reveal pricing
          </button>
        ) : (
          <div className="pc-price">
            <p className="pc-price-line">
              <span>Build · one-time</span>
              <strong>${pricing.build.toLocaleString()}</strong>
            </p>
            <p className="pc-price-line">
              <span>Hosting + CMS</span>
              <strong>${pricing.hosting} / mo</strong>
            </p>
            <p className="pc-price-line">
              <span>AI Agent</span>
              <strong>${pricing.agent} / mo</strong>
            </p>
            <p className="pc-price-fine">All figures are draft. Final pricing confirmed at kickoff.</p>
          </div>
        )}
      </section>

      <section className="pc-cta-row">
        {/* Deep-link to generated proposal — for tonight, lake-arthur sample */}
        <a className="pc-cta pc-cta--primary" href="/proposal/lake-arthur" target="_blank" rel="noopener noreferrer">
          Open live proposal preview →
        </a>
        <a className="pc-cta" href={mailto}>
          Email this to {customerEmail || "client"}
        </a>
      </section>

      <footer className="pc-foot">
        Generated in {elapsedSeconds}s · KPT Designs
      </footer>

      <style>{css}</style>
    </motion.article>
  );
}

const css = `
.pc-card { background: ${palette.paper}; color: ${palette.charcoal}; border-radius: 6px; padding: 3rem; max-width: 720px; margin: 0 auto; box-shadow: 0 30px 80px rgba(0,0,0,0.4); display: flex; flex-direction: column; gap: 2.5rem; }
.pc-head { display: flex; flex-direction: column; gap: 0.5rem; }
.pc-eyebrow { font-family: ${fonts.body}; font-size: 0.7rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.fairway}; margin: 0 0 0.75rem; }
.pc-title { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(2.2rem, 4.5vw, 3rem); margin: 0; line-height: 1.05; color: ${palette.water}; }
.pc-title em { font-style: italic; }
.pc-tagline { font-family: ${fonts.display}; font-style: italic; font-size: 1.15rem; line-height: 1.5; color: ${palette.smoke}; margin: 0.75rem 0 0; }
.pc-meta { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase; color: ${palette.fairway}; opacity: 0.85; margin: 0.5rem 0 0; }
.pc-section h3 { font-family: ${fonts.display}; font-weight: 400; font-size: 1.25rem; color: ${palette.water}; margin: 0 0 1rem; }
.pc-summary { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; font-family: ${fonts.body}; }
.pc-summary li { font-size: 0.95rem; line-height: 1.55; padding-left: 1.25rem; position: relative; }
.pc-summary li::before { content: "—"; position: absolute; left: 0; color: ${palette.dawn}; }
.pc-reveal { background: transparent; color: ${palette.water}; border: 1px solid ${palette.water}; padding: 0.85rem 1.5rem; border-radius: 999px; font-family: ${fonts.body}; font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; transition: background 180ms, color 180ms; }
.pc-reveal:hover { background: ${palette.water}; color: ${palette.cream}; }
.pc-reveal:focus-visible { outline: 2px solid ${palette.dawn}; outline-offset: 2px; }
.pc-price { display: flex; flex-direction: column; gap: 0.4rem; font-family: ${fonts.body}; }
.pc-price-line { display: flex; justify-content: space-between; align-items: baseline; padding: 0.85rem 0; border-bottom: 1px solid rgba(0,0,0,0.1); margin: 0; }
.pc-price-line span { font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; color: ${palette.smoke}; }
.pc-price-line strong { font-family: ${fonts.display}; font-size: 1.4rem; font-weight: 400; color: ${palette.water}; }
.pc-price-fine { font-size: 0.75rem; opacity: 0.7; font-style: italic; margin: 1rem 0 0; }
.pc-cta-row { display: flex; gap: 0.75rem; flex-wrap: wrap; padding-top: 1.5rem; border-top: 1px solid rgba(0,0,0,0.1); }
.pc-cta { background: transparent; color: ${palette.water}; border: 1px solid ${palette.water}; padding: 0.95rem 1.5rem; border-radius: 999px; font-family: ${fonts.body}; font-size: 0.75rem; letter-spacing: 0.18em; text-transform: uppercase; text-decoration: none; transition: background 180ms, color 180ms; }
.pc-cta:hover { background: ${palette.water}; color: ${palette.cream}; }
.pc-cta:focus-visible { outline: 2px solid ${palette.dawn}; outline-offset: 2px; }
.pc-cta--primary { background: ${palette.water}; color: ${palette.cream}; }
.pc-cta--primary:hover { background: ${palette.charcoal}; }
.pc-foot { font-family: ${fonts.body}; font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; color: ${palette.smoke}; opacity: 0.65; margin: 0; padding-top: 1rem; border-top: 1px solid rgba(0,0,0,0.06); text-align: center; }
@media (prefers-reduced-motion: reduce) {
  .pc-reveal, .pc-cta { transition: none; }
}
@media (max-width: 720px) {
  .pc-card { padding: 2rem; }
}
`;
