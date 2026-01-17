import Link from 'next/link'

interface DiscoveryCardProps {
  title: string
  subtitle: string
  description: string
  href: string
  icon: React.ReactNode
  accentColor: 'gold' | 'teal' | 'coral'
}

export function DiscoveryCard({
  title,
  subtitle,
  description,
  href,
  icon,
  accentColor,
}: DiscoveryCardProps) {
  const accentClasses = {
    gold: {
      border: 'hover:border-gold',
      bg: 'bg-gold/10',
      text: 'text-gold',
      button: 'bg-gold text-navy hover:brightness-110',
    },
    teal: {
      border: 'hover:border-teal',
      bg: 'bg-teal/10',
      text: 'text-teal',
      button: 'bg-teal text-white hover:brightness-110',
    },
    coral: {
      border: 'hover:border-coral',
      bg: 'bg-coral/10',
      text: 'text-coral',
      button: 'bg-coral text-white hover:brightness-110',
    },
  }

  const accent = accentClasses[accentColor]

  return (
    <div
      className={`bg-white rounded-3xl p-8 border-2 border-gray-100 transition-all duration-300 ${accent.border} hover:shadow-xl flex flex-col h-full`}
    >
      <div className={`w-14 h-14 ${accent.bg} rounded-2xl flex items-center justify-center mb-6`}>
        <div className={accent.text}>{icon}</div>
      </div>

      <p className={`text-xs font-bold uppercase tracking-widest ${accent.text} mb-2`}>
        {subtitle}
      </p>

      <h3 className="text-2xl font-bold text-navy mb-4">{title}</h3>

      <p className="text-gray-600 leading-relaxed mb-8 flex-grow">{description}</p>

      <Link
        href={href}
        className={`inline-flex items-center justify-center gap-2 ${accent.button} py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-lg`}
      >
        Start Discovery
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}
