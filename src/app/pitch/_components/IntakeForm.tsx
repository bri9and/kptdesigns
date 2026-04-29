"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { palette, fonts } from "@/app/sites/lake-arthur/_lib/tokens";
import { INDUSTRIES, cleanUrl, inferNameFromUrl, type Industry } from "./staged-data";

const intakeSchema = z.object({
  businessName: z.string().min(1, "Required"),
  websiteUrl: z.string().optional(),
  industry: z.string().optional(),
  customerEmail: z.string().email("Invalid email").optional().or(z.literal("")),
});

type IntakeFormValues = z.infer<typeof intakeSchema>;

export type IntakePayload = {
  businessName: string;
  websiteUrl: string;
  industry: Industry;
  customerEmail: string;
};

export function IntakeForm({ onSubmit }: { onSubmit: (payload: IntakePayload) => void }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<IntakeFormValues>({
    defaultValues: { businessName: "", websiteUrl: "", industry: "", customerEmail: "" },
  });

  // If the user pastes a URL first and the business-name field is empty,
  // auto-fill an inferred name. We watch instead of reading on submit so the
  // hint shows up live.
  const websiteUrl = watch("websiteUrl");
  useEffect(() => {
    const current = getValues("businessName");
    if (!current && websiteUrl) {
      const inferred = inferNameFromUrl(websiteUrl);
      if (inferred) setValue("businessName", inferred, { shouldDirty: false });
    }
  }, [websiteUrl, getValues, setValue]);

  function submit(values: IntakeFormValues) {
    // Final runtime validation guard. RHF's `register` already enforces required-
    // ness via the schema-shaped fields, but we re-parse to be safe — this also
    // pins `intakeSchema` as a runtime-used value, not just a type alias.
    const parsed = intakeSchema.safeParse(values);
    const v = parsed.success ? parsed.data : values;
    const industry: Industry =
      INDUSTRIES.includes(v.industry as Industry)
        ? (v.industry as Industry)
        : "Other";
    onSubmit({
      businessName: v.businessName.trim(),
      websiteUrl: cleanUrl(v.websiteUrl ?? ""),
      industry,
      customerEmail: (v.customerEmail ?? "").trim(),
    });
  }

  return (
    <motion.div
      className="if-canvas"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="if-inner">
        <header className="if-header">
          <p className="if-eyebrow">Pitch tool · intake</p>
          <h1 className="if-title">
            <em>Who are we</em><br />pitching today?
          </h1>
        </header>

        <form className="if-form" onSubmit={handleSubmit(submit)} noValidate>
          <label className="if-field">
            <span>Business name</span>
            <input
              type="text"
              autoFocus
              autoComplete="off"
              placeholder="Lake Arthur Golf Club"
              {...register("businessName")}
            />
            {errors.businessName && <em>{errors.businessName.message as string}</em>}
          </label>

          <label className="if-field">
            <span>Website (optional)</span>
            <input
              type="text"
              autoComplete="off"
              placeholder="lakearthurgolfclub.com"
              {...register("websiteUrl")}
            />
          </label>

          <label className="if-field">
            <span>Industry (optional)</span>
            <select {...register("industry")}>
              <option value="">Select…</option>
              {INDUSTRIES.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </label>

          <label className="if-field">
            <span>Customer email (optional)</span>
            <input
              type="email"
              autoComplete="off"
              placeholder="owner@business.com"
              {...register("customerEmail")}
            />
            {errors.customerEmail && <em>{errors.customerEmail.message as string}</em>}
          </label>

          <button type="submit" className="if-cta">Generate proposal →</button>
        </form>
      </div>
      <style>{css}</style>
    </motion.div>
  );
}

const css = `
.if-canvas { min-height: 100vh; background: ${palette.charcoal}; color: ${palette.cream}; display: flex; align-items: center; justify-content: center; padding: 4rem 2rem; }
.if-inner { width: 100%; max-width: 560px; display: flex; flex-direction: column; gap: 3rem; }
.if-header { text-align: left; }
.if-eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; opacity: 0.65; margin: 0 0 1.25rem; }
.if-title { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(2.4rem, 5vw, 3.6rem); margin: 0; line-height: 1.05; }
.if-title em { font-style: italic; color: ${palette.dawn}; }
.if-form { display: flex; flex-direction: column; gap: 1.5rem; }
.if-field { display: flex; flex-direction: column; gap: 0.5rem; }
.if-field span { font-family: ${fonts.body}; font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; opacity: 0.65; }
.if-field input, .if-field select { background: transparent; border: none; border-bottom: 1px solid rgba(244,239,223,0.22); color: ${palette.cream}; padding: 0.85rem 0.1rem; font-family: ${fonts.body}; font-size: 1.15rem; letter-spacing: 0.01em; transition: border-color 180ms; }
.if-field input::placeholder { color: rgba(244,239,223,0.35); }
.if-field input:focus, .if-field select:focus { outline: none; border-bottom-color: ${palette.dawn}; }
.if-field select { appearance: none; -webkit-appearance: none; background-image: linear-gradient(45deg, transparent 50%, ${palette.dawn} 50%), linear-gradient(135deg, ${palette.dawn} 50%, transparent 50%); background-position: calc(100% - 14px) center, calc(100% - 8px) center; background-size: 6px 6px, 6px 6px; background-repeat: no-repeat; padding-right: 2rem; }
.if-field select option { background: ${palette.charcoal}; color: ${palette.cream}; }
.if-field em { color: ${palette.dawn}; font-style: normal; font-size: 0.78rem; }
.if-cta { background: ${palette.dawn}; color: ${palette.charcoal}; border: none; padding: 1.1rem 1.75rem; border-radius: 999px; font-family: ${fonts.body}; font-size: 0.85rem; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; transition: transform 180ms, box-shadow 180ms; align-self: flex-start; margin-top: 1.5rem; }
.if-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(201,169,110,0.35); }
.if-cta:focus-visible { outline: 2px solid ${palette.cream}; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .if-cta { transition: none; }
  .if-cta:hover { transform: none; }
}
`;
