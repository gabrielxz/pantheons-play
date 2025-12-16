// app/page.tsx
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/pantheons/navigation'
import { HeroSection } from '@/components/pantheons/hero-section'
import { NewsletterSection } from '@/components/pantheons/newsletter-section'
import { Starfield } from '@/components/pantheons/starfield'
import { SectionDivider } from '@/components/pantheons/section-divider'
import { EventGallery } from '@/components/pantheons/event-gallery'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} - ${SITE_CONFIG.description}`,
  description: SITE_CONFIG.tagline,
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Starfield />
      <Navigation />
      
      <main>
        <HeroSection />
        
        {/* Divider */}
        <SectionDivider variant="sparkles-swords" />

        {/* Gallery Section */}
        <section id="gallery" className="relative py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Past Events Gallery
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Memories from our previous gatherings. Join us to create new ones!
              </p>
            </div>

            <EventGallery />
          </div>
        </section>

        {/* Divider */}
        <SectionDivider variant="single-trophy" />

        {/* Give Spotlight Section */}
        <section id="give" className="relative py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="relative bg-gradient-to-br from-purple-900/20 via-purple-950/30 to-slate-900/40 backdrop-blur-sm rounded-3xl border-2 border-purple-400/30 p-8 md:p-12 shadow-2xl">
              {/* Decorative corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-purple-400/40"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-purple-400/40"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-purple-400/40"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-purple-400/40"></div>
              
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent mb-6">
                  Sharing the Win: Our Community Impact
                </h2>
                
                <p className="text-lg text-purple-100/80 max-w-3xl mx-auto mb-10 leading-relaxed">
                  As a new organization, our journey of giving back is just beginning. We&apos;re building the foundation 
                  to support amazing local causes in Charlotte with every event we host. Watch this space as our 
                  fellowship grows and we begin making a real impact together.
                </p>
                
                {/* Donation Tracker */}
                <div className="inline-block">
                  <div className="bg-gradient-to-br from-purple-500/20 to-amber-500/20 backdrop-blur-sm rounded-2xl border border-purple-400/40 p-8">
                    <p className="text-sm uppercase tracking-wider text-purple-300 mb-3 font-semibold">
                      Total Raised for Local Organizations
                    </p>
                    <div className="text-5xl font-bold bg-gradient-to-r from-purple-300 to-amber-300 bg-clip-text text-transparent">
                      $0.0 Billion Dollars
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider variant="trophy-crown" />

        {/* Contact Section */}
        <section id="contact" className="relative py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Get in Touch
              </h2>
              <p className="text-slate-300 mb-8">
                Have questions about our events? Want to partner with us? We&apos;d love to hear from you.
              </p>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
              >
                {SITE_CONFIG.email}
              </a>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider variant="single-dice" />

        <NewsletterSection />
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <Image 
                src="/PP_logo.svg" 
                alt="Pantheons Play Logo"
                width={28}
                height={28}
                style={{
                  filter: 'brightness(0) saturate(100%) invert(71%) sepia(98%) saturate(1168%) hue-rotate(6deg) brightness(100%) contrast(96%)'
                }}
              />
              <span className="font-semibold">{SITE_CONFIG.name}</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <Link href="/privacy" className="hover:text-slate-300 transition-colors">
                Privacy Policy
              </Link>
              <span>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}