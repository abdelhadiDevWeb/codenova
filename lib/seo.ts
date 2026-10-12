import { defaultLocale, locales, type Locale } from "@/lib/i18n";

export const hreflang: Record<Locale, string> = {
  ar: "ar-DZ",
  en: "en",
  fr: "fr-DZ",
};

export const ogLocale: Record<Locale, string> = {
  ar: "ar_DZ",
  en: "en_US",
  fr: "fr_DZ",
};

export function languageAlternates(baseUrl = ""): Record<string, string> {
  return {
    ...Object.fromEntries(locales.map((locale) => [hreflang[locale], `${baseUrl}/${locale}`])),
    "x-default": `${baseUrl}/${defaultLocale}`,
  };
}
