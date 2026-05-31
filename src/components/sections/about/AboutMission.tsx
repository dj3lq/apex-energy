    'use client'

    import { motion } from 'framer-motion'
    import { useScrollReveal } from '@/hooks/useScrollReveal'
    import { fadeUp, staggerContainer, lineDraw } from '@/lib/motion'

    const values = [
    { num: '01', title: 'Integritet',        body: 'Svaki savet koji damo zasnovan je na činjenicama i tehničkim standardima. Nikada ne dajemo preporuke koje nisu u interesu klijenta.' },
    { num: '02', title: 'Transparentnost',   body: 'Jasni planovi, precizni budžeti, realni rokovi. Klijent uvek zna gde se projekat nalazi i šta sledeće dolazi.' },
    { num: '03', title: 'Preciznost',        body: 'Detalji čine razliku između projekta koji funkcioniše i onog koji stvara probleme. Svaki korak prolazi kroz temeljnu tehničku provjeru.' },
    { num: '04', title: 'Posvećenost',       body: 'Ne završavamo posao na papiru. Pratimo projekat do kraja i osiguravamo da implementacija odgovara tehničkim specifikacijama.' },
    ]

    export default function AboutMission() {
    const { ref: headRef, controls: headCtrl } = useScrollReveal(0.1)
    const { ref: gridRef, controls: gridCtrl } = useScrollReveal(0.05)

    return (
        <section aria-labelledby="mission-heading" style={{ padding: '8rem 0', background: '#0A0A0A', position: 'relative' }}>
        {/* Background grid */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.35, backgroundImage: `linear-gradient(rgba(201,151,44,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,151,44,0.04) 1px, transparent 1px)`, backgroundSize: '80px 80px' }}/>

        <style>{`
            .mission-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1px;
            background: rgba(201,151,44,0.07);
            border: 1px solid rgba(201,151,44,0.07);
            }
            @media (min-width: 768px) {
            .mission-grid { grid-template-columns: 1fr 1fr; }
            }
        `}</style>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem' }}>

            {/* Header */}
            <motion.div ref={headRef} initial="hidden" animate={headCtrl} variants={staggerContainer} style={{ marginBottom: '5rem', maxWidth: '700px' }}>
            <motion.div variants={lineDraw} style={{ height: '1px', width: '48px', background: '#C9972C', marginBottom: '1.5rem', transformOrigin: 'left' }}/>
            <motion.span variants={fadeUp} style={{ color: '#C9972C', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", display: 'block', marginBottom: '1.5rem' }}>
                Misija i vrednosti
            </motion.span>
            <motion.h2 id="mission-heading" variants={fadeUp} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Šta nas pokreće svakog dana
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color: '#666666', fontSize: '1rem', lineHeight: 1.8, fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                Naša misija je da postanemo prvi izbor za organizacije koje žele da unaprede tehničke procese uz merljive, dugoročne rezultate.
            </motion.p>
            </motion.div>

            {/* Values grid */}
            <motion.div ref={gridRef} initial="hidden" animate={gridCtrl} variants={staggerContainer} className="mission-grid">
            {values.map((v) => (
                <motion.div key={v.num} variants={fadeUp}
                style={{ background: '#0A0A0A', padding: '3rem', position: 'relative', transition: 'background 0.3s ease', cursor: 'default' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#0D0D0D'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#0A0A0A'}
                >
                {/* Top accent line on hover */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #C9972C, transparent)', opacity: 0, transition: 'opacity 0.3s' }}
                    className="value-accent"/>
                <div style={{ color: '#1A1A1A', fontSize: '3rem', fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, lineHeight: 1, marginBottom: '1.5rem', userSelect: 'none' }}>
                    {v.num}
                </div>
                <div style={{ height: '1px', width: '32px', background: '#C9972C', marginBottom: '1.25rem' }}/>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: '1.3rem', marginBottom: '1rem' }}>
                    {v.title}
                </h3>
                <p style={{ color: '#555555', fontSize: '0.875rem', lineHeight: 1.8, fontFamily: "'Outfit', sans-serif", fontWeight: 300, margin: 0 }}>
                    {v.body}
                </p>
                </motion.div>
            ))}
            </motion.div>
        </div>
        </section>
    )
    }