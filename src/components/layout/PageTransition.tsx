    'use client'

    import {
    createContext, useContext, useCallback,
    useEffect, useRef, useState, useTransition,
    } from 'react'
    import { usePathname, useRouter } from 'next/navigation'
    import { motion, AnimatePresence } from 'framer-motion'

    /**
     * APEX Energy — Page Transition System
     *
     * How it works:
     * 1. TransitionProvider wraps the app, providing navigate() via context
     * 2. navigate() triggers the curtain-in animation, then pushes the route
     * 3. On pathname change, curtain-out animation plays
     * 4. usePageTransition hook exposes navigate() to any component
     *
     * Usage — replace <Link href="/about"> with:
     *   const { navigate } = usePageTransition()
     *   <button onClick={() => navigate('/about')}>...</button>
     *   or use the <TransitionLink> component below
     */

    // ─── Context ────────────────────────────────────────────────────────────────

    interface TransitionContextValue {
    navigate: (href: string) => void
    isTransitioning: boolean
    }

    const TransitionContext = createContext<TransitionContextValue>({
    navigate: () => {},
    isTransitioning: false,
    })

    export function usePageTransition() {
    return useContext(TransitionContext)
    }

    // ─── Curtain animation variants ─────────────────────────────────────────────

    // Two panels slide in from top and bottom, hold, then slide back out
    const PANEL_DURATION  = 0.65
    const PANEL_EASE      = [0.76, 0, 0.24, 1] as const
    const ROUTE_DELAY_MS  = 650  // wait for panels to cover screen before navigating

    // ─── Provider ───────────────────────────────────────────────────────────────

    export function TransitionProvider({ children }: { children: React.ReactNode }) {
    const router    = useRouter()
    const pathname  = usePathname()
    const [phase, setPhase] = useState<'idle' | 'covering' | 'covered' | 'revealing'>('idle')
    const pendingHref = useRef<string | null>(null)
    const [, startTransition] = useTransition()

    // Step 1 — caller requests navigation
    const navigate = useCallback((href: string) => {
        if (href === pathname) return          // already here
        if (phase !== 'idle') return           // animation in progress
        pendingHref.current = href
        setPhase('covering')
    }, [pathname, phase])

    // Step 2 — after panels cover screen, push route
    useEffect(() => {
        if (phase !== 'covering') return
        const t = setTimeout(() => {
        if (pendingHref.current) {
            startTransition(() => {
            router.push(pendingHref.current!)
            })
            setPhase('covered')
        }
        }, ROUTE_DELAY_MS)
        return () => clearTimeout(t)
    }, [phase, router])

    // Step 3 — pathname changed → reveal
    useEffect(() => {
        if (phase !== 'covered') return
        // Small delay so new page has a frame to paint
        const t = setTimeout(() => setPhase('revealing'), 80)
        return () => clearTimeout(t)
    }, [pathname, phase])

    // Step 4 — revealing → idle after animation
    useEffect(() => {
        if (phase !== 'revealing') return
        const t = setTimeout(() => {
        setPhase('idle')
        pendingHref.current = null
        }, (PANEL_DURATION + 0.1) * 1000)
        return () => clearTimeout(t)
    }, [phase])

    const isCovering  = phase === 'covering' || phase === 'covered'
    const isRevealing = phase === 'revealing'

    return (
        <TransitionContext.Provider value={{ navigate, isTransitioning: phase !== 'idle' }}>
        {children}

        {/* ── Curtain overlay ── */}
        <AnimatePresence>
            {(isCovering || isRevealing) && (
            <div
                aria-hidden="true"
                style={{ position: 'fixed', inset: 0, zIndex: 9998, pointerEvents: 'all' }}
            >
                {/* Top panel */}
                <motion.div
                key="top"
                initial={{ y: '-100%' }}
                animate={isCovering ? { y: '0%' } : { y: '-100%' }}
                transition={{ duration: PANEL_DURATION, ease: PANEL_EASE }}
                style={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    height: '51%',
                    background: '#0A0A0A',
                    display: 'flex', alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    paddingRight: '2.5rem', paddingBottom: '1rem',
                }}
                >
                {/* Logo appears on the curtain */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isCovering ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: isCovering ? 0.35 : 0 }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                    src="/apex-logo.png"
                    alt=""
                    style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
                    />
                </motion.div>
                </motion.div>

                {/* Bottom panel */}
                <motion.div
                key="bottom"
                initial={{ y: '100%' }}
                animate={isCovering ? { y: '0%' } : { y: '100%' }}
                transition={{ duration: PANEL_DURATION, ease: PANEL_EASE }}
                style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: '51%',
                    background: '#0A0A0A',
                }}
                >
                {/* Gold seam line at the join */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent 0%, #C9972C 30%, #C9972C 70%, transparent 100%)',
                    opacity: 0.35,
                }} />
                </motion.div>
            </div>
            )}
        </AnimatePresence>
        </TransitionContext.Provider>
    )
    }

    // ─── TransitionLink ──────────────────────────────────────────────────────────
    // Drop-in replacement for <Link> that triggers the curtain transition

    import type { ComponentPropsWithoutRef } from 'react'
    import NextLink from 'next/link'

    interface TransitionLinkProps extends Omit<ComponentPropsWithoutRef<'a'>, 'href'> {
    href: string
    children: React.ReactNode
    }

    export function TransitionLink({ href, children, onClick, ...props }: TransitionLinkProps) {
    const { navigate, isTransitioning } = usePageTransition()

    // External links or hash-only links bypass transition
    const isExternal = href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')
    const isHash     = href.startsWith('#')

    if (isExternal || isHash) {
        return <a href={href} onClick={onClick} {...props}>{children}</a>
    }

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Allow cmd/ctrl+click to open in new tab normally
        if (e.metaKey || e.ctrlKey || e.shiftKey) return
        e.preventDefault()
        if (!isTransitioning) {
        onClick?.(e)
        navigate(href)
        }
    }

    return (
        <NextLink href={href} onClick={handleClick} {...props}>
        {children}
        </NextLink>
    )
    }