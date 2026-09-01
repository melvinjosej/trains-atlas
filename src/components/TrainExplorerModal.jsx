import { useState, useMemo } from 'react'
import { trainsData, parseSpeedKmh, getTrainCategory } from '../data/trainsData'
import { soundFX } from '../utils/soundEffects'

function TrainExplorerModal({ isOpen, onClose, onSelectCountry }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('country') // 'country' | 'speed' | 'name'

  // Flatten all trains with their country info
  const allTrainItems = useMemo(() => {
    const items = []
    trainsData.forEach(country => {
      (country.trains || []).forEach((train, idx) => {
        const speed = parseSpeedKmh(train)
        const category = getTrainCategory(train)
        items.push({
          id: `${country.id}-${idx}`,
          countryId: country.id,
          countryName: country.countryName,
          capital: country.capital,
          flagEmoji: country.flagEmoji,
          train,
          speed,
          category
        })
      })
    })
    return items
  }, [])

  // Filter and sort trains
  const filteredTrains = useMemo(() => {
    return allTrainItems
      .filter(item => {
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false
        }
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase().trim()
          const matchCountry = item.countryName.toLowerCase().includes(q)
          const matchCapital = item.capital.toLowerCase().includes(q)
          const matchName = item.train.name.toLowerCase().includes(q)
          const matchType = item.train.type.toLowerCase().includes(q)
          return matchCountry || matchCapital || matchName || matchType
        }
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'speed') {
          return b.speed - a.speed
        }
        if (sortBy === 'name') {
          return a.train.name.localeCompare(b.train.name)
        }
        return a.countryName.localeCompare(b.countryName)
      })
  }, [allTrainItems, selectedCategory, searchQuery, sortBy])

  if (!isOpen) return null

  const categories = [
    { id: 'all', label: '🌟 All Trains', count: allTrainItems.length },
    { id: 'bullet', label: '⚡ Bullet & High-Speed' },
    { id: 'steam', label: '🚂 Steam & Heritage' },
    { id: 'mountain', label: '🏔️ Mountain & Scenic' },
    { id: 'luxury', label: '✨ Luxury & Express' }
  ]

  const handleSelectItem = (countryId) => {
    soundFX.playSuccessChime()
    onSelectCountry(countryId)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 font-kids select-none">
      <div className="bg-slate-50 w-full max-w-6xl h-[90vh] rounded-3xl shadow-2xl border-4 border-teal-400 flex flex-col overflow-hidden">
        
        {/* 🚂 MODAL HEADER */}
        <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-sky-500 p-4 sm:p-5 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">🔍</span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide drop-shadow-sm">
                World Train Encyclopedia
              </h2>
              <p className="text-xs sm:text-sm text-teal-100 font-medium">
                Explore {allTrainItems.length} amazing trains from {trainsData.length} countries! 🌍🚂
              </p>
            </div>
          </div>

          <button
            onClick={() => { soundFX.playClick(); onClose(); }}
            className="bg-rose-500 hover:bg-rose-600 active:scale-90 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold border-2 border-white shadow-md transition cursor-pointer"
            title="Close Explorer"
          >
            ✕
          </button>
        </div>

        {/* 🎛️ SEARCH & FILTER CONTROLS BAR */}
        <div className="p-4 bg-white border-b-2 border-slate-200 flex flex-col gap-3 shrink-0">
          
          {/* Search Input + Sort Selector */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xl">🔎</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search train name, country (e.g. Japan, Peru), or capital..."
                className="w-full pl-11 pr-10 py-2.5 bg-slate-100 border-2 border-slate-300 focus:border-teal-500 focus:bg-white rounded-2xl text-slate-800 font-bold text-base focus:outline-none transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <span className="text-sm font-bold text-slate-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => { soundFX.playClick(); setSortBy(e.target.value); }}
                className="bg-slate-100 border-2 border-slate-300 rounded-2xl px-3.5 py-2.5 font-bold text-slate-700 text-sm cursor-pointer focus:outline-none focus:border-teal-500"
              >
                <option value="country">🌍 Country Name</option>
                <option value="speed">⚡ Fastest First</option>
                <option value="name">🔤 Train Name</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => { soundFX.playClick(); setSelectedCategory(cat.id); }}
                  className={`px-4 py-1.5 rounded-full font-bold text-sm whitespace-nowrap transition cursor-pointer flex items-center space-x-1.5 ${
                    active
                      ? 'bg-amber-400 text-amber-950 shadow-sm border-2 border-amber-500 scale-105'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-2 border-transparent'
                  }`}
                >
                  <span>{cat.label}</span>
                  {cat.count && (
                    <span className="bg-white/70 text-amber-900 text-xs px-2 py-0.5 rounded-full">
                      {cat.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* 🚄 TRAIN CARDS GRID */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-slate-100/70">
          {filteredTrains.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <span className="text-6xl mb-3">🧐</span>
              <h3 className="text-2xl font-bold text-slate-700">No trains matched your search!</h3>
              <p className="text-slate-500 mt-1">Try typing another country name or selecting &quot;All Trains&quot;.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-4 bg-teal-500 text-white font-bold px-6 py-2.5 rounded-full shadow-md hover:bg-teal-600 cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTrains.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectItem(item.countryId)}
                  className="bg-white rounded-3xl shadow-md hover:shadow-xl border-4 border-white hover:border-teal-400 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group hover:-translate-y-1"
                >
                  {/* Thumbnail image */}
                  <div className="h-44 bg-slate-200 relative overflow-hidden">
                    <img
                      src={item.train.photoUrl}
                      alt={item.train.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-black text-slate-800 shadow flex items-center space-x-1.5">
                      <span>{item.flagEmoji}</span>
                      <span>{item.countryName}</span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 bg-rose-600 text-white px-2.5 py-0.5 rounded-full text-xs font-black shadow flex items-center space-x-1">
                      <span>⚡</span>
                      <span>{item.speed} km/h</span>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
                        ⭐ Capital: {item.capital}
                      </div>
                      <h4 className="text-lg font-black text-slate-800 leading-snug line-clamp-1">
                        {item.train.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-1">
                        {item.train.type}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-teal-600 group-hover:text-teal-700">
                      <span>📍 Fly to Country on Map</span>
                      <span className="group-hover:translate-x-1 transition-transform">➔</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default TrainExplorerModal
