import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/lib/i18n";
import { languageAlternates } from "@/lib/seo";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    changeFrequency: "monthly",
    priority: locale === defaultLocale ? 1 : 0.9,
    alternates: { languages: languageAlternates(site.url) },
  }));
}
