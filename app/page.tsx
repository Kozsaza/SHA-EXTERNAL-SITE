import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/landing/Hero'
import { DiscoveryCard } from '@/components/landing/DiscoveryCard'

function ScissorsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
    </svg>
  )
}

function StethoscopeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <Hero />

        <section className="py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <DiscoveryCard
                title="Hair Professionals"
                subtitle="Community Observers"
                description="You see scalp conditions every day. Help us build tools that turn observations into action."
                href="/hp"
                icon={<ScissorsIcon />}
                accentColor="gold"
              />

              <DiscoveryCard
                title="Dermatologists"
                subtitle="Clinical Anchors"
                description="Build a qualified patient pipeline on your terms. Tell us what matters to you."
                href="/derm"
                icon={<StethoscopeIcon />}
                accentColor="teal"
              />

              <DiscoveryCard
                title="Clients"
                subtitle="Care Seekers"
                description="Tired of waiting months for answers? Help us fix the broken system."
                href="/client"
                icon={<UserIcon />}
                accentColor="coral"
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-navy mb-4">Why Your Input Matters</h2>
            <p className="text-gray-600 leading-relaxed">
              We&apos;re building something new—a bridge between the salon chair and the dermatologist&apos;s office.
              Your honest feedback will directly shape how we design this platform to serve everyone better.
              This survey takes about 5 minutes and your responses are confidential.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
