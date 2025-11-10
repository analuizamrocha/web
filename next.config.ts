import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@vercel/analytics', '@next/third-parties'],
    webVitalsAttribution: ['CLS', 'LCP'],
  },
  // Modularize imports to enable tree-shaking
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  // Security headers and bfcache-optimized caching
  // bfcache (back/forward cache) optimization:
  // - Avoid cache-control: no-store (blocks bfcache)
  // - Use stale-while-revalidate for instant bfcache + fresh content
  // - Different strategies per route type
  headers: async () => [
    {
      source: '/:path*',
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
      ]
    },
    {
      source: '/',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=0, s-maxage=60, stale-while-revalidate=86400'
        }
      ]
    },
    {
      source: '/blog/:slug*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
        }
      ]
    },
    {
      source: '/tratamentos/:slug*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
        }
      ]
    },
    {
      source: '/:path((?!_next|images).*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400'
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
};

export default withBundleAnalyzer(nextConfig);
