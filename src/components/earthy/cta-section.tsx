import { BtnPrimary, BtnSecondary } from "@/components/earthy/button";
import { SectionLabel } from "@/components/earthy/section-label";

type CtaSectionProps = {
  label: string;
  title: string;
  body: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
};

const DOT_COLORS = [
  "bg-brand-primary",
  "bg-brand-accent-1",
  "bg-brand-accent-2",
  "bg-brand-accent-3",
] as const;

const DOT_DELAYS = ["0s", "0.2s", "0.4s", "0.6s"] as const;

export function CtaSection({
  label,
  title,
  body,
  primary,
  secondary,
}: CtaSectionProps) {
  return (
    <section
      id="cta"
      className="bg-gradient-to-b from-brand-canvas to-brand-surface py-25 text-center"
    >
      <div className="mx-auto max-w-[600px] px-6">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="mb-4 font-[family-name:var(--brand-display-font)] text-[clamp(1.8rem,3.5vw,2.75rem)] font-bold tracking-tight text-brand-ink">
          {title}
        </h2>
        <p className="mb-9 text-[1.1rem] text-brand-text">{body}</p>

        <div className="flex flex-wrap justify-center gap-3.5">
          <BtnPrimary href={primary.href}>{primary.label}</BtnPrimary>
          {secondary ? (
            <BtnSecondary href={secondary.href}>{secondary.label}</BtnSecondary>
          ) : null}
        </div>

        <div className="mt-10 inline-flex justify-center gap-1.5">
          {DOT_COLORS.map((color, i) => (
            <span
              key={color}
              className={`block h-2 w-2 rounded-full ${color}`}
              style={{
                animation: `earthyLoadPulse 1.2s ease-in-out ${DOT_DELAYS[i]} infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
