import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'

export default function ClientInfoPage() {
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
              Your Scalp Health Matters
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
              Noticed something unusual on your scalp? You&apos;re not alone. Many people struggle
              to know when to seek help and how to get it quickly. We&apos;re building something
              to make that easier.
            </p>
          </div>
        </section>

        <section className="py-16 bg-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy mb-8">What We&apos;re Building For You</h2>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">Faster Access to Care</h3>
                <p className="text-gray-600 text-sm">
                  Skip the months-long wait for a dermatologist appointment through trusted referrals.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">Trusted Observers</h3>
                <p className="text-gray-600 text-sm">
                  Your hair professional sees your scalp regularly—they can help spot concerns early.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">Privacy Protected</h3>
                <p className="text-gray-600 text-sm">
                  Your health information stays secure—we&apos;re building with privacy as a foundation.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">Better Outcomes</h3>
                <p className="text-gray-600 text-sm">
                  Early detection and proper referrals lead to better treatment results.
                </p>
              </div>
            </div>

            <div className="bg-coral/10 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-navy mb-3">Share Your Experience</h3>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                Your journey with scalp health concerns helps us understand how to serve you better.
                Take 5 minutes to share your story.
              </p>
              <Link href="/client/survey">
                <Button variant="secondary" size="lg" className="bg-coral hover:bg-coral/90">
                  Start the Survey
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
