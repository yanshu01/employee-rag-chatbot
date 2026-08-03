import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { useState } from "react";
import { useLocale } from "@/i18n/useLocale";
import { getDict } from "@/i18n/translations";
import { toast } from "sonner";
import { normalizeLocale, LOCALES, localizedPath, LOCALE_META } from "@/i18n/config";
import { submitContact } from "@/server-fns/contact";

export const Route = createFileRoute("/{-$locale}/contact")({
  head: ({ params }) => {
    const locale = normalizeLocale((params as { locale?: string }).locale);
    const t = getDict(locale);
    const path = localizedPath("/contact", locale);
    return {
      meta: [
        { title: t.seo.contactTitle },
        { name: "description", content: t.seo.contactDesc },
        { property: "og:title", content: t.seo.contactTitle },
        { property: "og:description", content: t.seo.contactDesc },
        { property: "og:url", content: path },
      ],
      links: [
        { rel: "canonical", href: path },
        ...LOCALES.map((l) => ({ rel: "alternate", hrefLang: LOCALE_META[l].htmlLang, href: localizedPath("/contact", l) })),
        { rel: "alternate", hrefLang: "x-default", href: "/contact" },
      ],
    };
  },
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLocale();
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    const fd = new FormData(e.currentTarget);
    try {
      await submitContact({
        data: {
          name: fd.get("name") as string,
          email: fd.get("email") as string,
          company: fd.get("company") as string,
          role: (fd.get("role") as string) ?? "",
          message: fd.get("message") as string,
        },
      });
      setState("success");
      toast.success("Thank you! Your message was sent successfully.");
    } catch {
      setState("error");
      toast.error("Failed to send message. Please try again.");
    }
  }

  return (
    <SiteLayout>
      <section className="border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.contact.kicker}</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-foreground max-w-3xl">{t.contact.h1}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{t.contact.sub}</p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-foreground mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-foreground">{t.contact.email}</div>
                <a
  href="mailto:contact@mhtechin.com"
  className="text-sm text-muted-foreground hover:text-primary transition-colors"
>
  contact@mhtechin.com
</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-foreground mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-foreground">{t.contact.phone}</div>
                <a
      href="tel:02269711557"
      className="text-sm text-muted-foreground hover:text-primary transition-colors"
    >
      02269711557 / 0765
    </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-foreground mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-foreground">{t.contact.hq}</div>
                <a
  href="https://maps.google.com/?q=YOUR_ADDRESS"
  target="_blank"
  rel="noopener noreferrer"
  className="text-sm text-muted-foreground hover:text-primary transition-colors"
>
  {t.contact.hqDetail}
</a>
              </div>
            </div>
          </div>

          <form
            className="md:col-span-2 rounded-lg border border-border bg-card p-8 space-y-5"
            onSubmit={handleSubmit}
          >
            {state === "success" ? (
              <div className="text-center py-10">
                <h2 className="text-xl font-semibold text-foreground">{t.contact.thanks}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{t.contact.thanksBody}</p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label={t.contact.formName} name="name" required />
                  <Field label={t.contact.formEmail} name="email" type="email" required />
                  <Field label={t.contact.formCompany} name="company" required />
                  <Field label={t.contact.formRole} name="role" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    {t.contact.formHelp}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder={t.contact.formHelpPlaceholder}
                  />
                </div>
                {state === "error" && (
                  <p className="text-sm text-destructive">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
                  {t.contact.send}
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-medium text-foreground mb-1.5">
        {label} {required && <span className="text-muted-foreground">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}