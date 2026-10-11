"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import type { ContactFormDictionary } from "@/lib/dictionaries/types";
import { site } from "@/lib/site";

export function ContactForm({ dict }: { dict: ContactFormDictionary }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `${dict.emailSubject} — ${service} (${name})`;
    const body = [
      `${dict.emailName}: ${name}`,
      `${dict.emailContact}: ${contact}`,
      `${dict.emailService}: ${service}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-navy-900/5 sm:p-8"
    >
      <h3 className="text-xl font-bold text-navy-900">{dict.title}</h3>
      <p className="mt-1.5 text-sm text-slate-500">{dict.subtitle}</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label={dict.name} htmlFor="name">
          <input
            id="name"
            name="name"
            required
            dir="auto"
            autoComplete="name"
            className="input"
            placeholder={dict.namePlaceholder}
          />
        </Field>
        <Field label={dict.contact} htmlFor="contact">
          <input
            id="contact"
            name="contact"
            required
            dir="auto"
            className="input"
            placeholder={dict.contactPlaceholder}
          />
        </Field>
        <Field label={dict.service} htmlFor="service" className="sm:col-span-2">
          <select id="service" name="service" required defaultValue="" className="input">
            <option value="" disabled>
              {dict.servicePlaceholder}
            </option>
            {dict.services.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field label={dict.message} htmlFor="message" className="sm:col-span-2">
          <textarea
            id="message"
            name="message"
            required
            dir="auto"
            rows={5}
            className="input resize-y"
            placeholder={dict.messagePlaceholder}
          />
        </Field>
      </div>

      <button type="submit" className="btn btn-primary btn-lg mt-6 w-full">
        {dict.submit}
        <ArrowRightIcon className="size-5" />
      </button>

      <p role="status" className="mt-4 text-center text-sm text-slate-500">
        {sent ? (
          <span className="inline-flex items-center gap-1.5 text-brand-600">
            <CheckIcon className="size-4" strokeWidth={2.5} />
            {dict.sent}
          </span>
        ) : (
          <>
            {dict.note}{" "}
            <a
              href={`mailto:${site.email}`}
              dir="ltr"
              className="font-medium text-brand-600 hover:underline"
            >
              {site.email}
            </a>
          </>
        )}
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-navy-900">
        {label}
      </label>
      {children}
    </div>
  );
}
