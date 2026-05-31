    'use client'

    import { TransitionLink as Link } from '@/components/layout/PageTransition'
    import { motion } from 'framer-motion'
    import { useScrollReveal } from '@/hooks/useScrollReveal'
    import { fadeUp, slideLeft, slideRight, staggerContainer, lineDraw } from '@/lib/motion'
    import type { Service } from '@/lib/services-data'

    export default function ServiceDetail({ service }: { service: Service }) {
    const { ref: descRef,  controls: descCtrl  } = useScrollReveal(0.1)
    const { ref: delRef,   controls: delCtrl   } = useScrollReveal(0.05)
    const { ref: procRef,  controls: procCtrl  } = useScrollReveal(0.05)

    return (
        <>
        {/* ── Description ── */}
        <section style={{ padding: '7rem 0', background: '#0D0D0D' }}>
            <style>{`
            .detail-desc-grid {
                display: grid; grid-template-columns: 1fr; gap: 5rem; align-items: start;
            }
            @media (min-width: 1024px) { .detail-desc-grid { grid-template-columns: 1fr 1fr; gap: 8rem; } }
            `}</style>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem' }}>
            <motion.div ref={descRef} initial="hidden" animate={descCtrl} variants={staggerContainer}>
                <div className="detail-desc-grid">
                <motion.div variants={slideLeft}>
                    <motion.div variants={lineDraw} style={{ height: '1px', width: '48px', background: '#C9972C', marginBottom: '1.5rem', transformOrigin: 'left' }}/>
                    <motion.h2 variants={fadeUp} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                    {service.title}
                    </motion.h2>
                    <motion.p variants={fadeUp} style={{ color: '#C9972C', fontFamily: "'Outfit', sans-serif", fontStyle: 'italic', fontWeight: 300, fontSize: '1rem', marginBottom: '2rem' }}>
                    {service.tagline}
                    </motion.p>
                </motion.div>

                <motion.div variants={slideRight} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {service.longDesc.map((p, i) => (
                    <p key={i} style={{ color: i === 0 ? '#888888' : '#555555', fontSize: i === 0 ? '1.05rem' : '0.95rem', lineHeight: 1.85, fontFamily: "'Outfit', sans-serif", fontWeight: 300, margin: 0 }}>
                        {p}
                    </p>
                    ))}
                </motion.div>
                </div>
            </motion.div>
            </div>
        </section>

        {/* ── Deliverables ── */}
        <section style={{ padding: '7rem 0', background: '#0A0A0A', position: 'relative' }}>
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.3, backgroundImage: `linear-gradient(rgba(201,151,44,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,151,44,0.04) 1px, transparent 1px)`, backgroundSize: '80px 80px' }}/>
            <style>{`
            .del-grid {
                display: grid; grid-template-columns: 1fr; gap: 1px;
                background: rgba(201,151,44,0.07); border: 1px solid rgba(201,151,44,0.07);
            }
            @media (min-width: 640px)  { .del-grid { grid-template-columns: 1fr 1fr; } }
            @media (min-width: 1024px) { .del-grid { grid-template-columns: 1fr 1fr 1fr; } }
            `}</style>
            <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem' }}>
            <motion.div ref={delRef} initial="hidden" animate={delCtrl} variants={staggerContainer}>
                <motion.div variants={fadeUp} style={{ marginBottom: '4rem' }}>
                <span style={{ color: '#C9972C', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", display: 'block', marginBottom: '1.25rem' }}>Šta dobijate</span>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', lineHeight: 1.1, margin: 0 }}>
                    Konkretne isporuke
                </h2>
                </motion.div>
                <div className="del-grid">
                {service.deliverables.map((d, i) => (
                    <motion.div key={i} variants={fadeUp} style={{ background: '#0A0A0A', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: 'linear-gradient(to bottom, #C9972C, transparent)', opacity: 0.4 }}/>
                    <div style={{ color: '#1A1A1A', fontSize: '2rem', fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, lineHeight: 1, marginBottom: '1rem', userSelect: 'none' }}>
                        {String(i + 1).padStart(2, '0')}
                    </div>
                    <p style={{ color: '#888888', fontSize: '0.9rem', lineHeight: 1.65, fontFamily: "'Outfit', sans-serif", fontWeight: 300, margin: 0 }}>
                        {d}
                    </p>
                    </motion.div>
                ))}
                </div>
            </motion.div>
            </div>
        </section>

        {/* ── Process ── */}
        <section style={{ padding: '7rem 0', background: '#0D0D0D' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem' }}>
            <motion.div ref={procRef} initial="hidden" animate={procCtrl} variants={staggerContainer}>
                <motion.div variants={fadeUp} style={{ marginBottom: '4rem' }}>
                <span style={{ color: '#C9972C', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", display: 'block', marginBottom: '1.25rem' }}>Naš pristup</span>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', lineHeight: 1.1, margin: 0 }}>
                    Kako radimo
                </h2>
                </motion.div>

                {/* Horizontal steps */}
                <style>{`
                .proc-grid {
                    display: grid; grid-template-columns: 1fr; gap: 0;
                    border: 1px solid rgba(201,151,44,0.08);
                }
                @media (min-width: 768px) {
                    .proc-grid { grid-template-columns: repeat(${Math.min(service.process.length, 5)}, 1fr); }
                }
                .proc-step { transition: background 0.3s ease; }
                .proc-step:hover { background: #111111 !important; }
                `}</style>

                <div className="proc-grid">
                {service.process.map((p, i) => (
                    <motion.div key={i} variants={fadeUp} className="proc-step"
                    style={{ background: '#0D0D0D', padding: '2.5rem 2rem', position: 'relative', borderRight: i < service.process.length - 1 ? '1px solid rgba(201,151,44,0.06)' : 'none' }}>
                    {/* Top gold bar on hover */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1.5px', background: '#C9972C', opacity: 0, transition: 'opacity 0.3s' }} className="proc-accent"/>
                    <div style={{ color: '#1A1A1A', fontSize: '3rem', fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, lineHeight: 1, marginBottom: '1.5rem', userSelect: 'none' }}>
                        {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: '1.1rem', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                        {p.step}
                    </h3>
                    <p style={{ color: '#555555', fontSize: '0.85rem', lineHeight: 1.75, fontFamily: "'Outfit', sans-serif", fontWeight: 300, margin: 0 }}>
                        {p.desc}
                    </p>
                    </motion.div>
                ))}
                </div>

                {/* CTA */}
                <motion.div variants={fadeUp} style={{ marginTop: '5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', padding: '3.5rem 4rem', background: '#111111', border: '1px solid rgba(201,151,44,0.10)', borderRadius: '2px' }}>
                <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', marginBottom: '0.5rem' }}>
                    Zainteresovani za ovu uslugu?
                    </h3>
                    <p style={{ color: '#555555', fontSize: '0.875rem', fontFamily: "'Outfit', sans-serif", fontWeight: 300, margin: 0 }}>
                    Kontaktirajte nas za besplatnu procenu i okvirnu ponudu.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <a href="/contact"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', background: 'linear-gradient(135deg, #B8860B 0%, #D4A843 50%, #C9972C 100%)', color: '#0A0A0A', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", borderRadius: '2px', textDecoration: 'none', transition: 'opacity 0.2s', whiteSpace: 'nowrap' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.88'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}>
                    Zatražite ponudu →
                    </a>
                    <Link href="/services"
                    style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', border: '1px solid rgba(201,151,44,0.25)', color: '#888888', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", borderRadius: '2px', textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#C9972C'; el.style.borderColor = 'rgba(201,151,44,0.45)' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#888888'; el.style.borderColor = 'rgba(201,151,44,0.25)' }}>
                    ← Sve usluge
                    </Link>
                </div>
                </motion.div>
            </motion.div>
            </div>
        </section>
        </>
    )
    }