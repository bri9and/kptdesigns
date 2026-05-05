"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { palette, fonts } from "../_lib/tokens";
import { fakeSubmitQuote } from "../_lib/quote-demo";

const PROJECT_TYPES = [
  "Hardscape (pavers, walkways, walls)",
  "Softscape (sod, turf, rock, planting)",
  "Irrigation system",
  "Tree planting / service",
  "Yard service / cleanup",
  "Full-yard renovation",
  "Other / not sure yet",
];

const SIZES = [
  { value: "lt-500",       label: "Under 500 sf" },
  { value: "500-2000",     label: "500 – 2,000 sf" },
  { value: "2000-5000",    label: "2,000 – 5,000 sf" },
  { value: "gt-5000",      label: "5,000 sf or more" },
];

const TIMING = [
  { value: "asap",     label: "ASAP" },
  { value: "30",       label: "Within 30 days" },
  { value: "60",       label: "Within 60 days" },
  { value: "flexible", label: "Flexible" },
];

const projectSchema = z.object({
  projectType: z.string().min(1, "Pick a project type"),
  size: z.string().min(1, "Pick a size"),
  timing: z.string().min(1, "Pick a timeline"),
  details: z.string().optional(),
});
type ProjectStep = z.infer<typeof projectSchema>;

const contactSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone required"),
  preferredContact: z.enum(["phone", "email", "text"]),
});
type ContactStep = z.infer<typeof contactSchema>;

