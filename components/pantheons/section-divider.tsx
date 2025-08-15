'use client'

import { motion } from 'framer-motion'
import { Dices, Gamepad2, Trophy, Sparkles, Crown, Swords } from 'lucide-react'

type DividerVariant = 'dice-gamepad' | 'trophy-crown' | 'sparkles-swords' | 'single-dice' | 'single-trophy'

interface SectionDividerProps {
  variant?: DividerVariant
  className?: string
}

export function SectionDivider({ variant = 'dice-gamepad', className = '' }: SectionDividerProps) {
  const renderDivider = () => {
    switch (variant) {
      case 'dice-gamepad':
        return (
          <>
            <div className="h-px w-32 bg-gradient-to-r from-transparent to-amber-400/30" />
            <Dices className="h-12 w-12 text-amber-400/40 rotate-12" />
            <div className="w-3 h-3 rounded-full bg-amber-400/30" />
            <Gamepad2 className="h-12 w-12 text-amber-400/40 -rotate-12" />
            <div className="h-px w-32 bg-gradient-to-l from-transparent to-amber-400/30" />
          </>
        )
      
      case 'trophy-crown':
        return (
          <>
            <div className="h-px w-28 bg-gradient-to-r from-transparent to-purple-400/25" />
            <Trophy className="h-10 w-10 text-purple-400/40" />
            <div className="w-2 h-2 rotate-45 bg-purple-400/30" />
            <Crown className="h-10 w-10 text-amber-400/40" />
            <div className="h-px w-28 bg-gradient-to-l from-transparent to-amber-400/25" />
          </>
        )
      
      case 'sparkles-swords':
        return (
          <>
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-emerald-400/25" />
            <Sparkles className="h-11 w-11 text-emerald-400/40 -rotate-6" />
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400/30" />
              <div className="w-2 h-2 rounded-full bg-amber-400/30" />
              <div className="w-2 h-2 rounded-full bg-purple-400/30" />
            </div>
            <Swords className="h-11 w-11 text-amber-400/40 rotate-6" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400/25" />
          </>
        )
      
      case 'single-dice':
        return (
          <>
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
            <Dices className="h-14 w-14 text-amber-400/35" />
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
          </>
        )
      
      case 'single-trophy':
        return (
          <>
            <div className="h-px w-36 bg-gradient-to-r from-transparent via-purple-400/25 to-transparent" />
            <Trophy className="h-12 w-12 text-purple-400/35" />
            <div className="h-px w-36 bg-gradient-to-r from-transparent via-purple-400/25 to-transparent" />
          </>
        )
      
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`flex items-center justify-center gap-6 my-16 ${className}`}
    >
      {renderDivider()}
    </motion.div>
  )
}