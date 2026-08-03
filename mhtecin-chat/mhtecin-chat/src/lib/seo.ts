import { LOCALES, DEFAULT_LOCALE, LOCALE_META, type Locale, localizedPath } from "@/i18n/config";

const SITE = "https://mhtechin.com";

export function abs(path: string): string {
  return `${SITE}${path}`;
}

const REGIONAL_HREFLANGS: Record<Locale, string[]> = {
  en: ["en", "en-us", "en-gb", "en-in", "en-ca", "en-au"],
  jp: ["ja", "ja-jp"],
  de: ["de", "de-de", "de-at", "de-ch"],
  fr: ["fr", "fr-fr", "fr-ca", "fr-be", "fr-ch"],
  es: ["es", "es-es", "es-mx", "es-ar", "es-co", "es-cl", "es-pe"],
  cn: ["zh-Hans", "zh-cn", "zh-hk", "zh-tw", "zh-sg"],
};

/** Build hreflang alternate links for a given canonical path (without locale). */
export function hreflangLinks(basePath: string) {
  const alternates: { rel: string; hrefLang: string; href: string }[] = [];

  for (const l of LOCALES) {
    const url = abs(localizedPath(basePath, l));
    const codes = REGIONAL_HREFLANGS[l] || [LOCALE_META[l].htmlLang];
    for (const code of codes) {
      alternates.push({
        rel: "alternate",
        hrefLang: code,
        href: url,
      });
    }
  }

  alternates.push({ rel: "alternate", hrefLang: "x-default", href: abs(basePath) });
  return alternates;
}

export function canonicalFor(basePath: string, locale: Locale) {
  return abs(localizedPath(basePath, locale));
}

/** BreadcrumbList JSON-LD */
export function breadcrumbSchema(items: { name: string; path: string }[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(localizedPath(it.path, locale)),
    })),
  };
}

/** Service schema generator */
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  locale: Locale;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? opts.name,
    url: abs(localizedPath(opts.path, opts.locale)),
    inLanguage: LOCALE_META[opts.locale].htmlLang,
    provider: {
      "@type": "Organization",
      name: "MHTECHIN",
      url: SITE,
      logo: `${SITE}/logo.png`,
    },
    areaServed: "Worldwide",
  };
}

/** Compact WebPage schema with publisher + isPartOf reference */
export function webPageSchema(opts: { title: string; description: string; path: string; locale: Locale }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.title,
    description: opts.description,
    url: abs(localizedPath(opts.path, opts.locale)),
    inLanguage: LOCALE_META[opts.locale].htmlLang,
    isPartOf: { "@type": "WebSite", name: "MHTECHIN", url: SITE },
    publisher: { "@type": "Organization", name: "MHTECHIN", url: SITE, logo: `${SITE}/logo.png` },
  };
}

export { DEFAULT_LOCALE };
