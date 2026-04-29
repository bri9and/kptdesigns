"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { meta } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(4),
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
        <header>
          <p className="la-visit__eyebrow">Visit</p>
          <h2 id="la-visit-title" className="la-visit__title">{meta.address.value.split(",")[0]}</h2>
          <p className="la-visit__sub">{meta.address.value}</p>
        </header>
        <dl className="la-visit__meta">
          <div>
            <dt>Phone</dt>
            <dd><a href={`tel:${meta.phone.value.replace(/\D/g, "")}`}>{meta.phone.value}</a></dd>
          </div>
          <div>
            <dt>Hours</dt>
            <dd>{meta.hoursLine.value}</dd>
          </div>
        </dl>
        {!submitted ? (
          <form className="la-visit__form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <label className="la-visit__field"><span>Your name</span><input type="text" {...register("name")} />{errors.name && <em>required</em>}</label>
            <label className="la-visit__field"><span>Email</span><input type="email" {...register("email")} />{errors.email && <em>valid email needed</em>}</label>
            <label className="la-visit__field"><span>Message</span><textarea rows={3} {...register("message")} />{errors.message && <em>add a few words</em>}</label>
            <button type="submit" className="la-visit__cta" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Send message →"}</button>
          </form>
        ) : (
          <div className="la-visit__success">
            <p>Thanks — we'll be in touch soon.</p>
          </div>
        )}
      </div>
      <style>{css}</style>
    </section>
  );
}

const css = `
.la-visit { display: grid; grid-template-columns: 1fr 1fr; min-height: 70vh; background: ${palette.water}; color: ${palette.cream}; }
.la-visit__map { position: relative; min-height: 420px; }
.la-visit__map iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; filter: grayscale(0.4) contrast(0.95); }
.la-visit__panel { padding: 5rem 5vw; max-width: 600px; }
.la-visit__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.dawn}; margin: 0 0 1.25rem; }
.la-visit__title { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(2rem, 4.5vw, 2.8rem); line-height: 1.1; margin: 0 0 0.75rem; }
.la-visit__sub { font-family: ${fonts.display}; font-style: italic; opacity: 0.85; margin: 0 0 2.5rem; }
.la-visit__meta { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; padding: 1.5rem 0; border-top: 1px solid rgba(244,239,223,0.18); border-bottom: 1px solid rgba(244,239,223,0.18); margin: 0 0 2rem; font-family: ${fonts.body}; }
.la-visit__meta dt { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.65; margin: 0 0 0.4rem; }
.la-visit__meta dd { font-size: 0.95rem; margin: 0; }
.la-visit__meta a { color: ${palette.dawn}; text-decoration: none; }
.la-visit__form { display: flex; flex-direction: column; gap: 1rem; font-family: ${fonts.body}; }
.la-visit__field { display: flex; flex-direction: column; gap: 0.3rem; font-size: 0.85rem; }
.la-visit__field span { font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.75; }
.la-visit__field input, .la-visit__field textarea { background: rgba(244,239,223,0.08); border: 1px solid rgba(244,239,223,0.22); color: ${palette.cream}; padding: 0.7rem 0.95rem; border-radius: 3px; font-family: inherit; font-size: 0.92rem; }
.la-visit__field input:focus, .la-visit__field textarea:focus { outline: none; border-color: ${palette.dawn}; box-shadow: 0 0 0 2px rgba(201,169,110,0.22); }
.la-visit__field em { color: ${palette.dawn}; font-style: normal; font-size: 0.72rem; }
.la-visit__cta { background: ${palette.dawn}; color: ${palette.water}; border: none; padding: 0.85rem 1.5rem; border-radius: 999px; font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; align-self: flex-start; }
.la-visit__cta:disabled { opacity: 0.6; cursor: progress; }
.la-visit__success p { font-family: ${fonts.display}; font-style: italic; font-size: 1.1rem; margin: 0; }
@media (max-width: 920px) { .la-visit { grid-template-columns: 1fr; } .la-visit__map { min-height: 320px; } .la-visit__panel { padding: 3rem 2rem; } }
`;
