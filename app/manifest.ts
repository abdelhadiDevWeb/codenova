import type { MetadataRoute } from "next";
import { defaultLocale } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Website & App Development Agency in Algeria`,
    short_name: site.name,
    description:
      "Website creation, mobile apps, custom software and AI integration for businesses in Algeria.",
    start_url: `/${defaultLocale}`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#112b5a",
    icons: [
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
