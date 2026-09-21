    import type { MetadataRoute } from 'next'
    import { SITE_URL } from '@/lib/site'

    /**
     * Served at /robots.txt.
     *
     * Preview deployments are blocked from indexing entirely — otherwise Google
     * can index a *.vercel.app preview and compete with the real domain for the
     * same content, which splits ranking signals and is awkward to undo.
     */
    export default function robots(): MetadataRoute.Robots {
    const isProduction =
        process.env.NEXT_PUBLIC_ENV === 'production' &&
        !SITE_URL.includes('vercel.app')

    if (!isProduction) {
        return { rules: { userAgent: '*', disallow: '/' } }
    }

    return {
        rules: [
        {
            userAgent: '*',
            allow: '/',
            // Nothing user-facing lives under these; keep crawl budget on content.
            disallow: ['/api/', '/dashboard/', '/sign-in', '/sign-up'],
        },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    }
    }