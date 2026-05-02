import Link from "next/link";
import { ColorStrip } from "./color-strip";

function FooterLogo() {
  return (
    <Link
      href="/"
      className="inline-flex items-end gap-[3px] font-[family-name:var(--font-earthy-display)] text-[22px] font-bold leading-none tracking-[-0.5px]"
    >
      <span className="text-earthy-orange">K</span>
      <span className="text-earthy-blue">P</span>
      <span className="text-earthy-amber">T</span>
      <span className="ml-2 mb-[2px] text-[0.62em] font-medium uppercase tracking-[0.18em] text-earthy-stone-700">
        Designs
      </span>
    </Link>
  );
}

const products = [
  { href: "/pricing", label: "Web Design" },
  { href: "/pricing", label: "Hosting" },
  { href: "/pricing", label: "Domains" },
  { href: "/pricing", label: "Site Rebuild" },
  { href: "/contact", label: "IT Consulting" },
];

const company = [
  { href: "/about", label: "About" },
  { href: "/#showcase", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
  { href: "/pricing", label: "Pricing" },
];

const help = [
  { href: "/contact", label: "Get a quote" },
  { href: "/sign-in", label: "Customer login" },
  { href: "mailto:hello@kptdesigns.com", label: "Email us" },
];

function FooterCol({
  heading,
  items,
}: {
  heading: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="font-[family-name:var(--font-earthy-display)] text-[0.85rem] font-semibold uppercase tracking-[1px] text-earthy-stone-700 mb-[18px]">
        {heading}
      </h4>
      <ul className="space-y-[10px]">
        {items.map((item) => (
          <li key={`${heading}-${item.label}`}>
            <Link
              href={item.href}
              className="text-[0.9rem] text-earthy-stone-700 hover:text-earthy-orange transition-colors duration-200"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EarthyFooter() {
  const year = new Date().getFullYear();
  return (
    <>
      <ColorStrip />
      <footer className="bg-earthy-sand pt-14 pb-8 border-t border-earthy-stone-200">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
            <div>
              <FooterLogo />
              <p className="mt-4 text-[0.9rem] leading-[1.6] text-earthy-stone-700 max-w-[320px]">
                Custom websites for small businesses.
              </p>
              <p className="mt-3 text-[0.9rem] leading-[1.6] text-earthy-stone-700 max-w-[320px]">
                Modern websites. Built to convert. Custom-coded, no templates &mdash; you own everything.
              </p>
            </div>
            <FooterCol heading="Products" items={products} />
            <FooterCol heading="Company" items={company} />
            <FooterCol heading="Get help" items={help} />
          </div>
          <div className="pt-7 border-t border-earthy-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <p className="text-[0.8rem] text-earthy-stone-700">
              &copy; {year} KPT Designs. All rights reserved.
            </p>
            <p className="text-[0.8rem] text-earthy-stone-700 font-[family-name:var(--font-earthy-display)]">
              Modern websites. Built to convert.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
