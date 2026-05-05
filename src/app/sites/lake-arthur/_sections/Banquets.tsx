"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { palette, fonts } from "../_lib/tokens";

const schema = z.object({
  eventType: z.enum(["wedding", "corporate", "tournament", "private", "other"]),
  date: z.string().min(1, "Pick a date"),
  headcount: z.coerce.number().min(1, "Headcount is required"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone required"),
  vision: z.string().optional(),
});
type Form = z.infer<typeof schema>;

export function Banquets() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>();

  async function onSubmit(values: Form) {
    await new Promise((r) => setTimeout(r, 800));
    // eslint-disable-next-line no-console
    console.log("[banquets] inquiry", values);
    setSubmitted(true);
  }

  return (
    <section id="banquets" className="la-banq" aria-labelledby="la-banq-title">
      <div className="la-banq__hero" role="img" aria-label="Sunset wedding scene at the lake">
        <div className="la-banq__hero-overlay" />
      </div>
      <div className="la-banq__panel">
        <div className="la-banq__copy">
          <p className="la-banq__eyebrow">Banquets & Weddings</p>
          <h2 id="la-banq-title" className="la-banq__title">Celebrate on the lake.</h2>
          <p className="la-banq__lede">
            Sunset receptions over the water, corporate dinners in the
            clubhouse, charity galas under tented terraces. Tell us about
            your event and our team will be in touch within a day.
          </p>
        </div>
        <div className="la-banq__formcol">
          {!submitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="la-banq__form" noValidate>
              <label className="la-banq__field">
                <span>Event type</span>
                <select {...register("eventType")} defaultValue="wedding">
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate</option>
                  <option value="tournament">Charity tournament</option>
                  <option value="private">Private dinner</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <div className="la-banq__row">
                <label className="la-banq__field">
                  <span>Date</span>
                  <input type="date" {...register("date")} />
                  {errors.date && <em>{errors.date.message}</em>}
                </label>
                <label className="la-banq__field">
                  <span>Headcount</span>
                  <input type="number" min={1} {...register("headcount", { valueAsNumber: true })} />
                  {errors.headcount && <em>{errors.headcount.message}</em>}
                </label>
              </div>
              <label className="la-banq__field">
                <span>Your name</span>
                <input type="text" {...register("name")} />
                {errors.name && <em>{errors.name.message}</em>}
              </label>
              <div className="la-banq__row">
                <label className="la-banq__field">
                  <span>Email</span>
                  <input type="email" {...register("email")} />
                  {errors.email && <em>{errors.email.message}</em>}
                </label>
                <label className="la-banq__field">
                  <span>Phone</span>
                  <input type="tel" {...register("phone")} />
                  {errors.phone && <em>{errors.phone.message}</em>}
                </label>
              </div>
              <label className="la-banq__field">
                <span>Tell us about your vision (optional)</span>
                <textarea rows={4} {...register("vision")} />
              </label>
              <button className="la-banq__cta" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending…" : "Send inquiry →"}
              </button>
            </form>
          ) : (
            <div className="la-banq__success">
              <p className="la-banq__success-eyebrow">Thank you</p>
              <h3>We'll be in touch within 24 hours.</h3>
              <p>Pat from our events team will reach out to walk through dates and packages.</p>
            </div>
          )}
        </div>
      </div>
      <style>{css}</style>
    </section>
  );
}

const css = `
.la-banq { background: ${palette.charcoal}; color: ${palette.cream}; padding: 0; position: relative; }
.la-banq__hero { height: 50vh; min-height: 320px; background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%), linear-gradient(135deg, #6B3F2A 0%, #C9A96E 50%, #2C5530 100%); position: relative; }
.la-banq__hero-overlay { position: absolute; inset: 0; background: radial-gradient(ellipse at 70% 80%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.45) 100%); }
.la-banq__panel { max-width: 1180px; margin: -120px auto 0; background: ${palette.paper}; color: ${palette.charcoal}; position: relative; padding: 4rem 4rem; display: grid; grid-template-columns: 1fr 1.1fr; gap: 4rem; box-shadow: 0 24px 60px rgba(0,0,0,0.18); border-radius: 4px; }
.la-banq__copy { padding-top: 0.5rem; }
.la-banq__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.fairway}; margin: 0 0 1.25rem; }
.la-banq__title { font-family: ${fonts.display}; font-size: clamp(2rem, 4.5vw, 3rem); font-weight: 400; line-height: 1.1; color: ${palette.water}; margin: 0 0 1.5rem; }
.la-banq__lede { font-family: ${fonts.display}; font-style: italic; font-size: 1.05rem; line-height: 1.65; margin: 0; color: ${palette.smoke}; }
.la-banq__form { display: flex; flex-direction: column; gap: 1.25rem; font-family: ${fonts.body}; }
.la-banq__row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.la-banq__field { display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.9rem; }
.la-banq__field span { font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; color: ${palette.smoke}; }
.la-banq__field input, .la-banq__field select, .la-banq__field textarea { background: ${palette.white}; border: 1px solid rgba(26,26,26,0.18); padding: 0.78rem 0.95rem; border-radius: 3px; font-family: inherit; font-size: 0.95rem; color: ${palette.charcoal}; }
.la-banq__field input:focus, .la-banq__field select:focus, .la-banq__field textarea:focus { outline: none; border-color: ${palette.dawn}; box-shadow: 0 0 0 2px rgba(201,169,110,0.22); }
.la-banq__field em { color: #A03A2A; font-size: 0.74rem; font-style: normal; }
.la-banq__cta { background: ${palette.water}; color: ${palette.cream}; border: none; padding: 0.95rem 1.6rem; border-radius: 999px; font-family: ${fonts.body}; font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; align-self: flex-start; transition: transform 180ms, box-shadow 180ms; }
.la-banq__cta:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(14,42,63,0.32); }
.la-banq__cta:disabled { opacity: 0.6; cursor: progress; }
.la-banq__success { text-align: left; padding: 2rem 0; }
.la-banq__success-eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.28em; text-transform: uppercase; color: ${palette.fairway}; margin: 0 0 1rem; }
.la-banq__success h3 { font-family: ${fonts.display}; font-weight: 400; font-size: 1.6rem; line-height: 1.2; margin: 0 0 1rem; color: ${palette.water}; }
.la-banq__success p { margin: 0; font-family: ${fonts.body}; line-height: 1.6; color: ${palette.smoke}; }
@media (prefers-reduced-motion: reduce) { .la-banq__cta { transition: none; } }
@media (max-width: 920px) {
  .la-banq__panel { grid-template-columns: 1fr; padding: 3rem 2rem; margin: -80px 1rem 0; }
  .la-banq__row { grid-template-columns: 1fr; }
}
`;
