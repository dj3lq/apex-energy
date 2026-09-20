    import Image from 'next/image'


    const SRC = '/apex-logo.png'

    // Intrinsic dimensions of the source file. next/image needs the aspect ratio
    // to reserve layout space and avoid cumulative layout shift.
    // TODO: adjust if the real file differs — run:
    //   sips -g pixelWidth -g pixelHeight public/apex-logo.JPG
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

    // Only the navbar logo is above the fold on every page — it is the one
    // worth preloading. Everything else waits its turn.
    const isPriority = variant === 'navbar'

    // Decorative instances get an empty alt so screen readers skip them
    // rather than announcing "APEX Energy" five times per page.
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
        // Tell the browser the real rendered size so it downloads the right
        // variant instead of the largest one.
        sizes={`${width}px`}
        // The watermark is blurred to 4% opacity and greyscaled — detail is
        // wasted bytes. Drop quality hard; nobody can tell.
        quality={variant === 'watermark' ? 40 : 82}
        className={className}
        style={{
            height: `${height}px`,
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
            ...style,
        }}
        />
    )
    }