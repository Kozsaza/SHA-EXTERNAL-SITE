'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { submitInterviewInterest } from '@/lib/actions'

export default function ClientInfoPage() {
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
      const result = await submitInterviewInterest('client', {
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
            <div className="inline-block px-4 py-1.5 rounded-full border border-coral/30 text-coral text-xs font-bold tracking-[0.2em] uppercase mb-6">
              For Clients
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif mb-6">
              You Shouldn&apos;t Have to Wait Months for Answers
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
              Noticed something unusual on your scalp? You&apos;re not alone. Many people struggle
              to know when to seek help and how to get it quickly. We&apos;re building something
              to fix the broken system.
            </p>
          </div>
        </section>

        <section className="py-16 bg-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy mb-8">Why Your Experience Matters</h2>

            <div className="space-y-6 mb-12">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-coral/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy text-lg">Get Connected Faster</h3>
                  <p className="text-gray-600">Get connected to specialists faster through people you already trust.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-coral/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy text-lg">Trusted Observers</h3>
                  <p className="text-gray-600">Your stylist sees what you can&apos;t—and can help you get care.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-coral/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy text-lg">Privacy Protected</h3>
                  <p className="text-gray-600">Your health information stays secure—we&apos;re building with privacy as a foundation.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-8">
              <p className="text-center text-gray-600">
                <span className="font-semibold text-navy">3+ months</span> average wait for a dermatology appointment.{' '}
                <span className="text-coral font-medium">You deserve better.</span>
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
                  Share your experience with scalp health concerns. Your story helps us understand what you need.
                </p>
                <Link
                  href="/client/survey"
                  className="block w-full py-3 bg-navy text-white text-center rounded-lg font-semibold hover:bg-navy/90 transition-colors"
                >
                  Start Survey →
                </Link>
              </div>

              {/* Interview Path */}
              <div className="bg-coral/5 rounded-xl p-6 border-2 border-coral shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🎤</span>
                  <h3 className="text-xl font-bold text-navy">Prefer to Talk?</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We&apos;re conducting 15-minute interviews with people who&apos;ve dealt with scalp concerns. Share your journey directly.
                </p>
                <p className="text-sm text-coral font-medium mb-4">
                  ✓ Be first in line to use SHA when we launch
                </p>
                {!showInterviewForm && !submitted && (
                  <button
                    onClick={() => setShowInterviewForm(true)}
                    className="block w-full py-3 bg-coral text-white text-center rounded-lg font-semibold hover:bg-coral/90 transition-colors"
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
              <div className="mt-6 p-6 bg-coral/10 rounded-xl border border-coral/30">
                <h4 className="font-semibold text-navy mb-4">Interview Interest</h4>
                <form onSubmit={handleInterviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={interviewForm.name}
                      onChange={(e) => setInterviewForm({...interviewForm, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-coral focus:border-coral"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={interviewForm.email}
                      onChange={(e) => setInterviewForm({...interviewForm, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-coral focus:border-coral"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
                    <input
                      type="tel"
                      value={interviewForm.phone}
                      onChange={(e) => setInterviewForm({...interviewForm, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-coral focus:border-coral"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-coral focus:border-coral"
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
                            className="h-4 w-4 text-coral rounded border-gray-300 focus:ring-coral"
                          />
                          {time}
                        </label>
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-coral text-white rounded-lg font-semibold hover:bg-coral/90 transition-colors disabled:opacity-50"
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
