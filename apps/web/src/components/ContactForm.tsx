"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? "")
    };

    try {
      const response = await fetch(`${apiBaseUrl}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      form.reset();
      setState("success");
      setMessage("Message sent. I will get back to you soon.");
    } catch {
      setState("error");
      setMessage("Unable to send right now. Please use the email link below.");
    }
  }

  return (
    <form className="mx-auto max-w-xl space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block font-code text-label uppercase text-on-surface-variant" htmlFor="name">
          Name
        </label>
        <input
          className="w-full border-b border-surface-container-highest bg-surface-container px-4 py-3 text-on-surface outline-none transition-colors placeholder:text-outline focus:border-primary-fixed focus:ring-0"
          id="name"
          name="name"
          placeholder="John Doe"
          required
          type="text"
        />
      </div>
      <div>
        <label className="mb-2 block font-code text-label uppercase text-on-surface-variant" htmlFor="email">
          Email
        </label>
        <input
          className="w-full border-b border-surface-container-highest bg-surface-container px-4 py-3 text-on-surface outline-none transition-colors placeholder:text-outline focus:border-primary-fixed focus:ring-0"
          id="email"
          name="email"
          placeholder="john@example.com"
          required
          type="email"
        />
      </div>
      <div>
        <label className="mb-2 block font-code text-label uppercase text-on-surface-variant" htmlFor="message">
          Message
        </label>
        <textarea
          className="min-h-36 w-full resize-none border-b border-surface-container-highest bg-surface-container px-4 py-3 text-on-surface outline-none transition-colors placeholder:text-outline focus:border-primary-fixed focus:ring-0"
          id="message"
          name="message"
          placeholder="Hello..."
          required
        />
      </div>
      <button
        className="flex w-full items-center justify-center gap-2 rounded bg-primary-fixed px-6 py-4 font-semibold text-on-primary-fixed transition-colors hover:bg-primary-fixed-dim disabled:cursor-not-allowed disabled:opacity-70"
        disabled={state === "submitting"}
        type="submit"
      >
        <Send size={18} />
        {state === "submitting" ? "Sending..." : "Send Message"}
      </button>
      {message ? (
        <p className={state === "success" ? "text-center text-success" : "text-center text-error"}>{message}</p>
      ) : null}
    </form>
  );
}
