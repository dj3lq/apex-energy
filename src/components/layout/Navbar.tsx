    'use client'

    import { useState, useEffect } from 'react'
    import { TransitionLink as Link } from '@/components/layout/PageTransition'
    import { motion, AnimatePresence } from 'framer-motion'
    import Logo from '@/components/ui/Logo'

    const navLinks = [
    { label: 'O nama',   href: '/about' },
    { label: 'Usluge',  href: '/services' },
    { label: 'Proces',  href: '/#process' },
    { label: 'Kontakt', href: '/contact' },
    ]

    export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    return (
        <>
        <motion.header
            role="banner"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
            transition: 'background 0.5s ease, border-color 0.5s ease',
            background: scrolled ? 'rgba(10,10,10,0.94)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(201,151,44,0.08)' : '1px solid transparent',
            }}
        >
            <nav
            aria-label="Primary navigation"
            style={{
                width: '100%', maxWidth: '1200px', margin: '0 auto',
                padding: '0 2.5rem', display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', height: '88px',
            }}
            >
            {/* Logo — bigger */}
            <Link href="/" aria-label="APEX Energy — početna" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
                <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                <Logo variant="navbar" height={68} />
                </motion.div>
            </Link>

            {/* Desktop nav links */}
            <ul role="list" className="desktop-nav" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'none' }}>
                {navLinks.map(link => (
                <li key={link.href}>
                    <Link href={link.href}
                    style={{ color: '#666666', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", textDecoration: 'none', transition: 'color 0.25s ease' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#F5F0E8'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#666666'}
                    >
                    {link.label}
                    </Link>
                </li>
                ))}
            </ul>

            {/* Desktop CTA */}
            <Link href="/contact" className="desktop-cta"
                style={{ display: 'none', alignItems: 'center', padding: '10px 24px', border: '1px solid rgba(201,151,44,0.3)', borderRadius: '2px', color: '#C9972C', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", transition: 'all 0.3s ease', textDecoration: 'none', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(201,151,44,0.08)'; el.style.borderColor = 'rgba(201,151,44,0.5)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.borderColor = 'rgba(201,151,44,0.3)' }}
            >
                Zakažite termin
            </Link>

            {/* Hamburger */}
            <button type="button" onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen} aria-controls="mobile-menu"
                aria-label={menuOpen ? 'Zatvori meni' : 'Otvori meni'}
                className="hamburger"
                style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
                <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} transition={{ duration: 0.3 }} style={{ display: 'block', width: '24px', height: '1px', background: '#F5F0E8' }} />
                <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: 0.2 }} style={{ display: 'block', width: '24px', height: '1px', background: '#F5F0E8' }} />
                <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} transition={{ duration: 0.3 }} style={{ display: 'block', width: '24px', height: '1px', background: '#F5F0E8' }} />
            </button>
            </nav>

            <style>{`
            @media (min-width: 768px) {
                .desktop-nav { display: flex !important; align-items: center; gap: 2.5rem; }
                .desktop-cta { display: inline-flex !important; }
                .hamburger { display: none !important; }
            }
            `}</style>
        </motion.header>

        {/* Mobile menu */}
        <AnimatePresence>
            {menuOpen && (
            <motion.div id="mobile-menu" role="dialog" aria-modal="true"
                initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'fixed', inset: 0, zIndex: 40, background: '#0A0A0A', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 2.5rem' }}
            >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #C9972C, transparent)' }} />
                <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: `linear-gradient(rgba(201,151,44,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,151,44,0.3) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

                {/* Logo in mobile menu */}
                <div style={{ position: 'absolute', top: '10px', left: '2.5rem' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/apex-logo.png" alt="APEX Energy" style={{ height: '60px', width: 'auto', objectFit: 'contain', display: 'block' }} />
                </div>

                {/* Close */}
                <div style={{ position: 'absolute', top: '22px', right: '2.5rem' }}>
                <button type="button" onClick={() => setMenuOpen(false)} aria-label="Zatvori meni"
                    style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <motion.span animate={{ rotate: 45, y: 6 }} style={{ display: 'block', width: '24px', height: '1px', background: '#F5F0E8' }} />
                    <motion.span animate={{ opacity: 0 }} style={{ display: 'block', width: '24px', height: '1px', background: '#F5F0E8' }} />
                    <motion.span animate={{ rotate: -45, y: -6 }} style={{ display: 'block', width: '24px', height: '1px', background: '#F5F0E8' }} />
                </button>
                </div>

                <ul role="list" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', zIndex: 10 }}>
                {navLinks.map((link, i) => (
                    <motion.li key={link.href} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                    <Link href={link.href} onClick={() => setMenuOpen(false)}
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', display: 'block', transition: 'color 0.2s', textDecoration: 'none' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9972C'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#F5F0E8'}
                    >
                        {link.label}
                    </Link>
                    </motion.li>
                ))}
                </ul>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(201,151,44,0.12)', position: 'relative', zIndex: 10 }}>
                <Link href="/contact" onClick={() => setMenuOpen(false)}
                    style={{ display: 'inline-flex', padding: '14px 32px', background: 'linear-gradient(135deg, #B8860B, #D4A843, #C9972C)', color: '#0A0A0A', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", borderRadius: '2px', textDecoration: 'none' }}>
                    Zakažite termin
                </Link>
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <a href="tel:+381648710990" style={{ color: '#444444', fontSize: '0.875rem', fontFamily: "'Outfit', sans-serif", transition: 'color 0.2s', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9972C'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#444444'}>
                    +381 64 871 0990
                    </a>
                    <a href="mailto:office@apexenergy.rs" style={{ color: '#444444', fontSize: '0.875rem', fontFamily: "'Outfit', sans-serif", transition: 'color 0.2s', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9972C'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#444444'}>
                    office@apexenergy.rs
                    </a>
                </div>
                </motion.div>
            </motion.div>
            )}
        </AnimatePresence>
        </>
    )
    }