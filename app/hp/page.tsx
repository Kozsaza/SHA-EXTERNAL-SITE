'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { submitInterviewInterest } from '@/lib/actions'

export default function HPInfoPage() {
  const [showInterviewForm, setShowInterviewForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [interviewForm, setInterviewForm] = useState({
    name: '',
    email: '',
    phone: '',
    zip: '',
    availability: [] as string[],
  })

  const handleInterviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const result = await submitInterviewInterest('hp', {
        contact_name: interviewForm.name,
        contact_email: interviewForm.email,
        contact_phone: interviewForm.phone,
        zip_code: interviewForm.zip,
        availability: interviewForm.availability,
        wants_interview: true,
      })
      if (result.success) {
        setSubmitted(true)
      } else {
        alert('There was an error submitting. Please try again.')
      }
    } catch {
      alert('There was an error submitting. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        <section className="py-16 bg-navy text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-block px-4 py-1.5 rounded-full border border-gold/30 text-gold text-xs font-bold tracking-[0.2em] uppercase mb-6">
              For Hair Professionals
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif mb-6">
              Your Observations Matter
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
              Every day, you&apos;re inches away from your clients&apos; scalps. You notice the changes,
              the concerns, the conditions that might need medical attention. But what do you do
              with that knowledge?
            </p>
          </div>
        </section>

        <section className="py-16 bg-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy mb-8">Why Your Voice Matters</h2>

            <div className="space-y-6 mb-12">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy text-lg">Strengthen Client Relationships</h3>
                  <p className="text-gray-600">Turn awkward moments into trust-building opportunities. Help your clients get the care they need.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-teal/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy text-lg">Expand Your Expertise</h3>
                  <p className="text-gray-600">Be recognized for your scalp health observations. Grow professionally while staying in your scope.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-coral/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy text-lg">Join a Movement</h3>
                  <p className="text-gray-600">Be part of a network of professionals changing how scalp care works. Your input shapes what we build.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-8">
              <p className="text-center text-gray-600">
                <span className="font-semibold text-navy">1.2M+</span> hair professionals in the US see{' '}
                <span className="font-semibold text-navy">2-4 scalp conditions</span> per week on average
              </p>
            </div>

            {/* Two paths section */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {/* Survey Path */}
              <div className="bg-white rounded-xl p-6 border-2 border-navy shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">📋</span>
                  <h3 className="text-xl font-bold text-navy">Take the 3-Minute Survey</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Answer a few questions about your experience with scalp conditions. Your responses help us understand what you need.
                </p>
                <Link
                  href="/hp/survey"
                  className="block w-full py-3 bg-navy text-white text-center rounded-lg font-semibold hover:bg-navy/90 transition-colors"
                >
                  Start Survey →
                </Link>
              </div>

              {/* Interview Path */}
              <div className="bg-cream rounded-xl p-6 border-2 border-gold shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🎤</span>
                  <h3 className="text-xl font-bold text-navy">Prefer to Talk?</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We&apos;re conducting 15-minute interviews with hair professionals. Share your story directly and shape what we build.
                </p>
                <p className="text-sm text-gold font-medium mb-4">
                  ✓ Be first in line to use SHA when we launch
                </p>
                {!showInterviewForm && !submitted && (
                  <button
                    onClick={() => setShowInterviewForm(true)}
                    className="block w-full py-3 bg-gold text-navy text-center rounded-lg font-semibold hover:bg-gold/90 transition-colors"
                  >
                    I&apos;m Interested in an Interview
                  </button>
                )}
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
              Ideal: Do both! Survey + Interview = Maximum impact on what we build
            </p>

            {/* Interview Interest Form */}
            {showInterviewForm && !submitted && (
              <div className="mt-6 p-6 bg-gold/10 rounded-xl border border-gold/30">
                <h4 className="font-semibold text-navy mb-4">Interview Interest</h4>
                <form onSubmit={handleInterviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={interviewForm.name}
                      onChange={(e) => setInterviewForm({...interviewForm, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={interviewForm.email}
                      onChange={(e) => setInterviewForm({...interviewForm, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
                    <input
                      type="tel"
                      value={interviewForm.phone}
                      onChange={(e) => setInterviewForm({...interviewForm, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      value={interviewForm.zip}
                      onChange={(e) => setInterviewForm({...interviewForm, zip: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold focus:border-gold"
                      placeholder="e.g., 02101"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Best times to reach you</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Weekday mornings", "Weekday afternoons", "Weekday evenings", "Weekends"].map((time) => (
                        <label key={time} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={interviewForm.availability.includes(time)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setInterviewForm({...interviewForm, availability: [...interviewForm.availability, time]})
                              } else {
                                setInterviewForm({...interviewForm, availability: interviewForm.availability.filter(t => t !== time)})
                              }
                            }}
                            className="h-4 w-4 text-gold rounded border-gray-300 focus:ring-gold"
                          />
                          {time}
                        </label>
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gold text-navy rounded-lg font-semibold hover:bg-gold/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Interview Interest'}
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    We&apos;ll reach out to schedule a 15-minute conversation.
                  </p>
                </form>
              </div>
            )}

            {submitted && (
              <div className="mt-6 p-6 bg-green-50 rounded-xl border border-green-200 text-center">
                <p className="text-green-800 font-semibold">Thanks! We&apos;ll be in touch to schedule your interview.</p>
                <p className="text-sm text-green-600 mt-2">You&apos;ll be first in line to use SHA when we launch.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
