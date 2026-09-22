    import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
    import { NextResponse } from 'next/server'
    import type { NextRequest } from 'next/server'

    /**
     * Apex Energy — Authentication Middleware
     *
     * Uses Clerk's middleware to protect routes on the server edge.
     * All route protection logic lives here — not in individual page components.
     *
     * Route strategy:
     * - Public routes:    accessible without authentication
     * - Protected routes: redirect to /sign-in if not authenticated
     * - Admin routes:     require authenticated user with admin role
     *
     * Security principles:
     * - Default-deny: routes not explicitly listed as public are protected
     * - Session validation happens at the edge — before any page code runs
     * - No authentication logic in client components
     */

    // ─── Public Routes ──────────────────────────────────────────────────────────
    //
    // These routes are accessible without authentication.
    // Be conservative — only add routes that genuinely need to be public.
    //
    const isPublicRoute = createRouteMatcher([
    '/',                        // Homepage
    '/about(.*)',               // About pages
    '/services(.*)',            // Services pages
    '/contact',                 // Contact page
    '/api/contact',             // Contact form submission endpoint
    '/api/health',              // Health check — used by uptime monitoring
    '/sign-in(.*)',             // Clerk sign-in pages
    '/sign-up(.*)',             // Clerk sign-up pages
    '/privacy',                 // Privacy policy (GDPR requirement)
    '/terms',                   // Terms of service
    ])

    // ─── Admin Routes ───────────────────────────────────────────────────────────
    //
    // Routes that require the user to have the 'admin' role.
    // Role is set in Clerk Dashboard → Users → Metadata.
    //
    const isAdminRoute = createRouteMatcher([
    '/dashboard/admin(.*)',
    '/api/admin(.*)',
    ])

    // ─── Middleware ──────────────────────────────────────────────────────────────
    export default clerkMiddleware(async (auth, request: NextRequest) => {
    const { userId, sessionClaims } = await auth()

    // Allow public routes without authentication check
    if (isPublicRoute(request)) {
        return NextResponse.next()
    }

    // Redirect unauthenticated users to sign-in
    if (!userId) {
        const signInUrl = new URL('/sign-in', request.url)
        // Preserve the intended destination for post-login redirect
        signInUrl.searchParams.set('redirect_url', request.url)
        return NextResponse.redirect(signInUrl)
    }

    // Admin route protection — check for admin role in session metadata
    if (isAdminRoute(request)) {
        const role = (sessionClaims?.metadata as Record<string, unknown>)?.role
        if (role !== 'admin') {
        // Return 403 for admin routes rather than redirecting
        // This prevents information leakage about admin route existence
        return new NextResponse('Forbidden', { status: 403 })
        }
    }

    return NextResponse.next()
    })

    // ─── Middleware Matcher ──────────────────────────────────────────────────────
    //
    // Controls which paths the middleware runs on.
    // Exclude static assets and Next.js internals for performance.
    //
    export const config = {
    matcher: [
        /*
        * Match all request paths EXCEPT:
        * - _next/static  (static files)
        * - _next/image   (image optimisation)
        * - favicon.ico   (favicon)
        * - public files  (anything with a file extension in /public)
        */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|pdf|txt|xml|json|html|webmanifest)$).*)',
    ],
    }