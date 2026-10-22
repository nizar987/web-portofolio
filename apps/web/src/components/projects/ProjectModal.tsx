"use client";

import { animate, stagger } from "animejs";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Lock, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import type { CatalogProject } from "@/lib/project-catalog";
import { StatusBadge } from "./StatusBadge";

interface ProjectModalProps {
  projects: CatalogProject[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

function privateNote(project: CatalogProject): string {
  if (project.org === "Praktis") return "Internal company system — source is not public.";
  if (project.status === "contributor") return "Private repository owned by the client.";
  return "Private repository — happy to walk through it on request.";
}

function motionDuration(ms: number): number {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : ms;
}

export function ProjectModal({ projects, index, onIndexChange, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const previousIndex = useRef<number | null>(null);
  const isClosing = useRef(false);

  const project = index === null ? null : projects[index];
  const total = projects.length;

  const requestClose = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open || isClosing.current) return;
    isClosing.current = true;

    animate(panelRef.current!, { opacity: 0, translateY: 20, duration: motionDuration(200), ease: "in(2)" });
    animate(overlayRef.current!, {
      opacity: 0,
      duration: motionDuration(220),
      ease: "linear",
      onComplete: () => {
        dialog.close();
        isClosing.current = false;
        onClose();
      }
    });
  }, [onClose]);

  const step = useCallback(
    (direction: 1 | -1) => {
      if (index === null) return;
      onIndexChange((index + direction + total) % total);
    },
    [index, onIndexChange, total]
  );

  // Open, or animate content when moving between projects.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || index === null) return;

    const contentItems = contentRef.current?.children ?? [];

    if (!dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
      animate(overlayRef.current!, { opacity: [0, 1], duration: motionDuration(260), ease: "linear" });
      animate(panelRef.current!, { opacity: [0, 1], translateY: [28, 0], duration: motionDuration(520), ease: "out(4)" });
      animate(contentItems, {
        opacity: [0, 1],
        translateY: [10, 0],
        delay: stagger(45, { start: motionDuration(120) }),
        duration: motionDuration(460),
        ease: "out(3)"
      });
    } else if (previousIndex.current !== null && previousIndex.current !== index) {
      const forward = index === (previousIndex.current + 1) % total;
      animate(contentItems, {
        opacity: [0, 1],
        translateX: [forward ? 18 : -18, 0],
        delay: stagger(30),
        duration: motionDuration(380),
        ease: "out(3)"
      });
      panelRef.current?.querySelector("[data-modal-scroll]")?.scrollTo({ top: 0 });
    }

    previousIndex.current = index;
  }, [index, total]);

  useEffect(() => {
    if (index === null) {
      document.documentElement.style.overflow = "";
      previousIndex.current = null;
    }
  }, [index]);

  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  }

  return (
    <dialog
      aria-labelledby="project-modal-title"
      className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-paper backdrop:bg-transparent"
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      onKeyDown={handleKeyDown}
      ref={dialogRef}
    >
      <div aria-hidden="true" className="fixed inset-0 bg-ink-sunken/80 backdrop-blur-sm" onClick={requestClose} ref={overlayRef} />

      <div className="pointer-events-none relative flex min-h-full items-end justify-center sm:items-center sm:p-6">
        <article
          className="pointer-events-auto relative flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-2xl border border-ink-line-strong bg-ink-raised shadow-2xl shadow-black/50 sm:max-h-[86vh] sm:max-w-2xl sm:rounded-2xl"
          ref={panelRef}
        >
          {project ? (
            <>
              <header className="flex items-start justify-between gap-6 border-b border-ink-line px-6 pb-6 pt-6 sm:px-8 sm:pt-8">
                <div>
                  <p className="font-mono text-meta uppercase text-paper-faint">
                    {project.org === "Praktis" ? <span className="text-signal">Praktis · </span> : null}
                    {project.category} · {project.period ?? project.year}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-paper" id="project-modal-title">
                    {project.name}
                  </h2>
                  <StatusBadge className="mt-4" status={project.status} />
                </div>
                <button
                  aria-label="Close project details"
                  className="-mr-2 -mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-paper-dim transition-colors duration-200 hover:bg-ink hover:text-paper"
                  onClick={requestClose}
                  type="button"
                >
                  <X aria-hidden="true" size={20} />
                </button>
              </header>

              <div className="overflow-y-auto overscroll-contain px-6 py-6 sm:px-8 sm:py-8" data-modal-scroll>
                <div className="space-y-8" ref={contentRef}>
                  <p className="text-lead text-paper">{project.description}</p>

                  <section>
                    <h3 className="mb-3 font-mono text-meta uppercase text-paper-faint">Highlights</h3>
                    <ul className="space-y-3">
                      {project.highlights.map((highlight) => (
                        <li className="relative pl-6 text-paper-dim" key={highlight}>
                          <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-3 bg-signal" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="mb-3 font-mono text-meta uppercase text-paper-faint">Stack</h3>
                    <ul className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <li
                          className="rounded-full border border-ink-line-strong px-3 py-1 font-mono text-meta uppercase text-paper-dim"
                          key={tech}
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="mb-3 font-mono text-meta uppercase text-paper-faint">Links</h3>
                    {project.links.length ? (
                      <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                        {project.links.map((link) => (
                          <li key={link.href}>
                            <a
                              className={
                                link.kind === "live"
                                  ? "group inline-flex h-11 items-center gap-2 rounded-full bg-signal px-5 font-medium text-signal-ink transition-colors duration-200 hover:bg-signal-soft"
                                  : "group inline-flex h-11 items-center gap-2 rounded-full border border-ink-line-strong px-5 text-paper transition-colors duration-200 hover:border-paper-faint hover:bg-ink"
                              }
                              href={link.href}
                              rel="noreferrer"
                              target="_blank"
                            >
                              {link.kind === "repo" ? <Github aria-hidden="true" size={16} /> : null}
                              {link.label}
                              <ArrowUpRight
                                aria-hidden="true"
                                className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                size={16}
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="inline-flex items-center gap-2 text-paper-dim">
                        <Lock aria-hidden="true" className="text-paper-faint" size={15} />
                        {privateNote(project)}
                      </p>
                    )}
                  </section>
                </div>
              </div>

              <footer className="flex items-center justify-between gap-4 border-t border-ink-line px-4 py-3 sm:px-6">
                <button
                  className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm text-paper-dim transition-colors duration-200 hover:bg-ink hover:text-paper"
                  onClick={() => step(-1)}
                  type="button"
                >
                  <ArrowLeft aria-hidden="true" size={16} />
                  Previous
                </button>
                <span aria-live="polite" className="font-mono text-meta text-paper-faint">
                  {String((index ?? 0) + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <button
                  className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm text-paper-dim transition-colors duration-200 hover:bg-ink hover:text-paper"
                  onClick={() => step(1)}
                  type="button"
                >
                  Next
                  <ArrowRight aria-hidden="true" size={16} />
                </button>
              </footer>
            </>
          ) : null}
        </article>
      </div>
    </dialog>
  );
}
