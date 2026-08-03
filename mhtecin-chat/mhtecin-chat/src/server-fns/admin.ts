import { createServerFn } from "@tanstack/react-start";
import { queryUserDb, setupUserTable } from "@/lib/user-db";
import { getCurrentUser } from "./auth";
import { getConsentDb } from "@/lib/consent-db";
import { sendSmtpEmail } from "@/lib/smtp";

async function assertAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized: Admin access required.");
  }
  return user;
}

// ─── ADMIN DASHBOARD DATA ───────────────────────────────────────────

export const getAdminData = createServerFn({ method: "GET" }).handler(async () => {
  const currentUser = await assertAdmin();

  await setupUserTable();

  const [
    users,
    subscriptions,
    productVisibility,
    contacts,
    newsletters,
    products,
    jobs,
    orders,
    payments,
    services,
    deleteRequests
  ] = await Promise.all([
    queryUserDb<any[]>("SELECT id, name, email, role, mobile, address, profession, company_name, status, last_login, created_at FROM site_users ORDER BY id DESC"),
    queryUserDb<any[]>("SELECT id, user_id, product_id, status, start_date, expiry_date, price, payment_method, invoice_number, quantity, created_at FROM user_subscriptions ORDER BY created_at DESC"),
    queryUserDb<any[]>("SELECT product_id, is_visible FROM product_visibility"),
    queryUserDb<any[]>("SELECT id, name, email, company, role, message, created_at FROM contact_submissions ORDER BY id DESC"),
    queryUserDb<any[]>("SELECT email, created_at FROM newsletter_subscribers ORDER BY created_at DESC"),
    queryUserDb<any[]>("SELECT id, name, icon_name, type, description, price, created_at FROM products ORDER BY created_at ASC"),
    queryUserDb<any[]>("SELECT id, title, description, category, budget, duration, skills, status, created_at FROM freelancing_jobs ORDER BY created_at DESC"),
    queryUserDb<any[]>("SELECT id, user_id, item_type, item_id, quantity, price, tax, total_amount, payment_method, payment_status, order_date, invoice_number FROM orders ORDER BY order_date DESC"),
    queryUserDb<any[]>("SELECT id, order_id, user_id, amount, payment_method, transaction_id, status, created_at FROM payments ORDER BY created_at DESC"),
    queryUserDb<any[]>("SELECT id, name, category, description, price, duration, image_url, rating, icon_name, created_at FROM services ORDER BY name ASC"),
    queryUserDb<any[]>("SELECT d.id, d.user_id, d.email, u.name as user_name, d.reason, d.status, d.requested_at FROM delete_data_requests d LEFT JOIN site_users u ON d.user_id = u.id ORDER BY d.requested_at DESC")
  ]);

  return {
    users,
    subscriptions,
    productVisibility,
    contacts,
    newsletters,
    products,
    jobs,
    orders,
    payments,
    services,
    deleteRequests,
    currentUserId: currentUser.id,
  };
});

// ─── USER ROLE MANAGEMENT ───────────────────────────────────────────

export const updateUserRole = createServerFn({ method: "POST" })
  .inputValidator((d: { userId: number; role: string }) => d)
  .handler(async ({ data }) => {
    const currentUser = await assertAdmin();
    if (data.userId === currentUser.id) {
      throw new Error("You cannot change your own role.");
    }
    await queryUserDb("UPDATE site_users SET role = ? WHERE id = ?", [data.role, data.userId]);
    return { success: true };
  });

// ─── SUBSCRIPTION APPROVAL WORKFLOW ─────────────────────────────────

// Admin: Update user subscription (legacy toggle)
export const updateUserSubscription = createServerFn({ method: "POST" })
  .inputValidator((d: { userId: number; productId: string; active: boolean }) => d)
  .handler(async ({ data }) => {
    await assertAdmin();
    if (data.active) {
      await queryUserDb(
        "INSERT INTO user_subscriptions (user_id, product_id, status) VALUES (?, ?, 'approved') ON DUPLICATE KEY UPDATE status = 'approved'",
        [data.userId, data.productId]
      );
    } else {
      await queryUserDb(
        "DELETE FROM user_subscriptions WHERE user_id = ? AND product_id = ?",
        [data.userId, data.productId]
      );
    }
    return { success: true };
  });

