import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Orbit-360",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
