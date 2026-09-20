  'use client'

  import { useEffect, useState } from 'react'
  import { motion, AnimatePresence } from 'framer-motion'
  import Logo from '@/components/ui/Logo'

  /**
   * Splash screen — APEX Energy
   *
   * Sequence:
   *  0.0s  logo fades and scales in
   *  0.85s gold line draws out beneath it
   *  1.4s  tagline builds letter by letter
   *  2.1s  two panels wipe off top and bottom, revealing the page
   *
   * Shown once per browser session. `visible` starts false on both server and
   * client so hydration matches; the sessionStorage check runs in an effect
   * afterwards.
   */

  const TAGLINE = ['E','N','E','R','G','Y',' ','S','O','L','U','T','I','O','N','S']

  export default function SplashScreen() {
    const [visible, setVisible] = useState(false)
    const [exiting, setExiting] = useState(false)

      useEffect(() => {
    const seen = sessionStorage.getItem('apex-splash')
    if (seen) return
    sessionStorage.setItem('apex-splash', '1')
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage is client-only; reading it before hydration would cause a mismatch
    setVisible(true)
  }, [])

  // ─── OVAJ BLOK FALI ───
  useEffect(() => {
    if (!visible) return
    const exitTimer = setTimeout(() => setExiting(true), 2100)
    const hideTimer = setTimeout(() => setVisible(false), 3000)
    return () => { clearTimeout(exitTimer); clearTimeout(hideTimer) }
  }, [visible])

    return (
      <AnimatePresence>
        {visible && (
          <div
            aria-hidden="true"
            style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: exiting ? 'none' : 'all' }}
          >
            {/* Top panel */}
            <motion.div
              initial={{ y: 0 }}
              animate={exiting ? { y: '-100%' } : { y: 0 }}
              transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '51%', background: '#0A0A0A', zIndex: 2 }}
            />

            {/* Bottom panel */}
            <motion.div
              initial={{ y: 0 }}
              animate={exiting ? { y: '100%' } : { y: 0 }}
              transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '51%', background: '#0A0A0A', zIndex: 2 }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, #C9972C 30%, #C9972C 70%, transparent 100%)',
                opacity: 0.35,
              }} />
            </motion.div>

            {/* Content above the panels */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 3,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none',
            }}>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginBottom: '2rem' }}
              >
                <Logo variant="splash" height={88} />
              </motion.div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.85, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  height: '1px', width: '180px',
                  background: 'linear-gradient(90deg, transparent, #C9972C, transparent)',
                  transformOrigin: 'center', marginBottom: '1.5rem',
                }}
              />

              <div style={{ display: 'flex', gap: '2px', overflow: 'hidden' }}>
                {TAGLINE.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.4 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      color: '#4A4A4A', fontSize: '0.6rem', fontWeight: 500,
                      letterSpacing: '0.22em', fontFamily: "'Outfit', sans-serif",
                      display: 'inline-block',
                      width: char === ' ' ? '0.4em' : 'auto',
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              {/* Corner meta */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{
                  position: 'absolute', bottom: '2.5rem', left: '1.5rem', right: '1.5rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                <span style={{ color: '#2E2E2E', fontSize: '0.6rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
                  APEX ENERGY DOO
                </span>
                <span style={{ color: '#2E2E2E', fontSize: '0.6rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
                  NOVI SAD · RS
                </span>
              </motion.div>

              {/* Progress bar */}
              <motion.div
                style={{
                  position: 'absolute', bottom: 0, left: 0,
                  height: '2px', width: '100%',
                  background: 'linear-gradient(90deg, #B8860B, #E8C44A, #C9972C)',
                  transformOrigin: 'left',
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: [0, 1, 1, 0] }}
                transition={{
                  scaleX:  { duration: 1.9, ease: 'easeInOut' },
                  opacity: { duration: 1.9, times: [0, 0.1, 0.85, 1] },
                }}
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    )
  }