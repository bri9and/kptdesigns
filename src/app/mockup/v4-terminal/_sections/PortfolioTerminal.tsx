"use client";

import { JetBrains_Mono } from "next/font/google";
import { motion } from "framer-motion";
import { portfolio } from "@/lib/portfolio";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const C = {
  green: "#33FF66",
  amber: "#FFB000",
  offWhite: "#E0E0E0",
  dim: "#444444",
  hairline: "#2A2A2A",
} as const;

function deriveSlug(href: string | undefined, url: string, name: string) {
  if (href) {
    const parts = href.split("/").filter(Boolean);
    return parts[parts.length - 1] ?? name.toLowerCase().replace(/\s+/g, "-");
  }
  return url.replace(/\.(com|net|org|me|io)$/, "").replace(/[^a-z0-9]/gi, "-").replace(/-+/g, "-").toLowerCase();
}

const pad = (s: string, n: number) => (s.length >= n ? s.slice(0, n) : s + " ".repeat(n - s.length));
const fakeSize = (n: number) => `${(n / 30 + 1.4).toFixed(1)}K`;

function fakeDate(i: number) {
  const base = new Date("2026-04-28T00:00:00Z").getTime();
  const d = new Date(base - (i * 13 + (i % 3) * 7) * 86400000);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

function firstPhrase(desc: string) {
  const stop = desc.search(/[.!]/);
  const p = (stop > 0 ? desc.slice(0, stop) : desc).trim();
  return p.length > 42 ? p.slice(0, 39) + "..." : p;
}

const HEADER = `┌──────────────────────────────────────┐
│  § 04 / WORK · directory listing     │
└──────────────────────────────────────┘`;

export default function PortfolioTerminal() {
  const rows = portfolio.slice(0, 8).map((p, i) => ({
    project: p,
    slug: deriveSlug(p.href, p.url, p.name),
    size: fakeSize(p.desc.length),
    date: fakeDate(i),
    comment: `${p.category} · ${firstPhrase(p.desc)}`,
    href: p.href ?? `https://${p.url}`,
    isExternal: !p.href,
  }));

  const slugWidth = Math.min(
    28,
    Math.max(...rows.map((r) => r.slug.length)) + 2,
  );

  return (
    <section
      id="work"
      className={`${mono.className} relative bg-black text-[#E0E0E0] py-20 sm:py-28 px-4 sm:px-8 border-t`}
      style={{ borderColor: C.hairline }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.pre
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-[10px] sm:text-xs leading-tight mb-8 sm:mb-10 whitespace-pre overflow-x-auto"
          style={{ color: C.green }}
        >
          {HEADER}
        </motion.pre>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.3 }}
          className="text-[11px] sm:text-sm mb-3 flex items-baseline gap-2"
        >
          <span style={{ color: C.dim }}>kpt@designs</span>
          <span style={{ color: C.dim }}>:</span>
          <span style={{ color: C.amber }}>~/work</span>
          <span style={{ color: C.dim }}>$</span>
          <span style={{ color: C.offWhite }}>ls -la /work/clients</span>
        </motion.div>

        <div
          className="border text-[10px] sm:text-xs leading-relaxed overflow-x-auto"
          style={{ borderColor: C.hairline, borderStyle: "dashed" }}
        >
          <div
            className="px-3 sm:px-4 py-2 border-b hidden sm:flex gap-3 uppercase tracking-wider"
            style={{
              borderColor: C.hairline,
              color: C.dim,
              fontSize: "10px",
            }}
          >
            <span className="w-[88px]">perms</span>
            <span className="w-[28px] text-right">ln</span>
            <span className="w-[40px]">user</span>
            <span className="w-[56px]">group</span>
            <span className="w-[44px] text-right">size</span>
            <span className="w-[80px]">modified</span>
            <span className="flex-1">name · note</span>
          </div>

          <ul className="divide-y" style={{ borderColor: C.hairline }}>
            {rows.map((r, i) => (
              <motion.li
                key={r.slug}
                initial={{ opacity: 0, x: -4 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                style={{ borderColor: C.hairline }}
                className="group"
              >
                <a
                  href={r.href}
                  target={r.isExternal ? "_blank" : undefined}
                  rel={r.isExternal ? "noopener noreferrer" : undefined}
                  className="block px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-75 group-hover:bg-[#33FF66] group-hover:text-black"
                >
                  {/* Desktop row */}
                  <div className="hidden sm:flex items-baseline gap-3 whitespace-pre">
                    <span
                      className="w-[88px] group-hover:!text-black"
                      style={{ color: C.dim }}
                    >
                      drwxr-xr-x
                    </span>
                    <span
                      className="w-[28px] text-right group-hover:!text-black"
                      style={{ color: C.offWhite }}
                    >
                      {47 - i * 3}
                    </span>
                    <span
                      className="w-[40px] group-hover:!text-black"
                      style={{ color: C.dim }}
                    >
                      kpt
                    </span>
                    <span
                      className="w-[56px] group-hover:!text-black"
                      style={{ color: C.dim }}
                    >
                      designs
                    </span>
                    <span
                      className="w-[44px] text-right group-hover:!text-black"
                      style={{ color: C.offWhite }}
                    >
                      {r.size}
                    </span>
                    <span
                      className="w-[80px] group-hover:!text-black"
                      style={{ color: C.offWhite }}
                    >
                      {r.date}
                    </span>
                    <span
                      className="font-bold group-hover:!text-black"
                      style={{ color: C.green, minWidth: `${slugWidth}ch` }}
                    >
                      {pad(r.slug, slugWidth)}
                    </span>
                    <span
                      className="truncate group-hover:!text-black"
                      style={{ color: C.amber, opacity: 0.75 }}
                    >
                      # {r.comment}
                    </span>
                  </div>

                  {/* Mobile row */}
                  <div className="sm:hidden flex flex-col gap-0.5">
                    <div className="flex items-baseline gap-2 whitespace-pre">
                      <span style={{ color: C.dim }} className="group-hover:!text-black">
                        drwxr-xr-x
                      </span>
                      <span style={{ color: C.offWhite }} className="group-hover:!text-black">
                        {r.size}
                      </span>
                      <span style={{ color: C.offWhite }} className="group-hover:!text-black">
                        {r.date}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 whitespace-pre">
                      <span
                        className="font-bold group-hover:!text-black"
                        style={{ color: C.green }}
                      >
                        {r.slug}
                      </span>
                    </div>
                    <div
                      className="group-hover:!text-black"
                      style={{ color: C.amber, opacity: 0.75 }}
                    >
                      # {r.comment}
                    </div>
                  </div>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-4 text-[10px] sm:text-xs flex flex-wrap items-baseline gap-x-3 gap-y-1"
        >
          <span style={{ color: C.dim }}>
            total {portfolio.length}
          </span>
          <span style={{ color: C.dim }}>
            (showing 1-8 ·{" "}
            <span style={{ color: C.offWhite }}>type</span>{" "}
            <span style={{ color: C.amber }}>{`'kpt --more'`}</span>{" "}
            <span style={{ color: C.offWhite }}>for full list</span>)
          </span>
        </motion.div>
      </div>
    </section>
  );
}
