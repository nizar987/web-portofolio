import { ArrowDown, ArrowRight, Download } from "lucide-react";
import { profile, stats } from "@/lib/portfolio";
import { HeroCanvas } from "./HeroCanvas";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden border-b border-ink-line" id="top">
      <div className="mx-auto grid w-full max-w-shell px-gutter lg:min-h-[calc(100svh-4rem)] lg:grid-cols-12">
        <div className="relative z-10 flex flex-col justify-center pb-10 pt-14 sm:pt-20 lg:col-span-7 lg:py-24">
          <p
            className="mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-ink-line-strong bg-ink-raised/80 py-1.5 pl-3 pr-4 font-mono text-meta uppercase text-paper-dim backdrop-blur"
            data-hero
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
            </span>
            {profile.availability}
          </p>

          <p className="mb-5 font-mono text-meta uppercase text-paper-faint" data-hero>
            {profile.name} — <span data-scramble>{profile.role}</span>
          </p>

          <h1 className="max-w-[15ch] text-balance text-display font-semibold text-paper" data-hero-title id="hero-title">
            Designing scalable backend systems <span className="text-paper-faint">and reliable web applications.</span>
          </h1>

          <p className="mt-7 max-w-[54ch] text-lead text-paper-dim" data-hero>
            {profile.summary}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3" data-hero>
            <a
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 font-medium text-signal-ink transition-colors duration-200 hover:bg-signal-soft"
              href="#contact"
            >
              Get in touch
              <ArrowRight aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" size={18} />
            </a>
            <a
              className="inline-flex h-12 items-center gap-2 rounded-full border border-ink-line-strong px-6 font-medium text-paper transition-colors duration-200 hover:border-paper-faint hover:bg-ink-raised"
              download="Muhammad_Nizar_Aulia_CV.docx"
              href={profile.resumeUrl}
            >
              <Download aria-hidden="true" size={18} />
              Download résumé
            </a>
            <a
              className="inline-flex h-12 items-center gap-2 px-1 text-paper-dim transition-colors duration-200 hover:text-paper sm:px-3"
              href="#work"
            >
              Selected work
              <ArrowDown aria-hidden="true" size={16} />
            </a>
          </div>

          <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-ink-line pt-6" data-hero>
            {stats.map((stat) => (
              <div className="flex flex-col-reverse justify-end" key={stat.label}>
                <dt className="mt-2 text-sm leading-snug text-paper-faint">{stat.label}</dt>
                <dd
                  className="font-mono text-3xl font-medium tracking-tight text-paper sm:text-4xl"
                  data-count={stat.value}
                  data-suffix={stat.suffix}
                >
                  {stat.value}
                  {stat.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <figure className="relative h-72 sm:h-96 lg:absolute lg:right-0 lg:top-1/2 lg:h-[min(78vh,660px)] lg:w-[56%] lg:-translate-y-1/2">
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] lg:[mask-image:linear-gradient(to_right,transparent,black_28%)]">
          <HeroCanvas />
        </div>
        <figcaption className="absolute bottom-5 left-gutter right-gutter text-right font-mono text-meta uppercase text-paper-faint lg:left-auto">
          Fig. 01 — producers → redis queue → worker pool
        </figcaption>
      </figure>
    </section>
  );
}
