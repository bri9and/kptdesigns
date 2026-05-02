import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function BtnPrimary({ href, children, className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg bg-earthy-orange px-8 py-3.5",
        "font-[family-name:var(--font-earthy-display)] text-[15px] font-medium text-earthy-cream",
        "transition-all duration-200",
        "hover:bg-earthy-orange-dark hover:shadow-[0_2px_12px_rgba(197,103,56,0.4)]",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function BtnSecondary({ href, children, className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg border border-earthy-stone-300 bg-earthy-cream px-8 py-3.5",
        "font-[family-name:var(--font-earthy-display)] text-[15px] font-medium text-earthy-orange",
        "transition-all duration-200",
        "hover:border-earthy-orange-light hover:bg-[rgba(197,103,56,0.04)]",
        className
      )}
    >
      {children}
    </Link>
  );
}
