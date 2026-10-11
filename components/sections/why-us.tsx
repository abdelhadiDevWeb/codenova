import type { ComponentType, SVGProps } from "react";
import { BoltIcon, MailIcon, PhoneIcon, ShieldIcon, SparkIcon, TargetIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary, ReasonIcon } from "@/lib/dictionaries/types";
import { site } from "@/lib/site";

const icons: Record<ReasonIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  target: TargetIcon,
  bolt: BoltIcon,
  spark: SparkIcon,
  shield: ShieldIcon,
};

export function WhyUs({ dict }: { dict: Dictionary["whyUs"] }) {
  return (
    <section id="why-us" className="section bg-brand-50/60">
      <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            align="start"
            eyebrow={dict.eyebrow}
            title={dict.title}
            description={dict.description}
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={site.phoneHref} className="btn btn-primary">
              <PhoneIcon className="size-4" />
              {dict.call} <span dir="ltr">{site.phone}</span>
            </a>
            <a href={`mailto:${site.email}`} className="btn btn-outline">
              <MailIcon className="size-4" />
              {dict.email}
            </a>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {dict.reasons.map((reason) => {
            const Icon = icons[reason.icon];
            return (
              <div
                key={reason.icon}
                className="rounded-3xl border border-white bg-white/90 p-6 shadow-sm shadow-navy-900/5"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-bold text-navy-900">{reason.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-7 text-slate-600">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
