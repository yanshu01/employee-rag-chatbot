import { createServerFn } from "@tanstack/react-start";
import { queryUserDb, setupUserTable } from "@/lib/user-db";
import { getCurrentUser } from "@/server-fns/auth";
import { sendSmtpEmail } from "@/lib/smtp";

// Get list of tickets (based on role)
export const getSupportTickets = createServerFn({ method: "GET" }).handler(async () => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized: Please log in.");

  await setupUserTable();

  // If user is admin or executive, return all tickets. Otherwise, return only their own.
  const role = user.role?.trim().toLowerCase();
  const isPrivileged = role === "admin" || role === "executive";

  let tickets: any[];

  if (isPrivileged) {
    tickets = await queryUserDb<any[]>(`
      SELECT t.id, t.user_id, t.subject, t.description, t.category, t.status, t.assigned_to, t.created_at, t.updated_at,
             u.name as creator_name, u.email as creator_email,
             e.name as executive_name, e.email as executive_email
      FROM support_tickets t
      LEFT JOIN site_users u ON t.user_id = u.id
      LEFT JOIN site_users e ON t.assigned_to = e.id
      ORDER BY t.created_at DESC
    `);
  } else {
    tickets = await queryUserDb<any[]>(`
      SELECT t.id, t.user_id, t.subject, t.description, t.category, t.status, t.assigned_to, t.created_at, t.updated_at,
             u.name as creator_name, u.email as creator_email,
             e.name as executive_name, e.email as executive_email
      FROM support_tickets t
      LEFT JOIN site_users u ON t.user_id = u.id
      LEFT JOIN site_users e ON t.assigned_to = e.id
      WHERE t.user_id = ?
      ORDER BY t.created_at DESC
    `, [user.id]);
  }

  return tickets;
});

// Raise a support ticket
export const raiseSupportTicket = createServerFn({ method: "POST" })
  .inputValidator((d: { subject: string; description: string; category: string }) => d)
  .handler(async ({ data }) => {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized: Please log in.");

    await setupUserTable();

    const result = await queryUserDb<any>(
      "INSERT INTO support_tickets (user_id, subject, description, category, status) VALUES (?, ?, ?, ?, 'open')",
      [user.id, data.subject, data.description, data.category]
    );

    const ticketId = result.insertId;

    // Send confirmation email via SMTP
    sendSmtpEmail({
      to: user.email,
      subject: `Support Ticket Raised: #${ticketId} - MHTECHIN`,
      text: `Hello ${user.name},\n\nYour support ticket #${ticketId} (${data.subject}) has been successfully created. Our support team has been notified and will reply shortly.\n\nTicket Details:\nCategory: ${data.category}\nDescription:\n${data.description}`,
      html: `<h2>Support Ticket Raised</h2>
             <p>Hello <b>${user.name}</b>,</p>
             <p>Your support ticket has been successfully created:</p>
             <div style="background-color: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
               <p><b>Ticket ID:</b> #${ticketId}</p>
               <p><b>Subject:</b> ${data.subject}</p>
               <p><b>Category:</b> ${data.category}</p>
               <p><b>Description:</b><br>${data.description.replace(/\n/g, "<br>")}</p>
             </div>
             <p>Our support team has been notified and will reply shortly.</p>`
    }).catch((e) => {
      console.error("[SMTP] Failed to send ticket confirmation email:", e);
    });

    return { success: true, ticketId };
  });

// Assign ticket to an executive
export const assignSupportTicket = createServerFn({ method: "POST" })
  .inputValidator((d: { ticketId: number; assignedTo: number | null }) => d)
  .handler(async ({ data }) => {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized: Please log in.");
    if (user.role?.trim().toLowerCase() !== "admin") throw new Error("Forbidden: Admin access required.");

    await setupUserTable();

    await queryUserDb(
      "UPDATE support_tickets SET assigned_to = ? WHERE id = ?",
      [data.assignedTo, data.ticketId]
    );

    // If assigned to a specific executive, notify them via SMTP
    if (data.assignedTo) {
      Promise.all([
        queryUserDb<any[]>("SELECT name, email FROM site_users WHERE id = ?", [data.assignedTo]),
        queryUserDb<any[]>("SELECT subject, description FROM support_tickets WHERE id = ?", [data.ticketId])
      ])
        .then(([executives, ticket]) => {
          if (executives.length > 0 && ticket.length > 0) {
            const exec = executives[0];
            sendSmtpEmail({
              to: exec.email,
              subject: `New Ticket Assigned: #${data.ticketId} - MHTECHIN`,
              text: `Hello ${exec.name},\n\nTicket #${data.ticketId} has been assigned to you by the administrator.\n\nSubject: ${ticket[0].subject}\nDescription:\n${ticket[0].description}`,
              html: `<h2>Ticket Assigned</h2>
                     <p>Hello <b>${exec.name}</b>,</p>
                     <p>Ticket <b>#${data.ticketId}</b> has been assigned to you by the administrator.</p>
                     <div style="background-color: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
                       <p><b>Subject:</b> ${ticket[0].subject}</p>
                       <p><b>Description:</b><br>${ticket[0].description.replace(/\n/g, "<br>")}</p>
                     </div>`
            }).catch((err) => {
              console.error("[SMTP] Failed to send ticket assignment email:", err);
            });
          }
        })
        .catch((err) => console.error("Database lookup failed during ticket assignment email dispatch:", err));
    }

    return { success: true };
  });

// Update support ticket status
export const updateSupportTicketStatus = createServerFn({ method: "POST" })
  .inputValidator((d: { ticketId: number; status: string }) => d)
  .handler(async ({ data }) => {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized: Please log in.");

    await setupUserTable();

    const role = user.role?.trim().toLowerCase();
    const isPrivileged = role === "admin" || role === "executive";
    if (!isPrivileged) throw new Error("Forbidden: Privileged access required.");

    await queryUserDb(
      "UPDATE support_tickets SET status = ? WHERE id = ?",
      [data.status, data.ticketId]
    );

    // Notify ticket owner of the update
    queryUserDb<any[]>(
      "SELECT t.subject, u.name, u.email FROM support_tickets t LEFT JOIN site_users u ON t.user_id = u.id WHERE t.id = ?",
      [data.ticketId]
    )
      .then((tickets) => {
        if (tickets.length > 0) {
          const ticket = tickets[0];
          sendSmtpEmail({
            to: ticket.email,
            subject: `Support Ticket #${data.ticketId} Status Update: ${data.status} - MHTECHIN`,
            text: `Hello ${ticket.name},\n\nYour support ticket #${data.ticketId} (${ticket.subject}) status has been updated to: ${data.status}.`,
            html: `<h2>Support Ticket Updated</h2>
                   <p>Hello <b>${ticket.name}</b>,</p>
                   <p>Your support ticket <b>#${data.ticketId}</b> status has been updated to:</p>
                   <h3 style="color: #4F46E5; text-transform: uppercase;">${data.status}</h3>`
          }).catch((err) => {
            console.error("[SMTP] Failed to send ticket status update email:", err);
          });
        }
      })
      .catch((err) => console.error("Database lookup failed during ticket status update email dispatch:", err));

    return { success: true };
  });

// Get users who are admin or executive
export const getSupportExecutives = createServerFn({ method: "GET" }).handler(async () => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized: Please log in.");
  if (user.role?.trim().toLowerCase() !== "admin") throw new Error("Forbidden: Admin access required.");

  await setupUserTable();

  return await queryUserDb<any[]>(
    "SELECT id, name, email, role FROM site_users WHERE role = 'admin' OR role = 'executive' ORDER BY name ASC"
  );
});
