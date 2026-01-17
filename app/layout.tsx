import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Scalp Health Alliance | The Bridge That Benefits Everyone',
  description: 'Connecting hair professionals, dermatologists, and clients for better scalp health outcomes.',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream text-navy antialiased">
        {children}
      </body>
    </html>
  )
}
