import { useState, useEffect, useCallback } from 'react'
import { trainsData } from '../data/trainsData'
import { soundFX } from '../utils/soundEffects'

function QuizBanner({ isActive, onClose, selectedCountryId, onSelectCountry }) {
  const [targetCountry, setTargetCountry] = useState(null)
  const [streak, setStreak] = useState(0)
  const [status, setStatus] = useState('asking') // 'asking' | 'correct' | 'wrong'
  const [feedbackMsg, setFeedbackMsg] = useState('')

  const speakText = useCallback((text) => {
    if (localStorage.getItem('trains-atlas-muted') === 'true') return
    window.speechSynthesis.cancel()
    const clean = text.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, '')
    const utterance = new SpeechSynthesisUtterance(clean)
    utterance.lang = 'en-US'
    utterance.rate = 0.9
    utterance.pitch = 1.15
    window.speechSynthesis.speak(utterance)
  }, [])

  const pickNewQuestion = useCallback(() => {
    const randomIdx = Math.floor(Math.random() * trainsData.length)
    const picked = trainsData[randomIdx]
    setTargetCountry(picked)
    setStatus('asking')
    setFeedbackMsg('')
    onSelectCountry(null)

    const trainName = picked.trains?.[0]?.name || 'famous train'
    const promptText = `Where in the world is ${picked.countryName}? Home to the ${trainName}, and capital ${picked.capital}! Tap it on the map!`
    speakText(promptText)
  }, [onSelectCountry, speakText])

  // Start quiz when activated
  useEffect(() => {
    if (!isActive) {
      window.speechSynthesis.cancel()
      return
    }
    const timer = setTimeout(() => {
      if (!targetCountry) {
        pickNewQuestion()
      }
    }, 50)
    return () => clearTimeout(timer)
  }, [isActive, targetCountry, pickNewQuestion])

  // Check answer when user taps a country on the map
  useEffect(() => {
    if (!isActive || !targetCountry || !selectedCountryId || status === 'correct') return

    const tapped = trainsData.find(c => c.id === selectedCountryId)
    if (!tapped) return

    const timer = setTimeout(() => {
      if (tapped.id === targetCountry.id) {
        soundFX.playSuccessChime()
        setStatus('correct')
        setStreak(s => s + 1)
        const msg = `🎉 Hooray! You found ${targetCountry.countryName}!`
        setFeedbackMsg(msg)
        speakText(`Hooray! You found ${targetCountry.countryName}! Great job!`)
      } else {
        soundFX.playClick()
        setStatus('wrong')
        const msg = `🧐 That's ${tapped.countryName}! Keep looking for ${targetCountry.countryName} (${targetCountry.flagEmoji})!`
        setFeedbackMsg(msg)
        speakText(`Oops, that is ${tapped.countryName}. Try finding ${targetCountry.countryName}!`)
      }
    }, 20)

    return () => clearTimeout(timer)
  }, [selectedCountryId, isActive, targetCountry, status, speakText])

  if (!isActive || !targetCountry) return null

  const handleGiveHint = () => {
    soundFX.playWhistle()
    onSelectCountry(targetCountry.id)
  }

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-4 py-3 shadow-xl border-b-4 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-3 z-30 font-kids select-none animate-fade-in">
      
      {/* Left: Question Prompt */}
      <div className="flex items-center space-x-3">
        <div className="bg-amber-400 text-amber-950 font-black px-3 py-1.5 rounded-2xl text-sm flex items-center space-x-1 shadow-sm shrink-0">
          <span>🎮 QUIZ</span>
          <span>• ⭐ {streak}</span>
        </div>

        <div className="text-sm sm:text-lg font-extrabold leading-snug">
          {status === 'correct' ? (
            <span className="text-amber-300">{feedbackMsg}</span>
          ) : (
            <div>
              <span>Find </span>
              <span className="underline decoration-amber-400 decoration-4 font-black text-amber-200">
                {targetCountry.flagEmoji} {targetCountry.countryName}
              </span>
              <span className="hidden md:inline">
                {' '}(Capital: {targetCountry.capital} • Train: {targetCountry.trains?.[0]?.name})
              </span>
              {feedbackMsg && (
                <div className="text-xs sm:text-sm text-rose-200 font-bold mt-0.5">
                  {feedbackMsg}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex items-center space-x-2 shrink-0">
        {status === 'correct' ? (
          <button
            onClick={() => { soundFX.playClick(); pickNewQuestion(); }}
            className="bg-emerald-400 hover:bg-emerald-300 active:scale-95 text-emerald-950 font-black px-5 py-1.5 rounded-full shadow-md border-2 border-white cursor-pointer transition animate-bounce"
          >
            Next Question ➔
          </button>
        ) : (
          <button
            onClick={handleGiveHint}
            className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 font-bold text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-md cursor-pointer transition"
            title="Show me where it is on the map!"
          >
            💡 Show Me!
          </button>
        )}

        <button
          onClick={() => { soundFX.playClick(); pickNewQuestion(); }}
          className="bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm px-3 py-1.5 rounded-full cursor-pointer transition"
          title="Skip to another question"
        >
          🔄 Skip
        </button>

        <button
          onClick={() => { soundFX.playClick(); onClose(); }}
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm px-3 py-1.5 rounded-full cursor-pointer transition"
          title="Exit Quiz Mode"
        >
          ✕ Exit Quiz
        </button>
      </div>

    </div>
  )
}

export default QuizBanner
