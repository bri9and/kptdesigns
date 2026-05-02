import { cn } from "@/lib/utils";

export function LogoTile({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-20 w-28 items-center justify-center rounded-lg border border-earthy-stone-200 bg-earthy-cream",
        "font-[family-name:var(--font-earthy-display)] text-[13px] font-semibold text-earthy-stone-600",
        "transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:-translate-y-0.5 hover:border-earthy-orange hover:text-earthy-orange",
        "hover:shadow-[0_2px_12px_rgba(197,103,56,0.15)]",
        className
      )}
    >
      {children}
    </div>
  );
}
