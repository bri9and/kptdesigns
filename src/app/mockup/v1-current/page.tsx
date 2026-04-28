"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Globe,
  ArrowRight,
  ChevronDown,
  ExternalLink,
  Zap,
  Shield,
  Code2,
  Palette,
  Globe2,
  Cpu,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { fadeUp, stagger, staggerSlow } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { portfolio } from "@/lib/portfolio";

/* ── Streamline Data ── */

const streamlines = [
  { top: "18%", width: "40%", left: "5%", delay: "0s", duration: "3.2s" },
  { top: "25%", width: "55%", left: "-5%", delay: "0.6s", duration: "3.8s" },
  { top: "35%", width: "35%", left: "10%", delay: "1.2s", duration: "3s" },
  { top: "45%", width: "60%", left: "-10%", delay: "0.3s", duration: "4.2s" },
  { top: "55%", width: "45%", left: "0%", delay: "1.8s", duration: "3.5s" },
  { top: "65%", width: "50%", left: "8%", delay: "0.9s", duration: "3.7s" },
  { top: "72%", width: "38%", left: "-3%", delay: "2.1s", duration: "4s" },
  { top: "80%", width: "55%", left: "5%", delay: "1.5s", duration: "3.3s" },
];

/* ── Tech Stack Features ── */

const features = [
  {
    icon: Zap,
    number: "SYS_01",
    name: "Next.js 15",
    desc: "Server-side rendering, static generation, and edge functions. Pages load instantly with built-in SEO optimization.",
    spec: "App Router · RSC · Edge",
  },
  {
    icon: Code2,
    number: "SYS_02",
    name: "React 19",
    desc: "Component architecture built for scale. Interactive UIs that are fast, maintainable, and easy to update.",
    spec: "Hooks · Suspense · Server Components",
  },
  {
    icon: Palette,
    number: "SYS_03",
    name: "Tailwind CSS",
    desc: "Utility-first styling with zero dead CSS. Pixel-perfect responsive designs that look great on every device.",
    spec: "JIT · Tree-shaken · < 10KB",
  },
  {
    icon: Shield,
    number: "SYS_04",
    name: "TypeScript",
    desc: "Full type safety from database to DOM. Bugs caught at build time, not by your customers.",
    spec: "Strict · End-to-End Types",
  },
  {
    icon: Globe2,
    number: "SYS_05",
    name: "Vercel Edge",
    desc: "Global edge deployment so your site loads fast no matter where your visitors are. Built-in SSL and DDoS protection.",
    spec: "194 PoPs · 99.99% Uptime",
  },
  {
    icon: Cpu,
    number: "SYS_06",
    name: "Custom Code",
    desc: "No templates. No page builders. Every line written for your business. You get the complete source code — it's yours forever.",
    spec: "Zero Templates · Hand-Crafted",
  },
];

/* ── Telemetry Stats ── */

const telemetryStats = [
  { label: "Experience", target: 20, prefix: "", suffix: "+", unit: "Yrs", barWidth: "92%", sub: "Since 2004" },
  { label: "Load Time", target: 1, prefix: "<", suffix: "", unit: "s", barWidth: "88%", sub: "Target < 1.0s" },
  { label: "Ownership", target: 100, prefix: "", suffix: "", unit: "%", barWidth: "99%", sub: "Your code, forever" },
  { label: "PageSpeed", target: 95, prefix: "", suffix: "+", unit: "pts", barWidth: "76%", sub: "Google Lighthouse" },
];

/* ── Process Steps ── */

const processSteps = [
  {
    number: "01",
    name: "Discovery Call",
    desc: "A focused conversation about your goals, audience, and timeline. No drawn-out meetings — just clarity.",
  },
  {
    number: "02",
    name: "Design & Build",
    desc: "We design and code your site from scratch. You see progress early and often. Revisions included.",
  },
  {
    number: "03",
    name: "Review & Launch",
    desc: "We iterate until you love it. Then deploy, configure analytics, and verify everything runs clean.",
  },
  {
    number: "04",
    name: "Delivery & Ownership",
    desc: "Complete source code and repository delivered. No lock-in. No proprietary platforms. It's yours.",
  },
];

/* ── FAQ Data ── */

