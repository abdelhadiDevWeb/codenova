"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { ArrowRightIcon, BuildingIcon, CheckIcon, UserIcon } from "@/components/icons";
import { sendContactMessage, type ContactState } from "@/lib/actions/contact";
import type { ContactFormDictionary } from "@/lib/dictionaries/types";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

const initialState: ContactState = { status: "idle" };

const clientTypes = [
  { value: "individual", Icon: UserIcon },
  { value: "company", Icon: BuildingIcon },
] as const;

type ClientType = (typeof clientTypes)[number]["value"];

export function ContactForm({ dict, lang }: { dict: ContactFormDictionary; lang: Locale }) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const [clientType, setClientType] = useState<ClientType>("individual");
  const formRef = useRef<HTMLFormElement>(null);
  const isCompany = clientType === "company";

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  // Submitting manually (instead of <form action>) keeps the visitor's text if sending fails.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => formAction(data));
  }

  const emailLink = (
    <a href={`mailto:${site.email}`} dir="ltr" className="font-medium text-brand-600 hover:underline">
      {site.email}
    </a>
  );

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onReset={() => setClientType("individual")}
      className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-navy-900/5 sm:p-8"
    >
      <h3 className="text-xl font-bold text-navy-900">{dict.title}</h3>
      <p className="mt-1.5 text-sm text-slate-500">{dict.subtitle}</p>

      <input type="hidden" name="lang" value={lang} />
      <div aria-hidden="true" className="sr-only">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <fieldset className="sm:col-span-2">
          <legend className="mb-2 block text-sm font-medium text-navy-900">{dict.clientType}</legend>
          <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-slate-100 p-1.5">
            {clientTypes.map(({ value, Icon }) => (
              <label key={value} className="cursor-pointer">
                <input
                  type="radio"
                  name="clientType"
                  value={value}
                  checked={clientType === value}
                  onChange={() => setClientType(value)}
                  className="peer sr-only"
                />
                <span className="flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 transition peer-checked:bg-white peer-checked:text-navy-900 peer-checked:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500 hover:text-navy-900">
                  <Icon className="size-4.5 shrink-0" />
                  {dict[value]}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <Field label={dict.name} htmlFor="name" className={isCompany ? "" : "sm:col-span-2"}>
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
        {isCompany ? (
          <Field label={dict.companyName} htmlFor="company">
            <input
              id="company"
              name="company"
              required
              dir="auto"
              autoComplete="organization"
              className="input"
              placeholder={dict.companyNamePlaceholder}
            />
          </Field>
        ) : null}
        <Field label={dict.email} htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            dir="ltr"
            autoComplete="email"
            className="input rtl:text-right"
            placeholder={dict.emailPlaceholder}
          />
        </Field>
        <Field label={dict.phone} htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            dir="ltr"
            inputMode="tel"
            autoComplete="tel"
            minLength={8}
            maxLength={20}
            className="input rtl:text-right"
            placeholder={dict.phonePlaceholder}
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

      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary btn-lg mt-6 w-full disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? dict.sending : dict.submit}
        {pending ? null : <ArrowRightIcon className="size-5" />}
      </button>

      <p role="status" className="mt-4 text-center text-sm text-slate-500">
        {pending ? null : state.status === "success" ? (
          <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600">
            <CheckIcon className="size-4 shrink-0" strokeWidth={2.5} />
            {dict.success}
          </span>
        ) : state.status === "error" ? (
          <span className="text-red-600">
            {dict.error} {emailLink}
          </span>
        ) : state.status === "invalid" ? (
          <span className="text-red-600">{dict.invalid}</span>
        ) : (
          <>
            {dict.note} {emailLink}
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
