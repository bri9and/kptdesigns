import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/landman";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-cream/10 px-6 py-32 md:px-10 md:py-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper/[0.18] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper/[0.25] blur-[80px]"
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <p className="flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-copper">
          <span className="relative inline-flex h-1.5 w-1.5 items-center justify-center">
            <span className="pulse-ring absolute inset-0 rounded-full bg-copper/40" />
            <span className="pulse-dot relative inline-block h-1.5 w-1.5 rounded-full bg-copper" />
          </span>
          The line is open
        </p>

        <h2 className="mt-8 font-serif text-[2.5rem] leading-[1.05] tracking-tight md:text-[5rem]">
          Try it. Right now.{" "}
          <span className="block md:inline">
            The agent is{" "}
            <em className="italic text-copper">on the line.</em>
          </span>
        </h2>

        <a
          href={`tel:${PHONE_TEL}`}
          className="mt-14 inline-block font-serif text-[2.75rem] leading-none tracking-tight underline decoration-copper decoration-[3px] underline-offset-[0.18em] transition-[color,decoration-thickness,transform] duration-300 hover:-translate-y-0.5 hover:text-copper hover:decoration-[5px] md:text-[6.5rem]"
        >
          {PHONE_DISPLAY}
        </a>

        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/50">
          Pittsburgh, PA · Appalachian basin · Live 24/7
        </p>
      </div>
    </section>
  );
}
