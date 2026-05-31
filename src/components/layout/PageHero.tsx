    'use client'

    import { motion } from 'framer-motion'

    interface PageHeroProps {
    label:      string
    title:      string
    titleGold?: string
    subtitle:   string
    }

    export default function PageHero({ label, title, titleGold, subtitle }: PageHeroProps) {
    return (
        <section
        aria-label={label}
        style={{
            position: 'relative',
            minHeight: '50vh',
            display: 'flex',
            alignItems: 'flex-end',
            background: '#0A0A0A',
            overflow: 'hidden',
            paddingBottom: '4rem',
        }}
        >
        {/* Background */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
            <svg width="100%" height="100%" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice">
            <defs>
                <linearGradient id="phGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9972C" stopOpacity="0.06"/>
                <stop offset="100%" stopColor="#C9972C" stopOpacity="0"/>
                </linearGradient>
            </defs>
            <rect width="1400" height="600" fill="url(#phGold)"/>
            {[100,250,400,600,800,1000,1200,1350].map(x => (
                <line key={x} x1={x} y1="0" x2={x} y2="600" stroke="#C9972C" strokeOpacity="0.04" strokeWidth="0.5"/>
            ))}
            {[80,180,300,420,520].map(y => (
                <line key={y} x1="0" y1={y} x2="1400" y2={y} stroke="#C9972C" strokeOpacity="0.04" strokeWidth="0.5"/>
            ))}
            {[[200,150],[600,80],[1000,200],[1300,120],[400,400],[900,350],[1150,450]].map(([x,y],i) => (
                <circle key={i} cx={x} cy={y} r="2" fill="#C9972C" opacity="0.2">
                <animate attributeName="opacity" values="0.1;0.4;0.1" dur={`${2.5+i*0.4}s`} repeatCount="indefinite"/>
                </circle>
            ))}
            </svg>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to top, #0A0A0A 0%, transparent 100%)' }}/>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.75) 100%)' }}/>
        </div>

        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '7rem 1.5rem 0' }}>

            {/* Label */}
            <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}
            >
            <div style={{ height: '1px', width: '36px', background: 'linear-gradient(to right, transparent, #C9972C)', flexShrink: 0 }}/>
            <span style={{ color: '#C9972C', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>
                {label}
            </span>
            </motion.div>

            {/* Title */}
            <div style={{ overflow: 'hidden', marginBottom: '1.25rem' }}>
            <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16,1,0.3,1] }}
                style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600, color: '#F5F0E8',
                lineHeight: 1.05, letterSpacing: '-0.01em',
                fontSize: 'clamp(2.2rem, 7vw, 5.5rem)',
                margin: 0,
                }}
            >
                {title}{titleGold && (
                <span style={{ display: 'block', background: 'linear-gradient(135deg, #B8860B 0%, #E8C44A 45%, #C9972C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {titleGold}
                </span>
                )}
            </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16,1,0.3,1] }}
            style={{
                color: '#666666',
                fontSize: 'clamp(0.875rem, 2vw, 1.1rem)',
                lineHeight: 1.75, maxWidth: '520px',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300, margin: 0,
            }}
            >
            {subtitle}
            </motion.p>
        </div>
        </section>
    )
    }