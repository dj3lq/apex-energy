    'use client'

    import { useState } from 'react'
    import { motion, AnimatePresence } from 'framer-motion'
    import { useScrollReveal } from '@/hooks/useScrollReveal'
    import { fadeUp, slideRight, staggerContainer, lineDraw } from '@/lib/motion'
    import type { ContactFormData } from '@/types'

    type FormState = 'idle' | 'loading' | 'success' | 'error'

    const initialData: ContactFormData = {
    name: '', email: '', company: '', phone: '', subject: '', message: '', website: '',
    }

    const faqs = [
    { q: 'Koliko košta inicijalna konsultacija?', a: 'Inicijalna konsultacija je besplatna i traje do 60 minuta. Tokom nje razgovaramo o vašem projektu i definišemo da li i kako možemo pomoći.' },
    { q: 'Koliko brzo možete početi sa projektom?', a: 'Obično možemo početi u roku od 1-2 sedmice od potpisa ugovora. Za hitne situacije, kontaktirajte nas direktno telefonom.' },
    { q: 'Da li radite i van Novog Sada?', a: 'Da, radimo na projektima u celoj Srbiji. Za duže angažmane van Novog Sada, troškovi puta su uključeni u ponudu.' },
    { q: 'Koje standarde i propise pokrivate?', a: 'Pokrivamo srpske tehničke propise, evrokodove, ISO 9001, ISO 14001, ISO 50001, i BIM standarde. Za specifične zahteve, javite nam se.' },
    { q: 'Kako izgleda tipičan ugovorni okvir?', a: 'Radimo na bazi fiksne cene (za jasno definisan obim) ili satne naknade (za savetodavne uloge). Svaki ugovor uključuje jasno definisane isporuke i rokove.' },
    { q: 'Da li pružate reference ranijih projekata?', a: 'Da, uz saglasnost klijenata možemo podeliti relevantne reference i studije slučaja tokom inicijalnog razgovora.' },
    ]

    const inputStyle: React.CSSProperties = {
    width: '100%', background: '#0A0A0A',
    border: '1px solid rgba(201,151,44,0.12)', borderRadius: '2px',
    padding: '14px 16px', color: '#F5F0E8', fontSize: '0.9rem',
    fontFamily: "'Outfit', sans-serif", fontWeight: 300,
    outline: 'none', transition: 'border-color 0.25s ease', boxSizing: 'border-box',
    }
    const labelStyle: React.CSSProperties = {
    display: 'block', color: '#8A8A8A', fontSize: '0.6rem', fontWeight: 500,
    letterSpacing: '0.16em', textTransform: 'uppercase',
    fontFamily: "'Outfit', sans-serif", marginBottom: '8px',
    }

    export default function ContactPageContent() {
    const [form,     setForm]     = useState<ContactFormData>(initialData)
    const [state,    setState]    = useState<FormState>('idle')
    const [errorMsg, setErrorMsg] = useState('')
    // Per-field messages returned by the server's Zod validation, keyed by
    // field name. Without these the user only sees "check your input" and has
    // no way to tell which field is wrong.
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
    const [openFaq,  setOpenFaq]  = useState<number | null>(null)

    const { ref: formRef, controls: formCtrl } = useScrollReveal(0.01)
    const { ref: faqRef,  controls: faqCtrl  } = useScrollReveal(0.01)
    const { ref: mapRef,  controls: mapCtrl  } = useScrollReveal(0.01)

    /** Renders the server's message for one field, if any. */
    const FieldError = ({ name }: { name: keyof ContactFormData }) => {
        const msg = fieldErrors[name]?.[0]
        if (!msg) return null
        return (
        <p id={`cp-${name}-error`} role="alert" style={{ color: '#e57373', fontSize: '0.75rem', fontFamily: "'Outfit', sans-serif", marginTop: '6px', marginBottom: 0 }}>
            {msg}
        </p>
        )
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.currentTarget.style.borderColor = 'rgba(201,151,44,0.45)'
    }
    const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.currentTarget.style.borderColor = 'rgba(201,151,44,0.12)'
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setState('loading')
        setErrorMsg('')
        setFieldErrors({})
        try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })

        // Parse defensively — an empty or non-JSON body must surface as a
        // normal error message rather than crashing with a JSON parse error.
        const raw = await res.text()
        let data: {
            success?: boolean
            error?: { message?: string; details?: Record<string, string[]> }
        } = {}
        try {
            data = raw ? JSON.parse(raw) : {}
        } catch {
            throw new Error('Server je vratio neočekivan odgovor. Molimo pokušajte ponovo.')
        }

        if (!res.ok || !data.success) {
            if (data.error?.details && typeof data.error.details === 'object') {
            setFieldErrors(data.error.details)
            }
            throw new Error(data.error?.message ?? 'Greška pri slanju.')
        }

        setState('success')
        setForm(initialData)
        } catch (err) {
        setState('error')
        setErrorMsg(err instanceof Error ? err.message : 'Došlo je do greške. Molimo pokušajte ponovo.')
        }
    }

    return (
        <>
        {/* ── Form + contact info ── */}
        <section style={{ padding: '7rem 0', background: '#0D0D0D', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,151,44,0.15), transparent)' }} aria-hidden="true"/>
            <style>{`
            .contact-page-grid { display: grid; grid-template-columns: 1fr; gap: 5rem; }
            @media (min-width: 1024px) { .contact-page-grid { grid-template-columns: 1fr 1.4fr; gap: 7rem; } }
            .contact-form-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
            @media (min-width: 560px) { .contact-form-grid { grid-template-columns: 1fr 1fr; } }
            `}</style>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="contact-page-grid">

                {/* Left: contact info */}
                <motion.div ref={formRef} initial="hidden" animate={formCtrl} variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <div>
                    <motion.div variants={lineDraw} style={{ height: '1px', width: '48px', background: '#C9972C', marginBottom: '1.5rem', transformOrigin: 'left' }}/>
                    <motion.h2 variants={fadeUp} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.1, marginBottom: '1.25rem' }}>
                    Direktan kontakt
                    </motion.h2>
                    <motion.p variants={fadeUp} style={{ color: '#8A8A8A', fontSize: '0.95rem', lineHeight: 1.8, fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                    Preferujete direktan razgovor? Dostupni smo telefonom i emailom tokom radnog vremena.
                    </motion.p>
                </div>

                <motion.address variants={staggerContainer} style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    {[
                    { label: 'Telefon', value: '+381 64 871 0990',     href: 'tel:+381648710990' },
                    { label: 'Email',   value: 'office@apexenergy.rs', href: 'mailto:office@apexenergy.rs' },
                    { label: 'Adresa',  value: 'Камењар 3/1\nNovi Sad, Srbija', href: 'https://maps.google.com?q=Novi+Sad' },
                    ].map(item => (
                    <motion.div key={item.label} variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <span style={{ color: '#5A5A5A', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>{item.label}</span>
                        <a href={item.href}
                        style={{ color: '#9A9A9A', fontSize: '1rem', fontFamily: "'Outfit', sans-serif", fontWeight: 300, transition: 'color 0.25s ease', textDecoration: 'none', whiteSpace: 'pre-line' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9972C'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#9A9A9A'}
                        {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                        {item.value}
                        </a>
                    </motion.div>
                    ))}
                </motion.address>

                {/* Hours */}
                <motion.div variants={fadeUp} style={{ padding: '2rem', background: '#111111', border: '1px solid rgba(201,151,44,0.08)', borderRadius: '2px' }}>
                    <p style={{ color: '#C9972C', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", marginBottom: '1.25rem' }}>Radno vreme</p>
                    {[
                    { day: 'Ponedeljak – Petak', hours: '09:00 – 18:00', active: true },
                    { day: 'Subota',             hours: '10:00 – 14:00', active: true },
                    { day: 'Nedelja',            hours: 'Zatvoreno',     active: false },
                    ].map(row => (
                    <div key={row.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid rgba(201,151,44,0.05)' }}>
                        <span style={{ color: '#8A8A8A', fontSize: '0.875rem', fontFamily: "'Outfit', sans-serif" }}>{row.day}</span>
                        <span style={{ color: row.active ? '#9A9A9A' : '#5A5A5A', fontSize: '0.875rem', fontFamily: "'Outfit', sans-serif" }}>{row.hours}</span>
                    </div>
                    ))}
                </motion.div>
                </motion.div>

                {/* Right: form */}
                <motion.div initial="hidden" animate={formCtrl} variants={slideRight}>
                <div style={{ background: '#111111', border: '1px solid rgba(201,151,44,0.10)', borderRadius: '2px', padding: 'clamp(2rem, 4vw, 3.5rem)' }}>
                    {state === 'success' ? (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '5rem 0', gap: '1.5rem' }}>
                        <div style={{ width: 56, height: 56, borderRadius: '2px', background: 'rgba(201,151,44,0.08)', border: '1px solid rgba(201,151,44,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9972C' }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <div>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: '1.75rem', marginBottom: '0.75rem' }}>Poruka poslata</h3>
                        <p style={{ color: '#8A8A8A', fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif", fontWeight: 300, maxWidth: '300px', lineHeight: 1.7 }}>Hvala. Kontaktiraćemo vas u najkraćem roku.</p>
                        </div>
                        <button type="button" onClick={() => setState('idle')}
                        style={{ color: '#C9972C', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", background: 'none', border: 'none', cursor: 'pointer', marginTop: '0.5rem' }}>
                        Pošaljite još jednu poruku
                        </button>
                    </motion.div>
                    ) : (
                    <form onSubmit={handleSubmit} noValidate style={{ position: 'relative' }}>
                        <div className="contact-form-grid" style={{ marginBottom: '1.25rem' }}>
                        <div>
                            <label htmlFor="cp-name" style={labelStyle}>Ime <span style={{ color: '#C9972C' }}>*</span></label>
                            <input id="cp-name" name="name" type="text" required autoComplete="name" value={form.name} onChange={handleChange} onFocus={onFocus} onBlur={onBlur} placeholder="Ime i prezime" style={inputStyle}/>
                            <FieldError name="name" />
                        </div>
                        <div>
                            <label htmlFor="cp-email" style={labelStyle}>Email <span style={{ color: '#C9972C' }}>*</span></label>
                            <input id="cp-email" name="email" type="email" required autoComplete="email" value={form.email} onChange={handleChange} onFocus={onFocus} onBlur={onBlur} placeholder="vas@email.rs" style={inputStyle}/>
                            <FieldError name="email" />
                        </div>
                        <div>
                            <label htmlFor="cp-company" style={labelStyle}>Kompanija</label>
                            <input id="cp-company" name="company" type="text" autoComplete="organization" value={form.company} onChange={handleChange} onFocus={onFocus} onBlur={onBlur} placeholder="Naziv kompanije" style={inputStyle}/>
                            <FieldError name="company" />
                        </div>
                        <div>
                            <label htmlFor="cp-phone" style={labelStyle}>Telefon</label>
                            <input id="cp-phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={handleChange} onFocus={onFocus} onBlur={onBlur} placeholder="+381 6X XXX XXXX" style={inputStyle}/>
                            <FieldError name="phone" />
                        </div>
                        </div>

                        <div style={{ marginBottom: '1.25rem' }}>
                        <label htmlFor="cp-subject" style={labelStyle}>Predmet <span style={{ color: '#C9972C' }}>*</span></label>
                        <input id="cp-subject" name="subject" type="text" required value={form.subject} onChange={handleChange} onFocus={onFocus} onBlur={onBlur} placeholder="O čemu se radi?" style={inputStyle}/>
                            <FieldError name="subject" />
                        </div>

                        <div style={{ marginBottom: '1.75rem' }}>
                        <label htmlFor="cp-message" style={labelStyle}>Poruka <span style={{ color: '#C9972C' }}>*</span></label>
                        <textarea id="cp-message" name="message" required rows={6} value={form.message} onChange={handleChange} onFocus={onFocus} onBlur={onBlur}
                            placeholder="Opišite vaš projekat ili pitanje..." style={{ ...inputStyle, resize: 'none', lineHeight: 1.7 }}/>
                        <FieldError name="message" />
                        </div>

                        {state === 'error' && (
                        <div role="alert" style={{ marginBottom: '1.25rem', padding: '12px 16px', border: '1px solid rgba(192,57,43,0.3)', background: 'rgba(192,57,43,0.06)', borderRadius: '2px' }}>
                            <p style={{ color: '#e57373', fontSize: '0.85rem', fontFamily: "'Outfit', sans-serif", margin: 0 }}>{errorMsg}</p>
                        </div>
                        )}

                        <button type="submit" disabled={state === 'loading'}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '16px', background: 'linear-gradient(135deg, #B8860B 0%, #D4A843 50%, #C9972C 100%)', color: '#0A0A0A', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", borderRadius: '2px', border: 'none', cursor: state === 'loading' ? 'not-allowed' : 'pointer', opacity: state === 'loading' ? 0.7 : 1, transition: 'opacity 0.2s' }}>
                        {state === 'loading' ? 'Slanje...' : 'Pošaljite poruku →'}
                        </button>

                        <p style={{ marginTop: '1rem', color: '#5A5A5A', fontSize: '0.75rem', textAlign: 'center', fontFamily: "'Outfit', sans-serif" }}>
                        Vaši podaci su zaštićeni i neće biti deljeni sa trećim stranama.
                        </p>
                    </form>
                    )}
                </div>
                </motion.div>
            </div>
            </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding: '7rem 0', background: '#0A0A0A', position: 'relative' }}>
            <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
            <style>{`
                .faq-layout { display: grid; grid-template-columns: 1fr; gap: 5rem; }
                @media (min-width: 1024px) { .faq-layout { grid-template-columns: 1fr 2fr; } }
            `}</style>
            <motion.div ref={faqRef} initial="hidden" animate={faqCtrl} variants={staggerContainer}>
                <div className="faq-layout">
                <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ height: '1px', width: '48px', background: '#C9972C' }}/>
                    <span style={{ color: '#C9972C', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>FAQ</span>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.1, margin: 0 }}>Česta pitanja</h2>
                    <p style={{ color: '#8A8A8A', fontSize: '0.875rem', lineHeight: 1.7, fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                    Ne vidite odgovor na vaše pitanje? Kontaktirajte nas direktno.
                    </p>
                </motion.div>

                <motion.div variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column' }}>
                    {faqs.map((faq, i) => (
                    <motion.div key={i} variants={fadeUp} style={{ borderBottom: '1px solid rgba(201,151,44,0.08)' }}>
                        <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        aria-expanded={openFaq === i}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1.75rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                        >
                        <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: openFaq === i ? '#C9972C' : '#F5F0E8', fontSize: '1.1rem', lineHeight: 1.3, transition: 'color 0.25s ease' }}>
                            {faq.q}
                        </span>
                        <span aria-hidden="true" style={{ color: '#C9972C', fontSize: '1.2rem', flexShrink: 0, transition: 'transform 0.3s ease', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)', display: 'inline-block' }}>+</span>
                        </button>
                        <AnimatePresence>
                        {openFaq === i && (
                            <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            style={{ overflow: 'hidden' }}
                            >
                            <p style={{ color: '#8A8A8A', fontSize: '0.9rem', lineHeight: 1.8, fontFamily: "'Outfit', sans-serif", fontWeight: 300, paddingBottom: '1.75rem', margin: 0 }}>
                                {faq.a}
                            </p>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </motion.div>
                    ))}
                </motion.div>
                </div>
            </motion.div>
            </div>
        </section>

        {/* ── Map ── */}
        <section style={{ padding: '0 0 7rem', background: '#0A0A0A' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
            <motion.div ref={mapRef} initial="hidden" animate={mapCtrl} variants={fadeUp}>
                <div style={{ marginBottom: '2rem' }}>
                <span style={{ color: '#C9972C', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", display: 'block', marginBottom: '0.5rem' }}>Lokacija</span>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', margin: 0 }}>
                    Камењар 3/1, Novi Sad
                </h2>
                </div>
                <div style={{ border: '1px solid rgba(201,151,44,0.10)', borderRadius: '2px', overflow: 'hidden', height: '400px' }}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2822.1!2d19.8335!3d45.2671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475b10613de0c61b%3A0x8b1ba08fc7adad3!2sNovi%20Sad!5e0!3m2!1ssr!2srs!4v1"
                    width="100%"
                    height="400"
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.4) brightness(0.85)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="APEX Energy lokacija — Novi Sad"
                />
                </div>
            </motion.div>
            </div>
        </section>
        </>
    )
    }