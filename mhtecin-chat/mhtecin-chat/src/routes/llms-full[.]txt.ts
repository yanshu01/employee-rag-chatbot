import { createFileRoute } from "@tanstack/react-router";
import { getDict } from "@/i18n/translations";
import { DEFAULT_LOCALE } from "@/i18n/config";

const BASE_URL = "https://mhtechin.com";

export const Route = createFileRoute("/llms-full.txt")({
  server: {
    handlers: {
      GET: async () => {
        const t = getDict(DEFAULT_LOCALE);

        const markdown = [
          `# MHTECHIN — Full Context & Documentation`,
          `This document consolidates the complete marketing copy, product catalog, strategic services, and advisory offerings of MHTECHIN.`,
          ``,
          `## About MHTECHIN`,
          `- **Tagline**: ${t.home.tagline}`,
          `- **Overview**: ${t.home.intro}`,
          `- **Core Capabilities & Pillars**:`,
          ...(t.home.pillars || []).map((p) => `  - **${p.title}**: ${p.desc}`),
          ``,
          `## Compliance & Enterprise Security`,
          `MHTECHIN operates at the standard required by highly regulated sectors:`,
          ...(t.home.trustItems || []).map((item) => `- ${item}`),
          ``,
          `---`,
          `## Product Catalog`,
          `MHTECHIN builds composable, API-first modular platforms for modern enterprises.`,
          ``,
          ...Object.entries(t.productDescriptions || {}).map(([slug, features]) => {
            const featureList = Object.entries(features || {})
              .map(([title, desc]) => `  - **${title}**: ${desc}`)
              .join("\n");
            
            // Format slug to a readable name
            const name = slug
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            return [
              `### Product: ${name}`,
              `- **Path**: ${BASE_URL}/products/${slug}`,
              `- **Core Features**:`,
              featureList,
              ``
            ].join("\n");
          }),
          `---`,
          `## Strategic Services`,
          `Strategic design, engineering, and SRE operations squads delivering outcomes with overlaps across APAC, EU, and Americas.`,
          ``,
          ...Object.entries(t.serviceExtras || {}).map(([slug, extra]) => {
            const benefits = (extra.benefits || [])
              .map((b) => `  - **${b.title}**: ${b.body}`)
              .join("\n");
            const process = (extra.process || [])
              .map((p) => `  - *Step ${p.step} - ${p.title}*: ${p.body}`)
              .join("\n");
            const stats = (extra.stats || [])
              .map((s) => `  - ${s.label}: ${s.value}`)
              .join("\n");
            const techs = (extra.technologies || []).join(", ");
            const faqs = (extra.faqs || [])
              .map((f) => `  - *Q: ${f.q}*\n    *A: ${f.a}*`)
              .join("\n");

            // Format slug to a readable name
            const name = slug
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            return [
              `### Service: ${name} (${extra.icon})`,
              `- **Path**: ${BASE_URL}/services/${slug}`,
              `- **Tagline**: ${extra.tagline}`,
              `- **Overview**: ${extra.overview}`,
              `- **Technologies**: ${techs}`,
              `- **Key Benefits**:`,
              benefits,
              `- **Delivery Process**:`,
              process,
              `- **Engagement Stats**:`,
              stats,
              `- **Service FAQs**:`,
              faqs,
              ``
            ].join("\n");
          }),
          `---`,
          `## Business Program (Free for Founders & SMBs)`,
          `- **Pillar Title**: ${t.extraSections.freeAdviceTitle}`,
          `- **Overview**: ${t.extraSections.freeAdviceSub}`,
          `- **Areas Covered**:`,
          ...(t.extraSections.freeAdviceItems || []).map((item) => `  - **${item.t}**: ${item.d}`),
          ``,
          `---`,
          `## FAQ`,
          ...(t.home.faq || []).map((f) => `- **Q: ${f.q}**\n  **A: ${f.a}**`),
          ``,
          `---`,
          `## Contact MHTECHIN`,
          `- **Office**: ${t.contact.hqDetail}`,
          `- **Contact Page**: ${BASE_URL}/contact`,
        ].join("\n");

        return new Response(markdown, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
