import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'

interface ThankYouPageProps {
  searchParams: { segment?: string }
}

const segmentContent = {
  hp: {
    title: 'Thank You, Hair Professional!',
    message: 'Your insights from the frontlines of scalp health are invaluable. You see what others miss, and your experience will help us build a platform that empowers you to serve your clients even better.',
    nextStep: 'We\'ll be in touch soon with updates on SHA and early access opportunities for Community Observers.',
    accentColor: 'gold' as const,
    bgColor: 'bg-gold/10',
    textColor: 'text-gold',
  },
  derm: {
    title: 'Thank You, Doctor!',
    message: 'Your clinical perspective is essential to building a platform that actually works for dermatologists. We\'re committed to creating something that reduces your administrative burden while improving patient outcomes.',
    nextStep: 'We\'ll be in touch soon with updates on SHA and clinical anchor partnership opportunities.',
    accentColor: 'teal' as const,
    bgColor: 'bg-teal/10',
    textColor: 'text-teal',
  },
  client: {
    title: 'Thank You for Sharing!',
    message: 'Your experience with scalp health matters. By sharing your journey, you\'re helping us build something that will make it easier for others to get the care they need.',
    nextStep: 'We\'ll keep you updated on our progress and let you know when SHA launches.',
    accentColor: 'coral' as const,
    bgColor: 'bg-coral/10',
    textColor: 'text-coral',
  },
}

export default function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const segment = searchParams.segment as keyof typeof segmentContent
  const content = segmentContent[segment] || segmentContent.client

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className={`${content.bgColor} rounded-3xl p-8 sm:p-12 text-center`}>
            <div className={`w-20 h-20 ${content.bgColor} border-4 border-white rounded-full flex items-center justify-center mx-auto mb-8`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-10 w-10 ${content.textColor}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-6">
              {content.title}
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {content.message}
            </p>

            <p className="text-gray-500 mb-8">
              {content.nextStep}
            </p>

            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500 mb-6">
                Want to spread the word? Share SHA with others who might benefit.
              </p>

              <Link href="/">
                <Button variant="outline">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-xl font-bold text-navy mb-4">What Happens Next?</h2>
            <div className="grid sm:grid-cols-3 gap-6 text-left">
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="w-8 h-8 bg-navy text-white rounded-full flex items-center justify-center font-bold text-sm mb-3">
                  1
                </div>
                <h3 className="font-semibold text-navy mb-2">We Analyze</h3>
                <p className="text-sm text-gray-600">
                  Your responses help us understand real needs and priorities.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="w-8 h-8 bg-navy text-white rounded-full flex items-center justify-center font-bold text-sm mb-3">
                  2
                </div>
                <h3 className="font-semibold text-navy mb-2">We Build</h3>
                <p className="text-sm text-gray-600">
                  We design features based on what matters most to you.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="w-8 h-8 bg-navy text-white rounded-full flex items-center justify-center font-bold text-sm mb-3">
                  3
                </div>
                <h3 className="font-semibold text-navy mb-2">We Launch</h3>
                <p className="text-sm text-gray-600">
                  Early supporters like you get first access to SHA.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
