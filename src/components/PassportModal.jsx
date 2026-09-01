import { useState } from 'react'
import { trainsData } from '../data/trainsData'
import { soundFX } from '../utils/soundEffects'

function PassportModal({ isOpen, onClose, visitedIds = [], onSelectCountry, onResetPassport }) {
  const [filter, setFilter] = useState('all') // 'all' | 'visited' | 'unvisited'

  if (!isOpen) return null

  const visitedSet = new Set(visitedIds)
  const totalCount = trainsData.length
  const visitedCount = visitedSet.size
  const progressPercent = Math.round((visitedCount / totalCount) * 100)

  const getRankInfo = (count) => {
    if (count >= 100) return { title: '👑 Global Rail Legend', badge: '🏆', color: 'from-amber-400 to-yellow-500' }
    if (count >= 60) return { title: '🚄 Express Captain', badge: '⚡', color: 'from-rose-500 to-amber-500' }
    if (count >= 30) return { title: '🚂 Master Engineer', badge: '🌟', color: 'from-teal-400 to-emerald-500' }
    if (count >= 10) return { title: '🎫 Junior Conductor', badge: '🎫', color: 'from-sky-400 to-teal-400' }
    return { title: '🚃 Train Rookie', badge: '🌱', color: 'from-slate-400 to-teal-400' }
  }

  const rank = getRankInfo(visitedCount)

  const filteredCountries = trainsData.filter(country => {
    const isVisited = visitedSet.has(country.id)
    if (filter === 'visited') return isVisited
    if (filter === 'unvisited') return !isVisited
    return true
  })

  const handleCardClick = (countryId) => {
    soundFX.playSuccessChime()
    onSelectCountry(countryId)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 font-kids select-none">
      <div className="bg-amber-50/95 w-full max-w-5xl h-[90vh] rounded-3xl shadow-2xl border-8 border-amber-400 flex flex-col overflow-hidden">
        
        {/* 🛂 PASSPORT HEADER */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 p-5 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center space-x-3">
            <span className="text-5xl">🛂</span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-wide drop-shadow-sm">
                MY OFFICIAL TRAIN PASSPORT
              </h2>
              <p className="text-xs sm:text-sm text-amber-100 font-bold">
                Collect stamps by exploring countries on the world map! 🌍✨
              </p>
            </div>
          </div>

          <button
            onClick={() => { soundFX.playClick(); onClose(); }}
            className="bg-rose-600 hover:bg-rose-700 active:scale-90 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold border-2 border-white shadow-md transition cursor-pointer"
            title="Close Passport"
          >
            ✕
          </button>
        </div>

        {/* 🏆 RANK & PROGRESS BANNER */}
        <div className="bg-white p-4 sm:p-5 border-b-4 border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${rank.color} flex items-center justify-center text-4xl shadow-md border-2 border-white`}>
              {rank.badge}
            </div>
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Current Explorer Rank
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-800">
                {rank.title}
              </div>
              <div className="text-sm font-bold text-teal-600">
                {visitedCount} of {totalCount} Country Stamps Collected ({progressPercent}%)
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => { soundFX.playClick(); setFilter('all'); }}
              className={`px-4 py-1.5 rounded-full font-bold text-sm cursor-pointer transition ${
                filter === 'all' ? 'bg-amber-400 text-amber-950 shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => { soundFX.playClick(); setFilter('visited'); }}
              className={`px-4 py-1.5 rounded-full font-bold text-sm cursor-pointer transition ${
                filter === 'visited' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              ⭐ Collected ({visitedCount})
            </button>
            <button
              onClick={() => { soundFX.playClick(); setFilter('unvisited'); }}
              className={`px-4 py-1.5 rounded-full font-bold text-sm cursor-pointer transition ${
                filter === 'unvisited' ? 'bg-rose-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              ❓ Unvisited ({totalCount - visitedCount})
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-amber-100 h-3 shrink-0 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 🎟️ STAMPS GRID */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredCountries.map((country) => {
              const isVisited = visitedSet.has(country.id)
              return (
                <div
                  key={country.id}
                  onClick={() => handleCardClick(country.id)}
                  className={`rounded-3xl p-4 flex flex-col items-center text-center justify-between transition-all duration-300 cursor-pointer relative border-4 ${
                    isVisited
                      ? 'bg-white border-amber-400 shadow-md hover:shadow-xl hover:-translate-y-1'
                      : 'bg-slate-100/80 border-dashed border-slate-300 opacity-75 hover:opacity-100 hover:border-teal-400'
                  }`}
                >
                  {isVisited && (
                    <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow rotate-12 border-2 border-white">
                      STAMPED ⭐
                    </div>
                  )}

                  <div className={`text-5xl mb-2 transition-transform ${isVisited ? 'scale-110' : 'grayscale opacity-40'}`}>
                    {country.flagEmoji}
                  </div>

                  <div>
                    <div className="font-black text-slate-800 text-base leading-tight">
                      {country.countryName}
                    </div>
                    <div className="text-xs font-bold text-slate-500 mt-0.5">
                      {country.capital}
                    </div>
                  </div>

                  <div className={`mt-3 w-full py-1 rounded-xl text-xs font-extrabold ${
                    isVisited
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isVisited ? '🚂 Visit Again' : '❓ Discover!'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer with reset option */}
        {visitedCount > 0 && (
          <div className="bg-white px-6 py-3 border-t border-amber-200 flex justify-between items-center text-xs text-slate-400 shrink-0">
            <span>Tip: Tap any country card to fly there on the map! ✈️</span>
            <button
              onClick={() => {
                if (window.confirm('Reset all collected passport stamps?')) {
                  onResetPassport()
                }
              }}
              className="text-rose-500 hover:underline font-bold cursor-pointer"
            >
              Reset Passport Stamps
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default PassportModal
