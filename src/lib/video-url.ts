export function videoUrlToEmbed(url: string): string {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === "vimeo.com") {
      urlObj.hostname = "player.vimeo.com";
      urlObj.pathname = `/video${urlObj.pathname}`;
    }
    return urlObj.toString();
  } catch {
    return "";
  }
}

export function withAutoplay(embedUrl: string): string {
  try {
    const urlObj = new URL(embedUrl);
    urlObj.searchParams.set("autoplay", "1");
    return urlObj.toString();
  } catch {
    return embedUrl;
  }
}

function youtubeId(urlObj: URL): string | null {
  if (urlObj.hostname === "youtu.be") return urlObj.pathname.slice(1) || null;
  if (!urlObj.hostname.endsWith("youtube.com")) return null;
  return (
    urlObj.searchParams.get("v") ??
    urlObj.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1] ??
    null
  );
}

/** Poster image for the click-to-play facade; null when unavailable. */
export async function getVideoThumbnail(url: string): Promise<string | null> {
  try {
    const urlObj = new URL(url);

    const ytId = youtubeId(urlObj);
    if (ytId) return `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;

    if (urlObj.hostname.endsWith("vimeo.com")) {
      const res = await fetch(
        `https://vimeo.com/api/oembed.json?width=1280&url=${encodeURIComponent(url)}`,
        { next: { revalidate: 86400 } },
      );
      if (!res.ok) return null;
      const data = (await res.json()) as { thumbnail_url?: string };
      return data.thumbnail_url ?? null;
    }
  } catch {
    // Fall back to the plain poster.
  }
  return null;
}
