import { useState, useEffect, useCallback } from 'react'
import { trainsData } from './data/trainsData'
import MapView from './components/MapView'
import CountryDetailPanel from './components/CountryDetailPanel'
import VoiceControl from './components/VoiceControl'

function App() {
  const [selectedCountryId, setSelectedCountryId] = useState(null)
  const [isLandscape, setIsLandscape] = useState(true)

  // Monitor orientation changes for optimal iPad full landscape experience
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight)
    }
    
    checkOrientation()
    window.addEventListener('resize', checkOrientation)
    return () => window.removeEventListener('resize', checkOrientation)
  }, [])

  // Lookup current country data safely from our database
  const currentCountry = trainsData.find(c => c.id === selectedCountryId)

  const handleSelectCountry = useCallback((countryId) => {
    // Check if the country code tapped actually exists in our train database
    const exists = trainsData.some(c => c.id === countryId)
    if (exists) {
      setSelectedCountryId(countryId)
    } else {
      // If toddler taps an unsupported country, could trigger a soft animation 
      // or just keep it closed to prevent breaking their flow
      setSelectedCountryId(null)
    }
  }, [])

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
      <header className="bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 p-4 shadow-md flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <span className="text-4xl animate-pulse">🚂</span>
          <h1 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-sm font-kids">
            MY ATLAS OF TRAINS! 🌍
          </h1>
        </div>

        {/* 🎙️ Child Microphone voice control button */}
        <div className="flex-1 flex justify-center mx-6">
          <VoiceControl onSelectCountry={handleSelectCountry} />
        </div>
        
        {selectedCountryId ? (
          <button 
            onClick={() => setSelectedCountryId(null)}
            className="bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xl font-bold px-6 py-2.5 rounded-full shadow-lg border-4 border-white transition font-kids cursor-pointer"
          >
            🌍 Show Whole Map
          </button>
        ) : (
          <div className="bg-white/30 backdrop-blur-sm text-white font-medium text-lg px-5 py-1.5 rounded-full font-kids">
            👉 Tap a yellow country!
          </div>
        )}
      </header>

      {/* 🌍 Main Split Workspace Layout */}
      <main className="flex-1 relative flex overflow-hidden">
        
        {/* Map Container - Takes full width if nothing selected, shifts when card opens */}
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
              country={currentCountry} 
              onClose={() => setSelectedCountryId(null)} 
            />
          )}
        </div>

      </main>

      {/* 🎵 Soft Footer Attribution / Help prompt */}
      <footer className="bg-slate-100 px-4 py-1 text-center text-slate-400 text-sm font-kids shrink-0 flex justify-between">
        <div>Touch a yellow country with your finger! 👆</div>
        <div className="font-bold text-teal-500">Real Photos • Real Train Facts 🚄🚂</div>
      </footer>

    </div>
  )
}

export default App
