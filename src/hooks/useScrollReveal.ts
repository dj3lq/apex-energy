    'use client'

    import { useEffect, useRef } from 'react'
    import { useInView, useAnimation } from 'framer-motion'

    /**
     * Hook that triggers framer-motion animations when element enters viewport.
     * Used across all sections for scroll-reveal effects.
     * Compatible with framer-motion v12 (AnimationControls type is inferred).
     */
    export function useScrollReveal(threshold = 0.15) {
    const ref      = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: threshold })
    const controls = useAnimation()

    useEffect(() => {
        if (isInView) controls.start('visible')
    }, [isInView, controls])

    return { ref, controls }
    }