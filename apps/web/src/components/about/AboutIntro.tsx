import { aboutBio, aboutFacts, aboutHeadline } from "@/lib/about";

export function AboutIntro() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-ink-line" id="top">
      <div className="mx-auto grid w-full max-w-shell gap-14 px-gutter pb-20 pt-16 sm:pt-24 lg:grid-cols-12 lg:gap-8 lg:pb-28">
        <div className="lg:col-span-8">
          <p className="mb-8 font-mono text-meta uppercase text-paper-faint" data-hero>
            <span className="text-signal">About</span> / Muhammad Nizar Aulia
          </p>
          <h1 className="max-w-[18ch] text-balance text-display font-semibold text-paper" data-hero-title id="hero-title">
            {aboutHeadline}
          </h1>
          <div className="mt-10 max-w-[60ch] space-y-5 text-lead text-paper-dim" data-hero>
            {aboutBio.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-4 lg:pt-24" data-hero>
          <dl className="rounded-2xl border border-ink-line bg-ink-raised">
            {aboutFacts.map((fact) => (
              <div className="border-b border-ink-line px-6 py-5 last:border-b-0" key={fact.label}>
                <dt className="font-mono text-meta uppercase text-paper-faint">{fact.label}</dt>
                <dd className="mt-2 text-paper">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
