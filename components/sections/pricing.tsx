import { ArrowRightIcon, DownloadIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/lib/dictionaries/types";
import { site } from "@/lib/site";

export function Pricing({ dict, getQuote }: { dict: Dictionary["pricing"]; getQuote: string }) {
  return (
    <section id="pricing" className="section bg-slate-50">
      <div className="container-page">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} description={dict.description} />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.items.map((plan) => (
            <article
              key={plan.title}
              className="flex flex-col rounded-3xl border border-slate-200 bg-white p-7 transition duration-300 hover:border-brand-200 hover:shadow-xl hover:shadow-navy-900/5"
            >
              <h3 className="text-base font-semibold text-navy-900">{plan.title}</h3>
              <p className="mt-5 flex min-h-12 flex-wrap items-baseline gap-x-2">
                {plan.prefix ? (
                  <span className="text-sm font-medium text-slate-500">{plan.prefix}</span>
                ) : null}
                <span className="text-4xl font-extrabold tracking-tight text-navy-900">
                  {plan.price}
                </span>
                {plan.unit ? (
                  <span className="text-base font-semibold text-brand-600">{plan.unit}</span>
                ) : null}
              </p>
              <p className="mt-4 leading-7 text-slate-600">{plan.description}</p>
              {plan.note ? (
                <p className="mt-auto pt-5 text-sm leading-6 text-slate-500">* {plan.note}</p>
              ) : null}
            </article>
          ))}

          <article className="relative flex flex-col overflow-hidden rounded-3xl bg-navy-900 p-7 text-white">
            <div
              aria-hidden="true"
              className="absolute -top-16 -inset-e-16 size-48 rounded-full bg-aqua-400/30 blur-3xl"
            />
            <h3 className="relative text-xl font-bold">{dict.ctaTitle}</h3>
            <p className="relative mt-3 leading-7 text-slate-300">{dict.ctaDescription}</p>
            <div className="relative mt-auto flex flex-col gap-2 pt-6">
              <a href="#contact" className="btn btn-light">
                {getQuote}
                <ArrowRightIcon className="size-4" />
              </a>
              <a
                href={site.catalogueHref}
                download={site.catalogueFileName}
                className="btn btn-on-dark"
              >
                <DownloadIcon className="size-4" />
                {dict.ctaCatalogue}
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
