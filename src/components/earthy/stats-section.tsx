import { Reveal } from "@/components/earthy/reveal";
import { SectionLabel } from "@/components/earthy/section-label";
import { StatCard, type StatCardProps } from "@/components/earthy/stat-card";

type StatsSectionProps = {
  label: string;
  title: string;
  stats: Omit<StatCardProps, "index">[];
};

export function StatsSection({ label, title, stats }: StatsSectionProps) {
  return (
    <section
      id="stats"
      className="relative overflow-hidden bg-earthy-ink py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[150px] -top-[150px] h-[500px] w-[500px]"
        style={{
          background:
            "radial-gradient(circle, rgba(197,103,56,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[150px] -left-[150px] h-[500px] w-[500px]"
        style={{
          background:
            "radial-gradient(circle, rgba(123,161,90,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-14 text-center">
            <SectionLabel className="!text-earthy-orange-light">
              {label}
            </SectionLabel>
            <h2 className="font-[family-name:var(--font-earthy-display)] text-[clamp(1.8rem,3.5vw,2.75rem)] font-bold tracking-tight text-earthy-cream">
              {title}
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const stagger = ((i % 4) + 1) as 1 | 2 | 3 | 4;
            return (
              <Reveal key={`${stat.label}-${i}`} stagger={stagger}>
                <StatCard {...stat} index={i} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
