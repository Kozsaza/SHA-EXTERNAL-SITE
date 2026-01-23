import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <nav className="fixed w-full z-50 bg-[#FAF8F5] shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/logo.svg"
              alt="SHA Logo"
              width={50}
              height={50}
              className="rounded-xl"
            />
            <div className="flex flex-col text-left">
              <h1 className="text-xl font-bold tracking-tight text-[#1B365D] leading-none">
                SCALP HEALTH <span className="text-[#C9A227]">ALLIANCE</span>
              </h1>
              <span className="text-[10px] text-[#1B365D]/70 font-bold uppercase tracking-[0.3em] mt-1.5 leading-none hidden sm:block">
                Customer Discovery
              </span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}
