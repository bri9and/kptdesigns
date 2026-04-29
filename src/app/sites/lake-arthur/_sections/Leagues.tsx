"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { leagues } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email(),
  phone: z.string().min(7),
});
type SignupForm = z.infer<typeof schema>;

export function Leagues() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [confirmedSlug, setConfirmedSlug] = useState<string | null>(null);

  return (
    <section id="leagues" className="la-lg" aria-labelledby="la-lg-title">
      <header className="la-lg__intro">
        <p className="la-lg__eyebrow">Leagues</p>
        <h2 id="la-lg-title" className="la-lg__title">Find your weekly group.</h2>
        <p className="la-lg__lede">
          Four leagues, four nights, four very different vibes. Sign up
          here and we'll add you to the roster before the season starts.
        </p>
      </header>
      <div className="la-lg__grid">
        {leagues.map((l) => (
          <article key={l.slug} className="la-lg__card">
            <h3 className="la-lg__card-title">{l.title}</h3>
            <dl className="la-lg__card-meta">
              <div><dt>When</dt><dd>{l.schedule.value}</dd></div>
              <div><dt>Season</dt><dd>{l.season.value}</dd></div>
              <div><dt>Fee</dt><dd>{l.fee.value}</dd></div>
            </dl>
            {confirmedSlug === l.slug ? (
              <div className="la-lg__confirmed">
                <p>Welcome — we've added you to the roster.</p>
              </div>
            ) : openSlug === l.slug ? (
              <SignupForm onClose={() => setOpenSlug(null)} onSuccess={() => { setConfirmedSlug(l.slug); setOpenSlug(null); }} slug={l.slug} />
            ) : (
              <button
                type="button"
                className="la-lg__cta"
                onClick={() => setOpenSlug(l.slug)}
              >
                Sign up →
              </button>
            )}
          </article>
        ))}
      </div>
      <style>{css}</style>
    </section>
  );
}

function SignupForm({ slug, onClose, onSuccess }: { slug: string; onClose: () => void; onSuccess: () => void }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupForm>();

  async function onSubmit(values: SignupForm) {
    await new Promise((r) => setTimeout(r, 600));
    // eslint-disable-next-line no-console
    console.log(`[leagues:${slug}] signup`, values);
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="la-lg__form" noValidate>
      <label className="la-lg__field">
        <span>Name</span>
        <input type="text" {...register("name")} />
        {errors.name && <em>{errors.name.message}</em>}
      </label>
      <label className="la-lg__field">
        <span>Email</span>
        <input type="email" {...register("email")} />
        {errors.email && <em>{errors.email.message}</em>}
      </label>
      <label className="la-lg__field">
        <span>Phone</span>
        <input type="tel" {...register("phone")} />
      </label>
      <div className="la-lg__form-row">
        <button type="button" className="la-lg__back" onClick={onClose}>Cancel</button>
        <button type="submit" className="la-lg__cta" disabled={isSubmitting}>
          {isSubmitting ? "Adding…" : "Add me"}
        </button>
      </div>
    </form>
  );
}

const css = `
.la-lg { padding: 7rem 5vw; background: ${palette.cream}; color: ${palette.charcoal}; }
.la-lg__intro { max-width: 640px; margin: 0 auto 4rem; text-align: center; }
.la-lg__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.fairway}; margin: 0 0 1.25rem; }
.la-lg__title { font-family: ${fonts.display}; font-size: clamp(2.2rem, 5vw, 3.2rem); font-weight: 400; line-height: 1.1; color: ${palette.water}; margin: 0 0 1.25rem; }
.la-lg__lede { font-family: ${fonts.display}; font-style: italic; font-size: 1.05rem; line-height: 1.65; margin: 0; color: ${palette.smoke}; }
.la-lg__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; max-width: 1180px; margin: 0 auto; }
.la-lg__card { background: ${palette.paper}; border: 1px solid rgba(26,26,26,0.1); border-radius: 4px; padding: 2.25rem 2rem; display: flex; flex-direction: column; gap: 1.25rem; font-family: ${fonts.body}; }
.la-lg__card-title { font-family: ${fonts.display}; font-weight: 400; font-size: 1.7rem; color: ${palette.water}; margin: 0; }
.la-lg__card-meta { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem; margin: 0; padding: 1rem 0; border-top: 1px solid rgba(26,26,26,0.12); border-bottom: 1px solid rgba(26,26,26,0.12); }
.la-lg__card-meta dt { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: ${palette.smoke}; margin: 0 0 0.3rem; }
.la-lg__card-meta dd { font-size: 0.85rem; line-height: 1.45; margin: 0; }
.la-lg__cta { background: ${palette.fairway}; color: ${palette.cream}; border: none; padding: 0.85rem 1.5rem; border-radius: 999px; font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; align-self: flex-start; transition: background 180ms; }
.la-lg__cta:hover { background: ${palette.fairwayDeep}; }
.la-lg__cta:focus-visible { outline: 2px solid ${palette.dawn}; outline-offset: 2px; }
.la-lg__back { background: transparent; color: ${palette.smoke}; border: 1px solid rgba(26,26,26,0.18); padding: 0.78rem 1.4rem; border-radius: 999px; font-size: 0.78rem; letter-spacing: 0.16em; text-transform: uppercase; cursor: pointer; }
.la-lg__form { display: flex; flex-direction: column; gap: 0.85rem; }
.la-lg__field { display: flex; flex-direction: column; gap: 0.3rem; font-size: 0.85rem; }
.la-lg__field span { font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: ${palette.smoke}; }
.la-lg__field input { background: ${palette.white}; border: 1px solid rgba(26,26,26,0.18); padding: 0.7rem 0.9rem; border-radius: 3px; font-family: inherit; font-size: 0.92rem; }
.la-lg__field input:focus { outline: none; border-color: ${palette.dawn}; box-shadow: 0 0 0 2px rgba(201,169,110,0.22); }
.la-lg__field em { color: #A03A2A; font-style: normal; font-size: 0.72rem; }
.la-lg__form-row { display: flex; justify-content: flex-end; gap: 0.75rem; }
.la-lg__confirmed { padding: 1rem; background: rgba(44,85,48,0.08); border: 1px solid ${palette.fairway}; border-radius: 4px; font-family: ${fonts.display}; font-style: italic; color: ${palette.fairwayDeep}; }
.la-lg__confirmed p { margin: 0; }
@media (max-width: 720px) {
  .la-lg__grid { grid-template-columns: 1fr; }
  .la-lg__card-meta { grid-template-columns: 1fr; }
}
`;
