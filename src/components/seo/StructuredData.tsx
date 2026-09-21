    import { SITE_URL, COMPANY, OPENING_HOURS } from '@/lib/site'
    import { services } from '@/lib/services-data'

    /**
     * JSON-LD structured data.
     *
     * Rendered as a plain <script> in a server component — no client JS, no
     * hydration cost. Google reads this to understand that APEX is a local
     * business in Novi Sad offering specific services, which is what makes
     * "inženjersko savetovanje Novi Sad" style queries resolvable.
     *
     * Only claims that are actually true and verifiable belong here. Marking up
     * things the page doesn't show (fake reviews, ratings, prices) is a manual
     * action risk, not a shortcut.
     */

    interface Props {
    /** Adds a BreadcrumbList when the page sits below the root. */
    breadcrumbs?: { name: string; path: string }[]
    }

    export default function StructuredData({ breadcrumbs }: Props) {
    const organization = {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#organization`,
        name: COMPANY.name,
        legalName: COMPANY.legalName,
        url: SITE_URL,
        email: COMPANY.email,
        telephone: COMPANY.phone,
        foundingDate: COMPANY.foundingYear,
        image: `${SITE_URL}/apex-logo.JPG`,
        logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/apex-logo.JPG`,
        },
        address: {
        '@type': 'PostalAddress',
        streetAddress:   COMPANY.street,
        addressLocality: COMPANY.city,
        postalCode:      COMPANY.postalCode,
        addressCountry:  COMPANY.countryCode,
        },
        geo: {
        '@type': 'GeoCoordinates',
        latitude:  COMPANY.latitude,
        longitude: COMPANY.longitude,
        },
        openingHoursSpecification: OPENING_HOURS.map(h => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days,
        opens:  h.opens,
        closes: h.closes,
        })),
        areaServed: {
        '@type': 'Country',
        name: 'Srbija',
        },
        knowsLanguage: ['sr-RS', 'en'],
        hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Inženjerske usluge',
        itemListElement: services.map(s => ({
            '@type': 'Offer',
            itemOffered: {
            '@type': 'Service',
            name: s.shortTitle,
            description: s.description,
            url: `${SITE_URL}/services/${s.slug}`,
            },
        })),
        },
    }

    const website = {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: COMPANY.name,
        inLanguage: 'sr-RS',
        publisher: { '@id': `${SITE_URL}/#organization` },
    }

    const graph: object[] = [organization, website]

    if (breadcrumbs?.length) {
        graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Početna', item: SITE_URL },
            ...breadcrumbs.map((b, i) => ({
            '@type': 'ListItem',
            position: i + 2,
            name: b.name,
            item: `${SITE_URL}${b.path}`,
            })),
        ],
        })
    }

    const jsonLd = { '@context': 'https://schema.org', '@graph': graph }

    return (
        <script
        type="application/ld+json"
        // JSON.stringify output is not HTML — escape the one sequence that
        // could otherwise close the script tag early.
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
        />
    )
    }