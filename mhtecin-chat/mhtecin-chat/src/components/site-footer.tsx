import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { useLocale } from "@/i18n/useLocale";
import { DEFAULT_LOCALE } from "@/i18n/config";

export function SiteFooter() {
  const { t, lp, locale } = useLocale();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          
          {/* LOGO + INFO */}
          <div className="col-span-2">
            <img
              src={logo}
              alt="MHTECHIN"
              className="h-12 w-auto"
              style={{ filter: "invert(1)" }}
            />

            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              {t.footer.blurb}
            </p>
          </div>

          {/* PRODUCTS */}
          <FooterCol
            title={t.footer.productsCol}
            items={t.products.items.map((p) => ({
              label: p.name,
              to: "/{-$locale}/products/$productSlug",
              params: {
                locale:
                  locale === DEFAULT_LOCALE
                    ? undefined
                    : locale,

                productSlug: p.slug,
              },
            }))}
          />

          {/* SERVICES */}
          <FooterCol
            title={t.footer.servicesCol}
            items={t.services.items.slice(0, 6).map((s) => ({
              label: s.name,
              to: "/{-$locale}/services/$serviceSlug",
              params: {
                locale:
                  locale === DEFAULT_LOCALE
                    ? undefined
                    : locale,

                serviceSlug: s.slug,
              },
            }))}
          />

          {/* COMPANY */}
          <FooterCol
  title={t.footer.companyCol}
  items={[
    {
      label: t.nav.products,
      to: lp("/products"),
    },
    {
      label: t.nav.services,
      to: lp("/services"),
    },
    {
      label: t.nav.industries,
      to: lp("/industries"),
    },
    {
      label: t.nav.business,
      to: lp("/business"),
    },
    {
      label: t.nav.about,
      to: lp("/about"),
    },
    {
      label: t.nav.contact,
      to: lp("/contact"),
    },
  ]}
/>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} MHTECHIN.{" "}
            {t.footer.rights}
          </p>

          <p>{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

type FooterItem = {
  label: string;
  to: string;
  params?: Record<string, string | undefined>;
};

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: FooterItem[];
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
        {title}
      </h4>

      <ul className="mt-4 space-y-2">
        {items.map((i, idx) => (
          <li key={i.label + idx}>
            <Link
              to={i.to}
              params={i.params}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}