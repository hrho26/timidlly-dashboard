import type { NextConfig } from "next";

// Static export for GitHub Pages. The site is served from
// https://hrho26.github.io/timidlly-dashboard, so basePath must match the
// repo name. Remove basePath (and switch hosting) if this ever moves to
// Vercel or a custom domain.
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/timidlly-dashboard",
  images: { unoptimized: true },
};

export default nextConfig;
