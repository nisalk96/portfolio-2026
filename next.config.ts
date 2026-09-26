import type { NextConfig } from "next";
import { cloudflare } from "./src/constants/cloudflare";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ap-south-1.graphassets.com",
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
