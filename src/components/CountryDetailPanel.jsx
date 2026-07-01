import { useState, useEffect } from 'react'
import TrainCard from './TrainCard'

function CountryDetailPanel({ country, onClose }) {
  const [activeTrainIndex, setActiveTrainIndex] = useState(0)

  // 🔄 Reset train carousel index back to 0 whenever a new country is selected!
  useEffect(() => {
    setActiveTrainIndex(0)
  }, [country])

  const trains = country.trains || []
  const totalTrains = trains.length

  const handlePrev = () => {
    setActiveTrainIndex((prev) => (prev === 0 ? totalTrains - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveTrainIndex((prev) => (prev === totalTrains - 1 ? 0 : prev + 1))
  }

  const currentTrain = trains[activeTrainIndex]

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 relative font-kids">
      
      {/* 🔴 TOP BANNER CARD: Country Name, Flag and Capital */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-4 shadow-md select-none shrink-0 relative">
        {/* Massive Close Button specifically styled for small fingers */}
        <button 
          onClick={onClose}
          className="absolute right-3 top-3 bg-rose-600 active:scale-90 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-md font-bold border-2 border-white transition cursor-pointer"
          title="Close"
        >
          ✕
        </button>

        <div className="pr-14">
          <div className="text-4xl font-extrabold tracking-wide flex items-center space-x-2">
            <span>{country.flagEmoji}</span>
            <span className="truncate">{country.countryName}</span>
          </div>
          <div className="text-xl text-teal-100 mt-1 font-medium">
            ⭐ Capital: <span className="font-bold text-white underline decoration-amber-400 decoration-4">{country.capital}</span>
          </div>
        </div>
      </div>

      {/* 🎠 CENTRAL WORKSPACE CAROUSEL AREA */}
      <div className="flex-1 flex flex-col p-4 overflow-hidden relative justify-center">
        
        {totalTrains === 0 ? (
          <div className="text-center text-slate-400 text-xl py-12">
            No trains cataloged for this country yet! 🧐
          </div>
        ) : (
          <div className="w-full flex-1 flex flex-col min-h-0">
            
            {/* 🚂 Sub-Component Card Rendering */}
            <div className="flex-1 min-h-0">
              <TrainCard train={currentTrain} country={country} index={activeTrainIndex} />
            </div>

            {/* 🎮 CAROUSEL BUTTON CONTROLS (Show only if country has more than 1 train) */}
            {totalTrains > 1 && (
              <div className="flex items-center justify-between mt-3 shrink-0 px-2">
                <button
                  onClick={handlePrev}
                  className="bg-teal-400 hover:bg-teal-500 active:scale-90 text-white font-black text-xl px-6 py-3 rounded-2xl shadow-md border-b-4 border-teal-600 transition select-none cursor-pointer"
                >
                  ◀ BACK
                </button>

                {/* Toddler Indicators (Dots) */}
                <div className="flex space-x-2 select-none">
                  {trains.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        idx === activeTrainIndex ? 'bg-amber-400 scale-125 ring-2 ring-white' : 'bg-slate-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="bg-teal-400 hover:bg-teal-500 active:scale-90 text-white font-black text-xl px-6 py-3 rounded-2xl shadow-md border-b-4 border-teal-600 transition select-none cursor-pointer"
                >
                  NEXT ▶
                </button>
              </div>
            )}

          </div>
        )}

      </div>

      {/* 🏷️ Count Indicator Header overlay */}
      {totalTrains > 1 && (
        <div className="absolute top-[84px] left-4 bg-amber-400 text-amber-950 font-bold rounded-full px-4 py-0.5 text-xs shadow-sm z-10">
          Train {activeTrainIndex + 1} of {totalTrains} 🚂
        </div>
      )}

    </div>
  )
}

export default CountryDetailPanel
