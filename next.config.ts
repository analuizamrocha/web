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
  // Permanent redirects for renamed/old URLs
  redirects: async () => [
    // Old treatment slug — page lives at /tratamentos/hpv-anal
    {
      source: '/tratamentos/tratamento-hpv-anal',
      destination: '/tratamentos/hpv-anal',
      permanent: true,
    },
    // Old short blog slug — file is cisto-pilonidal-cirurgia-laser-quando-operar
    {
      source: '/blog/cisto-pilonidal-cirurgia-laser',
      destination: '/blog/cisto-pilonidal-cirurgia-laser-quando-operar',
      permanent: true,
    },
  ],
  // Security headers and static-asset caching
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
    deviceSizes: [576, 640, 768, 896, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default withBundleAnalyzer(nextConfig);
