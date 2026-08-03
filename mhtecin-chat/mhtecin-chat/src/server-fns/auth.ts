import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader, getRequestHeader } from "@tanstack/react-start/server";
import { setupUserTable, queryUserDb } from "@/lib/user-db";
import crypto from "crypto";
import { sendSmtpEmail } from "@/lib/smtp";

const SECRET = "mhtechin_auth_super_secret_123456";

// Parse cookies from headers
function getCookies(): Record<string, string> {
  const cookieHeader = getRequestHeader("Cookie") || "";
  const cookies: Record<string, string> = {};
  cookieHeader.split(";").forEach((cookie) => {
    const separatorIndex = cookie.indexOf("=");
    if (separatorIndex !== -1) {
      const key = cookie.slice(0, separatorIndex).trim();
      const value = cookie.slice(separatorIndex + 1).trim();
      if (key) {
        cookies[key] = value;
      }
    }
  });
  return cookies;
}

// Simple password hashing using SHA256 + secret salt
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "|" + SECRET).digest("hex");
}

// Session cookie helper
function setSessionCookie(userId: number) {
  const sessionToken = crypto.createHash("sha256").update(userId.toString() + "|" + SECRET).digest("hex");
  // Save both the ID and the verification token
  const cookieValue = `${userId}:${sessionToken}`;
  setResponseHeader(
    "Set-Cookie",
    `user_session=${cookieValue}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`
  );
}

