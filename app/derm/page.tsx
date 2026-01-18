'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { submitInterviewInterest } from '@/lib/actions'

export default function DermInfoPage() {
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
      const result = await submitInterviewInterest('derm', {
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
            <div className="inline-block px-4 py-1.5 rounded-full border border-teal/30 text-teal text-xs font-bold tracking-[0.2em] uppercase mb-6">
              For Dermatologists
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif mb-6">
              A Better Patient Pipeline
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
              What if your new patient pipeline was filled with people who actually show up?
              Patients who&apos;ve already been observed by trained professionals and are ready
              for clinical evaluation.
            </p>
          </div>
        </section>

        <section className="py-16 bg-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy mb-8">Why Your Input Matters</h2>

            <div className="space-y-6 mb-12">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-teal/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy text-lg">Reduced No-Shows</h3>
                  <p className="text-gray-600">Patients who come through trained observers are pre-vetted and motivated to seek care.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-teal/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy text-lg">Administrative Relief</h3>
                  <p className="text-gray-600">Standardized data packets delivered directly to your team, reducing intake friction.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-teal/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy text-lg">EMR Integration</h3>
                  <p className="text-gray-600">Seamless data packets designed for ModMed, Epic, and other major systems.</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                <p className="text-2xl font-bold text-navy">18-30%</p>
                <p className="text-sm text-gray-600">Average no-show rate in dermatology</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                <p className="text-2xl font-bold text-navy">3+ months</p>
                <p className="text-sm text-gray-600">Average wait for new patients</p>
              </div>
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
                  Share your practice challenges and what matters most in a patient pipeline solution.
                </p>
                <Link
                  href="/derm/survey"
                  className="block w-full py-3 bg-navy text-white text-center rounded-lg font-semibold hover:bg-navy/90 transition-colors"
                >
                  Start Survey →
                </Link>
              </div>

              {/* Interview Path */}
              <div className="bg-teal/5 rounded-xl p-6 border-2 border-teal shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🎤</span>
                  <h3 className="text-xl font-bold text-navy">Prefer to Talk?</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We&apos;re conducting 15-minute interviews with dermatologists. Share your perspective directly and shape what we build.
                </p>
                <p className="text-sm text-teal font-medium mb-4">
                  ✓ Be first in line to use SHA when we launch
                </p>
                {!showInterviewForm && !submitted && (
                  <button
                    onClick={() => setShowInterviewForm(true)}
                    className="block w-full py-3 bg-teal text-white text-center rounded-lg font-semibold hover:bg-teal/90 transition-colors"
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
              <div className="mt-6 p-6 bg-teal/10 rounded-xl border border-teal/30">
                <h4 className="font-semibold text-navy mb-4">Interview Interest</h4>
                <form onSubmit={handleInterviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={interviewForm.name}
                      onChange={(e) => setInterviewForm({...interviewForm, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal focus:border-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={interviewForm.email}
                      onChange={(e) => setInterviewForm({...interviewForm, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal focus:border-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
                    <input
                      type="tel"
                      value={interviewForm.phone}
                      onChange={(e) => setInterviewForm({...interviewForm, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal focus:border-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Practice ZIP Code *</label>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      value={interviewForm.zip}
                      onChange={(e) => setInterviewForm({...interviewForm, zip: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal focus:border-teal"
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
                            className="h-4 w-4 text-teal rounded border-gray-300 focus:ring-teal"
                          />
                          {time}
                        </label>
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-teal text-white rounded-lg font-semibold hover:bg-teal/90 transition-colors disabled:opacity-50"
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
