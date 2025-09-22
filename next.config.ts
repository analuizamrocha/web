import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@vercel/analytics', '@next/third-parties'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Turbopack configuration for Next.js 15+
  turbopack: {
    // Turbopack handles bundle optimization automatically
    // No need for manual webpack splitChunks configuration
  },
};

export default nextConfig;
