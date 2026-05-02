"use client";

/**
 * /start — the self-serve preview funnel entry.
 *
 * Paste a URL (or describe your business), POST to /api/start,
 * watch a flavor loading state, and get pushed to /preview/[id]
 * when the AI is done.
 */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Link2 } from "lucide-react";

import { SectionLabel } from "@/components/earthy/section-label";
import { RevealRoot } from "@/components/earthy/reveal";

const PROGRESS_LINES = [
  "Reading your site…",
  "Listening to what you do…",
  "Choosing the right blocks…",
  "Picking colors that work for you…",
  "Writing copy in your voice…",
  "Composing the layout…",
];

const STEPS = [
  {
    n: "01",
    title: "Read",
    body: "We pull every word, image, and link from your existing site.",
  },
  {
    n: "02",
    title: "Refine",
    body: "Our AI studies what your business does and writes you a better version.",
  },
  {
    n: "03",
    title: "Render",
    body: "You see a real, scrollable preview in our boutique style — yours to keep or remix.",
  },
];

export default function StartPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNotes, setShowNotes] = useState(false);
  const [showExtract, setShowExtract] = useState(false);
  const [progressIdx, setProgressIdx] = useState(0);

  // Cycle the flavor progress lines while the request is in flight.
  useEffect(() => {
    if (!submitting) return;
    const id = setInterval(() => {
      setProgressIdx((i) => (i + 1) % PROGRESS_LINES.length);
    }, 3000);
    return () => clearInterval(id);
  }, [submitting]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const urlInput = form.elements.namedItem("url") as HTMLInputElement | null;
    const notesArea = form.elements.namedItem(
      "notes",
    ) as HTMLTextAreaElement | null;

    const url = urlInput?.value.trim() ?? "";
    const notes = notesArea?.value.trim() ?? "";

    if (!url && !notes) {
      setError("Paste a URL or describe what your business does.");
      return;
    }

    setError(null);
    setSubmitting(true);
    setProgressIdx(0);

    try {
      const res = await fetch("/api/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url || undefined,
          notes: notes || undefined,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        id?: string;
        status?: string;
        error?: string;
      };

      if (!res.ok || data.status !== "ready" || !data.id) {
        setError(
          data.error ?? "We couldn't generate your preview. Please try again.",
        );
        setSubmitting(false);
        return;
      }

      router.push(`/preview/${data.id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Network error — please try again.",
      );
      setSubmitting(false);
    }
  }

  return (
    <>
      <RevealRoot />

      <section className="relative overflow-hidden bg-gradient-to-b from-earthy-cream to-earthy-sand pt-32 pb-16">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <SectionLabel>Free preview</SectionLabel>

          <h1
            className="mt-6 font-[family-name:var(--font-earthy-serif)] italic leading-[1.05] tracking-tight text-earthy-ink"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            Show us where you are. We&apos;ll show you where you could be.
          </h1>

          <p className="mx-auto mt-6 max-w-[640px] font-[family-name:var(--font-earthy-body)] text-[1.15rem] leading-relaxed text-earthy-stone-600">
            Paste your existing website (or a Facebook page, or a Google
            listing, or just describe what you do). We&apos;ll scrape it, study
            it, and rebuild it as a boutique-grade site in under a minute. No
            signup. No credit card.
          </p>

          {submitting ? (
            <GeneratingState line={PROGRESS_LINES[progressIdx]} />
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-10 w-full max-w-[720px]"
            >
              <div className="flex items-center rounded-full border border-earthy-stone-300 bg-earthy-cream py-2 pr-2 pl-7 shadow-[var(--earthy-shadow-sm)] transition-all duration-300 hover:border-transparent hover:shadow-[var(--earthy-shadow-md)] focus-within:border-transparent focus-within:shadow-[var(--earthy-shadow-md)]">
                <Link2 className="mr-3.5 h-5 w-5 flex-shrink-0 text-earthy-stone-500" />
                <input
                  ref={inputRef}
                  name="url"
                  type="text"
                  inputMode="url"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="ciriglianoplumbingllc.com"
                  className="flex-1 border-none bg-transparent py-2.5 font-[family-name:var(--font-earthy-body)] text-base text-earthy-ink outline-none placeholder:text-earthy-stone-400"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 cursor-pointer rounded-full border-none bg-earthy-orange px-7 py-3 font-[family-name:var(--font-earthy-display)] text-sm font-medium text-earthy-cream transition-all duration-200 hover:bg-earthy-orange-dark hover:shadow-[0_2px_12px_rgba(197,103,56,0.4)]"
                >
                  Build my preview →
                </button>
              </div>

              {showNotes ? (
                <textarea
                  name="notes"
                  rows={4}
                  placeholder="Tell us what your business does, who you serve, and what makes you you."
                  className="mt-4 w-full resize-none rounded-2xl border border-earthy-stone-300 bg-earthy-cream px-5 py-4 font-[family-name:var(--font-earthy-body)] text-base text-earthy-ink shadow-[var(--earthy-shadow-sm)] outline-none transition-all duration-200 placeholder:text-earthy-stone-400 focus:border-transparent focus:shadow-[var(--earthy-shadow-md)]"
                />
              ) : null}

              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-[family-name:var(--font-earthy-serif)] text-sm italic text-earthy-stone-500">
                <button
                  type="button"
                  onClick={() => setShowNotes((s) => !s)}
                  className="cursor-pointer underline-offset-4 transition-colors hover:text-earthy-orange hover:underline"
                >
                  {showNotes ? "Just use the URL" : "Don't have a site?"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowExtract((s) => !s)}
                  className="cursor-pointer underline-offset-4 transition-colors hover:text-earthy-orange hover:underline"
                  aria-expanded={showExtract}
                >
                  What we extract
                </button>

                <span
                  className="cursor-help underline-offset-4 hover:underline"
                  title="~30 seconds."
                >
                  How long it takes
                </span>
              </div>

              {showExtract ? (
                <div className="mx-auto mt-4 max-w-[520px] rounded-2xl border border-earthy-stone-200 bg-earthy-cream/60 px-6 py-4 text-left font-[family-name:var(--font-earthy-body)] text-sm leading-relaxed text-earthy-stone-600">
                  <p className="mb-2 font-[family-name:var(--font-earthy-display)] font-medium text-earthy-ink">
                    From your existing site we read:
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-earthy-stone-500">
                    <li>Headlines, services, and your written voice</li>
                    <li>Contact info, hours, and service area</li>
                    <li>Photos, logos, and testimonials</li>
                    <li>Page structure and internal navigation</li>
                  </ul>
                </div>
              ) : null}

              {error ? (
                <p className="mx-auto mt-5 max-w-[520px] font-[family-name:var(--font-earthy-body)] text-sm text-red-700">
                  {error}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </section>

      <section className="bg-earthy-sand pb-24">
        <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-10 px-6 text-left md:grid-cols-3 md:gap-8">
          {STEPS.map((step) => (
            <div key={step.n}>
              <p className="font-[family-name:var(--font-earthy-mono)] text-xs tracking-[0.2em] text-earthy-stone-500">
                {step.n}
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-earthy-serif)] text-[1.25rem] italic text-earthy-ink">
                {step.title}
              </h3>
              <p className="mt-2 font-[family-name:var(--font-earthy-body)] text-[0.95rem] leading-relaxed text-earthy-stone-600">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-24 max-w-xl px-6 text-center font-[family-name:var(--font-earthy-body)] text-xs text-earthy-stone-500">
          Generation costs us ~$0.20 per preview. We rate-limit at 3 per IP per
          day.
        </p>
      </section>
    </>
  );
}

function GeneratingState({ line }: { line: string }) {
  return (
    <div className="mt-14 flex flex-col items-center">
      <h2 className="font-[family-name:var(--font-earthy-serif)] text-[clamp(1.5rem,3vw,2rem)] italic text-earthy-ink">
        Generating your preview&hellip;
      </h2>

      <div className="mt-8 flex justify-center gap-2.5">
        <span
          className="h-3 w-3 rounded-full bg-earthy-orange"
          style={{ animation: "earthyBounce 1.4s ease-in-out 0s infinite" }}
        />
        <span
          className="h-3 w-3 rounded-full bg-earthy-blue"
          style={{
            animation: "earthyBounce 1.4s ease-in-out 0.15s infinite",
          }}
        />
        <span
          className="h-3 w-3 rounded-full bg-earthy-amber"
          style={{
            animation: "earthyBounce 1.4s ease-in-out 0.3s infinite",
          }}
        />
        <span
          className="h-3 w-3 rounded-full bg-earthy-sage"
          style={{
            animation: "earthyBounce 1.4s ease-in-out 0.45s infinite",
          }}
        />
      </div>

      <p
        key={line}
        className="mt-8 min-h-[1.75rem] font-[family-name:var(--font-earthy-body)] text-[0.95rem] text-earthy-stone-600"
        style={{ animation: "earthyFadeUp 0.6s var(--earthy-ease) both" }}
      >
        {line}
      </p>
    </div>
  );
}
