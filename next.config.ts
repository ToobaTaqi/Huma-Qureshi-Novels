import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cdn.sanity.io"], // Add the Sanity image CDN here
  },
};

export default nextConfig;
