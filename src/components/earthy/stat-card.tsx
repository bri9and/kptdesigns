"use client";

import { useCountUp } from "@/components/earthy/hooks/use-count-up";
import { cn } from "@/lib/utils";

export type StatCardProps = {
  target: number;
  suffix?: string;
  label: string;
  index: number;
};

const GRADIENTS = [
  "from-earthy-orange to-earthy-sage",
  "from-earthy-blue to-earthy-amber",
  "from-earthy-amber to-earthy-sage",
  "from-earthy-sage to-earthy-orange",
] as const;

export function StatCard({ target, suffix, label, index }: StatCardProps) {
  const numberRef = useCountUp(target, { suffix });
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 p-9 text-center backdrop-blur",
        "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:-translate-y-1 hover:bg-white/10"
      )}
    >
      <span
        ref={numberRef}
        className={cn(
          "block bg-gradient-to-br bg-clip-text text-transparent",
          "font-[family-name:var(--font-earthy-display)]",
          "text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight",
          "mb-2",
          gradient
        )}
      >
        0
      </span>
      <p className="text-[0.95rem] text-earthy-stone-400">{label}</p>
    </div>
  );
}
