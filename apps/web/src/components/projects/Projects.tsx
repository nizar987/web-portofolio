import { SectionHeader } from "../SectionHeader";
import { ProjectIndex } from "./ProjectIndex";

export function Projects() {
  return (
    <section aria-labelledby="projects-title" className="border-t border-ink-line" id="projects">
      <div className="mx-auto w-full max-w-shell px-gutter py-24 lg:py-32">
        <SectionHeader id="projects-title" index="02" label="Projects" title="Everything I've built, at work and on my own." />
        <ProjectIndex />
      </div>
    </section>
  );
}
