import { createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { useLocale } from "@/i18n/useLocale";
import { getDict } from "@/i18n/translations";
import { normalizeLocale } from "@/i18n/config";
import { ColorSpectrum, UseCases, ComparisonTable, FreeAdviceBand, ResearchStrip, BrandCTA, QuickContact } from "@/components/extra-sections";
import { Breadcrumbs, RelatedLinks } from "@/components/seo-nav";
import { canonicalFor, hreflangLinks, breadcrumbSchema, serviceSchema, webPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/services")({
  head: ({ params }) => {
    const locale = normalizeLocale((params as { locale?: string }).locale);
    const t = getDict(locale);
    const canonical = canonicalFor("/services", locale);
    return {
      meta: [
        { title: t.seo.servicesTitle },
        { name: "description", content: t.seo.servicesDesc },
        { property: "og:title", content: t.seo.servicesTitle },
        { property: "og:description", content: t.seo.servicesDesc },
        { property: "og:url", content: canonical },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: canonical }, ...hreflangLinks("/services")],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(webPageSchema({ title: t.seo.servicesTitle, description: t.seo.servicesDesc, path: "/services", locale })) },
        { type: "application/ld+json", children: JSON.stringify(serviceSchema({ name: "MHTECHIN Services", description: t.seo.servicesDesc, path: "/services", locale, serviceType: "Enterprise Technology Services" })) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema([{ name: t.nav.home, path: "/" }, { name: t.nav.services, path: "/services" }], locale)) },
      ],
    };
  },
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useLocale();
  const matchRoute = useMatchRoute();

  // If a child route (e.g. /services/digital-transformation) is active,
  // render ONLY the child — not the services listing page.
  const isChildActive = matchRoute({
    to: "/{-$locale}/services/$serviceSlug",
    fuzzy: true,
  });

  if (isChildActive) {
    return <Outlet />;
  }

  return (
    <SiteLayout>
      <Breadcrumbs items={[{ label: t.nav.services }]} />
      <section className="border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-gradient-brand">{t.services.kicker}</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-foreground max-w-3xl">{t.services.h1}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{t.services.sub}</p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-px bg-border border border-border rounded-lg overflow-hidden">
          {t.services.items.map((s, i) => (
            <div key={s.name} className="bg-background p-8 grid md:grid-cols-12 gap-6 hover:bg-muted/40 transition-colors">
              <div className="md:col-span-1 text-sm font-mono text-gradient-brand">0{i + 1}</div>
              <div className="md:col-span-4">
                <Link
                  to="/{-$locale}/services/$serviceSlug"
                  params={{ serviceSlug: s.slug }}
                  className="text-xl font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
                >
                  {s.name}
                </Link>
              </div>
              <div className="md:col-span-5"><p className="text-muted-foreground">{s.desc}</p></div>
              <div className="md:col-span-2">
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {s.items.map((it) => <li key={it}>· {it}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ColorSpectrum
        kicker="Service pillars"
        heading="A full-stack delivery partner — strategy to production"
        items={[
          { t: "Discovery & strategy", d: "Workshops, opportunity mapping, technical due diligence." },
          { t: "Architecture & design", d: "Cloud-native blueprints, threat models, data contracts." },
          { t: "Build & launch", d: "Cross-functional pods that ship to production every sprint." },
          { t: "Run & evolve", d: "SRE, FinOps, AIOps. Continuous performance and cost gains." },
          { t: "Data & AI", d: "Modern data stack, ML platforms, governed LLM applications." },
          { t: "Talent augmentation", d: "Senior engineers embedded in your team for spikes or quarters." },
        ]}
      />
      <UseCases
        title="What founders & enterprises hire us for"
        cases={[
          { tag: "Modernize", t: "Legacy → cloud-native", d: "Strangler-pattern migrations with zero-downtime cutovers." },
          { tag: "Build", t: "MVP to scaled product", d: "From Figma to live in 8–12 weeks, with hardening to follow." },
          { tag: "Optimize", t: "Cloud cost reset", d: "Average 40–60% spend reduction in 90 days." },
          { tag: "Secure", t: "Compliance acceleration", d: "ISO 27001, SOC 2 readiness with auditable controls." },
          { tag: "Automate", t: "Workflow AI", d: "Document, support, and ops copilots wired to your systems." },
          { tag: "Scale", t: "Global rollout", d: "Multi-region resilience, CDN, edge and observability." },
        ]}
      />
      <ComparisonTable
        title="MHTECHIN services vs. typical agencies"
        rows={[
          { feat: "Team seniority", us: "Senior-led pods", them: "Junior-heavy" },
          { feat: "Engagement model", us: "Outcomes & KPIs", them: "Time & materials" },
          { feat: "Handover", us: "Full code + docs + runbooks", them: "Partial assets" },
          { feat: "IP ownership", us: "100% yours", them: "Shared / licensed" },
          { feat: "Response time", us: "Same-day", them: "48–72h" },
        ]}
      />
      <ResearchStrip title="Outcomes our clients report" />
      <FreeAdviceBand />
      <QuickContact />
      <RelatedLinks
        heading="Related"
        links={[
          { to: "/products", title: t.nav.products, desc: "Platforms that ship the outcomes services deliver." },
          { to: "/industries", title: t.nav.industries, desc: "Domain-specific service patterns." },
          { to: "/business", title: t.nav.business, desc: "Founder & SMB advisory programs." },
          { to: "/about", title: t.nav.about, desc: "Our delivery model and global teams." },
          { to: "/contact", title: t.nav.contact, desc: "Scope a project with a senior architect." },
        ]}
      />
      <BrandCTA title={t.services.specificChallenge} to="/contact" label={t.services.startConv} />
    </SiteLayout>
  );
}