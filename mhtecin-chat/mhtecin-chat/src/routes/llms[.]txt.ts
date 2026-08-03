import { createFileRoute } from "@tanstack/react-router";
import { LOCALES, DEFAULT_LOCALE, LOCALE_META } from "@/i18n/config";
import { getDict } from "@/i18n/translations";

const BASE_URL = "https://mhtechin.com";
const BASE_PATHS = [
  { p: "/", label: "Home" },
  { p: "/products", label: "Products" },
  { p: "/services", label: "Services" },
  { p: "/industries", label: "Industries" },
  { p: "/business", label: "Business (Founder Program)" },
  { p: "/about", label: "About Us" },
  { p: "/contact", label: "Contact" },
];

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () => {
        const t = getDict(DEFAULT_LOCALE);
        const productSlugs = Object.keys(t.productDescriptions || {});
        const serviceSlugs = Object.keys(t.serviceExtras || {});

        const markdown = [
          `# MHTECHIN — Machine Readable Summary`,
          ``,
          `> MHTECHIN is a global enterprise technology company delivering cloud, AI, data analytics, cybersecurity, and custom engineering. We help enterprises modernize and offer free strategy advisory for founders and SMB owners.`,
          ``,
          `Tagline: Think, Plan & Execute.`,
          `Canonical site: ${BASE_URL}`,
          `Preferred language: en (default). Localized routes are listed below and link back to canonical.`,
          ``,
          `## Core Pages (English - Canonical)`,
          ...BASE_PATHS.map((entry) => `- ${entry.label}: ${BASE_URL}${entry.p}`),
          ``,
          `## Dynamic Products (English - Canonical)`,
          ...productSlugs.map((slug) => `- Product Details (${slug}): ${BASE_URL}/products/${slug}`),
          ``,
          `## Dynamic Services (English - Canonical)`,
          ...serviceSlugs.map((slug) => `- Service Details (${slug}): ${BASE_URL}/services/${slug}`),
          ``,
          `## Alternate Localized Sections`,
          ``,
          `We support localized landing and inner pages in Japanese, German, French, Spanish, and Chinese Simplified.`,
          ``,
          ...LOCALES.filter((l) => l !== DEFAULT_LOCALE).map((locale) => {
            const meta = LOCALE_META[locale];
            const baseUrls = BASE_PATHS.map((entry) => {
              const path = entry.p === "/" ? `/${locale}` : `/${locale}${entry.p}`;
              return `  - ${entry.label}: ${BASE_URL}${path}`;
            });
            const productUrls = productSlugs.map(
              (slug) => `  - Product (${slug}): ${BASE_URL}/${locale}/products/${slug}`
            );
            const serviceUrls = serviceSlugs.map(
              (slug) => `  - Service (${slug}): ${BASE_URL}/${locale}/services/${slug}`
            );
            return [
              `### ${meta.label} (${locale})`,
              ...baseUrls,
              ...productUrls,
              ...serviceUrls,
              ``
            ].join("\n");
          }),
          `## Crawling & Sitemaps`,
          `- XML Sitemap: ${BASE_URL}/sitemap.xml`,
          `- Robots.txt: ${BASE_URL}/robots.txt`,
          `- AI Policy: ${BASE_URL}/ai.txt`,
          `- LLM Full-Text Context: ${BASE_URL}/llms-full.txt`,
        ].join("\n");

        return new Response(markdown, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
