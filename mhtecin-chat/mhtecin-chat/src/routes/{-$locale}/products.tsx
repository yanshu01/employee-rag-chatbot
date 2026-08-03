import { createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Cloud, BarChart3, Cpu, Shield, Radio, GitBranch, Smartphone } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { getDict } from "@/i18n/translations";
import { normalizeLocale } from "@/i18n/config";
import { ColorSpectrum, ComparisonTable, UseCases, FreeAdviceBand, ResearchStrip, BrandCTA } from "@/components/extra-sections";
import { Breadcrumbs, RelatedLinks } from "@/components/seo-nav";
import { canonicalFor, hreflangLinks, breadcrumbSchema, serviceSchema, webPageSchema } from "@/lib/seo";
import { Link } from "@tanstack/react-router";

const icons = [Cloud, BarChart3, Cpu, Shield, Radio, GitBranch, Smartphone];

export const Route = createFileRoute("/{-$locale}/products")({
  head: ({ params }) => {
    const locale = normalizeLocale((params as { locale?: string }).locale);
    const t = getDict(locale);
    const canonical = canonicalFor("/products", locale);
    return {
      meta: [
        { title: t.seo.productsTitle },
        { name: "description", content: t.seo.productsDesc },
        { property: "og:title", content: t.seo.productsTitle },
        { property: "og:description", content: t.seo.productsDesc },
        { property: "og:url", content: canonical },
        { property: "og:type", content: "website" },
      ],
      links: [
        { rel: "canonical", href: canonical },
        ...hreflangLinks("/products"),
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(webPageSchema({ title: t.seo.productsTitle, description: t.seo.productsDesc, path: "/products", locale })) },
        { type: "application/ld+json", children: JSON.stringify(serviceSchema({ name: "MHTECHIN Products", description: t.seo.productsDesc, path: "/products", locale, serviceType: "Enterprise Software Products" })) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema([{ name: t.nav.home, path: "/" }, { name: t.nav.products, path: "/products" }], locale)) },
      ],
    };
  },
  component: ProductsPage,
});

function ProductsPage() {
  const { t } = useLocale();
  const matchRoute = useMatchRoute();

  // If a child route (e.g. /products/cloud-platform) is active,
  // render ONLY the child — not the products listing page.
  const isChildActive = matchRoute({
    to: "/{-$locale}/products/$productSlug",
    fuzzy: true,
  });

  if (isChildActive) {
    return <Outlet />;
  }

  return (
    <SiteLayout>
      <Breadcrumbs items={[{ label: t.nav.products }]} />
      <section className="border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.products.kicker}</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-foreground max-w-3xl">{t.products.h1}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{t.products.sub}</p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.products.items.map((p, i) => {
            const Icon = icons[i];
            return (
              <Link
                key={p.name}
                to="/{-$locale}/products/$productSlug"
                params={{ productSlug: p.slug }}
                className="block"
              >
                <article className="rounded-lg border border-border bg-card p-6 hover:shadow-[var(--shadow-soft)] transition-shadow">
                  <div className="flex items-center justify-between">
                    <Icon className="h-6 w-6 text-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">
                      {p.tag}
                    </span>
                  </div>

                  <h2 className="mt-4 text-lg font-semibold text-foreground">
                    {p.name}
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {p.desc}
                  </p>

                  <ul className="mt-4 space-y-1.5">
                    {p.bullets.map((b) => (
                      <li key={b} className="text-xs text-muted-foreground flex gap-2">
                        <span className="text-foreground">·</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      <ColorSpectrum variant="products" />

<ComparisonTable />

<UseCases variant="products" />

<ResearchStrip variant="products" />
      <FreeAdviceBand />
      <RelatedLinks
        heading="Explore more"
        links={[
          { to: "/services", title: t.nav.services, desc: "Strategy, engineering & managed delivery." },
          { to: "/industries", title: t.nav.industries, desc: "Vertical solutions across regulated industries." },
          { to: "/business", title: t.nav.business, desc: "Founder validation, PMF, registration & taxation." },
          { to: "/about", title: t.nav.about, desc: "Who we are and how we deliver." },
          { to: "/contact", title: t.nav.contact, desc: "Talk to a product specialist." },
        ]}
      />
      <BrandCTA title={t.products.tailoredDemo} to="/contact" label={t.products.requestDemo} />
    </SiteLayout>
  );
}