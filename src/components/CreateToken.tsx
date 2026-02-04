import { useState } from 'react'
import type { Token } from '../App'

interface CreateTokenProps {
  onClose: () => void
  onCreate: (token: Omit<Token, 'id' | 'marketCap' | 'replies' | 'progress' | 'createdAt'>) => void
}

export default function CreateToken({ onClose, onCreate }: CreateTokenProps) {
  const [name, setName] = useState('')
  const [ticker, setTicker] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !ticker || !description) return

    setIsSubmitting(true)
    setTimeout(() => {
      onCreate({
        name,
        ticker: ticker.toUpperCase(),
        description,
        image: `https://api.dicebear.com/7.x/shapes/svg?seed=${ticker}&backgroundColor=0052ff,1652f0,0a3d91`,
        creator: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
      })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#12121a] border border-[#1f1f2e] rounded-2xl p-6 animate-fade-in-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a1a24] hover:bg-[#252530] transition-colors"
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-1">create token</h3>
          <p className="text-sm text-gray-500 font-mono">launch your memecoin on base</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
              token name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Based Pepe"
              className="w-full bg-[#1a1a24] border border-[#2a2a3a] rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#0052ff] transition-colors font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
              ticker symbol
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-mono">$</span>
              <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase().slice(0, 8))}
                placeholder="BPEPE"
                className="w-full bg-[#1a1a24] border border-[#2a2a3a] rounded-lg pl-8 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#0052ff] transition-colors font-mono uppercase"
                maxLength={8}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
              description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="the most based frog on base chain"
              rows={3}
              className="w-full bg-[#1a1a24] border border-[#2a2a3a] rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#0052ff] transition-colors font-mono resize-none"
              required
            />
          </div>

          {/* Info box */}
          <div className="bg-[#0052ff]/10 border border-[#0052ff]/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#0052ff] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-xs font-mono text-gray-400">
                <p className="text-[#0052ff] mb-1">fair launch guaranteed</p>
                <p>no presale, no team tokens. 100% of supply goes to the bonding curve.</p>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting || !name || !ticker || !description}
            className="w-full py-4 bg-[#0052ff] text-white font-mono font-bold rounded-lg hover:bg-[#0052ff]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#0052ff]/30 hover:shadow-[#0052ff]/50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                launching...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                launch token
              </>
            )}
          </button>
        </form>

        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#0052ff]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#00d4ff]/10 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  )
}