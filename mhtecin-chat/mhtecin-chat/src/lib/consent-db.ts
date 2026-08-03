import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export function getConsentDb(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST ?? "193.203.166.72",
      port: Number(process.env.DB_PORT ?? 3306),
      user: process.env.DB_USER ?? "u690779184_www_consent",
      password: process.env.DB_PASSWORD ?? "Ramu@3435",
      database: process.env.DB_NAME ?? "u690779184_www_consent",
      waitForConnections: true,
      connectionLimit: 5,
      connectTimeout: 10000,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    });
  }
  return pool;
}

export async function queryConsent<T>(sql: string, values?: (string | number | null | boolean)[]): Promise<T> {
  try {
    const db = getConsentDb();
    const [rows] = await db.execute(sql, values);
    return rows as T;
  } catch (error: any) {
    console.warn("[DB Warning] Database connection failed or query error:", error.message || error);
    return [] as unknown as T;
  }
}

export async function setupConsentTable() {
  try {
    await queryConsent(`
      CREATE TABLE IF NOT EXISTS user_consents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ip_address VARCHAR(255) NOT NULL,
        consent_given BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (e) {
    console.warn("[DB Warning] Could not setup consent table:", e);
  }
}
