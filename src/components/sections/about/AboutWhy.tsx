    'use client'

    import { TransitionLink } from '@/components/layout/PageTransition'
    import { motion } from 'framer-motion'
    import { useScrollReveal } from '@/hooks/useScrollReveal'
    import { fadeUp, staggerContainer } from '@/lib/motion'

    const reasons = [
    { icon: '⬡', title: 'Lokalna ekspertiza',   body: 'Poznajemo srpske propise, standarde i poslovnu kulturu. Nema gubitka vremena na prilagođavanje stranim praksama.' },
    { icon: '⬡', title: 'Merljivi rezultati',   body: 'Svaki projekat počinje definisanjem KPI-jeva. Na kraju možete tačno izmeriti šta smo zajedno postigli.' },
    { icon: '⬡', title: 'End-to-end podrška',   body: 'Od početne analize do finalnog izveštaja — jedinstven tim koji prati ceo proces bez predaje štafete.' },
    { icon: '⬡', title: 'Bez skrivenih troškova', body: 'Transparentan ugovorni okvir, jasni budžeti i nikakva iznenađenja. Znate šta plaćate pre nego što počnemo.' },
    ]

    export default function AboutWhy() {
    const { ref, controls } = useScrollReveal(0.05)

    return (
        <section aria-labelledby="why-heading" style={{ padding: '8rem 0', background: '#0A0A0A', position: 'relative' }}>

        <style>{`
            .why-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
            }
            @media (min-width: 768px) { .why-grid { grid-template-columns: 1fr 1fr; } }
        `}</style>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem' }}>
            <motion.div ref={ref} initial="hidden" animate={controls} variants={staggerContainer}>

            {/* Header */}
            <motion.div variants={fadeUp} style={{ marginBottom: '5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '600px' }}>
                <span style={{ color: '#C9972C', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>
                Zašto APEX Energy
                </span>
                <h2 id="why-heading" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.1, margin: 0 }}>
                Šta nas razlikuje od konkurencije
                </h2>
            </motion.div>

            <div className="why-grid">
                {reasons.map((r, i) => (
                <motion.div key={r.title} variants={fadeUp}
                    style={{ padding: '2.5rem', border: '1px solid rgba(201,151,44,0.08)', borderRadius: '2px', background: '#0D0D0D', transition: 'border-color 0.3s, background 0.3s', position: 'relative', overflow: 'hidden' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(201,151,44,0.25)'; el.style.background = '#111111' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(201,151,44,0.08)'; el.style.background = '#0D0D0D' }}
                >
                    {/* Corner number */}
                    <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: '#1A1A1A', fontSize: '2rem', fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, userSelect: 'none' }}>
                    0{i+1}
                    </div>
                    <div style={{ height: '1px', width: '32px', background: '#C9972C', marginBottom: '1.5rem' }}/>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: '1.25rem', marginBottom: '0.875rem' }}>
                    {r.title}
                    </h3>
                    <p style={{ color: '#555555', fontSize: '0.875rem', lineHeight: 1.8, fontFamily: "'Outfit', sans-serif", fontWeight: 300, margin: 0 }}>
                    {r.body}
                    </p>
                </motion.div>
                ))}
            </div>

            {/* CTA */}
            <motion.div variants={fadeUp} style={{ marginTop: '5rem', padding: '4rem', background: '#111111', border: '1px solid rgba(201,151,44,0.10)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: '0.75rem' }}>
                    Spremni ste da krenete?
                </h3>
                <p style={{ color: '#555555', fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif", fontWeight: 300, margin: 0 }}>
                    Zakažite besplatnu uvodnu konsultaciju i razgovarajmo o vašem projektu.
                </p>
                </div>
                <TransitionLink href="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 36px', background: 'linear-gradient(135deg, #B8860B 0%, #D4A843 50%, #C9972C 100%)', color: '#0A0A0A', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", borderRadius: '2px', textDecoration: 'none', transition: 'opacity 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.88'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
                >
                Kontaktirajte nas
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </TransitionLink>
            </motion.div>
            </motion.div>
        </div>
        </section>
    )
    }