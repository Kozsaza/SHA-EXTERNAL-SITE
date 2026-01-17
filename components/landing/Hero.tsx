export function Hero() {
  return (
    <header className="relative pt-32 pb-20 bg-navy text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold rounded-full blur-[120px] -ml-64 -mb-64"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full border border-gold/30 text-gold text-xs font-bold tracking-[0.2em] uppercase mb-8">
          Customer Discovery Survey
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif mb-6 leading-tight">
          The Bridge That <br className="hidden sm:block" />
          <span className="gold-gradient">Benefits Everyone</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg lg:text-xl text-gray-300 mb-8 font-light leading-relaxed">
          Help us build the future of scalp health. Share your experience and perspective
          to shape a platform that connects hair professionals, dermatologists, and clients
          for better outcomes.
        </p>
        <p className="text-sm text-gold/80 font-medium">
          Select your role below to begin
        </p>
      </div>
    </header>
  )
}
