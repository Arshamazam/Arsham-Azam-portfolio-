import type { NextConfig } from "next";

// For GitHub Pages project sites (username.github.io/repo-name), set
// NEXT_PUBLIC_BASE_PATH=/repo-name at build time. Leave unset for Vercel.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  // cacheComponents is intentionally off: it rejects `dynamic = "force-static"`,
  // which `output: "export"` requires for sitemap/robots/OG image routes.
  // Tailwind runs through PostCSS (postcss.config.mjs), which works with both bundlers.
  turbopack: { root: process.cwd() },
};

export default nextConfig;
