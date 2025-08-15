// lib/constants.ts
export const SITE_CONFIG = {
  name: 'Pantheons Play',
  description: 'Challenge Your Mind. Find Your People.',
  tagline: 'Pantheons Play is a series of game days in Charlotte where we use the magic of tabletop games to have serious fun, build a vibrant community, and explore big ideas together.',
  email: 'hello@pantheonsplay.com',
  social: {
    twitter: '@pantheonsplay',
    instagram: '@pantheonsplay',
  }
}

export const EVENT_CONFIG = {
  title: 'Pantheons Play: Winter Gathering',
  date: 'December 2025', // Update when confirmed
  time: 'TBD',
  location: 'VisArt, Charlotte, NC',
  ctaLabel: 'Join the Next Event',
  registrationUrl: '#', // Replace with actual registration link
}

export const IMAGE_PATHS = {
  game: '/images/game.png', // Update with your actual image paths
  grow: '/images/grow.png',
  give: '/images/give.png',
  logo: '/images/logo.png',
}

export const NAVIGATION_ITEMS = [
  { label: 'Next Event', href: '#event' },
  { label: 'Our Values', href: '#event' },
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