    import { z } from 'zod'

    /**
     * Apex Energy — Contact Form Validation Schema
     *
     * Used by both the API route (server-side enforcement)
     * and can be reused client-side for instant feedback.
     *
     * Security notes:
     * - All string fields are trimmed to prevent whitespace-only submissions
     * - Max lengths mirror the database VarChar constraints in schema.prisma
     * - Email is validated by Zod's built-in RFC-compliant checker
     * - Phone is optional but constrained if provided
     * - `website` is the honeypot — must be empty string on real submissions
     */
    export const contactFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2,   { message: 'Ime mora imati najmanje 2 karaktera.' })
        .max(100, { message: 'Ime ne sme biti duže od 100 karaktera.' }),

    email: z
        .string()
        .trim()
        .email({ message: 'Unesite ispravnu email adresu.' })
        .max(254, { message: 'Email adresa je predugačka.' }),

    company: z
        .string()
        .trim()
        .max(100, { message: 'Naziv kompanije ne sme biti duži od 100 karaktera.' })
        .optional()
        .or(z.literal('')),

    phone: z
        .string()
        .trim()
        .max(30, { message: 'Broj telefona ne sme biti duži od 30 karaktera.' })
        .regex(/^[+\d\s\-().]*$/, { message: 'Broj telefona sadrži nedozvoljene karaktere.' })
        .optional()
        .or(z.literal('')),

    subject: z
        .string()
        .trim()
        .min(3,   { message: 'Predmet mora imati najmanje 3 karaktera.' })
        .max(200, { message: 'Predmet ne sme biti duži od 200 karaktera.' }),

    message: z
        .string()
        .trim()
        .min(10,  { message: 'Poruka mora imati najmanje 10 karaktera.' })
        .max(5000, { message: 'Poruka ne sme biti duža od 5000 karaktera.' }),

    // Honeypot — bots fill this in, humans leave it empty
    // Must be present in schema but must be empty string
    website: z
        .string()
        .max(0, { message: 'Nevažeći zahtev.' })
        .optional()
        .or(z.literal('')),
    })

    export type ContactFormInput = z.infer<typeof contactFormSchema>