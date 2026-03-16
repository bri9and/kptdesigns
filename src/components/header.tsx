"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { VERSION } from "@/lib/version";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/pricing", label: "Pricing" },
  { href: "/domains", label: "Domains" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-qblack-dark/95 backdrop-blur-md shadow-lg border-b border-qwhite/10"
          : "bg-qblack-dark/80 backdrop-blur-sm"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3 text-qwhite hover:text-qwhite transition-colors duration-200">
          <Logo variant="full" size="md" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-sm px-3 py-2 rounded-md transition-all duration-200 hover:text-qwhite hover:bg-qwhite/10",
                isActive(link.href)
                  ? "text-qwhite bg-qwhite/10"
                  : "text-qwhite/90"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-qyellow rounded-full" />
              )}
            </Link>
          ))}
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "sm" }),
              "ml-3 bg-qyellow hover:bg-qyellow-light text-qblack-dark shadow-md hover:shadow-lg transition-all duration-200"
            )}
          >
            Get a Quote
          </Link>
          <span className="ml-3 text-[10px] text-qwhite/25 font-mono select-none">
            v{VERSION}
          </span>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden">
            <Button variant="ghost" size="icon" render={<span />}>
              <Menu className="h-5 w-5 text-qwhite" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-qblack-dark border-qwhite/10">
            <nav className="flex flex-col gap-2 mt-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-lg py-2 px-3 rounded-lg transition-all duration-200 hover:text-qwhite hover:bg-qwhite/5",
                    isActive(link.href)
                      ? "text-qwhite bg-qwhite/10"
                      : "text-qwhite/90"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants(),
                  "bg-qyellow hover:bg-qyellow-light text-qblack-dark mt-4"
                )}
              >
                Get a Quote
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
