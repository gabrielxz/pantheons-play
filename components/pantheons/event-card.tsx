'use client'

import { CalendarDays, Clock, MapPin, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EVENT_CONFIG } from '@/lib/constants'
import Link from 'next/link'

interface EventDetailProps {
  icon: React.ReactNode
  label: string
  value: string
}

function EventDetail({ icon, label, value }: EventDetailProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-amber-400">{icon}</div>
      <div className="flex-1">
        <p className="text-xs text-slate-400 mb-1">{label}</p>
        <p className="text-sm text-slate-200 font-medium">{value}</p>
      </div>
    </div>
  )
}

export function EventCard() {
  return (
    <Card className="border-white/10 bg-slate-900/50 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="bg-amber-400/10 text-amber-400 border-amber-400/20">
            Next Event
          </Badge>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-amber-400/50 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
        <CardTitle className="text-xl text-white">
          {EVENT_CONFIG.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <EventDetail
          icon={<CalendarDays className="h-4 w-4" />}
          label="Date"
          value={EVENT_CONFIG.date}
        />
        <EventDetail
          icon={<Clock className="h-4 w-4" />}
          label="Time"
          value={EVENT_CONFIG.time}
        />
        <EventDetail
          icon={<MapPin className="h-4 w-4" />}
          label="Location"
          value={EVENT_CONFIG.location}
        />
        
        <div className="pt-4">
          <Button 
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold group"
            asChild
          >
            <Link href={EVENT_CONFIG.registrationUrl}>
              RSVP / Details
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}