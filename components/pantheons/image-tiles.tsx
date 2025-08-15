'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { TILE_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function ImageTiles() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {TILE_CONFIG.map((tile, index) => (
        <motion.div
          key={tile.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="group"
        >
          <div className="flex flex-col items-center text-center">
            {/* Crest Image */}
            <div className="relative aspect-square w-full mb-6 overflow-hidden rounded-2xl border-2 border-amber-400/20 group-hover:border-amber-400/40 transition-colors duration-300">
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br",
                tile.color
              )}>
                {tile.image && (
                  <Image
                    src={tile.image}
                    alt={tile.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      // Hide image on error, showing gradient fallback
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                )}
              </div>
              
              {/* Subtle vignette for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
              
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-radial from-amber-400/10 via-transparent to-transparent" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-amber-400 mb-3 group-hover:text-amber-300 transition-colors">
              {tile.title}: <span className="text-amber-200/90 font-medium">{tile.tagline || 'Play Boldly'}</span>
            </h3>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {tile.subtitle}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}