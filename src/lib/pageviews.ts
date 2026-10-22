import "server-only";

const BOT_UA =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora link preview|skypeuripreview|twitterbot|whatsapp|discordbot|telegram|preview|headless|lighthouse|pagespeed|gtmetrix|pingdom|yandex|baidu|semrush|ahrefs|mj12|dotbot|petalbot|bytespider/i;

const VISITOR_ID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isLikelyBot(userAgent: string | null): boolean {
  if (!userAgent || userAgent.trim().length < 8) return true;
  return BOT_UA.test(userAgent);
}

export function shouldCountVisitor(): boolean {
  if (process.env.NODE_ENV === "development") {
    return process.env.COUNT_VIEWS_IN_DEV === "1";
  }
  return true;
}

export function isValidVisitorId(id: unknown): id is string {
  return typeof id === "string" && VISITOR_ID_RE.test(id);
}
