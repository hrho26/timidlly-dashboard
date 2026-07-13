import type { NextConfig } from "next";

// Static export, deployable to both hosts:
// - Vercel: serves at the domain root — no basePath. This is the default.
// - GitHub Pages: serves at hrho26.github.io/timidlly-dashboard, so the
//   basePath must match the repo name. Set GITHUB_PAGES=true when building
//   for it (see "Deploying updates" in the README).
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/timidlly-dashboard" : "",
  images: { unoptimized: true },
};

export default nextConfig;
