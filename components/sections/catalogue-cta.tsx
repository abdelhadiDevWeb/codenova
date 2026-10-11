import Image from "next/image";
import { DownloadIcon, ExternalIcon, FileIcon } from "@/components/icons";
import type { Dictionary } from "@/lib/dictionaries/types";
import { site } from "@/lib/site";

export function CatalogueCta({ dict }: { dict: Dictionary["catalogue"] }) {
  return (
    <section aria-labelledby="catalogue-title" className="bg-white py-20 sm:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy-900 px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
          <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
          <div
            aria-hidden="true"
            className="absolute -top-24 -inset-s-24 size-80 rounded-full bg-brand-500/40 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -inset-e-24 -bottom-32 size-96 rounded-full bg-aqua-400/30 blur-3xl"
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-aqua-300 ring-1 ring-white/15">
                <FileIcon className="size-4" />
                {dict.badge}
              </p>
              <h2
                id="catalogue-title"
                className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl"
              >
                {dict.title}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-slate-300">{dict.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={site.catalogueHref}
                  download={site.catalogueFileName}
                  className="btn btn-light btn-lg"
                >
                  <DownloadIcon className="size-5" />
                  {dict.download}
                </a>
                <a
                  href={site.catalogueHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-on-dark btn-lg"
                >
                  {dict.view}
                  <ExternalIcon className="size-4" />
                </a>
              </div>
              {dict.languageNote ? (
                <p className="mt-4 text-sm text-slate-400">{dict.languageNote}</p>
              ) : null}
            </div>

            <div aria-hidden="true" className="relative mx-auto hidden w-full max-w-xs lg:block">
              <div className="absolute inset-0 translate-x-4 translate-y-4 rotate-3 rounded-2xl bg-white/10" />
              <div className="relative rounded-2xl bg-white p-6 shadow-2xl">
                <Image src="/logo-mark.png" alt="" width={480} height={257} className="h-10 w-auto" />
                <p className="mt-4 text-lg font-extrabold tracking-tight">
                  <span dir="ltr">
                    <span className="text-navy-900">Code</span>
                    <span className="text-brand-500">Nova</span>
                  </span>
                </p>
                <p className="text-xs font-medium text-slate-500">{dict.coverLabel}</p>
                <div className="mt-6 space-y-2">
                  <div className="h-2 w-full rounded-full bg-slate-100" />
                  <div className="h-2 w-5/6 rounded-full bg-slate-100" />
                  <div className="h-2 w-4/6 rounded-full bg-slate-100" />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  <div className="h-14 rounded-lg bg-brand-50" />
                  <div className="h-14 rounded-lg bg-aqua-300/20" />
                  <div className="h-14 rounded-lg bg-aqua-300/20" />
                  <div className="h-14 rounded-lg bg-brand-50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
