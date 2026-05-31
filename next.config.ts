import type { NextConfig } from 'next'

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline'
    https://clerk.apexenergy.rs
    https://*.clerk.accounts.dev
    https://challenges.cloudflare.com;
  style-src 'self' 'unsafe-inline'
    https://fonts.googleapis.com;
  font-src 'self'
    https://fonts.gstatic.com;
  img-src 'self' data: blob:
    https://*.clerk.com
    https://img.clerk.com;
  connect-src 'self'
    https://*.clerk.com
    https://clerk.apexenergy.rs
    https://*.clerk.accounts.dev;
  frame-src
    https://challenges.cloudflare.com
    https://*.clerk.accounts.dev;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`.replace(/\n/g, ' ').trim()

const securityHeaders = [
  { key: 'X-Frame-Options',           value: 'DENY' },
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=()',
  },
  { key: 'Content-Security-Policy',      value: ContentSecurityPolicy },
  { key: 'Cross-Origin-Opener-Policy',   value: 'same-origin-allow-popups' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Exclude /_next/static — Next.js 16 manages its own cache headers for static assets
        source: '/((?!_next/static).*)',
        headers: securityHeaders,
      },
    ]
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.clerk.com' },
      { protocol: 'https', hostname: '*.clerk.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    minimumCacheTTL: 60,
  },

  async redirects() {
    return [
      {
        source:      '/:path*',
        has:         [{ type: 'host', value: 'www.apexenergy.rs' }],
        destination: 'https://apexenergy.rs/:path*',
        permanent:   true,
      },
    ]
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  experimental: {
    optimizePackageImports: ['@clerk/nextjs'],
  },
}

export default nextConfig