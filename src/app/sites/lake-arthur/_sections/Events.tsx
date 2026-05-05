"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { eventCategories, tournaments, leagues } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

// Consolidated events block — replaces the v1 Banquets / Tournaments /
// Leagues sections. Three category cards on top; below, three small
// inline forms gated by anchor (#banquets / #tournaments / #leagues).

const banquetSchema = z.object({
  eventType: z.enum(["wedding", "corporate", "tournament", "private", "other"]),
  date: z.string().min(1, "Pick a date"),
  headcount: z.coerce.number().min(1, "Headcount required"),
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone required"),
  vision: z.string().optional(),
});
type BanquetForm = z.infer<typeof banquetSchema>;

const tournamentSchema = z.object({
  format: z.string().min(1),
  date: z.string().min(1, "Pick a date"),
  headcount: z.coerce.number().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  notes: z.string().optional(),
});
type TournamentForm = z.infer<typeof tournamentSchema>;

const leagueSchema = z.object({
  league: z.string().min(1),
  name: z.string().min(2, "Name required"),
  email: z.string().email(),
  phone: z.string().min(7),
});
type LeagueForm = z.infer<typeof leagueSchema>;

export function Events() {
  return (
    <section id="events" className="la-ev" aria-labelledby="la-ev-title">
      <header className="la-ev__intro">
        <p className="la-ev__eyebrow">
          <span>EVENTS</span>
          <span className="la-ev__rule" aria-hidden="true" />
          <span>03</span>
        </p>
        <h2 id="la-ev-title" className="la-ev__title">
          Beyond the <em>round.</em>
        </h2>
      </header>
      <ul className="la-ev__grid">
        {eventCategories.map((cat) => (
          <li key={cat.slug} className="la-ev__card">
            <div className="la-ev__photo-wrap">
              <img
                className="la-ev__photo"
                src={cat.photo}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="la-ev__card-eyebrow">{cat.eyebrow}</p>
            <h3 className="la-ev__card-title">{cat.title}</h3>
            <p className="la-ev__card-body">{cat.body}</p>
            <a href={cat.anchor} className="la-ev__card-cta">{cat.cta} →</a>
          </li>
        ))}
      </ul>

      <BanquetsBlock />
      <TournamentsBlock />
      <LeaguesBlock />
      <style>{css}</style>
    </section>
  );
}

// — Banquets inline form ————————————————————————————

function BanquetsBlock() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BanquetForm>();

  async function onSubmit(values: BanquetForm) {
    await new Promise((r) => setTimeout(r, 600));
    // eslint-disable-next-line no-console
    console.log("[events:banquets]", values);
    setSubmitted(true);
  }

  return (
    <div id="banquets" className="la-ev__block" aria-labelledby="la-ev-banq-title">
      <header className="la-ev__block-head">
        <p className="la-ev__block-eyebrow">BANQUETS &amp; WEDDINGS · INQUIRY</p>
        <h3 id="la-ev-banq-title" className="la-ev__block-title">
          Tell us about your <em>event.</em>
        </h3>
      </header>
      {!submitted ? (
        <form onSubmit={handleSubmit(onSubmit)} className="la-ev__form" noValidate>
          <label className="la-ev__field la-ev__field--inline">
            <span>Event type</span>
            <select {...register("eventType")} defaultValue="wedding">
              <option value="wedding">Wedding</option>
              <option value="corporate">Corporate</option>
              <option value="tournament">Charity tournament</option>
              <option value="private">Private dinner</option>
              <option value="other">Other</option>
            </select>
          </label>
          <div className="la-ev__row">
            <label className="la-ev__field">
              <span>Date</span>
              <input type="date" {...register("date")} />
              {errors.date && <em>{errors.date.message}</em>}
            </label>
            <label className="la-ev__field">
              <span>Headcount</span>
              <input type="number" min={1} {...register("headcount", { valueAsNumber: true })} />
              {errors.headcount && <em>{errors.headcount.message}</em>}
            </label>
          </div>
          <label className="la-ev__field la-ev__field--inline">
            <span>Your name</span>
            <input type="text" {...register("name")} />
            {errors.name && <em>{errors.name.message}</em>}
          </label>
          <div className="la-ev__row">
            <label className="la-ev__field">
              <span>Email</span>
              <input type="email" {...register("email")} />
              {errors.email && <em>{errors.email.message}</em>}
            </label>
            <label className="la-ev__field">
              <span>Phone</span>
              <input type="tel" {...register("phone")} />
              {errors.phone && <em>{errors.phone.message}</em>}
            </label>
          </div>
          <label className="la-ev__field la-ev__field--inline">
            <span>Tell us about your vision (optional)</span>
            <textarea rows={3} {...register("vision")} />
          </label>
          <div className="la-ev__cta-row">
            <button type="submit" className="la-ev__cta" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Send inquiry →"}
            </button>
          </div>
        </form>
      ) : (
        <div className="la-ev__success">
          <p className="la-ev__block-eyebrow">THANK YOU</p>
          <h4>We'll be in touch within 24 hours.</h4>
          <p>Pat from our events team will reach out to walk through dates and packages.</p>
        </div>
      )}
    </div>
  );
}

