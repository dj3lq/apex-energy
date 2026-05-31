    import type { Config } from 'tailwindcss'

    /**
     * Apex Energy — Tailwind CSS Configuration
     *
     * Brand design tokens extracted from the official Apex Energy identity:
     * - Primary palette: deep black backgrounds, metallic gold accents
     * - Typography: display (Cormorant Garamond) + body (Outfit)
     * - All custom utilities follow the brand's premium, industrial aesthetic
     */

    const config: Config = {
    // Scan all relevant files for class names
        content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],

    // Dark mode via class — allows explicit control rather than OS preference
    darkMode: 'class',

    theme: {
        extend: {
        // ─── Brand Color Palette ──────────────────────────────────────────────
        colors: {
            // Core blacks — backgrounds and surfaces
            black: {
            DEFAULT: '#0A0A0A', // True brand black (logo background)
            950:     '#0A0A0A',
            900:     '#111111', // Primary surface
            800:     '#181818', // Elevated surface
            700:     '#1F1F1F', // Card background
            600:     '#2A2A2A', // Subtle borders
            500:     '#333333', // Muted borders
            },

            // Gold — the primary brand accent
            gold: {
            DEFAULT: '#C9972C',
            50:      '#FDF8EC',
            100:     '#F8EDCA',
            200:     '#F0D98A',
            300:     '#E8C44A',
            400:     '#D4A843', // Light metallic gold
            500:     '#C9972C', // Brand gold (primary)
            600:     '#B8860B', // Deep gold
            700:     '#9A6F0A',
            800:     '#7A5808',
            900:     '#5C4206',
            950:     '#3D2B04',
            },

            // Warm whites — text and highlights
            ivory: {
            DEFAULT: '#F5F0E8',
            50:      '#FDFCFA',
            100:     '#F5F0E8', // Primary light text on dark
            200:     '#E8E0D0',
            300:     '#D4C8B0',
            400:     '#B8A890',
            },

            // Neutral grays — secondary text, dividers
            slate: {
            DEFAULT: '#888888',
            900:     '#1A1A1A',
            800:     '#2D2D2D',
            700:     '#404040',
            600:     '#555555',
            500:     '#888888', // Muted text
            400:     '#AAAAAA',
            300:     '#CCCCCC',
            200:     '#E0E0E0',
            100:     '#F0F0F0',
            },

            // Semantic — keep minimal, used for status only
            success: '#2D7A4F',
            warning: '#C9972C', // Reuse gold
            error:   '#C0392B',
        },

        // ─── Typography ───────────────────────────────────────────────────────
        fontFamily: {
            // Display: used for headings, logo text, hero titles
            // Cormorant Garamond — elegant, authoritative, energy-sector premium
            display: ['var(--font-display)', 'Georgia', 'serif'],

            // Body: used for all UI, paragraphs, navigation
            // Outfit — modern, geometric, technical feel without being cold
            body: ['var(--font-body)', 'system-ui', 'sans-serif'],

            // Mono: used for data, metrics, technical values
            mono: ['var(--font-mono)', 'Consolas', 'monospace'],
        },

        fontSize: {
            // Display scale — for hero and section headings
            'display-2xl': ['clamp(3rem, 8vw, 6rem)',    { lineHeight: '1.05', letterSpacing: '-0.02em' }],
            'display-xl':  ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
            'display-lg':  ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
            'display-md':  ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.15' }],
            'display-sm':  ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.2' }],

            // Body scale
            'body-xl':  ['1.25rem', { lineHeight: '1.7' }],
            'body-lg':  ['1.125rem', { lineHeight: '1.7' }],
            'body-md':  ['1rem',    { lineHeight: '1.7' }],
            'body-sm':  ['0.875rem', { lineHeight: '1.6' }],
            'body-xs':  ['0.75rem',  { lineHeight: '1.5' }],

            // Label scale — navigation, badges, captions
            'label-lg': ['0.875rem', { lineHeight: '1', letterSpacing: '0.1em' }],
            'label-md': ['0.75rem',  { lineHeight: '1', letterSpacing: '0.12em' }],
            'label-sm': ['0.625rem', { lineHeight: '1', letterSpacing: '0.15em' }],
        },

        // ─── Spacing ──────────────────────────────────────────────────────────
        spacing: {
            // Section vertical rhythm
            'section-sm': '4rem',
            'section-md': '6rem',
            'section-lg': '8rem',
            'section-xl': '12rem',

            // Component spacing
            '18': '4.5rem',
            '22': '5.5rem',
            '26': '6.5rem',
            '30': '7.5rem',
            '34': '8.5rem',
        },

        // ─── Max Widths ───────────────────────────────────────────────────────
        maxWidth: {
            'site':    '1440px', // Maximum site width
            'content': '1200px', // Content container
            'prose':   '720px',  // Text-heavy content
            'narrow':  '560px',  // Narrow forms and focused content
        },

        // ─── Border Radius ────────────────────────────────────────────────────
        borderRadius: {
            'none': '0',
            'sm':   '2px',
            DEFAULT: '4px',
            'md':   '6px',
            'lg':   '8px',
            'xl':   '12px',
            '2xl':  '16px',
            // No "full" pill shapes — brand aesthetic is sharp/angular
        },

        // ─── Box Shadows ──────────────────────────────────────────────────────
        boxShadow: {
            // Gold glow — used for CTAs and active states
            'gold-sm':  '0 0 12px rgba(201, 151, 44, 0.15)',
            'gold-md':  '0 0 24px rgba(201, 151, 44, 0.2)',
            'gold-lg':  '0 0 48px rgba(201, 151, 44, 0.25)',

            // Elevation shadows on dark backgrounds
            'surface-sm': '0 1px 3px rgba(0, 0, 0, 0.4)',
            'surface-md': '0 4px 16px rgba(0, 0, 0, 0.5)',
            'surface-lg': '0 8px 32px rgba(0, 0, 0, 0.6)',

            // Inner shadow for inset cards
            'inset-gold': 'inset 0 1px 0 rgba(201, 151, 44, 0.15)',
        },

        // ─── Gradients (via backgroundImage) ─────────────────────────────────
        backgroundImage: {
            // Brand gold gradients — metallic effect
            'gold-linear':   'linear-gradient(135deg, #B8860B 0%, #D4A843 50%, #C9972C 100%)',
            'gold-radial':   'radial-gradient(ellipse at center, #D4A843 0%, #B8860B 100%)',
            'gold-shine':    'linear-gradient(105deg, #9A6F0A 0%, #E8C44A 45%, #C9972C 55%, #7A5808 100%)',

            // Background textures
            'dark-gradient': 'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
            'hero-gradient': 'radial-gradient(ellipse at 50% 0%, rgba(201,151,44,0.08) 0%, transparent 70%)',
            'section-fade':  'linear-gradient(180deg, transparent 0%, rgba(10,10,10,0.8) 100%)',

            // Subtle grid pattern for section backgrounds
            'grid-dark': `
            linear-gradient(rgba(201,151,44,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,151,44,0.03) 1px, transparent 1px)
            `,
        },

        backgroundSize: {
            'grid': '60px 60px',
        },

        // ─── Animations ───────────────────────────────────────────────────────
        keyframes: {
            // Fade in from bottom — used for hero content stagger
            'fade-up': {
            '0%':   { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
            },
            // Fade in — used for overlays and modals
            'fade-in': {
            '0%':   { opacity: '0' },
            '100%': { opacity: '1' },
            },
            // Gold shimmer — used on CTA buttons
            'shimmer': {
            '0%':   { backgroundPosition: '-200% center' },
            '100%': { backgroundPosition: '200% center' },
            },
            // Subtle pulse for loading states
            'pulse-gold': {
            '0%, 100%': { opacity: '1' },
            '50%':      { opacity: '0.5' },
            },
            // Line draw — for decorative gold dividers
            'line-draw': {
            '0%':   { width: '0%' },
            '100%': { width: '100%' },
            },
        },

        animation: {
            'fade-up':    'fade-up 0.6s ease-out forwards',
            'fade-up-d1': 'fade-up 0.6s ease-out 0.1s forwards',
            'fade-up-d2': 'fade-up 0.6s ease-out 0.2s forwards',
            'fade-up-d3': 'fade-up 0.6s ease-out 0.3s forwards',
            'fade-up-d4': 'fade-up 0.6s ease-out 0.4s forwards',
            'fade-in':    'fade-in 0.4s ease-out forwards',
            'shimmer':    'shimmer 2.5s linear infinite',
            'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
            'line-draw':  'line-draw 0.8s ease-out forwards',
        },

        // ─── Transitions ──────────────────────────────────────────────────────
        transitionDuration: {
            '250': '250ms',
            '350': '350ms',
            '400': '400ms',
        },

        transitionTimingFunction: {
            'brand': 'cubic-bezier(0.4, 0, 0.2, 1)',
            'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        },

        // ─── Z-Index Scale ────────────────────────────────────────────────────
        zIndex: {
            'base':    '0',
            'raised':  '10',
            'overlay': '20',
            'modal':   '30',
            'toast':   '40',
            'navbar':  '50',
        },
        },
    },

    plugins: [],
    }

    export default config