// Admin: Approve a pending subscription request
export const approveSubscription = createServerFn({ method: "POST" })
  .inputValidator((d: { userId: number; productId: string }) => d)
  .handler(async ({ data }) => {
    await assertAdmin();
    await queryUserDb(
      "UPDATE user_subscriptions SET status = 'approved' WHERE user_id = ? AND product_id = ?",
      [data.userId, data.productId]
    );

    // Send email notification via SMTP
    queryUserDb<any[]>("SELECT name, email FROM site_users WHERE id = ?", [data.userId])
      .then((users) => {
        if (users.length > 0) {
          const user = users[0];
          sendSmtpEmail({
            to: user.email,
            subject: `Access Request Approved: ${data.productId} - MHTECHIN`,
            text: `Hello ${user.name},\n\nYour access request for product ${data.productId} has been approved! You can now access it in the partner portal dashboard.`,
            html: `<h2>Access Request Approved 🎉</h2>
                   <p>Hello <b>${user.name}</b>,</p>
                   <p>Your access request for product <b>${data.productId}</b> has been approved!</p>
                   <p>You can now access and manage it in your MHTECHIN Partner Portal Dashboard.</p>`
          }).catch((err) => {
            console.error("Failed to send subscription approval email via SMTP:", err);
          });
        }
      })
      .catch((err) => console.error("Database lookup failed during subscription approval email dispatch:", err));

    return { success: true };
  });

// Admin: Reject a pending subscription request
export const rejectSubscription = createServerFn({ method: "POST" })
  .inputValidator((d: { userId: number; productId: string }) => d)
  .handler(async ({ data }) => {
    await assertAdmin();
    await queryUserDb(
      "UPDATE user_subscriptions SET status = 'rejected' WHERE user_id = ? AND product_id = ?",
      [data.userId, data.productId]
    );

    // Send email notification via SMTP
    queryUserDb<any[]>("SELECT name, email FROM site_users WHERE id = ?", [data.userId])
      .then((users) => {
        if (users.length > 0) {
          const user = users[0];
          sendSmtpEmail({
            to: user.email,
            subject: `Access Request Declined: ${data.productId} - MHTECHIN`,
            text: `Hello ${user.name},\n\nYour access request for product ${data.productId} has been declined by the administrator.`,
            html: `<h2>Access Request Update</h2>
                   <p>Hello <b>${user.name}</b>,</p>
                   <p>We regret to inform you that your access request for product <b>${data.productId}</b> has been declined by the administrator.</p>`
          }).catch((err) => {
            console.error("Failed to send subscription rejection email via SMTP:", err);
          });
        }
      })
      .catch((err) => console.error("Database lookup failed during subscription rejection email dispatch:", err));

    return { success: true };
  });

// ─── PRODUCT VISIBILITY ────────────────────────────────────────────

export const updateProductVisibility = createServerFn({ method: "POST" })
  .inputValidator((d: { productId: string; isVisible: boolean }) => d)
  .handler(async ({ data }) => {
    await assertAdmin();
    await queryUserDb(
      "INSERT INTO product_visibility (product_id, is_visible) VALUES (?, ?) ON DUPLICATE KEY UPDATE is_visible = ?",
      [data.productId, data.isVisible, data.isVisible]
    );
    return { success: true };
  });

// ─── USER / CONTACT / NEWSLETTER DELETE ─────────────────────────────

export const deleteUser = createServerFn({ method: "POST" })
  .inputValidator((d: { userId: number }) => d)
  .handler(async ({ data }) => {
    const currentUser = await assertAdmin();
    if (data.userId === currentUser.id) {
      throw new Error("You cannot delete your own account.");
    }
    await queryUserDb("DELETE FROM site_users WHERE id = ?", [data.userId]);
    await queryUserDb("DELETE FROM user_subscriptions WHERE user_id = ?", [data.userId]);
    return { success: true };
  });

