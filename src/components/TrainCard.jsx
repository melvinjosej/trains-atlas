import { useState, useEffect, useRef } from 'react'
import { parseSpeedKmh, getTrainCategory } from '../data/trainsData'
import { soundFX } from '../utils/soundEffects'

function TrainCard({ train, country, index = 0 }) {
  const [imgLoading, setImgLoading] = useState(true)
  const [imgError, setImgError] = useState(false)
  const [prevPhotoUrl, setPrevPhotoUrl] = useState(train?.photoUrl)
  const [speakingFactIndex, setSpeakingFactIndex] = useState(null)
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('trains-atlas-muted') === 'true'
  })
  const imgRef = useRef(null)

  // Reset states on train change during render
  if (train?.photoUrl !== prevPhotoUrl) {
    setPrevPhotoUrl(train?.photoUrl)
    setImgLoading(true)
    setImgError(false)
    if (speakingFactIndex !== null) {
      setSpeakingFactIndex(null)
    }
  }

  // Clean text helper for Speech Synthesis
  const cleanTextForSpeech = (text) => {
    return text
      .replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  }

  // Speak full narrator script on train change
  useEffect(() => {
    if (isMuted || !train) {
      window.speechSynthesis.cancel()
      return
    }

    const countryIntro = country ? `${country.countryName}, capital ${country.capital}. ` : ''
    const introText = `${countryIntro}Let's explore the ${train.name}!`
    const factsText = train.funFacts ? train.funFacts.join('. ') : ''
    const rawScriptText = `${introText}. ${factsText}`
    const cleanScript = cleanTextForSpeech(rawScriptText)

    window.speechSynthesis.cancel()

    const timer = setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(cleanScript)
      utterance.lang = 'en-US'
      utterance.rate = 0.88
      utterance.pitch = 1.1

      utterance.onend = () => setSpeakingFactIndex(null)
      utterance.onerror = () => setSpeakingFactIndex(null)

      window.speechSynthesis.speak(utterance)
    }, 60)

    return () => {
      clearTimeout(timer)
      window.speechSynthesis.cancel()
    }
  }, [train, country, index, isMuted])

  if (!train) return null

  const speedKmh = parseSpeedKmh(train)
  const category = getTrainCategory(train)

  const toggleMute = () => {
    soundFX.playClick()
    const nextMuteState = !isMuted
    setIsMuted(nextMuteState)
    localStorage.setItem('trains-atlas-muted', String(nextMuteState))
    if (nextMuteState) {
      window.speechSynthesis.cancel()
      setSpeakingFactIndex(null)
    }
  }

  const handleBlowWhistle = () => {
    if (category === 'bullet') {
      soundFX.playHorn()
    } else {
      soundFX.playWhistle()
    }
  }

  // Speak an individual fun fact when tapped by child
  const handleSpeakFact = (factText, idx) => {
    soundFX.playClick()
    if (isMuted) return
    window.speechSynthesis.cancel()
    setSpeakingFactIndex(idx)

    const utterance = new SpeechSynthesisUtterance(cleanTextForSpeech(factText))
    utterance.lang = 'en-US'
    utterance.rate = 0.88
    utterance.pitch = 1.1
    utterance.onend = () => setSpeakingFactIndex(null)
    utterance.onerror = () => setSpeakingFactIndex(null)
    window.speechSynthesis.speak(utterance)
  }

  // Speedometer color badge
  const getSpeedBadgeStyle = () => {
    if (speedKmh >= 250) return 'bg-rose-600 text-white border-rose-300'
    if (speedKmh >= 150) return 'bg-amber-500 text-amber-950 border-amber-200'
    return 'bg-emerald-600 text-white border-emerald-300'
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
            <div className="font-black text-amber-800 text-xl">Photo didn&apos;t load!</div>
            <div className="text-sm text-amber-600 font-medium mt-2 max-w-[80%] mx-auto leading-relaxed">
              Check your network connection to view this train photo! 🧐
            </div>
          </div>
        )}

        {/* 💯 Real Public Domain Image */}
        <img 
          ref={(node) => {
            imgRef.current = node
            if (node && node.complete && node.naturalWidth > 0) {
              setImgLoading(false)
            }
          }}
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
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white font-bold text-xs sm:text-sm px-3.5 py-1 rounded-full shadow-md tracking-wide z-20 max-w-[65%] truncate">
            {train.type}
          </div>
        )}

        {/* ⚡ Speedometer Badge Overlay */}
        {!imgError && (
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full font-black text-xs sm:text-sm border-2 shadow-md z-20 flex items-center space-x-1 ${getSpeedBadgeStyle()}`}>
            <span>⚡</span>
            <span>{speedKmh} km/h</span>
          </div>
        )}
      </div>

      {/* 📝 TRAIN FACTS DETAILS DESCRIPTION BOX */}
      <div className="flex-1 p-4 flex flex-col min-h-0 overflow-y-auto no-scrollbar bg-gradient-to-b from-white to-slate-50/50">
        
        {/* Train Name Title + Whistle Button + Mute Narrator Toggle */}
        <div className="flex items-center justify-between border-b-4 border-amber-300 pb-2 mb-3 shrink-0 gap-2">
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-tight flex-1 truncate" title={train.name}>
            {train.name}
          </h3>

          {/* 🚂 Blow Whistle Interactive Button */}
          <button
            onClick={handleBlowWhistle}
            className="bg-amber-400 hover:bg-amber-300 active:scale-90 text-amber-950 font-black text-sm px-3 py-1.5 rounded-full border-2 border-amber-500 shadow-sm flex items-center space-x-1 cursor-pointer transition shrink-0"
            title="Blow Train Whistle! 🚂💨"
          >
            <span>{category === 'bullet' ? '🚄' : '🚂'}</span>
            <span>{category === 'bullet' ? 'Horn!' : 'Choo-Choo!'}</span>
          </button>

          {/* 🔊 Mute / Unmute Narrator Button */}
          <button 
            onClick={toggleMute}
            className={`text-xl p-2 rounded-full cursor-pointer transition active:scale-90 border-2 shadow-sm shrink-0 ${
              isMuted 
                ? 'bg-rose-50 border-rose-200 hover:bg-rose-100 text-rose-700' 
                : 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-700 animate-bounce-slow'
            }`}
            title={isMuted ? 'Unmute narrator 🔊' : 'Mute narrator 🔇'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>

        {/* Fun Educational Child-Friendly Fact List (Tap any fact to hear it read aloud!) */}
        <div className="flex-1 space-y-2.5 overflow-y-auto no-scrollbar pr-1">
          {train.funFacts && train.funFacts.map((fact, idx) => {
            const badgeColors = [
              'bg-amber-100 border-amber-400 text-amber-900 hover:bg-amber-200/70',
              'bg-sky-100 border-sky-400 text-sky-900 hover:bg-sky-200/70',
              'bg-emerald-100 border-emerald-400 text-emerald-900 hover:bg-emerald-200/70'
            ]
            const colorClass = badgeColors[idx % badgeColors.length]
            const isSpeakingThis = speakingFactIndex === idx

            return (
              <div 
                key={idx} 
                onClick={() => handleSpeakFact(fact, idx)}
                className={`p-3 rounded-2xl border-l-8 shadow-sm font-medium text-base sm:text-lg leading-relaxed transform transition duration-200 cursor-pointer flex items-start space-x-2.5 ${colorClass} ${
                  isSpeakingThis ? 'ring-4 ring-teal-400 scale-[1.01]' : ''
                }`}
                title="Tap to hear this fun fact! 🔊"
              >
                <span className="text-xl shrink-0 mt-0.5">
                  {isSpeakingThis ? '🔊' : '🌟'}
                </span>
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
