import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { queryUserDb, setupUserTable } from "@/lib/user-db";
import { sendContactEmail } from "@/lib/email";

const Schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  company: z.string().min(1).max(200),
  role: z.string().max(200).default(""),
  message: z.string().min(1).max(5000),
});

export type ContactInput = z.infer<typeof Schema>;

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: ContactInput) => Schema.parse(input))
  .handler(async ({ data }) => {
    try {
      await setupUserTable();
    } catch (e) {
      console.error("[contact db setup] failed:", e);
    }

    await queryUserDb(
      `INSERT INTO contact_submissions (name, email, company, role, message, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [data.name, data.email, data.company, data.role, data.message],
    );

    try {
      await sendContactEmail(data);
    } catch (e) {
      console.error("[email] failed:", e);
    }

    return { ok: true };
  });