    'use client'

    import { motion } from 'framer-motion'
    import { useScrollReveal } from '@/hooks/useScrollReveal'
    import { fadeUp, slideRight, staggerContainer, lineDraw } from '@/lib/motion'

    export default function AboutStory() {
    const { ref: leftRef,  controls: leftCtrl  } = useScrollReveal(0.1)
    const { ref: rightRef, controls: rightCtrl } = useScrollReveal(0.1)

    return (
        <section aria-labelledby="story-heading" style={{ padding: '8rem 0', background: '#0D0D0D', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,151,44,0.15), transparent)' }} aria-hidden="true"/>

        <style>{`
            .story-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 5rem;
            align-items: center;
            }
            @media (min-width: 1024px) {
            .story-grid { grid-template-columns: 1fr 1fr; gap: 8rem; }
            }
        `}</style>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem' }}>
            <div className="story-grid">

            {/* Left — large editorial number + statement */}
            <motion.div ref={leftRef} initial="hidden" animate={leftCtrl} variants={staggerContainer}>
                <motion.div variants={lineDraw} style={{ height: '1px', width: '48px', background: '#C9972C', marginBottom: '1.5rem', transformOrigin: 'left' }}/>
                <motion.span variants={fadeUp} style={{ color: '#C9972C', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", display: 'block', marginBottom: '1.5rem' }}>
                Naša priča
                </motion.span>
                <motion.h2 id="story-heading" variants={fadeUp} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
                Od ideje do realizacije — svaki put
                </motion.h2>
                <motion.div variants={fadeUp} style={{ height: '1px', width: '100%', background: 'rgba(201,151,44,0.08)', marginBottom: '2rem' }}/>

                {/* Large stat */}
                <motion.div variants={fadeUp} style={{ display: 'flex', gap: '3rem', marginBottom: '2.5rem' }}>
                {[['10+', 'Godina iskustva'], ['50+', 'Završenih projekata'], ['100%', 'Posvećenost']].map(([val, lbl]) => (
                    <div key={lbl}>
                    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', background: 'linear-gradient(135deg, #B8860B 0%, #E8C44A 50%, #C9972C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>
                        {val}
                    </div>
                    <div style={{ color: '#444444', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", marginTop: '0.4rem' }}>
                        {lbl}
                    </div>
                    </div>
                ))}
                </motion.div>
            </motion.div>

            {/* Right — story text */}
            <motion.div ref={rightRef} initial="hidden" animate={rightCtrl} variants={slideRight} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                'APEX energy DOO je novoosnovano društvo sa ograničenom odgovornošću, smešteno u Novom Sadu. Od prvog dana naš cilj je jasan — biti pouzdan inženjerski partner za preduzeća koja žele da unaprede tehničke procese i ostvare merljive poslovne rezultate.',
                'Bavimo se inženjerskim delatnostima i tehničkim savetovanjem (delatnost 7112), sa posebnim fokusom na energetsku efikasnost, BIM digitalizaciju, upravljanje projektima i procenu rizika. Svaki projekat tretiramo kao partnerstvo, ne kao transakciju.',
                'Naš tim čine iskusni inženjeri koji su prošli kroz realne izazove u industriji. Donose tehničku preciznost, ali i poslovnu perspektivu — razumeju da svako inženjersko rešenje mora da ima smisla i u budžetu i u rokovima.',
                ].map((p, i) => (
                <p key={i} style={{ color: i === 0 ? '#888888' : '#555555', fontSize: i === 0 ? '1.05rem' : '0.95rem', lineHeight: 1.85, fontFamily: "'Outfit', sans-serif", fontWeight: 300, margin: 0 }}>
                    {p}
                </p>
                ))}
            </motion.div>
            </div>
        </div>
        </section>
    )
    }