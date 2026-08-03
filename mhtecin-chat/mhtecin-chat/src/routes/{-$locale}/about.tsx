import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { useLocale } from "@/i18n/useLocale";
import { getDict } from "@/i18n/translations";
import { normalizeLocale } from "@/i18n/config";
import { JourneyTimeline, ColorSpectrum, ResearchStrip, FreeAdviceBand, BrandCTA, QuickContact, StatBadge } from "@/components/extra-sections";
import { Breadcrumbs, RelatedLinks } from "@/components/seo-nav";
import { canonicalFor, hreflangLinks, breadcrumbSchema, webPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  head: ({ params }) => {
    const locale = normalizeLocale((params as { locale?: string }).locale);
    const t = getDict(locale);
    const canonical = canonicalFor("/about", locale);
    return {
      meta: [
        { title: t.seo.aboutTitle },
        { name: "description", content: t.seo.aboutDesc },
        { property: "og:title", content: t.seo.aboutTitle },
        { property: "og:description", content: t.seo.aboutDesc },
        { property: "og:url", content: canonical },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: canonical }, ...hreflangLinks("/about")],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(webPageSchema({ title: t.seo.aboutTitle, description: t.seo.aboutDesc, path: "/about", locale })) },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: t.seo.aboutTitle,
            url: canonical,
            mainEntity: { "@type": "Organization", name: "MHTECHIN", url: "https://mhtechin.com", logo: "https://mhtechin.com/logo.png" },
          }),
        },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema([{ name: t.nav.home, path: "/" }, { name: t.nav.about, path: "/about" }], locale)) },
      ],
    };
  },
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLocale();
  return (
    <SiteLayout>
      <Breadcrumbs items={[{ label: t.nav.about }]} />
      <section className="border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.about.kicker}</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-foreground max-w-3xl">{t.about.h1}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{t.about.sub}</p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t.about.storyTitle}</h2>
            <p className="mt-4 text-muted-foreground">{t.about.storyBody}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t.about.numbersTitle}</h2>
            <dl className="mt-4 grid grid-cols-2 gap-4">
              {t.about.numbers.map(([v, l], i) => (
                <StatBadge key={l} v={v} l={l} accent={(["blue","mid","purple","mid"] as const)[i % 4]} />
              ))}
            </dl>
          </div>
        </div>
      </section>

      <JourneyTimeline />

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t.about.standTitle}</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.about.values.map((v, i) => {
              const c = ["#111111","#404040","#5c5c5c","#737373"][i % 4];
              return (
                <div key={v.t} className="group relative rounded-2xl border border-border bg-card p-6 overflow-hidden">
                  <span aria-hidden className="absolute -top-10 -right-10 h-24 w-24 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity" style={{ background: c }} />
                  <div className="relative h-1.5 w-10 rounded-full" style={{ background: c }} />
                  <h3 className="relative mt-3 text-base font-semibold text-foreground">{v.t}</h3>
                  <p className="relative mt-2 text-sm text-muted-foreground">{v.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ColorSpectrum
        kicker="Leadership principles"
        heading="How we run MHTECHIN"
        items={[
          { t: "Customer obsession", d: "Every roadmap starts with a real user problem." },
          { t: "Bias for shipping", d: "Small, frequent releases. Learn in production." },
          { t: "Engineering rigor", d: "Tests, reviews, observability — non-negotiable." },
          { t: "Diversity & inclusion", d: "Global teams, multiple languages, equal voice." },
          { t: "Founder empathy", d: "We were founders. We invest free time to help others." },
          { t: "Open knowledge", d: "We publish research, talks and open-source." },
        ]}
      />
      <ResearchStrip title="By the numbers" />
      <FreeAdviceBand />
      <QuickContact />
      <RelatedLinks
        heading="Explore"
        links={[
          { to: "/products", title: t.nav.products, desc: "Our platforms." },
          { to: "/services", title: t.nav.services, desc: "How we engage." },
          { to: "/industries", title: t.nav.industries, desc: "Industries we serve." },
          { to: "/business", title: t.nav.business, desc: "Founder & SMB advisory." },
          { to: "/contact", title: t.nav.contact, desc: "Talk to us." },
        ]}
      />
      <BrandCTA title="Want to know more about MHTECHIN?" to="/contact" label="Get in touch" />
    </SiteLayout>
  );
}
