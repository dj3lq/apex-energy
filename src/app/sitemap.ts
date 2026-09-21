    import type { MetadataRoute } from 'next'
    import { SITE_URL } from '@/lib/site'
    import { services } from '@/lib/services-data'

    /**
     * Generated at build time and served at /sitemap.xml by Next.js.
     *
     * Service detail pages are derived from services-data.ts rather than listed
     * by hand, so adding a service to that file automatically adds it here —
     * no second place to forget to update.
     */
    export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${SITE_URL}/`,         lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
        { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${SITE_URL}/about`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.8 },
        { url: `${SITE_URL}/contact`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.8 },
        { url: `${SITE_URL}/privacy`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    ]

    const serviceRoutes: MetadataRoute.Sitemap = services.map(s => ({
        url: `${SITE_URL}/services/${s.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    return [...staticRoutes, ...serviceRoutes]
    }