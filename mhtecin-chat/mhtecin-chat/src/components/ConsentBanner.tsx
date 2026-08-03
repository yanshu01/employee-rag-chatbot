import { useState, useEffect } from "react";
import { submitConsent } from "@/server-fns/consent";
import { useLocale } from "@/i18n/useLocale";

const CONSENT_KEY = "user_consent_accepted";

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem(CONSENT_KEY);
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = async () => {
    setIsSubmitting(true);
    try {
      // Call the server function to store consent
      const result = await submitConsent();
      console.log("[consent] result:", result);

      // Save locally so we don't show the banner again
      localStorage.setItem(CONSENT_KEY, "true");
      setIsVisible(false);
    } catch (e) {
      console.error("Failed to submit consent", e);
      // Still hide the banner so the user isn't stuck
      localStorage.setItem(CONSENT_KEY, "true");
      setIsVisible(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDecline = () => {
    // Hide the banner for the session
    localStorage.setItem(CONSENT_KEY, "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  // Use values from dictionary or fallback to English if not defined
  const consentTexts = t.extraSections?.consent || {
    title: "Privacy Notice",
    description: "We use technologies like cookies to store and/or access device information. Consenting to these technologies will allow us to process data such as browsing behavior or unique IDs on this site. We respect your privacy in accordance with the General Data Protection Regulation (GDPR) and India's Digital Personal Data Protection (DPDP) Act.",
    accept: "Accept",
    decline: "Decline"
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border bg-background p-4 shadow-lg sm:px-6 md:p-6 text-foreground">
      <div className="flex-1 text-sm md:text-base">
        <p>
          <strong>{consentTexts.title}:</strong> {consentTexts.description}
        </p>
      </div>
      <div className="flex shrink-0 gap-3 w-full sm:w-auto">
        <button
          onClick={handleDecline}
          disabled={isSubmitting}
          className="flex-1 sm:flex-none rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
        >
          {consentTexts.decline}
        </button>
        <button
          onClick={handleAccept}
          disabled={isSubmitting}
          className="flex-1 sm:flex-none rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting ? "..." : consentTexts.accept}
        </button>
      </div>
    </div>
  );
}
