import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  Cloud,
  Code2,
  Container,
  Database,
  Github,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  Palette,
  Server,
  Terminal,
  Workflow
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Header } from "@/components/Header";
import { experience, profile, projects, stats, techStack } from "@/lib/portfolio";

const iconMap = {
  braces: Braces,
  cloud: Cloud,
  code: Code2,
  container: Container,
  database: Database,
  layers: Layers3,
  palette: Palette,
  server: Server,
  terminal: Terminal,
  workflow: Workflow
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background/95 text-on-background">
      <Header />
      <main>
        <section
          className="mx-auto grid min-h-[calc(100vh-64px)] w-full max-w-container items-center gap-12 px-gutter py-20 lg:grid-cols-[1.05fr_0.95fr]"
          id="about"
        >
          <div className="max-w-3xl">
            <div className="mb-stack-lg inline-flex items-center gap-2 rounded border border-primary-fixed/20 bg-primary-fixed/10 px-3 py-1 font-code text-label uppercase text-primary-fixed">
              <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_12px_rgba(153,246,179,0.45)]" />
              {profile.role}
            </div>
            <h1 className="mb-stack-md max-w-3xl text-h1 font-bold text-on-surface sm:text-[56px] sm:leading-[1.06]">
              {profile.headline}
            </h1>
            <p className="mb-stack-lg max-w-2xl text-lead text-on-surface-variant">{profile.summary}</p>

            <div className="mb-stack-lg flex flex-wrap gap-4">
              <a
                className="flex items-center gap-2 rounded bg-primary-fixed px-6 py-3 font-medium text-on-primary-fixed transition-colors hover:bg-primary-fixed-dim"
                href="#projects"
              >
                View Projects
                <ArrowRight size={18} />
              </a>
              <a
                className="rounded border border-outline px-6 py-3 font-medium text-on-surface transition-colors hover:border-primary-fixed hover:text-primary-fixed"
                href="#contact"
              >
                Get in Touch
              </a>
            </div>

            <dl className="grid max-w-xl grid-cols-3 border-y border-surface-container-highest">
              {stats.map((stat) => (
                <div className="py-5 pr-4" key={stat.label}>
                  <dt className="font-code text-label uppercase text-on-surface-variant">{stat.label}</dt>
                  <dd className="mt-2 font-code text-2xl font-bold text-primary-fixed">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="rounded-xl border border-primary-fixed/20 bg-surface-container/95 shadow-glow">
              <div className="flex h-12 items-center justify-between border-b border-surface-container-highest px-4">
                <div className="flex gap-2" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-error" />
                  <span className="h-3 w-3 rounded-full bg-accent" />
                  <span className="h-3 w-3 rounded-full bg-success" />
                </div>
                <span className="font-code text-xs uppercase text-on-surface-variant">portfolio.ts</span>
              </div>
              <div className="space-y-5 p-5 font-code text-code">
                <p className="text-on-surface-variant">
                  <span className="text-primary-fixed">const</span> engineer = {"{"}
                </p>
                <div className="grid gap-3 pl-5">
                  <p>
                    name: <span className="text-tertiary">"{profile.name}"</span>,
                  </p>
                  <p>
                    focus: <span className="text-tertiary">"scalable backend & architecture"</span>,
                  </p>
                  <p>
                    stack: <span className="text-tertiary">["Python", "Django", "React"]</span>,
                  </p>
                  <p>
                    location: <span className="text-tertiary">"{profile.location}"</span>
                  </p>
                </div>
                <p className="text-on-surface-variant">{"}"}</p>
                <div className="grid gap-3 border-t border-surface-container-highest pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-on-surface-variant">API</span>
                    <span className="rounded bg-success/10 px-2 py-1 text-success">healthy</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-on-surface-variant">Deploy</span>
                    <span className="rounded bg-primary-fixed/10 px-2 py-1 text-primary-fixed">cloud ready</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-on-surface-variant">Design</span>
                    <span className="rounded bg-accent/10 px-2 py-1 text-accent">dark system</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-container border-t border-surface-container-highest px-gutter py-section" id="tech">
          <SectionTitle eyebrow="Capabilities" title="Tech Stack" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {techStack.map((tech) => {
              const Icon = iconMap[tech.icon as keyof typeof iconMap] ?? Code2;
              return (
                <div
                  className="group flex min-h-36 flex-col justify-between rounded-lg border border-surface-container-highest bg-surface-container p-5 transition-colors hover:border-primary-fixed"
                  key={tech.name}
                >
                  <Icon className="text-on-surface-variant transition-colors group-hover:text-primary-fixed" size={32} />
                  <div>
                    <div className="font-code text-code text-on-surface">{tech.name}</div>
                    <div className="mt-1 font-code text-xs uppercase text-on-surface-variant">{tech.category}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto w-full max-w-container border-t border-surface-container-highest px-gutter py-section" id="projects">
          <div className="mb-stack-lg flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionTitle eyebrow="Selected Work" title="Featured Projects" />
            <a className="font-code text-code text-primary-fixed transition-colors hover:text-primary" href={profile.socials[0].href}>
              More on GitHub
            </a>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((project, index) => (
              <article
                className={index === 2 ? "group rounded-xl border border-surface-container-highest bg-surface-container md:col-span-2" : "group rounded-xl border border-surface-container-highest bg-surface-container"}
                key={project.title}
              >
                <div className="h-56 overflow-hidden rounded-t-xl bg-surface-container-highest">
                  <img
                    alt={`${project.title} preview`}
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                    src={project.image}
                  />
                </div>
                <div className="p-6">
                  <div className="mb-stack-sm flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        className="rounded border border-primary-fixed/20 bg-primary-fixed/10 px-2 py-1 font-code text-[10px] uppercase text-primary-fixed"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-2 text-h3 font-semibold text-on-surface transition-colors group-hover:text-primary-fixed">
                    {project.title}
                  </h3>
                  <p className="mb-stack-md max-w-3xl text-on-surface-variant">{project.description}</p>
                  <div className="flex flex-wrap gap-4">
                    <a className="flex items-center gap-2 font-code text-code text-on-surface transition-colors hover:text-primary-fixed" href={project.sourceUrl}>
                      <Github size={16} />
                      View Source
                    </a>
                    <a className="flex items-center gap-2 font-code text-code text-on-surface transition-colors hover:text-primary-fixed" href={project.liveUrl}>
                      <ArrowUpRight size={16} />
                      Live Preview
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-container border-t border-surface-container-highest px-gutter py-section" id="experience">
          <SectionTitle eyebrow="Career" title="Experience" />
          <div className="max-w-3xl">
            {experience.map((item, index) => (
              <div className="relative border-l border-surface-container-highest pb-12 pl-8 last:pb-0" key={`${item.role}-${item.period}`}>
                <div
                  className={
                    index === 0
                      ? "absolute -left-[6.5px] top-2 h-3 w-3 rounded-full bg-primary-fixed shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                      : "absolute -left-[6.5px] top-2 h-3 w-3 rounded-full border border-surface-variant bg-surface-container-highest"
                  }
                />
                <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="text-h3 font-semibold text-on-surface">{item.role}</h3>
                  <span className="font-code text-code text-primary-fixed">{item.period}</span>
                </div>
                <div className="mb-4 font-medium text-on-surface-variant">{item.company}</div>
                <p className="text-on-surface-variant">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-container border-t border-surface-container-highest px-gutter py-section" id="contact">
          <div className="mx-auto mb-stack-lg max-w-2xl text-center">
            <p className="mb-3 font-code text-label uppercase text-primary-fixed">Contact</p>
            <h2 className="mb-4 text-h2 font-semibold text-on-surface">Let's Connect</h2>
            <p className="text-on-surface-variant">
              I am open to freelance work, product engineering roles, and technical collaboration.
            </p>
          </div>
          <ContactForm />
          <div className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-4 text-on-surface-variant">
            <a className="flex items-center gap-2 transition-colors hover:text-primary-fixed" href={profile.socials[1].href}>
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a className="flex items-center gap-2 transition-colors hover:text-primary-fixed" href={`mailto:${profile.email}`}>
              <Mail size={16} />
              {profile.email}
            </a>
            <a className="flex items-center gap-2 transition-colors hover:text-primary-fixed" href={profile.socials[3].href}>
              <Instagram size={16} />
              Instagram
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-surface-container-highest bg-surface-container-lowest py-10">
        <div className="mx-auto flex w-full max-w-container flex-col items-center justify-between gap-4 px-gutter text-center md:flex-row md:text-left">
          <div className="font-code font-bold text-on-surface">{profile.brand}</div>
          <div className="flex gap-6 font-code text-xs uppercase text-on-surface-variant">
            {profile.socials.map((social) => (
              <a className="transition-colors hover:text-primary-fixed" href={social.href} key={social.label}>
                {social.label}
              </a>
            ))}
          </div>
          <div className="font-code text-xs uppercase text-on-surface-variant">2026 Built with Precision.</div>
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-stack-lg">
      <p className="mb-3 font-code text-label uppercase text-primary-fixed">{eyebrow}</p>
      <h2 className="text-h2 font-semibold text-on-surface">{title}</h2>
    </div>
  );
}
