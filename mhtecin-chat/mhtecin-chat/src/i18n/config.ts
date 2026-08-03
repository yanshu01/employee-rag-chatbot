export const LOCALES = ["en", "jp", "de", "fr", "es", "cn"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META: Record<Locale, { label: string; native: string; htmlLang: string }> = {
  en: { label: "English", native: "English", htmlLang: "en" },
  jp: { label: "Japanese", native: "日本語", htmlLang: "ja" },
  de: { label: "German", native: "Deutsch", htmlLang: "de" },
  fr: { label: "French", native: "Français", htmlLang: "fr" },
  es: { label: "Spanish", native: "Español", htmlLang: "es" },
  cn: { label: "Chinese", native: "简体中文", htmlLang: "zh-Hans" },
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function normalizeLocale(value: string | undefined): Locale {
  if (!value) return DEFAULT_LOCALE;
  const val = value.toLowerCase();
  if (val === "ja" || val === "ja-jp") return "jp";
  if (val === "zh" || val === "zh-hans" || val === "zh-cn" || val === "zh-tw" || val === "zh-hk") return "cn";
  return isLocale(val) ? val : DEFAULT_LOCALE;
}

/** Prefix a path with the locale. EN returns the bare path. */
export function localizedPath(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return path;
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}