export const deleteContact = createServerFn({ method: "POST" })
  .inputValidator((d: { id: number }) => d)
  .handler(async ({ data }) => {
    await assertAdmin();
    await queryUserDb("DELETE FROM contact_submissions WHERE id = ?", [data.id]);
    return { success: true };
  });

export const deleteNewsletter = createServerFn({ method: "POST" })
  .inputValidator((d: { email: string }) => d)
  .handler(async ({ data }) => {
    await assertAdmin();
    await queryUserDb("DELETE FROM newsletter_subscribers WHERE email = ?", [data.email]);
    return { success: true };
  });

// ─── USER-FACING: SUBSCRIPTIONS ─────────────────────────────────────

// Get user's approved subscriptions (for dashboard access)
export const getUserSubscriptions = createServerFn({ method: "GET" }).handler(async () => {
  const user = await getCurrentUser();
  if (!user) return [];
  const rows = await queryUserDb<any[]>(
    "SELECT product_id FROM user_subscriptions WHERE user_id = ? AND status = 'approved'",
    [user.id]
  );
  return rows.map((r) => r.product_id) as string[];
});

// Get user's pending subscription requests
export const getUserPendingSubscriptions = createServerFn({ method: "GET" }).handler(async () => {
  const user = await getCurrentUser();
  if (!user) return [];
  const rows = await queryUserDb<any[]>(
    "SELECT product_id FROM user_subscriptions WHERE user_id = ? AND status = 'pending'",
    [user.id]
  );
  return rows.map((r) => r.product_id) as string[];
});

export const getUserFullSubscriptions = createServerFn({ method: "GET" }).handler(async () => {
  const user = await getCurrentUser();
  if (!user) return [];
  return queryUserDb<any[]>(
    "SELECT id, user_id, product_id, status, created_at, start_date, expiry_date, price, payment_method, invoice_number, quantity FROM user_subscriptions WHERE user_id = ? ORDER BY created_at DESC",
    [user.id]
  );
});

// User requests access to a product (creates pending subscription)
export const requestProductAccess = createServerFn({ method: "POST" })
  .inputValidator((d: { productId: string }) => d)
  .handler(async ({ data }) => {
    const user = await getCurrentUser();
    if (!user) throw new Error("Not logged in");
    // Insert as pending, or update rejected back to pending
    await queryUserDb(
      "INSERT INTO user_subscriptions (user_id, product_id, status) VALUES (?, ?, 'pending') ON DUPLICATE KEY UPDATE status = 'pending'",
      [user.id, data.productId]
    );

    // Send access request email
    sendSmtpEmail({
      to: user.email,
      subject: `Access Request Received for ${data.productId} - MHTECHIN`,
      text: `Hello ${user.name},\n\nYour access request for product ${data.productId} has been received and is currently pending administrator approval.`,
      html: `<h2>Access Request Received</h2>
             <p>Hello <b>${user.name}</b>,</p>
             <p>Your access request for product <b>${data.productId}</b> has been received and is currently pending administrator approval.</p>
             <p>We will notify you via email as soon as it is processed.</p>`
    }).catch((err) => {
      console.error("Failed to send access request receipt email via SMTP:", err);
    });

    return { success: true };
  });

// User cancels their approved subscription
export const cancelUserSubscription = createServerFn({ method: "POST" })
  .inputValidator((d: { productId: string }) => d)
  .handler(async ({ data }) => {
    const user = await getCurrentUser();
    if (!user) throw new Error("Not logged in");
    await queryUserDb(
      "DELETE FROM user_subscriptions WHERE user_id = ? AND product_id = ?",
      [user.id, data.productId]
    );
    return { success: true };
  });

// ─── PRODUCT VISIBILITY (public) ────────────────────────────────────

export const getProductVisibilities = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const rows = await queryUserDb<any[]>("SELECT product_id, is_visible FROM product_visibility");
    return rows as { product_id: string; is_visible: boolean | number }[];
  } catch (e) {
    console.error("[get product visibilities] error:", e);
    return [];
  }
});

// ─── PRODUCT CRUD (Admin) ───────────────────────────────────────────

export const getAllProducts = createServerFn({ method: "GET" }).handler(async () => {
  const rows = await queryUserDb<any[]>(
    "SELECT id, name, icon_name, type, description, price, created_at FROM products ORDER BY created_at ASC"
  );
  return rows;
});

