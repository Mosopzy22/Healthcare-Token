import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // App Router is enabled by default in Next.js 14
  // No server-side env vars are exposed to the client
  // OPENAI_API_KEY is only accessible in route handlers (app/api/*)
};

export default nextConfig;
