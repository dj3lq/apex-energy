    import type { Metadata } from 'next'
    import PageHero from '@/components/layout/PageHero'
    import ServicesOverview from '@/components/sections/services/ServicesOverview'

    export const metadata: Metadata = {
    title: 'Usluge — APEX Energy',
    description: 'Inženjersko savetovanje, BIM, energetska efikasnost, upravljanje projektima, bezbednost na radu i sistemi kvaliteta za preduzeća u Srbiji.',
    }

    export default function ServicesPage() {
    return (
        <>
        <PageHero
            label="Usluge"
            title="Sve što vam treba"
            titleGold="na jednom mestu"
            subtitle="Šest specijalizovanih inženjerskih usluga — od upravljanja projektom do ISO sertifikacije — prilagođenih potrebama vašeg poslovanja."
        />
        <ServicesOverview />
        </>
    )
    }