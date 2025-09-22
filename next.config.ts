import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@vercel/analytics', '@next/third-parties'],
    esmExternals: true,
    webVitalsAttribution: ['CLS', 'LCP'],
  },
  // Target modern browsers to reduce bundle size
  transpilePackages: [],
  swcMinify: true,
  // Enable production optimizations
  compress: true,
  poweredByHeader: false,
  // Enable source maps for debugging
  productionBrowserSourceMaps: true,
  // Security headers and caching
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains'
        },
        {
          key: 'Cache-Control',
          value: 'public, max-age=0, must-revalidate'
        }
      ]
    },
    {
      source: '/images/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    },
    {
      source: '/_next/static/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    }
  ],
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
