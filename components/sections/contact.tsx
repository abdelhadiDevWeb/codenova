import { ContactForm } from "@/components/contact-form";
import { DownloadIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import type { Dictionary } from "@/lib/dictionaries/types";
import { site } from "@/lib/site";

export function Contact({ dict }: { dict: Dictionary["contact"] }) {
  const channels = [
    { icon: MailIcon, label: dict.emailLabel, value: site.email, href: `mailto:${site.email}` },
    { icon: PhoneIcon, label: dict.phoneLabel, value: site.phone, href: site.phoneHref },
  ];

  return (
    <section id="contact" className="section bg-slate-50">
      <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            align="start"
            eyebrow={dict.eyebrow}
            title={dict.title}
            description={dict.description}
          />

          <ul className="mt-10 space-y-4">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand-200 hover:shadow-lg hover:shadow-navy-900/5"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-slate-500">{label}</span>
                    <span className="block truncate text-lg font-semibold text-navy-900 group-hover:text-brand-600">
                      <span dir="ltr">{value}</span>
                    </span>
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.catalogueHref}
                download={site.catalogueFileName}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand-200 hover:shadow-lg hover:shadow-navy-900/5"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-white">
                  <DownloadIcon className="size-5" />
                </span>
                <span>
                  <span className="block text-sm text-slate-500">{dict.catalogueLabel}</span>
                  <span className="block text-lg font-semibold text-navy-900 group-hover:text-brand-600">
                    {dict.catalogueAction}
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <ContactForm dict={dict.form} />
      </div>
    </section>
  );
}
