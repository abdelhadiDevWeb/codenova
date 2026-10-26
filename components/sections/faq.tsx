import { ChevronDownIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/lib/dictionaries/types";

export function Faq({ dict }: { dict: Dictionary["faq"] }) {
  return (
    <section id="faq" className="section bg-white">
      <div className="container-page">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} description={dict.description} />

        <div className="mx-auto mt-14 max-w-3xl space-y-4">
          {dict.items.map((item, index) => (
            <details
              key={item.question}
              open={index === 0}
              className="group rounded-2xl border border-slate-200 bg-white transition open:border-brand-200 open:shadow-lg open:shadow-navy-900/5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 sm:p-6 [&::-webkit-details-marker]:hidden">
                <h3 className="text-base font-bold text-navy-900 sm:text-lg">{item.question}</h3>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition group-open:rotate-180">
                  <ChevronDownIcon className="size-4" strokeWidth={2.5} />
                </span>
              </summary>
              <p className="px-5 pb-5 leading-7 text-slate-600 sm:px-6 sm:pb-6">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
