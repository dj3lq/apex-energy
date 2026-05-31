    'use client'

    import { motion } from 'framer-motion'
    import { useScrollReveal } from '@/hooks/useScrollReveal'
    import { fadeUp, staggerContainer, staggerFast, lineDraw } from '@/lib/motion'

    const team = [
    { name: 'Milan Nikolić',   role: 'Direktor projekata',      specialty: 'Inženjersko savetovanje',       bio: 'Više od 10 godina iskustva u vođenju infrastrukturnih i građevinskih projekata. Specijalizovan za planiranje, nadzor i tehničko savetovanje.', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
    { name: 'Jovana Stanković',role: 'Inženjer građevine',       specialty: 'BIM / CAD ekspertiza',          bio: 'Stručnjak za projektovanje i modelovanje u BIM-u, sa fokusom na konstrukcione projekte i optimalnu koordinaciju između projektantskih disciplina.', image: 'https://randomuser.me/api/portraits/women/70.jpg' },
    { name: 'Stefan Ilić',     role: 'Inženjer elektroenergetike', specialty: 'Elektro sistemi i automatizacija', bio: 'Iskustvo u projektovanju elektroenergetskih sistema, automatizaciji postrojenja i preventivnom održavanju. Optimizacija energetske potrošnje.', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Maja Popović',    role: 'Stručnjak za održivost',  specialty: 'Energetska efikasnost',         bio: 'Fokus na energetske auditne procene, obnovljive izvore i implementaciju održivih rešenja. Podrška u licenciranju i usklađivanju sa standardima.', image: 'https://randomuser.me/api/portraits/women/50.jpg' },
    ]

    export default function TeamSection() {
    const { ref: headRef, controls: headCtrl } = useScrollReveal()
    const { ref: gridRef, controls: gridCtrl } = useScrollReveal(0.05)

    return (
        <section id="team" aria-labelledby="team-heading" className="relative py-32 bg-[#0A0A0A]">

        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10">

            {/* Header */}
            <motion.div ref={headRef} initial="hidden" animate={headCtrl} variants={staggerContainer} className="mb-20">
            <motion.div variants={lineDraw} className="h-px w-12 mb-5 origin-left" style={{ background: '#C9972C' }} />
            <motion.span variants={fadeUp} style={{ color: '#C9972C', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", display: 'block', marginBottom: '1.25rem' }}>
                Tim
            </motion.span>
            <motion.h2
                id="team-heading"
                variants={fadeUp}
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', lineHeight: 1.08, fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
            >
                Upoznajte naš tim
            </motion.h2>
            </motion.div>

            {/* Team grid */}
            <motion.div
            ref={gridRef}
            initial="hidden"
            animate={gridCtrl}
            variants={staggerFast}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
            {team.map((member) => (
                <motion.article
                key={member.name}
                variants={fadeUp}
                className="group flex flex-col"
                style={{ background: '#0D0D0D', border: '1px solid rgba(201,151,44,0.08)', borderRadius: '2px', overflow: 'hidden', transition: 'border-color 0.3s ease' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,151,44,0.22)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,151,44,0.08)'}
                >
                {/* Photo area */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '1/1', background: '#111111' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                    src={member.image}
                    alt={`${member.name}`}
                    className="w-full h-full object-cover"
                    style={{ filter: 'grayscale(30%) contrast(1.05)', transition: 'transform 0.6s ease, filter 0.4s ease' }}
                    loading="lazy"
                    onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(0%) contrast(1.05)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(30%) contrast(1.05)' }}
                    />
                    {/* Gold overlay line at bottom of photo */}
                    <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,151,44,0.4), transparent)' }} />
                </div>

                {/* Info */}
                <div style={{ padding: '1.5rem' }} className="flex flex-col gap-3 flex-1">
                    <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: '1.15rem', marginBottom: '0.25rem' }}>
                        {member.name}
                    </h3>
                    <p style={{ color: '#C9972C', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", marginBottom: '0.15rem' }}>
                        {member.role}
                    </p>
                    <p style={{ color: '#404040', fontSize: '0.75rem', fontFamily: "'Outfit', sans-serif" }}>
                        {member.specialty}
                    </p>
                    </div>
                    <p style={{ color: '#555555', fontSize: '0.8rem', lineHeight: 1.7, fontFamily: "'Outfit', sans-serif", fontWeight: 300, flex: 1 }}>
                    {member.bio}
                    </p>
                </div>
                </motion.article>
            ))}
            </motion.div>
        </div>
        </section>
    )
    }