// Clear cookie
function clearSessionCookie() {
  setResponseHeader(
    "Set-Cookie",
    `user_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
  );
}

// Resolve current user from session cookie
export const getCurrentUser = createServerFn({ method: "GET" }).handler(async () => {
  try {
    await setupUserTable();
    const cookies = getCookies();
    const session = cookies["user_session"];
    if (!session) return null;

    const [userIdStr, token] = session.split(":");
    if (!userIdStr || !token) return null;

    // Verify token
    const expectedToken = crypto.createHash("sha256").update(userIdStr + "|" + SECRET).digest("hex");
    if (token !== expectedToken) return null;

    const userId = parseInt(userIdStr, 10);
    const users = await queryUserDb<any[]>(
      "SELECT id, name, email, role, mobile, address, profession, company_name, google_id, created_at FROM site_users WHERE id = ?",
      [userId]
    );

    if (users.length === 0) return null;

    return {
      ...users[0],
      role: typeof users[0].role === "string" ? users[0].role.trim().toLowerCase() : users[0].role,
    };
  } catch (e) {
    console.error("[auth] Failed to get current user:", e);
    return null;
  }
});

// Captcha generator (returns dynamic math equation and verification token)
export const getCaptcha = createServerFn({ method: "GET" }).handler(async () => {
  const num1 = Math.floor(Math.random() * 12) + 3;
  const num2 = Math.floor(Math.random() * 8) + 2;
  const sum = num1 + num2;

  // Create verification token stateless
  const token = crypto.createHash("sha256").update(sum.toString() + "|" + SECRET).digest("hex");

  return {
    question: `${num1} + ${num2}`,
    token,
  };
});

// Logout endpoint
export const logoutUser = createServerFn({ method: "POST" }).handler(async () => {
  clearSessionCookie();
  return { success: true };
});

// User Registration
export const registerUser = createServerFn({ method: "POST" })
  .inputValidator((d: any) => d)
  .handler(async ({ data }) => {
    try {
      await setupUserTable();

      const { name, email, password, mobile, address, profession, company_name, captchaAnswer, captchaToken } = data;

      // 1. Verify captcha
      const expectedToken = crypto.createHash("sha256").update(captchaAnswer.toString().trim() + "|" + SECRET).digest("hex");
      if (captchaToken !== expectedToken) {
        return { success: false, error: "Incorrect Captcha answer. Please try again." };
      }

      // 2. Check if user already exists
      const existing = await queryUserDb<any[]>("SELECT id FROM site_users WHERE email = ?", [email]);
      if (existing.length > 0) {
        return { success: false, error: "User with this email already exists." };
      }

      // 3. Hash password and insert with is_verified = 0
      const hashedPassword = hashPassword(password);
      const result = await queryUserDb<any>(
        "INSERT INTO site_users (name, email, password, mobile, address, profession, company_name, is_verified) VALUES (?, ?, ?, ?, ?, ?, ?, 0)",
        [name, email, hashedPassword, mobile, address, profession, company_name]
      );

      const userId = result.insertId;

      // 4. Generate 6-digit verification code and save
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      await queryUserDb("UPDATE site_users SET verification_code = ? WHERE id = ?", [verificationCode, userId]);

      // 5. Send SMTP email
      sendSmtpEmail({
        to: email,
        subject: "Verify Your Email Address - MHTECHIN",
        text: `Hello ${name},\n\nYour MHTECHIN registration verification code is: ${verificationCode}\n\nPlease enter this code to verify your account.`,
        html: `<h2>Welcome to MHTECHIN</h2>
               <p>Hello <b>${name}</b>,</p>
               <p>Your registration verification code is:</p>
               <h1 style="font-size: 32px; letter-spacing: 5px; color: #4F46E5;">${verificationCode}</h1>
               <p>Please enter this code on the verification screen to activate your account.</p>`
      }).catch((err) => {
        console.error("Failed to send verification email via SMTP:", err);
      });

      return { success: true, userId, needsVerification: true };
    } catch (e: any) {
      console.error("[auth] Registration error:", e);
      return { success: false, error: e.message || "Failed to register user." };
    }
  });

// User Login
export const loginUser = createServerFn({ method: "POST" })
  .inputValidator((d: any) => d)
  .handler(async ({ data }) => {
    try {
      await setupUserTable();

      const { email, password } = data;

      const users = await queryUserDb<any[]>("SELECT id, name, password, is_verified FROM site_users WHERE email = ?", [email]);
      if (users.length === 0) {
        return { success: false, error: "No account found with this email. Please click 'Register / Sign Up' below to create your account." };
      }

      const user = users[0];
      if (!user.password) {
        return { success: false, error: "This email was registered via Google. Please log in with Google." };
      }

      const hashedPassword = hashPassword(password);
      if (user.password !== hashedPassword && user.password !== password) {
        return { success: false, error: "Incorrect password. Please check your password and try again." };
      }

      // Always set session cookie on valid credentials
      setSessionCookie(user.id);

      // If user is already verified or is an admin, complete login directly
      const isAlreadyVerified = Boolean(user.is_verified) || user.role?.toLowerCase() === "admin" || user.email === "rameshwar@mhtechin.com" || user.email === "admin@mhtechin.com";
      
      if (isAlreadyVerified) {
        return { success: true, userId: user.id, needsVerification: false };
      }

      // Otherwise generate verification code for unverified users
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      await queryUserDb("UPDATE site_users SET verification_code = ? WHERE id = ?", [verificationCode, user.id]);

      sendSmtpEmail({
        to: email,
        subject: "Verify Your Email Address - MHTECHIN",
        text: `Hello ${user.name},\n\nYour MHTECHIN verification code is: ${verificationCode}\n\nPlease enter this code to verify your account.`,
        html: `<h2>Welcome to MHTECHIN</h2>
               <p>Hello <b>${user.name}</b>,</p>
               <p>Your verification code is:</p>
               <h1 style="font-size: 32px; letter-spacing: 5px; color: #4F46E5;">${verificationCode}</h1>
               <p>Please enter this code on the verification screen to activate your account.</p>`
      }).catch((err) => {
        console.error("Failed to send verification email via SMTP:", err);
      });

      return { success: true, userId: user.id, needsVerification: true };
    } catch (e: any) {
      console.error("[auth] Login error:", e);
      const isDbError = e.code === "ECONNREFUSED" || e.message?.includes("ECONNREFUSED") || e.message?.includes("Access denied") || e.message?.includes("connect");
      return {
        success: false,
        error: isDbError
          ? `Database Connection Error (${e.code || "DB_OFFLINE"}): Please verify MySQL is running and DB credentials in .env are correct.`
          : (e.message || "Login failed.")
      };
    }
  });

// Google Sign-In Simulation
// Checks if user exists. If yes, logs them in. If not, creates them with nullable profile details.
// If profile details (mobile, address, etc.) are empty, returns needsDetails: true.
export const loginWithGoogleMock = createServerFn({ method: "POST" })
  .inputValidator((d: any) => d)
  .handler(async ({ data }) => {
    try {
      await setupUserTable();

      const { name, email, googleId } = data;

      // Find user
      const users = await queryUserDb<any[]>(
        "SELECT id, mobile, address, profession, company_name FROM site_users WHERE email = ?",
        [email]
      );

      let userId: number;
      let needsDetails = false;

      if (users.length === 0) {
        // Create user with Google info, empty profile details
        const result = await queryUserDb<any>(
          "INSERT INTO site_users (name, email, google_id) VALUES (?, ?, ?)",
          [name, email, googleId]
        );
        userId = result.insertId;
        needsDetails = true;
      } else {
        const user = users[0];
        userId = user.id;
        // Check if missing any detail
        if (!user.mobile || !user.address || !user.profession || !user.company_name) {
          needsDetails = true;
        }

        // Link Google ID if not already linked and set last_login
        await queryUserDb("UPDATE site_users SET google_id = ?, last_login = CURRENT_TIMESTAMP WHERE id = ?", [googleId, userId]);
      }

      await queryUserDb("UPDATE site_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?", [userId]);
      setSessionCookie(userId);
      return { success: true, userId, needsDetails };
    } catch (e: any) {
      console.error("[auth] Google auth error:", e);
      return { success: false, error: e.message || "Failed to log in with Google." };
    }
  });

// Complete user profile for Google login users
export const completeGoogleProfile = createServerFn({ method: "POST" })
  .inputValidator((d: any) => d)
  .handler(async ({ data }) => {
    try {
      await setupUserTable();

      const { mobile, address, profession, company_name } = data;

      const cookies = getCookies();
      const session = cookies["user_session"];
      if (!session) return { success: false, error: "No active session." };

      const [userIdStr] = session.split(":");
      const userId = parseInt(userIdStr, 10);

      await queryUserDb(
        "UPDATE site_users SET mobile = ?, address = ?, profession = ?, company_name = ? WHERE id = ?",
        [mobile, address, profession, company_name, userId]
      );

      return { success: true };
    } catch (e: any) {
      console.error("[auth] Complete profile error:", e);
      return { success: false, error: e.message || "Failed to save profile." };
    }
  });

export const updateUserProfile = createServerFn({ method: "POST" })
  .inputValidator((d: {
    name: string;
    mobile?: string;
    address?: string;
    profession?: string;
    companyName?: string;
  }) => d)
  .handler(async ({ data }) => {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized: Please log in.");

    await queryUserDb(
      `UPDATE site_users 
       SET name = ?, mobile = ?, address = ?, profession = ?, company_name = ? 
       WHERE id = ?`,
      [
        data.name,
        data.mobile ?? null,
        data.address ?? null,
        data.profession ?? null,
        data.companyName ?? null,
        user.id
      ]
    );

    return { success: true, message: "Profile updated successfully!" };
  });

export const changeUserPassword = createServerFn({ method: "POST" })
  .inputValidator((d: {
    current: string;
    new: string;
  }) => d)
  .handler(async ({ data }) => {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized: Please log in.");

    const rows = await queryUserDb<any[]>(
      "SELECT password FROM site_users WHERE id = ?",
      [user.id]
    );
    if (!rows || rows.length === 0) throw new Error("User not found.");

    const dbPassword = rows[0].password;
    if (dbPassword) {
      const hashedCurrent = hashPassword(data.current);
      if (dbPassword !== hashedCurrent) {
        throw new Error("Incorrect current password.");
      }
    }

    const hashedNew = hashPassword(data.new);
    await queryUserDb(
      "UPDATE site_users SET password = ? WHERE id = ?",
      [hashedNew, user.id]
    );

    return { success: true, message: "Password updated successfully!" };
  });

export const getUserSettings = createServerFn({ method: "GET" }).handler(async () => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized: Please log in.");

  await setupUserTable();

  const rows = await queryUserDb<any[]>(
    "SELECT email_alerts, sms_alerts, security_alerts, portal_theme FROM user_settings WHERE user_id = ?",
    [user.id]
  );

  if (rows && rows.length > 0) {
    return {
      emailAlerts: Boolean(rows[0].email_alerts),
      smsAlerts: Boolean(rows[0].sms_alerts),
      securityAlerts: Boolean(rows[0].security_alerts),
      portalTheme: rows[0].portal_theme
    };
  }

  await queryUserDb(
    "INSERT IGNORE INTO user_settings (user_id, email_alerts, sms_alerts, security_alerts, portal_theme) VALUES (?, 1, 0, 1, 'dark')",
    [user.id]
  );

  return {
    emailAlerts: true,
    smsAlerts: false,
    securityAlerts: true,
    portalTheme: "dark"
  };
});

export const saveUserSettings = createServerFn({ method: "POST" })
  .inputValidator((d: {
    emailAlerts: boolean;
    smsAlerts: boolean;
    securityAlerts: boolean;
    portalTheme: string;
  }) => d)
  .handler(async ({ data }) => {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized: Please log in.");

    await queryUserDb(
      `INSERT INTO user_settings (user_id, email_alerts, sms_alerts, security_alerts, portal_theme) 
       VALUES (?, ?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE 
       email_alerts = VALUES(email_alerts), 
       sms_alerts = VALUES(sms_alerts), 
       security_alerts = VALUES(security_alerts), 
       portal_theme = VALUES(portal_theme)`,
      [
        user.id,
        data.emailAlerts ? 1 : 0,
        data.smsAlerts ? 1 : 0,
        data.securityAlerts ? 1 : 0,
        data.portalTheme
      ]
    );

    return { success: true, message: "Settings saved successfully!" };
  });

export const requestDataDeletion = createServerFn({ method: "POST" })
  .inputValidator((d: { reason: string }) => d)
  .handler(async ({ data }) => {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized: Please log in.");

    await setupUserTable();

    await queryUserDb(
      "INSERT INTO delete_data_requests (user_id, email, reason, status) VALUES (?, ?, ?, 'pending')",
      [user.id, user.email, data.reason]
    );

    return { success: true, message: "Deletion request submitted successfully!" };
  });

export const getMyDeletionRequests = createServerFn({ method: "GET" }).handler(async () => {
  const user = await getCurrentUser();
  if (!user) return [];
  await setupUserTable();
  return await queryUserDb<any[]>(
    "SELECT id, reason, status, requested_at FROM delete_data_requests WHERE user_id = ? ORDER BY requested_at DESC",
    [user.id]
  );
});

export const verifyEmailCode = createServerFn({ method: "POST" })
  .inputValidator((d: { userId: number; code: string }) => d)
  .handler(async ({ data }) => {
    await setupUserTable();
    const users = await queryUserDb<any[]>(
      "SELECT id, verification_code FROM site_users WHERE id = ?",
      [data.userId]
    );
    if (users.length === 0) throw new Error("User not found.");

    const user = users[0];
    if (user.verification_code !== data.code) {
      return { success: false, error: "Incorrect verification code. Please try again." };
    }

    // Update verified status
    await queryUserDb("UPDATE site_users SET is_verified = 1, verification_code = NULL WHERE id = ?", [data.userId]);
    setSessionCookie(data.userId);
    return { success: true };
  });

export const resendVerificationCode = createServerFn({ method: "POST" })
  .inputValidator((d: { userId: number }) => d)
  .handler(async ({ data }) => {
    await setupUserTable();
    const users = await queryUserDb<any[]>(
      "SELECT id, name, email FROM site_users WHERE id = ?",
      [data.userId]
    );
    if (users.length === 0) throw new Error("User not found.");

    const user = users[0];
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    await queryUserDb("UPDATE site_users SET verification_code = ? WHERE id = ?", [verificationCode, user.id]);

    sendSmtpEmail({
      to: user.email,
      subject: "Verify Your Email Address - MHTECHIN",
      text: `Hello ${user.name},\n\nYour MHTECHIN verification code is: ${verificationCode}\n\nPlease enter this code to verify your account.`,
      html: `<h2>Welcome to MHTECHIN</h2>
             <p>Hello <b>${user.name}</b>,</p>
             <p>Your verification code is:</p>
             <h1 style="font-size: 32px; letter-spacing: 5px; color: #4F46E5;">${verificationCode}</h1>
             <p>Please enter this code on the verification screen to activate your account.</p>`
    }).catch((err) => {
      console.error("Failed to resend SMTP verification email:", err);
    });

    return { success: true };
  });



