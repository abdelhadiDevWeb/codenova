import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  ar: () => import("./ar").then((module) => module.ar),
  en: () => import("./en").then((module) => module.en),
  fr: () => import("./fr").then((module) => module.fr),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
