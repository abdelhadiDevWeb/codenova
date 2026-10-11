"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CheckIcon, ChevronDownIcon, GlobeIcon } from "@/components/icons";
import { localeCookie, localeNames, locales, type Locale } from "@/lib/i18n";

function rememberLocale(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSwitcher({ lang, label }: { lang: Locale; label: string }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="language-menu"
        aria-label={`${label}: ${localeNames[lang]}`}
        className="btn btn-ghost gap-1.5 px-3"
      >
        <GlobeIcon className="size-4" />
        <span>{lang.toUpperCase()}</span>
        <ChevronDownIcon
          className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <ul
          id="language-menu"
          className="absolute inset-e-0 top-full z-50 mt-2 w-44 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-navy-900/10"
        >
          {locales.map((locale) => (
            <li key={locale}>
              <Link
                href={`/${locale}`}
                hrefLang={locale}
                lang={locale}
                aria-current={locale === lang ? "true" : undefined}
                onClick={() => {
                  rememberLocale(locale);
                  setOpen(false);
                }}
                className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-brand-50 hover:text-navy-900 ${
                  locale === lang ? "text-navy-900" : "text-slate-600"
                }`}
              >
                {localeNames[locale]}
                {locale === lang ? <CheckIcon className="size-4 text-brand-600" strokeWidth={2.5} /> : null}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function LanguageLinks({
  lang,
  label,
  onNavigate,
}: {
  lang: Locale;
  label: string;
  onNavigate?: () => void;
}) {
  return (
    <div>
      <p className="flex items-center gap-2 px-3 text-sm font-medium text-slate-500">
        <GlobeIcon className="size-4" />
        {label}
      </p>
      <ul className="mt-2 grid grid-cols-3 gap-2">
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={`/${locale}`}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === lang ? "true" : undefined}
              onClick={() => {
                rememberLocale(locale);
                onNavigate?.();
              }}
              className={`flex h-11 items-center justify-center rounded-xl border text-sm font-semibold transition-colors ${
                locale === lang
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-brand-200 hover:bg-brand-50"
              }`}
            >
              {localeNames[locale]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
