    'use client'

    import { motion } from 'framer-motion'
    import { useScrollReveal } from '@/hooks/useScrollReveal'
    import { fadeUp, staggerContainer, lineDraw } from '@/lib/motion'

    const steps = [
    { number: '01', title: 'Uspostavljanje okvira projekta', description: 'U saradnji sa klijentom definišemo obim, ciljeve i okvir odgovornosti. Izrađujemo detaljan plan projekta i ugovorni okvir prilagođen srpskom zakonodavstvu.' },
    { number: '02', title: 'Prikupljanje i analiza podataka', description: 'Sprovodimo tehničko i regulatorno prikupljanje podataka. Analiziramo zahteve klijenta, regulatorne uslove i identifikujemo ključne pokazatelje performansi.' },
    { number: '03', title: 'Izrada rešenja i modela', description: 'Razvijamo inženjerske koncepte, CAD modele i tehničke specifikacije. Proveravamo usklađenost sa lokalnim propisima i industrijskim standardima.' },
    { number: '04', title: 'Implementacija i praćenje', description: 'Pratimo implementaciju na terenu i obezbeđujemo tehničku podršku. Generišemo periodične izveštaje o napretku, kvalitetu i usklađenosti.' },
    ]

    export default function ProcessSection() {
    const { ref, controls } = useScrollReveal(0.05)

    return (
        <section id="process" aria-labelledby="process-heading" className="relative py-32 bg-[#0D0D0D]">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,151,44,0.15), transparent)' }} />

        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10">
            <motion.div ref={ref} initial="hidden" animate={controls} variants={staggerContainer}>

            {/* Header row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-end">
                <div>
                <motion.div variants={lineDraw} className="h-px w-12 mb-5 origin-left" style={{ background: '#C9972C' }} />
                <motion.span variants={fadeUp} style={{ color: '#C9972C', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", display: 'block', marginBottom: '1.25rem' }}>
                    Proces
                </motion.span>
                <motion.h2
                    id="process-heading"
                    variants={fadeUp}
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', lineHeight: 1.08, fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
                >
                    Kako radimo
                </motion.h2>
                </div>
                <motion.p variants={fadeUp} style={{ color: '#666666', fontSize: '1rem', lineHeight: 1.8, fontFamily: "'Outfit', sans-serif", fontWeight: 300, maxWidth: '420px' }}>
                Sistematičan pristup koji garantuje transparentnost, kvalitet i merljive rezultate u svakoj fazi projekta.
                </motion.p>
            </div>

            {/* Steps — horizontal on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                {steps.map((step, i) => (
                <motion.div
                    key={step.number}
                    variants={fadeUp}
                    className="relative group"
                    style={{ padding: '2.5rem 2rem', borderLeft: i === 0 ? '1px solid rgba(201,151,44,0.12)' : 'none', borderRight: '1px solid rgba(201,151,44,0.12)', borderTop: '1px solid rgba(201,151,44,0.12)', borderBottom: '1px solid rgba(201,151,44,0.12)' }}
                >
                    {/* Top progress bar fill on hover */}
                    <div className="absolute top-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full" style={{ background: '#C9972C' }} />

                    {/* Number */}
                    <div className="mb-8">
                    <span style={{ color: '#1A1A1A', fontSize: '3.5rem', fontWeight: 600, fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: 1, userSelect: 'none' }}>
                        {step.number}
                    </span>
                    </div>

                    {/* Title */}
                    <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: '1.15rem', lineHeight: 1.3, marginBottom: '1rem' }}>
                    {step.title}
                    </h3>

                    {/* Description */}
                    <p style={{ color: '#555555', fontSize: '0.875rem', lineHeight: 1.75, fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                    {step.description}
                    </p>

                    {/* Step connector arrow (not on last) */}
                    {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-3 h-3 rotate-45" style={{ background: '#0D0D0D', border: '1px solid rgba(201,151,44,0.2)', borderLeft: 'none', borderBottom: 'none' }} aria-hidden="true" />
                    )}
                </motion.div>
                ))}
            </div>

            </motion.div>
        </div>
        </section>
    )
    }