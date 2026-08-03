import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, CheckCircle2, MessageSquare, Calendar, Send, Award, Shield, Zap, Globe2, BarChart3, Layers } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";

/* ----------------------------- Visual atoms ----------------------------- */

export function GradientOrb({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute rounded-full blur-3xl opacity-60 ${className}`}
      style={{ background: "var(--gradient-brand)" }} />
  );
}

export function StatBadge({ v, l, accent = "blue" }: { v: string; l: string; accent?: "blue" | "purple" | "mid" }) {
  const map = { blue: "#111111", purple: "#737373", mid: "#404040" } as const;
  return (
    <div className="relative rounded-xl border border-border bg-card p-5 overflow-hidden">
      <span aria-hidden className="absolute -top-6 -right-6 h-20 w-20 rounded-full blur-2xl opacity-30" style={{ background: map[accent] }} />
      <div className="text-3xl font-semibold tracking-tight text-gradient-brand">{v}</div>
      <div className="mt-1 text-xs text-muted-foreground">{l}</div>
    </div>
  );
}

/* --------------------------- Free Business Advice --------------------------- */

export function FreeAdviceBand() {
  const { t, lp } = useLocale();
  const s = t.extraSections;
  const icons = [MessageSquare, Award, Shield, Zap];
  return (
    <section className="relative overflow-hidden border-y border-border">
      <div aria-hidden className="absolute inset-0" style={{ background: "var(--gradient-brand)" }} />
      <div aria-hidden className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #fff3 0, transparent 40%), radial-gradient(circle at 80% 80%, #fff3 0, transparent 40%)" }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-8 items-center text-white">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> {s.freeAdviceChip}
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">{s.freeAdviceTitle}</h2>
          <p className="mt-3 text-white/85 max-w-xl">{s.freeAdviceSub}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={lp("/contact")} className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#111111] hover:bg-white/90">
              <Calendar className="h-4 w-4" /> {s.freeAdviceBookBtn}
            </Link>
            <Link to={lp("/business")} className="inline-flex items-center gap-2 rounded-md border border-white/40 px-5 py-3 text-sm font-medium text-white hover:bg-white/10">
              {s.freeAdviceSeeBtn} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <ul className="grid sm:grid-cols-2 gap-3">
          {s.freeAdviceItems.map((x, i) => {
            const Icon = icons[i];
            return (
              <li key={x.t} className="rounded-xl bg-white/10 border border-white/20 p-4 backdrop-blur">
                <Icon className="h-5 w-5" />
                <div className="mt-2 font-semibold">{x.t}</div>
                <div className="text-xs text-white/80 mt-1">{x.d}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------ Research strip ------------------------------ */

export function ResearchStrip({ variant = "home", title }: { variant?: "home" | "products"; title?: string }) {
  const { t } = useLocale();
  const s = t.extraSections;
  return (
    <section className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
            {title || (variant === "products" ? s.researchProductsTitle : s.researchTitle)}
          </h2>
          <p className="text-sm text-muted-foreground max-w-md">{s.researchNote}</p>
        </div>
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {s.researchStats.map((x, i) => (
            <StatBadge key={x.l} v={x.v} l={x.l} accent={(["blue", "mid", "purple", "mid"] as const)[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Feature spectrum ------------------------------ */

export function ColorSpectrum({ 
  variant = "home", 
  kicker, 
  heading, 
  items 
}: { 
  variant?: "home" | "products"; 
  kicker?: string; 
  heading?: string; 
  items?: { t: string; d: string; }[];
}) {
  const { t } = useLocale();
  const s = t.extraSections;
  const grads = [
    "linear-gradient(135deg,#111111,#262626)",
    "linear-gradient(135deg,#262626,#404040)",
    "linear-gradient(135deg,#404040,#5c5c5c)",
    "linear-gradient(135deg,#5c5c5c,#737373)",
    "linear-gradient(135deg,#737373,#a3a3a3)",
    "linear-gradient(135deg,#111111,#737373)",
  ];
  const activeKicker = kicker || (variant === "products" ? s.productsSpectrumKicker : s.colorSpectrumKicker);
  const activeHeading = heading || (variant === "products" ? s.productsSpectrumTitle : s.colorSpectrumTitle);
  const activeItems = items || (variant === "products" ? s.productsSpectrumItems : s.colorSpectrumItems);
  return (
    <section className="bg-surface border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-gradient-brand">{activeKicker}</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">{activeHeading}</h2>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeItems.map((x, i) => (
            <div key={x.t} className="group rounded-2xl border border-border bg-card p-6 hover:-translate-y-1 hover:shadow-[var(--shadow-brand)] transition-all">
              <div className="h-10 w-10 rounded-lg flex items-center justify-center text-white" style={{ background: grads[i % grads.length] }}>
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">{x.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Comparison table ------------------------------ */

export function ComparisonTable({
  title,
  rows
}: {
  title?: string;
  rows?: { feat: string; us: string; them: string; }[];
}) {
  const { t } = useLocale();
  const s = t.extraSections;
  const activeTitle = title || s.comparisonTitle;
  const activeRows = rows || s.comparisonRows;
  return (
    <section className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{activeTitle}</h2>
        <div className="mt-8 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-white" style={{ background: "var(--gradient-brand)" }}>
                <th className="px-5 py-3 font-semibold">{s.comparisonHeaders.capability}</th>
                <th className="px-5 py-3 font-semibold">{s.comparisonHeaders.us}</th>
                <th className="px-5 py-3 font-semibold">{s.comparisonHeaders.them}</th>
              </tr>
            </thead>
            <tbody>
              {activeRows.map((r, i) => (
                <tr key={r.feat} className={i % 2 ? "bg-surface" : "bg-background"}>
                  <td className="px-5 py-3 font-medium text-foreground">{r.feat}</td>
                  <td className="px-5 py-3 text-foreground"><CheckCircle2 className="inline h-4 w-4 mr-1 text-[#111111]" />{r.us}</td>
                  <td className="px-5 py-3 text-muted-foreground">{r.them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Use-case grid ------------------------------ */

export function UseCases({ 
  variant = "home", 
  title, 
  cases 
}: { 
  variant?: "home" | "products"; 
  title?: string; 
  cases?: { tag: string; t: string; d: string; }[];
}) {
  const { t } = useLocale();
  const s = t.extraSections;
  const activeTitle = title || (variant === "products" ? s.productsUseCasesTitle : s.useCasesTitle);
  const activeCases = cases || (variant === "products" ? s.productsUseCases : s.useCases);
  return (
    <section className="bg-surface border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{activeTitle}</h2>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeCases.map((c) => (
            <article key={c.t} className="group relative rounded-2xl border border-border bg-card p-6 overflow-hidden">
              <span aria-hidden className="absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
                style={{ background: "var(--gradient-brand)" }} />
              <span className="relative chip-brand inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">{c.tag}</span>
              <h3 className="relative mt-3 text-lg font-semibold text-foreground">{c.t}</h3>
              <p className="relative mt-2 text-sm text-muted-foreground">{c.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Brand CTA ------------------------------ */

export function BrandCTA({ title, sub, to, label }: { title: string; sub?: string; to: string; label: string }) {
  const { lp } = useLocale();
  return (
    <section className="border-t border-border" style={{ background: "var(--gradient-dark)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-white">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
          {sub ? <p className="mt-2 text-sm text-white/75 max-w-xl">{sub}</p> : null}
        </div>
        <Link to={lp(to)} className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#111111] hover:bg-white/90">
          {label} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------ Journey timeline ------------------------------ */

export function JourneyTimeline() {
  const { t } = useLocale();
  const s = t.extraSections;
  const colors = ["#111111", "#1f1f1f", "#333333", "#404040", "#5c5c5c", "#737373"];
  return (
    <section className="relative bg-background border-t border-border overflow-hidden">
      <GradientOrb className="-top-32 -left-32 h-96 w-96" />
      <GradientOrb className="-bottom-32 -right-32 h-96 w-96" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-gradient-brand">{s.journeyKicker}</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">{s.journeyTitle}</h2>
        </div>
        <ol className="relative mt-12 ml-3 border-l-2 border-brand pl-8 space-y-10">
          {s.journeySteps.map((step, i) => (
            <li key={step.y} className="relative">
              <span aria-hidden className="absolute -left-[42px] top-1 h-5 w-5 rounded-full ring-4 ring-background"
                style={{ background: colors[i], boxShadow: `0 0 0 2px ${colors[i]}` }} />
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-2xl font-semibold text-gradient-brand">{step.y}</span>
                <h3 className="text-lg font-semibold text-foreground">{step.t}</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl">{step.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------ Logos ribbon ------------------------------ */

export function LogosRibbon() {
  const { t } = useLocale();
  const logos = ["Cloud", "Data", "AI", "Security", "DevOps", "Mobile", "IoT", "Edge"];
  return (
    <section className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.extraSections.logosTitle}</p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {logos.map((l, i) => (
            <div key={l} className="rounded-lg border border-border p-4 text-center text-xs font-semibold"
              style={{ background: i % 2 ? "var(--gradient-brand-soft)" : "#fff", color: "#111111" }}>{l}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Mini contact ------------------------------ */

export function QuickContact() {
  const { t, lp } = useLocale();
  const s = t.extraSections;
  const icons = [Globe2, BarChart3, Shield, Zap];
  return (
    <section className="bg-surface border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{s.quickContactTitle}</h2>
          <p className="mt-3 text-muted-foreground">{s.quickContactSub}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={lp("/contact")} className="btn-brand inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold">
              <Send className="h-4 w-4" /> {s.quickContactBtn}
            </Link>
            <Link to={lp("/business")} className="btn-outline-brand inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold">
              {s.quickContactFounderBtn}
            </Link>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 self-center">
          {s.quickContactItems.map((x, i) => {
            const Icon = icons[i];
            return (
              <div key={x.t} className="rounded-xl border border-border bg-card p-4">
                <Icon className="h-5 w-5" style={{ color: "#404040" }} />
                <div className="mt-2 font-semibold text-foreground">{x.t}</div>
                <div className="text-xs text-muted-foreground mt-1">{x.d}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}