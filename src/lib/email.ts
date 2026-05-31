    import type { ContactFormInput } from '@/lib/validators/contact'

    /**
     * Apex Energy — Email Templates
     *
     * Returns HTML and plain-text versions of notification emails.
     * Plain text is required for deliverability and accessibility.
     *
     * Security notes:
     * - All user-provided values are HTML-escaped before insertion
     * - No raw HTML from user input is ever rendered
     * - No external resources loaded in email (tracking pixel free)
     */

    // Escape HTML to prevent injection in email body
    function esc(str: string): string {
    return str
        .replace(/&/g,  '&amp;')
        .replace(/</g,  '&lt;')
        .replace(/>/g,  '&gt;')
        .replace(/"/g,  '&quot;')
        .replace(/'/g,  '&#039;')
    }

    export function buildNotificationEmail(data: ContactFormInput): {
    html:    string
    text:    string
    subject: string
    } {
    const subject = `Nova poruka: ${data.subject}`

    // ── Plain text version ───────────────────────────────────────────────────
    const text = `
    Nova poruka putem kontakt forme — APEX Energy

    Od:       ${data.name}
    Email:    ${data.email}
    ${data.company ? `Kompanija: ${data.company}\n` : ''}${data.phone ? `Telefon:   ${data.phone}\n` : ''}
    Predmet:  ${data.subject}

    Poruka:
    ${data.message}

    ---
    Primljeno putem apexenergy.rs kontakt forme
    `.trim()

    // ── HTML version ─────────────────────────────────────────────────────────
    const html = `
    <!DOCTYPE html>
    <html lang="sr">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(subject)}</title>
    </head>
    <body style="margin:0;padding:0;background:#0A0A0A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:40px 20px;">
        <tr>
        <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

            <!-- Header -->
            <tr>
                <td style="padding:0 0 32px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                    <td style="border-bottom:1px solid #1A1A1A;padding-bottom:24px;">
                        <span style="color:#C9972C;font-size:11px;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;">
                        APEX ENERGY
                        </span>
                        <p style="margin:8px 0 0;color:#555555;font-size:12px;">
                        Nova poruka putem kontakt forme
                        </p>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>

            <!-- Subject -->
            <tr>
                <td style="padding:0 0 24px;">
                <h1 style="margin:0;color:#F5F0E8;font-size:22px;font-weight:500;line-height:1.3;">
                    ${esc(data.subject)}
                </h1>
                </td>
            </tr>

            <!-- Sender info -->
            <tr>
                <td style="background:#111111;border:1px solid #1E1E1E;border-radius:4px;padding:24px;margin-bottom:24px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                    <td style="padding:0 0 12px;">
                        <span style="color:#555555;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;">Od</span>
                        <p style="margin:4px 0 0;color:#F5F0E8;font-size:15px;font-weight:500;">${esc(data.name)}</p>
                    </td>
                    </tr>
                    <tr>
                    <td style="padding:0 0 12px;border-top:1px solid #1A1A1A;padding-top:12px;">
                        <span style="color:#555555;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;">Email</span>
                        <p style="margin:4px 0 0;">
                        <a href="mailto:${esc(data.email)}" style="color:#C9972C;font-size:14px;text-decoration:none;">${esc(data.email)}</a>
                        </p>
                    </td>
                    </tr>
                    ${data.company ? `
                    <tr>
                    <td style="padding:0 0 12px;border-top:1px solid #1A1A1A;padding-top:12px;">
                        <span style="color:#555555;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;">Kompanija</span>
                        <p style="margin:4px 0 0;color:#CCCCCC;font-size:14px;">${esc(data.company)}</p>
                    </td>
                    </tr>` : ''}
                    ${data.phone ? `
                    <tr>
                    <td style="border-top:1px solid #1A1A1A;padding-top:12px;">
                        <span style="color:#555555;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;">Telefon</span>
                        <p style="margin:4px 0 0;">
                        <a href="tel:${esc(data.phone)}" style="color:#C9972C;font-size:14px;text-decoration:none;">${esc(data.phone)}</a>
                        </p>
                    </td>
                    </tr>` : ''}
                </table>
                </td>
            </tr>

            <!-- Spacer -->
            <tr><td style="height:16px;"></td></tr>

            <!-- Message -->
            <tr>
                <td style="background:#111111;border:1px solid #1E1E1E;border-radius:4px;padding:24px;">
                <span style="color:#555555;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;display:block;margin-bottom:12px;">Poruka</span>
                <p style="margin:0;color:#CCCCCC;font-size:14px;line-height:1.8;white-space:pre-wrap;">${esc(data.message)}</p>
                </td>
            </tr>

            <!-- Reply CTA -->
            <tr>
                <td style="padding:24px 0 0;text-align:center;">
                <a href="mailto:${esc(data.email)}?subject=Re: ${esc(data.subject)}"
                    style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#B8860B,#D4A843,#C9972C);color:#0A0A0A;font-size:12px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;border-radius:2px;">
                    Odgovorite
                </a>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td style="padding:32px 0 0;border-top:1px solid #1A1A1A;margin-top:32px;">
                <p style="margin:0;color:#333333;font-size:11px;text-align:center;">
                    Primljeno putem <a href="https://apexenergy.rs" style="color:#555555;">apexenergy.rs</a> kontakt forme
                </p>
                </td>
            </tr>

            </table>
        </td>
        </tr>
    </table>
    </body>
    </html>
    `.trim()

    return { subject, html, text }
    }