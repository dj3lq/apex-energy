    import type { Metadata, Viewport } from 'next'
    import { ClerkProvider } from '@clerk/nextjs'
    import { TransitionProvider } from '@/components/layout/PageTransition'
    import CookieConsent from '@/components/layout/CookieConsent'
    import StructuredData from '@/components/seo/StructuredData'
    import { SITE_URL, COMPANY } from '@/lib/site'
    import '../styles/globals.css'

    export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#0A0A0A',
    }

    export const metadata: Metadata = {
    // Makes relative URLs in metadata absolute — required for OG images to
    // resolve when scrapers fetch the page.
    metadataBase: new URL(SITE_URL),

    title: {
        default:  'APEX Energy — Inženjersko savetovanje i energetska rešenja | Novi Sad',
        // Child pages set only their own title; this appends the brand.
        template: '%s | APEX Energy',
    },

    description:
        'APEX energy DOO — inženjersko savetovanje, upravljanje projektima, energetska ' +
        'efikasnost, BIM digitalizacija i ISO standardi. Novi Sad, Srbija.',

    keywords: [
        'inženjersko savetovanje',
        'energetska efikasnost',
        'upravljanje projektima',
        'BIM',
        'ISO 9001',
        'bezbednost na radu',
        'Novi Sad',
        'Srbija',
    ],

    authors:   [{ name: COMPANY.legalName }],
    creator:   COMPANY.legalName,
    publisher: COMPANY.legalName,

    // Canonical URL — stops the same content ranking from several paths.
    alternates: {
        canonical: '/',
    },

    openGraph: {
        type: 'website',
        locale: 'sr_RS',
        url: SITE_URL,
        siteName: COMPANY.name,
        title: 'APEX Energy — Inženjersko savetovanje i energetska rešenja',
        description:
        'Prvoklasno inženjersko savetovanje i tehnička podrška. ' +
        'Jasni rokovi, merljivi rezultati, iskusan tim iz Novog Sada.',
        images: [
        {
            url: '/og-image.png',
            width: 1200,
            height: 630,
            alt: 'APEX Energy — inženjersko savetovanje, Novi Sad',
        },
        ],
    },

    twitter: {
        card: 'summary_large_image',
        title: 'APEX Energy — Inženjersko savetovanje',
        description: 'Inženjersko savetovanje i energetska rešenja. Novi Sad, Srbija.',
        images: ['/og-image.png'],
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        },
    },

    icons: {
        icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        ],
        apple: '/apple-touch-icon.png',
    },

    manifest: '/site.webmanifest',

    // Uncomment once you have the token from Google Search Console.
    // verification: { google: 'PASTE_TOKEN_HERE' },
    }

    export default function RootLayout({
    children,
    }: {
    children: React.ReactNode
    }) {
    return (
        <ClerkProvider>
        <html lang="sr-RS">
            <body>
            <StructuredData />
            <TransitionProvider>
                <div className="flex min-h-screen flex-col">
                {children}
                </div>
                <CookieConsent />
            </TransitionProvider>
            </body>
        </html>
        </ClerkProvider>
    )
    }