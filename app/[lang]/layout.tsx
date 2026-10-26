import type { Metadata } from "next";
import { Cairo, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale, localeDir, locales } from "@/lib/i18n";
import { languageAlternates, ogLocale } from "@/lib/seo";
import { site } from "@/lib/site";
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const { title, description, keywords } = dict.meta;
  const ogImage = { url: site.ogImagePath, width: 1200, height: 630, alt: site.name };
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
  const bingVerification = process.env.BING_SITE_VERIFICATION;

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    keywords,
    applicationName: site.name,
    creator: site.name,
    publisher: site.name,
    alternates: {
      canonical: `/${lang}`,
      languages: languageAlternates(),
    },
    openGraph: {
      title,
      description,
      url: `/${lang}`,
      siteName: site.name,
      type: "website",
      locale: ogLocale[lang],
      alternateLocale: locales.filter((locale) => locale !== lang).map((locale) => ogLocale[locale]),
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    verification: {
      ...(googleVerification && { google: googleVerification }),
      ...(bingVerification && { other: { "msvalidate.01": bingVerification } }),
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      dir={localeDir(lang)}
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${cairo.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
