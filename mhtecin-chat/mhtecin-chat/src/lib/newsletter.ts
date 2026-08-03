import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { queryUserDb, setupUserTable } from "@/lib/user-db";

const Schema = z.object({
  email: z.string().email(),
});

export const submitNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input: { email: string }) => Schema.parse(input))
  .handler(async ({ data }) => {
    try {
      await setupUserTable();
    } catch (e) {
      console.error("[newsletter db setup] failed:", e);
    }

    const email = data.email.trim().toLowerCase();

    const result = await queryUserDb<{ affectedRows: number }>(
      `INSERT INTO newsletter_subscribers (email)
       VALUES (?)
       ON DUPLICATE KEY UPDATE email = email`,
      [email]
    );

    const alreadySubscribed = result.affectedRows === 0;

    return {
      success: true,
      message: alreadySubscribed
        ? "You're already subscribed!"
        : "Subscribed successfully!",
    };
  });