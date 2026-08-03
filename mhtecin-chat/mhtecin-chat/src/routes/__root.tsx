import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { ConsentBanner } from "@/components/ConsentBanner";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-lg text-center p-6 rounded-2xl border border-border bg-card shadow-xl">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center font-bold text-xl">
          !
        </div>
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-xs text-destructive font-mono bg-destructive/10 p-3 rounded-lg border border-destructive/20 text-left overflow-x-auto max-h-32">
          {error?.message || String(error)}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          You can try refreshing, return home, or re-authenticating.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MHTECHIN — Enterprise Technology, Cloud, AI & Cybersecurity Solutions" },
      {
        name: "description",
        content:
          "MHTECHIN is a global enterprise technology company delivering cloud, AI, data analytics and cybersecurity solutions. Think, Plan & Execute with MHTECHIN.",
      },
      {
        name: "keywords",
        content:
          "MHTECHIN, mhtechin, MHTECHIN technology, MHTECHIN solutions, enterprise cloud, AI services, cybersecurity, data analytics, digital transformation",
      },
      { name: "author", content: "MHTECHIN" },
      { name: "application-name", content: "MHTECHIN" },
      { name: "apple-mobile-web-app-title", content: "MHTECHIN" },
      { name: "theme-color", content: "#1a1a1a" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "googlebot", content: "index, follow" },
      { property: "og:site_name", content: "MHTECHIN" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MHTECHIN — Enterprise Technology Solutions" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "MHTECHIN",
          alternateName: ["MHTECHIN Technologies", "MH TECHIN"],
          url: "/",
          logo: "/logo.png",
          slogan: "Think, Plan & Execute",
          description:
            "MHTECHIN is a global enterprise technology company delivering cloud, AI, data analytics and cybersecurity solutions. Free strategy advice for founders and SMB owners.",
          sameAs: [],
          knowsAbout: [
            "Cloud computing", "Artificial Intelligence", "Data analytics",
            "Cybersecurity", "DevOps", "IoT", "Consumer products",
            "Business registration", "Taxation", "Product-market fit", "TRL"
          ],
          makesOffer: {
            "@type": "Offer",
            name: "Free Business Advice for Founders",
            description: "Free 30-minute strategy call for founders and SMB owners covering idea validation, PMF, tech roadmap, registration and taxation.",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: "/business",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "MHTECHIN",
          url: "/",
          inLanguage: ["en", "ja", "de", "fr", "es", "zh-Hans"],
          potentialAction: {
            "@type": "SearchAction",
            target: "/?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Free Business Advisory",
          provider: { "@type": "Organization", name: "MHTECHIN" },
          areaServed: "Worldwide",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description: "Free strategy advice for founders and business owners — idea validation, product-market fit, TRL advancement, business registration, taxation.",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Outlet />
        <ConsentBanner />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
