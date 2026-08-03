import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export function getDb(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST ?? "127.0.0.1",
      port: Number(process.env.DB_PORT ?? 3306),
      user: process.env.DB_USER ?? "root",
      password: process.env.DB_PASSWORD ?? "pk@30",
      database: process.env.DB_NAME ?? "mhtechin",
      waitForConnections: true,
      connectionLimit: 10,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    });
  }
  return pool;
}

export async function query<T>(sql: string, values?: (string | number | null)[]): Promise<T> {
  try {
    const [rows] = await getDb().execute(sql, values);
    return rows as T;
  } catch (error: any) {
    console.warn("[DB Warning] Query execution failed:", error.message || error);
    return [] as unknown as T;
  }
}