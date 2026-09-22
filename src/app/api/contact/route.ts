    import { NextRequest, NextResponse } from 'next/server'
    import { Resend }                    from 'resend'
    import { Ratelimit }                 from '@upstash/ratelimit'
    import { Redis }                     from '@upstash/redis'
    import { contactFormSchema }         from '@/lib/validators/contact'
    import { buildNotificationEmail }    from '@/lib/email'
    import type { ApiResponse }          from '@/types'

    /**
     * Apex Energy — POST /api/contact
     *
     * Handles contact form submissions with:
     * 1. JSON parsing with error handling
     * 2. Honeypot bot detection (website field must be empty)
     * 3. IP-based rate limiting (5 requests per hour per IP)
     * 4. Zod input validation (server-side, never trust client)
     * 5. Email notification via Resend
     * 6. Secure error responses (no stack traces in production)
     *
     * Security principles:
     * - Rate limit keyed on IP to prevent abuse
     * - All user input is validated and sanitised before use
     * - Errors never expose internal implementation details
     * - No database write yet — add Prisma logging in Phase 2
     */

    // ── Lazy-initialised clients ─────────────────────────────────────────────────
    // Validated at runtime so missing env vars fail loudly.

    function getResend(): Resend {
    const key = process.env.RESEND_API_KEY
    if (!key) throw new Error('RESEND_API_KEY is not configured')
    return new Resend(key)
    }

    function getRatelimit(): Ratelimit {
    const url   = process.env.UPSTASH_REDIS_REST_URL
    const token = process.env.UPSTASH_REDIS_REST_TOKEN
    if (!url || !token) throw new Error('Upstash Redis is not configured')

    return new Ratelimit({
        redis:     Redis.fromEnv(),
        // 5 submissions per hour per IP — generous for real users, strict for bots
        limiter:   Ratelimit.slidingWindow(5, '1 h'),
        analytics: false,
        prefix:    'apex:contact',
    })
    }

    // ── Helper: get client IP ─────────────────────────────────────────────────────
    function getClientIp(req: NextRequest): string {
    return (
        req.headers.get('cf-connecting-ip') ??
        req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
        'unknown'
    )
    }

    // ── Helper: safe error response ───────────────────────────────────────────────
    function errorResponse(
    code:    string,
    message: string,
    status:  number,
    details?: unknown,
    ): NextResponse<ApiResponse> {
    const isDev = process.env.NEXT_PUBLIC_ENV !== 'production'
    return NextResponse.json(
        {
        success: false,
        error: {
            code,
            message,
            // Only expose internal details in development
            ...(isDev && details ? { details } : {}),
        },
        } satisfies ApiResponse,
        { status },
    )
    }

    // ── Route handler ─────────────────────────────────────────────────────────────
    export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
    // 1. Parse JSON body
    let body: unknown
    try {
        body = await req.json()
    } catch {
        return errorResponse('INVALID_JSON', 'Nevažeći format zahteva.', 400)
    }

    // 2. Honeypot check — bots fill in the hidden `website` field.
    //    Checked before rate limiting to avoid spending Upstash quota on bots.
    if (
        body !== null &&
        typeof body === 'object' &&
        'website' in body &&
        (body as Record<string, unknown>).website !== '' &&
        (body as Record<string, unknown>).website !== undefined
    ) {
        // Logged so a false positive (e.g. browser autofill hitting the field)
        // is visible in the server logs instead of failing silently.
        console.warn('[contact] Honeypot triggered — submission discarded')
        // Return 200 so a bot can't tell it was caught.
        return NextResponse.json({ success: true } satisfies ApiResponse, { status: 200 })
    }

    // 3. Rate limiting — keyed on IP
    let ratelimit: Ratelimit | null = null
    try {
        ratelimit = getRatelimit()
    } catch {
        // Without Upstash (e.g. local dev) keep accepting submissions rather
        // than blocking legitimate users.
        console.warn('[contact] Honeypot triggered — value:', JSON.stringify((body as Record<string, unknown>).website))
    }

    if (ratelimit) {
        const ip = getClientIp(req)
        const { success, limit, remaining, reset } = await ratelimit.limit(ip)

        if (!success) {
        const retryAfter = Math.ceil((reset - Date.now()) / 1000)
        return NextResponse.json(
            {
            success: false,
            error: {
                code:    'RATE_LIMITED',
                message: `Previše zahteva. Pokušajte ponovo za ${Math.ceil(retryAfter / 60)} minuta.`,
            },
            } satisfies ApiResponse,
            {
            status:  429,
            headers: {
                'Retry-After':           String(retryAfter),
                'X-RateLimit-Limit':     String(limit),
                'X-RateLimit-Remaining': String(remaining),
                'X-RateLimit-Reset':     String(reset),
            },
            },
        )
        }
    }

    // 4. Validate input with Zod
    const parsed = contactFormSchema.safeParse(body)
    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors
        return NextResponse.json(
        {
            success: false,
            error: {
            code:    'VALIDATION_ERROR',
            message: 'Proverite unesene podatke i pokušajte ponovo.',
            // Field-level errors contain no internal info, so they're safe to return.
            details: errors,
            },
        } satisfies ApiResponse,
        { status: 422 },
        )
    }

    const data = parsed.data

    // 5. Send notification email
    const toEmail   = process.env.EMAIL_TO
    const fromEmail = process.env.EMAIL_FROM

    if (!toEmail || !fromEmail) {
        console.error('[contact] EMAIL_TO or EMAIL_FROM env vars not configured')
        return errorResponse(
        'CONFIG_ERROR',
        'Email servis nije konfigurisan. Molimo kontaktirajte nas direktno.',
        500,
        )
    }

    const { subject, html, text } = buildNotificationEmail(data)

    try {
        const resend = getResend()
        const { error } = await resend.emails.send({
        from:    `APEX Energy <${fromEmail}>`,
        to:      [toEmail],
        replyTo: data.email,
        subject,
        html,
        text,
        })

        if (error) {
        console.error('[contact] Resend error:', error)
        return errorResponse(
            'EMAIL_ERROR',
            'Poruka nije mogla biti poslata. Molimo pokušajte ponovo.',
            500,
            error,
        )
        }
    } catch (err) {
        console.error('[contact] Unexpected email error:', err)
        return errorResponse(
        'EMAIL_ERROR',
        'Poruka nije mogla biti poslata. Molimo pokušajte ponovo.',
        500,
        err,
        )
    }

    // 6. Success
    return NextResponse.json({ success: true } satisfies ApiResponse, { status: 200 })
    }

    // Reject all other HTTP methods
    export async function GET(): Promise<NextResponse> {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
    }