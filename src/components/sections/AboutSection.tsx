'use client'

import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { fadeUp, slideLeft, slideRight, staggerContainer, lineDraw } from '@/lib/motion'

    const values = [
    { label: 'Ekspertiza', text: 'Tim stručnjaka sa praktičnim iskustvom u projektovanju i tehničkom savetovanju' },
    { label: 'Transparentnost', text: 'Jasni rokovi, merljivi KPI-jevi i otvorena komunikacija u svakoj fazi' },
    { label: 'Održivost', text: 'Fokus na energetski efikasna rešenja i dugoročnu ekološku odgovornost' },
    { label: 'Podrška', text: 'Konkretna podrška od ideje do realizacije i posle implementacije' },
    ]

    export default function AboutSection() {
    const { ref: leftRef,  controls: leftCtrl  } = useScrollReveal()
    const { ref: rightRef, controls: rightCtrl } = useScrollReveal()
    const { ref: valRef,   controls: valCtrl   } = useScrollReveal(0.1)

    return (
        <section id="about" aria-labelledby="about-heading" className="relative py-32 bg-[#0D0D0D]">
        {/* Top gold line */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, #C9972C 40%, #C9972C 60%, transparent 100%)', opacity: 0.15 }} />

        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10">

            {/* Section label */}
            <motion.div
            ref={leftRef}
            initial="hidden"
            animate={leftCtrl}
            variants={staggerContainer}
            className="mb-20"
            >
            <motion.div variants={lineDraw} className="h-px w-12 mb-5" style={{ background: '#C9972C' }} />
            <motion.span variants={fadeUp} style={{ color: '#C9972C', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>
                O nama
            </motion.span>
            </motion.div>

            {/* Two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32 items-start mb-24">

            {/* Left: headline */}
            <motion.div
                ref={leftRef}
                initial="hidden"
                animate={leftCtrl}
                variants={slideLeft}
            >
                <h2
                id="about-heading"
                style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 600,
                    color: '#F5F0E8',
                    lineHeight: 1.08,
                    letterSpacing: '-0.01em',
                    fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                    marginBottom: '2rem',
                }}
                >
                Inženjerska ekspertiza za savremene izazove
                </h2>
                <div style={{ width: '40px', height: '1px', background: '#C9972C', marginBottom: '2rem' }} />
                <p style={{ color: '#888888', fontSize: '1.05rem', lineHeight: 1.8, fontFamily: "'Outfit', sans-serif", fontWeight: 300, maxWidth: '480px' }}>
                APEX energy DOO je firma smeštena u Novom Sadu, specijalizovana za
                inženjerske delatnosti i tehničko savetovanje. Bavimo se prilagodljivim
                rešenjima za male i srednje kompanije, energetski efikasnim projektima
                i optimizacijom procesa.
                </p>
            </motion.div>

            {/* Right: detailed text */}
            <motion.div
                ref={rightRef}
                initial="hidden"
                animate={rightCtrl}
                variants={slideRight}
                className="flex flex-col gap-6"
            >
                <p style={{ color: '#666666', fontSize: '0.95rem', lineHeight: 1.85, fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                Naš tim čine iskusni inženjeri i savetnici koji kombinuju tehničku
                preciznost sa poslovnim razmišljanjem. Klijentima pružamo jasno
                definisane planove, budžete i rokove.
                </p>
                <p style={{ color: '#666666', fontSize: '0.95rem', lineHeight: 1.85, fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                Naša misija je da postanemo prvi izbor za organizacije koje žele
                da unaprede tehničke procese uz merljive rezultate. Vrednosti kojima
                sledimo su integritet, transparentnost i stalna stručna nadogradnja.
                </p>

                {/* Stat */}
                <div className="mt-4 pt-8" style={{ borderTop: '1px solid rgba(201,151,44,0.08)' }}>
                <span style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '4rem',
                    fontWeight: 600,
                    lineHeight: 1,
                    background: 'linear-gradient(135deg, #B8860B 0%, #E8C44A 50%, #C9972C 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}>10+</span>
                <span style={{ display: 'block', color: '#555555', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", marginTop: '0.5rem' }}>
                    Godina iskustva u industriji
                </span>
                </div>
            </motion.div>
            </div>

            {/* Values grid */}
            <motion.div
            ref={valRef}
            initial="hidden"
            animate={valCtrl}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
            {values.map((v) => (
                <motion.div
                key={v.label}
                variants={fadeUp}
                className="group"
                style={{ padding: '2rem', border: '1px solid rgba(201,151,44,0.08)', borderRadius: '2px', background: '#111111', transition: 'border-color 0.3s ease, background 0.3s ease', cursor: 'default' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,151,44,0.25)'; (e.currentTarget as HTMLElement).style.background = '#141414' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,151,44,0.08)'; (e.currentTarget as HTMLElement).style.background = '#111111' }}
                >
                <div style={{ width: '20px', height: '1px', background: '#C9972C', marginBottom: '1.25rem', transition: 'width 0.3s ease' }} />
                <p style={{ color: '#C9972C', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", marginBottom: '0.75rem' }}>
                    {v.label}
                </p>
                <p style={{ color: '#666666', fontSize: '0.875rem', lineHeight: 1.7, fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                    {v.text}
                </p>
                </motion.div>
            ))}
            </motion.div>
        </div>
        </section>
    )
    }