const faqs = [
  {
    q: "How long does a website take to build?",
    a: "Most projects take 1-4 weeks depending on complexity. A simple 3-5 page site can be done in a week. Larger projects with ecommerce or custom features take 2-4 weeks.",
  },
  {
    q: "Do I own the code when it's done?",
    a: "Yes, 100%. When your site is finished, we deliver the complete source code. It's yours — no lock-in, no proprietary platforms, no monthly fees unless you want hosting and support.",
  },
  {
    q: "What if I already have a website?",
    a: "We handle the full migration. We'll redesign and rebuild your site, move your content, and set up redirects so you don't lose any search engine rankings.",
  },
  {
    q: "Do you work with businesses outside your area?",
    a: "We work with businesses nationwide. Everything is done remotely — from the initial call to final delivery. Location is never a barrier.",
  },
  {
    q: "What technologies do you use?",
    a: "We use modern frameworks like Next.js, React, and Tailwind CSS. Your site will be fast, secure, and built with the same tools used by top tech companies.",
  },
  {
    q: "Can you help with SEO?",
    a: "Every site we build includes foundational SEO — proper meta tags, fast load times, mobile responsiveness, and clean code structure. We also offer ongoing SEO optimization as part of our Growth Plan.",
  },
];

/* ── Counter Component ── */

function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

/* ── FAQ Item ── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeUp} className="border-b border-white/[0.06] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-medium text-white group-hover:text-white/80 transition-colors pr-4">
          {q}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-white/40 shrink-0 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-[#888] text-sm leading-relaxed">
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ── Section Header Component ── */

function SectionHeader({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className="mb-20"
    >
      <motion.span
        variants={fadeUp}
        className="font-mono text-[11px] text-qyellow tracking-[3px] mb-4 block opacity-70"
      >
        {number}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className="text-[clamp(28px,4vw,48px)] font-semibold text-white tracking-[2px] leading-[1.1]"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="text-[15px] text-[#888] mt-4 max-w-[500px] leading-[1.7] font-light"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div variants={fadeUp} className="w-10 h-[2px] bg-qyellow mt-6 opacity-60" />
    </motion.div>
  );
}

/* ── Feature Icon SVGs (matching mclaren.html) ── */

