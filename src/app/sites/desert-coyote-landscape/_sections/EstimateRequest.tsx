"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { palette, fonts } from "../_lib/tokens";
import { fakeSubmitQuote } from "../_lib/quote-demo";

// THE primary conversion. Two columns: left pitch + reassurance, right
// 4-field form. Background bgDeep so the section visibly rises out of
// the surrounding bg cream. Terra CTA. Clean success state with mono
// ticket id below.

const schema = z.object({
  name:  z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone required"),
  notes: z.string().optional(),
});
type FormShape = z.infer<typeof schema>;

export function EstimateRequest() {
  const [ticket, setTicket] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormShape>({
    defaultValues: { name: "", email: "", phone: "", notes: "" },
  });

  async function onSubmit(data: FormShape) {
    const parsed = schema.safeParse(data);
    if (!parsed.success) return;
    setSubmitting(true);
    try {
      const result = await fakeSubmitQuote({
        projectType: parsed.data.notes?.trim() || "Free estimate request",
        size: "not-specified",
        contact: {
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
        },
      });
      setTicket(result.ticketId);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="estimates" className="dc2-est" aria-labelledby="dc2-est-title">
      <div className="dc2-est__inner">
        <div className="dc2-est__left">
          <p className="dc2-est__eyebrow">FREE ESTIMATES · BY APPOINTMENT</p>
          <h2 id="dc2-est-title" className="dc2-est__title">
            Free estimates by appointment.
          </h2>
          <p className="dc2-est__lede">
            We'll come out, listen, and write it up. No pressure, no theater.
            One business day to get back to you.
          </p>
          <ul className="dc2-est__bullets">
            <li>We walk the yard with you — bring questions.</li>
            <li>Written estimate inside 48 hours.</li>
            <li>If we're not the right fit, we'll say so.</li>
          </ul>
        </div>

        <div className="dc2-est__right">
          {!ticket && (
            <form onSubmit={form.handleSubmit(onSubmit)} className="dc2-est__form" noValidate>
              <label className="dc2-est__field">
                <span>Name</span>
                <input
                  type="text"
                  autoComplete="name"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <em>{form.formState.errors.name.message}</em>
                )}
              </label>
              <label className="dc2-est__field">
                <span>Email</span>
                <input
                  type="email"
                  autoComplete="email"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <em>{form.formState.errors.email.message}</em>
                )}
              </label>
              <label className="dc2-est__field">
                <span>Phone</span>
                <input
                  type="tel"
                  autoComplete="tel"
                  {...form.register("phone")}
                />
                {form.formState.errors.phone && (
                  <em>{form.formState.errors.phone.message}</em>
                )}
              </label>
              <label className="dc2-est__field">
                <span>Project notes</span>
                <textarea
                  rows={4}
                  placeholder="What you're thinking — paver patio, sod replacement, irrigation tune-up, trailer rental, etc."
                  {...form.register("notes")}
                />
              </label>
              <button
                type="submit"
                className="dc2-est__cta"
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Request free estimate →"}
              </button>
            </form>
          )}

          {ticket && (
            <div className="dc2-est__success" role="status" aria-live="polite">
              <p className="dc2-est__success-headline">
                Thanks. We'll call you within one business day.
              </p>
              <p className="dc2-est__ticket">
                <span>TICKET</span>
                <code>{ticket}</code>
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{css}</style>
    </section>
  );
}

const css = `
.dc2-est {
  background: ${palette.bgDeep};
  color: ${palette.ink};
  padding: 6rem 5vw 7rem;
  font-family: ${fonts.body};
}
.dc2-est__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}
.dc2-est__eyebrow {
  font-family: ${fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  color: ${palette.terra};
  margin: 0 0 1.25rem;
  text-transform: uppercase;
}
.dc2-est__title {
  font-family: ${fonts.display};
  font-weight: 700;
  font-stretch: 80%;
  font-size: clamp(2.4rem, 5.5vw, 4rem);
  line-height: 0.98;
  letter-spacing: -0.02em;
  margin: 0 0 1.5rem;
  color: ${palette.ink};
  max-width: 16ch;
}
.dc2-est__lede {
  font-size: 1.05rem;
  line-height: 1.55;
  color: ${palette.ink};
  opacity: 0.82;
  max-width: 44ch;
  margin: 0 0 2rem;
}
.dc2-est__bullets {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 0.75rem;
}
.dc2-est__bullets li {
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${palette.ink};
  opacity: 0.82;
  padding-left: 1.4rem;
  position: relative;
}
.dc2-est__bullets li::before {
  content: "";
  position: absolute; left: 0; top: 0.7em;
  width: 10px; height: 2px;
  background: ${palette.terra};
}

.dc2-est__right {
  background: ${palette.paper};
  border: 1px solid rgba(27,26,23,0.1);
  border-radius: 6px;
  padding: 2.25rem;
  box-shadow: 0 14px 40px rgba(27,26,23,0.06);
}
.dc2-est__form {
  display: flex; flex-direction: column; gap: 1.25rem;
}
.dc2-est__field {
  display: flex; flex-direction: column; gap: 0.4rem;
}
.dc2-est__field span {
  font-family: ${fonts.mono};
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${palette.dust};
}
.dc2-est__field input, .dc2-est__field textarea {
  background: ${palette.white};
  border: 1px solid rgba(27,26,23,0.18);
  color: ${palette.ink};
  padding: 0.85rem 1rem;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.98rem;
  resize: vertical;
}
.dc2-est__field input:focus, .dc2-est__field textarea:focus {
  outline: none;
  border-color: ${palette.terra};
  box-shadow: 0 0 0 2px rgba(156,74,42,0.22);
}
.dc2-est__field em {
  font-style: normal;
  color: ${palette.terra};
  font-size: 0.78rem;
}
.dc2-est__cta {
  background: ${palette.terra};
  color: ${palette.paper};
  border: none;
  padding: 1rem 1.4rem;
  border-radius: 999px;
  font-family: ${fonts.body};
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease;
  margin-top: 0.5rem;
  align-self: flex-start;
}
.dc2-est__cta:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 26px rgba(156,74,42,0.32);
}
.dc2-est__cta:disabled { opacity: 0.6; cursor: progress; }
.dc2-est__cta:focus-visible { outline: 2px solid ${palette.ink}; outline-offset: 3px; }

.dc2-est__success {
  display: flex; flex-direction: column; gap: 1.25rem;
  padding: 1rem 0;
}
.dc2-est__success-headline {
  font-family: ${fonts.display};
  font-weight: 700;
  font-stretch: 82%;
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  line-height: 1.05;
  letter-spacing: -0.015em;
  color: ${palette.ink};
  margin: 0;
}
.dc2-est__ticket {
  display: flex; align-items: baseline; gap: 0.6rem;
  margin: 0;
}
.dc2-est__ticket span {
  font-family: ${fonts.mono};
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${palette.dust};
}
.dc2-est__ticket code {
  font-family: ${fonts.mono};
  font-size: 1rem;
  letter-spacing: 0.18em;
  color: ${palette.terra};
}

@media (max-width: 880px) {
  .dc2-est { padding: 4rem 1.25rem 4.5rem; }
  .dc2-est__inner { grid-template-columns: 1fr; gap: 2.5rem; }
  .dc2-est__right { padding: 1.5rem; }
}
`;
