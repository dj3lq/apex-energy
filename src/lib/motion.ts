    /**
     * Apex Energy — Motion Design System
     * Shared Framer Motion variants used across all sections.
     * Apple/Porsche/Mercedes aesthetic: purposeful, not decorative.
     */
    import type { Variants } from 'framer-motion'

    // Base transition — smooth ease-out-expo feel
    const ease = [0.16, 1, 0.3, 1] as const

    // Fade up — primary reveal for text and cards
    export const fadeUp: Variants = {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
    }

    // Fade in — for decorative elements
    export const fadeIn: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease } },
    }

    // Stagger container — parent that staggers children
    export const staggerContainer: Variants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
    }

    // Stagger container — faster for grids
    export const staggerFast: Variants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
    }

    // Slide in from left
    export const slideLeft: Variants = {
    hidden:  { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease } },
    }

    // Slide in from right
    export const slideRight: Variants = {
    hidden:  { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease } },
    }

    // Scale up — for stat numbers
    export const scaleUp: Variants = {
    hidden:  { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } },
    }

    // Line draw — for gold decorative lines
    export const lineDraw: Variants = {
    hidden:  { scaleX: 0, originX: 0 },
    visible: { scaleX: 1, transition: { duration: 1, ease } },
    }