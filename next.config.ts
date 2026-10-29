import type { NextConfig } from "next";

// Set NEXT_PUBLIC_BASE_PATH=/nama-repo when deploying to https://user.github.io/nama-repo/.
// Leave it empty for a user/organisation site or for a custom domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
