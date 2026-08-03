import { useParams } from "@tanstack/react-router";
import { normalizeLocale, type Locale, localizedPath } from "./config";
import { getDict, type Dict } from "./translations";

type RouteParams = {
  locale?: string;
};

export function useLocale(): {
  locale: Locale;
  t: Dict;
  lp: (path: string) => string;
} {
  const params = useParams({ strict: false }) as RouteParams;

  const locale = normalizeLocale(params.locale);

  return {
    locale,
    t: getDict(locale),

    // localized path helper
    lp: (path: string) => localizedPath(path, locale),
  };
}