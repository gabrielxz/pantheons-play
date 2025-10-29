'use client'

import { motion } from 'framer-motion'
import { CalendarDays, MapPin, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ImageTiles } from './image-tiles'
import { SectionDivider } from './section-divider'
import { SITE_CONFIG, EVENT_CONFIG } from '@/lib/constants'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section 1: Main heading and tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            <span className="text-white">Challenge Your Mind. Find Your </span>
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              People
            </span>
          </h1>
          
          <p className="mt-6 text-lg text-slate-300 max-w-3xl mx-auto">
            {SITE_CONFIG.tagline}
          </p>
        </motion.div>

        {/* Thematic Divider */}
        <SectionDivider variant="single-dice" />

        {/* Section 2: Our Values */}
        <motion.div
          id="values"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-16 scroll-mt-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Our Values
            </h2>
          </div>
          <ImageTiles />
        </motion.div>

        {/* Thematic Divider */}
        <SectionDivider variant="dice-gamepad" />

        {/* Section 3: Our Next Gathering */}
        <motion.div
          id="event"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="max-w-5xl mx-auto scroll-mt-20"
        >
          {/* Event announcement with refined styling */}
          <div className="relative bg-gradient-to-br from-amber-900/20 via-amber-950/30 to-slate-900/40 backdrop-blur-sm rounded-3xl border-2 border-amber-400/30 p-8 md:p-12 shadow-2xl">
            {/* Decorative corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-amber-400/40"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-amber-400/40"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-amber-400/40"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-amber-400/40"></div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left side - Event details */}
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent mb-3">
                  Our Next Gathering
                </h3>
                <p className="text-amber-100/80 mb-6 text-lg">
                  Join us for a unique evening of play, conversation, and community.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-amber-100/90 justify-center md:justify-start">
                    <CalendarDays className="h-5 w-5 text-amber-400" />
                    <span className="font-medium">{EVENT_CONFIG.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-amber-100/90 justify-center md:justify-start">
                    <MapPin className="h-5 w-5 text-amber-400" />
                    <Link 
                      href={EVENT_CONFIG.locationUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium hover:text-amber-300 transition-colors underline decoration-amber-400/30 hover:decoration-amber-400/60"
                    >
                      {EVENT_CONFIG.location}
                    </Link>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold group w-full md:w-auto shadow-lg luma-checkout--button"
                  asChild
                >
                  <a
                    href={EVENT_CONFIG.registrationUrl}
                    data-luma-action="checkout"
                    data-luma-event-id="evt-Yxjn5BdqBFFnsXB"
                  >
                    Secure Your Seat at the Table
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>

              {/* Right side - Event highlights */}
              <div className="order-first md:order-last">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-amber-400 mb-5">Event Highlights</h4>
                  
                  <div className="flex items-start gap-3 group">
                    <div className="mt-1.5 w-2 h-2 rotate-45 bg-amber-400 group-hover:scale-125 transition-transform flex-shrink-0" />
                    <p className="text-amber-100/80">
                      Universe & Science Girl Podcast: Carri & Shirin perform a live episode of their podcast.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3 group">
                    <div className="mt-1.5 w-2 h-2 rotate-45 bg-emerald-400 group-hover:scale-125 transition-transform flex-shrink-0" />
                    <p className="text-amber-100/80">
                      Open gaming featuring a curated library of modern board game classics and hidden gems.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3 group">
                    <div className="mt-1.5 w-2 h-2 rotate-45 bg-purple-400 group-hover:scale-125 transition-transform flex-shrink-0" />
                    <p className="text-amber-100/80">
                      A unique mythology-themed challenge with &apos;Charon&apos;s Coin&apos;
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3 group">
                    <div className="mt-1.5 w-2 h-2 rotate-45 bg-cyan-400 group-hover:scale-125 transition-transform flex-shrink-0" />
                    <p className="text-amber-100/80">
                      Our trademark Sasquatch-Free Environment™.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}