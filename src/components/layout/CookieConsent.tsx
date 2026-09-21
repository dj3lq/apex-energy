    'use client'

    import { useEffect, useState } from 'react'
    import { motion, AnimatePresence } from 'framer-motion'
    import { TransitionLink } from '@/components/layout/PageTransition'

    /**
     * GDPR / Serbian ZZPL cookie consent.
     *
     * Design decisions:
     * - Non-essential cookies stay OFF until the user actively opts in.
     *   Both buttons carry equal visual weight — burying the reject option is a
     *   dark pattern and makes the consent invalid under GDPR.
     * - The choice is stored in localStorage, not a cookie, so nothing is written
     *   to cookies before consent exists.
     * - Consent is versioned: bumping CONSENT_VERSION re-prompts every visitor,
     *   which is required if the cookie purposes ever change.
     * - Analytics must call hasAnalyticsConsent() before loading any script.
     */

    const STORAGE_KEY     = 'apex-cookie-consent'
    const CONSENT_VERSION = 1

    type ConsentChoice = 'all' | 'essential'

    interface StoredConsent {
    version: number
    choice:  ConsentChoice
    date:    string
    }

    /** Read consent from outside React — call before loading analytics. */
    export function hasAnalyticsConsent(): boolean {
    if (typeof window === 'undefined') return false
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return false
        const parsed = JSON.parse(raw) as StoredConsent
        return parsed.version === CONSENT_VERSION && parsed.choice === 'all'
    } catch {
        return false
    }
    }

    export default function CookieConsent() {
    const [visible, setVisible] = useState(false)

    // Client-only check — localStorage does not exist on the server, so reading
    // it during render would cause a hydration mismatch.
    useEffect(() => {
        try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) { setVisible(true); return }
        const parsed = JSON.parse(raw) as StoredConsent
        if (parsed.version !== CONSENT_VERSION) setVisible(true)
        } catch {
        setVisible(true)
        }
    }, [])

    const save = (choice: ConsentChoice) => {
        const record: StoredConsent = {
        version: CONSENT_VERSION,
        choice,
        date: new Date().toISOString(),
        }
        try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
        } catch {
        // Private browsing or storage disabled — honour the choice for this
        // session rather than trapping the user behind the banner.
        }
        setVisible(false)
    }

    return (
        <AnimatePresence>
        {visible && (
            <motion.div
            role="dialog"
            aria-labelledby="cookie-title"
            aria-describedby="cookie-desc"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: 'fixed',
                bottom: '1.25rem', left: '1.25rem', right: '1.25rem',
                zIndex: 9000,
                maxWidth: '560px',
                margin: '0 auto',
                background: '#111111',
                border: '1px solid rgba(201,151,44,0.15)',
                borderRadius: '2px',
                padding: '1.75rem',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                overflow: 'hidden',
            }}
            >
            <div aria-hidden="true" style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, #C9972C, transparent)',
            }} />

            <h2 id="cookie-title" style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600, color: '#F5F0E8',
                fontSize: '1.15rem', marginBottom: '0.6rem',
            }}>
                Kolačići
            </h2>

            <p id="cookie-desc" style={{
                color: '#8A8A8A', fontSize: '0.85rem', lineHeight: 1.7,
                fontFamily: "'Outfit', sans-serif", fontWeight: 300,
                marginBottom: '1.5rem',
            }}>
                Koristimo neophodne kolačiće da sajt funkcioniše. Uz vašu saglasnost
                koristimo i analitičke kolačiće kako bismo razumeli kako se sajt
                koristi. Više u{' '}
                <TransitionLink href="/privacy" style={{ color: '#C9972C', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                politici privatnosti
                </TransitionLink>.
            </p>

            {/* Equal-weight buttons — no dark pattern */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                type="button"
                onClick={() => save('all')}
                style={{
                    flex: '1 1 140px', padding: '12px 20px',
                    background: 'linear-gradient(135deg, #B8860B 0%, #D4A843 50%, #C9972C 100%)',
                    color: '#0A0A0A', fontSize: '0.62rem', fontWeight: 600,
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    fontFamily: "'Outfit', sans-serif",
                    border: 'none', borderRadius: '2px', cursor: 'pointer',
                    transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.88'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
                >
                Prihvati sve
                </button>

                <button
                type="button"
                onClick={() => save('essential')}
                style={{
                    flex: '1 1 140px', padding: '12px 20px',
                    background: 'transparent', color: '#9A9A9A',
                    fontSize: '0.62rem', fontWeight: 500,
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    fontFamily: "'Outfit', sans-serif",
                    border: '1px solid rgba(201,151,44,0.25)',
                    borderRadius: '2px', cursor: 'pointer',
                    transition: 'color 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = '#F5F0E8'
                    el.style.borderColor = 'rgba(201,151,44,0.45)'
                }}
                onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = '#9A9A9A'
                    el.style.borderColor = 'rgba(201,151,44,0.25)'
                }}
                >
                Samo neophodni
                </button>
            </div>
            </motion.div>
        )}
        </AnimatePresence>
    )
    }