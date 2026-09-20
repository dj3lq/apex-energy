    'use client'

    import {
    createContext, useContext, useCallback,
    useEffect, useRef, useState, useTransition,
    type ComponentPropsWithoutRef,
    } from 'react'
    import { usePathname, useRouter } from 'next/navigation'
    import NextLink from 'next/link'
    import { motion, AnimatePresence } from 'framer-motion'
    import Logo from '@/components/ui/Logo'

    /**
     * Page transition system.
     *
     * navigate() drives a four-phase state machine:
     *   idle → covering → covered → revealing → idle
     *
     * The route is pushed only once the panels have covered the screen, so the
     * page swap is never visible. Use <TransitionLink> in place of next/link
     * anywhere an internal navigation should play the curtain.
     */

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

    const PANEL_DURATION = 0.65
    const PANEL_EASE     = [0.76, 0, 0.24, 1] as const
    const ROUTE_DELAY_MS = 650

    export function TransitionProvider({ children }: { children: React.ReactNode }) {
    const router   = useRouter()
    const pathname = usePathname()
    const [phase, setPhase] = useState<'idle' | 'covering' | 'covered' | 'revealing'>('idle')
    const pendingHref = useRef<string | null>(null)
    const [, startTransition] = useTransition()

    const navigate = useCallback((href: string) => {
        if (href === pathname) return
        if (phase !== 'idle')  return
        pendingHref.current = href
        setPhase('covering')
    }, [pathname, phase])

    // Panels have covered the screen — push the route.
    useEffect(() => {
        if (phase !== 'covering') return
        const t = setTimeout(() => {
        if (pendingHref.current) {
            startTransition(() => router.push(pendingHref.current!))
            setPhase('covered')
        }
        }, ROUTE_DELAY_MS)
        return () => clearTimeout(t)
    }, [phase, router])

    // Route changed — give the new page a frame, then reveal.
    useEffect(() => {
        if (phase !== 'covered') return
        const t = setTimeout(() => setPhase('revealing'), 80)
        return () => clearTimeout(t)
    }, [pathname, phase])

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

        <AnimatePresence>
            {(isCovering || isRevealing) && (
            <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 9998, pointerEvents: 'all' }}>

                {/* Top panel */}
                <motion.div
                key="top"
                initial={{ y: '-100%' }}
                animate={isCovering ? { y: '0%' } : { y: '-100%' }}
                transition={{ duration: PANEL_DURATION, ease: PANEL_EASE }}
                style={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    height: '51%', background: '#0A0A0A',
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
                    paddingRight: '1.5rem', paddingBottom: '1rem',
                }}
                >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isCovering ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: isCovering ? 0.35 : 0 }}
                >
                    <Logo variant="divider" height={52} />
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
                    height: '51%', background: '#0A0A0A',
                }}
                >
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
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

    interface TransitionLinkProps extends Omit<ComponentPropsWithoutRef<'a'>, 'href'> {
    href: string
    children: React.ReactNode
    }

    export function TransitionLink({ href, children, onClick, ...props }: TransitionLinkProps) {
    const { navigate, isTransitioning } = usePageTransition()

    const isExternal = href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')
    const isHash     = href.startsWith('#')

    if (isExternal || isHash) {
        return <a href={href} onClick={onClick} {...props}>{children}</a>
    }

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Leave modifier-clicks to the browser so "open in new tab" still works.
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