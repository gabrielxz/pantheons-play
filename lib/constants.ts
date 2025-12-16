// lib/constants.ts
export const SITE_CONFIG = {
  name: 'Pantheons Play',
  description: 'Challenge Your Mind. Find Your People.',
  tagline: 'Pantheons Play is a series of game days in Charlotte where we use the magic of tabletop games to have serious fun, build a vibrant community, and explore big ideas together.',
  email: 'contact@pantheonsplay.com',
  social: {
    twitter: '@pantheonsplay',
    instagram: '@pantheonsplay',
  }
}

// Event types
export interface PastEvent {
  id: string
  name: string
  date: string
  tagline: string
  venue?: string
  venueUrl?: string
  photoFolder: string
  photos: string[]
}

export interface UpcomingEvent {
  name: string
  date: string
  location: string
  locationUrl: string
  registrationUrl: string
  highlights: string[]
}

// Past events (newest first)
export const PAST_EVENTS: PastEvent[] = [
  {
    id: 'winter-2025',
    name: 'Winter Event',
    date: 'December 2025',
    tagline: 'We hosted our debut event at {venue}! Lots of open gaming and a talk on LLMs & humor.',
    venue: 'VisArt Video',
    venueUrl: 'https://visartvideo.org/',
    photoFolder: '/images/events/winter-2025/optimized',
    photos: [
      'ppWinter9.jpg',
      'ppWinter2.jpg',
      'ppWinter13.jpg',
      'ppWinter15.jpg',
      'ppWinter17.jpg',
      'ppWinter18.jpg',
      'ppWinter5.jpg',
      'ppWinter7.jpg',
      'ppWinter1.jpg',
      'ppWinter3.jpg',
      'ppWinter4.jpg',
      'ppWinter8.jpg',
      'ppWinter10.jpg',
      'ppWinter11.jpg',
      'ppWinter12.jpg',
      'ppWinter14.jpg',
      'ppWinter16.jpg',
      'ppWinter19.jpg',
    ],
  },
]

// Next upcoming event (null if none scheduled)
export const NEXT_EVENT: UpcomingEvent | null = null

// Legacy export for compatibility
export const EVENT_CONFIG = {
  title: 'Coming Soon',
  date: 'TBD',
  time: 'TBD',
  location: 'TBD',
  locationUrl: '',
  ctaLabel: 'Join the Next Event',
  registrationUrl: '',
}

export const IMAGE_PATHS = {
  game: '/images/game.png', // Update with your actual image paths
  grow: '/images/grow.png',
  give: '/images/give.png',
  logo: '/images/logo.png',
}

export const NAVIGATION_ITEMS = [
  { label: 'Next Event', href: '#event' },
  { label: 'Our Values', href: '#values' },
  { label: 'Past Events', href: '#past-events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
] as const

export const TILE_CONFIG = [
  {
    id: 'game',
    title: 'Game',
    tagline: 'Play Boldly',
    subtitle: 'We curate modern tabletop adventures, from welcoming gateway games to deep strategic challenges. This is a space for friendly competition, shared stories, and the joy of a well-played game.',
    image: IMAGE_PATHS.game,
    color: 'from-amber-500/20 to-orange-500/10',
  },
  {
    id: 'grow',
    title: 'Grow',
    tagline: 'Level Up Together',
    subtitle: 'More than just a game night, we are a space for curious learners. Our gatherings feature member-led talks, panels, and deep discussions, creating a forum to explore big ideas and learn from each other.',
    image: IMAGE_PATHS.grow,
    color: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    id: 'give',
    title: 'Give',
    tagline: 'Share the Win',
    subtitle: 'We believe in extending our positive spirit beyond the game table. Passionate about our city, we connect members with meaningful opportunities to support local Charlotte causes and make a real impact together.',
    image: IMAGE_PATHS.give,
    color: 'from-purple-500/20 to-pink-500/10',
  },
] as const