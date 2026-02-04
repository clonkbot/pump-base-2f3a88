import { useState, useEffect } from 'react'
import './index.css'
import TokenCard from './components/TokenCard'
import CreateToken from './components/CreateToken'
import Header from './components/Header'
import HeroSection from './components/HeroSection'

export interface Token {
  id: string
  name: string
  ticker: string
  image: string
  creator: string
  marketCap: number
  replies: number
  progress: number
  createdAt: Date
  description: string
}

const generateMockTokens = (): Token[] => {
  const names = [
    { name: 'Based Pepe', ticker: 'BPEPE', desc: 'the most based frog on base chain' },
    { name: 'Onchain Summer', ticker: 'SUMMER', desc: 'its always summer when youre onchain' },
    { name: 'Blue Chip Ape', ticker: 'BAPE', desc: 'not affiliated with the clothing brand ser' },
    { name: 'Coinbase Dog', ticker: 'CBDOG', desc: 'brians favorite doggo' },
    { name: 'L2 Maxi', ticker: 'L2MAX', desc: 'ethereum but make it fast' },
    { name: 'Base God', ticker: 'BGOD', desc: 'we worship the blue square' },
    { name: 'Degen Mode', ticker: 'DEGEN', desc: 'ape first ask questions never' },
    { name: 'Cope Token', ticker: 'COPE', desc: 'for when you miss the pump' },
    { name: 'Moon Mission', ticker: 'MOON', desc: 'destination: stratosphere' },
    { name: 'Diamond Hands', ticker: 'DMND', desc: 'never selling ever' },
    { name: 'Paper Boy', ticker: 'PAPER', desc: 'sold too early again' },
    { name: 'Rug Pull Insurance', ticker: 'RUG', desc: 'definitely not a rug trust me bro' },
  ]

  return names.map((token, i) => ({
    id: `token-${i}`,
    name: token.name,
    ticker: token.ticker,
    image: `https://api.dicebear.com/7.x/shapes/svg?seed=${token.ticker}&backgroundColor=0052ff,1652f0,0a3d91`,
    creator: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
    marketCap: Math.floor(Math.random() * 500000) + 1000,
    replies: Math.floor(Math.random() * 150),
    progress: Math.floor(Math.random() * 100),
    createdAt: new Date(Date.now() - Math.random() * 86400000 * 3),
    description: token.desc,
  }))
}

type SortOption = 'bump' | 'creation' | 'lastReply' | 'marketCap'

function App() {
  const [tokens, setTokens] = useState<Token[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('bump')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setTokens(generateMockTokens())
      setIsLoading(false)
    }, 800)
  }, [])

  const filteredTokens = tokens
    .filter(t =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.ticker.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'marketCap': return b.marketCap - a.marketCap
        case 'creation': return b.createdAt.getTime() - a.createdAt.getTime()
        case 'lastReply': return b.replies - a.replies
        default: return b.progress - a.progress
      }
    })

  const handleCreateToken = (newToken: Omit<Token, 'id' | 'marketCap' | 'replies' | 'progress' | 'createdAt'>) => {
    const token: Token = {
      ...newToken,
      id: `token-${Date.now()}`,
      marketCap: 0,
      replies: 0,
      progress: 0,
      createdAt: new Date(),
    }
    setTokens(prev => [token, ...prev])
    setShowCreate(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-x-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      {/* Glow orbs */}
      <div className="fixed top-20 left-1/4 w-[600px] h-[600px] bg-[#0052ff]/20 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
      <div className="fixed bottom-20 right-1/4 w-[400px] h-[400px] bg-[#00d4ff]/15 rounded-full blur-[120px] pointer-events-none animate-pulse-slow animation-delay-2000" />

      <Header onCreateClick={() => setShowCreate(true)} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <HeroSection />

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="search for token"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12121a] border border-[#1f1f2e] rounded-lg px-4 py-3 pl-12 text-sm focus:outline-none focus:border-[#0052ff] transition-colors placeholder:text-gray-600"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex gap-2 flex-wrap justify-center">
            {(['bump', 'creation', 'lastReply', 'marketCap'] as SortOption[]).map((option) => (
              <button
                key={option}
                onClick={() => setSortBy(option)}
                className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  sortBy === option
                    ? 'bg-[#0052ff] text-white shadow-lg shadow-[#0052ff]/30'
                    : 'bg-[#12121a] text-gray-400 hover:bg-[#1a1a24] border border-[#1f1f2e]'
                }`}
              >
                {option === 'marketCap' ? 'mcap' : option === 'lastReply' ? 'replies' : option}
              </button>
            ))}
          </div>
        </div>

        {/* Token Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#0052ff]/30 rounded-full animate-spin border-t-[#0052ff]" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-[#0052ff]/50" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTokens.map((token, index) => (
              <TokenCard key={token.id} token={token} index={index} />
            ))}
          </div>
        )}

        {!isLoading && filteredTokens.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 font-mono">no tokens found ser</p>
          </div>
        )}
      </main>

      {/* Create Token Modal */}
      {showCreate && (
        <CreateToken
          onClose={() => setShowCreate(false)}
          onCreate={handleCreateToken}
        />
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#1f1f2e] mt-20">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-gray-600 font-mono">
            Requested by <a href="https://twitter.com/mutu_1987" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#0052ff] transition-colors">@mutu_1987</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#0052ff] transition-colors">@clonkbot</a>
          </p>
          <div className="flex items-center gap-4 text-[11px] text-gray-600 font-mono">
            <span>base chain</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full" />
            <span>0% fees</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full" />
            <span>fair launch</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App