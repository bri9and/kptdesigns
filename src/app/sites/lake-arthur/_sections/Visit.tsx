"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { meta } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

// v2 visit/contact — paper background, two columns. Map left, info + form
// right. No more water-blue inversion.

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(4, "Add a few words"),
});
type ContactForm = z.infer<typeof schema>;

const MAP_EMBED = "https://www.google.com/maps?q=255+Isle+Rd,+Butler,+PA+16001&output=embed";

export function Visit() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactForm>();

  async function onSubmit(values: ContactForm) {
    await new Promise((r) => setTimeout(r, 600));
    // eslint-disable-next-line no-console
    console.log("[visit:contact]", values);
    setSubmitted(true);
  }

  const phoneHref = `tel:${meta.phone.value.replace(/\D/g, "")}`;
  const mailHref = `mailto:${meta.email.value}`;

  return (
    <section id="visit" className="la-visit" aria-labelledby="la-visit-title">
      <div className="la-visit__map">
        <iframe
          title="Map to Lake Arthur Golf Club"
          src={MAP_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="la-visit__panel">
        <header className="la-visit__head">
          <p className="la-visit__eyebrow">
            <span>VISIT</span>
            <span className="la-visit__rule" aria-hidden="true" />
            <span>BUTLER, PA</span>
          </p>
          <h2 id="la-visit-title" className="la-visit__title">
            Find us on <em>Isle Road.</em>
          </h2>
        </header>
        <dl className="la-visit__meta">
          <div>
            <dt>Address</dt>
            <dd>{meta.address.value}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd><a href={phoneHref}>{meta.phone.value}</a></dd>
          </div>
          <div>
            <dt>Hours</dt>
            <dd>{meta.hoursLine.value}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd><a href={mailHref}>{meta.email.value}</a></dd>
          </div>
        </dl>
        {!submitted ? (
          <form className="la-visit__form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <p className="la-visit__form-eyebrow">SEND A NOTE</p>
            <label className="la-visit__field">
              <span>Your name</span>
              <input type="text" {...register("name")} />
              {errors.name && <em>{errors.name.message}</em>}
            </label>
            <label className="la-visit__field">
              <span>Email</span>
              <input type="email" {...register("email")} />
              {errors.email && <em>{errors.email.message}</em>}
            </label>
            <label className="la-visit__field">
              <span>Message</span>
              <textarea rows={3} {...register("message")} />
              {errors.message && <em>{errors.message.message}</em>}
            </label>
            <div className="la-visit__cta-row">
              <button type="submit" className="la-visit__cta" disabled={isSubmitting}>
                {isSubmitting ? "Sending…" : "Send message →"}
              </button>
            </div>
          </form>
        ) : (
          <div className="la-visit__success">
            <p className="la-visit__form-eyebrow">THANK YOU</p>
            <h3>We'll be in touch soon.</h3>
            <p>Someone from the clubhouse will reach out within a day.</p>
          </div>
        )}
      </div>
      <style>{css}</style>
    </section>
  );
}