function FeatureIcon({ icon: Icon }: { icon: typeof Zap }) {
  return (
    <div className="w-10 h-10 flex items-center justify-center mb-7 relative">
      <Icon className="w-6 h-6 text-qyellow" strokeWidth={1.5} />
      <div className="absolute -inset-1 border border-qyellow/[0.12] rounded-[2px]" />
    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════ */

export default function Home() {
  const telemRef = useRef<HTMLDivElement>(null);
  const telemInView = useInView(telemRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-[var(--nav-height)]">
        {/* Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 40%, rgba(255,128,0,0.06) 0%, transparent 70%),
              radial-gradient(ellipse 80% 60% at 30% 80%, rgba(255,128,0,0.03) 0%, transparent 50%),
              linear-gradient(180deg, #000 0%, #0A0A0A 100%)
            `,
          }}
        />
        <div className="absolute inset-0 carbon-fiber z-0" />

        {/* Wind tunnel streamlines */}
        <div className="absolute inset-0 z-[1] overflow-hidden opacity-40" aria-hidden="true">
          {streamlines.map((s, i) => (
            <div
              key={i}
              className="absolute h-px"
              style={{
                top: s.top,
                width: s.width,
                left: s.left,
                opacity: 0,
                background: "linear-gradient(90deg, transparent 0%, var(--papaya) 40%, transparent 100%)",
                animation: `streamflow ${s.duration} ease-in-out ${s.delay} infinite`,
              }}
            />
          ))}
        </div>

        {/* Hero content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-[2] text-center px-5"
        >
          <motion.div
            variants={fadeUp}
            className="font-mono text-[11px] tracking-[4px] uppercase text-[#555] mb-6"
          >
            <span className="text-qyellow opacity-80">{"//"}
            </span> KPT Designs{" "}
            <span className="text-qyellow opacity-80">{"//"}
            </span> Custom Web Development
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[clamp(80px,15vw,200px)] font-bold tracking-[clamp(12px,3vw,40px)] text-white leading-[0.9] relative inline-block"
          >
            KPT
            <span
              className="absolute bottom-[-4px] left-0 right-0 h-[3px] bg-qyellow"
              style={{
                boxShadow: "0 0 20px var(--papaya-glow), 0 0 60px rgba(255,128,0,0.15)",
              }}
            />
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-[clamp(16px,2.5vw,24px)] font-light tracking-[6px] uppercase text-[#aaa] mt-8"
          >
            Modern Websites That <em className="not-italic text-qyellow font-medium">Convert</em>
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex gap-8 justify-center mt-12 flex-wrap"
          >
            {["Est. 2004", "Hand-Coded", "Zero Templates"].map((item) => (
              <span
                key={item}
                className="font-mono text-[10px] tracking-[2px] text-[#555] uppercase px-4 py-1.5 border border-white/[0.06] rounded-[2px]"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 z-[2] flex flex-col items-center gap-2"
          style={{ animation: "pulse-scroll 2s ease-in-out infinite" }}
        >
          <span className="font-mono text-[9px] tracking-[3px] uppercase text-[#3D3D3D]">
            Scroll
          </span>
          <div
            className="w-px h-10 opacity-40"
            style={{ background: "linear-gradient(180deg, var(--papaya), transparent)" }}
          />
        </motion.div>
      </div>

      {/* ═══════════ 01 / PHILOSOPHY ═══════════ */}
      <section className="py-[120px] px-10 max-w-[1200px] mx-auto relative border-t border-white/[0.06]">
        <SectionHeader number="01 / Philosophy" title="No Templates. No Shortcuts." />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start"
        >
          <motion.div
            variants={fadeUp}
            className="text-[18px] text-[#aaa] leading-[1.8] font-light"
          >
            We build modern, lightning-fast websites that actually convert visitors
            into customers. Every site is{" "}
            <strong className="text-qyellow font-medium">
              hand-coded from scratch
            </strong>{" "}
            — no templates, no page builders, no WordPress.
            <br />
            <br />
            You get the complete source code. No lock-in, no proprietary platforms.{" "}
            <strong className="text-qyellow font-medium">
              Your website. Your code. Forever.
            </strong>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative p-10 bg-[#1A1A1A] border-l-2 border-qyellow"
          >
            <blockquote className="text-[16px] text-[#aaa] italic leading-[1.8] font-light">
              &ldquo;We use modern frameworks like Next.js, React, and Tailwind CSS.
              Your site will be fast, secure, and built with the same tools used by
              top tech companies.&rdquo;
            </blockquote>
            <cite className="block mt-5 text-[11px] not-italic tracking-[3px] uppercase text-qyellow opacity-70">
              &mdash; Our Promise
            </cite>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ 02 / TECH STACK ═══════════ */}
      <section className="py-[120px] px-10 max-w-[1200px] mx-auto relative border-t border-white/[0.06]">
        <SectionHeader
          number="02 / Stack"
          title="Tech Stack"
          subtitle="The modern stack behind every site we build. Fast, secure, and built to last."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerSlow}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]"
        >
          {features.map((f) => (
            <motion.div
              key={f.number}
              variants={fadeUp}
              className="group relative bg-[#0A0A0A] p-12 pr-9 overflow-hidden border border-transparent hover:bg-[#1A1A1A] hover:border-[rgba(255,128,0,0.3)] hover:-translate-y-[2px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] carbon-weave"
            >
              {/* Papaya top accent bar — scales in on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-qyellow origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />

              <FeatureIcon icon={f.icon} />

              <span className="font-mono text-[10px] text-[#3D3D3D] tracking-[2px] mb-4 block">
                {f.number}
              </span>
              <h3 className="text-[18px] font-semibold text-white tracking-[1px] mb-3">
                {f.name}
              </h3>
              <p className="text-[13px] text-[#888] leading-[1.7] font-light">
                {f.desc}
              </p>
              <div className="mt-6 pt-5 border-t border-white/[0.06] font-mono text-[10px] text-[#555] tracking-[1px] uppercase">
                {f.spec}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════ 03 / TELEMETRY ═══════════ */}
      <section className="pt-[120px] pb-[120px] px-10 max-w-[1200px] mx-auto relative border-t border-white/[0.06]">
        <SectionHeader
          number="03 / Telemetry"
          title="Live Data"
          subtitle="Real numbers from real projects. No fluff."
        />

        <motion.div
          ref={telemRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="bg-[#0A0A0A] border border-white/[0.06] overflow-hidden relative"
        >
          {/* Telemetry header */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.06] bg-[#1A1A1A]">
            <div className="flex items-center gap-3">
              <div className="telemetry-dot" />
              <span className="font-mono text-[11px] tracking-[3px] uppercase text-[#888]">
                System Telemetry
              </span>
            </div>
            <span className="font-mono text-[10px] text-qyellow tracking-[1px] opacity-70">
              LIVE &bull; ALL SYSTEMS NOMINAL
            </span>
          </div>

          {/* Telemetry grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {telemetryStats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "p-10 lg:px-8 relative transition-colors hover:bg-[rgba(255,128,0,0.03)]",
                  i < 3 && "border-r border-white/[0.06]",
                  i < 2 && "lg:border-r border-white/[0.06]",
                  "max-lg:border-b max-lg:border-white/[0.06]"
                )}
              >
                <div className="font-mono text-[9px] tracking-[3px] uppercase text-[#555] mb-4">
                  {stat.label}
                </div>
                <div className="text-[42px] font-bold text-white tracking-[-1px] leading-none">
                  <AnimatedCounter
                    target={stat.target}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                  <span className="text-[14px] font-normal text-qyellow ml-1 tracking-[1px]">
                    {stat.unit}
                  </span>
                </div>
                <div className="mt-5 h-[2px] bg-[#1C1C1C] rounded-[1px] overflow-hidden">
                  <div
                    className="h-full bg-qyellow rounded-[1px] transition-[width] duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ width: telemInView ? stat.barWidth : "0%" }}
                  />
                </div>
                <div className="font-mono text-[10px] text-[#3D3D3D] mt-3 tracking-[1px]">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Telemetry trace SVG */}
          <div className="px-8 pt-8 pb-8 border-t border-white/[0.06] relative h-[120px] overflow-hidden">
            <div className="absolute bottom-[30px] left-8 right-8 h-[60px]">
              <svg
                className="w-full h-full"
                viewBox="0 0 1000 60"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="traceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF8000" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FF8000" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,60 L0,35 Q50,38 100,30 Q150,22 200,28 Q250,34 300,20 Q350,6 400,15 Q450,24 500,12 Q550,0 600,8 Q650,16 700,10 Q750,4 800,18 Q850,32 900,22 Q950,12 1000,25 L1000,60 Z"
                  fill="url(#traceGrad)"
                  opacity="0.15"
                />
                <path
                  d="M0,35 Q50,38 100,30 Q150,22 200,28 Q250,34 300,20 Q350,6 400,15 Q450,24 500,12 Q550,0 600,8 Q650,16 700,10 Q750,4 800,18 Q850,32 900,22 Q950,12 1000,25"
                  fill="none"
                  stroke="var(--papaya)"
                  strokeWidth="1.5"
                  opacity="0.6"
                  strokeDasharray="1000"
                  strokeDashoffset={telemInView ? "0" : "1000"}
                  style={{ transition: "stroke-dashoffset 3s ease-out" }}
                />
              </svg>
            </div>
            <span className="absolute bottom-2 left-8 font-mono text-[9px] text-[#3D3D3D] tracking-[2px] uppercase">
              T-60s
            </span>
            <span className="absolute bottom-2 right-8 font-mono text-[9px] text-[#3D3D3D] tracking-[2px] uppercase">
              Now
            </span>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ 04 / PORTFOLIO ═══════════ */}
      <section
        id="work"
        className="py-[120px] px-10 max-w-[1200px] mx-auto relative border-t border-white/[0.06]"
      >
        <SectionHeader
          number="04 / Work"
          title="Portfolio"
          subtitle="Real projects for real businesses. Every site is hand-coded, mobile-responsive, and built to perform."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolio.map((project) => (
            <motion.div key={project.url} variants={fadeUp}>
              <a
                href={project.href ?? `https://${project.url}`}
                {...(project.href ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className="block group"
              >
                <Card className="group h-full border-white/[0.06] hover:border-[rgba(255,128,0,0.3)] transition-all duration-500 hover:shadow-xl hover:-translate-y-[2px] bg-[#0A0A0A] overflow-hidden carbon-weave rounded-[2px]">
                  <div
                    className="h-40 rounded-t-[2px] flex items-center justify-center border-b border-white/[0.06] relative overflow-hidden"
                    style={
                      project.image
                        ? {
                            backgroundImage: `url(${project.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : {
                            background:
                              "linear-gradient(135deg, rgba(255,128,0,0.08), rgba(255,153,51,0.12))",
                          }
                    }
                  >
                    {project.image && (
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                    )}
                    {project.logo ? (
                      <img
                        src={project.logo}
                        alt={`${project.name} logo`}
                        className="relative z-10 max-h-16 max-w-[140px] object-contain drop-shadow-lg"
                        style={{ filter: project.image ? "brightness(1.1)" : "none" }}
                      />
                    ) : (
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <Globe className="h-8 w-8 text-white/70 group-hover:text-white/90 transition-colors drop-shadow" />
                        <span className="text-xs font-medium text-white/70 drop-shadow">
                          {project.url}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase tracking-[2px] text-qyellow font-mono bg-qyellow/10 px-2 py-1 rounded-[2px]">
                        {project.category}
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 text-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-[16px] font-semibold text-white mb-2 group-hover:text-qyellow transition-colors tracking-[0.5px]">
                      {project.name}
                    </h3>
                    <p className="text-[13px] text-[#888] leading-relaxed font-light">
                      {project.desc}
                    </p>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════ 05 / PROCESS ═══════════ */}
      <section id="process" className="py-[120px] px-10 max-w-[1200px] mx-auto relative border-t border-white/[0.06]">
        <SectionHeader
          number="05 / Process"
          title="How It Works"
          subtitle="Tell us what you need and we build it. Four steps from idea to live site."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/[0.06]"
        >
          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className={cn(
                "p-12 lg:px-9 relative transition-colors hover:bg-[rgba(255,128,0,0.03)]",
                i < processSteps.length - 1 && "lg:border-r border-white/[0.06]",
                "max-lg:border-b max-lg:border-white/[0.06] max-lg:last:border-b-0"
              )}
            >
              <div className="font-mono text-[48px] font-light text-qyellow opacity-30 leading-none mb-5">
                {step.number}
              </div>
              <h3 className="text-[18px] font-semibold text-white tracking-[1px] mb-2">
                {step.name}
              </h3>
              <p className="text-[13px] text-[#888] leading-[1.6] font-light">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════ 06 / FAQ ═══════════ */}
      <section className="py-[120px] px-10 max-w-[800px] mx-auto relative border-t border-white/[0.06]">
        <SectionHeader number="06 / FAQ" title="Common Questions" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="bg-[#0A0A0A] border border-white/[0.06] p-8"
        >
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </motion.div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="border-t border-white/[0.06] text-center py-[160px] px-10 max-w-[1200px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            className="font-mono text-[10px] tracking-[4px] uppercase text-[#555] mb-6"
          >
            Ready to modernize?
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-[clamp(32px,5vw,56px)] font-bold text-white tracking-[3px] mb-6"
          >
            Start Your <span className="text-qyellow">Project</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-[16px] text-[#888] max-w-[480px] mx-auto mb-12 leading-[1.7] font-light"
          >
            Your competitors already have modern websites. Let&apos;s make sure
            yours is better. No commitment — just a conversation.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link
              href="/start"
              className="button-shine inline-flex items-center gap-2.5 px-10 py-4 bg-qyellow text-black text-[13px] font-semibold tracking-[3px] uppercase rounded-[2px] hover:bg-qyellow-light hover:shadow-[0_0_40px_rgba(255,128,0,0.3),0_0_80px_rgba(255,128,0,0.1)] hover:-translate-y-px transition-all duration-300 relative overflow-hidden"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2.5 px-10 py-4 bg-transparent text-[#aaa] text-[13px] font-medium tracking-[3px] uppercase border border-[#2D2D2D] rounded-[2px] hover:border-qyellow hover:text-qyellow transition-all duration-300"
            >
              View Pricing
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
