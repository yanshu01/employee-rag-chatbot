import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Cloud, Shield, Cpu, BarChart3, Workflow, Globe2, ArrowRight, CheckCircle2, Quote, Mail, Loader2 } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { toast } from "sonner";
import { getDict } from "@/i18n/translations";
import { normalizeLocale, LOCALE_META } from "@/i18n/config";
import { FreeAdviceBand, ResearchStrip, ColorSpectrum, UseCases, QuickContact, LogosRibbon } from "@/components/extra-sections";
import { RelatedLinks } from "@/components/seo-nav";
import { canonicalFor, hreflangLinks, webPageSchema } from "@/lib/seo";
import { submitNewsletter } from "@/lib/newsletter";
import { GenerativeAiCanvas } from "@/components/GenerativeAiCanvas";

const icons = [Cloud, Cpu, BarChart3, Shield, Workflow, Globe2];

export const Route = createFileRoute("/{-$locale}/")({
  head: ({ params }) => {
    const locale = normalizeLocale((params as { locale?: string }).locale);
    const t = getDict(locale);
    const canonical = canonicalFor("/", locale);
    return {
      meta: [
        { title: t.seo.homeTitle },
        { name: "description", content: t.seo.homeDesc },
        { property: "og:title", content: t.seo.homeTitle },
        { property: "og:description", content: t.seo.homeDesc },
        { property: "og:url", content: canonical },
        { property: "og:image", content: "https://mhtechin.com/logo.png" },
        { property: "og:locale", content: LOCALE_META[locale].htmlLang.replace("-", "_") },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: canonical }, ...hreflangLinks("/")],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(webPageSchema({ title: t.seo.homeTitle, description: t.seo.homeDesc, path: "/", locale })) },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: t.home.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: HomePage,
});

function HomePage() {
  const { t, lp } = useLocale();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const result = await submitNewsletter({ data: { email } });
      if (result.success) {
        toast.success(result.message);
        setEmail("");
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.success("Thank you for subscribing! You'll receive our latest insights soon.");
      setEmail("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <GenerativeAiCanvas />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">{t.home.pill}</span>
            <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]">{t.home.h1}</h1>
            <p className="mt-3 text-base font-medium text-muted-foreground">{t.home.tagline}</p>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{t.home.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={lp("/contact")} className="btn-brand inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold">
                {t.home.ctaTalk} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to={lp("/products")} className="btn-outline-brand inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold">{t.home.ctaExplore}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {t.home.stats.map((s) => (
            <div key={s.l}>
              <div className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">{s.v}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.home.pillarsKicker}</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">{t.home.pillarsTitle}</h2>
            <p className="mt-4 text-muted-foreground">{t.home.pillarsBlurb}</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border">
            {t.home.pillars.map((p, i) => {
              const Icon = icons[i];
              return (
                <div key={p.title} className="bg-background p-6 hover:bg-muted/50 transition-colors">
                  <Icon className="h-6 w-6 text-foreground" />
                  <h3 className="mt-4 text-base font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border" style={{ background: "var(--gradient-dark)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-primary-foreground">{t.home.ctaBandTitle}</h2>
            <p className="mt-2 text-sm text-primary-foreground/70">{t.home.ctaBandSub}</p>
          </div>
          <Link to={lp("/contact")} className="inline-flex items-center gap-2 rounded-md bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-surface transition-colors">
            {t.home.ctaBandBtn} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.home.trustKicker}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{t.home.trustTitle}</h2>
            <p className="mt-4 text-muted-foreground">{t.home.trustBlurb}</p>
          </div>
          <ul className="space-y-4">
            {t.home.trustItems.map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-foreground shrink-0 mt-0.5" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.home.solutions.kicker}</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">{t.home.solutions.title}</h2>
            <p className="mt-4 text-muted-foreground">{t.home.solutions.blurb}</p>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.home.solutions.items.map((s) => (
              <div key={s.name} className="rounded-lg border border-border bg-background p-6 hover:shadow-[var(--shadow-soft)] transition-shadow">
                <h3 className="text-base font-semibold text-foreground">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.home.process.kicker}</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">{t.home.process.title}</h2>
          </div>
          <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden border border-border">
            {t.home.process.items.map((p, i) => (
              <li key={p.name} className="bg-background p-6">
                <div className="text-xs font-mono text-muted-foreground">0{i + 1}</div>
                <h3 className="mt-3 text-base font-semibold text-foreground">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-surface border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.home.testimonials.kicker}</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">{t.home.testimonials.title}</h2>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {t.home.testimonials.items.map((t2) => (
              <figure key={t2.name} className="rounded-lg border border-border bg-background p-6">
                <Quote className="h-5 w-5 text-muted-foreground" />
                <blockquote className="mt-3 text-sm text-foreground leading-relaxed">"{t2.quote}"</blockquote>
                <figcaption className="mt-4 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{t2.name}</span> · {t2.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.home.partners.kicker}</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{t.home.partners.title}</h2>
            <p className="mt-3 text-muted-foreground">{t.home.partners.blurb}</p>
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-px bg-border border border-border rounded-lg overflow-hidden">
            {t.home.partners.items.map((p) => (
              <div key={p} className="bg-background p-5 text-center text-xs font-semibold text-foreground/80">{p}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.home.insights.kicker}</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">{t.home.insights.title}</h2>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {t.home.insights.items.map((a) => (
              <article key={a.title} className="rounded-lg border border-border bg-background p-6 flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{a.tag}</span>
                <h3 className="mt-3 text-base font-semibold text-foreground">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{a.desc}</p>
                <span className="mt-4 text-xs font-medium text-foreground">{t.home.insights.readMore}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border" style={{ background: "var(--gradient-dark)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/60">{t.home.newsletter.kicker}</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-primary-foreground">{t.home.newsletter.title}</h2>
            <p className="mt-3 text-sm text-primary-foreground/70">{t.home.newsletter.sub}</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.home.newsletter.placeholder}
                  className="w-full rounded-md border border-border bg-background pl-9 pr-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button type="submit" disabled={submitting} className="rounded-md bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-surface transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2">
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {t.home.newsletter.button}
              </button>
            </div>
            <p className="text-xs text-primary-foreground/50">{t.home.newsletter.note}</p>
          </form>
        </div>
      </section>

      <FreeAdviceBand />
      <ResearchStrip />
      <ColorSpectrum variant="home" />
      <UseCases variant="home" />
      <LogosRibbon />
      <QuickContact />
      <RelatedLinks
        heading="Browse MHTECHIN"
        links={[
          { to: "/products", title: t.nav.products, desc: "Cloud, AI, data, security, IoT & consumer products." },
          { to: "/services", title: t.nav.services, desc: "Strategy, build, run and AI/ML services." },
          { to: "/industries", title: t.nav.industries, desc: "Banking, healthcare, manufacturing, retail and more." },
          { to: "/business", title: t.nav.business, desc: "Free founder & SMB advisory — validation to taxation." },
          { to: "/about", title: t.nav.about, desc: "Our story, values and global delivery." },
          { to: "/contact", title: t.nav.contact, desc: "Talk to a senior solutions engineer." },
        ]}
      />
    </SiteLayout>
  );
}