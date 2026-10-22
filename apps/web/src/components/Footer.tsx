import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-ink-line">
      <div className="mx-auto flex w-full max-w-shell flex-col gap-4 px-gutter py-10 font-mono text-meta uppercase text-paper-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Next.js · NestJS · Three.js · anime.js</p>
        <a className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-paper" href="#top">
          Back to top
          <ArrowUp aria-hidden="true" size={14} />
        </a>
      </div>
    </footer>
  );
}
