    import type { Metadata } from 'next'
    import PageHero from '@/components/layout/PageHero'
    import AboutStory from '@/components/sections/about/AboutStory'
    import AboutMission from '@/components/sections/about/AboutMission'
    import AboutTeam from '@/components/sections/about/AboutTeam'
    import AboutWhy from '@/components/sections/about/AboutWhy'

    export const metadata: Metadata = {
    title: 'O nama — APEX Energy',
    description: 'Upoznajte APEX energy DOO — tim iskusnih inženjera i savetnika iz Novog Sada posvećenih tehničkoj izvrsnosti i merljivim rezultatima.',
    }

    export default function AboutPage() {
    return (
        <>
        <PageHero
            label="O nama"
            title="Inženjerstvo koje"
            titleGold="gradi budućnost"
            subtitle="Tim iskusnih inženjera i savetnika iz Novog Sada posvećenih tehničkoj izvrsnosti, transparentnosti i merljivim rezultatima."
        />
        <AboutStory />
        <AboutMission />
        <AboutTeam />
        <AboutWhy />
        </>
    )
    }