"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { tournaments } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

const inquirySchema = z.object({
  date: z.string().min(1, "Pick a date"),
  headcount: z.coerce.number().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  notes: z.string().optional(),
});
type Inquiry = z.infer<typeof inquirySchema>;

export function Tournaments() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <section id="tournaments" className="la-tour" aria-labelledby="la-tour-title">
      <header className="la-tour__intro">
        <p className="la-tour__eyebrow">Tournaments</p>
        <h2 id="la-tour-title" className="la-tour__title">Run your event here.</h2>
        <p className="la-tour__lede">
          Three formats. One scenic course. From a ten-team charity scramble
          to a sixty-four-team member-guest, we host it.
        </p>
      </header>
      <div className="la-tour__grid">
        {tournaments.map((t) => (
          <div key={t.slug} className={`la-tour__card${openSlug === t.slug ? " is-open" : ""}`}>
            <h3 className="la-tour__card-title">{t.title}</h3>
            <p className="la-tour__card-pitch">{t.pitch}</p>
            <dl className="la-tour__card-stats">
              <div><dt>Capacity</dt><dd>{t.capacity.value}</dd></div>
              <div><dt>From</dt><dd>{t.pricePerTeam.value}</dd></div>
            </dl>
            <button
              type="button"
              className="la-tour__card-toggle"
              onClick={() => setOpenSlug(openSlug === t.slug ? null : t.slug)}
              aria-expanded={openSlug === t.slug}
              aria-controls={`la-tour-detail-${t.slug}`}
            >
              {openSlug === t.slug ? "Close" : "Details & inquire"}
            </button>
            {openSlug === t.slug && <TournamentDetail slug={t.slug} inclusions={t.inclusions} />}
          </div>
        ))}
      </div>
      <style>{css}</style>
    </section>
  );
}

function TournamentDetail({ slug, inclusions }: { slug: string; inclusions: string[] }) {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inquiry>();

  async function onSubmit(values: Inquiry) {
    await new Promise((r) => setTimeout(r, 700));
    // eslint-disable-next-line no-console
    console.log(`[tournaments:${slug}] inquiry`, values);
    setSubmitted(true);
  }

  return (
    <div id={`la-tour-detail-${slug}`} className="la-tour__detail">
      <ul className="la-tour__incl">
        {inclusions.map((i) => <li key={i}>{i}</li>)}
      </ul>
      {!submitted ? (
        <form onSubmit={handleSubmit(onSubmit)} className="la-tour__form" noValidate>
          <div className="la-tour__row">
            <label className="la-tour__field"><span>Target date</span><input type="date" {...register("date")} />{errors.date && <em>required</em>}</label>
            <label className="la-tour__field"><span>Players</span><input type="number" min={1} {...register("headcount", { valueAsNumber: true })} /></label>
          </div>
          <div className="la-tour__row">
            <label className="la-tour__field"><span>Name</span><input type="text" {...register("name")} /></label>
            <label className="la-tour__field"><span>Email</span><input type="email" {...register("email")} /></label>
          </div>
          <div className="la-tour__row">
            <label className="la-tour__field"><span>Phone</span><input type="tel" {...register("phone")} /></label>
            <label className="la-tour__field"><span>Notes</span><input type="text" {...register("notes")} placeholder="Optional" /></label>
          </div>
          <button type="submit" className="la-tour__cta" disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Request a quote →"}
          </button>
        </form>
      ) : (
        <div className="la-tour__success">
          <h4>Thanks — we'll send a quote within two business days.</h4>
        </div>
      )}
    </div>
  );
}

const css = `
.la-tour { padding: 7rem 5vw; background: ${palette.fairwayDeep}; color: ${palette.cream}; }
.la-tour__intro { max-width: 720px; margin: 0 auto 4rem; text-align: center; }
.la-tour__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.dawn}; margin: 0 0 1.25rem; }
.la-tour__title { font-family: ${fonts.display}; font-size: clamp(2.2rem, 5vw, 3.4rem); font-weight: 400; line-height: 1.1; margin: 0 0 1.25rem; }
.la-tour__lede { font-family: ${fonts.display}; font-style: italic; opacity: 0.85; font-size: 1.05rem; line-height: 1.65; margin: 0; }
.la-tour__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; max-width: 1180px; margin: 0 auto; }
.la-tour__card { background: rgba(244,239,223,0.06); border: 1px solid rgba(244,239,223,0.18); border-radius: 4px; padding: 2.25rem 2rem; display: flex; flex-direction: column; gap: 1rem; transition: border-color 200ms; font-family: ${fonts.body}; }
.la-tour__card.is-open { grid-column: 1 / -1; }
.la-tour__card-title { font-family: ${fonts.display}; font-weight: 400; font-size: 1.6rem; margin: 0; }
.la-tour__card-pitch { font-family: ${fonts.display}; font-style: italic; font-size: 1rem; line-height: 1.55; margin: 0; opacity: 0.9; }
.la-tour__card-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin: 0; padding: 1rem 0 0; border-top: 1px solid rgba(244,239,223,0.18); }
.la-tour__card-stats dt { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.7; margin: 0 0 0.25rem; }
.la-tour__card-stats dd { font-family: ${fonts.display}; font-size: 1.05rem; margin: 0; color: ${palette.dawn}; }
.la-tour__card-toggle { background: transparent; color: ${palette.cream}; border: 1px solid rgba(244,239,223,0.4); padding: 0.7rem 1.2rem; border-radius: 999px; font-size: 0.78rem; letter-spacing: 0.16em; text-transform: uppercase; cursor: pointer; align-self: flex-start; transition: background 180ms; }
.la-tour__card-toggle:hover { background: rgba(244,239,223,0.1); }
.la-tour__card-toggle:focus-visible { outline: 2px solid ${palette.dawn}; outline-offset: 2px; }
.la-tour__detail { display: grid; grid-template-columns: 1fr 1.2fr; gap: 2.5rem; padding: 1.5rem 0 0; border-top: 1px solid rgba(244,239,223,0.18); margin-top: 1rem; }
.la-tour__incl { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.95rem; opacity: 0.92; }
.la-tour__incl li::before { content: "— "; color: ${palette.dawn}; }
.la-tour__form { display: flex; flex-direction: column; gap: 1rem; }
.la-tour__row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.la-tour__field { display: flex; flex-direction: column; gap: 0.3rem; font-size: 0.85rem; }
.la-tour__field span { font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.75; }
.la-tour__field input { background: rgba(244,239,223,0.08); border: 1px solid rgba(244,239,223,0.22); color: ${palette.cream}; padding: 0.7rem 0.9rem; border-radius: 3px; font-family: inherit; font-size: 0.92rem; }
.la-tour__field input:focus { outline: none; border-color: ${palette.dawn}; box-shadow: 0 0 0 2px rgba(201,169,110,0.22); }
.la-tour__field em { color: ${palette.dawn}; font-style: normal; font-size: 0.7rem; }
.la-tour__cta { background: ${palette.dawn}; color: ${palette.fairwayDeep}; border: none; padding: 0.85rem 1.5rem; border-radius: 999px; font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; font-family: ${fonts.body}; cursor: pointer; align-self: flex-start; }
.la-tour__cta:disabled { opacity: 0.6; }
.la-tour__success h4 { font-family: ${fonts.display}; font-weight: 400; font-size: 1.4rem; margin: 0; }
@media (max-width: 920px) {
  .la-tour__grid { grid-template-columns: 1fr; }
  .la-tour__detail { grid-template-columns: 1fr; }
  .la-tour__row { grid-template-columns: 1fr; }
}
`;
