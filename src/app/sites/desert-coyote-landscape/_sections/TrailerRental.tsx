"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trailerRental } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

const DURATIONS = [
  { value: "half",    label: "Half day · 4 hrs" },
  { value: "full",    label: "Full day · 8 hrs" },
  { value: "weekend", label: "Weekend · Fri–Mon" },
  { value: "week",    label: "Per-week" },
];

const schema = z.object({
  date: z.string().min(1, "Pick a date"),
  duration: z.string().min(1, "Pick a duration"),
  name: z.string().min(2, "Name required"),
  phone: z.string().min(7, "Phone required"),
  notes: z.string().optional(),
});
type TrailerInquiry = z.infer<typeof schema>;

export function TrailerRental() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TrailerInquiry>({
    defaultValues: { duration: "half" },
  });

  async function onSubmit(values: TrailerInquiry) {
    await new Promise((r) => setTimeout(r, 800));
    // eslint-disable-next-line no-console
    console.log("[trailer:inquiry]", values);
    setSubmitted(true);
  }

  return (
    <section id="trailer" className="dc-trail" aria-labelledby="dc-trail-title">
      <header className="dc-trail__intro">
        <p className="dc-trail__eyebrow">Trailer rental</p>
        <h2 id="dc-trail-title" className="dc-trail__title">{trailerRental.title}.</h2>
        <p className="dc-trail__lede">{trailerRental.pitch}</p>
      </header>
      <div className="dc-trail__grid">
        <div className="dc-trail__pitch">
          <h3>What's included</h3>
          <ul className="dc-trail__incl">
            {trailerRental.inclusions.map((i) => <li key={i}>{i}</li>)}
          </ul>
        </div>
        <div className="dc-trail__panel">
          <h3 className="dc-trail__rates-title">Rates</h3>
          <table className="dc-trail__rates" aria-label="Rental rates">
            <tbody>
              {trailerRental.rates.map((r) => (
                <tr key={r.row}>
                  <th scope="row">{r.row}</th>
                  <td>
                    {r.price.value}
                    {r.price.isPlaceholder && (
                      <sup className="dc-trail__placeholder" title="Placeholder — owner to confirm">*</sup>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!submitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="dc-trail__form" noValidate>
              <div className="dc-trail__row">
                <label className="dc-trail__field">
                  <span>Date</span>
                  <input type="date" {...register("date")} />
                  {errors.date && <em>{errors.date.message}</em>}
                </label>
                <label className="dc-trail__field">
                  <span>Duration</span>
                  <select {...register("duration")}>
                    {DURATIONS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </select>
                  {errors.duration && <em>{errors.duration.message}</em>}
                </label>
              </div>
              <div className="dc-trail__row">
                <label className="dc-trail__field">
                  <span>Name</span>
                  <input type="text" autoComplete="name" {...register("name")} />
                  {errors.name && <em>{errors.name.message}</em>}
                </label>
                <label className="dc-trail__field">
                  <span>Phone</span>
                  <input type="tel" autoComplete="tel" {...register("phone")} />
                  {errors.phone && <em>{errors.phone.message}</em>}
                </label>
              </div>
              <label className="dc-trail__field dc-trail__field--full">
                <span>Notes (optional)</span>
                <input type="text" {...register("notes")} placeholder="What you're hauling, drop-off needs…" />
              </label>
              <div className="dc-trail__row dc-trail__row--end">
                <button type="submit" className="dc-trail__cta" disabled={isSubmitting}>
                  {isSubmitting ? "Reserving…" : "Reserve trailer →"}
                </button>
              </div>
            </form>
          ) : (
            <div className="dc-trail__success">
              <div className="dc-trail__seal" aria-hidden="true">✓</div>
              <p>Reserved your slot. We'll confirm by phone within an hour.</p>
            </div>
          )}
        </div>
      </div>
      <style>{css}</style>
    </section>
  );
}

const css = `
.dc-trail { padding: 7rem 5vw; background: ${palette.saguaro}; color: ${palette.paper}; }
.dc-trail__intro { max-width: 720px; margin: 0 auto 4rem; text-align: center; }
.dc-trail__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.sunGold}; margin: 0 0 1.25rem; }
.dc-trail__title { font-family: ${fonts.display}; font-size: clamp(2.2rem, 5vw, 3.4rem); font-weight: 400; line-height: 1.1; margin: 0 0 1.25rem; }
.dc-trail__lede { font-family: ${fonts.display}; font-style: italic; font-size: 1.1rem; line-height: 1.55; opacity: 0.92; margin: 0; }
.dc-trail__grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 3rem; max-width: 1100px; margin: 0 auto; align-items: start; }
.dc-trail__pitch h3 { font-family: ${fonts.display}; font-weight: 400; font-size: 1.4rem; margin: 0 0 1.25rem; color: ${palette.sunGold}; }
.dc-trail__incl { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.85rem; font-family: ${fonts.body}; font-size: 1rem; line-height: 1.55; opacity: 0.95; }
.dc-trail__incl li { padding-left: 1.25rem; position: relative; }
.dc-trail__incl li::before { content: "—"; position: absolute; left: 0; color: ${palette.sunGold}; }
.dc-trail__panel { background: rgba(245,239,223,0.06); border: 1px solid rgba(245,239,223,0.18); border-radius: 6px; padding: 2rem 2.25rem; backdrop-filter: blur(4px); }
.dc-trail__rates-title { font-family: ${fonts.display}; font-weight: 400; font-size: 1.2rem; margin: 0 0 1rem; color: ${palette.sunGold}; }
.dc-trail__rates { width: 100%; border-collapse: collapse; margin: 0 0 1.75rem; font-family: ${fonts.body}; }
.dc-trail__rates th, .dc-trail__rates td { padding: 0.7rem 0; border-bottom: 1px solid rgba(245,239,223,0.16); text-align: left; font-weight: 400; font-size: 0.95rem; }
.dc-trail__rates th { color: ${palette.paper}; opacity: 0.92; }
.dc-trail__rates td { font-family: ${fonts.display}; font-size: 1.05rem; color: ${palette.sunGold}; text-align: right; }
.dc-trail__placeholder { color: ${palette.sunGold}; font-family: ${fonts.body}; font-size: 0.6em; vertical-align: super; padding-left: 0.15rem; opacity: 0.85; }
.dc-trail__form { display: flex; flex-direction: column; gap: 1rem; padding-top: 1.25rem; border-top: 1px solid rgba(245,239,223,0.18); }
.dc-trail__row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; }
.dc-trail__row--end { display: flex; justify-content: flex-end; }
.dc-trail__field { display: flex; flex-direction: column; gap: 0.3rem; font-family: ${fonts.body}; font-size: 0.85rem; }
.dc-trail__field--full { grid-column: 1 / -1; }
.dc-trail__field span { font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.78; }
.dc-trail__field input, .dc-trail__field select { background: rgba(245,239,223,0.1); border: 1px solid rgba(245,239,223,0.22); color: ${palette.paper}; padding: 0.7rem 0.9rem; border-radius: 3px; font-family: inherit; font-size: 0.92rem; }
.dc-trail__field input:focus, .dc-trail__field select:focus { outline: none; border-color: ${palette.sunGold}; box-shadow: 0 0 0 2px rgba(212,168,87,0.3); }
.dc-trail__field em { color: ${palette.sunGold}; font-style: normal; font-size: 0.72rem; }
.dc-trail__cta { background: ${palette.sunGold}; color: ${palette.saguaro}; border: none; padding: 0.85rem 1.5rem; border-radius: 999px; font-family: ${fonts.body}; font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; font-weight: 600; transition: transform 180ms, box-shadow 180ms; }
.dc-trail__cta:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(212,168,87,0.4); }
.dc-trail__cta:disabled { opacity: 0.6; cursor: progress; }
.dc-trail__cta:focus-visible { outline: 2px solid ${palette.paper}; outline-offset: 2px; }
.dc-trail__success { padding: 2rem 0; text-align: center; }
.dc-trail__seal { width: 56px; height: 56px; margin: 0 auto 1rem; border: 1px solid ${palette.sunGold}; border-radius: 999px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; color: ${palette.sunGold}; }
.dc-trail__success p { font-family: ${fonts.display}; font-style: italic; font-size: 1.1rem; margin: 0; line-height: 1.55; }
@media (prefers-reduced-motion: reduce) {
  .dc-trail__cta { transition: none; }
  .dc-trail__cta:hover { transform: none; }
}
@media (max-width: 920px) {
  .dc-trail__grid { grid-template-columns: 1fr; }
  .dc-trail__row { grid-template-columns: 1fr; }
}
`;
