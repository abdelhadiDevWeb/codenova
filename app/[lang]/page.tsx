import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CatalogueCta } from "@/components/sections/catalogue-cta";
import { Consultation } from "@/components/sections/consultation";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { site } from "@/lib/site";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const pageUrl = `${site.url}/${lang}`;
  const algeria = { "@type": "Country", name: "Algeria" };
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        // ProfessionalService is a LocalBusiness, which lets Google tie the logo to a place in Algiers.
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${site.url}/#organization`,
        name: site.name,
        alternateName: ["Code Noova", "CodeNoova DZ"],
        url: site.url,
        logo: { "@type": "ImageObject", url: `${site.url}${site.logoPath}`, width: 512, height: 512 },
        image: `${site.url}${site.ogImagePath}`,
        description: dict.meta.description,
        slogan: dict.site.tagline,
        email: site.email,
        telephone: site.phoneHref.replace("tel:", ""),
        address: {
          "@type": "PostalAddress",
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          addressCountry: site.address.country,
        },
        areaServed: algeria,
        currenciesAccepted: "DZD",
        priceRange: "DA",
        knowsLanguage: ["ar", "fr", "en"],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: site.email,
          telephone: site.phoneHref.replace("tel:", ""),
          areaServed: "DZ",
          availableLanguage: ["Arabic", "French", "English"],
        },
        makesOffer: dict.services.items.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            areaServed: algeria,
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: ["ar", "fr", "en"],
        publisher: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: dict.meta.title,
        description: dict.meta.description,
        inLanguage: lang,
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#organization` },
        primaryImageOfPage: `${site.url}${site.ogImagePath}`,
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: lang,
        mainEntity: dict.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <SiteHeader lang={lang} nav={dict.nav} labels={dict.header} />
      <main className="flex-1">
        <Hero dict={dict} />
        <Services dict={dict.services} />
        <Pricing dict={dict.pricing} getQuote={dict.header.getQuote} />
        <Consultation dict={dict.consultation} />
        <Process dict={dict.process} />
        <WhyUs dict={dict.whyUs} />
        <CatalogueCta dict={dict.catalogue} />
        <Faq dict={dict.faq} />
        <Contact dict={dict.contact} lang={lang} />
      </main>
      <SiteFooter lang={lang} dict={dict} />
    </>
  );
}