// — Tournaments inline form ————————————————————————————

function TournamentsBlock() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TournamentForm>({
    defaultValues: { format: tournaments[0]?.slug ?? "" },
  });

  async function onSubmit(values: TournamentForm) {
    await new Promise((r) => setTimeout(r, 600));
    // eslint-disable-next-line no-console
    console.log("[events:tournaments]", values);
    setSubmitted(true);
  }

  return (
    <div id="tournaments" className="la-ev__block" aria-labelledby="la-ev-tour-title">
      <header className="la-ev__block-head">
        <p className="la-ev__block-eyebrow">TOURNAMENTS · QUOTE</p>
        <h3 id="la-ev-tour-title" className="la-ev__block-title">
          Run it <em>here.</em>
        </h3>
      </header>
      {!submitted ? (
        <form onSubmit={handleSubmit(onSubmit)} className="la-ev__form" noValidate>
          <label className="la-ev__field la-ev__field--inline">
            <span>Format</span>
            <select {...register("format")}>
              {tournaments.map((t) => (
                <option key={t.slug} value={t.slug}>{t.title}</option>
              ))}
            </select>
          </label>
          <div className="la-ev__row">
            <label className="la-ev__field">
              <span>Target date</span>
              <input type="date" {...register("date")} />
              {errors.date && <em>required</em>}
            </label>
            <label className="la-ev__field">
              <span>Players</span>
              <input type="number" min={1} {...register("headcount", { valueAsNumber: true })} />
              {errors.headcount && <em>required</em>}
            </label>
          </div>
          <div className="la-ev__row">
            <label className="la-ev__field">
              <span>Name</span>
              <input type="text" {...register("name")} />
              {errors.name && <em>required</em>}
            </label>
            <label className="la-ev__field">
              <span>Email</span>
              <input type="email" {...register("email")} />
              {errors.email && <em>required</em>}
            </label>
          </div>
          <div className="la-ev__row">
            <label className="la-ev__field">
              <span>Phone</span>
              <input type="tel" {...register("phone")} />
              {errors.phone && <em>required</em>}
            </label>
            <label className="la-ev__field">
              <span>Notes (optional)</span>
              <input type="text" {...register("notes")} />
            </label>
          </div>
          <div className="la-ev__cta-row">
            <button type="submit" className="la-ev__cta" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Request a quote →"}
            </button>
          </div>
        </form>
      ) : (
        <div className="la-ev__success">
          <p className="la-ev__block-eyebrow">THANK YOU</p>
          <h4>We'll send a quote within two business days.</h4>
        </div>
      )}
    </div>
  );
}

// — Leagues inline form ————————————————————————————

