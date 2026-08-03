import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function SiteLayout({ children, hideFooter = false }: { children: React.ReactNode; hideFooter?: boolean }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      {!hideFooter && <SiteFooter />}
    </div>
  );
}
