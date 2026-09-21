    import type { Metadata } from 'next'
    import PageHero     from '@/components/layout/PageHero'
    import AboutStory   from '@/components/sections/about/AboutStory'
    import AboutMission from '@/components/sections/about/AboutMission'
    import AboutWhy     from '@/components/sections/about/AboutWhy'

    export const metadata: Metadata = {
    title: 'O nama — APEX Energy',
    description: 'APEX energy DOO — inženjersko savetovanje i tehnička podrška iz Novog Sada, posvećeni tehničkoj izvrsnosti i merljivim rezultatima.',
    }

    export default function AboutPage() {
    return (
        <>
        <PageHero
            label="O nama"
            title="Inženjerstvo koje"
            titleGold="gradi budućnost"
            subtitle="Inženjersko savetovanje iz Novog Sada, posvećeno tehničkoj izvrsnosti, transparentnosti i merljivim rezultatima."
        />
        <AboutStory />
        <AboutMission />
        <AboutWhy />
        </>
    )
    }