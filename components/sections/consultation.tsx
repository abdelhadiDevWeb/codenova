import type { ComponentType, SVGProps } from "react";
import {
  ArrowRightIcon,
  ChatIcon,
  FileIcon,
  PhoneIcon,
  PresentationIcon,
  RouteIcon,
  ShieldIcon,
} from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import type { ConsultationIcon, Dictionary } from "@/lib/dictionaries/types";
import { site } from "@/lib/site";

const icons: Record<ConsultationIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  listen: ChatIcon,
  showcase: PresentationIcon,
  plan: RouteIcon,
  quote: FileIcon,
};

export function Consultation({ dict }: { dict: Dictionary["consultation"] }) {
  return (
    <section id="consultation" className="section relative isolate overflow-hidden bg-navy-900">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-40" />
      <div
        aria-hidden="true"
        className="absolute -top-32 -inset-e-32 -z-10 size-[28rem] rounded-full bg-aqua-400/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -inset-s-32 -z-10 size-[26rem] rounded-full bg-brand-500/30 blur-3xl"
      />

      <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div>
          <SectionHeading
            align="start"
            tone="dark"
            eyebrow={dict.eyebrow}
            title={dict.title}
            description={dict.description}
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#contact" className="btn btn-light btn-lg">
              {dict.book}
              <ArrowRightIcon className="size-5" />
            </a>
            <a href={site.phoneHref} className="btn btn-on-dark btn-lg">
              <PhoneIcon className="size-5" />
              {dict.call} <span dir="ltr">{site.phone}</span>
            </a>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm font-medium text-aqua-300">
            <ShieldIcon className="size-4" />
            {dict.badge}
          </p>
        </div>

        <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-sm sm:p-8">
          <h3 className="text-lg font-bold text-white">{dict.stepsTitle}</h3>
          <ol className="mt-6 space-y-6">
            {dict.steps.map((step) => {
              const Icon = icons[step.icon];
              return (
                <li key={step.icon} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-aqua-300 ring-1 ring-white/10">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h4 className="font-semibold text-white">{step.title}</h4>
                    <p className="mt-1 text-[0.95rem] leading-7 text-slate-300">{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
