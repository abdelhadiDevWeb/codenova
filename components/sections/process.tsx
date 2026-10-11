import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/lib/dictionaries/types";

export function Process({ dict }: { dict: Dictionary["process"] }) {
  return (
    <section id="process" className="section bg-white">
      <div className="container-page">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} description={dict.description} />

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-gradient-to-r from-brand-200 via-aqua-300 to-brand-200 lg:block"
          />
          <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {dict.steps.map((step, index) => (
              <li key={step.title} className="relative text-center">
                <span className="relative mx-auto flex size-14 items-center justify-center rounded-2xl border border-brand-100 bg-white text-lg font-extrabold text-brand-600 shadow-lg shadow-brand-500/10">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-lg font-bold text-navy-900">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs leading-7 text-slate-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
