    /**
     * Apex Energy — Shared TypeScript Types
     *
     * Central type definitions used across the application.
     * Import from this file: import type { ... } from '@/types'
     */

    // ─── Navigation ──────────────────────────────────────────────────────────────

    export interface NavItem {
    label:    string
    href:     string
    external?: boolean
    children?: NavItem[]
    }

    // ─── Services ────────────────────────────────────────────────────────────────

    export type ServiceCategory =
    | 'solar'
    | 'wind'
    | 'storage'
    | 'infrastructure'
    | 'smart-systems'
    | 'consulting'

    export interface Service {
    id:          ServiceCategory
    title:       string
    description: string
    href:        string
    icon:        string  // Name reference for icon component
    }

    // ─── Contact Form ────────────────────────────────────────────────────────────

    export interface ContactFormData {
    name:        string
    email:       string
    company?:    string
    phone?:      string
    subject:     string
    message:     string
    // Honeypot field — must be empty on legitimate submissions
    website?:    string
    }

    export interface ContactFormResponse {
    success: boolean
    message: string
    // Only present on validation errors
    errors?: Record<string, string[]>
    }

    // ─── API Responses ────────────────────────────────────────────────────────────

    export interface ApiSuccess<T = void> {
    success: true
    data?:   T
    }

    export interface ApiError {
    success: false
    error: {
        code:    string
        message: string
        // Only included in development environment
        details?: unknown
    }
    }

    export type ApiResponse<T = void> = ApiSuccess<T> | ApiError

    // ─── User / Auth ──────────────────────────────────────────────────────────────

    export type UserRole = 'admin' | 'client' | 'viewer'

    export interface UserMetadata {
    role:       UserRole
    companyId?: string
    onboarded:  boolean
    }

    // ─── Dashboard ────────────────────────────────────────────────────────────────

    export interface EnergyMetric {
    label:     string
    value:     number
    unit:      string
    change?:   number   // Percentage change vs previous period
    trend?:    'up' | 'down' | 'stable'
    }

    // ─── SEO / Metadata ───────────────────────────────────────────────────────────

    export interface PageSEO {
    title:       string
    description: string
    canonical?:  string
    noIndex?:    boolean
    }

    // ─── Utility Types ────────────────────────────────────────────────────────────

    /** Make specific keys of T required */
    export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>

    /** Make specific keys of T optional */
    export type PartialFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

    /** Unwrap a Promise type */
    export type Awaited<T> = T extends Promise<infer U> ? U : T