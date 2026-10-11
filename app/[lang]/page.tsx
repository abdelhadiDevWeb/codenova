import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CatalogueCta } from "@/components/sections/catalogue-cta";
import { Consultation } from "@/components/sections/consultation";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <SiteHeader lang={lang} nav={dict.nav} labels={dict.header} />
      <main className="flex-1">
        <Hero dict={dict} />
        <Services dict={dict.services} />
        <Pricing dict={dict.pricing} getQuote={dict.header.getQuote} />
        <Consultation dict={dict.consultation} />
        <Process dict={dict.process} />
        <WhyUs dict={dict.whyUs} />
        <CatalogueCta dict={dict.catalogue} />
        <Contact dict={dict.contact} />
      </main>
      <SiteFooter lang={lang} dict={dict} />
    </>
  );
}
