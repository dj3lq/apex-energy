    import { NextResponse } from 'next/server'

    /**
     * GET /api/health
     *
     * Simple health check endpoint for uptime monitoring (UptimeRobot, etc).
     * Returns 200 when the app is running.
     * Does not expose internal details or environment info.
     */
    export async function GET(): Promise<NextResponse> {
    return NextResponse.json(
        { status: 'ok', timestamp: new Date().toISOString() },
        { status: 200 },
    )
    }