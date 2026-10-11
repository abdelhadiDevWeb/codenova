"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { ArrowRightIcon, CloseIcon, DownloadIcon, MenuIcon } from "@/components/icons";
import { LanguageLinks, LanguageSwitcher } from "@/components/language-switcher";
import type { HeaderDictionary, NavLink } from "@/lib/dictionaries/types";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function SiteHeader({
  lang,
  nav,
  labels,
}: {
  lang: Locale;
  nav: NavLink[];
  labels: HeaderDictionary;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-slate-200/80 bg-white/90 shadow-sm shadow-slate-900/5 backdrop-blur-md"
          : "border-transparent bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div className="container-page flex h-18 items-center justify-between gap-6">
        <Logo href={`/${lang}`} label={labels.home} priority />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap text-slate-600 transition-colors hover:bg-brand-50 hover:text-navy-900"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-1 xl:flex">
          <LanguageSwitcher lang={lang} label={labels.language} />
          <a
            href={site.catalogueHref}
            download={site.catalogueFileName}
            className="btn btn-ghost"
          >
            <DownloadIcon className="size-4" />
            {labels.catalogue}
          </a>
          <a href="#consultation" className="btn btn-primary ms-1">
            {labels.freeConsultation}
            <ArrowRightIcon className="size-4" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? labels.closeMenu : labels.openMenu}
          className="inline-flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-navy-900 transition-colors hover:bg-brand-50 xl:hidden"
        >
          {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-slate-200 bg-white xl:hidden"
      >
        <nav aria-label="Mobile" className="container-page py-4">
          <ul className="flex flex-col">
            {nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-navy-900"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-slate-100 pt-4">
            <LanguageLinks lang={lang} label={labels.language} onNavigate={() => setOpen(false)} />
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <a
              href={site.catalogueHref}
              download={site.catalogueFileName}
              onClick={() => setOpen(false)}
              className="btn btn-outline"
            >
              <DownloadIcon className="size-4" />
              {labels.downloadCatalogue}
            </a>
            <a href="#consultation" onClick={() => setOpen(false)} className="btn btn-primary">
              {labels.freeConsultation}
              <ArrowRightIcon className="size-4" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
