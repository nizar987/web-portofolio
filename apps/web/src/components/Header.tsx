"use client";

import { animate, stagger } from "animejs";
import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/portfolio";

interface NavItem {
  label: string;
  id: string;
  /** Separate route; everything else is a section on the home page. */
  path?: string;
}

const navItems: NavItem[] = [
  { label: "About", id: "about", path: "/about" },
  { label: "Work", id: "work" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Stack", id: "stack" },
  { label: "Contact", id: "contact" }
];

const sectionItems = navItems.filter((item) => !item.path);

function hrefFor(item: NavItem, onHome: boolean): string {
  if (item.path) return item.path;
  return onHome ? `#${item.id}` : `/#${item.id}`;
}

const ACTIVE_OFFSET_PX = 120;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const pathname = usePathname();
  const onHome = pathname === "/";
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      setIsScrolled(window.scrollY > 8);

      if (!onHome) {
        setActiveId(navItems.find((item) => item.path === pathname)?.id ?? null);
        return;
      }

      const scrollPosition = window.scrollY + ACTIVE_OFFSET_PX;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current: string | null = null;

      for (const item of sectionItems) {
        const section = document.getElementById(item.id);
        if (section && section.offsetTop <= scrollPosition) {
          current = item.id;
        }
      }

      setActiveId(atBottom ? sectionItems[sectionItems.length - 1].id : current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [onHome, pathname]);

  // Slide the underline to the active link.
  useEffect(() => {
    const indicator = indicatorRef.current;
    const nav = navRef.current;
    if (!indicator || !nav) return;

    const link = activeId ? nav.querySelector<HTMLAnchorElement>(`[data-nav="${activeId}"]`) : null;
    const animation = animate(indicator, {
      translateX: link ? link.offsetLeft : 0,
      width: link ? link.offsetWidth : 0,
      opacity: link ? 1 : 0,
      duration: prefersReducedMotion() ? 0 : 450,
      ease: "out(4)"
    });
    return () => {
      animation.pause();
    };
  }, [activeId]);

  useEffect(() => {
    const mobileNav = mobileNavRef.current;
    if (!isOpen || !mobileNav) return;

    const animation = animate(mobileNav.querySelectorAll("a"), {
      opacity: [0, 1],
      translateY: [-8, 0],
      delay: stagger(40),
      duration: prefersReducedMotion() ? 0 : 380,
      ease: "out(3)"
    });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      animation.revert();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        isScrolled || isOpen ? "border-b border-ink-line bg-ink/85 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        className="sr-only left-4 top-3 z-50 rounded-full bg-signal px-4 py-2 font-medium text-signal-ink focus:not-sr-only focus:absolute"
        href="#main"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-16 w-full max-w-shell items-center justify-between gap-6 px-gutter">
        <Link className="group flex items-center gap-3" href={onHome ? "#top" : "/"}>
          <span className="grid h-8 w-8 place-items-center rounded-full border border-ink-line-strong font-mono text-[11px] font-medium text-paper transition-colors duration-200 group-hover:border-signal group-hover:text-signal">
            NA
          </span>
          <span className="font-medium tracking-tight text-paper">{profile.shortName}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <div className="relative flex items-center gap-8" ref={navRef}>
            {navItems.map((item) => (
              <Link
                aria-current={activeId === item.id ? (item.path ? "page" : "location") : undefined}
                className={`py-2 text-sm transition-colors duration-200 ${
                  activeId === item.id ? "text-paper" : "text-paper-dim hover:text-paper"
                }`}
                data-nav={item.id}
                href={hrefFor(item, onHome)}
                key={item.id}
              >
                {item.label}
              </Link>
            ))}
            <span
              aria-hidden="true"
              className="absolute -bottom-px left-0 h-px w-0 bg-signal opacity-0"
              ref={indicatorRef}
            />
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <a
            className="hidden h-9 items-center gap-2 rounded-full border border-ink-line-strong px-4 text-sm text-paper transition-colors duration-200 hover:border-paper-faint hover:bg-ink-raised sm:inline-flex"
            download="Muhammad_Nizar_Aulia_CV.docx"
            href={profile.resumeUrl}
          >
            <Download aria-hidden="true" size={15} />
            Résumé
          </a>
          <button
            aria-controls="mobile-nav"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-line-strong text-paper md:hidden"
            onClick={() => setIsOpen((current) => !current)}
            type="button"
          >
            {isOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <nav aria-label="Mobile" className="border-t border-ink-line md:hidden" id="mobile-nav">
          <div className="mx-auto flex max-w-shell flex-col px-gutter py-3" ref={mobileNavRef}>
            {navItems.map((item) => (
              <Link
                aria-current={activeId === item.id ? (item.path ? "page" : "location") : undefined}
                className={`flex items-center justify-between border-b border-ink-line py-4 text-lg last:border-b-0 ${
                  activeId === item.id ? "text-signal" : "text-paper"
                }`}
                href={hrefFor(item, onHome)}
                key={item.id}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              className="mt-3 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-ink-line-strong text-paper sm:hidden"
              download="Muhammad_Nizar_Aulia_CV.docx"
              href={profile.resumeUrl}
            >
              <Download aria-hidden="true" size={16} />
              Download résumé
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
