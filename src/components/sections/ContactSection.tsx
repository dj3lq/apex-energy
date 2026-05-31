    'use client'

    import { useState } from 'react'
    import { motion } from 'framer-motion'
    import { useScrollReveal } from '@/hooks/useScrollReveal'
    import { fadeUp, slideRight, staggerContainer, lineDraw } from '@/lib/motion'   
    import type { ContactFormData } from '@/types'

    type FormState = 'idle' | 'loading' | 'success' | 'error'

    const initialData: ContactFormData = {
    name: '', email: '', company: '', phone: '', subject: '', message: '', website: '',
    }

    const contactDetails = [
    { label: 'Telefon', value: '+381 64 871 0990',     href: 'tel:+381648710990' },
    { label: 'Email',   value: 'office@apexenergy.rs', href: 'mailto:office@apexenergy.rs' },
    { label: 'Adresa',  value: 'Камењар 3 1, Novi Sad, Srbija', href: 'https://maps.google.com?q=NOVI+SAD+КАМЕЊАР+3+1' },
    ]

    export default function ContactSection() {
    const [form,     setForm]     = useState<ContactFormData>(initialData)
    const [state,    setState]    = useState<FormState>('idle')
    const [errorMsg, setErrorMsg] = useState('')

    const { ref: leftRef,  controls: leftCtrl  } = useScrollReveal(0.01)
    const { ref: rightRef, controls: rightCtrl } = useScrollReveal(0.01)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.currentTarget.style.borderColor = 'rgba(201,151,44,0.45)'
    }
    const onBlur  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.currentTarget.style.borderColor = 'rgba(201,151,44,0.12)'
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setState('loading')
        setErrorMsg('')
        try {
        const res  = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        const data = await res.json()
        if (!res.ok || !data.success) throw new Error(data.error?.message ?? 'Greška pri slanju.')
        setState('success')
        setForm(initialData)
        } catch (err) {
        setState('error')
        setErrorMsg(err instanceof Error ? err.message : 'Došlo je do greške. Molimo pokušajte ponovo.')
        }
    }

    const inputBase: React.CSSProperties = {
        width: '100%', background: '#0A0A0A',
        border: '1px solid rgba(201,151,44,0.12)', borderRadius: '2px',
        padding: '14px 16px', color: '#F5F0E8', fontSize: '0.9rem',
        fontFamily: "'Outfit', sans-serif", fontWeight: 300,
        outline: 'none', transition: 'border-color 0.25s ease', boxSizing: 'border-box',
    }
    const labelBase: React.CSSProperties = {
        display: 'block', color: '#555555', fontSize: '0.6rem', fontWeight: 500,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        fontFamily: "'Outfit', sans-serif", marginBottom: '8px',
    }

    return (
        <section id="contact" aria-labelledby="contact-heading" style={{ position: 'relative', padding: '8rem 0', background: '#0D0D0D' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,151,44,0.15), transparent)' }} aria-hidden="true" />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.3, backgroundImage: `linear-gradient(rgba(201,151,44,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,151,44,0.04) 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />

        {/* Responsive grid via CSS */}
        <style>{`
            .contact-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
            }
            @media (min-width: 1024px) {
            .contact-grid {
                grid-template-columns: 1fr 1fr;
                gap: 6rem;
            }
            }
            .form-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.25rem;
            }
            @media (min-width: 640px) {
            .form-grid {
                grid-template-columns: 1fr 1fr;
            }
            }
        `}</style>

        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem' }}>
            <div className="contact-grid">

            {/* ── Left: info ── */}
            <motion.div ref={leftRef} initial="hidden" animate={leftCtrl} variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <div>
                <motion.div variants={lineDraw} style={{ height: '1px', width: '48px', background: '#C9972C', marginBottom: '1.25rem', transformOrigin: 'left' }} />
                <motion.span variants={fadeUp} style={{ color: '#C9972C', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", display: 'block', marginBottom: '1.25rem' }}>
                    Kontakt
                </motion.span>
                <motion.h2 id="contact-heading" variants={fadeUp} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', lineHeight: 1.08, fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', marginBottom: '1.5rem' }}>
                    Započnite razgovor
                </motion.h2>
                <motion.p variants={fadeUp} style={{ color: '#666666', fontSize: '1rem', lineHeight: 1.8, fontFamily: "'Outfit', sans-serif", fontWeight: 300, maxWidth: '380px' }}>
                    Rado ćemo odgovoriti na vaša pitanja i zakazati konsultaciju prilagođenu vašem projektu.
                </motion.p>
                </div>

                {/* Contact details */}
                <motion.address variants={staggerContainer} style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {contactDetails.map(item => (
                    <motion.div key={item.label} variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ color: '#333333', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>{item.label}</span>
                    <a href={item.href} style={{ color: '#888888', fontSize: '0.95rem', fontFamily: "'Outfit', sans-serif", fontWeight: 300, transition: 'color 0.25s ease', textDecoration: 'none' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9972C'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#888888'}
                        {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                        {item.value}
                    </a>
                    </motion.div>
                ))}
                </motion.address>

                {/* Hours */}
                <motion.div variants={fadeUp}>
                <span style={{ color: '#333333', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", display: 'block', marginBottom: '1rem' }}>Radno vreme</span>
                {[
                    { day: 'Ponedeljak – Petak', hours: '09:00 – 18:00' },
                    { day: 'Subota',             hours: '10:00 – 14:00' },
                    { day: 'Nedelja',            hours: 'Zatvoreno' },
                ].map(row => (
                    <div key={row.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid rgba(201,151,44,0.06)' }}>
                    <span style={{ color: '#555555', fontSize: '0.875rem', fontFamily: "'Outfit', sans-serif" }}>{row.day}</span>
                    <span style={{ color: row.hours === 'Zatvoreno' ? '#333333' : '#888888', fontSize: '0.875rem', fontFamily: "'Outfit', sans-serif" }}>{row.hours}</span>
                    </div>
                ))}
                </motion.div>
            </motion.div>

            {/* ── Right: form ── */}
            <motion.div ref={rightRef} initial="hidden" animate={rightCtrl} variants={slideRight}>
                <div style={{ background: '#111111', border: '1px solid rgba(201,151,44,0.10)', borderRadius: '2px', padding: 'clamp(1.5rem, 4vw, 3rem)' }}>
                {state === 'success' ? (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '5rem 0', gap: '1.5rem' }}>
                    <div style={{ width: 56, height: 56, borderRadius: '2px', background: 'rgba(201,151,44,0.08)', border: '1px solid rgba(201,151,44,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9972C' }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: '1.75rem', marginBottom: '0.75rem' }}>Poruka poslata</h3>
                        <p style={{ color: '#666666', fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif", fontWeight: 300, maxWidth: '300px', lineHeight: 1.7 }}>Hvala na poruci. Kontaktiraćemo vas u najkraćem mogućem roku.</p>
                    </div>
                    <button type="button" onClick={() => setState('idle')}
                        style={{ color: '#C9972C', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", background: 'none', border: 'none', cursor: 'pointer', marginTop: '0.5rem' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#E8C44A'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#C9972C'}>
                        Pošaljite još jednu poruku
                    </button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} noValidate aria-label="Kontakt forma">
                    <input type="text" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }} />

                    <div className="form-grid" style={{ marginBottom: '1.25rem' }}>
                        <div>
                        <label htmlFor="name" style={labelBase}>Ime <span style={{ color: '#C9972C' }}>*</span></label>
                        <input id="name" name="name" type="text" required autoComplete="name" value={form.name} onChange={handleChange} onFocus={onFocus} onBlur={onBlur} placeholder="Ime i prezime" style={inputBase} />
                        </div>
                        <div>
                        <label htmlFor="email" style={labelBase}>Email <span style={{ color: '#C9972C' }}>*</span></label>
                        <input id="email" name="email" type="email" required autoComplete="email" value={form.email} onChange={handleChange} onFocus={onFocus} onBlur={onBlur} placeholder="vas@email.rs" style={inputBase} />
                        </div>
                        <div>
                        <label htmlFor="company" style={labelBase}>Kompanija</label>
                        <input id="company" name="company" type="text" autoComplete="organization" value={form.company} onChange={handleChange} onFocus={onFocus} onBlur={onBlur} placeholder="Naziv kompanije" style={inputBase} />
                        </div>
                        <div>
                        <label htmlFor="phone" style={labelBase}>Telefon</label>
                        <input id="phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={handleChange} onFocus={onFocus} onBlur={onBlur} placeholder="+381 6X XXX XXXX" style={inputBase} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label htmlFor="subject" style={labelBase}>Predmet <span style={{ color: '#C9972C' }}>*</span></label>
                        <input id="subject" name="subject" type="text" required value={form.subject} onChange={handleChange} onFocus={onFocus} onBlur={onBlur} placeholder="O čemu se radi?" style={inputBase} />
                    </div>

                    <div style={{ marginBottom: '1.75rem' }}>
                        <label htmlFor="message" style={labelBase}>Poruka <span style={{ color: '#C9972C' }}>*</span></label>
                        <textarea id="message" name="message" required rows={6} value={form.message} onChange={handleChange}
                        onFocus={e => e.currentTarget.style.borderColor = 'rgba(201,151,44,0.45)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(201,151,44,0.12)'}
                        placeholder="Opišite vaš projekat ili pitanje..."
                        style={{ ...inputBase, resize: 'none', lineHeight: 1.7 }} />
                    </div>

                    {state === 'error' && (
                        <div role="alert" style={{ marginBottom: '1.25rem', padding: '12px 16px', border: '1px solid rgba(192,57,43,0.3)', background: 'rgba(192,57,43,0.06)', borderRadius: '2px' }}>
                        <p style={{ color: '#e57373', fontSize: '0.85rem', fontFamily: "'Outfit', sans-serif", margin: 0 }}>{errorMsg}</p>
                        </div>
                    )}

                    <button type="submit" disabled={state === 'loading'} aria-busy={state === 'loading'}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '16px', background: 'linear-gradient(135deg, #B8860B 0%, #D4A843 50%, #C9972C 100%)', color: '#0A0A0A', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", borderRadius: '2px', border: 'none', cursor: state === 'loading' ? 'not-allowed' : 'pointer', opacity: state === 'loading' ? 0.7 : 1, transition: 'opacity 0.2s ease' }}
                        onMouseEnter={e => { if (state !== 'loading') (e.currentTarget as HTMLElement).style.opacity = '0.88' }}
                        onMouseLeave={e => { if (state !== 'loading') (e.currentTarget as HTMLElement).style.opacity = '1' }}>
                        {state === 'loading' ? (
                        <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Slanje...</>
                        ) : (
                        <>Pošaljite poruku <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
                        )}
                    </button>
                    <p style={{ marginTop: '1rem', color: '#333333', fontSize: '0.75rem', textAlign: 'center', fontFamily: "'Outfit', sans-serif" }}>Vaši podaci su zaštićeni. Nećemo ih deliti sa trećim stranama.</p>
                    </form>
                )}
                </div>
            </motion.div>
            </div>
        </div>
        </section>
    )
    }