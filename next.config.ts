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
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  // Permanent redirects for renamed/old URLs and canonical host enforcement
  redirects: async () => [
    // Specific slug redirects — old URLs that 404'd
    {
      source: '/tratamentos/tratamento-hpv-anal',
      destination: '/tratamentos/hpv-anal',
      permanent: true,
    },
    {
      source: '/blog/cisto-pilonidal-cirurgia-laser',
      destination: '/blog/cisto-pilonidal-cirurgia-laser-quando-operar',
      permanent: true,
    },
    // Canonical host enforcement — belt-and-suspenders alongside Vercel platform config
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'analuizarocha.com.br' }],
      destination: 'https://www.analuizarocha.com.br/:path*',
      permanent: true,
    },
    {
      source: '/:path*',
      has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
      destination: 'https://www.analuizarocha.com.br/:path*',
      permanent: true,
    },
  ],
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
          value: 'public, s-maxage=0, must-revalidate'
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
