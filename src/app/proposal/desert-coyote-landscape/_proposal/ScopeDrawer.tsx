"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { palette, fonts } from "@/app/sites/desert-coyote-landscape/_lib/tokens";

const SCOPE = [
  "Sonoran Field Guide hero with project drone-footage placement.",
  "Service architecture across 10 categories with photo galleries.",
  "On-domain free-estimate request flow with photo upload.",
  "Project gallery organized by project type, owner-editable.",
  "Trailer rental booking with rate card and rental window picker.",
  "Materials library showcase — pavers, turf, stone, block.",
  "Service-area map covering Mesa, Gilbert, Chandler, Queen Creek.",
  "Mobile-first responsive build, accessibility AA, performance budget.",
  "Headless CMS so the team can update copy, photos, and rates.",
];

const DELIVERABLES = [
  "Hosted production site on a custom domain.",
  "CMS access for staff with training session.",
  "Estimate-request notifications via email and SMS.",
  "Plausible analytics dashboard.",
  "30 days of post-launch tuning included.",
];

const TIMELINE = [
  { week: "Week 1", what: "Photo gathering, service-list confirmation, CMS modeled." },
  { week: "Week 2", what: "Production build of all 10 sections; estimate flow wired; staging deploy." },
  { week: "Week 3", what: "Owner review, copy edits, soft launch, DNS cutover." },
];

