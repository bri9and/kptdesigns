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
        "inline-flex items-center justify-center gap-2 rounded-lg bg-brand-primary px-8 py-3.5",
        "font-[family-name:var(--brand-display-font)] text-[15px] font-medium text-brand-canvas",
        "transition-all duration-200",
        "hover:bg-brand-primary-strong hover:shadow-[0_2px_12px_rgba(197,103,56,0.4)]",
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
        "inline-flex items-center justify-center gap-2 rounded-lg border border-brand-divider bg-brand-canvas px-8 py-3.5",
        "font-[family-name:var(--brand-display-font)] text-[15px] font-medium text-brand-primary",
        "transition-all duration-200",
        "hover:border-brand-primary-soft hover:bg-[rgba(197,103,56,0.04)]",
        className
      )}
    >
      {children}
    </Link>
  );
}