export function GetAQuote() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [project, setProject] = useState<ProjectStep | null>(null);
  const [contact, setContact] = useState<ContactStep | null>(null);
  const [ticket, setTicket] = useState<string | null>(null);

  const projectForm = useForm<ProjectStep>({
    defaultValues: { projectType: "", size: "", timing: "", details: "" },
  });
  const contactForm = useForm<ContactStep>({
    defaultValues: { name: "", email: "", phone: "", preferredContact: "phone" },
  });

  function onProjectSubmit(data: ProjectStep) {
    // light zod parse for safety
    const parsed = projectSchema.safeParse(data);
    if (!parsed.success) return;
    setProject(parsed.data);
    setStep(2);
  }

  async function onContactSubmit(data: ContactStep) {
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success || !project) return;
    setContact(parsed.data);
    const result = await fakeSubmitQuote({
      projectType: project.projectType,
      size: project.size,
      contact: { name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone },
    });
    setTicket(result.ticketId);
    setStep(3);
  }

  function reset() {
    projectForm.reset();
    contactForm.reset();
    setProject(null);
    setContact(null);
    setTicket(null);
    setStep(1);
  }

  return (
    <section id="quote" className="dc-quote" aria-labelledby="dc-quote-title">
      <header className="dc-quote__intro">
        <p className="dc-quote__eyebrow">Free estimate</p>
        <h2 id="dc-quote-title" className="dc-quote__title">Get a quote.</h2>
        <p className="dc-quote__lede">
          Three quick steps. No upsell theater. We'll be in touch within
          one business day to set up your free estimate.
        </p>
      </header>

      <div className="dc-quote__panel">
        <ol className="dc-quote__steps" aria-label="Quote steps">
          <li className={step >= 1 ? "is-active" : ""}>1 · Project</li>
          <li className={step >= 2 ? "is-active" : ""}>2 · Contact</li>
          <li className={step >= 3 ? "is-active" : ""}>3 · Confirmed</li>
        </ol>

        {step === 1 && (
          <form onSubmit={projectForm.handleSubmit(onProjectSubmit)} className="dc-quote__form" noValidate>
            <label className="dc-quote__field dc-quote__field--full">
              <span>Project type</span>
              <select {...projectForm.register("projectType")}>
                <option value="">Select…</option>
                {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {projectForm.formState.errors.projectType && (
                <em>{projectForm.formState.errors.projectType.message}</em>
              )}
            </label>
            <div className="dc-quote__row">
              <label className="dc-quote__field">
                <span>Approximate size</span>
                <select {...projectForm.register("size")}>
                  <option value="">Select…</option>
                  {SIZES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
                {projectForm.formState.errors.size && (
                  <em>{projectForm.formState.errors.size.message}</em>
                )}
              </label>
              <label className="dc-quote__field">
                <span>Target start</span>
                <select {...projectForm.register("timing")}>
                  <option value="">Select…</option>
                  {TIMING.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
                {projectForm.formState.errors.timing && (
                  <em>{projectForm.formState.errors.timing.message}</em>
                )}
              </label>
            </div>
            <label className="dc-quote__field dc-quote__field--full">
              <span>Tell us more (optional)</span>
              <textarea rows={4} {...projectForm.register("details")} placeholder="Anything we should know — budget range, inspiration, current yard condition…" />
            </label>
            <div className="dc-quote__row dc-quote__row--end">
              <button type="submit" className="dc-quote__cta">Continue →</button>
            </div>
          </form>
        )}

        {step === 2 && project && (
          <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="dc-quote__form" noValidate>
            <p className="dc-quote__summary">
              <strong>{project.projectType}</strong> ·{" "}
              {SIZES.find((s) => s.value === project.size)?.label} ·{" "}
              {TIMING.find((t) => t.value === project.timing)?.label}
            </p>
            <div className="dc-quote__row">
              <label className="dc-quote__field">
                <span>Name</span>
                <input type="text" autoComplete="name" {...contactForm.register("name")} />
                {contactForm.formState.errors.name && <em>{contactForm.formState.errors.name.message}</em>}
              </label>
              <label className="dc-quote__field">
                <span>Email</span>
                <input type="email" autoComplete="email" {...contactForm.register("email")} />
                {contactForm.formState.errors.email && <em>{contactForm.formState.errors.email.message}</em>}
              </label>
            </div>
            <label className="dc-quote__field dc-quote__field--full">
              <span>Phone</span>
              <input type="tel" autoComplete="tel" {...contactForm.register("phone")} />
              {contactForm.formState.errors.phone && <em>{contactForm.formState.errors.phone.message}</em>}
            </label>
            <fieldset className="dc-quote__field dc-quote__radios">
              <legend>Preferred contact method</legend>
              <label><input type="radio" value="phone" {...contactForm.register("preferredContact")} /> Phone</label>
              <label><input type="radio" value="email" {...contactForm.register("preferredContact")} /> Email</label>
              <label><input type="radio" value="text" {...contactForm.register("preferredContact")} /> Text</label>
            </fieldset>
            <div className="dc-quote__row dc-quote__row--end">
              <button type="button" className="dc-quote__back" onClick={() => setStep(1)}>← Edit project</button>
              <button type="submit" className="dc-quote__cta" disabled={contactForm.formState.isSubmitting}>
                {contactForm.formState.isSubmitting ? "Sending…" : "Submit request →"}
              </button>
            </div>
          </form>
        )}

        {step === 3 && project && contact && ticket && (
          <div className="dc-quote__success">
            <div className="dc-quote__seal" aria-hidden="true">✓</div>
            <h3>Request received.</h3>
            <p className="dc-quote__conf">Ticket <code>{ticket}</code></p>
            <p className="dc-quote__success-line">
              We'll be in touch within one business day. Free estimate
              scheduled at your convenience.
            </p>
            <p className="dc-quote__summary dc-quote__summary--center">
              {contact.name} · {project.projectType}
            </p>
            <div className="dc-quote__row dc-quote__row--end">
              <button type="button" className="dc-quote__cta" onClick={reset}>Submit another</button>
            </div>
          </div>
        )}
      </div>
      <style>{css}</style>
    </section>
  );
}

const css = `
.dc-quote { padding: 8rem 5vw; background: ${palette.sand}; color: ${palette.charcoal}; }
.dc-quote__intro { max-width: 640px; margin: 0 auto 4rem; text-align: center; }
.dc-quote__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.terra}; margin: 0 0 1.25rem; }
.dc-quote__title { font-family: ${fonts.display}; font-size: clamp(2.2rem, 5vw, 3.4rem); font-weight: 400; line-height: 1.1; color: ${palette.saguaro}; margin: 0 0 1.25rem; }
.dc-quote__lede { font-family: ${fonts.display}; font-style: italic; color: ${palette.rock}; font-size: 1.05rem; line-height: 1.65; margin: 0; opacity: 0.85; }
.dc-quote__panel { max-width: 720px; margin: 0 auto; background: ${palette.paper}; border: 1px solid rgba(63,53,45,0.16); border-radius: 6px; padding: 2.5rem; box-shadow: 0 12px 40px rgba(63,53,45,0.06); }
.dc-quote__steps { list-style: none; padding: 0; margin: 0 0 2.5rem; display: flex; gap: 1.5rem; font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: ${palette.rock}; opacity: 0.5; }
.dc-quote__steps li.is-active { opacity: 1; color: ${palette.terra}; }
.dc-quote__form { display: flex; flex-direction: column; gap: 1.5rem; font-family: ${fonts.body}; }
.dc-quote__row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
.dc-quote__row--end { display: flex; justify-content: flex-end; align-items: center; gap: 1rem; }
.dc-quote__field { display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.9rem; }
.dc-quote__field--full { grid-column: 1 / -1; }
.dc-quote__field span, .dc-quote__field legend { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: ${palette.rock}; opacity: 0.78; }
.dc-quote__field input, .dc-quote__field select, .dc-quote__field textarea { background: ${palette.white}; border: 1px solid rgba(63,53,45,0.22); color: ${palette.charcoal}; padding: 0.85rem 1rem; border-radius: 4px; font-family: inherit; font-size: 0.95rem; resize: vertical; }
.dc-quote__field input:focus, .dc-quote__field select:focus, .dc-quote__field textarea:focus { outline: none; border-color: ${palette.sunGold}; box-shadow: 0 0 0 2px rgba(212,168,87,0.3); }
.dc-quote__field em { color: ${palette.terra}; font-style: normal; font-size: 0.75rem; }
.dc-quote__radios { border: 1px solid rgba(63,53,45,0.22); border-radius: 4px; padding: 0.85rem 1rem; background: ${palette.white}; gap: 0.6rem; }
.dc-quote__radios label { display: inline-flex; gap: 0.5rem; align-items: center; margin-right: 1.5rem; font-size: 0.95rem; color: ${palette.charcoal}; }
.dc-quote__cta { background: ${palette.sunGold}; color: ${palette.charcoal}; border: none; padding: 0.95rem 1.6rem; border-radius: 999px; font-family: ${fonts.body}; font-size: 0.85rem; letter-spacing: 0.16em; text-transform: uppercase; cursor: pointer; transition: transform 180ms, box-shadow 180ms; font-weight: 600; }
.dc-quote__cta:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(212,168,87,0.45); }
.dc-quote__cta:disabled { opacity: 0.6; cursor: progress; }
.dc-quote__cta:focus-visible { outline: 2px solid ${palette.terra}; outline-offset: 2px; }
.dc-quote__back { background: transparent; color: ${palette.rock}; border: 1px solid rgba(63,53,45,0.3); padding: 0.85rem 1.4rem; border-radius: 999px; font-family: ${fonts.body}; font-size: 0.78rem; letter-spacing: 0.16em; text-transform: uppercase; cursor: pointer; }
.dc-quote__back:hover { background: rgba(63,53,45,0.06); }
.dc-quote__back:focus-visible { outline: 2px solid ${palette.terra}; outline-offset: 2px; }
.dc-quote__summary { font-family: ${fonts.body}; font-size: 0.95rem; color: ${palette.rock}; margin: 0; padding: 1rem 1.25rem; background: rgba(212,168,87,0.12); border-left: 3px solid ${palette.sunGold}; border-radius: 0 3px 3px 0; line-height: 1.6; }
.dc-quote__summary strong { color: ${palette.saguaro}; }
.dc-quote__summary--center { text-align: center; border-left: none; background: transparent; padding: 0; font-style: italic; font-family: ${fonts.display}; }
.dc-quote__success { text-align: center; padding: 1rem 0; display: flex; flex-direction: column; gap: 1rem; align-items: center; }
.dc-quote__seal { width: 64px; height: 64px; margin: 0 auto 0.5rem; border: 1px solid ${palette.sunGold}; border-radius: 999px; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: ${palette.sunGold}; background: rgba(212,168,87,0.1); }
.dc-quote__success h3 { font-family: ${fonts.display}; font-weight: 400; font-size: 2rem; margin: 0; color: ${palette.saguaro}; }
.dc-quote__conf { font-family: ${fonts.body}; font-size: 0.85rem; letter-spacing: 0.12em; text-transform: uppercase; color: ${palette.rock}; opacity: 0.85; margin: 0; }
.dc-quote__conf code { font-family: ${fonts.mono}; color: ${palette.terra}; letter-spacing: 0.18em; font-size: 0.95rem; }
.dc-quote__success-line { font-family: ${fonts.display}; font-style: italic; font-size: 1.05rem; max-width: 36ch; margin: 0 auto; line-height: 1.55; color: ${palette.rock}; }
@media (max-width: 720px) {
  .dc-quote__row { grid-template-columns: 1fr; }
  .dc-quote__panel { padding: 1.75rem; }
}
`;