export function ScopeDrawer() {
  const [open, setOpen] = useState(false);
  const [revealPrice, setRevealPrice] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        className={`dc-scope__trigger${open ? " is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="dc-scope-drawer"
      >
        Proposal details
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="dc-scope__scrim"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="dc-scope-drawer"
              className="dc-scope"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 0.96, 0.32, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Proposal details"
            >
              <button className="dc-scope__close" onClick={() => setOpen(false)} aria-label="Close">×</button>

              <div className="dc-scope__inner">
                <header>
                  <p className="dc-scope__eyebrow">Proposal details</p>
                  <h2>How we'll build this.</h2>
                </header>

                <section>
                  <h3>Scope of work</h3>
                  <ul>{SCOPE.map((s) => <li key={s}>{s}</li>)}</ul>
                </section>

                <section>
                  <h3>Deliverables</h3>
                  <ul>{DELIVERABLES.map((s) => <li key={s}>{s}</li>)}</ul>
                </section>

                <section>
                  <h3>Timeline</h3>
                  <ol className="dc-scope__timeline">
                    {TIMELINE.map((t) => (
                      <li key={t.week}>
                        <span>{t.week}</span>
                        <p>{t.what}</p>
                      </li>
                    ))}
                  </ol>
                  <p className="dc-scope__note">Three weeks from approval to launch · placeholder dates pending kickoff call.</p>
                </section>

                <section>
                  <h3>Investment</h3>
                  {!revealPrice ? (
                    <button className="dc-scope__reveal" onClick={() => setRevealPrice(true)}>
                      Reveal pricing
                    </button>
                  ) : (
                    <div className="dc-scope__price">
                      <p className="dc-scope__price-line"><span>Build</span><strong>$9,800</strong></p>
                      <p className="dc-scope__price-line"><span>Hosting + CMS · monthly</span><strong>$135 / mo</strong></p>
                      <p className="dc-scope__price-fine">All figures are draft. Final pricing confirmed at kickoff.</p>
                    </div>
                  )}
                </section>

                <section className="dc-scope__cta-row">
                  <a className="dc-scope__cta dc-scope__cta--primary" href="mailto:hello@kptdesigns.com?subject=Approve%20Desert%20Coyote%20direction">Approve direction</a>
                  <a className="dc-scope__cta" href="mailto:hello@kptdesigns.com?subject=Desert%20Coyote%20—%20requested%20changes">Request changes</a>
                  <a className="dc-scope__cta" href="mailto:hello@kptdesigns.com?subject=Schedule%20a%20call%20—%20Desert%20Coyote">Schedule a call</a>
                </section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <style>{css}</style>
    </>
  );
}

const css = `
.dc-scope__trigger { position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 32; background: ${palette.charcoal}; color: ${palette.sand}; border: none; padding: 0.95rem 1.5rem; border-radius: 999px; font-family: ${fonts.body}; font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; box-shadow: 0 12px 28px rgba(0,0,0,0.32); transition: transform 180ms; }
.dc-scope__trigger:hover { transform: translateY(-2px); }
.dc-scope__trigger.is-open { background: ${palette.sunGold}; color: ${palette.charcoal}; }
.dc-scope__trigger:focus-visible { outline: 2px solid ${palette.sunGold}; outline-offset: 2px; }
.dc-scope__scrim { position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 49; }
.dc-scope { position: fixed; left: 0; right: 0; bottom: 0; max-height: 88vh; background: ${palette.paper}; color: ${palette.charcoal}; border-top: 1px solid rgba(0,0,0,0.1); border-radius: 12px 12px 0 0; z-index: 50; overflow-y: auto; box-shadow: 0 -16px 48px rgba(0,0,0,0.32); font-family: ${fonts.body}; }
.dc-scope__close { position: absolute; top: 1rem; right: 1.25rem; background: transparent; border: none; font-size: 1.6rem; line-height: 1; color: rgba(0,0,0,0.6); cursor: pointer; padding: 0.3rem 0.6rem; }
.dc-scope__close:hover { color: ${palette.charcoal}; }
.dc-scope__inner { max-width: 980px; margin: 0 auto; padding: 4rem 2rem 5rem; display: flex; flex-direction: column; gap: 3rem; }
.dc-scope__eyebrow { font-size: 0.7rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.saguaro}; margin: 0 0 1rem; }
.dc-scope h2 { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(2rem, 4.5vw, 2.8rem); margin: 0; color: ${palette.terraDeep}; }
.dc-scope h3 { font-family: ${fonts.display}; font-weight: 400; font-size: 1.4rem; margin: 0 0 1rem; color: ${palette.terraDeep}; }
.dc-scope ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.65rem; }
.dc-scope li { font-size: 0.95rem; line-height: 1.6; padding-left: 1.25rem; position: relative; }
.dc-scope li::before { content: "—"; position: absolute; left: 0; color: ${palette.terra}; }
.dc-scope__timeline { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
.dc-scope__timeline li { background: ${palette.sand}; padding: 1.25rem 1.4rem; border-radius: 4px; padding-left: 1.4rem; }
.dc-scope__timeline li::before { display: none; }
.dc-scope__timeline li span { display: block; font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; color: ${palette.saguaro}; margin-bottom: 0.5rem; }
.dc-scope__timeline li p { font-family: ${fonts.display}; font-style: italic; font-size: 0.95rem; line-height: 1.5; margin: 0; color: ${palette.charcoal}; }
.dc-scope__note { font-size: 0.78rem; opacity: 0.7; font-style: italic; margin: 1rem 0 0; }
.dc-scope__reveal { background: transparent; color: ${palette.terraDeep}; border: 1px solid ${palette.terraDeep}; padding: 0.85rem 1.5rem; border-radius: 999px; font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; transition: background 180ms; }
.dc-scope__reveal:hover { background: ${palette.terraDeep}; color: ${palette.sand}; }
.dc-scope__price { display: flex; flex-direction: column; gap: 0.6rem; }
.dc-scope__price-line { display: flex; justify-content: space-between; align-items: baseline; padding: 1rem 0; border-bottom: 1px solid rgba(0,0,0,0.1); margin: 0; }
.dc-scope__price-line span { font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; color: ${palette.rock}; }
.dc-scope__price-line strong { font-family: ${fonts.display}; font-size: 1.5rem; font-weight: 400; color: ${palette.terraDeep}; }
.dc-scope__price-fine { font-size: 0.78rem; opacity: 0.7; font-style: italic; margin: 1rem 0 0; }
.dc-scope__cta-row { display: flex; gap: 0.75rem; flex-wrap: wrap; padding-top: 1.5rem; border-top: 1px solid rgba(0,0,0,0.1); }
.dc-scope__cta { background: transparent; color: ${palette.terraDeep}; border: 1px solid ${palette.terraDeep}; padding: 0.85rem 1.5rem; border-radius: 999px; font-size: 0.75rem; letter-spacing: 0.18em; text-transform: uppercase; text-decoration: none; transition: background 180ms; }
.dc-scope__cta:hover { background: ${palette.terraDeep}; color: ${palette.sand}; }
.dc-scope__cta--primary { background: ${palette.terraDeep}; color: ${palette.sand}; }
.dc-scope__cta--primary:hover { background: ${palette.charcoal}; }
@media (prefers-reduced-motion: reduce) { .dc-scope__trigger, .dc-scope__reveal, .dc-scope__cta { transition: none; } }
@media (max-width: 720px) {
  .dc-scope__timeline { grid-template-columns: 1fr; }
  .dc-scope__trigger { right: 0.75rem; bottom: 0.75rem; padding: 0.85rem 1.2rem; font-size: 0.7rem; }
}
`;