function LeaguesBlock() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LeagueForm>({
    defaultValues: { league: leagues[0]?.slug ?? "" },
  });

  async function onSubmit(values: LeagueForm) {
    await new Promise((r) => setTimeout(r, 500));
    // eslint-disable-next-line no-console
    console.log("[events:leagues]", values);
    setSubmitted(true);
  }

  return (
    <div id="leagues" className="la-ev__block" aria-labelledby="la-ev-lg-title">
      <header className="la-ev__block-head">
        <p className="la-ev__block-eyebrow">WEEKLY LEAGUES · SIGN-UP</p>
        <h3 id="la-ev-lg-title" className="la-ev__block-title">
          Find your <em>group.</em>
        </h3>
      </header>
      {!submitted ? (
        <form onSubmit={handleSubmit(onSubmit)} className="la-ev__form" noValidate>
          <label className="la-ev__field la-ev__field--inline">
            <span>League</span>
            <select {...register("league")}>
              {leagues.map((l) => (
                <option key={l.slug} value={l.slug}>
                  {l.title} — {l.schedule.value}
                </option>
              ))}
            </select>
          </label>
          <label className="la-ev__field la-ev__field--inline">
            <span>Name</span>
            <input type="text" {...register("name")} />
            {errors.name && <em>{errors.name.message}</em>}
          </label>
          <div className="la-ev__row">
            <label className="la-ev__field">
              <span>Email</span>
              <input type="email" {...register("email")} />
              {errors.email && <em>required</em>}
            </label>
            <label className="la-ev__field">
              <span>Phone</span>
              <input type="tel" {...register("phone")} />
              {errors.phone && <em>required</em>}
            </label>
          </div>
          <div className="la-ev__cta-row">
            <button type="submit" className="la-ev__cta" disabled={isSubmitting}>
              {isSubmitting ? "Adding…" : "Add me →"}
            </button>
          </div>
        </form>
      ) : (
        <div className="la-ev__success">
          <p className="la-ev__block-eyebrow">WELCOME</p>
          <h4>We've added you to the roster.</h4>
        </div>
      )}
    </div>
  );
}

