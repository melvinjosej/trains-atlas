import { useState, useEffect, useRef } from 'react'

function TrainCard({ train, country, index = 0 }) {
  const [imgLoading, setImgLoading] = useState(true)
  const [imgError, setImgError] = useState(false)
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('trains-atlas-muted') === 'true'
  })
  const imgRef = useRef(null)

  // 🔄 Reset image states on train change
  useEffect(() => {
    setImgLoading(true)
    setImgError(false)
    
    if (imgRef.current && imgRef.current.complete) {
      setImgLoading(false)
    }
  }, [train.photoUrl])

  // 🔊 Speech Synthesis (TTS) Narrator side-effect
  useEffect(() => {
    // Cancel any active speech immediately on mount or train change
    window.speechSynthesis.cancel()

    if (isMuted || !train) return

    // 1. Assemble the narrator script from train name, type, and all fun facts
    const countryIntro = (country && index === 0) ? `${country.countryName}, ${country.capital}. ` : ''
    const introText = `${countryIntro}Let's explore the ${train.name}! It is a ${train.type}.`
    const factsText = train.funFacts ? train.funFacts.join('. ') : ''
    const rawScriptText = `${introText}. ${factsText}`

    // 2. Wipe out emojis and special unicode symbols so the text-to-speech voice reads cleanly
    const cleanScript = rawScriptText
      .replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, "")
      .replace(/\s+/g, ' ')
      .trim()

    // 3. Initialize browser voice utterance
    const utterance = new SpeechSynthesisUtterance(cleanScript)
    utterance.lang = 'en-US'
    utterance.rate = 0.85 // Moderately slow, ideal for a 4-year-old's comprehension!
    utterance.pitch = 1.1 // Warm, slightly higher pitch for a friendly, playful sound

    // 4. Trigger narrator
    window.speechSynthesis.speak(utterance)

    // 🧼 Cleanup function: cancel active narration when card closes or unmounts
    return () => {
      window.speechSynthesis.cancel()
    }
  }, [train, country, index, isMuted])

  if (!train) return null

  const toggleMute = () => {
    const nextMuteState = !isMuted
    setIsMuted(nextMuteState)
    localStorage.setItem('trains-atlas-muted', String(nextMuteState))
    if (nextMuteState) {
      window.speechSynthesis.cancel()
    }
  }

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-3xl shadow-lg border-4 border-slate-100 overflow-hidden font-kids min-h-0">
      
      {/* 📸 TRAIN PHOTO CONTAINER */}
      <div className="w-full h-[45%] bg-slate-100 relative overflow-hidden group shrink-0 flex items-center justify-center">
        
        {/* ⚙️ Toddler Loading Cogwheel Spinner */}
        {imgLoading && !imgError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-200 text-slate-400 z-10">
            <span className="text-4xl animate-spin mb-2">⚙️</span>
            <div className="font-bold animate-pulse">Loading Real Photo...</div>
          </div>
        )}

        {/* ⚠️ Robust Error Fallback Screen */}
        {imgError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-amber-50 p-4 text-center z-10 select-none">
            <span className="text-6xl mb-2 animate-bounce">🚂</span>
            <div className="font-black text-amber-800 text-xl">Photo didn't load!</div>
            <div className="text-sm text-amber-600 font-medium mt-2 max-w-[80%] mx-auto leading-relaxed">
              Your corporate network blocker or firewall might be blocking Wikimedia Commons photos! 🧐
            </div>
          </div>
        )}

        {/* 💯 Real Public Domain Image (with referer hiding) */}
        <img 
          ref={imgRef}
          src={train.photoUrl} 
          alt={train.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setImgLoading(false)}
          onError={() => {
            setImgLoading(false)
            setImgError(true)
          }}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            imgLoading || imgError ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* 🏷️ Train Type Badge Overlay */}
        {!imgError && (
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white font-bold text-base px-4 py-1 rounded-full shadow-sm tracking-wide z-20">
            {train.type}
          </div>
        )}
      </div>

      {/* 📝 TRAIN FACTS DETAILS DESCRIPTION BOX */}
      <div className="flex-1 p-4 flex flex-col min-h-0 overflow-y-auto no-scrollbar bg-gradient-to-b from-white to-slate-50/50">
        
        {/* Train Name Title with floating Mute Narrator Toggle */}
        <div className="flex items-center justify-between border-b-4 border-amber-300 pb-2 mb-3 shrink-0">
          <h3 className="text-2xl font-black text-slate-800 leading-tight flex-1">
            {train.name}
          </h3>
          <button 
            onClick={toggleMute}
            className={`ml-3 text-2xl p-2.5 rounded-full cursor-pointer transition active:scale-90 border-2 shadow-sm ${
              isMuted 
                ? 'bg-rose-50 border-rose-200 hover:bg-rose-100 text-rose-700' 
                : 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-700 animate-bounce-slow'
            }`}
            title={isMuted ? "Unmute narrator 🔊" : "Mute narrator 🔇"}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>

        {/* Fun Educational Child-Friendly Fact List */}
        <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar pr-1">
          {train.funFacts && train.funFacts.map((fact, index) => {
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
