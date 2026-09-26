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
