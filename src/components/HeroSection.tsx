export default function HeroSection() {
  return (
    <section className="relative mb-12 py-12 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div className="text-[20rem] font-black text-white select-none tracking-tighter">
          BASE
        </div>
      </div>

      <div className="relative text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0052ff]/10 border border-[#0052ff]/30 rounded-full mb-6 animate-fade-in-up">
          <div className="w-2 h-2 bg-[#0052ff] rounded-full animate-pulse" />
          <span className="text-xs font-mono text-[#0052ff] uppercase tracking-wider">live on base mainnet</span>
        </div>

        {/* Main heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 animate-fade-in-up stagger-1">
          <span className="text-white">launch your </span>
          <span className="text-gradient-base">memecoin</span>
        </h2>

        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8 font-mono animate-fade-in-up stagger-2">
          no presale. no team allocation. fair launch guaranteed.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 animate-fade-in-up stagger-3">
          <StatItem label="tokens launched" value="4,207" />
          <StatItem label="total volume" value="$2.4M" />
          <StatItem label="traders" value="12,847" />
        </div>

        {/* Floating elements */}
        <div className="hidden lg:block absolute top-10 left-10 animate-float">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0052ff]/20 to-transparent border border-[#0052ff]/20 flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl">🔵</span>
          </div>
        </div>

        <div className="hidden lg:block absolute bottom-10 right-10 animate-float animation-delay-2000">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00d4ff]/20 to-transparent border border-[#00d4ff]/20 flex items-center justify-center backdrop-blur-sm">
            <span className="text-3xl">🚀</span>
          </div>
        </div>

        <div className="hidden lg:block absolute top-1/2 right-20 animate-float stagger-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-transparent border border-green-500/20 flex items-center justify-center backdrop-blur-sm">
            <span className="text-xl">💎</span>
          </div>
        </div>
      </div>

      {/* Divider with text */}
      <div className="relative mt-16">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#1f1f2e]" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[#0a0a0f] px-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
            trending tokens
          </span>
        </div>
      </div>
    </section>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-black text-white mb-1">{value}</div>
      <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">{label}</div>
    </div>
  )
}