import { LogoTile } from "@/components/earthy/logo-tile";
import { SectionLabel } from "@/components/earthy/section-label";

type LogoCloudProps = {
  label: string;
  title: string;
  body: string;
  logos: string[];
};

export function LogoCloud({ label, title, body, logos }: LogoCloudProps) {
  return (
    <section
      id="integrations"
      className="bg-brand-surface py-25 text-center"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-14 max-w-[540px]">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-[family-name:var(--brand-display-font)] text-[clamp(1.8rem,3.5vw,2.75rem)] font-bold tracking-tight text-brand-ink">
            {title}
          </h2>
          <p className="mt-3.5 text-[1.05rem] text-brand-text">{body}</p>
        </div>

        <div className="mx-auto flex max-w-[800px] flex-wrap justify-center gap-5">
          {logos.map((logo) => (
            <LogoTile key={logo}>{logo}</LogoTile>
          ))}
        </div>
      </div>
    </section>
  );
}
