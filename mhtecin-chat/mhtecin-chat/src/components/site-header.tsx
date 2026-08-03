import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { getCurrentUser } from "@/server-fns/auth";

import logo from "@/assets/logo.png";
import { useLocale } from "@/i18n/useLocale";
import {
  LOCALES,
  LOCALE_META,
  DEFAULT_LOCALE,
  type Locale,
} from "@/i18n/config";

export function SiteHeader() {
  const [open, setOpen] = useState<
    null | "products" | "services" | "lang"
  >(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  const { locale, t, lp } = useLocale();

  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    getCurrentUser().then((u) => {
      setCurrentUser(u);
    });
  }, [location.pathname]);

  const switchLocale = (next: Locale) => {
    let path = location.pathname;

    const allPossiblePrefixes = ["en", "ja", "jp", "de", "fr", "es", "zh", "cn", "zh-hans", "zh-cn", "zh-tw", "zh-hk"];

    for (const prefix of allPossiblePrefixes) {
      if (path === `/${prefix}` || path.startsWith(`/${prefix}/`)) {
        path = path.slice(prefix.length + 1) || "/";
        break;
      }
    }

    const target =
      next === DEFAULT_LOCALE
        ? path
        : path === "/"
        ? `/${next}`
        : `/${next}${path}`;

    navigate({ to: target });

    setOpen(null);
    setMobileOpen(false);
  };

  const products = t.products.items.map((p) => ({
    name: p.name,
    desc: p.tag,
    slug: p.slug,
  }));

  const services = t.services.items.map((s) => ({
    name: s.name,
    desc: s.desc.slice(0, 60) + "…",
    slug: s.slug,
  }));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <Link
          to={lp("/")}
          className="flex items-center"
          aria-label="MHTECHIN home"
        >
          <img
            src={logo}
            alt="MHTECHIN"
            className="h-10 w-auto"
            style={{ filter: "invert(1)" }}
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-1 relative">
          {/* HOME */}
          <Link
            to={lp("/")}
            className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            {t.nav.home}
          </Link>

          {/* PRODUCTS */}
          <div
            className="relative"
            onMouseEnter={() => setOpen("products")}
            onMouseLeave={() => setOpen(null)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              {t.nav.products}
              <ChevronDown className="h-4 w-4" />
            </button>

            {open === "products" && (
              <div
                className="absolute top-full left-1/2 z-50 pt-4"
                style={{ transform: "translateX(-35%)" }}
              >
                <div className="w-212.5 rounded-2xl border border-border bg-background shadow-2xl overflow-hidden">
                  <div className="grid grid-cols-3 gap-8 p-8">
                    {/* LEFT */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {t.nav.productsHeading}
                      </p>

                      <h3 className="mt-2 text-2xl font-bold text-foreground">
                        {t.nav.productsTagline}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {t.nav.productsBlurb}
                      </p>

                      <Link
                        to={lp("/products")}
                        className="mt-5 inline-flex items-center text-sm font-semibold text-primary hover:underline"
                      >
                        {t.nav.exploreAll}
                      </Link>
                    </div>

                    {/* RIGHT — each item links to its own slug page */}
                    <div className="col-span-2 grid grid-cols-2 gap-3">
                      {products.map((item) => (
                        <Link
                          key={item.name}
                          to="/{-$locale}/products/$productSlug"
                          params={{ productSlug: item.slug }}
                          onClick={() => setOpen(null)}
                          className="group rounded-xl p-4 hover:bg-muted transition-all duration-200"
                        >
                          <div className="text-sm font-semibold text-foreground group-hover:text-primary">
                            {item.name}
                          </div>

                          <div className="mt-1 text-xs leading-5 text-muted-foreground">
                            {item.desc}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SERVICES */}
<div
  className="relative"
  onMouseEnter={() => setOpen("services")}
  onMouseLeave={() => setOpen(null)}
>
  {/* hover bridge */}
  <div className="absolute left-0 right-0 top-full h-4" />

  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
    {t.nav.services}
    <ChevronDown className="h-4 w-4" />
  </button>

  {open === "services" && (
    <div
      className="absolute top-full left-1/2 z-50 pt-4"
      style={{ transform: "translateX(-50%)" }}
    >
      <div className="w-[850px] rounded-2xl border border-border bg-background shadow-2xl overflow-hidden">
        <div className="grid grid-cols-3 gap-8 p-8">
          
          {/* LEFT SIDE */}
          <div className="pr-4 border-r border-border">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t.nav.servicesHeading}
            </p>

            <h3 className="mt-2 text-2xl font-bold text-foreground leading-tight">
              {t.nav.servicesTagline}
            </h3>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {t.nav.servicesBlurb}
            </p>

            <Link
              to={lp("/services")}
              className="mt-5 inline-flex items-center text-sm font-semibold text-primary hover:underline"
            >
              {t.nav.exploreAll} →
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-span-2 grid grid-cols-2 gap-3">
            {services.map((item) => (
              <Link
                key={item.name}
                to="/{-$locale}/services/$serviceSlug"
                params={{ serviceSlug: item.slug }}
                onClick={() => setOpen(null)}
                className="group rounded-xl p-4 hover:bg-muted transition-all duration-200"
              >
                <div className="text-sm font-semibold text-foreground group-hover:text-primary">
                  {item.name}
                </div>

                <div className="mt-2 text-xs leading-5 text-muted-foreground line-clamp-3">
                  {item.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )}
</div>

          {/* OTHER LINKS */}
          <Link
            to={lp("/industries")}
            className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            {t.nav.industries}
          </Link>

          <Link
            to={lp("/business")}
            className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            {t.nav.business}
          </Link>

          <Link
            to={lp("/freelancing")}
            className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            {t.nav.freelancing}
          </Link>

          <Link
            to={lp("/about")}
            className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            {t.nav.about}
          </Link>

          {/* LANGUAGE */}
<div
  className="relative ml-2"
  onMouseEnter={() => setOpen("lang")}
  onMouseLeave={() => setOpen(null)}
>
  {/* invisible hover bridge */}
  <div className="absolute left-0 right-0 top-full h-3" />

  <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
    <Globe className="h-4 w-4" />

    {LOCALE_META[locale].native}

    <ChevronDown className="h-4 w-4" />
  </button>

  {open === "lang" && (
    <div className="absolute right-0 top-full pt-2 z-9999">
      <div className="min-w-55 rounded-2xl border border-border bg-background p-2 shadow-2xl">
        {LOCALES.map((l) => (
          <button
            key={l}
            onClick={() => switchLocale(l)}
            className={`w-full rounded-xl px-4 py-3 text-left text-sm transition-colors hover:bg-muted ${
              l === locale
                ? "bg-muted font-semibold text-foreground"
                : "text-foreground/80"
            }`}
          >
            {LOCALE_META[l].native}
          </button>
        ))}
      </div>
    </div>
  )}
</div>

            {currentUser ? (
              <Link
                to={lp("/dashboard")}
                onMouseEnter={() => setOpen(null)}
                className="ml-2 inline-flex items-center justify-center rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium hover:bg-muted text-foreground transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to={lp("/auth")}
                onMouseEnter={() => setOpen(null)}
                className="ml-2 inline-flex items-center justify-center rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium hover:bg-muted text-foreground transition-colors"
              >
                Login
              </Link>
            )}

            <Link
              to={lp("/contact")}
              onMouseEnter={() => setOpen(null)}
              className="ml-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {t.nav.contactSales}
            </Link>
          </nav>

        {/* MOBILE BUTTON */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-1">
            {[
              { to: "/", label: t.nav.home },
              { to: "/products", label: t.nav.products },
              { to: "/services", label: t.nav.services },
              { to: "/industries", label: t.nav.industries },
              { to: "/business", label: t.nav.business },
              { to: "/freelancing", label: t.nav.freelancing },
              { to: "/about", label: t.nav.about },
              { to: "/contact", label: t.nav.contact },
            ].map((l) => (
              <Link
                key={l.to}
                to={lp(l.to)}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}

            {currentUser ? (
              <Link
                to={lp("/dashboard")}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to={lp("/auth")}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Login
              </Link>
            )}

            {/* MOBILE LANG */}
            <div className="pt-3 mt-3 border-t border-border">
              <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t.nav.language}
              </p>

              {LOCALES.map((l) => (
                <button
                  key={l}
                  onClick={() => switchLocale(l)}
                  className={`block w-full text-left rounded-md px-3 py-2 text-sm ${
                    l === locale
                      ? "font-semibold text-foreground bg-muted"
                      : "text-foreground/80"
                  }`}
                >
                  {LOCALE_META[l].native}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}