'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, Camera } from 'lucide-react'
import { PAST_EVENTS } from '@/lib/constants'

interface PastEventsProps {
  onViewPhotos: (eventId: string) => void
}

export function PastEvents({ onViewPhotos }: PastEventsProps) {
  if (PAST_EVENTS.length === 0) {
    return null
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {PAST_EVENTS.map((event, index) => {
        const thumbnailSrc = `${event.photoFolder}/${event.photos[0]}`

        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-amber-500/30 transition-colors"
          >
            {/* Thumbnail */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={thumbnailSrc}
                alt={event.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

              {/* Photo count badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 text-white text-sm">
                <Camera className="h-3.5 w-3.5" />
                <span>{event.photos.length}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-center gap-2 text-amber-400 text-sm mb-2">
                <Calendar className="h-4 w-4" />
                <span>{event.date}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {event.name}
              </h3>

              <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                {event.venue && event.venueUrl ? (
                  <>
                    {event.tagline.split('{venue}')[0]}
                    <a
                      href={event.venueUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      {event.venue}
                    </a>
                    {event.tagline.split('{venue}')[1]}
                  </>
                ) : (
                  event.tagline
                )}
              </p>

              <button
                onClick={() => onViewPhotos(event.id)}
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-medium text-sm group/btn"
              >
                <Camera className="h-4 w-4" />
                View Photos
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
