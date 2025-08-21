'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="ghost"
            className="mb-8 text-slate-300 hover:text-white"
            asChild
          >
            <Link href="/">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          
          <p className="text-slate-300 mb-8">Effective Date: August 21, 2025</p>
          
          <div className="prose prose-invert prose-slate max-w-none">
            <p className="text-slate-300 mb-6">
              Pantheons Play (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Information We Collect</h2>
            
            <p className="text-slate-300 mb-4">
              When you use our website or register for events, we may collect:
            </p>
            
            <ul className="space-y-3 text-slate-300 mb-6">
              <li>
                <strong className="text-white">Contact Information:</strong> such as your name and email address when you sign up for our newsletter, register for an event, or contact us.
              </li>
              <li>
                <strong className="text-white">Event Registration Details:</strong> information needed to confirm your participation (e.g., ticket type, dietary preferences, or accessibility needs, if provided).
              </li>
              <li>
                <strong className="text-white">Payment Information:</strong> all payments are processed securely by our third-party payment processor (Stripe). We do not store or process your credit card details on our servers.
              </li>
              <li>
                <strong className="text-white">Usage Data:</strong> we use Google Analytics to understand how visitors interact with our site (e.g., pages visited, device/browser information). This information is aggregated and not personally identifiable.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">How We Use Your Information</h2>
            
            <p className="text-slate-300 mb-4">
              We use the information we collect to:
            </p>
            
            <ul className="space-y-2 text-slate-300 mb-6">
              <li>Provide and manage our events and services</li>
              <li>Send you event confirmations, updates, and reminders</li>
              <li>Share newsletters or promotional materials (if you opt in)</li>
              <li>Improve our website and community experience through analytics</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">How We Share Information</h2>
            
            <p className="text-slate-300 mb-4">
              We do not sell or rent your personal information. We only share it in limited circumstances:
            </p>
            
            <ul className="space-y-2 text-slate-300 mb-6">
              <li>With trusted third-party service providers who assist us in operating our website, email newsletter, or payment processing (e.g., Stripe, Google Analytics, Luma)</li>
              <li>If required by law or to protect the safety and security of our community</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Cookies and Analytics</h2>
            
            <p className="text-slate-300 mb-6">
              Our website uses cookies and Google Analytics to track usage patterns. You can adjust your browser settings to refuse cookies or disable analytics tracking if you prefer.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Your Choices</h2>
            
            <ul className="space-y-3 text-slate-300 mb-6">
              <li>
                <strong className="text-white">Email:</strong> You can unsubscribe from our newsletter at any time by clicking the &quot;unsubscribe&quot; link in any email.
              </li>
              <li>
                <strong className="text-white">Events:</strong> You can contact us to update or delete your registration details.
              </li>
              <li>
                <strong className="text-white">Analytics:</strong> You can opt out of Google Analytics tracking by using the{' '}
                <a 
                  href="https://tools.google.com/dlpage/gaoptout" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 underline"
                >
                  Google Analytics Opt-Out Browser Add-on
                </a>
                .
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Data Security</h2>
            
            <p className="text-slate-300 mb-6">
              We take reasonable steps to protect your information, but no method of transmission over the Internet is 100% secure. Payments are handled exclusively through Stripe, which uses industry-standard security.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Contact Us</h2>
            
            <p className="text-slate-300 mb-4">
              If you have questions about this Privacy Policy or your data, please contact us at:
            </p>
            
            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800">
              <p className="text-slate-300 mb-2">
                <strong className="text-white">Pantheons Play</strong>
              </p>
              <p className="text-slate-300 mb-2">
                7308 E Independence Blvd Ste C # V269<br />
                Charlotte, NC 28227-9440
              </p>
              <p className="text-slate-300">
                📧{' '}
                <a 
                  href="mailto:contact@pantheonsplay.com" 
                  className="text-amber-400 hover:text-amber-300 underline"
                >
                  contact@pantheonsplay.com
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}