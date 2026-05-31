import type { Metadata, Viewport } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { TransitionProvider } from '@/components/layout/PageTransition'
import '../styles/globals.css'

/**
 * Apex Energy — Root Layout
 *
 * Responsibilities:
 * - Provides ClerkProvider for authentication context
 * - Sets global SEO metadata and Open Graph tags
 * - Loads brand fonts via next/font (Google Fonts subset)
 * - Applies base HTML attributes for accessibility and language
 *
 * Security notes:
 * - Content Security Policy headers are set in next.config.ts (not here)
 * - ClerkProvider handles session management securely via Clerk SDK
 * - No sensitive data is rendered in this server component
 */

// ─── Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // Base URL for resolving relative Open Graph image paths
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://apexenergy.rs'
  ),

  title: {
    default:  'Apex Energy — Energy Solutions for Serbia and the Region',
    template: '%s | Apex Energy',
  },

  description:
    'Apex Energy is a Serbian energy company specialising in renewable energy, ' +
    'smart energy systems, infrastructure engineering, and sustainable solutions.',

  keywords: [
    'energy company Serbia',
    'renewable energy Serbia',
    'solar energy',
    'wind energy',
    'energy storage',
    'smart energy systems',
    'energy infrastructure',
    'Apex Energy',
  ],

  authors: [{ name: 'Apex Energy DOO', url: 'https://apexenergy.rs' }],
  creator: 'Apex Energy DOO',
  publisher: 'Apex Energy DOO',

  // Open Graph — controls appearance when shared on LinkedIn, social media
  openGraph: {
    type:        'website',
    locale:      'sr_RS',
    alternateLocale: ['en_US'],
    url:         'https://apexenergy.rs',
    siteName:    'Apex Energy',
    title:       'Apex Energy — Energy Solutions for Serbia and the Region',
    description:
      'Apex Energy is a Serbian energy company specialising in renewable energy, ' +
      'smart energy systems, infrastructure engineering, and sustainable solutions.',
    images: [
      {
        url:    '/og-image.jpg', // Place a 1200x630 image in /public/
        width:  1200,
        height: 630,
        alt:    'Apex Energy — Energy Solutions',
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card:        'summary_large_image',
    title:       'Apex Energy — Energy Solutions for Serbia and the Region',
    description:
      'Apex Energy: renewable energy, smart systems, infrastructure engineering.',
    images:      ['/og-image.jpg'],
  },

  // Robots — allow indexing in production, block in preview/staging
  robots: {
    index:  process.env.NEXT_PUBLIC_ENV === 'production',
    follow: process.env.NEXT_PUBLIC_ENV === 'production',
    googleBot: {
      index:  process.env.NEXT_PUBLIC_ENV === 'production',
      follow: process.env.NEXT_PUBLIC_ENV === 'production',
    },
  },

  // Canonical and alternate language URLs
  alternates: {
    canonical: 'https://apexenergy.rs',
    languages: {
      'sr-RS': 'https://apexenergy.rs',
      'en-US': 'https://apexenergy.rs/en',
    },
  },

  // Favicon and icons — place files in /public/
  icons: {
    icon:             '/favicon.ico',
    shortcut:         '/favicon-16x16.png',
    apple:            '/apple-touch-icon.png',
    other: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png' },
    ],
  },

  // PWA manifest
  manifest: '/site.webmanifest',

  // Verification — add once domains are confirmed
  // verification: {
  //   google: 'YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN',
  // },
}

// ─── Viewport ──────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width:        'device-width',
  initialScale: 1,
  maximumScale: 5, // Allow zoom for accessibility — never set to 1
  themeColor:   '#0A0A0A',
}

// ─── Root Layout ───────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    /*
     * ClerkProvider must wrap the entire app for auth context.
     * It does not add any visible UI — it only provides React context.
     *
     * Security: Clerk handles CSRF protection, session management,
     * and token rotation internally. Do not implement these manually.
     */
    <ClerkProvider>
      <html
        lang="sr"           // Serbian — update to "en" for English-primary
        dir="ltr"
        suppressHydrationWarning  // Required for dark mode class toggling
      >
        <head>
          {/*
           * Preconnect to Google Fonts for performance.
           * Fonts are loaded via globals.css @import.
           * In production, consider self-hosting fonts for privacy.
           */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
        </head>

        <body className="bg-black-950 text-ivory-100 font-body antialiased">
          {/*
           * Main content wrapper.
           * min-h-screen ensures footer stays at bottom on short pages.
           * flex + flex-col enables sticky footer pattern.
           */}
          <TransitionProvider>
            <div className="flex min-h-screen flex-col">
              {children}
            </div>
          </TransitionProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}