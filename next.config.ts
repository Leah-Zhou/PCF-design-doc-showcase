import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const githubPages = process.env.GITHUB_PAGES === "true";
const repoName = "design-system-showcase";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  ...(githubPages ? { basePath: `/${repoName}` } : {}),
  agentRules: false,
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
