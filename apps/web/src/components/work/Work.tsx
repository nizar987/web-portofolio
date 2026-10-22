import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/portfolio";
import { SectionHeader } from "../SectionHeader";
import { ProjectDiagram } from "./ProjectDiagram";

export function Work() {
  return (
    <section aria-labelledby="work-title" className="mx-auto w-full max-w-shell px-gutter py-24 lg:py-32" id="work">
      <SectionHeader id="work-title" index="01" label="Selected work" title="Systems that carry real operational load." />

      <ol className="border-t border-ink-line">
        {projects.map((project, index) => (
          <li className="grid gap-10 border-b border-ink-line py-12 lg:grid-cols-12 lg:gap-8 lg:py-16" key={project.title}>
            <div className="flex flex-col lg:col-span-5" data-reveal>
              <p className="font-mono text-meta uppercase text-paper-faint">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-paper sm:text-3xl">{project.title}</h3>
              <p className="mt-4 max-w-[48ch] text-paper-dim">{project.description}</p>

              <p className="mt-6 flex items-start gap-3 border-l-2 border-signal pl-4 font-medium text-paper">
                {project.impact}
              </p>

              <ul aria-label="Technologies" className="mt-8 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    className="rounded-full border border-ink-line-strong px-3 py-1 font-mono text-meta uppercase text-paper-dim"
                    key={tag}
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              {project.liveUrl || project.sourceUrl ? (
                <div className="mt-8 flex flex-wrap gap-6">
                  {project.liveUrl ? (
                    <ProjectLink href={project.liveUrl} label="Visit live system" />
                  ) : null}
                  {project.sourceUrl ? <ProjectLink href={project.sourceUrl} label="View source" /> : null}
                </div>
              ) : null}
            </div>

            <figure className="-mx-gutter sm:mx-0 lg:col-span-7" data-reveal>
              <div className="border-y border-ink-line bg-ink-raised px-2 py-4 sm:rounded-2xl sm:border sm:p-8">
                <ProjectDiagram kind={project.diagram} title={project.title} />
              </div>
              <figcaption className="mt-3 px-gutter font-mono text-meta text-paper-faint sm:px-0">{project.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ol>
    </section>
  );
}

interface ProjectLinkProps {
  href: string;
  label: string;
}

function ProjectLink({ href, label }: ProjectLinkProps) {
  return (
    <a
      className="group inline-flex items-center gap-1.5 text-paper underline decoration-ink-line-strong underline-offset-4 transition-colors duration-200 hover:decoration-signal"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {label}
      <ArrowUpRight
        aria-hidden="true"
        className="text-paper-faint transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
        size={16}
      />
    </a>
  );
}
