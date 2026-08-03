import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { useLocale } from "@/i18n/useLocale";

import { TRANSLATIONS } from "@/i18n/translations";

export const Route = createFileRoute("/{-$locale}/products/$productSlug")({
  component: ProductPage,
});

function ProductPage() {
  const { productSlug } = Route.useParams();
  const { t, locale } = useLocale();

  const product = t.products.items.find((p) => p.slug === productSlug);
  if (!product) throw notFound();

  
const enProduct = TRANSLATIONS.en.products.items.find((p: { slug: string }) => p.slug === productSlug);
const featureDescriptions = t.productDescriptions; // use current locale's descriptions

  return (
    <SiteLayout>

      {/* HERO */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-24 grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              MHTECHIN {t.products.kicker}
            </span>

            <h1 className="text-5xl font-bold tracking-tight mt-4">
              {product.name}
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {product.desc}
            </p>

            <div className="mt-8 flex gap-4 flex-wrap">
              <Link
                to="/{-$locale}/contact"
                params={{ locale }}
                className="rounded-xl bg-primary px-6 py-3 text-primary-foreground font-semibold hover:opacity-90 transition"
              >
                {t.productDetail.requestDemo}
              </Link>

              <Link
                to="/{-$locale}/products"
                params={{ locale }}
                className="rounded-xl border border-border px-6 py-3 font-semibold hover:bg-muted transition"
              >
                {t.productDetail.allProducts}
              </Link>
            </div>

            {/* PRODUCT STATS */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-border p-5">
                <div className="text-3xl font-bold">99%</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {t.productDetail.statReliability}
                </div>
              </div>
              <div className="rounded-2xl border border-border p-5">
                <div className="text-3xl font-bold">24/7</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {t.productDetail.statSupport}
                </div>
              </div>
              <div className="rounded-2xl border border-border p-5">
                <div className="text-3xl font-bold">100+</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {t.productDetail.statIntegrations}
                </div>
              </div>
              <div className="rounded-2xl border border-border p-5">
                <div className="text-3xl font-bold">✓</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {t.productDetail.statSecure}
                </div>
              </div>
            </div>
          </div>

          {/* FEATURES */}
          <div className="rounded-3xl border border-border p-10 bg-card">
            <h2 className="text-2xl font-bold">
              {t.productDetail.productFeatures}
            </h2>

            <div className="mt-8 grid gap-4">
              {product.bullets.map((feature, index) => {
  const enFeature = enProduct?.bullets[index] ?? feature;
  return (
    <div
      key={feature}
      className="rounded-xl border border-border p-5 hover:bg-muted/50 transition"
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 h-3 w-3 rounded-full bg-primary shrink-0" />
        <div>
          <h3 className="font-semibold">{feature}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {featureDescriptions[product.slug]?.[enFeature] ??
              t.productDetail.featureFallback}
          </p>
        </div>
      </div>
    </div>
  );
})}
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="py-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold">
              {t.productDetail.overview}
            </h2>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {product.desc}
            </p>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t.productDetail.overviewBody}
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold">
              {t.productDetail.keyBenefits}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              {t.productDetail.keyBenefitsSub}
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border p-8 bg-background">
              <h3 className="text-xl font-semibold">
                {t.productDetail.benefitPerfTitle}
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t.productDetail.benefitPerfBody}
              </p>
            </div>
            <div className="rounded-2xl border border-border p-8 bg-background">
              <h3 className="text-xl font-semibold">
                {t.productDetail.benefitScaleTitle}
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t.productDetail.benefitScaleBody}
              </p>
            </div>
            <div className="rounded-2xl border border-border p-8 bg-background">
              <h3 className="text-xl font-semibold">
                {t.productDetail.benefitSecTitle}
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t.productDetail.benefitSecBody}
              </p>
            </div>
            <div className="rounded-2xl border border-border p-8 bg-background">
              <h3 className="text-xl font-semibold">
                {t.productDetail.benefitIntTitle}
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t.productDetail.benefitIntBody}
              </p>
            </div>
            <div className="rounded-2xl border border-border p-8 bg-background">
              <h3 className="text-xl font-semibold">
                {t.productDetail.benefitAnalyticsTitle}
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t.productDetail.benefitAnalyticsBody}
              </p>
            </div>
            <div className="rounded-2xl border border-border p-8 bg-background">
              <h3 className="text-xl font-semibold">
                {t.productDetail.benefitSupportTitle}
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t.productDetail.benefitSupportBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold">
              {t.productDetail.useCasesTitle}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              {t.productDetail.useCasesSub}
            </p>
          </div>
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border p-8">
              <h3 className="text-2xl font-semibold">
                {t.productDetail.useCaseAutoTitle}
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t.productDetail.useCaseAutoBody}
              </p>
            </div>
            <div className="rounded-2xl border border-border p-8">
              <h3 className="text-2xl font-semibold">
                {t.productDetail.useCaseEngageTitle}
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t.productDetail.useCaseEngageBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-20 border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold">
              {t.productDetail.technologies}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              {t.productDetail.technologiesSub}
            </p>
          </div>
          <div className="mt-14 flex flex-wrap justify-center gap-4">
            {["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "PostgreSQL", "AWS", "Docker", "Firebase", "AI/ML"].map((tech) => (
              <div
                key={tech}
                className="rounded-full border border-border px-6 py-3 font-medium bg-background"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-b border-border">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold">
              {t.productDetail.faq}
            </h2>
          </div>
          <div className="mt-14 grid gap-6">
            <div className="rounded-2xl border border-border p-8">
              <h3 className="text-xl font-semibold">
                {t.productDetail.faqCustomTitle}
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t.productDetail.faqCustomBody}
              </p>
            </div>
            <div className="rounded-2xl border border-border p-8">
              <h3 className="text-xl font-semibold">
                {t.productDetail.faqDeployTitle}
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t.productDetail.faqDeployBody}
              </p>
            </div>
            <div className="rounded-2xl border border-border p-8">
              <h3 className="text-xl font-semibold">
                {t.productDetail.faqSupportTitle}
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {t.productDetail.faqSupportBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl font-bold">
            {t.productDetail.ctaTitle}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {t.productDetail.ctaSub}
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/{-$locale}/contact"
              params={{ locale }}
              className="rounded-xl bg-primary px-7 py-4 text-primary-foreground font-semibold hover:opacity-90 transition"
            >
              {t.productDetail.contactUs}
            </Link>
            <Link
              to="/{-$locale}/products"
              params={{ locale }}
              className="rounded-xl border border-border px-7 py-4 font-semibold hover:bg-muted transition"
            >
              {t.productDetail.allProducts}
            </Link>
          </div>
        </div>
      </section>

    </SiteLayout>
  );
}