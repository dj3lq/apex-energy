    'use client'

    import { motion } from 'framer-motion'
    import { useScrollReveal } from '@/hooks/useScrollReveal'
    import { fadeUp, staggerContainer, lineDraw } from '@/lib/motion'

    const team = [
    { name: 'Milan Nikolić',    role: 'Direktor projekata',       specialty: 'Inženjersko savetovanje',        bio: 'Više od 10 godina iskustva u vođenju infrastrukturnih i građevinskih projekata. Specijalizovan za planiranje, nadzor i tehničko savetovanje u skladu sa lokalnim propisima i industrijskim standardima.', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
    { name: 'Jovana Stanković', role: 'Inženjer građevine',        specialty: 'BIM / CAD ekspertiza',           bio: 'Stručnjak za projektovanje i modelovanje u BIM-u, sa fokusom na konstrukcione projekte i optimalnu koordinaciju između projektantskih disciplina. Iskusna u primeni Autodesk platformi.', image: 'https://randomuser.me/api/portraits/women/70.jpg' },
    { name: 'Stefan Ilić',      role: 'Inženjer elektroenergetike', specialty: 'Elektro sistemi i automatizacija', bio: 'Iskustvo u projektovanju elektroenergetskih sistema, automatizaciji postrojenja i preventivnom održavanju. Posvećen optimizaciji energetske potrošnje i implementaciji sigurnosnih standarda.', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Maja Popović',     role: 'Stručnjak za održivost',   specialty: 'Energetska efikasnost & ISO',     bio: 'Fokus na energetske auditne procene, obnovljive izvore i implementaciju održivih rešenja. Iskustvo u pripremi dokumentacije za ISO 50001 sertifikaciju i usklađivanju sa standardima.', image: 'https://randomuser.me/api/portraits/women/50.jpg' },
    ]

    export default function AboutTeam() {
    const { ref: headRef, controls: headCtrl } = useScrollReveal(0.1)
    const { ref: gridRef, controls: gridCtrl } = useScrollReveal(0.05)

    return (
        <section aria-labelledby="team-page-heading" style={{ padding: '8rem 0', background: '#0D0D0D', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,151,44,0.15), transparent)' }} aria-hidden="true"/>

        <style>{`
            .team-page-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            }
            @media (min-width: 640px)  { .team-page-grid { grid-template-columns: 1fr 1fr; } }
            @media (min-width: 1024px) { .team-page-grid { grid-template-columns: repeat(4, 1fr); } }
            .team-photo { filter: grayscale(25%) contrast(1.05); transition: filter 0.5s ease, transform 0.6s ease; }
            .team-photo:hover { filter: grayscale(0%) contrast(1.05); transform: scale(1.04); }
        `}</style>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2.5rem' }}>

            {/* Header */}
            <motion.div ref={headRef} initial="hidden" animate={headCtrl} variants={staggerContainer} style={{ marginBottom: '5rem' }}>
            <motion.div variants={lineDraw} style={{ height: '1px', width: '48px', background: '#C9972C', marginBottom: '1.5rem', transformOrigin: 'left' }}/>
            <motion.span variants={fadeUp} style={{ color: '#C9972C', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", display: 'block', marginBottom: '1.5rem' }}>
                Tim
            </motion.span>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                <motion.h2 id="team-page-heading" variants={fadeUp} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.1, margin: 0 }}>
                Ljudi koji stoje iza svakog projekta
                </motion.h2>
                <motion.p variants={fadeUp} style={{ color: '#555555', fontSize: '0.9rem', lineHeight: 1.7, fontFamily: "'Outfit', sans-serif", fontWeight: 300, maxWidth: '360px', margin: 0 }}>
                Svaki član tima donosi specijalizovano znanje i višegodišnje iskustvo na terenu.
                </motion.p>
            </div>
            </motion.div>

            {/* Team grid */}
            <motion.div ref={gridRef} initial="hidden" animate={gridCtrl} variants={staggerContainer} className="team-page-grid">
            {team.map((member) => (
                <motion.article key={member.name} variants={fadeUp}
                style={{ background: '#0A0A0A', border: '1px solid rgba(201,151,44,0.08)', borderRadius: '2px', overflow: 'hidden', transition: 'border-color 0.3s ease' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,151,44,0.22)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,151,44,0.08)'}
                >
                {/* Photo */}
                <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: '#111111', position: 'relative' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={member.image} alt={member.name} className="team-photo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy"/>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,151,44,0.3), transparent)' }}/>
                </div>

                {/* Info */}
                <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#F5F0E8', fontSize: '1.15rem', marginBottom: '0.3rem' }}>{member.name}</h3>
                    <p style={{ color: '#C9972C', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif", marginBottom: '0.2rem' }}>{member.role}</p>
                    <p style={{ color: '#333333', fontSize: '0.75rem', fontFamily: "'Outfit', sans-serif", marginBottom: '1rem' }}>{member.specialty}</p>
                    <p style={{ color: '#555555', fontSize: '0.8rem', lineHeight: 1.75, fontFamily: "'Outfit', sans-serif", fontWeight: 300, margin: 0 }}>{member.bio}</p>
                </div>
                </motion.article>
            ))}
            </motion.div>
        </div>
        </section>
    )
    }