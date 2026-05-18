"use client";

import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/lib/portfolio";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Tech Stack", href: "#tech" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(navItems[0].href.slice(1));

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 96;
      const pageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let currentSection = sectionIds[0];

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);

        if (section && section.offsetTop <= scrollPosition) {
          currentSection = sectionId;
        }
      }

      setActiveSection(pageBottom ? sectionIds[sectionIds.length - 1] : currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-container-highest bg-surface-container-highest/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-container items-center justify-between px-gutter">
        <a className="font-code text-lg font-bold text-primary-fixed" href="#about">
          {profile.brand}
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const sectionId = item.href.slice(1);
            const isActive = activeSection === sectionId;

            return (
              <a
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "border-b-2 border-primary-fixed pb-1 text-primary-fixed transition-colors"
                    : "border-b-2 border-transparent pb-1 text-on-surface-variant transition-colors hover:border-outline-variant hover:text-on-surface"
                }
                href={item.href}
                key={item.href}
                onClick={() => setActiveSection(sectionId)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <a
          className="hidden items-center gap-2 rounded bg-primary-fixed px-4 py-2 font-medium text-on-primary-fixed transition-colors hover:bg-primary-fixed-dim md:flex"
          download="Muhammad_Nizar_Aulia_CV.docx"
          href={profile.resumeUrl}
        >
          <Download size={18} />
          Resume
        </a>

        <button
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          className="inline-flex h-10 w-10 items-center justify-center rounded border border-outline-variant text-on-surface md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen ? (
        <nav className="border-t border-surface-container-highest bg-surface-container px-gutter py-4 md:hidden">
          <div className="mx-auto flex max-w-container flex-col gap-3">
            {navItems.map((item) => {
              const sectionId = item.href.slice(1);
              const isActive = activeSection === sectionId;

              return (
                <a
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "rounded border border-primary-fixed bg-primary-fixed/10 px-4 py-3 text-primary-fixed transition-colors"
                      : "rounded border border-outline-variant px-4 py-3 text-on-surface-variant transition-colors hover:border-primary-fixed hover:text-primary-fixed"
                  }
                  href={item.href}
                  key={item.href}
                  onClick={() => {
                    setActiveSection(sectionId);
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
