import "server-only";

import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

/** Returns null when Upstash env vars are missing (local/demo without Redis). */
export function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  if (!redis) {
    redis = new Redis({ url, token });
  }
  return redis;
}

/** Lifetime unique visitor total for the landing page. */
export const UNIQUES_HOME_KEY = "uniques:home";

export function visitorDedupeKey(visitorId: string) {
  return `uv:home:${visitorId}`;
}