export const createProduct = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string; name: string; icon_name: string; type: string; description: string; price: number }) => d)
  .handler(async ({ data }) => {
    await assertAdmin();
    await queryUserDb(
      "INSERT INTO products (id, name, icon_name, type, description, price) VALUES (?, ?, ?, ?, ?, ?)",
      [data.id, data.name, data.icon_name, data.type, data.description, data.price]
    );
    return { success: true };
  });

export const updateProduct = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string; name: string; icon_name: string; type: string; description: string; price: number }) => d)
  .handler(async ({ data }) => {
    await assertAdmin();
    await queryUserDb(
      "UPDATE products SET name = ?, icon_name = ?, type = ?, description = ?, price = ? WHERE id = ?",
      [data.name, data.icon_name, data.type, data.description, data.price, data.id]
    );
    return { success: true };
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    await assertAdmin();
    await queryUserDb("DELETE FROM products WHERE id = ?", [data.id]);
    await queryUserDb("DELETE FROM user_subscriptions WHERE product_id = ?", [data.id]);
    await queryUserDb("DELETE FROM product_visibility WHERE product_id = ?", [data.id]);
    return { success: true };
  });

// ─── FREELANCING JOBS CRUD ──────────────────────────────────────────

export const getPublicJobs = createServerFn({ method: "GET" }).handler(async () => {
  const rows = await queryUserDb<any[]>(
    "SELECT id, title, description, category, budget, duration, skills, status, created_at FROM freelancing_jobs WHERE status = 'open' ORDER BY created_at DESC"
  );
  return rows;
});

export const getAllJobs = createServerFn({ method: "GET" }).handler(async () => {
  await assertAdmin();
  const rows = await queryUserDb<any[]>(
    "SELECT id, title, description, category, budget, duration, skills, status, created_at FROM freelancing_jobs ORDER BY created_at DESC"
  );
  return rows;
});

export const createJob = createServerFn({ method: "POST" })
  .inputValidator((d: { title: string; description: string; category: string; budget: string; duration: string; skills: string }) => d)
  .handler(async ({ data }) => {
    await assertAdmin();
    await queryUserDb(
      "INSERT INTO freelancing_jobs (title, description, category, budget, duration, skills) VALUES (?, ?, ?, ?, ?, ?)",
      [data.title, data.description, data.category, data.budget, data.duration, data.skills]
    );
    return { success: true };
  });

export const updateJob = createServerFn({ method: "POST" })
  .inputValidator((d: { id: number; title: string; description: string; category: string; budget: string; duration: string; skills: string; status: string }) => d)
  .handler(async ({ data }) => {
    await assertAdmin();
    await queryUserDb(
      "UPDATE freelancing_jobs SET title = ?, description = ?, category = ?, budget = ?, duration = ?, skills = ?, status = ? WHERE id = ?",
      [data.title, data.description, data.category, data.budget, data.duration, data.skills, data.status, data.id]
    );
    return { success: true };
  });

export const deleteJob = createServerFn({ method: "POST" })
  .inputValidator((d: { id: number }) => d)
  .handler(async ({ data }) => {
    await assertAdmin();
    await queryUserDb("DELETE FROM freelancing_jobs WHERE id = ?", [data.id]);
    return { success: true };
  });

// ─── USER STATUS TOGGLE (Admin) ──────────────────────────────────────
export const toggleUserStatus = createServerFn({ method: "POST" })
  .inputValidator((d: { userId: number; status: string }) => d)
  .handler(async ({ data }) => {
    const currentUser = await assertAdmin();
    if (data.userId === currentUser.id) {
      throw new Error("You cannot change your own status.");
    }
    await queryUserDb("UPDATE site_users SET status = ? WHERE id = ?", [data.status, data.userId]);
    return { success: true };
  });

// ─── MANUAL REMINDER DISPATCH (Admin) ───────────────────────────────
export const sendManualNotification = createServerFn({ method: "POST" })
  .inputValidator((d: { userId: number; title: string; message: string }) => d)
  .handler(async ({ data }) => {
    await assertAdmin();
    await queryUserDb(
      "INSERT INTO notifications (user_id, title, message, is_read) VALUES (?, ?, ?, FALSE)",
      [data.userId, data.title, data.message]
    );
    return { success: true };
  });

