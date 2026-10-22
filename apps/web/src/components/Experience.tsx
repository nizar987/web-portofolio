import { experience } from "@/lib/portfolio";
import { SectionHeader } from "./SectionHeader";

export function Experience() {
  return (
    <section aria-labelledby="experience-title" className="border-t border-ink-line" id="experience">
      <div className="mx-auto w-full max-w-shell px-gutter py-24 lg:py-32">
        <SectionHeader id="experience-title" index="03" label="Experience" title="From engineer to technical lead." />

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <ol className="relative lg:col-span-9 lg:col-start-4" data-timeline>
            <span aria-hidden="true" className="absolute bottom-3 left-[5px] top-3 w-px bg-ink-line" />
            <span
              aria-hidden="true"
              className="absolute bottom-3 left-[5px] top-3 w-px origin-top bg-signal"
              data-timeline-progress
            />

            {experience.map((item) => (
              <li className="relative pb-16 pl-10 last:pb-0 sm:pl-14" data-reveal key={`${item.role}-${item.period}`}>
                <span
                  aria-hidden="true"
                  className={
                    item.current
                      ? "absolute left-0 top-2.5 h-[11px] w-[11px] rounded-full bg-signal ring-4 ring-signal/15"
                      : "absolute left-0 top-2.5 h-[11px] w-[11px] rounded-full border border-ink-line-strong bg-ink"
                  }
                />

                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="text-2xl font-semibold tracking-tight text-paper">
                    {item.role} <span className="font-normal text-paper-faint">at {item.company}</span>
                  </h3>
                  <p className="font-mono text-meta uppercase text-paper-dim">
                    {item.current ? <span className="mr-2 text-signal">Current ·</span> : null}
                    {item.period}
                  </p>
                </div>

                <ul className="mt-6 max-w-[62ch] space-y-3">
                  {item.highlights.map((highlight) => (
                    <li className="relative pl-6 text-paper-dim" key={highlight}>
                      <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-3 bg-paper-faint" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
