    import type { Metadata } from 'next'
    import { notFound } from 'next/navigation'
    import { services, getService } from '@/lib/services-data'
    import ServiceDetail from '@/components/sections/services/ServiceDetail'
    import PageHero from '@/components/layout/PageHero'

    interface Props {
    params: Promise<{ slug: string }>
    }

    export async function generateStaticParams() {
    return services.map(s => ({ slug: s.slug }))
    }

    export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const service = getService(slug)
    if (!service) return {}
    return {
        title: `${service.shortTitle} — APEX Energy`,
        description: service.description,
    }
    }

    export default async function ServiceDetailPage({ params }: Props) {
    const { slug } = await params
    const service = getService(slug)
    if (!service) notFound()

    return (
        <>
        <PageHero
            label={service.tag}
            title={service.shortTitle}
            titleGold={undefined}
            subtitle={service.tagline}
        />
        <ServiceDetail service={service} />
        </>
    )
    }