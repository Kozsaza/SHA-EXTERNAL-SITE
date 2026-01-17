import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo.svg"
            alt="SHA Logo"
            width={70}
            height={70}
            className="rounded-2xl mb-4 brightness-0 invert opacity-90"
          />
          <h2 className="text-3xl font-black tracking-tight text-white leading-none mb-2">
            SCALP HEALTH <span className="text-gold font-light italic">ALLIANCE</span>
          </h2>
          <span className="text-xs text-gold/70 font-bold uppercase tracking-[0.4em]">
            The Bridge That Benefits Everyone
          </span>
        </div>

        <div className="max-w-2xl mx-auto py-6 px-8 bg-white/5 rounded-2xl border border-white/10 mb-8">
          <p className="text-sm text-gray-400 leading-relaxed">
            SHA operates under a Management Services Organization (MSO) model.
            All operations are designed to be compliant with healthcare regulations
            including HIPAA, AKS, and Stark Law.
          </p>
        </div>

        <div className="text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Scalp Health Alliance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
