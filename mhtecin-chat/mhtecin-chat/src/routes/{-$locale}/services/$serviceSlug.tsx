import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { useLocale } from "@/i18n/useLocale";

export const Route = createFileRoute("/{-$locale}/services/$serviceSlug")({
  component: ServicePage,
});

function ServicePage() {
  const { serviceSlug } = Route.useParams();
  const { t, locale } = useLocale();

  const service = t.services.items.find((item) => item.slug === serviceSlug);
  if (!service) throw notFound();

  // ✅ Now reads from translations — changes with locale
  const extra = t.serviceExtras[service.slug] ?? {
    icon: "⚡",
    tagline: service.desc,
    overview: service.desc,
    benefits: [],
    process: [],
    stats: [],
    technologies: [],
    faqs: [],
  };

  return (
    <SiteLayout>

      {/* HERO */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-24 grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-4xl">{extra.icon}</span>
              <span className="text-sm uppercase tracking-widest text-primary font-semibold">
                MHTECHIN {t.services.kicker}
              </span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-foreground">
              {service.name}
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {extra.tagline}
            </p>

            <div className="mt-8 flex gap-4 flex-wrap">
              <Link
                to="/{-$locale}/contact"
                params={{ locale }}
                className="rounded-xl bg-primary px-6 py-3 text-primary-foreground font-semibold hover:opacity-90 transition"
              >
                {t.serviceDetail.talkToExpert}
              </Link>
              <Link
                to="/{-$locale}/services"
                params={{ locale }}
                className="rounded-xl border border-border px-6 py-3 font-semibold hover:bg-muted transition"
              >
                {t.serviceDetail.allServices}
              </Link>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-5">
            {extra.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border p-8">
                <div className="text-4xl font-bold text-foreground">{stat.value}</div>
                <div className="mt-2 text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="py-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <p className="text-primary uppercase tracking-widest text-sm font-semibold">
              {t.serviceDetail.overview}
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              {t.serviceDetail.whatWeDeliver}
            </h2>
          </div>
          <div className="lg:col-span-9">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {extra.overview}
            </p>
            <div className="mt-10 grid md:grid-cols-2 gap-4">
              {service.items.map((feature: string) => (
                <div key={feature} className="rounded-xl border border-border p-5">
                  <h3 className="font-semibold text-lg">{feature}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      {extra.benefits.length > 0 && (
        <section className="py-20 bg-muted/20 border-b border-border">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl font-bold mb-12">
              {t.serviceDetail.keyBenefits}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {extra.benefits.map((benefit, index) => (
                <div key={benefit.title} className="rounded-2xl border border-border bg-background p-8">
                  <div className="text-primary font-mono mb-4">0{index + 1}</div>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{benefit.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROCESS */}
      {extra.process.length > 0 && (
        <section className="py-20 border-b border-border">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl font-bold mb-12">
              {t.serviceDetail.deliveryProcess}
            </h2>
            <div className="space-y-6">
              {extra.process.map((step) => (
                <div key={step.step} className="rounded-2xl border border-border p-8 grid md:grid-cols-12 gap-6">
                  <div className="md:col-span-1 text-primary font-bold">{step.step}</div>
                  <div className="md:col-span-3 font-semibold text-xl">{step.title}</div>
                  <div className="md:col-span-8 text-muted-foreground leading-relaxed">{step.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TECHNOLOGIES */}
      {extra.technologies.length > 0 && (
        <section className="py-20 border-b border-border">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl font-bold mb-12">
              {t.serviceDetail.technologies}
            </h2>
            <div className="flex flex-wrap gap-3">
              {extra.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-border px-5 py-2">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {extra.faqs.length > 0 && (
        <section className="py-20 border-b border-border">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-3xl font-bold mb-12">
              {t.serviceDetail.faq}
            </h2>
            <div className="space-y-6">
              {extra.faqs.map((faq) => (
                <div key={faq.q} className="rounded-2xl border border-border p-8">
                  <h3 className="text-xl font-semibold">{faq.q}</h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OTHER SERVICES */}
      <section className="py-20 bg-muted/20 border-b border-border">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold mb-12">
            {t.serviceDetail.otherServices}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.items
              .filter((item) => item.slug !== service.slug)
              .map((item) => (
                <Link
                  key={item.slug}
                  to="/{-$locale}/services/$serviceSlug"
                  params={{ locale, serviceSlug: item.slug }}
                  className="rounded-2xl border border-border p-8 hover:bg-muted/30 transition"
                >
                  <div className="text-3xl mb-4">
                    {t.serviceExtras[item.slug]?.icon ?? "⚡"}
                  </div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="mt-3 text-muted-foreground">{item.desc}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl font-bold">
            {t.serviceDetail.ctaTitle}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {t.serviceDetail.ctaSub}
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              to="/{-$locale}/contact"
              params={{ locale }}
              className="rounded-xl bg-primary px-7 py-4 text-primary-foreground font-semibold hover:opacity-90 transition"
            >
              {t.serviceDetail.startProject}
            </Link>
            <Link
              to="/{-$locale}/services"
              params={{ locale }}
              className="rounded-xl border border-border px-7 py-4 font-semibold hover:bg-muted transition"
            >
              {t.serviceDetail.browseServices}
            </Link>
          </div>
        </div>
      </section>

    </SiteLayout>
  );
}