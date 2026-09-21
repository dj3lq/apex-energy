    /**
     * Single source of truth for site-wide constants used by SEO surfaces
     * (sitemap, robots, structured data, metadata).
     *
     * The base URL is read from the environment rather than hardcoded so that
     * preview deployments, the current *.vercel.app domain, and the eventual
     * apexenergy.rs domain all produce correct absolute URLs without a code change.
     */

    function resolveBaseUrl(): string {
    // Explicitly configured — always wins.
    const configured = process.env.NEXT_PUBLIC_SITE_URL
    if (configured) return configured.replace(/\/$/, '')

    // Vercel injects this for every deployment, including previews.
    const vercel = process.env.NEXT_PUBLIC_VERCEL_URL
    if (vercel) return `https://${vercel}`

    return 'http://localhost:3000'
    }

    export const SITE_URL = resolveBaseUrl()

    export const COMPANY = {
    legalName:   'APEX energy DOO',
    name:        'APEX Energy',
    // NOTE: verify against the APR registry entry before launch.
    street:      'Камењар 3/1',
    city:        'Novi Sad',
    postalCode:  '21000',
    countryCode: 'RS',
    phone:       '+381648710990',
    email:       'office@apexenergy.rs',
    // Approximate coordinates for Novi Sad. Replace with the exact office
    // location once confirmed — Google treats precise geo as a quality signal.
    latitude:    45.2671,
    longitude:   19.8335,
    foundingYear: '2024',
    } as const

    /** Opening hours in schema.org format. */
    export const OPENING_HOURS = [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { days: ['Saturday'], opens: '10:00', closes: '14:00' },
    ] as const