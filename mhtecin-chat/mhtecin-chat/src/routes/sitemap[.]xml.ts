import { createFileRoute } from "@tanstack/react-router";
import { LOCALES, DEFAULT_LOCALE, LOCALE_META } from "@/i18n/config";
import { getDict } from "@/i18n/translations";

const BASE_URL = "https://mhtechin.com";
const BASE_PATHS = [
  { p: "/", changefreq: "weekly", priority: "1.0" },
  { p: "/products", changefreq: "weekly", priority: "0.9" },
  { p: "/services", changefreq: "weekly", priority: "0.9" },
  { p: "/industries", changefreq: "weekly", priority: "0.85" },
  { p: "/business", changefreq: "weekly", priority: "0.9" },
  { p: "/about", changefreq: "monthly", priority: "0.7" },
  { p: "/contact", changefreq: "monthly", priority: "0.6" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const t = getDict(DEFAULT_LOCALE);
        const productSlugs = Object.keys(t.productDescriptions || {});
        const serviceSlugs = Object.keys(t.serviceExtras || {});

        const paths = [
          ...BASE_PATHS,
          ...productSlugs.map((slug) => ({
            p: `/products/${slug}`,
            changefreq: "weekly",
            priority: "0.8",
          })),
          ...serviceSlugs.map((slug) => ({
            p: `/services/${slug}`,
            changefreq: "weekly",
            priority: "0.8",
          })),
        ];

        const urls: string[] = [];
        for (const entry of paths) {
          for (const locale of LOCALES) {
            const path =
              locale === DEFAULT_LOCALE
                ? entry.p
                : entry.p === "/"
                ? `/${locale}`
                : `/${locale}${entry.p}`;
            
            const alternates = LOCALES.map((l) => {
              const altPath =
                l === DEFAULT_LOCALE
                  ? entry.p
                  : entry.p === "/"
                  ? `/${l}`
                  : `/${l}${entry.p}`;
              return `    <xhtml:link rel="alternate" hreflang="${LOCALE_META[l].htmlLang}" href="${BASE_URL}${altPath}" />`;
            }).join("\n");

            urls.push(
              [
                `  <url>`,
                `    <loc>${BASE_URL}${path}</loc>`,
                `    <changefreq>${entry.changefreq}</changefreq>`,
                `    <priority>${entry.priority}</priority>`,
                alternates,
                `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${entry.p}" />`,
                `  </url>`,
              ].join("\n")
            );
          }
        }

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join(
          "\n"
        )}\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
