import SectionHeader from "./section-header";

const SOURCES = [
  {
    label: "State DEP and DNR filings",
    body: "Production volumes, permit history, well status, and operator activity.",
  },
  {
    label: "Operator filings",
    body: "Acreage commitments, lease terms, working interest splits, and recent assignments.",
  },
  {
    label: "County records",
    body: "Deed transfers, lease assignments, right-of-way history, surface ownership.",
  },
  {
    label: "Royalty statements",
    body: "Month-by-month payment history and decline curves at the well level.",
  },
  {
    label: "Proprietary comp model",
    body: "Closed transactions across the basin, weighted by play, operator, and tract size.",
  },
];

export default function SourcesSection() {
  return (
    <section className="relative border-t border-cream/10 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="04"
          eyebrow="Sources of truth"
          title={
            <>
              Numbers come from somewhere.{" "}
              <em className="italic text-copper">Ours come from here.</em>
            </>
          }
        />

        <div className="mt-16 grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-20">
          <div className="max-w-md">
            <p className="text-base leading-relaxed text-cream/75 md:text-lg">
              Every value Voice Landman gives is grounded. We do not guess and
              we do not bluff. The number you hear on the call is built from
              public filings, operator data, county records, and a comp model
              trained on actual transactions in your play.
            </p>
            <p className="mt-6 text-base leading-relaxed text-cream/65 md:text-lg">
              When the data is thin, the agent says so. A range, a confidence
              note, and a plan to get to the right number. Honesty travels
              further than a polished pitch.
            </p>
          </div>

          <ol className="flex flex-col gap-px overflow-hidden rounded-xl border border-cream/10 bg-cream/[0.04]">
            {SOURCES.map((source, idx) => (
              <li
                key={source.label}
                className="grid grid-cols-[44px_1fr] items-baseline gap-4 bg-ink/95 px-6 py-5 transition-colors duration-300 hover:bg-ink-2"
              >
                <span className="font-mono text-sm text-copper">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-serif text-lg leading-tight md:text-xl">
                    {source.label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-cream/65">
                    {source.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
