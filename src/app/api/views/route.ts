import { NextResponse } from "next/server";
import {
  isLikelyBot,
  isValidVisitorId,
  shouldCountVisitor,
} from "@/lib/pageviews";
import {
  getRedis,
  UNIQUES_HOME_KEY,
  visitorDedupeKey,
} from "@/lib/redis";

export const runtime = "edge";

function jsonCount(count: number, init?: ResponseInit) {
  return NextResponse.json({ count }, init);
}

async function readCount() {
  const redis = getRedis();
  if (!redis) return null;
  const value = await redis.get<number>(UNIQUES_HOME_KEY);
  return typeof value === "number" ? value : Number(value ?? 0) || 0;
}

export async function GET() {
  try {
    const count = await readCount();
    if (count === null) {
      return jsonCount(0, { status: 503 });
    }
    return jsonCount(count);
  } catch (error) {
    console.error("Failed to read unique visitors:", error);
    return jsonCount(0, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const redis = getRedis();
    if (!redis) {
      return jsonCount(0, { status: 503 });
    }

    const ua = request.headers.get("user-agent");
    if (isLikelyBot(ua) || !shouldCountVisitor()) {
      const count = await readCount();
      return jsonCount(count ?? 0, { status: 202 });
    }

    let visitorId: unknown;
    try {
      const body = (await request.json()) as { visitorId?: unknown };
      visitorId = body.visitorId;
    } catch {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    if (!isValidVisitorId(visitorId)) {
      return NextResponse.json({ error: "Invalid visitorId" }, { status: 400 });
    }

    // First time we see this id → count as a unique visitor.
    const isNew = await redis.set(visitorDedupeKey(visitorId), 1, {
      nx: true,
    });
    if (isNew) {
      const count = await redis.incr(UNIQUES_HOME_KEY);
      return jsonCount(typeof count === "number" ? count : Number(count) || 0);
    }

    const count = await readCount();
    return jsonCount(count ?? 0, { status: 202 });
  } catch (error) {
    console.error("Failed to record unique visitor:", error);
    return jsonCount(0, { status: 500 });
  }
}
