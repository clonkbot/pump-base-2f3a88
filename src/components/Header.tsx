import { useState } from 'react'

interface HeaderProps {
  onCreateClick: () => void
}

export default function Header({ onCreateClick }: HeaderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')

  const handleConnect = () => {
    // Simulate wallet connection
    const mockAddress = `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`
    setWalletAddress(mockAddress)
    setIsConnected(true)
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0f]/80 border-b border-[#1f1f2e]">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0052ff] to-[#00d4ff] flex items-center justify-center animate-glow">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00d4ff] rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                <span className="text-gradient-base">pump</span>
                <span className="text-white">.base</span>
              </h1>
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">fair launch tokens</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors font-mono">tokens</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors font-mono">how it works</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors font-mono">docs</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onCreateClick}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#12121a] border border-[#1f1f2e] rounded-lg text-sm font-mono hover:bg-[#1a1a24] hover:border-[#0052ff]/50 transition-all"
            >
              <svg className="w-4 h-4 text-[#0052ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              create
            </button>

            {isConnected ? (
              <button
                onClick={() => setIsConnected(false)}
                className="flex items-center gap-2 px-4 py-2 bg-[#0052ff]/10 border border-[#0052ff]/30 rounded-lg text-sm font-mono text-[#0052ff] hover:bg-[#0052ff]/20 transition-all"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                {walletAddress}
              </button>
            ) : (
              <button
                onClick={handleConnect}
                className="flex items-center gap-2 px-4 py-2 bg-[#0052ff] rounded-lg text-sm font-mono text-white hover:bg-[#0052ff]/90 transition-all shadow-lg shadow-[#0052ff]/30 hover:shadow-[#0052ff]/50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                connect
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Animated border bottom */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#0052ff]/50 to-transparent" />
    </header>
  )
}