import { cacheLife } from "next/cache";
import type { ReactNode } from "react";
import { DownloadIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import type { Dictionary } from "@/lib/dictionaries/types";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { footer } = dict;
  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo href={`/${lang}`} label={dict.header.home} variant="dark" />
          <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">{dict.site.description}</p>
        </div>

        <FooterColumn title={footer.services}>
          {dict.services.items.map((service) => (
            <li key={service.icon}>
              <a href="#services" className="footer-link">
                {service.title}
              </a>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title={footer.company}>
          {dict.nav
            .filter((link) => link.href !== "#services")
            .map((link) => (
              <li key={link.href}>
                <a href={link.href} className="footer-link">
                  {link.label}
                </a>
              </li>
            ))}
        </FooterColumn>

        <FooterColumn title={footer.getInTouch}>
          <li>
            <a href={`mailto:${site.email}`} className="footer-link inline-flex items-center gap-2.5">
              <MailIcon className="size-4 text-aqua-300" />
              <span dir="ltr">{site.email}</span>
            </a>
          </li>
          <li>
            <a href={site.phoneHref} className="footer-link inline-flex items-center gap-2.5">
              <PhoneIcon className="size-4 text-aqua-300" />
              <span dir="ltr">{site.phone}</span>
            </a>
          </li>
          <li>
            <a
              href={site.catalogueHref}
              download={site.catalogueFileName}
              className="footer-link inline-flex items-center gap-2.5"
            >
              <DownloadIcon className="size-4 text-aqua-300" />
              {footer.catalogue}
            </a>
          </li>
        </FooterColumn>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {site.name}. {footer.rights}
          </p>
          <p>{dict.site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wider text-white uppercase">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}
