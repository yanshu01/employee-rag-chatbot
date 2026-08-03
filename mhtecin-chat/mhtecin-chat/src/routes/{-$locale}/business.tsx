import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Lightbulb, TrendingUp, FlaskConical, Building2, FileText, Coins } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { getDict } from "@/i18n/translations";
import { normalizeLocale } from "@/i18n/config";
import { FreeAdviceBand, ColorSpectrum, UseCases, ResearchStrip, BrandCTA, QuickContact } from "@/components/extra-sections";
import { Breadcrumbs, RelatedLinks } from "@/components/seo-nav";
import { canonicalFor, hreflangLinks, breadcrumbSchema, serviceSchema, webPageSchema } from "@/lib/seo";

const icons = [Lightbulb, TrendingUp, FlaskConical, Building2, FileText, Coins];
const accents = ["#111111","#262626","#404040","#525252","#666666","#737373"];

export const Route = createFileRoute("/{-$locale}/business")({
  head: ({ params }) => {
    const locale = normalizeLocale((params as { locale?: string }).locale);
    const t = getDict(locale);
    const canonical = canonicalFor("/business", locale);
    return {
      meta: [
        { title: t.seo.businessTitle },
        { name: "description", content: t.seo.businessDesc },
        { property: "og:title", content: t.seo.businessTitle },
        { property: "og:description", content: t.seo.businessDesc },
        { property: "og:url", content: canonical },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: canonical }, ...hreflangLinks("/business")],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(webPageSchema({ title: t.seo.businessTitle, description: t.seo.businessDesc, path: "/business", locale })) },
        { type: "application/ld+json", children: JSON.stringify(serviceSchema({ name: "MHTECHIN Business — Founder & SMB Advisory", description: t.seo.businessDesc, path: "/business", locale, serviceType: "Business Advisory (Free for founders & SMB owners)" })) },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Offer",
            name: "Free 30-minute Strategy Call",
            description: "Free strategy advice for founders and SMB owners — validation, PMF, TRL, registration, taxation, fundraising.",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: canonical,
            seller: { "@type": "Organization", name: "MHTECHIN" },
          }),
        },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema([{ name: t.nav.home, path: "/" }, { name: t.nav.business, path: "/business" }], locale)) },
      ],
    };
  },
  component: BusinessPage,
});

function BusinessPage() {
  const { t } = useLocale();
  return (
    <SiteLayout>
      <Breadcrumbs items={[{ label: t.nav.business }]} />
      <section className="relative overflow-hidden border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div aria-hidden className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-40" style={{ background: "var(--gradient-brand)" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <span className="chip-brand inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">{t.business.kicker}</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-foreground max-w-3xl">{t.business.h1}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{t.business.sub}</p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.business.items.map((p, i) => {
            const Icon = icons[i] ?? Lightbulb;
            const c = accents[i % accents.length];
            return (
              <article key={p.name} className="group relative rounded-2xl border border-border bg-card p-6 overflow-hidden hover:-translate-y-1 hover:shadow-[var(--shadow-brand)] transition-all">
                <span aria-hidden className="absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity" style={{ background: c }} />
                <div className="relative h-10 w-10 rounded-lg flex items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${c}, #737373)` }}>
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="relative mt-4 text-lg font-semibold text-foreground">{p.name}</h2>
                <p className="relative mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <ul className="relative mt-4 space-y-1.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="text-xs text-muted-foreground flex gap-2"><span style={{ color: c }}>•</span> {b}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <FreeAdviceBand />

      <ColorSpectrum
        kicker="Founder toolkit"
        heading="From idea to revenue — everything a founder needs"
        items={[
          { t: "Idea validation", d: "Customer interviews, problem framing, demand signals." },
          { t: "Product-market fit", d: "Define & measure leading PMF indicators." },
          { t: "TRL advancement", d: "Move from TRL 1 (basic research) to TRL 9 (proven)." },
          { t: "Entity & registration", d: "Pvt Ltd, LLP, OPC, C-Corp — pick the right structure." },
          { t: "Taxation & GST/VAT", d: "Compliance setup, invoicing, return filings." },
          { t: "Fundraising prep", d: "Decks, model, data room, investor intros." },
          { t: "Go-to-market", d: "ICP, pricing, channel, launch playbook." },
          { t: "Hiring & ESOP", d: "First 10 hires, equity pool, comp benchmarks." },
          { t: "Tech architecture", d: "Right-sized stack that won't break at scale." },
        ]}
      />
      <UseCases
        title="Founders & SMB owners we've helped"
        cases={[
          { tag: "SaaS", t: "Solo founder → $1M ARR", d: "MVP, pricing experiments, GTM motion in 9 months." },
          { tag: "D2C", t: "Brand launch in 60 days", d: "Storefront, payments, ads, fulfillment wired in." },
          { tag: "Fintech", t: "Regulatory sandbox entry", d: "Compliance, KYC and audit-ready architecture." },
          { tag: "Deep-tech", t: "TRL 4 → TRL 7", d: "Pilots, IP strategy, grant applications." },
          { tag: "SMB", t: "Digitized ops", d: "POS, ERP-lite, dashboards — replaced spreadsheets." },
          { tag: "Edtech", t: "Multi-tenant platform", d: "Schools/coaching centers onboarded in days." },
        ]}
      />
      <ResearchStrip title="Founder program outcomes" />
      <QuickContact />
      <RelatedLinks
        heading="Related"
        links={[
          { to: "/services", title: t.nav.services, desc: "Engineering & operations help once you're past PMF." },
          { to: "/products", title: t.nav.products, desc: "Platforms founders can adopt incrementally." },
          { to: "/industries", title: t.nav.industries, desc: "Sector-specific playbooks." },
          { to: "/about", title: t.nav.about, desc: "Meet the MHTECHIN advisory team." },
          { to: "/contact", title: t.nav.contact, desc: "Book your free 30-minute strategy call." },
        ]}
      />
      <BrandCTA title={t.business.ctaTitle} sub="Free 30-minute strategy call. No commitment." to="/contact" label={t.business.ctaBtn} />
    </SiteLayout>
  );
}
