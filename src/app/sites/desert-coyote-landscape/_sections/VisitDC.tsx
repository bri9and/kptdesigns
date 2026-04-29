"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { meta } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(4, "Tell us a bit more"),
});
type ContactForm = z.infer<typeof schema>;

const MAP_EMBED = "https://www.google.com/maps?q=Mesa,+AZ&output=embed";

export function VisitDC() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactForm>();

  async function onSubmit(values: ContactForm) {
    await new Promise((r) => setTimeout(r, 600));
    // eslint-disable-next-line no-console
    console.log("[visit:contact]", values);
    setSubmitted(true);
  }

  return (
    <section id="visit" className="dc-visit" aria-labelledby="dc-visit-title">
      <div className="dc-visit__map">
        <iframe
          title="Service area map for Desert Coyote Landscape"
          src={MAP_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="dc-visit__panel">
        <header>
          <p className="dc-visit__eyebrow">Visit / contact</p>
          <h2 id="dc-visit-title" className="dc-visit__title">East Valley, AZ.</h2>
          <p className="dc-visit__sub">{meta.serviceArea.value}</p>
        </header>
        <dl className="dc-visit__meta">
          <div>
            <dt>Phone</dt>
            <dd><a href={`tel:${meta.phoneRaw.value}`}>{meta.phone.value}</a></dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd><a href={`mailto:${meta.email.value}`}>{meta.email.value}</a></dd>
          </div>
          <div className="dc-visit__hours">
            <dt>Hours</dt>
            <dd>
              {meta.hoursLine.value}
              {meta.hoursLine.isPlaceholder && (
                <sup className="dc-visit__placeholder" title="Placeholder — owner to confirm">*</sup>
              )}
            </dd>
          </div>
        </dl>
        {!submitted ? (
          <form className="dc-visit__form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <label className="dc-visit__field">
              <span>Your name</span>
              <input type="text" autoComplete="name" {...register("name")} />
              {errors.name && <em>{errors.name.message}</em>}
            </label>
            <label className="dc-visit__field">
              <span>Email</span>
              <input type="email" autoComplete="email" {...register("email")} />
              {errors.email && <em>{errors.email.message}</em>}
            </label>
            <label className="dc-visit__field">
              <span>Message</span>
              <textarea rows={4} {...register("message")} />
              {errors.message && <em>{errors.message.message}</em>}
            </label>
            <button type="submit" className="dc-visit__cta" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Send message →"}
            </button>
          </form>
        ) : (
          <div className="dc-visit__success">
            <p>Thanks — we'll respond within one business day.</p>
          </div>
        )}
      </div>
      <style>{css}</style>
    </section>
  );
}

const css = `
.dc-visit { display: grid; grid-template-columns: 1fr 1fr; min-height: 70vh; background: ${palette.rock}; color: ${palette.paper}; }
.dc-visit__map { position: relative; min-height: 420px; }
.dc-visit__map iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; filter: grayscale(0.35) contrast(0.95) sepia(0.15); }
.dc-visit__panel { padding: 5rem 5vw; max-width: 600px; }
.dc-visit__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.sunGold}; margin: 0 0 1.25rem; }
.dc-visit__title { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(2rem, 4.5vw, 2.8rem); line-height: 1.1; margin: 0 0 0.75rem; }
.dc-visit__sub { font-family: ${fonts.display}; font-style: italic; opacity: 0.85; margin: 0 0 2.5rem; line-height: 1.5; }
.dc-visit__meta { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; padding: 1.5rem 0; border-top: 1px solid rgba(245,239,223,0.18); border-bottom: 1px solid rgba(245,239,223,0.18); margin: 0 0 2rem; font-family: ${fonts.body}; }
.dc-visit__hours { grid-column: 1 / -1; }
.dc-visit__meta dt { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.65; margin: 0 0 0.4rem; }
.dc-visit__meta dd { font-size: 0.95rem; margin: 0; }
.dc-visit__meta a { color: ${palette.sunGold}; text-decoration: none; border-bottom: 1px solid transparent; }
.dc-visit__meta a:hover, .dc-visit__meta a:focus-visible { border-color: currentColor; outline: none; }
.dc-visit__placeholder { color: ${palette.sunGold}; font-size: 0.65em; vertical-align: super; padding-left: 0.15rem; }
.dc-visit__form { display: flex; flex-direction: column; gap: 1rem; font-family: ${fonts.body}; }
.dc-visit__field { display: flex; flex-direction: column; gap: 0.3rem; font-size: 0.85rem; }
.dc-visit__field span { font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.78; }
.dc-visit__field input, .dc-visit__field textarea { background: rgba(245,239,223,0.08); border: 1px solid rgba(245,239,223,0.22); color: ${palette.paper}; padding: 0.7rem 0.95rem; border-radius: 3px; font-family: inherit; font-size: 0.92rem; resize: vertical; }
.dc-visit__field input:focus, .dc-visit__field textarea:focus { outline: none; border-color: ${palette.sunGold}; box-shadow: 0 0 0 2px rgba(212,168,87,0.28); }
.dc-visit__field em { color: ${palette.sunGold}; font-style: normal; font-size: 0.72rem; }
.dc-visit__cta { background: ${palette.sunGold}; color: ${palette.rock}; border: none; padding: 0.85rem 1.5rem; border-radius: 999px; font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; align-self: flex-start; font-weight: 600; transition: transform 180ms, box-shadow 180ms; }
.dc-visit__cta:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(212,168,87,0.4); }
.dc-visit__cta:disabled { opacity: 0.6; cursor: progress; }
.dc-visit__cta:focus-visible { outline: 2px solid ${palette.paper}; outline-offset: 2px; }
.dc-visit__success p { font-family: ${fonts.display}; font-style: italic; font-size: 1.15rem; margin: 0; line-height: 1.55; }
@media (prefers-reduced-motion: reduce) { .dc-visit__cta { transition: none; } .dc-visit__cta:hover { transform: none; } }
@media (max-width: 920px) { .dc-visit { grid-template-columns: 1fr; } .dc-visit__map { min-height: 320px; } .dc-visit__panel { padding: 3rem 2rem; } }
`;
