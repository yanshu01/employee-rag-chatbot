import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
import { queryConsent, setupConsentTable } from "@/lib/consent-db";

export const submitConsent = createServerFn({ method: "POST" }).handler(
  async () => {
    console.log("[consent] handler started");

    // Ensure the table exists
    try {
      console.log("[consent] setting up table...");
      await setupConsentTable();
      console.log("[consent] table ready");
    } catch (e) {
      console.error("[consent] Failed to setup table:", e);
    }

    // Get IP from request
    let ip = "unknown";
    try {
      ip =
        getRequestHeader("cf-connecting-ip") ||
        getRequestIP({ xForwardedFor: true }) ||
        getRequestHeader("x-real-ip") ||
        "unknown";

      // x-forwarded-for can be a comma-separated list of IPs
      if (ip.includes(",")) {
        ip = ip.split(",")[0].trim();
      }
    } catch (e) {
      console.error("[consent] Failed to get IP:", e);
    }

    console.log("[consent] IP resolved:", ip);

    // Insert consent record
    try {
      console.log("[consent] inserting record...");
      await queryConsent(
        `INSERT INTO user_consents (ip_address, consent_given, created_at) VALUES (?, true, NOW())`,
        [ip],
      );
      console.log("[consent] record inserted successfully!");
    } catch (e) {
      console.error("[consent] Failed to insert consent:", e);
      return { ok: false, error: "Failed to save consent" };
    }

    return { ok: true };
  },
);