// ─── GET DYNAMIC SERVICES CATALOG (User/Admin) ──────────────────────
export const getServicesList = createServerFn({ method: "GET" }).handler(async () => {
  const rows = await queryUserDb<any[]>(
    "SELECT id, name, category, description, price, duration, image_url, rating, icon_name, created_at FROM services ORDER BY name ASC"
  );
  return rows;
});

// ─── USER NOTIFICATIONS (User) ──────────────────────────────────────
export const getUserNotifications = createServerFn({ method: "GET" }).handler(async () => {
  const user = await getCurrentUser();
  if (!user) return [];
  const rows = await queryUserDb<any[]>(
    "SELECT id, user_id, title, message, is_read, created_at FROM notifications WHERE user_id = ? ORDER BY created_at DESC",
    [user.id]
  );
  return rows;
});

// ─── MARK NOTIFICATION READ (User) ──────────────────────────────────
export const markNotificationAsRead = createServerFn({ method: "POST" })
  .inputValidator((d: { id: number }) => d)
  .handler(async ({ data }) => {
    const user = await getCurrentUser();
    if (!user) throw new Error("Not logged in");
    await queryUserDb("UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?", [data.id, user.id]);
    return { success: true };
  });

// ─── CHECK & GENERATE AUTO EXPIRE REMINDERS ─────────────────────────
export const checkAndGenerateReminders = createServerFn({ method: "POST" }).handler(async () => {
  const user = await getCurrentUser();
  if (!user) return { success: false, message: "Not logged in" };

  try {
    const subs = await queryUserDb<any[]>(
      `SELECT us.id, us.user_id, us.product_id, us.expiry_date, us.status, u.name as user_name, u.email as user_email, p.name as product_name
       FROM user_subscriptions us
       JOIN site_users u ON us.user_id = u.id
       JOIN products p ON us.product_id = p.id
       WHERE us.status IN ('approved', 'active', 'expired')`
    );

    const now = new Date();
    const nowStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    for (const sub of subs) {
      if (!sub.expiry_date) continue;
      const expiry = new Date(sub.expiry_date);
      const expiryStart = new Date(expiry.getFullYear(), expiry.getMonth(), expiry.getDate());
      
      const diffTime = expiryStart.getTime() - nowStart.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      let reminderType: string | null = null;
      let message = "";

      if (diffDays === 7) {
        reminderType = "7_days";
        message = `Your subscription for product '${sub.product_name}' will expire in 7 days (on ${expiry.toLocaleDateString()}). Please renew.`;
      } else if (diffDays === 3) {
        reminderType = "3_days";
        message = `Your subscription for product '${sub.product_name}' will expire in 3 days (on ${expiry.toLocaleDateString()}). Please renew.`;
      } else if (diffDays === 1) {
        reminderType = "tomorrow";
        message = `Your subscription for product '${sub.product_name}' will expire tomorrow! Please renew.`;
      } else if (diffDays === 0) {
        reminderType = "today";
        message = `Your subscription for product '${sub.product_name}' expires today!`;
      } else if (diffDays < 0 && sub.status !== "expired") {
        reminderType = "expired";
        message = `Your subscription for product '${sub.product_name}' has expired.`;
      }

      if (reminderType) {
        const alreadySent = await queryUserDb<any[]>(
          "SELECT id FROM reminder_logs WHERE user_id = ? AND subscription_id = ? AND reminder_type = ?",
          [sub.user_id, sub.id, reminderType]
        );

        if (alreadySent.length === 0) {
          await queryUserDb(
            "INSERT INTO reminder_logs (user_id, subscription_id, reminder_type) VALUES (?, ?, ?)",
            [sub.user_id, sub.id, reminderType]
          );

          await queryUserDb(
            "INSERT INTO notifications (user_id, title, message) VALUES (?, ?, ?)",
            [sub.user_id, `Subscription Alert: ${reminderType.replace('_', ' ').toUpperCase()}`, message]
          );

          await queryUserDb(
            "INSERT INTO notifications (user_id, title, message) VALUES (?, ?, ?)",
            [1, `User Subscription Alert: ${sub.user_name}`, `Subscription for product '${sub.product_name}' is ${reminderType.replace('_', ' ')} for user ${sub.user_name} (${sub.user_email}).`]
          );

          if (reminderType === "expired") {
            await queryUserDb(
              "UPDATE user_subscriptions SET status = 'expired' WHERE id = ?",
              [sub.id]
            );
          }
        }
      }
    }
    return { success: true };
  } catch (err: any) {
    console.error("Reminder check failed:", err);
    return { success: false, error: err.message };
  }
});

