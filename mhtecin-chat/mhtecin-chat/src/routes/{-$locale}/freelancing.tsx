import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Briefcase, Clock, DollarSign, Search, ArrowRight, Tag, MapPin } from "lucide-react";
import { useLocale } from "@/i18n/useLocale";
import { getPublicJobs } from "@/server-fns/admin";
import { getCached, setCache, CACHE_KEYS, CACHE_TTL } from "@/lib/cache";

export const Route = createFileRoute("/{-$locale}/freelancing")({
  component: FreelancingPage,
});

function FreelancingPage() {
  const { lp, t } = useLocale();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Load from cache first for instant render
    const cached = getCached<any[]>(CACHE_KEYS.JOBS);
    if (cached) {
      setJobs(cached);
      setLoading(false);
    }

    // Then refresh from server
    getPublicJobs()
      .then((data) => {
        setJobs(data);
        setCache(CACHE_KEYS.JOBS, data, CACHE_TTL.LONG);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...Array.from(new Set(jobs.map((j) => j.category)))];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.skills && job.skills.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section
        className="border-b border-border"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t.freelancing.kicker}
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-foreground max-w-3xl">
            {t.freelancing.h1}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            {t.freelancing.sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={lp("/contact")}
              className="btn-brand inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
            >
              {t.freelancing.submitProfile} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t.freelancing.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 text-xs font-bold rounded-full border transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border hover:bg-muted/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Job Cards */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20">
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground">{t.freelancing.noOpportunities}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {searchQuery || selectedCategory !== "All"
                  ? t.freelancing.filterAdjust
                  : t.freelancing.checkBack}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex justify-between items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        {job.status}
                      </span>
                    </div>

                    <h3 className="mt-4 text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>

                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {job.description}
                    </p>

                    {/* Skills Tags */}
                    {job.skills && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {job.skills.split(",").map((skill: string, idx: number) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full"
                          >
                            <Tag className="h-2.5 w-2.5" />
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="mt-5 pt-4 border-t border-border space-y-2">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {job.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" /> {job.budget}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {job.duration}
                      </span>
                    </div>

                    <Link
                      to={lp("/contact")}
                      className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary/10 text-primary px-4 py-2.5 text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      {t.freelancing.applyNow} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
