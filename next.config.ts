import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/pintxos-night", destination: "/pintxos-app/index.html" },
      { source: "/pintxos", destination: "/pintxos-app/index.html" },
      { source: "/pintxos-night/staff", destination: "/pintxos-app/results.html" },
    ];
  },
};

export default nextConfig;
