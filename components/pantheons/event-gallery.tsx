'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Calendar } from 'lucide-react'

interface EventPhotos {
  id: string
  name: string
  date: string
  photos: string[]
}

const EVENTS: EventPhotos[] = [
  {
    id: 'winter-2025',
    name: 'Winter Event',
    date: 'December 2025',
    photos: [
      // Preferred order
      '/images/events/winter-2025/optimized/ppWinter9.jpg',
      '/images/events/winter-2025/optimized/ppWinter2.jpg',
      '/images/events/winter-2025/optimized/ppWinter13.jpg',
      '/images/events/winter-2025/optimized/ppWinter15.jpg',
      '/images/events/winter-2025/optimized/ppWinter17.jpg',
      '/images/events/winter-2025/optimized/ppWinter18.jpg',
      '/images/events/winter-2025/optimized/ppWinter5.jpg',
      '/images/events/winter-2025/optimized/ppWinter7.jpg',
      // Remaining photos
      '/images/events/winter-2025/optimized/ppWinter1.jpg',
      '/images/events/winter-2025/optimized/ppWinter3.jpg',
      '/images/events/winter-2025/optimized/ppWinter4.jpg',
      '/images/events/winter-2025/optimized/ppWinter8.jpg',
      '/images/events/winter-2025/optimized/ppWinter10.jpg',
      '/images/events/winter-2025/optimized/ppWinter11.jpg',
      '/images/events/winter-2025/optimized/ppWinter12.jpg',
      '/images/events/winter-2025/optimized/ppWinter14.jpg',
      '/images/events/winter-2025/optimized/ppWinter16.jpg',
      '/images/events/winter-2025/optimized/ppWinter19.jpg',
    ],
  },
]

export function EventGallery() {
  const [selectedEvent, setSelectedEvent] = useState(EVENTS[0])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [direction, setDirection] = useState(0)

  const goToPrevious = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) =>
      prev === 0 ? selectedEvent.photos.length - 1 : prev - 1
    )
  }, [selectedEvent.photos.length])

  const goToNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) =>
      prev === selectedEvent.photos.length - 1 ? 0 : prev + 1
    )
  }, [selectedEvent.photos.length])

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

  const handleEventChange = useCallback((event: EventPhotos) => {
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

  return (
    <>
      <div className="space-y-6">
        {/* Event Selector - Ready for multiple events */}
        {EVENTS.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3">
            {EVENTS.map((event) => (
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
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={selectedEvent.photos[currentIndex]}
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
              {currentIndex + 1} / {selectedEvent.photos.length}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="mt-4 max-w-4xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-2 px-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {selectedEvent.photos.map((photo, index) => (
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
                key={currentIndex}
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
                  src={selectedEvent.photos[currentIndex]}
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
              {currentIndex + 1} / {selectedEvent.photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
