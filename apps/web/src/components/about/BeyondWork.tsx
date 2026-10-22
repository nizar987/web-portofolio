import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { interests, learning } from "@/lib/about";
import { profile } from "@/lib/portfolio";
import { catalogProjects } from "@/lib/project-catalog";
import { SectionHeader } from "../SectionHeader";

const building = catalogProjects
  .filter((project) => project.org === "Personal" && project.status === "building")
  .map((project) => project.name);

interface TagListProps {
  label: string;
  items: string[];
}

function TagList({ label, items }: TagListProps) {
  return (
    <div className="border-b border-ink-line py-8 sm:grid sm:grid-cols-[9rem_1fr] sm:gap-8" data-reveal-item>
      <h3 className="mb-4 font-mono text-meta uppercase text-paper-faint sm:mb-0 sm:pt-2">{label}</h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li className="rounded-full border border-ink-line-strong px-4 py-1.5 text-paper" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BeyondWork() {
  return (
    <section aria-labelledby="beyond-title" className="border-t border-ink-line">
      <div className="mx-auto w-full max-w-shell px-gutter py-24 lg:py-32">
        <SectionHeader id="beyond-title" index="03" label="Beyond work" title="What keeps me curious." />

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="border-t border-ink-line lg:col-span-9 lg:col-start-4" data-reveal-group>
            <TagList items={interests} label="Interests" />
            <TagList items={learning} label="Learning" />
            <TagList items={building} label="Building" />
          </div>
        </div>

        <div
          className="mt-20 flex flex-col gap-8 rounded-2xl border border-ink-line bg-ink-raised p-8 sm:p-10 lg:ml-[25%] lg:flex-row lg:items-center lg:justify-between"
          data-reveal
        >
          <div>
            <p className="text-2xl font-semibold tracking-tight text-paper">Want the full picture?</p>
            <p className="mt-2 text-paper-dim">See the systems I&apos;ve shipped, or reach out directly.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 font-medium text-signal-ink transition-colors duration-200 hover:bg-signal-soft"
              href="/#projects"
            >
              View projects
              <ArrowRight aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" size={18} />
            </Link>
            <a
              className="inline-flex h-12 items-center gap-2 rounded-full border border-ink-line-strong px-6 font-medium text-paper transition-colors duration-200 hover:border-paper-faint hover:bg-ink"
              download="Muhammad_Nizar_Aulia_CV.docx"
              href={profile.resumeUrl}
            >
              <Download aria-hidden="true" size={18} />
              Résumé
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
