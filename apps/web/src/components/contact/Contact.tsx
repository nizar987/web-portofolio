import { ArrowUpRight } from "lucide-react";
import { getSocial, profile } from "@/lib/portfolio";
import { ContactForm } from "./ContactForm";
import { CopyEmail } from "./CopyEmail";

const contactLinks = [getSocial("LinkedIn"), getSocial("GitHub"), getSocial("Instagram")];

export function Contact() {
  return (
    <section aria-labelledby="contact-title" className="border-t border-ink-line" id="contact">
      <div className="mx-auto grid w-full max-w-shell gap-14 px-gutter py-24 lg:grid-cols-12 lg:gap-8 lg:py-32">
        <div className="lg:col-span-5" data-reveal>
          <p className="font-mono text-meta uppercase text-paper-faint">
            <span className="text-signal">05</span> / Contact
          </p>
          <h2 className="mt-4 max-w-[14ch] text-title font-semibold text-paper" id="contact-title">
            Let&apos;s build something reliable.
          </h2>
          <p className="mt-6 max-w-[44ch] text-paper-dim">
            I&apos;m open to technical lead roles, freelance work, and engineering collaboration. The fastest way to reach
            me is email.
          </p>

          <div className="mt-10">
            <CopyEmail email={profile.email} />
          </div>

          <ul className="mt-10 border-t border-ink-line">
            {contactLinks.map((social) => (
              <li className="border-b border-ink-line" key={social.label}>
                <a
                  className="group flex items-center justify-between gap-4 py-4 transition-colors duration-200 hover:text-signal"
                  href={social.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="font-mono text-meta uppercase text-paper-faint group-hover:text-signal">{social.label}</span>
                  <span className="flex min-w-0 items-center gap-2 text-paper group-hover:text-signal">
                    <span className="truncate">{social.handle}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      size={16}
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-6 font-mono text-meta uppercase text-paper-faint">
            {profile.location} · {profile.timezone}
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7" data-reveal>
          <ContactForm fallbackEmail={profile.email} />
        </div>
      </div>
    </section>
  );
}
