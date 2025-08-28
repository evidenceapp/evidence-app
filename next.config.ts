import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scontent-iad3-2.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "scontent.*.cdninstagram.com", 
      },
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "instagram.*",
      },
    ],
  },
};

export default nextConfig;
