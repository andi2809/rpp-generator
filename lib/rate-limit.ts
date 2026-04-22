import { NextRequest } from "next/server";

const store = new Map<string, number[]>();

const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60000);
const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 10);

export function getClientKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";
  return ip;
}

export function assertRateLimit(key: string) {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const timestamps = (store.get(key) ?? []).filter((value) => value > windowStart);

  if (timestamps.length >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((timestamps[0] + WINDOW_MS - now) / 1000);
    store.set(key, timestamps);
    return { allowed: false, retryAfter };
  }

  timestamps.push(now);
  store.set(key, timestamps);
  return { allowed: true, retryAfter: 0 };
}
