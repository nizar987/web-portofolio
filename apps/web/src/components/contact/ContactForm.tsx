"use client";

import { Check, Loader2, Send } from "lucide-react";
import { FormEvent, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

interface ContactFormProps {
  fallbackEmail: string;
}

// Mirrors the limits in apps/api/src/dto/contact.dto.ts.
const LIMITS = { name: 80, email: 120, messageMin: 10, messageMax: 2000 };

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

const fieldClass =
  "w-full rounded-xl border border-ink-line-strong bg-ink px-4 py-3 text-paper outline-none transition-colors duration-200 placeholder:text-paper-faint hover:border-paper-faint focus:border-signal focus-visible:outline-none aria-[invalid=true]:border-danger";
const labelClass = "mb-2 block font-mono text-meta uppercase text-paper-dim";

export function ContactForm({ fallbackEmail }: ContactFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [messageLength, setMessageLength] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim()
    };

    setState("submitting");

    try {
      const response = await fetch(`${apiBaseUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Contact request failed with ${response.status}`);
      }

      form.reset();
      setMessageLength(0);
      setState("success");
    } catch {
      setState("error");
    }
  }

  const isSubmitting = state === "submitting";

  return (
    <form
      aria-describedby="contact-status"
      className="rounded-2xl border border-ink-line bg-ink-raised p-5 sm:p-8"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Name
          </label>
          <input
            autoComplete="name"
            className={fieldClass}
            id="name"
            maxLength={LIMITS.name}
            name="name"
            placeholder="Your name"
            required
            type="text"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            autoComplete="email"
            className={fieldClass}
            id="email"
            maxLength={LIMITS.email}
            name="email"
            placeholder="you@company.com"
            required
            type="email"
          />
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-baseline justify-between">
          <label className="block font-mono text-meta uppercase text-paper-dim" htmlFor="message">
            Message
          </label>
          <span className="font-mono text-meta text-paper-faint" id="message-count">
            {messageLength}/{LIMITS.messageMax}
          </span>
        </div>
        <textarea
          aria-describedby="message-count"
          className={`${fieldClass} min-h-40 resize-y`}
          id="message"
          maxLength={LIMITS.messageMax}
          minLength={LIMITS.messageMin}
          name="message"
          onChange={(event) => setMessageLength(event.target.value.length)}
          placeholder="What are you building, and where could I help?"
          required
        />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="min-h-6 text-sm" id="contact-status" role="status">
          {state === "success" ? (
            <span className="inline-flex items-center gap-2 text-ok">
              <Check aria-hidden="true" size={16} />
              Message sent — I&apos;ll get back to you soon.
            </span>
          ) : null}
          {state === "error" ? (
            <span className="text-danger">
              Couldn&apos;t send right now. Email me at{" "}
              <a className="underline underline-offset-4" href={`mailto:${fallbackEmail}`}>
                {fallbackEmail}
              </a>
              .
            </span>
          ) : null}
        </p>

        <button
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-signal px-6 font-medium text-signal-ink transition-colors duration-200 hover:bg-signal-soft disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? <Loader2 aria-hidden="true" className="animate-spin" size={18} /> : <Send aria-hidden="true" size={18} />}
          {isSubmitting ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
