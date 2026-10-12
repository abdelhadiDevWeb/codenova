import Image from "next/image";
import {
  ArrowRightIcon,
  CheckIcon,
  DownloadIcon,
  MobileIcon,
  ShieldIcon,
} from "@/components/icons";
import type { Dictionary } from "@/lib/dictionaries/types";
import { site } from "@/lib/site";

export function Hero({ dict }: { dict: Dictionary }) {
  const { hero, header } = dict;
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-hero" />
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 -z-10 size-[520px] rounded-full bg-aqua-300/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute top-60 -left-40 -z-10 size-[420px] rounded-full bg-brand-500/15 blur-3xl"
      />

      <div className="container-page grid grid-cols-1 items-center gap-16 pt-16 pb-20 lg:grid-cols-[1.05fr_1fr] lg:pt-24 lg:pb-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-3.5 py-1.5 text-sm font-medium text-navy-800 shadow-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-aqua-400 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-aqua-400" />
            </span>
            {dict.site.tagline}
          </p>

          <h1 className="mt-6 text-4xl leading-[1.1] font-extrabold tracking-tight text-navy-900 sm:text-5xl lg:text-[3.5rem] rtl:leading-[1.35]">
            {hero.titleStart} <span className="text-gradient">{hero.titleHighlight}</span>
            {hero.titleEnd}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">{hero.description}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#consultation" className="btn btn-primary btn-lg">
              {header.freeConsultation}
              <ArrowRightIcon className="size-5" />
            </a>
            <a
              href={site.catalogueHref}
              download={site.catalogueFileName}
              className="btn btn-outline btn-lg"
            >
              <DownloadIcon className="size-5" />
              {header.downloadCatalogue}
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
            {hero.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <CheckIcon className="size-3.5" strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual hero={hero} />
      </div>
    </section>
  );
}

function HeroVisual({ hero }: { hero: Dictionary["hero"] }) {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-xl lg:mx-0">
      <div className="relative rounded-3xl border border-slate-200/80 bg-white p-2 shadow-2xl shadow-navy-900/10">
        <div className="flex items-center gap-2 rounded-t-2xl border-b border-slate-100 px-4 py-3">
          <span className="size-3 rounded-full bg-slate-200" />
          <span className="size-3 rounded-full bg-slate-200" />
          <span className="size-3 rounded-full bg-slate-200" />
          <span className="ms-3 flex h-6 flex-1 items-center rounded-md bg-slate-100 px-3 text-xs text-slate-400">
            yourbusiness.com
          </span>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="h-3 w-20 rounded-full bg-navy-900/80" />
            <div className="hidden gap-3 sm:flex">
              <div className="h-2 w-10 rounded-full bg-slate-200" />
              <div className="h-2 w-10 rounded-full bg-slate-200" />
              <div className="h-2 w-10 rounded-full bg-slate-200" />
            </div>
            <div className="h-6 w-16 rounded-full bg-brand-500" />
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-navy-900 p-6">
            <div className="absolute -top-10 -inset-e-10 size-40 rounded-full bg-aqua-400/30 blur-2xl" />
            <div className="relative space-y-3">
              <div className="h-3.5 w-3/4 rounded-full bg-white/90" />
              <div className="h-3.5 w-1/2 rounded-full bg-white/90" />
              <div className="h-2 w-2/3 rounded-full bg-white/35" />
              <div className="flex gap-2 pt-2">
                <div className="h-7 w-24 rounded-full bg-aqua-400" />
                <div className="h-7 w-20 rounded-full border border-white/30" />
              </div>
            </div>
            <Image
              src="/logo-mark.png"
              alt=""
              width={480}
              height={257}
              className="absolute inset-e-5 bottom-5 h-10 w-auto opacity-90"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {["bg-brand-50", "bg-aqua-300/20", "bg-slate-100"].map((tone) => (
              <div key={tone} className={`space-y-2 rounded-xl p-3 ${tone}`}>
                <div className="size-6 rounded-lg bg-white shadow-sm" />
                <div className="h-2 w-4/5 rounded-full bg-navy-900/25" />
                <div className="h-2 w-3/5 rounded-full bg-navy-900/15" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 -inset-s-4 flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-xl shadow-navy-900/10 sm:-inset-s-8">
        <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <MobileIcon className="size-5" />
        </span>
        <span>
          <span className="block text-sm font-semibold text-navy-900">{hero.mobileTitle}</span>
          <span className="block text-xs text-slate-500">{hero.mobileSubtitle}</span>
        </span>
      </div>

      <div className="absolute -top-5 -inset-e-3 flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-xl shadow-navy-900/10 sm:-inset-e-6">
        <span className="flex size-10 items-center justify-center rounded-xl bg-aqua-300/25 text-aqua-600">
          <ShieldIcon className="size-5" />
        </span>
        <span>
          <span className="block text-sm font-semibold text-navy-900">{hero.secureTitle}</span>
          <span className="block text-xs text-slate-500">{hero.secureSubtitle}</span>
        </span>
      </div>
    </div>
  );
}