const css = `
.la-visit {
  display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
  background: ${palette.paper};
  color: ${palette.ink};
  font-family: ${fonts.body};
  border-top: 1px solid rgba(22,20,15,0.06);
}
.la-visit__map {
  position: relative; min-height: 540px;
  background: ${palette.paperDeep};
}
.la-visit__map iframe {
  position: absolute; inset: 0; width: 100%; height: 100%; border: 0;
  filter: grayscale(0.45) contrast(0.97);
}
.la-visit__panel {
  padding: 5rem 3rem; max-width: 600px;
  display: flex; flex-direction: column; gap: 2rem;
}
.la-visit__head { display: flex; flex-direction: column; gap: 1.25rem; }
.la-visit__eyebrow {
  display: inline-flex; align-items: center; flex-wrap: wrap; gap: 0.65rem;
  font-family: ${fonts.mono}; font-size: 0.65rem; letter-spacing: 0.32em; text-transform: uppercase;
  color: ${palette.ash}; margin: 0;
}
.la-visit__rule { display: inline-block; width: 22px; height: 1px; background: currentColor; opacity: 0.45; }
.la-visit__title {
  font-family: ${fonts.display}; font-weight: 400;
  font-size: clamp(2rem, 4.4vw, 2.8rem); line-height: 1.05;
  letter-spacing: -0.015em; margin: 0;
  font-variation-settings: normal;
}
.la-visit__title em {
  font-style: italic; color: ${palette.moss};
  font-variation-settings: normal;
}
.la-visit__meta {
  display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem 2rem;
  margin: 0;
  padding: 1.75rem 0;
  border-top: 1px solid rgba(22,20,15,0.18);
  border-bottom: 1px solid rgba(22,20,15,0.18);
}
.la-visit__meta div { display: flex; flex-direction: column; gap: 0.4rem; }
.la-visit__meta dt {
  font-family: ${fonts.mono}; font-size: 0.62rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: ${palette.ash}; margin: 0;
}
.la-visit__meta dd {
  font-family: ${fonts.body}; font-size: 0.95rem; line-height: 1.5;
  color: ${palette.ink}; margin: 0;
}
.la-visit__meta a {
  color: ${palette.moss}; text-decoration: none;
  border-bottom: 1px solid currentColor; padding-bottom: 1px;
}
.la-visit__meta a:hover { color: ${palette.ink}; }
.la-visit__form { display: flex; flex-direction: column; gap: 1.1rem; }
.la-visit__form-eyebrow {
  font-family: ${fonts.mono}; font-size: 0.62rem; letter-spacing: 0.32em; text-transform: uppercase;
  color: ${palette.ash}; margin: 0;
}
.la-visit__field { display: flex; flex-direction: column; gap: 0.5rem; }
.la-visit__field span {
  font-family: ${fonts.mono}; font-size: 0.62rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: ${palette.ash};
}
.la-visit__field input, .la-visit__field textarea {
  background: ${palette.bone};
  border: 1px solid rgba(22,20,15,0.18);
  color: ${palette.ink};
  padding: 0.78rem 0.95rem; border-radius: 2px;
  font-family: ${fonts.body}; font-size: 0.95rem;
  resize: vertical;
}
.la-visit__field input:focus, .la-visit__field textarea:focus {
  outline: none; border-color: ${palette.moss};
  box-shadow: 0 0 0 2px rgba(31,55,37,0.18);
}
.la-visit__field em {
  color: ${palette.brick}; font-family: ${fonts.mono};
  font-size: 0.68rem; font-style: normal; letter-spacing: 0.16em; text-transform: uppercase;
}
.la-visit__cta-row { display: flex; justify-content: flex-end; padding-top: 0.25rem; }
.la-visit__cta {
  background: ${palette.moss}; color: ${palette.bone};
  border: none;
  padding: 0.9rem 1.5rem; border-radius: 999px;
  font-family: ${fonts.mono}; font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase;
  cursor: pointer;
  transition: background 180ms, transform 180ms;
}
.la-visit__cta:hover:not(:disabled) { background: ${palette.mossDeep}; transform: translateY(-1px); }
.la-visit__cta:disabled { opacity: 0.6; cursor: progress; }
.la-visit__cta:focus-visible { outline: 2px solid ${palette.brick}; outline-offset: 2px; }
.la-visit__success { display: flex; flex-direction: column; gap: 0.75rem; padding: 0.5rem 0; }
.la-visit__success h3 {
  font-family: ${fonts.display}; font-weight: 400;
  font-size: 1.5rem; line-height: 1.2; margin: 0;
  color: ${palette.moss};
  font-variation-settings: normal;
}
.la-visit__success p {
  font-family: ${fonts.body}; font-size: 0.96rem; line-height: 1.55;
  color: ${palette.ink}; opacity: 0.78; margin: 0; max-width: 44ch;
}
@media (prefers-reduced-motion: reduce) {
  .la-visit__cta { transition: none; }
}
@media (max-width: 920px) {
  .la-visit { grid-template-columns: 1fr; }
  .la-visit__map { min-height: 320px; }
  .la-visit__panel { padding: 3rem 1.25rem; max-width: none; }
  .la-visit__meta { grid-template-columns: 1fr; gap: 1.25rem; }
  .la-visit__cta-row { justify-content: stretch; }
  .la-visit__cta-row .la-visit__cta { width: 100%; text-align: center; }
}
`;
