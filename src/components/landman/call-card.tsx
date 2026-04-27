import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/landman";

type Props = {
  className?: string;
};

export default function CallCard({ className = "" }: Props) {
  return (
    <a
      href={`tel:${PHONE_TEL}`}
      className={`group relative block overflow-hidden rounded-xl border border-cream/15 bg-cream/[0.02] backdrop-blur-sm transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-copper/60 hover:bg-cream/[0.035] ${className}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="flex items-center gap-4 border-b border-cream/10 px-6 py-5 sm:border-b-0 sm:border-r">
          <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center">
            <span className="pulse-ring absolute inset-0 rounded-full bg-copper/40" />
            <span className="pulse-dot relative inline-block h-2 w-2 rounded-full bg-copper" />
          </span>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-copper">
              Live · Public beta
            </p>
            <p className="mt-1 text-sm text-cream/70">
              The agent is on the line
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-3 px-6 py-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/45">
              Voice Landman intake
            </p>
            <p className="mt-2 font-serif text-2xl tracking-tight md:text-3xl">
              {PHONE_DISPLAY}
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55 transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-copper">
            Tap to call →
          </span>
        </div>
      </div>
    </a>
  );
}
