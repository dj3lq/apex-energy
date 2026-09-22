    import Image from 'next/image'

    /**
     * Single source of truth for rendering the APEX logo.
     *
     * next/image generates a resized WebP/AVIF for each declared size and serves
     * the format the browser accepts, so the 730 KB source PNG is never sent
     * as-is.
     *
     * Sizing: both width and height are set explicitly, in the attributes AND in
     * style. Setting only height in CSS and leaving width as 'auto' makes Next
     * warn that one dimension was changed without the other, and — for lazy
     * images — leaves the browser without a reserved box before load, which
     * causes layout shift (CLS).
     */

    const SRC = '/apex-logo.png'

    // Intrinsic dimensions of public/apex-logo.png (sips -g pixelWidth -g pixelHeight).
    const INTRINSIC_WIDTH  = 1507
    const INTRINSIC_HEIGHT = 1044

    type LogoVariant = 'navbar' | 'footer' | 'splash' | 'divider' | 'watermark'

    interface LogoProps {
    variant: LogoVariant
    /** Rendered height in px. Width follows from the aspect ratio. */
    height: number
    className?: string
    style?: React.CSSProperties
    }

    export default function Logo({ variant, height, className, style }: LogoProps) {
    const width = Math.round(height * (INTRINSIC_WIDTH / INTRINSIC_HEIGHT))

    // The navbar logo is above the fold on every page — the only one worth
    // preloading. Everything else waits its turn.
    const isPriority = variant === 'navbar'

    // Decorative instances get an empty alt so screen readers don't announce
    // "APEX Energy" several times per page.
    const isDecorative = variant === 'watermark' || variant === 'divider'

    return (
        <Image
        src={SRC}
        alt={isDecorative ? '' : 'APEX Energy'}
        aria-hidden={isDecorative || undefined}
        width={width}
        height={height}
        priority={isPriority}
        loading={isPriority ? undefined : 'lazy'}
        sizes={`${width}px`}
        // The watermark renders at 4% opacity in greyscale — detail is wasted bytes.
        quality={variant === 'watermark' ? 40 : 82}
        className={className}
        style={{
            width:  `${width}px`,
            height: `${height}px`,
            maxWidth: '100%',
            objectFit: 'contain',
            display: 'block',
            ...style,
        }}
        />
    )
    }