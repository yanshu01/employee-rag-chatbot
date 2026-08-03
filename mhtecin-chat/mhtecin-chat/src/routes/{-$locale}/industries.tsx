import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Banknote, HeartPulse, Factory, ShoppingBag, Landmark, Truck, GraduationCap, Zap } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { getDict } from "@/i18n/translations";
import { normalizeLocale } from "@/i18n/config";
import { ColorSpectrum, UseCases, ResearchStrip, FreeAdviceBand, BrandCTA, QuickContact } from "@/components/extra-sections";
import { Breadcrumbs, RelatedLinks } from "@/components/seo-nav";
import { canonicalFor, hreflangLinks, breadcrumbSchema, serviceSchema, webPageSchema } from "@/lib/seo";

const icons = [Banknote, HeartPulse, Factory, ShoppingBag, Landmark, Truck, GraduationCap, Zap];
const accents = ["#111111","#1f1f1f","#333333","#404040","#525252","#5c5c5c","#666666","#737373"];

export const Route = createFileRoute("/{-$locale}/industries")({
  head: ({ params }) => {
    const locale = normalizeLocale((params as { locale?: string }).locale);
    const t = getDict(locale);
    const canonical = canonicalFor("/industries", locale);
    return {
      meta: [
        { title: t.seo.industriesTitle },
        { name: "description", content: t.seo.industriesDesc },
        { property: "og:title", content: t.seo.industriesTitle },
        { property: "og:description", content: t.seo.industriesDesc },
        { property: "og:url", content: canonical },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: canonical }, ...hreflangLinks("/industries")],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(webPageSchema({ title: t.seo.industriesTitle, description: t.seo.industriesDesc, path: "/industries", locale })) },
        { type: "application/ld+json", children: JSON.stringify(serviceSchema({ name: "MHTECHIN Industry Solutions", description: t.seo.industriesDesc, path: "/industries", locale, serviceType: "Vertical Industry Solutions" })) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema([{ name: t.nav.home, path: "/" }, { name: t.nav.industries, path: "/industries" }], locale)) },
      ],
    };
  },
  component: IndustriesPage,
});

function IndustriesPage() {
  const { t } = useLocale();
  return (
    <SiteLayout>
      <Breadcrumbs items={[{ label: t.nav.industries }]} />
      <section className="border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.industries.kicker}</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-foreground max-w-3xl">{t.industries.h1}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{t.industries.sub}</p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.industries.items.map((it, i) => {
            const Icon = icons[i];
            const c = accents[i % accents.length];
            return (
              <div key={it.name} className="group relative rounded-2xl border border-border bg-card p-6 overflow-hidden hover:-translate-y-1 hover:shadow-[var(--shadow-brand)] transition-all">
                <span aria-hidden className="absolute -top-10 -right-10 h-28 w-28 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity" style={{ background: c }} />
                <div className="relative h-10 w-10 rounded-lg flex items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${c}, #737373)` }}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="relative mt-4 font-semibold text-foreground">{it.name}</h3>
                <p className="relative mt-2 text-sm text-muted-foreground">{it.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <ColorSpectrum
        kicker="Cross-industry capabilities"
        heading="Patterns we ship in every vertical"
        items={[
          { t: "Customer 360", d: "Unified profiles across channels with consent management." },
          { t: "Risk & fraud", d: "Real-time scoring, alerts, and case workflows." },
          { t: "Forecasting", d: "Demand, capacity and revenue prediction models." },
          { t: "Document AI", d: "Extraction, classification and validation at scale." },
          { t: "Compliance", d: "Auditable controls aligned to ISO, SOC 2, HIPAA, PCI." },
          { t: "Omnichannel", d: "Web, mobile, store and contact center, one platform." },
        ]}
      />
      <UseCases
        title="Selected industry use cases"
        cases={[
          { tag: "Banking", t: "AI loan underwriting", d: "Cut decisioning time from days to minutes with explainability." },
          { tag: "Health", t: "Clinician copilot", d: "Auto-draft notes & summaries with PHI-safe LLMs." },
          { tag: "Retail", t: "Dynamic pricing", d: "SKU-level elasticity and competitor-aware pricing." },
          { tag: "Manufacturing", t: "Predictive maintenance", d: "Sensor + vision models to prevent unplanned downtime." },
          { tag: "Logistics", t: "Route & yard ops", d: "Optimization across fleets, dock doors and SLAs." },
          { tag: "Public sector", t: "Citizen services", d: "Multilingual portals with secure identity." },
        ]}
      />
      <ResearchStrip title="Vertical benchmarks" />
      <FreeAdviceBand />
      <QuickContact />
      <RelatedLinks
        heading="Related"
        links={[
          { to: "/services", title: t.nav.services, desc: "Service pillars applied per industry." },
          { to: "/products", title: t.nav.products, desc: "Platforms used across verticals." },
          { to: "/business", title: t.nav.business, desc: "Founder/SMB programs and free advisory." },
          { to: "/about", title: t.nav.about, desc: "Global delivery model." },
          { to: "/contact", title: t.nav.contact, desc: "Speak with an industry specialist." },
        ]}
      />
      <BrandCTA title="See how MHTECHIN can transform your industry" to="/contact" label="Talk to a specialist" />
    </SiteLayout>
  );
}
