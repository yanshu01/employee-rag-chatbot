import { Link } from "@tanstack/react-router";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { lp, t } = useLocale();
  const full: Crumb[] = [{ label: t.nav.home, to: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="bg-background border-b border-border">
      <ol className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        {full.map((c, i) => {
          const isLast = i === full.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3 w-3 opacity-60" />}
              {c.to && !isLast ? (
                <Link to={lp(c.to)} className="hover:text-foreground transition-colors">{c.label}</Link>
              ) : (
                <span className={isLast ? "text-foreground font-medium" : ""}>{c.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export type RelatedLink = { to: string; title: string; desc: string };

export function RelatedLinks({ heading, links }: { heading: string; links: RelatedLink[] }) {
  const { lp } = useLocale();
  return (
    <section className="bg-background border-t border-border" aria-label={heading}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{heading}</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={lp(l.to)}
              className="group rounded-lg border border-border bg-card p-5 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-foreground">{l.title}</h3>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">{l.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
