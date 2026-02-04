import type { Token } from '../App'

interface TokenCardProps {
  token: Token
  index: number
}

function formatMarketCap(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`
  }
  return `$${value}`
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  if (seconds < 60) return `${seconds}s ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

export default function TokenCard({ token, index }: TokenCardProps) {
  const staggerClass = `stagger-${(index % 8) + 1}`

  return (
    <div
      className={`group relative bg-[#12121a] border border-[#1f1f2e] rounded-2xl p-4 card-hover opacity-0 animate-fade-in-up ${staggerClass} cursor-pointer`}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0052ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Top section */}
      <div className="flex items-start gap-3 mb-3 relative">
        {/* Token image */}
        <div className="relative flex-shrink-0">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-[#0052ff]/20 to-[#00d4ff]/20 p-0.5">
            <img
              src={token.image}
              alt={token.name}
              className="w-full h-full rounded-[10px] object-cover bg-[#1a1a24]"
            />
          </div>
          {/* Live indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>

        {/* Token info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-bold text-white truncate group-hover:text-[#0052ff] transition-colors">
              {token.name}
            </h3>
            <span className="text-xs font-mono text-gray-500 px-1.5 py-0.5 bg-[#1a1a24] rounded">
              ${token.ticker}
            </span>
          </div>
          <p className="text-xs text-gray-500 font-mono truncate">
            by {token.creator}
          </p>
        </div>

        {/* Time badge */}
        <span className="text-[10px] font-mono text-gray-600 bg-[#1a1a24] px-2 py-1 rounded-md">
          {timeAgo(token.createdAt)}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-400 mb-4 line-clamp-2 font-mono leading-relaxed">
        {token.description}
      </p>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">bonding curve</span>
          <span className="text-[10px] font-mono text-[#0052ff]">{token.progress}%</span>
        </div>
        <div className="h-2 bg-[#1a1a24] rounded-full overflow-hidden">
          <div
            className="h-full progress-gradient rounded-full transition-all duration-500"
            style={{ width: `${token.progress}%` }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between pt-3 border-t border-[#1f1f2e]">
        <div className="flex items-center gap-4">
          {/* Market cap */}
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-xs font-mono text-gray-300">{formatMarketCap(token.marketCap)}</span>
          </div>

          {/* Replies */}
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-xs font-mono text-gray-300">{token.replies}</span>
          </div>
        </div>

        {/* Buy button */}
        <button className="px-3 py-1.5 bg-[#0052ff]/10 border border-[#0052ff]/30 rounded-lg text-xs font-mono text-[#0052ff] hover:bg-[#0052ff] hover:text-white hover:border-[#0052ff] transition-all duration-200 group-hover:shadow-lg group-hover:shadow-[#0052ff]/20">
          trade
        </button>
      </div>

      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#0052ff]/5 to-transparent transform rotate-45 translate-x-16 -translate-y-16" />
      </div>
    </div>
  )
}