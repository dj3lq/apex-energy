    'use client'

    import { useRef } from 'react'
    import { TransitionLink as Link } from '@/components/layout/PageTransition'
    import { motion, useScroll, useTransform } from 'framer-motion'

    /**
     * APEX Energy — Hero Section
     *
     * Layout: left-aligned editorial, content anchored to the bottom of the
     * viewport, oversized APEX wordmark as a background element.
     *
     * Word spacing note: the gap between headline words is set with paddingRight
     * on each word rather than `gap` on the flex parent. `em` resolves against the
     * element's own font-size, and only the words carry the clamp() font-size —
     * the parent inherits body size, so a gap in `em` there stays tiny while the
     * headline scales up.
     */

    const WORDS_LINE1 = ['Energija', 'koja']
    const WORDS_LINE2 = ['gradi', 'sutrašnjicu']

    // Shared between both headline lines so they can't drift apart.
    const HEADLINE_BASE: React.CSSProperties = {
    display: 'inline-block',
    paddingRight: '0.22em',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontWeight: 600,
    fontSize: 'clamp(3rem, 10vw, 7.5rem)',
    lineHeight: 0.95,
    letterSpacing: '-0.02em',
    }

    export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollY } = useScroll()
    const contentY = useTransform(scrollY, [0, 700], [0, -80])
    const contentO = useTransform(scrollY, [0, 500], [1, 0])

    return (
        <section
        ref={containerRef}
        id="hero"
        aria-label="APEX Energy — Uvod"
        style={{
            position: 'relative',
            minHeight: '100svh',
            background: '#0A0A0A',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
        }}
        >
        <style>{`
            @keyframes shimmer {
            0%   { background-position: -200% center; }
            100% { background-position:  200% center; }
            }
            @keyframes scrollPulse {
            0%, 100% { opacity: 0.3; }
            50%      { opacity: 1; }
            }
            .hero-vertical-label,
            .hero-scroll-indicator { display: none; }
            @media (min-width: 768px) {
            .hero-vertical-label   { display: flex !important; }
            .hero-scroll-indicator { display: flex !important; }
            }
            .hero-stats {
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem 0;
            }
            @media (min-width: 640px) {
            .hero-stats { grid-template-columns: repeat(4, 1fr); gap: 0; }
            }
            .hero-cta-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
            }
            @media (min-width: 768px) {
            .hero-cta-row {
                flex-direction: row;
                align-items: flex-end;
                justify-content: space-between;
            }
            }
            .stat-cell {
            border-right: none;
            margin-right: 0;
            padding-right: 0;
            }
            @media (min-width: 640px) {
            .stat-cell.has-divider {
                border-right: 1px solid rgba(201,151,44,0.06);
                margin-right: 2rem;
                padding-right: 2rem;
            }
            }
        `}</style>

        {/* ── Background ── */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <div style={{
            position: 'absolute', inset: 0,
            background: `
                radial-gradient(ellipse 80% 60% at 20% 50%, rgba(201,151,44,0.055) 0%, transparent 60%),
                radial-gradient(ellipse 50% 80% at 85% 20%, rgba(201,151,44,0.03) 0%, transparent 55%),
                radial-gradient(ellipse 60% 40% at 60% 90%, rgba(201,151,44,0.025) 0%, transparent 50%)
            `,
            }} />
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
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(to top, #0A0A0A 0%, transparent 100%)' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '20%', background: 'linear-gradient(to bottom, #0A0A0A 0%, transparent 100%)' }} />
        </div>

        {/* ── Oversized APEX wordmark ──
            This is the hero's background brand element. The logo image watermark
            that used to sit here as well was removed: two background marks in the
            same place cancelled each other out, and the image version needed a
            viewport-relative height that next/image cannot resolve. */}
        <div aria-hidden="true" style={{
            position: 'absolute',
            right: '-4%', top: '50%',
            transform: 'translateY(-52%)',
            zIndex: 1,
            userSelect: 'none', pointerEvents: 'none',
            lineHeight: 1,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 700,
            fontSize: 'clamp(28vw, 32vw, 28vw)',
            letterSpacing: '-0.04em',
            WebkitTextStroke: '1px rgba(201,151,44,0.06)',
            color: 'transparent',
            whiteSpace: 'nowrap',
        }}>
            APEX
        </div>

        {/* ── Vertical right-edge label (desktop only) ── */}
        <div aria-hidden="true" className="hero-vertical-label" style={{
            position: 'absolute',
            right: '2rem', top: '50%',
            transform: 'translateY(-50%) rotate(90deg)',
            transformOrigin: 'center',
            zIndex: 10,
            alignItems: 'center', gap: '1rem',
        }}>
            <div style={{ width: '32px', height: '1px', background: 'rgba(201,151,44,0.3)' }} />
            <span style={{ color: '#2A2A2A', fontSize: '0.55rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", whiteSpace: 'nowrap' }}>
            Novi Sad · Srbija · Est. 2024
            </span>
            <div style={{ width: '32px', height: '1px', background: 'rgba(201,151,44,0.3)' }} />
        </div>

        {/* ── Content ── */}
        <motion.div style={{ y: contentY, opacity: contentO, position: 'relative', zIndex: 10 }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 3rem' }}>

            {/* Clears the fixed navbar */}
            <div style={{ height: '120px' }} />

            {/* Eyebrow */}
            <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}
            >
                <div style={{ width: '32px', height: '1px', background: 'linear-gradient(to right, transparent, #C9972C)', flexShrink: 0 }} />
                <span style={{ color: '#C9972C', fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>
                Inženjersko savetovanje · Energetika
                </span>
            </motion.div>

            {/* Headline */}
            <h1 style={{ margin: 0, marginBottom: '2rem' }}>
                <div style={{ overflow: 'hidden', marginBottom: '0.05em' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {WORDS_LINE1.map((word, i) => (
                    <motion.span
                        key={word}
                        initial={{ y: '110%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.35 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                        style={{ ...HEADLINE_BASE, color: '#F5F0E8' }}
                    >
                        {word}
                    </motion.span>
                    ))}
                </div>
                </div>

                <div style={{ overflow: 'hidden' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {WORDS_LINE2.map((word, i) => (
                    <motion.span
                        key={word}
                        initial={{ y: '110%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                        ...HEADLINE_BASE,
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

            {/* Subtext + CTAs */}
            <div className="hero-cta-row" style={{ display: 'flex', marginBottom: '4rem' }}>
                <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    color: '#8A8A8A',
                    fontSize: 'clamp(0.875rem, 2vw, 1.05rem)',
                    lineHeight: 1.8, maxWidth: '420px',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 300, margin: 0,
                }}
                >
                Prvoklasno inženjersko savetovanje i tehnička podrška. Jasni rokovi,
                merljivi rezultati, iskusni tim iz Novog Sada.
                </motion.p>

                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}
                >
                <Link
                    href="/contact"
                    style={{
                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                    padding: '14px 32px',
                    background: 'linear-gradient(135deg, #B8860B 0%, #D4A843 50%, #C9972C 100%)',
                    color: '#0A0A0A', fontSize: '0.65rem', fontWeight: 600,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    fontFamily: "'Outfit', sans-serif",
                    borderRadius: '2px', textDecoration: 'none',
                    transition: 'box-shadow 0.3s ease',
                    whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(201,151,44,0.35)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}
                >
                    Zakažite termin
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>

                <Link
                    href="/services"
                    style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    color: '#8A8A8A', fontSize: '0.65rem', fontWeight: 500,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    fontFamily: "'Outfit', sans-serif", textDecoration: 'none',
                    transition: 'color 0.25s ease',
                    whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9972C'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#8A8A8A'}
                >
                    Naše usluge →
                </Link>
                </motion.div>
            </div>

            {/* Stats — 2 columns on mobile, 4 on desktop */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
                className="hero-stats"
                style={{
                display: 'grid',
                borderTop: '1px solid rgba(201,151,44,0.08)',
                paddingTop: '2rem',
                }}
            >
                {[
                { value: '10+',  label: 'Godina iskustva', desc: 'U inženjeringu',       divider: true  },
                { value: '50+',  label: 'Projekata',       desc: 'Uspešno završenih',    divider: true  },
                { value: 'ISO',  label: 'Sertifikovani',   desc: '9001 · 14001 · 50001', divider: true  },
                { value: '100%', label: 'Posvećenost',     desc: 'Svakom klijentu',      divider: false },
                ].map(stat => (
                <div
                    key={stat.label}
                    className={`stat-cell${stat.divider ? ' has-divider' : ''}`}
                    style={{ paddingBottom: '0.5rem' }}
                >
                    <div style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 600,
                    fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                    lineHeight: 1, marginBottom: '0.3rem',
                    background: 'linear-gradient(135deg, #B8860B 0%, #E8C44A 50%, #C9972C 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    }}>
                    {stat.value}
                    </div>
                    <div style={{ color: '#9A9A9A', fontSize: '0.7rem', fontFamily: "'Outfit', sans-serif", fontWeight: 400, marginBottom: '0.15rem' }}>
                    {stat.label}
                    </div>
                    <div style={{ color: '#6A6A6A', fontSize: '0.58rem', fontFamily: "'Outfit', sans-serif", fontWeight: 300, letterSpacing: '0.06em' }}>
                    {stat.desc}
                    </div>
                </div>
                ))}
            </motion.div>
            </div>
        </motion.div>

        {/* Scroll indicator (desktop only) */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            aria-hidden="true"
            className="hero-scroll-indicator"
            style={{
            position: 'absolute', bottom: '2.5rem', right: '2.5rem',
            flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
            zIndex: 10,
            }}
        >
            <span style={{ color: '#3A3A3A', fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", writingMode: 'vertical-rl' }}>
            Scroll
            </span>
            <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, #C9972C, transparent)', animation: 'scrollPulse 2s ease-in-out infinite' }} />
        </motion.div>
        </section>
    )
    }