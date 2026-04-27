import type { ReactNode } from "react";

type Props = {
  number: string;
  eyebrow: string;
  title: ReactNode;
  className?: string;
};

export default function SectionHeader({
  number,
  eyebrow,
  title,
  className = "",
}: Props) {
  return (
    <header className={`max-w-3xl ${className}`}>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream/55">
        <span className="text-copper">{number}</span>
        <span className="mx-3 text-cream/30">/</span>
        <span>{eyebrow}</span>
      </p>
      <h2 className="mt-6 font-serif text-[2.25rem] leading-[1.05] tracking-tight md:text-[3.75rem]">
        {title}
      </h2>
    </header>
  );
}
