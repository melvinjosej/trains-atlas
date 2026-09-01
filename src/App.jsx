import { useState, useEffect, useCallback } from 'react'
import { trainsData, getCountryById } from './data/trainsData'
import MapView from './components/MapView'
import CountryDetailPanel from './components/CountryDetailPanel'
import VoiceControl from './components/VoiceControl'
import TrainExplorerModal from './components/TrainExplorerModal'
import PassportModal from './components/PassportModal'
import QuizBanner from './components/QuizBanner'
import { soundFX } from './utils/soundEffects'
import './App.css'

function App() {
  const [selectedCountryId, setSelectedCountryId] = useState(null)
  const [isLandscape, setIsLandscape] = useState(true)
  const [isExplorerOpen, setIsExplorerOpen] = useState(false)
  const [isPassportOpen, setIsPassportOpen] = useState(false)
  const [isQuizActive, setIsQuizActive] = useState(false)

  // Passport visited countries state persisted in localStorage
  const [visitedCountryIds, setVisitedCountryIds] = useState(() => {
    try {
      const saved = localStorage.getItem('trains-atlas-passport')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Monitor orientation changes for optimal iPad full landscape experience
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight)
    }
    checkOrientation()
    window.addEventListener('resize', checkOrientation)
    return () => window.removeEventListener('resize', checkOrientation)
  }, [])

  // Fast O(1) lookup of current country
  const currentCountry = getCountryById(selectedCountryId)

  const handleSelectCountry = useCallback((countryId) => {
    if (!countryId) {
      setSelectedCountryId(null)
      return
    }
    const country = getCountryById(countryId)
    if (country) {
      setSelectedCountryId(country.id)
      // Record in passport if not visited yet
      setVisitedCountryIds(prev => {
        if (!prev.includes(country.id)) {
          const next = [...prev, country.id]
          try {
            localStorage.setItem('trains-atlas-passport', JSON.stringify(next))
          } catch {
            // ignore storage quota errors
          }
          return next
        }
        return prev
      })
    } else {
      setSelectedCountryId(null)
    }
  }, [])

  // 🎲 Surprise Me! Random Train Adventure handler
  const handleSurpriseMe = () => {
    soundFX.playWhistle()
    // Prefer unvisited countries first so kids discover new places!
    const unvisited = trainsData.filter(c => !visitedCountryIds.includes(c.id))
    const pool = unvisited.length > 0 ? unvisited : trainsData
    const randomCountry = pool[Math.floor(Math.random() * pool.length)]
    handleSelectCountry(randomCountry.id)
  }

  const handleResetPassport = () => {
    setVisitedCountryIds([])
    localStorage.removeItem('trains-atlas-passport')
  }

  return (
    <div className="relative w-full h-full bg-[#f0fdf4] select-none flex flex-col">
      
      {/* 🔄 iPad Landscape Orientation Alert Overlay */}
      {!isLandscape && (
        <div className="absolute inset-0 bg-emerald-500 z-50 flex flex-col items-center justify-center text-center p-8">
          <div className="text-8xl mb-6 animate-bounce">🔄</div>
          <h1 className="text-4xl font-bold text-white mb-4 tracking-wide font-kids">
            Turn Your iPad Sideways!
          </h1>
          <p className="text-2xl text-emerald-100 font-kids">
            Rotate your screen to explore the magical map of trains! 🚂💨
          </p>
        </div>
      )}

      {/* 🚂 Application Header */}
      <header className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 px-4 py-3 shadow-md flex items-center justify-between shrink-0 gap-3 z-20">
        
        {/* Left: App Brand Title */}
        <div 
          onClick={() => { soundFX.playClick(); handleSelectCountry(null); }}
          className="flex items-center space-x-2.5 cursor-pointer group shrink-0"
          title="Return to World Map"
        >
          <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">🚂</span>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-wide drop-shadow-sm font-kids">
            MY ATLAS OF TRAINS! 🌍
          </h1>
        </div>

        {/* Center: Child Microphone voice control button */}
        <div className="hidden xl:flex flex-1 justify-center max-w-sm mx-2">
          <VoiceControl onSelectCountry={handleSelectCountry} />
        </div>
        
        {/* Right: Feature Action Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          
          {/* 🔍 Explore All Trains Button */}
          <button
            onClick={() => { soundFX.playClick(); setIsExplorerOpen(true); }}
            className="bg-white/90 hover:bg-white active:scale-95 text-teal-900 font-extrabold text-xs sm:text-sm px-3.5 py-2 rounded-full shadow-md border-2 border-teal-300 flex items-center space-x-1.5 cursor-pointer transition"
            title="Search & Filter All 115+ Trains!"
          >
            <span>🔍</span>
            <span className="hidden sm:inline">Explore Trains</span>
          </button>

          {/* 🛂 My Train Passport Button */}
          <button
            onClick={() => { soundFX.playClick(); setIsPassportOpen(true); }}
            className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 font-extrabold text-xs sm:text-sm px-3.5 py-2 rounded-full shadow-md border-2 border-white flex items-center space-x-1.5 cursor-pointer transition"
            title="View Collected Country Stamps!"
          >
            <span>🛂</span>
            <span className="hidden md:inline">Passport:</span>
            <span className="bg-white/80 text-amber-950 px-2 py-0.5 rounded-full text-xs font-black">
              {visitedCountryIds.length}/{trainsData.length} ⭐
            </span>
          </button>

          {/* 🎲 Surprise Me! Random Country Button */}
          <button
            onClick={handleSurpriseMe}
            className="bg-purple-500 hover:bg-purple-600 active:scale-95 text-white font-extrabold text-xs sm:text-sm px-3.5 py-2 rounded-full shadow-md border-2 border-purple-300 flex items-center space-x-1.5 cursor-pointer transition"
            title="Fly to a Random Country!"
          >
            <span>🎲</span>
            <span className="hidden lg:inline">Surprise Me!</span>
          </button>

          {/* 🎮 Train Quiz Toggle Button */}
          <button
            onClick={() => {
              soundFX.playClick()
              setIsQuizActive(!isQuizActive)
            }}
            className={`font-extrabold text-xs sm:text-sm px-3.5 py-2 rounded-full shadow-md border-2 flex items-center space-x-1.5 cursor-pointer transition active:scale-95 ${
              isQuizActive
                ? 'bg-pink-500 border-white text-white animate-pulse'
                : 'bg-indigo-500 hover:bg-indigo-600 border-indigo-300 text-white'
            }`}
            title="Play Where in the World Train Trivia!"
          >
            <span>🎮</span>
            <span className="hidden lg:inline">{isQuizActive ? 'Quiz Active' : 'Play Quiz'}</span>
          </button>

          {/* 🌍 Show Whole Map / Close Panel Button */}
          {selectedCountryId && (
            <button 
              onClick={() => { soundFX.playClick(); handleSelectCountry(null); }}
              className="bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs sm:text-sm font-black px-4 py-2 rounded-full shadow-lg border-2 border-white transition cursor-pointer"
            >
              🌍 Whole Map
            </button>
          )}
        </div>
      </header>

      {/* 🎮 Quiz Mode Interactive Banner HUD */}
      <QuizBanner
        isActive={isQuizActive}
        onClose={() => setIsQuizActive(false)}
        selectedCountryId={selectedCountryId}
        onSelectCountry={handleSelectCountry}
      />

      {/* 🌍 Main Split Workspace Layout */}
      <main className="flex-1 relative flex overflow-hidden">
        
        {/* Map Container - Smoothly adjusts width when country detail panel opens */}
        <div className={`h-full transition-all duration-500 ease-in-out ${currentCountry ? 'w-[60%]' : 'w-full'}`}>
          <MapView 
            selectedCountryId={selectedCountryId} 
            onSelectCountry={handleSelectCountry} 
          />
        </div>

        {/* 📑 Right Slide-Over Train Browser Panel */}
        <div 
          className={`h-full absolute right-0 top-0 bottom-0 bg-white shadow-2xl transition-all duration-500 ease-in-out overflow-hidden border-l-8 border-teal-400 z-10 flex ${
            currentCountry ? 'w-[40%] opacity-100 translate-x-0' : 'w-0 opacity-0 translate-x-full'
          }`}
        >
          {currentCountry && (
            <CountryDetailPanel 
              key={currentCountry.id}
              country={currentCountry} 
              onClose={() => handleSelectCountry(null)} 
            />
          )}
        </div>

      </main>

      {/* 🎵 Soft Footer Attribution / Voice Control on Smaller Screens */}
      <footer className="bg-slate-100 px-4 py-1.5 text-center text-slate-500 text-xs sm:text-sm font-kids shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span>Touch any yellow country or use region buttons! 👆</span>
        </div>
        <div className="xl:hidden">
          <VoiceControl onSelectCountry={handleSelectCountry} />
        </div>
        <div className="font-bold text-teal-600 hidden sm:block">
          Real Photos • 115+ Countries • Interactive Sounds 🚄🚂
        </div>
      </footer>

      {/* 🔍 Train Explorer Modal */}
      <TrainExplorerModal
        isOpen={isExplorerOpen}
        onClose={() => setIsExplorerOpen(false)}
        onSelectCountry={handleSelectCountry}
      />

      {/* 🛂 Train Passport Modal */}
      <PassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        visitedIds={visitedCountryIds}
        onSelectCountry={handleSelectCountry}
        onResetPassport={handleResetPassport}
      />

    </div>
  )
}

export default App
