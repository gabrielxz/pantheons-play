'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Calendar } from 'lucide-react'
import { PAST_EVENTS } from '@/lib/constants'

interface EventGalleryProps {
  selectedEventId?: string | null
}

export function EventGallery({ selectedEventId }: EventGalleryProps) {
  // Transform PAST_EVENTS into gallery format
  const events = useMemo(() =>
    PAST_EVENTS.map(event => ({
      ...event,
      fullPhotos: event.photos.map(photo => `${event.photoFolder}/${photo}`)
    })),
    []
  )

  const [selectedEvent, setSelectedEvent] = useState(events[0])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [direction, setDirection] = useState(0)

  // Handle external event selection
  useEffect(() => {
    if (selectedEventId) {
      const event = events.find(e => e.id === selectedEventId)
      if (event && event.id !== selectedEvent.id) {
        setSelectedEvent(event)
        setCurrentIndex(0)
        setDirection(0)
      }
    }
  }, [selectedEventId, events, selectedEvent.id])

  const goToPrevious = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) =>
      prev === 0 ? selectedEvent.fullPhotos.length - 1 : prev - 1
    )
  }, [selectedEvent.fullPhotos.length])

  const goToNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) =>
      prev === selectedEvent.fullPhotos.length - 1 ? 0 : prev + 1
    )
  }, [selectedEvent.fullPhotos.length])

  const goToIndex = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }, [currentIndex])

  const openLightbox = useCallback(() => {
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const handleEventChange = useCallback((event: typeof events[0]) => {
    setSelectedEvent(event)
    setCurrentIndex(0)
    setDirection(0)
  }, [])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">No event photos yet. Check back after our next event!</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {/* Event Selector - Shows when multiple events */}
        {events.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3">
            {events.map((event) => (
              <button
                key={event.id}
                onClick={() => handleEventChange(event)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedEvent.id === event.id
                    ? 'bg-amber-500 text-slate-900'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                {event.name}
              </button>
            ))}
          </div>
        )}

        {/* Current Event Label */}
        <div className="flex items-center justify-center gap-2 text-amber-400">
          <Calendar className="h-4 w-4" />
          <span className="font-medium">{selectedEvent.name}</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">{selectedEvent.date}</span>
        </div>

        {/* Main Carousel */}
        <div className="relative">
          {/* Main Image Container */}
          <div
            className="relative aspect-[16/10] md:aspect-[16/9] max-w-4xl mx-auto rounded-2xl overflow-hidden bg-slate-900 cursor-pointer group"
            onClick={openLightbox}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${selectedEvent.id}-${currentIndex}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={selectedEvent.fullPhotos[currentIndex]}
                  alt={`${selectedEvent.name} photo ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                  priority={currentIndex === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
                Click to enlarge
              </span>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Photo Counter */}
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60 text-white text-sm font-medium">
              {currentIndex + 1} / {selectedEvent.fullPhotos.length}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="mt-4 max-w-4xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-2 px-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {selectedEvent.fullPhotos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-200 ${
                    index === currentIndex
                      ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-950 scale-105'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={photo}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Next photo"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`lightbox-${selectedEvent.id}-${currentIndex}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="relative w-full h-full max-w-7xl max-h-[90vh] mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedEvent.fullPhotos[currentIndex]}
                  alt={`${selectedEvent.name} photo ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white font-medium">
              {currentIndex + 1} / {selectedEvent.fullPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
