// LocalStorage cache utility with TTL support for fast portal loads

const PREFIX = "mhtechin_";

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

/** Get cached data. Returns null if expired or missing. */
export function getCached<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() > entry.expiresAt) {
      localStorage.removeItem(PREFIX + key);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

/** Store data in cache with a TTL in milliseconds (default: 5 minutes). */
export function setCache<T>(key: string, data: T, ttlMs: number = 5 * 60 * 1000): void {
  if (typeof window === "undefined") return;
  try {
    const entry: CacheEntry<T> = {
      data,
      expiresAt: Date.now() + ttlMs,
    };
    localStorage.setItem(PREFIX + key, JSON.stringify(entry));
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

/** Remove a specific cache key. */
export function clearCache(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PREFIX + key);
}

/** Clear all MHTECHIN cache entries (e.g. on logout). */
export function clearAllCache(): void {
  if (typeof window === "undefined") return;
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(PREFIX)) {
      keysToRemove.push(k);
    }
  }
  keysToRemove.forEach((k) => localStorage.removeItem(k));
}

// Cache key constants
export const CACHE_KEYS = {
  USER: "user",
  SUBSCRIPTIONS: "subs",
  PRODUCTS: "products",
  VISIBILITIES: "visibilities",
  JOBS: "jobs",
  PENDING_SUBS: "pending_subs",
} as const;

// TTL constants
export const CACHE_TTL = {
  SHORT: 2 * 60 * 1000,       // 2 minutes — user-specific data
  MEDIUM: 5 * 60 * 1000,      // 5 minutes — default
  LONG: 30 * 60 * 1000,       // 30 minutes — product lists, jobs
} as const;
