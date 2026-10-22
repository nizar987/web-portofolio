import { stack } from "@/lib/portfolio";
import { SectionHeader } from "./SectionHeader";

export function Stack() {
  return (
    <section aria-labelledby="stack-title" className="border-t border-ink-line" id="stack">
      <div className="mx-auto w-full max-w-shell px-gutter py-24 lg:py-32">
        <SectionHeader id="stack-title" index="04" label="Stack" title="Tools I reach for in production." />

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <dl className="border-t border-ink-line lg:col-span-9 lg:col-start-4" data-reveal-group>
            {stack.map((group) => (
              <div
                className="grid gap-3 border-b border-ink-line py-6 sm:grid-cols-[9rem_1fr] sm:items-baseline sm:gap-8"
                data-reveal-item
                key={group.category}
              >
                <dt className="font-mono text-meta uppercase text-paper-faint">{group.category}</dt>
                <dd className="flex flex-wrap gap-x-3 gap-y-1 text-xl font-medium tracking-tight text-paper sm:text-2xl">
                  {group.items.map((item, index) => (
                    <span className="inline-flex items-baseline gap-3" key={item}>
                      <span className="transition-colors duration-200 hover:text-signal">{item}</span>
                      {index < group.items.length - 1 ? (
                        <span aria-hidden="true" className="text-ink-line-strong">
                          /
                        </span>
                      ) : null}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
