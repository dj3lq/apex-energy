'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Premium splash screen — APEX Energy
 *
 * Sequence:
 * 1. Black screen with logo fading + scaling in (0–0.8s)
 * 2. Gold line draws under the logo (0.8–1.4s)
 * 3. Letter-by-letter tagline builds (1.4–1.9s)
 * 4. Two vertical panels wipe off screen top/bottom (2.0–2.7s) revealing the site
 *
 * Shown only once per browser session via sessionStorage.
 */

const TAGLINE = ['E', 'N', 'E', 'R', 'G', 'Y', ' ', 'S', 'O', 'L', 'U', 'T', 'I', 'O', 'N', 'S']

export default function SplashScreen() {
  // Always false on server — avoids hydration mismatch
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    // Runs only on client after hydration
    const seen = sessionStorage.getItem('apex-splash')
    if (seen) return
    sessionStorage.setItem('apex-splash', '1')
    setVisible(true)
  }, [])

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
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            pointerEvents: exiting ? 'none' : 'all',
          }}
          aria-hidden="true"
        >
          {/* Top panel */}
          <motion.div
            initial={{ y: 0 }}
            animate={exiting ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '51%',
              background: '#0A0A0A',
              zIndex: 2,
            }}
          />

          {/* Bottom panel */}
          <motion.div
            initial={{ y: 0 }}
            animate={exiting ? { y: '100%' } : { y: 0 }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '51%',
              background: '#0A0A0A',
              zIndex: 2,
            }}
          />

          {/* Content layer — sits above panels until they wipe */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 3,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '0',
            pointerEvents: 'none',
          }}>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: '2rem' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/apex-logo.JPG"
                alt="APEX Energy"
                style={{ height: '88px', width: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </motion.div>

            {/* Gold line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.76, 0, 0.24, 1] }}
              style={{
                height: '1px',
                width: '180px',
                background: 'linear-gradient(90deg, transparent, #C9972C, transparent)',
                transformOrigin: 'center',
                marginBottom: '1.5rem',
              }}
            />

            {/* Letter-by-letter tagline */}
            <div style={{ display: 'flex', gap: '2px', overflow: 'hidden' }}>
              {TAGLINE.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 1.4 + i * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    color: '#2A2A2A',
                    fontSize: '0.6rem',
                    fontWeight: 500,
                    letterSpacing: '0.22em',
                    fontFamily: "'Outfit', sans-serif",
                    display: 'inline-block',
                    width: char === ' ' ? '0.4em' : 'auto',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Bottom counter/progress line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '2.5rem',
                left: '2.5rem',
                right: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ color: '#1A1A1A', fontSize: '0.6rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
                APEX ENERGY DOO
              </span>
              <span style={{ color: '#1A1A1A', fontSize: '0.6rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
                NOVI SAD · RS
              </span>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: 0, left: 0,
                height: '2px',
                background: 'linear-gradient(90deg, #B8860B, #E8C44A, #C9972C)',
                transformOrigin: 'left',
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 1, 1, 0] }}
              transition={{
                scaleX: { duration: 1.9, ease: 'easeInOut' },
                opacity: { duration: 1.9, times: [0, 0.1, 0.85, 1] },
              }}
            />
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}