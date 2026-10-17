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
  // Apply exact legacy redirects before the usual trailing-slash normalization.
  skipTrailingSlashRedirect: true,
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  rewrites: async () => ({
    beforeFiles: [],
    afterFiles: [],
    // Only unresolved URLs reach this rewrite; existing HTML routes and public
    // files keep their normal behavior. Proxy normalizes the private header.
    fallback: [{
      source: '/:path*',
      has: [{ type: 'header', key: 'x-agent-markdown', value: '1' }],
      destination: '/conteudo-markdown/nao-encontrado',
    }],
  }),
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  // Permanent redirects for renamed/old URLs
  redirects: async () => [
    // Redirect known article URL variants to their canonical pages.
    {
      source: '/blog/coceira-anal-quando-is-normal-e-quando-procurar-coloproctologista-curitiba',
      destination: '/blog/coceira-anal-quando-procurar-coloproctologista-curitiba',
      permanent: true,
    },
    {
      source: '/blog/coceira-anal-quando-is-normal-e-quando-procurar-um-coloproctologista-curitiba',
      destination: '/blog/coceira-anal-quando-procurar-coloproctologista-curitiba',
      permanent: true,
    },
    {
      source: '/blog/coceira-anal-quando-normal-quando-procurar-coloproctologista-curitiba',
      destination: '/blog/coceira-anal-quando-procurar-coloproctologista-curitiba',
      permanent: true,
    },
    {
      source: '/blog/coceira-anal-quando-normal-e-quando-procurar-coloproctologista-curitiba',
      destination: '/blog/coceira-anal-quando-procurar-coloproctologista-curitiba',
      permanent: true,
    },
    {
      source: '/blog/coceira-anal-quando-normal-e-quando-procurar-um-coloproctologista-curitiba',
      destination: '/blog/coceira-anal-quando-procurar-coloproctologista-curitiba',
      permanent: true,
    },
    {
      source: '/blog/coloproctologista-curitiba-prurido-anal',
      destination: '/blog/coceira-anal-quando-procurar-coloproctologista-curitiba',
      permanent: true,
    },
    {
      source: '/blog/cirurgia-laser-hemorroida-cuando-faz-sentido',
      destination: '/blog/cirurgia-laser-hemorroida-quando-faz-sentido',
      permanent: true,
    },
    {
      source: '/blog/coloproctologia/prurido-anal-coceira-no-anus',
      destination: '/blog/coceira-anal-quando-procurar-coloproctologista-curitiba',
      permanent: true,
    },
    {
      source: '/blog/coceira-anal-quando-es-normal-quando-procurar-coloproctologista-curitiba',
      destination: '/blog/coceira-anal-quando-procurar-coloproctologista-curitiba',
      permanent: true,
    },
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
    // Conventional English trust-page paths that agents probe; pages stay pt-BR.
    { source: '/about', destination: '/sobre', permanent: true },
    { source: '/contact', destination: '/contato', permanent: true },
    { source: '/privacy', destination: '/politica-privacidade', permanent: true },
    // Preserve Next.js default slash removal after exact legacy mappings.
    {
      source: '/:path+/',
      destination: '/:path+',
      permanent: true,
    },
  ],
  // Security headers
  headers: async () => [
    // Keep utility pages and social-preview resources accessible to clients,
    // while telling crawlers not to index them as public content.
    ...[
      '/politica-privacidade',
      '/design',
      '/design-system',
      '/conteudo-markdown/:path*',
      '/:path*/opengraph-image',
      '/:path*/twitter-image',
      '/images/og.png',
    ].map((source) => ({
      source,
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
    })),
    {
      source: '/_next/image',
      has: [{ type: 'query', key: 'url', value: '/images/og\\.png' }],
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
    },
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
