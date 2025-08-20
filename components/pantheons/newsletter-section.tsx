'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    // You need to get these values from your MailChimp embedded form
    // Go to: Audience → Signup forms → Embedded forms
    // Look in the form HTML for the action URL which contains these values
    const MAILCHIMP_U = process.env.NEXT_PUBLIC_MAILCHIMP_U || ''
    const MAILCHIMP_ID = process.env.NEXT_PUBLIC_MAILCHIMP_ID || ''
    const MAILCHIMP_SERVER = process.env.NEXT_PUBLIC_MAILCHIMP_SERVER || ''
    
    if (!MAILCHIMP_U || !MAILCHIMP_ID || !MAILCHIMP_SERVER) {
      // Fallback to mailto if MailChimp not configured
      window.location.href = `mailto:contact@pantheonsplay.com?subject=Newsletter Signup&body=Please add my email to the newsletter: ${email}`
      setStatus('success')
      setMessage('Thank you! We\'ll add you to our newsletter.')
      setEmail('')
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
      return
    }

    try {
      // Use JSONP for cross-origin requests to MailChimp
      const url = `https://${MAILCHIMP_SERVER}.list-manage.com/subscribe/post-json?u=${MAILCHIMP_U}&id=${MAILCHIMP_ID}&EMAIL=${encodeURIComponent(email)}&c=?`
      
      // Create a script tag for JSONP
      const script = document.createElement('script')
      script.src = url.replace('c=?', `c=handleMailChimpResponse_${Date.now()}`)
      
      // Define the callback function
      const callbackName = `handleMailChimpResponse_${Date.now()}`
      
      interface MailChimpResponse {
        result: 'success' | 'error'
        msg?: string
      }
      
      ;(window as unknown as Record<string, unknown>)[callbackName] = (data: MailChimpResponse) => {
        // Clean up
        delete (window as unknown as Record<string, unknown>)[callbackName]
        document.body.removeChild(script)
        
        if (data.result === 'success') {
          setStatus('success')
          setMessage('Please check your email to confirm your subscription!')
          setEmail('')
        } else {
          setStatus('error')
          // Parse MailChimp error messages
          let errorMsg = 'Something went wrong. Please try again.'
          if (data.msg) {
            if (data.msg.includes('already subscribed')) {
              errorMsg = 'You are already subscribed!'
            } else if (data.msg.includes('invalid')) {
              errorMsg = 'Please enter a valid email address.'
            }
          }
          setMessage(errorMsg)
        }
        
        setTimeout(() => {
          setStatus('idle')
          setMessage('')
        }, 5000)
      }
      
      // Timeout handling
      setTimeout(() => {
        delete (window as unknown as Record<string, unknown>)[callbackName]
        if (document.body.contains(script)) {
          document.body.removeChild(script)
        }
        setStatus('error')
        setMessage('Request timed out. Please try again.')
        setTimeout(() => {
          setStatus('idle')
          setMessage('')
        }, 5000)
      }, 10000)
      
      // Append script to trigger the request
      document.body.appendChild(script)
      
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    }
  }

  return (
    <section id="newsletter" className="relative py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Newsletter section with matching style to Our Next Gathering */}
          <div className="relative bg-gradient-to-br from-amber-900/20 via-amber-950/30 to-slate-900/40 backdrop-blur-sm rounded-3xl border-2 border-amber-400/30 p-8 md:p-12 shadow-2xl">
            {/* Decorative corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-amber-400/40"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-amber-400/40"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-amber-400/40"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-amber-400/40"></div>
            
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent mb-4">
                Become an Insider
              </h3>
              <p className="text-lg text-amber-100/80 mb-8">
                Join our mailing list for early event announcements, behind-the-scenes updates, and first access to our community experiments.
              </p>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === 'loading'}
                    className="flex-1 bg-slate-800/50 border-amber-400/30 text-white placeholder:text-amber-200/40 focus:border-amber-400/50 h-12"
                  />
                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold shadow-lg"
                  >
                    {status === 'loading' ? 'Joining...' : "I'm In"}
                  </Button>
                </div>
                
                {message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-sm ${
                      status === 'success' ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {message}
                  </motion.p>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}