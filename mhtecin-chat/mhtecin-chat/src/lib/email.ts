import { sendSmtpEmail } from "@/lib/smtp";

export interface ContactEmailPayload {
  name: string; email: string; company: string; role: string; message: string;
}

export async function sendContactEmail(data: ContactEmailPayload): Promise<void> {
  const toEmail = process.env.CONTACT_TO_EMAIL || "subscriptions@mhtechin.com";

  await sendSmtpEmail({
    to: toEmail,
    subject: `New contact from ${data.name} — ${data.company}`,
    text: `New Contact Submission\n\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\nRole: ${data.role}\nMessage:\n${data.message}`,
    html: `<h2>New Contact Submission</h2>
      <p><b>Name:</b> ${data.name}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Company:</b> ${data.company}</p>
      <p><b>Role:</b> ${data.role}</p>
      <p><b>Message:</b><br>${data.message.replace(/\n/g, "<br>")}</p>`,
  });
}