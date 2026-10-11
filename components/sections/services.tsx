import type { ComponentType, SVGProps } from "react";
import { CheckIcon, CodeIcon, DesignIcon, DesktopIcon, MobileIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary, ServiceIcon } from "@/lib/dictionaries/types";

const icons: Record<ServiceIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  web: CodeIcon,
  design: DesignIcon,
  mobile: MobileIcon,
  desktop: DesktopIcon,
};

export function Services({ dict }: { dict: Dictionary["services"] }) {
  return (
    <section id="services" className="section bg-white">
      <div className="container-page">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} description={dict.description} />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {dict.items.map((service) => {
            const Icon = icons[service.icon];
            return (
              <article
                key={service.icon}
                className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-navy-900/5 sm:p-8"
              >
                <span className="flex size-13 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-brand-500/25">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-navy-900">{service.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{service.description}</p>
                <ul className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                  {service.features.map((feature) => (
                    <li key={feature.title} className="flex gap-3 text-[0.95rem] leading-6">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                        <CheckIcon className="size-3.5" strokeWidth={2.5} />
                      </span>
                      <span className="text-slate-600">
                        <span className="font-semibold text-navy-900">{feature.title}</span>
                        {feature.detail ? <> — {feature.detail}</> : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
