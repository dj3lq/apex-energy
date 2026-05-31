    import type { Metadata } from 'next'
    import PageHero from '@/components/layout/PageHero'
    import ContactPageContent from '@/components/sections/contact/ContactPageContent'

    export const metadata: Metadata = {
    title: 'Kontakt — APEX Energy',
    description: 'Kontaktirajte APEX Energy tim za inženjersko savetovanje i energetska rešenja u Novom Sadu, Srbija.',
    }

    export default function ContactPage() {
    return (
        <>
        <PageHero
            label="Kontakt"
            title="Razgovarajmo o"
            titleGold="vašem projektu"
            subtitle="Rado ćemo odgovoriti na vaša pitanja i zakazati konsultaciju. Prosečno vreme odgovora: 2 radna sata."
        />
        <ContactPageContent />
        </>
    )
    }