// ─── CREATE CHECKOUT ORDER (User) ───────────────────────────────────
export const createCheckoutOrder = createServerFn({ method: "POST" })
  .inputValidator((d: {
    itemId: string;
    itemType: "product" | "service";
    quantity?: number;
    billingDetails?: {
      name?: string;
      email?: string;
      mobile?: string;
      address?: string;
      companyName?: string;
      company?: string;
      profession?: string;
    };
    paymentMethod?: string;
    amount?: number;
    tax?: number;
    totalAmount?: number;
    simulateFailure?: boolean;
  }) => d)
  .handler(async ({ data }) => {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized: Please log in.");

    const db = getConsentDb();
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      const itemId = data.itemId;
      const itemType = data.itemType;
      const quantity = Number(data.quantity ?? 1);
      const paymentMethod = data.paymentMethod ?? "gpay";
      const simulateFailure = Boolean(data.simulateFailure);

      if (!itemId) throw new Error("Item ID is required.");
      if (itemType !== "product" && itemType !== "service") throw new Error("Invalid item type.");

      let amount = Number(data.amount ?? 0);
      let tax = Number(data.tax ?? 0);
      let totalAmount = Number(data.totalAmount ?? 0);

      // Fallback price retrieval from DB if not passed or 0
      if (amount === 0) {
        if (itemType === "product") {
          const [prodRow]: any = await conn.execute("SELECT price FROM products WHERE id = ?", [itemId]);
          if (prodRow && prodRow.length > 0) {
            amount = Number(prodRow[0].price);
          }
        } else {
          const [svcRow]: any = await conn.execute("SELECT price FROM services WHERE id = ?", [itemId]);
          if (svcRow && svcRow.length > 0) {
            amount = Number(svcRow[0].price);
          }
        }
        tax = amount * 0.1;
        totalAmount = amount + tax;
      }

      const invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      const paymentStatus = simulateFailure ? "failed" : "success";

      // 1. Insert into orders table
      const [orderResult]: any = await conn.execute(
        `INSERT INTO orders (user_id, item_type, item_id, quantity, price, tax, total_amount, payment_method, payment_status, invoice_number)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          user.id,
          itemType,
          itemId,
          quantity,
          amount,
          tax,
          totalAmount,
          paymentMethod,
          paymentStatus,
          invoiceNumber
        ].map(v => v === undefined ? null : v)
      );

      const orderId = orderResult.insertId;

      // 2. Insert into payments table
      await conn.execute(
        `INSERT INTO payments (order_id, user_id, amount, payment_method, transaction_id, status)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          user.id,
          totalAmount,
          paymentMethod,
          transactionId,
          paymentStatus
        ].map(v => v === undefined ? null : v)
      );

      if (paymentStatus === "success") {
        if (itemType === "product") {
          const startDate = new Date();
          const expiryDate = new Date();
          expiryDate.setDate(startDate.getDate() + 30);

          // 3. Upsert into user_subscriptions
          await conn.execute(
            `INSERT INTO user_subscriptions (user_id, product_id, status, start_date, expiry_date, price, payment_method, invoice_number, quantity)
             VALUES (?, ?, 'approved', ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE 
               status = 'approved', 
               start_date = ?, 
               expiry_date = ?, 
               price = ?, 
               payment_method = ?, 
               invoice_number = ?, 
               quantity = ?`,
            [
              user.id,
              itemId,
              startDate,
              expiryDate,
              totalAmount,
              paymentMethod,
              invoiceNumber,
              quantity,
              startDate,
              expiryDate,
              totalAmount,
              paymentMethod,
              invoiceNumber,
              quantity
            ].map(v => v === undefined ? null : v)
          );

          await conn.execute(
            "INSERT INTO notifications (user_id, title, message) VALUES (?, ?, ?)",
            [
              user.id,
              "Subscription Activated",
              `Your subscription for product '${itemId}' has been activated successfully! Expiry: ${expiryDate.toLocaleDateString()}`
            ].map(v => v === undefined ? null : v)
          );
          
          await conn.execute(
            "INSERT INTO notifications (user_id, title, message) VALUES (?, ?, ?)",
            [
              user.id,
              "Subscription Renewed / Upgraded",
              `Your plan '${itemId}' was successfully purchased, renewed, or upgraded!`
            ].map(v => v === undefined ? null : v)
          );
        } else {
          await conn.execute(
            "INSERT INTO notifications (user_id, title, message) VALUES (?, ?, ?)",
            [
              user.id,
              "Service Booked Successfully",
              `You have successfully booked the service '${itemId}'. Our team will reach out to you shortly.`
            ].map(v => v === undefined ? null : v)
          );
        }

        await conn.execute(
          "INSERT INTO notifications (user_id, title, message) VALUES (?, ?, ?)",
          [
            user.id,
            "Order Created & Paid",
            `Order ${invoiceNumber} is successful. Total Amount Paid: $${totalAmount}`
          ].map(v => v === undefined ? null : v)
        );

        await conn.execute(
          "INSERT INTO notifications (user_id, title, message) VALUES (?, ?, ?)",
          [
            1,
            "New Order Placed",
            `User ${user.name} placed a new order for ${itemId}. Invoice: ${invoiceNumber}`
          ].map(v => v === undefined ? null : v)
        );
      } else {
        await conn.execute(
          "INSERT INTO notifications (user_id, title, message) VALUES (?, ?, ?)",
          [
            user.id,
            "Payment Failed",
            `Order ${invoiceNumber} failed due to payment issues. Please try again.`
          ].map(v => v === undefined ? null : v)
        );
        
        await conn.execute(
          "INSERT INTO notifications (user_id, title, message) VALUES (?, ?, ?)",
          [
            1,
            "Failed Payment / Order Cancelled",
            `User ${user.name}'s payment for ${itemId} failed.`
          ].map(v => v === undefined ? null : v)
        );
      }

      await conn.commit();
      return {
        success: paymentStatus === "success",
        invoiceNumber,
        transactionId,
        orderId,
        paymentStatus,
        orderDate: new Date()
      };
    } catch (error: any) {
      await conn.rollback();
      throw new Error(error.message || "Failed to process transaction.");
    } finally {
      conn.release();
    }
  });

