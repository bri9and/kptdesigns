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
        "flex h-20 w-28 items-center justify-center rounded-lg border border-brand-divider bg-brand-canvas",
        "font-[family-name:var(--brand-display-font)] text-[13px] font-semibold text-brand-text",
        "transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:-translate-y-0.5 hover:border-brand-primary hover:text-brand-primary",
        "hover:shadow-[0_2px_12px_rgba(197,103,56,0.15)]",
        className
      )}
    >
      {children}
    </div>
  );
}
