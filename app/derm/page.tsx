import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'

export default function DermInfoPage() {
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
              Pre-Screened, High-Intent Patients
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
            <h2 className="text-2xl font-bold text-navy mb-8">What We&apos;re Building For You</h2>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">Reduced No-Shows</h3>
                <p className="text-gray-600 text-sm">
                  Patients who come through trained observers are pre-vetted and motivated to seek care.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">Administrative Relief</h3>
                <p className="text-gray-600 text-sm">
                  Standardized data packets delivered directly to your team, reducing intake friction.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">Regulatory Compliance</h3>
                <p className="text-gray-600 text-sm">
                  MSO structure designed to be compliant with AKS and Stark Law from day one.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">EMR Integration</h3>
                <p className="text-gray-600 text-sm">
                  Seamless JSON/FHIR packets designed for ModMed, Epic, and other major systems.
                </p>
              </div>
            </div>

            <div className="bg-teal/10 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-navy mb-3">Shape the Platform</h3>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                Your insights will directly influence how we build the clinical side of SHA.
                Help us understand what matters most to your practice.
              </p>
              <Link href="/derm/survey">
                <Button variant="secondary" size="lg" className="bg-teal hover:bg-teal/90">
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
