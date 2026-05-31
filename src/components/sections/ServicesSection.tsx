    'use client'

    import { motion } from 'framer-motion'
    import { useScrollReveal } from '@/hooks/useScrollReveal'
    import { fadeUp, staggerContainer, staggerFast, lineDraw } from '@/lib/motion'

    const services = [
    {
        num: '01',
        title: 'Upravljanje projektom i nadzor izgradnje',
        description: 'Kompletan paket upravljanja projektom od početne ideje do završetka, sa fokusom na rokove, budžete i kvalitet. Nadzor izvođenja radova, koordinacija disciplinama i IPR kontrola.',
        tag: 'Project Management',
    },
    {
        num: '02',
        title: 'Tehničko savetovanje za građevinske projekte',
        description: 'Detaljno tehničko savetovanje prilikom pripreme projektne dokumentacije, revizije nacrta i izbora materijala. Optimizacija tehničkih rešenja i usaglašavanje sa važećim propisima.',
        tag: 'Engineering',
    },
    {
        num: '03',
        title: 'Energetska efikasnost i sertifikacija zgrada',
        description: 'Analize potrošnje energije, identifikacija mogućnosti poboljšanja i priprema za sertifikacije EPC/ISO 50001. Smanjenje operativnih troškova uz poštovanje lokalnih standarda.',
        tag: 'Energy',
    },
    {
        num: '04',
        title: 'BIM i digitalizacija projektne dokumentacije',
        description: 'Implementacija i upravljanje BIM modelom za efikasnije planiranje, simulacije i kolaboraciju. Konverzija dokumenata, koordinacija modela i izrada tehničke dokumentacije.',
        tag: 'Digital',
    },
    {
        num: '05',
        title: 'Procena rizika i bezbednost na radu',
        description: 'Identifikacija i procena rizika u projektnom i operativnom okruženju. Izrada planova zaštite na radu i priprema dokumenata za inspekcije i usklađenost sa propisima.',
        tag: 'Safety',
    },
    {
        num: '06',
        title: 'Kvalitet i usklađenost sa standardima',
        description: 'Evaluacija i implementacija sistema kvaliteta, usklađenost sa ISO 9001 i ISO 14001. Interni auditni servisi, izrada dokumentacije i profesionalni nadzor usklađenosti.',
        tag: 'Quality',
    },
    ]

    export default function ServicesSection() {
    const { ref: headRef, controls: headCtrl } = useScrollReveal()
    const { ref: gridRef, controls: gridCtrl } = useScrollReveal(0.05)

    return (
        <section id="services" aria-labelledby="services-heading" className="relative py-32 bg-[#0A0A0A]">
        {/* Subtle grid bg */}
        <div aria-hidden="true" className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(201,151,44,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,151,44,0.03) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
        }} />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-10">

            {/* Header */}
            <motion.div ref={headRef} initial="hidden" animate={headCtrl} variants={staggerContainer} className="mb-20">
            <motion.div variants={lineDraw} className="h-px w-12 mb-5 origin-left" style={{ background: '#C9972C' }} />
            <motion.span variants={fadeUp} style={{ color: '#C9972C', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", display: 'block', marginBottom: '1.25rem' }}>
                Usluge i proizvodi
            </motion.span>
            <motion.h2
                id="services-heading"
                variants={fadeUp}
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', lineHeight: 1.08, fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', maxWidth: '600px' }}
            >
                Šta možemo da uradimo za vas
            </motion.h2>
            </motion.div>

            {/* Services grid */}
            <motion.div
            ref={gridRef}
            initial="hidden"
            animate={gridCtrl}
            variants={staggerFast}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: 'rgba(201,151,44,0.06)', border: '1px solid rgba(201,151,44,0.06)' }}
            >
            {services.map((s) => (
                <motion.article
                key={s.num}
                variants={fadeUp}
                className="group relative flex flex-col gap-6 p-8 cursor-default overflow-hidden"
                style={{ background: '#0A0A0A', transition: 'background 0.4s ease' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#0F0F0F'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#0A0A0A'}
                >
                {/* Gold corner hover accent */}
                <div className="absolute top-0 left-0 w-0 h-px transition-all duration-500 group-hover:w-full" style={{ background: 'linear-gradient(to right, #C9972C, transparent)' }} />

                {/* Number + tag row */}
                <div className="flex items-center justify-between">
                    <span style={{ color: '#333333', fontSize: '0.7rem', fontWeight: 500, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
                    {s.num}
                    </span>
                    <span style={{
                    color: '#C9972C',
                    fontSize: '0.55rem',
                    fontWeight: 500,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontFamily: "'Outfit', sans-serif",
                    padding: '3px 8px',
                    border: '1px solid rgba(201,151,44,0.2)',
                    borderRadius: '1px',
                    }}>
                    {s.tag}
                    </span>
                </div>

                {/* Title */}
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: '1.2rem', lineHeight: 1.3 }}>
                    {s.title}
                </h3>

                {/* Description */}
                <p style={{ color: '#555555', fontSize: '0.875rem', lineHeight: 1.75, fontFamily: "'Outfit', sans-serif", fontWeight: 300, flex: 1 }}>
                    {s.description}
                </p>

                {/* Bottom link */}
                <a href="#contact"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#444444', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", transition: 'color 0.25s ease', marginTop: 'auto' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9972C'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#444444'}
                    aria-label={`Saznajte više: ${s.title}`}
                >
                    Saznajte više
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </a>
                </motion.article>
            ))}
            </motion.div>
        </div>
        </section>
    )
    }