// ─── GET USER ORDERS (User) ─────────────────────────────────────────
export const getUserOrders = createServerFn({ method: "GET" }).handler(async () => {
  const user = await getCurrentUser();
  if (!user) return [];
  const rows = await queryUserDb<any[]>(
    "SELECT id, user_id, item_type, item_id, quantity, price, tax, total_amount, payment_method, payment_status, order_date, invoice_number FROM orders WHERE user_id = ? ORDER BY order_date DESC",
    [user.id]
  );
  return rows;
});

// ─── GET USER PAYMENTS (User) ───────────────────────────────────────
export const getUserPayments = createServerFn({ method: "GET" }).handler(async () => {
  const user = await getCurrentUser();
  if (!user) return [];
  const rows = await queryUserDb<any[]>(
    "SELECT id, order_id, user_id, amount, payment_method, transaction_id, status, created_at FROM payments WHERE user_id = ? ORDER BY created_at DESC",
    [user.id]
  );
  return rows;
});

// Dismiss deletion request
export const deleteDeleteRequest = createServerFn({ method: "POST" })
  .inputValidator((d: { id: number }) => d)
  .handler(async ({ data }) => {
    await assertAdmin();
    await queryUserDb("DELETE FROM delete_data_requests WHERE id = ?", [data.id]);
    return { success: true };
  });
