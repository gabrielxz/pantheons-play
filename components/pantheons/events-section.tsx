'use client'

import { useState, useCallback } from 'react'
import { PastEvents } from './past-events'
import { EventGallery } from './event-gallery'
import { SectionDivider } from './section-divider'
import { PAST_EVENTS } from '@/lib/constants'

export function EventsSection() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)

  const handleViewPhotos = useCallback((eventId: string) => {
    setSelectedEventId(eventId)
    // Scroll to gallery section
    const gallerySection = document.getElementById('gallery')
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  // Don't render if no past events
  if (PAST_EVENTS.length === 0) {
    return null
  }

  return (
    <>
      {/* Past Events Section */}
      <section id="past-events" className="relative py-20 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Past Events
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A look back at our previous gatherings and the memories we&apos;ve made together.
            </p>
          </div>

          <PastEvents onViewPhotos={handleViewPhotos} />
        </div>
      </section>

      {/* Divider */}
      <SectionDivider variant="sparkles-swords" />

      {/* Gallery Section */}
      <section id="gallery" className="relative py-20 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Photo Gallery
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Browse photos from our events. Click any image to view it larger.
            </p>
          </div>

          <EventGallery selectedEventId={selectedEventId} />
        </div>
      </section>
    </>
  )
}
