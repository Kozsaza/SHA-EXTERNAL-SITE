import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'

export default function HPInfoPage() {
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
              You See What Others Miss
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
            <h2 className="text-2xl font-bold text-navy mb-8">What We&apos;re Building For You</h2>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">Professional Protection</h3>
                <p className="text-gray-600 text-sm">
                  A secure way to document and refer without practicing medicine or storing sensitive images on your phone.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">Elevated Status</h3>
                <p className="text-gray-600 text-sm">
                  Training and certification that positions you as a trusted wellness observer in your community.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">Client Loyalty</h3>
                <p className="text-gray-600 text-sm">
                  Deepen relationships by helping clients access care they might otherwise never seek.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">Fair Compensation</h3>
                <p className="text-gray-600 text-sm">
                  Earn for your expertise and the value you provide as a frontline observer.
                </p>
              </div>
            </div>

            <div className="bg-gold/10 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-navy mb-3">Help Us Build This Right</h3>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                Take 5 minutes to share your experience. Your input directly shapes how we design this platform.
              </p>
              <Link href="/hp/survey">
                <Button variant="primary" size="lg">
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
