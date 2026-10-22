import { principles } from "@/lib/about";
import { SectionHeader } from "../SectionHeader";

export function Principles() {
  return (
    <section aria-labelledby="principles-title" className="mx-auto w-full max-w-shell px-gutter py-24 lg:py-32">
      <SectionHeader id="principles-title" index="01" label="How I work" title="What I bring to a team." />

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <ol className="grid border-t border-ink-line sm:grid-cols-2 lg:col-span-9 lg:col-start-4" data-reveal-group>
          {principles.map((principle, index) => (
            <li
              className="border-b border-ink-line py-8 sm:pr-10 sm:[&:nth-child(even)]:border-l sm:[&:nth-child(even)]:pl-10"
              data-reveal-item
              key={principle.title}
            >
              <p className="font-mono text-meta text-signal">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-paper">{principle.title}</h3>
              <p className="mt-2 max-w-[38ch] text-paper-dim">{principle.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
