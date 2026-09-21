    'use client'

    import { TransitionLink as Link } from '@/components/layout/PageTransition'
    import { motion } from 'framer-motion'
    import { useScrollReveal } from '@/hooks/useScrollReveal'
    import { fadeUp, staggerContainer } from '@/lib/motion'
    import Logo from '@/components/ui/Logo'

    const footerLinks = [
    { label: 'O nama',   href: '/about' },
    { label: 'Usluge',  href: '/services' },
    { label: 'Proces',  href: '/#process' },
    { label: 'Kontakt', href: '/contact' },
    ]

    const services = [
    { label: 'Upravljanje projektom', href: '/services/upravljanje-projektom' },
    { label: 'Tehničko savetovanje',  href: '/services/tehnicko-savetovanje' },
    { label: 'Energetska efikasnost', href: '/services/energetska-efikasnost' },
    { label: 'BIM & Digitalizacija',  href: '/services/bim-digitalizacija' },
    { label: 'Bezbednost na radu',    href: '/services/procena-rizika' },
    { label: 'Kvalitet & Standardi',  href: '/services/kvalitet-standardi' },
    ]

    export default function Footer() {
    const year = new Date().getFullYear()
    const { ref, controls } = useScrollReveal(0.01)

    return (
        <footer role="contentinfo" style={{ position: 'relative', background: '#080808' }}>
        <style>{`
            .footer-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
            margin-bottom: 4rem;
            }
            @media (min-width: 768px) {
            .footer-grid { grid-template-columns: 2.2fr 1fr 1.5fr; gap: 4rem; }
            }
            .footer-bottom {
            display: flex; flex-direction: column; gap: 1rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(201,151,44,0.06);
            }
            @media (min-width: 640px) {
            .footer-bottom { flex-direction: row; align-items: center; justify-content: space-between; }
            }
        `}</style>

        {/* Top divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, #C9972C 30%, #C9972C 70%, transparent 100%)', opacity: 0.2 }} />

        <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '5rem' }}>

            {/* Oversized watermark behind content */}
            <div
            aria-hidden="true"
            style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0.04, pointerEvents: 'none', userSelect: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            >
            <Logo
                variant="watermark"
                height={320}
                style={{ filter: 'grayscale(100%) brightness(3)' }}
            />
            </div>

            <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={staggerContainer}
            style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 2.5rem', position: 'relative', zIndex: 10 }}
            >

            {/* Prominent logo block */}
            <motion.div
                variants={fadeUp}
                style={{
                marginBottom: '4rem', paddingBottom: '4rem',
                borderBottom: '1px solid rgba(201,151,44,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: '2rem',
                }}
            >
                <Logo variant="footer" height={80} />
                <p style={{ color: '#6A6A6A', fontSize: '0.875rem', lineHeight: 1.8, fontFamily: "'Outfit', sans-serif", fontWeight: 300, maxWidth: '360px' }}>
                Prvoklasno inženjersko savetovanje i energetska rešenja za preduzeća u Srbiji i regionu.
                </p>
            </motion.div>

            <div className="footer-grid">

                {/* Contact */}
                <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <p style={{ color: '#C9972C', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>
                    Kontakt
                </p>
                {[
                    { label: '+381 64 871 0990',      href: 'tel:+381648710990' },
                    { label: 'office@apexenergy.rs',  href: 'mailto:office@apexenergy.rs' },
                    { label: 'Камењар 3/1, Novi Sad', href: 'https://maps.google.com?q=Нови+Сад' },
                ].map(item => (
                    <a
                    key={item.href}
                    href={item.href}
                    style={{ color: '#8A8A8A', fontSize: '0.875rem', fontFamily: "'Outfit', sans-serif", fontWeight: 300, transition: 'color 0.25s', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9972C'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#8A8A8A'}
                    {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                    {item.label}
                    </a>
                ))}
                <div style={{ marginTop: '0.5rem' }}>
                    <p style={{ color: '#5A5A5A', fontSize: '0.75rem', fontFamily: "'Outfit', sans-serif", fontWeight: 300, lineHeight: 1.6 }}>
                    Pon – Pet: 09:00 – 18:00<br />Subota: 10:00 – 14:00
                    </p>
                </div>
                </motion.div>

                {/* Navigation */}
                <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <p style={{ color: '#C9972C', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>
                    Navigacija
                </p>
                {footerLinks.map(link => (
                    <Link
                    key={link.href}
                    href={link.href}
                    style={{ color: '#8A8A8A', fontSize: '0.875rem', fontFamily: "'Outfit', sans-serif", fontWeight: 300, transition: 'color 0.25s', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#F5F0E8'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#8A8A8A'}
                    >
                    {link.label}
                    </Link>
                ))}
                </motion.div>

                {/* Services */}
                <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <p style={{ color: '#C9972C', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>
                    Usluge
                </p>
                {services.map(s => (
                    <Link
                    key={s.href}
                    href={s.href}
                    style={{ color: '#8A8A8A', fontSize: '0.875rem', fontFamily: "'Outfit', sans-serif", fontWeight: 300, transition: 'color 0.25s', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#F5F0E8'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#8A8A8A'}
                    >
                    {s.label}
                    </Link>
                ))}
                </motion.div>
            </div>

            {/* Bottom bar */}
            <div className="footer-bottom">
                <p style={{ color: '#4A4A4A', fontSize: '0.75rem', fontFamily: "'Outfit', sans-serif", fontWeight: 300, margin: 0 }}>
                © {year} APEX energy DOO. Sva prava zadržana.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <Link
                    href="/privacy"
                    style={{ color: '#4A4A4A', fontSize: '0.75rem', fontFamily: "'Outfit', sans-serif", fontWeight: 300, textDecoration: 'none', transition: 'color 0.25s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9972C'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#4A4A4A'}
                >
                    Politika privatnosti
                </Link>
                <p style={{ color: '#4A4A4A', fontSize: '0.75rem', fontFamily: "'Outfit', sans-serif", fontWeight: 300, margin: 0 }}>
                    Novi Sad, Srbija
                </p>
                </div>
            </div>
            </motion.div>
        </div>
        </footer>
    )
    }