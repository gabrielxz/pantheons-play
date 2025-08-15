'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG, NAVIGATION_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-slate-950/80 backdrop-blur-lg border-b border-white/5'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="relative">
              <Image 
                src="/PP_logo.svg" 
                alt="Pantheons Play Logo"
                width={36}
                height={36}
                className="transition-transform duration-300 group-hover:rotate-12"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(71%) sepia(98%) saturate(1168%) hue-rotate(6deg) brightness(100%) contrast(96%)'
                }}
              />
              <span className="absolute -inset-2 rounded-full bg-amber-400/20 blur-md opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate-300 transition-colors hover:text-amber-400"
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="border-amber-400/20 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20 hover:text-amber-200"
              asChild
            >
              <Link href="#newsletter">
                <Mail className="mr-2 h-4 w-4" />
                Join Mailing List
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-amber-400"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-950/95 backdrop-blur-lg border-b border-white/5">
          <nav className="flex flex-col p-4 gap-4">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm text-slate-300 transition-colors hover:text-amber-400 py-2"
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="border-amber-400/20 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20 hover:text-amber-200 w-full"
              asChild
            >
              <Link href="#newsletter" onClick={() => setIsMobileMenuOpen(false)}>
                <Mail className="mr-2 h-4 w-4" />
                Join Mailing List
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}