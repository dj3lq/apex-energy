    'use client'

    import { useRef } from 'react'
    import { TransitionLink as Link } from '@/components/layout/PageTransition'
    import { motion, useScroll, useTransform } from 'framer-motion'

    /**
     * APEX Energy — Hero Section (Redesign)
     *
     * Design direction: premium energy/infrastructure editorial
     * - Left-aligned layout (not centered)
     * - Oversized "APEX" background word mark
     * - Vertical rotated label on right edge
     * - Word-by-word headline reveal
     * - Stats strip along bottom
     * - Subtle animated gradient mesh background
     */

    const WORDS_LINE1 = ['Energija', 'koja']
    const WORDS_LINE2 = ['gradi', 'sutrašnjicu']

    export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollY } = useScroll()
    const contentY = useTransform(scrollY, [0, 700], [0, -100])
    const contentO = useTransform(scrollY, [0, 500], [1, 0])

    return (
        <section
        ref={containerRef}
        id="hero"
        aria-label="APEX Energy — Uvod"
        style={{
            position: 'relative',
            minHeight: '100vh',
            background: '#0A0A0A',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
        }}
        >
        {/* ── Background layers ── */}

        {/* Radial gradient mesh */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <div style={{
            position: 'absolute', inset: 0,
            background: `
                radial-gradient(ellipse 80% 60% at 20% 50%, rgba(201,151,44,0.055) 0%, transparent 60%),
                radial-gradient(ellipse 50% 80% at 85% 20%, rgba(201,151,44,0.03) 0%, transparent 55%),
                radial-gradient(ellipse 60% 40% at 60% 90%, rgba(201,151,44,0.025) 0%, transparent 50%)
            `,
            }} />

            {/* Subtle grid */}
            <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
                linear-gradient(rgba(201,151,44,0.025) 1px, transparent 1px),
                linear-gradient(90deg, rgba(201,151,44,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)',
            }} />

            {/* Bottom fade */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(to top, #0A0A0A 0%, transparent 100%)' }} />
            {/* Top fade */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '20%', background: 'linear-gradient(to bottom, #0A0A0A 0%, transparent 100%)' }} />
        </div>

        {/* ── Giant APEX watermark ── */}
        <div aria-hidden="true" style={{
            position: 'absolute',
            right: '-2%', top: '50%',
            transform: 'translateY(-52%)',
            zIndex: 1,
            userSelect: 'none', pointerEvents: 'none',
            lineHeight: 1,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 700,
            fontSize: 'clamp(18vw, 24vw, 28vw)',
            letterSpacing: '-0.04em',
            WebkitTextStroke: '1px rgba(201,151,44,0.07)',
            color: 'transparent',
            whiteSpace: 'nowrap',
        }}>
            APEX
        </div>

        {/* ── Vertical right-edge label ── */}
        <div aria-hidden="true" style={{
            position: 'absolute',
            right: '2rem', top: '50%',
            transform: 'translateY(-50%) rotate(90deg)',
            transformOrigin: 'center',
            zIndex: 10,
            display: 'flex', alignItems: 'center', gap: '1rem',
        }}>
            <div style={{ width: '32px', height: '1px', background: 'rgba(201,151,44,0.3)' }} />
            <span style={{ color: '#2A2A2A', fontSize: '0.55rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", whiteSpace: 'nowrap' }}>
            Novi Sad · Srbija · Est. 2024
            </span>
            <div style={{ width: '32px', height: '1px', background: 'rgba(201,151,44,0.3)' }} />
        </div>

        {/* ── Main content ── */}
        <motion.div
            style={{ y: contentY, opacity: contentO, position: 'relative', zIndex: 10 }}
        >
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem', paddingBottom: '5rem' }}>

            {/* Eyebrow */}
            <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}
            >
                <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, transparent, #C9972C)' }} />
                <span style={{ color: '#C9972C', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>
                Inženjersko savetovanje · Energetika
                </span>
            </motion.div>

            {/* Headline — word by word reveal */}
            <h1 style={{ margin: 0, marginBottom: '2rem' }}>
                <div style={{ overflow: 'hidden', marginBottom: '0.1em' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em' }}>
                    {WORDS_LINE1.map((word, i) => (
                    <motion.span
                        key={word}
                        initial={{ y: '110%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.35 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                        display: 'inline-block',
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontWeight: 600,
                        color: '#F5F0E8',
                        fontSize: 'clamp(3.5rem, 8.5vw, 7.5rem)',
                        lineHeight: 0.95,
                        letterSpacing: '-0.02em',
                        }}
                    >
                        {word}
                    </motion.span>
                    ))}
                </div>
                </div>
                <div style={{ overflow: 'hidden' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em' }}>
                    {WORDS_LINE2.map((word, i) => (
                    <motion.span
                        key={word}
                        initial={{ y: '110%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                        display: 'inline-block',
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontWeight: 600,
                        fontSize: 'clamp(3.5rem, 8.5vw, 7.5rem)',
                        lineHeight: 0.95,
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(105deg, #9A6F0A 0%, #E8C44A 40%, #C9972C 60%, #E8C44A 80%, #9A6F0A 100%)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        animation: 'shimmer 4s linear infinite',
                        }}
                    >
                        {word}
                    </motion.span>
                    ))}
                </div>
                </div>
            </h1>

            {/* Sub + CTA row */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', marginBottom: '5rem' }}>

                {/* Subtext */}
                <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    color: '#555555', fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                    lineHeight: 1.8, maxWidth: '420px', fontFamily: "'Outfit', sans-serif",
                    fontWeight: 300, margin: 0,
                }}
                >
                Prvoklasno inženjersko savetovanje i tehnička podrška. Jasni rokovi, merljivi rezultati, iskusni tim iz Novog Sada.
                </motion.p>

                {/* CTAs */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}
                >
                <Link
                    href="/contact"
                    style={{
                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                    padding: '16px 40px',
                    background: 'linear-gradient(135deg, #B8860B 0%, #D4A843 50%, #C9972C 100%)',
                    color: '#0A0A0A', fontSize: '0.68rem', fontWeight: 600,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    fontFamily: "'Outfit', sans-serif",
                    borderRadius: '2px', textDecoration: 'none',
                    transition: 'box-shadow 0.3s ease, opacity 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(201,151,44,0.35)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}
                >
                    Zakažite termin
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>

                <Link
                    href="/services"
                    style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    color: '#555555', fontSize: '0.68rem', fontWeight: 500,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    fontFamily: "'Outfit', sans-serif", textDecoration: 'none',
                    transition: 'color 0.25s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9972C'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#555555'}
                >
                    Naše usluge
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                </motion.div>
            </div>

            {/* ── Stats strip ── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                display: 'flex', flexWrap: 'wrap', gap: '0',
                borderTop: '1px solid rgba(201,151,44,0.08)',
                paddingTop: '2rem',
                }}
            >
                {[
                { value: '10+',  label: 'Godina iskustva',  desc: 'U inženjeringu' },
                { value: '50+',  label: 'Projekata',        desc: 'Uspešno završenih' },
                { value: 'ISO',  label: 'Sertifikovani',    desc: '9001 · 14001 · 50001' },
                { value: '100%', label: 'Posvećenost',      desc: 'Svakom klijentu' },
                ].map((stat, i) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.25 + i * 0.08 }}
                    style={{
                    flex: '1 1 140px',
                    padding: '0 2rem 0 0',
                    borderRight: i < 3 ? '1px solid rgba(201,151,44,0.06)' : 'none',
                    marginRight: i < 3 ? '2rem' : 0,
                    }}
                >
                    <div style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 600,
                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                    lineHeight: 1,
                    marginBottom: '0.4rem',
                    background: 'linear-gradient(135deg, #B8860B 0%, #E8C44A 50%, #C9972C 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    }}>
                    {stat.value}
                    </div>
                    <div style={{ color: '#888888', fontSize: '0.7rem', fontFamily: "'Outfit', sans-serif", fontWeight: 400, marginBottom: '0.2rem' }}>
                    {stat.label}
                    </div>
                    <div style={{ color: '#333333', fontSize: '0.6rem', fontFamily: "'Outfit', sans-serif", fontWeight: 300, letterSpacing: '0.08em' }}>
                    {stat.desc}
                    </div>
                </motion.div>
                ))}
            </motion.div>
            </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            aria-hidden="true"
            style={{
            position: 'absolute', bottom: '2.5rem', right: '2.5rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
            zIndex: 10,
            }}
        >
            <span style={{ color: '#222222', fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", writingMode: 'vertical-rl' }}>
            Scroll
            </span>
            <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, #C9972C, transparent)', animation: 'scrollPulse 2s ease-in-out infinite' }} />
        </motion.div>

        <style>{`
            @keyframes shimmer {
            0%   { background-position: -200% center; }
            100% { background-position:  200% center; }
            }
            @keyframes scrollPulse {
            0%, 100% { opacity: 0.3; transform: scaleY(1); }
            50%       { opacity: 1;   transform: scaleY(1.1); }
            }
        `}</style>
        </section>
    )
    }