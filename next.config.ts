import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/pintxos-night",
        destination: "https://iberico-pintxos-night-iberico2.vercel.app/",
        permanent: false,
      },
      {
        source: "/pintxos",
        destination: "https://iberico-pintxos-night-iberico2.vercel.app/",
        permanent: false,
      },
      {
        source: "/pintxos-night/staff",
        destination: "https://iberico-pintxos-night-iberico2.vercel.app/results.html",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
