import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [{ source: "/index", destination: "/links", permanent: true }];
  },
};

export default nextConfig;
