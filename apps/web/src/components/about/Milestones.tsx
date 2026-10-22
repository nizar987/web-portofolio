import { milestones } from "@/lib/about";
import { SectionHeader } from "../SectionHeader";

export function Milestones() {
  return (
    <section aria-labelledby="milestones-title" className="border-t border-ink-line">
      <div className="mx-auto w-full max-w-shell px-gutter py-24 lg:py-32">
        <SectionHeader id="milestones-title" index="02" label="Milestones" title="How I got here." />

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <ol className="relative lg:col-span-9 lg:col-start-4" data-timeline>
            <span aria-hidden="true" className="absolute bottom-3 left-[5px] top-3 w-px bg-ink-line" />
            <span
              aria-hidden="true"
              className="absolute bottom-3 left-[5px] top-3 w-px origin-top bg-signal"
              data-timeline-progress
            />

            {milestones.map((milestone, index) => {
              const isLatest = index === milestones.length - 1;
              return (
                <li
                  className="relative grid gap-2 pb-12 pl-10 last:pb-0 sm:grid-cols-[5rem_1fr] sm:gap-8 sm:pl-14"
                  data-reveal
                  key={milestone.year}
                >
                  <span
                    aria-hidden="true"
                    className={
                      isLatest
                        ? "absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full bg-signal ring-4 ring-signal/15"
                        : "absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border border-ink-line-strong bg-ink"
                    }
                  />
                  <p className={`font-mono text-meta uppercase sm:pt-1 ${isLatest ? "text-signal" : "text-paper-dim"}`}>
                    {milestone.year}
                  </p>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-paper">{milestone.title}</h3>
                    <p className="mt-2 max-w-[56ch] text-paper-dim">{milestone.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
