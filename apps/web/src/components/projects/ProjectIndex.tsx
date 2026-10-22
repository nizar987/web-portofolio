"use client";

import { animate, stagger } from "animejs";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  catalogProjects,
  projectCategories,
  statusLabels,
  type CatalogProject,
  type ProjectCategory,
  type ProjectOrg
} from "@/lib/project-catalog";
import { ProjectModal } from "./ProjectModal";
import { StatusBadge } from "./StatusBadge";

// Org filters ("Praktis", "Personal") and category filters share one row.
type Filter = "All" | ProjectOrg | ProjectCategory;

const filters: Filter[] = ["All", "Praktis", "Personal", ...projectCategories];
const STACK_PREVIEW_COUNT = 3;

function matches(project: CatalogProject, filter: Filter): boolean {
  if (filter === "All") return true;
  if (filter === "Praktis" || filter === "Personal") return project.org === filter;
  return project.category === filter;
}

function countFor(filter: Filter): number {
  return catalogProjects.filter((project) => matches(project, filter)).length;
}

export function ProjectIndex() {
  const [filter, setFilter] = useState<Filter>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const hasFiltered = useRef(false);

  const visible = useMemo(
    () => catalogProjects.filter((project) => matches(project, filter)),
    [filter]
  );

  // Re-enter the rows whenever the filter changes (the first paint is handled by PageMotion).
  useEffect(() => {
    const list = listRef.current;
    if (!hasFiltered.current || !list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animation = animate(list.children, {
      opacity: [0, 1],
      translateY: [12, 0],
      delay: stagger(35),
      duration: 460,
      ease: "out(3)"
    });
    return () => {
      animation.revert();
    };
  }, [filter]);

  const handleClose = useCallback(() => setActiveIndex(null), []);

  function selectFilter(next: Filter) {
    hasFiltered.current = true;
    setFilter(next);
  }

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
      <div className="mb-8 flex flex-col gap-6 lg:col-span-9 lg:col-start-4 lg:flex-row lg:items-end lg:justify-between" data-reveal>
        <p className="max-w-[44ch] text-paper-dim">
          Systems I&apos;ve built at Praktis, plus the products and tools I build on my own. Select one for the details
          and links.
        </p>
        <div aria-label="Filter projects" className="flex flex-wrap gap-2" role="group">
          {filters.map((item) => (
            <button
              aria-pressed={filter === item}
              className={`inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-200 ${
                filter === item
                  ? "border-paper bg-paper text-ink"
                  : "border-ink-line-strong text-paper-dim hover:border-paper-faint hover:text-paper"
              }`}
              key={item}
              onClick={() => selectFilter(item)}
              type="button"
            >
              {item}
              <span className={`font-mono text-meta ${filter === item ? "text-ink/60" : "text-paper-faint"}`}>
                {countFor(item)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <ul className="border-t border-ink-line lg:col-span-9 lg:col-start-4" data-reveal ref={listRef}>
        {visible.map((project, index) => (
          <li className="border-b border-ink-line" key={project.slug}>
            <button
              aria-haspopup="dialog"
              className="group grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5 text-left sm:grid-cols-[3.5rem_minmax(0,1fr)_8.5rem_auto] lg:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,13rem)_8.5rem_auto]"
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <span className="hidden font-mono text-meta text-paper-faint sm:block">{project.year}</span>

              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <span className="text-lg font-medium tracking-tight text-paper transition-colors duration-200 group-hover:text-signal">
                    {project.name}
                  </span>
                  {project.org === "Praktis" ? (
                    <span className="rounded border border-signal/30 px-1.5 py-0.5 font-mono text-[10px] uppercase leading-none tracking-wider text-signal">
                      Praktis
                    </span>
                  ) : null}
                </span>
                <span className="mt-1 block text-sm leading-snug text-paper-dim">{project.summary}</span>
                <span className="mt-2 flex gap-3 font-mono text-meta uppercase text-paper-faint sm:hidden">
                  {project.year} · {statusLabels[project.status]}
                </span>
              </span>

              <span className="hidden truncate font-mono text-meta uppercase text-paper-faint lg:block">
                {project.stack.slice(0, STACK_PREVIEW_COUNT).join(" · ")}
              </span>

              <StatusBadge className="hidden sm:inline-flex" status={project.status} />

              <span
                aria-hidden="true"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-line-strong text-paper-dim transition-all duration-300 ease-out group-hover:rotate-90 group-hover:border-signal group-hover:text-signal"
              >
                <Plus size={16} />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <ProjectModal index={activeIndex} onClose={handleClose} onIndexChange={setActiveIndex} projects={visible} />
    </div>
  );
}
