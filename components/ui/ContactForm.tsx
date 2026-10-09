"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { contact, person } from "@/data/content";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-1.5 w-full rounded-xl border border-border bg-bg px-3.5 py-2.5 text-sm font-normal placeholder:text-muted/70 focus:border-accent focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-accent/15";

/**
 * Sends through Formspree when `contact.formspreeId` is set in data/content.ts,
 * otherwise opens the visitor's email client with the message pre-filled.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!contact.formspreeId) {
      const subject = `[${data.get("topic")}] Message from ${data.get("name")}`;
      const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
      window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${contact.formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Name
          <input name="name" required autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="text-sm font-medium">
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label className="mt-4 block text-sm font-medium">
        I&apos;m reaching out about
        <select name="topic" className={field} defaultValue="Research / PhD">
          <option>Research / PhD</option>
          <option>Client project</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="mt-4 block text-sm font-medium">
        Message
        <textarea
          name="message"
          required
          rows={5}
          className={`${field} resize-y`}
          placeholder="A few lines about what you have in mind"
        />
      </label>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg shadow-lift transition-all hover:brightness-110 disabled:opacity-60"
        >
          <Send className="size-4" aria-hidden />
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p role="status" aria-live="polite" className="text-sm">
          {status === "sent" && <span className="text-accent">Thanks! I&apos;ll get back to you soon.</span>}
          {status === "error" && (
            <span className="text-red-600 dark:text-red-400">
              Something went wrong. Please email me at {person.email}.
            </span>
          )}
          {status === "idle" && !contact.formspreeId && (
            <span className="text-muted">Opens your email app.</span>
          )}
        </p>
      </div>
    </form>
  );
}
