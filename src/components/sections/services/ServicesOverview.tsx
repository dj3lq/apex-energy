    'use client'

    import { TransitionLink as Link } from '@/components/layout/PageTransition'
    import { motion } from 'framer-motion'
    import { useScrollReveal } from '@/hooks/useScrollReveal'
    import { fadeUp, staggerContainer } from '@/lib/motion'
    import { services } from '@/lib/services-data'

    export default function ServicesOverview() {
    const { ref, controls } = useScrollReveal(0.05)

    return (
        <section aria-label="Pregled usluga" style={{ padding: '8rem 0', background: '#0A0A0A', position: 'relative' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.35, backgroundImage: `linear-gradient(rgba(201,151,44,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,151,44,0.04) 1px, transparent 1px)`, backgroundSize: '80px 80px' }}/>

        <style>{`
            .services-overview-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1px;
            background: rgba(201,151,44,0.07);
            border: 1px solid rgba(201,151,44,0.07);
            }
            @media (min-width: 768px)  { .services-overview-grid { grid-template-columns: 1fr 1fr; } }
            @media (min-width: 1200px) { .services-overview-grid { grid-template-columns: 1fr 1fr 1fr; } }
            .svc-card-inner { transition: background 0.35s ease; }
            .svc-card-inner:hover { background: #0F0F0F !important; }
            .svc-top-line { width: 0; transition: width 0.5s ease; }
            .svc-card-inner:hover .svc-top-line { width: 100%; }
            .svc-arrow { transition: transform 0.3s ease; }
            .svc-card-inner:hover .svc-arrow { transform: translateX(6px); }
        `}</style>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem' }}>
            <motion.div ref={ref} initial="hidden" animate={controls} variants={staggerContainer}>

            {/* Intro text */}
            <motion.div variants={fadeUp} style={{ marginBottom: '5rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                <p style={{ color: '#555555', fontSize: '0.9rem', lineHeight: 1.7, fontFamily: "'Outfit', sans-serif", fontWeight: 300, maxWidth: '480px' }}>
                Svaka usluga je dostupna samostalno ili kao deo integrisanog paketa. Kliknite na uslugu za detaljan opis, proces i isporuke.
                </p>
                <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#C9972C', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#E8C44A'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#C9972C'}>
                Zatražite ponudu →
                </a>
            </motion.div>

            {/* Grid */}
            <motion.div variants={staggerContainer} className="services-overview-grid">
                {services.map((s, i) => (
                <motion.div key={s.slug} variants={fadeUp}>
                    <Link href={`/services/${s.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <div className="svc-card-inner" style={{ background: '#0A0A0A', padding: '3rem 2.5rem', position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {/* Top accent line */}
                        <div className="svc-top-line" style={{ position: 'absolute', top: 0, left: 0, height: '1.5px', background: 'linear-gradient(90deg, #C9972C, transparent)' }}/>

                        {/* Number + tag */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ color: '#222222', fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>
                            0{i + 1}
                        </span>
                        <span style={{ color: '#C9972C', fontSize: '0.55rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", padding: '3px 8px', border: '1px solid rgba(201,151,44,0.2)', borderRadius: '1px' }}>
                            {s.tag}
                        </span>
                        </div>

                        {/* Title */}
                        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: '1.2rem', lineHeight: 1.3, margin: 0 }}>
                        {s.title}
                        </h2>

                        {/* Tagline */}
                        <p style={{ color: '#C9972C', fontSize: '0.8rem', fontFamily: "'Outfit', sans-serif", fontStyle: 'italic', fontWeight: 300, margin: 0 }}>
                        {s.tagline}
                        </p>

                        {/* Description */}
                        <p style={{ color: '#555555', fontSize: '0.875rem', lineHeight: 1.75, fontFamily: "'Outfit', sans-serif", fontWeight: 300, flex: 1, margin: 0 }}>
                        {s.description}
                        </p>

                        {/* Deliverables count + link */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(201,151,44,0.06)' }}>
                        <span style={{ color: '#333333', fontSize: '0.7rem', fontFamily: "'Outfit', sans-serif" }}>
                            {s.deliverables.length} isporuka
                        </span>
                        <span className="svc-arrow" style={{ color: '#C9972C', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.1em', fontFamily: "'Outfit', sans-serif", display: 'flex', alignItems: 'center', gap: '6px' }}>
                            Detalji →
                        </span>
                        </div>
                    </div>
                    </Link>
                </motion.div>
                ))}
            </motion.div>

            {/* Bottom CTA banner */}
            <motion.div variants={fadeUp} style={{ marginTop: '5rem', padding: '4rem', background: 'linear-gradient(135deg, #111111 0%, #0D0D0D 100%)', border: '1px solid rgba(201,151,44,0.10)', borderRadius: '2px', textAlign: 'center' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Niste sigurni koja usluga vam treba?
                </h3>
                <p style={{ color: '#555555', fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif", fontWeight: 300, marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
                Zakažite besplatnu uvodnu konsultaciju — razgovaraćemo o vašem projektu i preporučiti optimalan pristup.
                </p>
                <a href="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 40px', background: 'linear-gradient(135deg, #B8860B 0%, #D4A843 50%, #C9972C 100%)', color: '#0A0A0A', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", borderRadius: '2px', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.88'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}>
                Besplatna konsultacija
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
            </motion.div>
            </motion.div>
        </div>
        </section>
    )
    }