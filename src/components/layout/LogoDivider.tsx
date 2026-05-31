    'use client'

    import { motion } from 'framer-motion'
    import { useScrollReveal } from '@/hooks/useScrollReveal'

    /**
     * Section divider with centered APEX logo watermark.
     * Place between homepage sections for brand presence.
     */
    export default function LogoDivider() {
    const { ref, controls } = useScrollReveal(0.1)

    return (
        <div
        ref={ref}
        aria-hidden="true"
        style={{ position: 'relative', height: '120px', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
        >
        {/* Lines */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(201,151,44,0.12) 30%, rgba(201,151,44,0.12) 70%, transparent 100%)' }} />

        {/* Logo */}
        <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={controls}
            variants={{ hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            style={{ position: 'relative', zIndex: 10, background: '#0A0A0A', padding: '0 2rem' }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
            src="/apex-logo.png"
            alt="APEX Energy"
            style={{ height: '52px', width: 'auto', objectFit: 'contain', display: 'block', opacity: 0.55 }}
            />
        </motion.div>
        </div>
    )
    }