import { useState, useEffect, useRef } from 'react'

// Resilient synonym-to-ISO-code dictionary designed to absorb toddler pronunciation quirks!
const COUNTRY_SYNONYMS = {
  'jp': ['japan', 'shinkansen', 'tokyo', 'bullet train'],
  'us': ['america', 'usa', 'united states', 'acela', 'washington'],
  'fr': ['france', 'paris', 'tgv', 'frants'],
  'gb': ['uk', 'united kingdom', 'england', 'london', 'eurostar', 'flying scotsman', 'scotland'],
  'in': ['india', 'delhi', 'toy train', 'darjeeling', 'indya', 'vande bharat'],
  'de': ['germany', 'berlin', 'ice', 'schwebebahn'],
  'ch': ['switzerland', 'swiss', 'glacier express', 'bernina'],
  'au': ['australia', 'oz', 'the ghan', 'puffing billy', 'australya'],
  'ca': ['canada', 'jasper', 'ottawa', 'via rail'],
  'ke': ['kenya', 'mombasa', 'nairobi', 'safari'],
  'cn': ['china', 'beijing', 'maglev', 'chyna', 'shanghai'],
  'tr': ['turkey', 'ankara', 'eastern express', 'turki'],
  'ru': ['russia', 'moscow', 'trans-siberian', 'rusha'],
  'kz': ['kazakhstan', 'astana', 'tulpar', 'kazakstan', 'kazakistan'],
  'pe': ['peru', 'lima', 'vistadome', 'machu picchu'],
  'ar': ['argentina', 'buenos aires', 'train to the clouds', 'clouds train'],
  'br': ['brazil', 'rio', 'corcovado', 'brasil'],
  'my': ['malaysia', 'borneo', 'jungle train'],
  'mn': ['mongolia', 'gobi', 'ulaanbaatar'],
  'np': ['nepal', 'kathmandu', 'himalayas'],
  'es': ['spain', 'madrid', 'ave']
}

function VoiceControl({ onSelectCountry }) {
  const [listening, setListening] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [recognition, setRecognition] = useState(null)

  // 🛡️ React Ref pattern: preserves and delivers the absolute latest callback reference
  // to single-mount listeners, completely avoiding closures/render loops!
  const selectCountryRef = useRef(onSelectCountry)

  useEffect(() => {
    selectCountryRef.current = onSelectCountry
  }, [onSelectCountry])

  useEffect(() => {
    // Instantiate Web Speech Recognition (supports standard and webkit versions)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported in this browser.')
      return
    }

    const rec = new SpeechRecognition()
    rec.continuous = false
    rec.interimResults = false
    rec.lang = 'en-US'

    rec.onstart = () => {
      setListening(true)
      setErrorMessage('')
    }

    rec.onend = () => {
      setListening(false)
    }

    rec.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setListening(false)
      if (event.error === 'not-allowed') {
        setErrorMessage('Please allow microphone access! 🎙️')
      } else if (event.error === 'no-speech') {
        setErrorMessage("Didn't hear anything, try again! 🧐")
      } else {
        setErrorMessage('Oops, mic glitch! Try again.')
      }
    }

    rec.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim()
      console.log('Speech transcript:', transcript)

      // Match spoken phrase against synonyms dictionary
      let matchedCountry = null
      for (const [code, synonyms] of Object.entries(COUNTRY_SYNONYMS)) {
        const match = synonyms.some(synonym => transcript.includes(synonym))
        if (match) {
          matchedCountry = code.toUpperCase()
          break
        }
      }

      if (matchedCountry) {
        // Invoke latest callback stably via ref container
        selectCountryRef.current(matchedCountry)
        // Flash success feedback on the microphone button!
        setErrorMessage(`Found ${transcript}! 🚂✨`)
      } else {
        setErrorMessage(`Heard "${transcript}", try another country! 🧐`)
      }
    }

    setRecognition(rec)
    
    // Clean up on component destroy
    return () => {
      rec.abort()
    }
  }, []) // 🔒 Empty dependency array: single-mount instantiation guarantee!

  const toggleListen = () => {
    if (!recognition) {
      alert('Voice control is not supported in this browser or device. Try Chrome or Safari!')
      return
    }

    if (listening) {
      recognition.stop()
    } else {
      recognition.start()
    }
  }

  return (
    <div className="flex items-center space-x-3 select-none">
      {/* Microphone activation button */}
      <button
        onClick={toggleListen}
        className={`relative w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-md transition-all duration-300 border-4 cursor-pointer select-none ${
          listening 
            ? 'bg-red-500 border-red-300 text-white scale-110 animate-pulse' 
            : 'bg-amber-400 border-amber-200 text-amber-950 hover:bg-amber-300 hover:scale-105'
        }`}
        title={listening ? 'Listening... Speak now!' : 'Tap to speak a country!'}
      >
        {listening ? '🎙️' : '🗣️'}
        {listening && (
          <span className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping opacity-75"></span>
        )}
      </button>

      {/* Dynamic status text logs */}
      <div className="flex flex-col justify-center max-w-[200px] md:max-w-[300px] text-left">
        <div className="text-sm font-black text-sky-900 font-kids tracking-wide leading-tight">
          {listening ? '🔴 Listening...' : 'Speak Country!'}
        </div>
        <div className={`text-xs font-bold font-kids truncate ${
          errorMessage.includes('Found') ? 'text-emerald-600' : 'text-amber-700'
        }`}>
          {errorMessage || 'Tap and say "Japan" or "Spain"!'}
        </div>
      </div>
    </div>
  )
}

export default VoiceControl
