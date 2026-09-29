import type { NextConfig } from "next";
import { cloudflare } from "./src/constants/cloudflare";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 604800,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ap-south-1.graphassets.com",
      },
      {
        protocol: "https",
        hostname: "i.vimeocdn.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: Object.entries(cloudflare.pages.securityHeaders).map(
          ([key, value]) => ({ key, value }),
        ),
      },
    ];
  },
};

export default nextConfig;
