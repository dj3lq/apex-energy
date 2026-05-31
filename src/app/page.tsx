import type { Metadata } from 'next'
import Navbar          from '@/components/layout/Navbar'
import Footer          from '@/components/layout/Footer'
import SplashScreen    from '@/components/layout/SplashScreen'
import LogoDivider     from '@/components/layout/LogoDivider'
import HeroSection     from '@/components/sections/HeroSection'
import AboutSection    from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProcessSection  from '@/components/sections/ProcessSection'
import TeamSection     from '@/components/sections/TeamSection'
import ContactSection  from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'APEX Energy — Inženjersko savetovanje i energetska rešenja, Novi Sad',
  description:
    'APEX energy DOO nudi prvoklasno inženjersko savetovanje, BIM, energetsku efikasnost ' +
    'i upravljanje projektima za preduzeća u Novom Sadu i Srbiji.',
}

export default function HomePage() {
  return (
    <>
      <SplashScreen />
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <a href="#main-content" className="sr-only focus:not-sr-only fixed top-4 left-4 z-[100] px-4 py-2 rounded-sm bg-gold-500 text-black-950 label-tag">
          Preskoči na sadržaj
        </a>

        <HeroSection />
        <LogoDivider />
        <AboutSection />
        <LogoDivider />
        <ServicesSection />
        <LogoDivider />
        <ProcessSection />
        <LogoDivider />
        <TeamSection />
        <LogoDivider />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}