const css = `
.la-ev {
  background: ${palette.paper};
  color: ${palette.ink};
  padding: 6rem 2.5rem;
  font-family: ${fonts.body};
  border-top: 1px solid rgba(22,20,15,0.06);
}
.la-ev__intro {
  max-width: 1180px; margin: 0 auto 3.5rem;
  display: flex; flex-direction: column; gap: 1.25rem;
}
.la-ev__eyebrow {
  display: inline-flex; align-items: center; flex-wrap: wrap; gap: 0.65rem;
  font-family: ${fonts.mono}; font-size: 0.65rem; letter-spacing: 0.32em; text-transform: uppercase;
  color: ${palette.ash}; margin: 0;
}
.la-ev__rule { display: inline-block; width: 22px; height: 1px; background: currentColor; opacity: 0.45; }
.la-ev__title {
  font-family: ${fonts.display}; font-weight: 400;
  font-size: clamp(2rem, 4.4vw, 3rem); line-height: 1.05;
  letter-spacing: -0.015em; margin: 0; max-width: 18ch;
  font-variation-settings: normal;
}
.la-ev__title em {
  font-style: italic; color: ${palette.moss};
  font-variation-settings: normal;
}
.la-ev__grid {
  list-style: none; padding: 0; margin: 0 auto;
  max-width: 1180px;
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;
}
.la-ev__card { display: flex; flex-direction: column; gap: 0.85rem; }
.la-ev__photo-wrap {
  position: relative; aspect-ratio: 3/4;
  background: ${palette.paperDeep}; overflow: hidden; border-radius: 2px;
  margin: 0 0 0.4rem;
}
.la-ev__photo {
  width: 100%; height: 100%; object-fit: cover; display: block;
  filter: saturate(1.04);
  transition: transform 700ms ${"cubic-bezier(0.22,0.96,0.32,1)"};
}
.la-ev__card:hover .la-ev__photo { transform: scale(1.03); }
.la-ev__card-eyebrow {
  font-family: ${fonts.mono}; font-size: 0.62rem; letter-spacing: 0.24em; text-transform: uppercase;
  color: ${palette.ash}; margin: 0;
}
.la-ev__card-title {
  font-family: ${fonts.display}; font-weight: 500;
  font-size: 1.5rem; line-height: 1.15; margin: 0;
  color: ${palette.moss};
  font-variation-settings: normal;
}
.la-ev__card-body {
  font-family: ${fonts.body}; font-size: 0.96rem; line-height: 1.6;
  color: ${palette.ink}; opacity: 0.78; margin: 0; max-width: 36ch;
}
.la-ev__card-cta {
  font-family: ${fonts.mono}; font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: ${palette.moss}; text-decoration: none;
  border-bottom: 1px solid currentColor; padding-bottom: 0.2rem;
  align-self: flex-start; margin-top: 0.4rem;
  transition: color 180ms;
}
.la-ev__card-cta:hover { color: ${palette.ink}; }
.la-ev__card-cta:focus-visible { outline: 2px solid ${palette.brick}; outline-offset: 2px; }

.la-ev__block {
  max-width: 760px; margin: 5rem auto 0;
  padding: 3rem 0 0;
  border-top: 1px solid rgba(22,20,15,0.18);
  scroll-margin-top: 90px;
}
.la-ev__block-head { display: flex; flex-direction: column; gap: 1rem; margin: 0 0 2rem; }
.la-ev__block-eyebrow {
  font-family: ${fonts.mono}; font-size: 0.65rem; letter-spacing: 0.32em; text-transform: uppercase;
  color: ${palette.ash}; margin: 0;
}
.la-ev__block-title {
  font-family: ${fonts.display}; font-weight: 400;
  font-size: clamp(1.7rem, 3.4vw, 2.4rem); line-height: 1.05;
  letter-spacing: -0.015em; margin: 0;
  font-variation-settings: normal;
}
.la-ev__block-title em {
  font-style: italic; color: ${palette.moss};
  font-variation-settings: normal;
}
.la-ev__form { display: flex; flex-direction: column; gap: 1.25rem; }
.la-ev__row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
.la-ev__field { display: flex; flex-direction: column; gap: 0.5rem; }
.la-ev__field span {
  font-family: ${fonts.mono}; font-size: 0.62rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: ${palette.ash};
}
.la-ev__field input, .la-ev__field select, .la-ev__field textarea {
  background: ${palette.bone};
  border: 1px solid rgba(22,20,15,0.18);
  color: ${palette.ink};
  padding: 0.85rem 1rem; border-radius: 2px;
  font-family: ${fonts.body}; font-size: 0.95rem;
  resize: vertical;
}
.la-ev__field input:focus, .la-ev__field select:focus, .la-ev__field textarea:focus {
  outline: none; border-color: ${palette.moss};
  box-shadow: 0 0 0 2px rgba(31,55,37,0.18);
}
.la-ev__field em {
  color: ${palette.brick}; font-family: ${fonts.mono};
  font-size: 0.68rem; font-style: normal; letter-spacing: 0.16em; text-transform: uppercase;
}
.la-ev__field--inline { grid-column: 1 / -1; }
.la-ev__cta-row { display: flex; justify-content: flex-end; padding-top: 0.5rem; }
.la-ev__cta {
  background: ${palette.moss}; color: ${palette.bone};
  border: none;
  padding: 0.95rem 1.6rem; border-radius: 999px;
  font-family: ${fonts.mono}; font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase;
  cursor: pointer;
  transition: background 180ms, transform 180ms;
}
.la-ev__cta:hover:not(:disabled) { background: ${palette.mossDeep}; transform: translateY(-1px); }
.la-ev__cta:disabled { opacity: 0.6; cursor: progress; }
.la-ev__cta:focus-visible { outline: 2px solid ${palette.brick}; outline-offset: 2px; }
.la-ev__success { display: flex; flex-direction: column; gap: 0.85rem; }
.la-ev__success h4 {
  font-family: ${fonts.display}; font-weight: 400;
  font-size: 1.45rem; line-height: 1.2; margin: 0;
  color: ${palette.moss};
  font-variation-settings: normal;
}
.la-ev__success p {
  font-family: ${fonts.body}; font-size: 0.96rem; line-height: 1.55;
  color: ${palette.ink}; opacity: 0.78; margin: 0; max-width: 50ch;
}
@media (prefers-reduced-motion: reduce) {
  .la-ev__photo { transition: none; transform: none; }
  .la-ev__cta { transition: none; }
}
@media (max-width: 920px) {
  .la-ev { padding: 4rem 1.25rem; }
  .la-ev__grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .la-ev__row { grid-template-columns: 1fr; }
  .la-ev__cta-row { justify-content: stretch; }
  .la-ev__cta-row .la-ev__cta { width: 100%; text-align: center; }
}
`;
