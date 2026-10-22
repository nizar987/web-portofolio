"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

interface CopyEmailProps {
  email: string;
}

type CopyState = "idle" | "copied" | "failed";

const RESET_AFTER_MS = 2200;

export function CopyEmail({ email }: CopyEmailProps) {
  const [state, setState] = useState<CopyState>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timeout = window.setTimeout(() => setState("idle"), RESET_AFTER_MS);
    return () => window.clearTimeout(timeout);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        className="break-all text-xl font-medium tracking-tight text-paper underline decoration-ink-line-strong underline-offset-[6px] transition-colors duration-200 hover:decoration-signal sm:text-2xl"
        href={`mailto:${email}`}
      >
        {email}
      </a>
      <button
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-ink-line-strong px-3 font-mono text-meta uppercase text-paper-dim transition-colors duration-200 hover:border-paper-faint hover:text-paper"
        onClick={copy}
        type="button"
      >
        {state === "copied" ? <Check aria-hidden="true" className="text-ok" size={14} /> : <Copy aria-hidden="true" size={14} />}
        {state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy"}
      </button>
      <span aria-live="polite" className="sr-only">
        {state === "copied" ? "Email address copied to clipboard" : state === "failed" ? "Could not copy email address" : ""}
      </span>
    </div>
  );
}
