import { useState } from 'react'

function TrainCard({ train }) {
  const [imgLoading, setImgLoading] = useState(true)

  if (!train) return null

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-3xl shadow-lg border-4 border-slate-100 overflow-hidden font-kids min-h-0">
      
      {/* 📸 TRAIN PHOTO CONTAINER */}
      <div className="w-full h-[45%] bg-slate-100 relative overflow-hidden group shrink-0">
        
        {/* Loading spinner or placeholder for the image load stream */}
        {imgLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-200 text-slate-400">
            <span className="text-4xl animate-spin mb-2">⚙️</span>
            <div className="font-bold animate-pulse">Loading Real Photo...</div>
          </div>
        )}

        {/* 💯 Real Public Domain Image */}
        <img 
          src={train.photoUrl} 
          alt={train.name}
          loading="lazy"
          onLoad={() => setImgLoading(false)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            imgLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* 🏷️ Train Type Badge Overlay */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white font-bold text-base px-4 py-1 rounded-full shadow-sm tracking-wide">
          {train.type}
        </div>
      </div>

      {/* 📝 TRAIN FACTS DETAILS DESCRIPTION BOX */}
      <div className="flex-1 p-4 flex flex-col min-h-0 overflow-y-auto no-scrollbar bg-gradient-to-b from-white to-slate-50/50">
        
        {/* Train Name Title */}
        <h3 className="text-2xl font-black text-slate-800 mb-3 border-b-4 border-amber-300 pb-1 leading-tight shrink-0">
          {train.name}
        </h3>

        {/* Fun Educational Child-Friendly Fact List */}
        <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar pr-1">
          {train.funFacts && train.funFacts.map((fact, index) => {
            // Cyclical color accents for lists to engage a 4yo
            const badgeColors = [
              'bg-amber-100 border-amber-400 text-amber-900',
              'bg-sky-100 border-sky-400 text-sky-900',
              'bg-emerald-100 border-emerald-400 text-emerald-900'
            ]
            const colorClass = badgeColors[index % badgeColors.length]

            return (
              <div 
                key={index} 
                className={`p-3 rounded-2xl border-l-8 shadow-sm font-medium text-lg leading-relaxed transform transition duration-300 hover:translate-x-1 flex items-start space-x-2 ${colorClass}`}
              >
                <span className="text-xl shrink-0 mt-0.5">🌟</span>
                <span>{fact}</span>
              </div>
            )
          })}
        </div>

      </div>

    </div>
  )
}

export default TrainCard
