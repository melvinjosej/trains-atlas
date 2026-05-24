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
  'es': ['spain', 'madrid', 'ave'],
  'ir': ['iran', 'tehran', 'veresk', 'persian'],
  'af': ['afghanistan', 'kabul', 'mazar', 'friendship bridge', 'afganistan'],
  'sa': ['saudi arabia', 'mecca', 'medina', 'haramain', 'saudi'],
  'om': ['oman', 'muscat', 'hajar', 'wadi'],
  'th': ['thailand', 'bangkok', 'chiang mai', 'srt'],
  'la': ['laos', 'lane xang', 'mekong', 'vientiane'],
  'sg': ['singapore', 'mrt', 'sentosa', 'changi'],
  'hk': ['hong kong', 'vibrant express', 'kowloon', 'hongkong'],
  'hr': ['croatia', 'split', 'zagreb', 'croatya', 'hz'],
  'jo': ['jordan', 'amman', 'petra', 'wadi rum', 'jordanian'],
  'mm': ['myanmar', 'burma', 'gokteik', 'yangon'],
  'pa': ['panama', 'panama city', 'canal', 'panama canal railway', 'ship-watching'],
  'vn': ['vietnam', 'hanoi', 'reunion express', 'vietname'],
  'pk': ['pakistan', 'islamabad', 'karachi', 'khyber pass', 'steam safari', 'pakistanian'],
  'uz': ['uzbekistan', 'tashkent', 'samarkand', 'afrosiyob', 'uzbekstan'],
  'tm': ['turkmenistan', 'ashgabat', 'karakum', 'turkmenstan'],
  'kh': ['cambodia', 'phnom penh', 'bamboo train', 'norry', 'cambodya'],
  've': ['venezuela', 'caracas', 'gran ferrocarril', 'venezuala'],
  'ec': ['ecuador', 'quito', 'devil\'s nose', 'nariz del diablo', 'ecuadorian'],
  'be': ['belgium', 'brussels', 'chocolate', 'double-decker'],
  'kr': ['south korea', 'korea', 'seoul', 'ktx'],
  'co': ['colombia', 'bogota', 'coffee train', 'sabana', 'colombya'],
  'by': ['belarus', 'minsk', 'children railway', 'belarussia'],
  'ua': ['ukraine', 'kiev', 'kyiv', 'tunnel of love', 'klevan', 'ukrainya'],
  'ye': ['yemen', 'aden', 'sanaa', 'desert express', 'yemenian'],
  'dk': ['denmark', 'copenhagen', 'oresund', 'bridge train', 'denmarck'],
  'it': ['italy', 'rome', 'milan', 'frecciarossa', 'red arrow', 'italya'],
  'fi': ['finland', 'helsinki', 'santa claus express', 'lapland', 'rovaniemi', 'finlandia'],
  'no': ['norway', 'oslo', 'flam', 'fjord', 'flamsbana', 'norwey'],
  'gr': ['greece', 'athens', 'odontotos', 'kalavryta', 'tooth train', 'greek'],
  'ro': ['romania', 'bucharest', 'mocanita', 'vaser', 'forest steam', 'romanya'],
  'id': ['indonesia', 'jakarta', 'bandung', 'whoosh', 'indonesya'],
  'se': ['sweden', 'stockholm', 'inlandsbanan', 'arctic circle', 'swedn'],
  'bd': ['bangladesh', 'dhaka', 'maitree express', 'jamuna', 'bangladeshi'],
  'at': ['austria', 'vienna', 'semmering', 'railjet', 'austira', 'ostria'],
  'bo': ['bolivia', 'la paz', 'expreso del sur', 'salt train', 'uyuni', 'bolivya'],
  'mx': ['mexico', 'tren maya', 'mayan train', 'yucatan', 'mexico train', 'mexico bullet', 'mexico highspeed'],
  'tj': ['tajikistan', 'dushanbe', 'kulob', 'pamir', 'tajakistan'],
  'cl': ['chile', 'santiago', 'efe chillan', 'efe bullet', 'volcano train', 'chili'],
  'hu': ['hungary', 'budapest', 'children railway', 'gyermekvasut', 'hungaria']
}

function VoiceControl({ onSelectCountry }) {
  const [listening, setListening] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [recognition, setRecognition] = useState(null)

  // 🔧 MediaRecorder & Hardware Selection States
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [audioUrl, setAudioUrl] = useState('')
  const [recordingDiagnostic, setRecordingDiagnostic] = useState(false)
  const [diagnosticStatus, setDiagnosticStatus] = useState('')
  const [showDiagnostics, setShowDiagnostics] = useState(false)
  
  // 🎙️ Live Microphone Inputs List
  const [micDevices, setMicDevices] = useState([])
  const [selectedMicId, setSelectedMicId] = useState('')

  const selectCountryRef = useRef(onSelectCountry)

  useEffect(() => {
    selectCountryRef.current = onSelectCountry
  }, [onSelectCountry])

  // 🎙️ Scan all connected hardware microphone devices on mount
  useEffect(() => {
    const getMics = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true })
        const devices = await navigator.mediaDevices.enumerateDevices()
        const audioInputs = devices.filter(device => device.kind === 'audioinput')
        setMicDevices(audioInputs)
        if (audioInputs.length > 0) {
          setSelectedMicId(audioInputs[0].deviceId)
        }
      } catch (err) {
        console.warn('Mic hardware enumeration blocked or failed:', err)
      }
    }
    getMics()
  }, [])

  useEffect(() => {
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
        const match = synonyms.some(synonym => {
          const escapedSynonym = synonym.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
          const regex = new RegExp(`\\b${escapedSynonym}\\b`, 'i')
          return regex.test(transcript)
        })
        if (match) {
          matchedCountry = code.toUpperCase()
          break
        }
      }

      if (matchedCountry) {
        selectCountryRef.current(matchedCountry)
        setErrorMessage(`Found ${transcript}! 🚂✨`)
        rec.stop() // 🛑 Stop listening immediately once a country is successfully recognized!
      } else {
        setErrorMessage(`Heard "${transcript}", try another country! 🧐`)
      }
    }

    setRecognition(rec)
    
    return () => {
      rec.abort()
    }
  }, [])

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

  // ⌨️ Spacebar keyboard shortcut listener implementation (using stable callback reference)
  const toggleListenRef = useRef(toggleListen)
  useEffect(() => {
    toggleListenRef.current = toggleListen
  }, [toggleListen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore spacebar typing locks inside text inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault() // Blocks native browser page scrolling
        toggleListenRef.current()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, []) // 🔒 Stable single-mount key listener!

  // 🛠️ MediaRecorder Hardware-Level Diagnostic Methods
  const startDiagnosticRecord = async () => {
    try {
      setDiagnosticStatus('Connecting to selected microphone...')
      
      const constraints = {
        audio: selectedMicId ? { deviceId: { exact: selectedMicId } } : true
      }
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      setDiagnosticStatus('Mic connected! Speak into your active mic... 🎙️')
      
      const recorder = new MediaRecorder(stream)
      const chunks = []
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data)
      }
      
      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' })
        const url = URL.createObjectURL(audioBlob)
        setAudioUrl(url)
        setDiagnosticStatus('Voice captured successfully! Tap Play below 🎧')
        
        stream.getTracks().forEach(track => track.stop())
      }
      
      recorder.start()
      setMediaRecorder(recorder)
      setRecordingDiagnostic(true)
    } catch (err) {
      console.error('Mic diagnostic hardware error:', err)
      setDiagnosticStatus(`Hardware error: ${err.name}. Channel blocked! 🧐`)
    }
  }

  const stopDiagnosticRecord = () => {
    if (mediaRecorder && recordingDiagnostic) {
      mediaRecorder.stop()
      setRecordingDiagnostic(false)
    }
  }

  const playDiagnosticPlayback = () => {
    if (!audioUrl) return
    const audio = new Audio(audioUrl)
    audio.play()
    setDiagnosticStatus('Playing back captured sound waves... 🎧')
  }

  return (
    <div className="flex flex-col items-center relative">
      
      {/* 🎙️ MAIN mic interaction bar */}
      <div className="flex items-center space-x-3 select-none z-10">
        <button
          onClick={toggleListen}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-md transition-all duration-300 border-4 cursor-pointer select-none ${
            listening 
              ? 'bg-red-500 border-red-300 text-white scale-110 animate-pulse' 
              : 'bg-amber-400 border-amber-200 text-amber-950 hover:bg-amber-300 hover:scale-105'
          }`}
          title={listening ? 'Listening... Speak now! (Or press Spacebar)' : 'Tap to speak a country! (Or press Spacebar)'}
        >
          {listening ? '🎙️' : '🗣️'}
          {listening && (
            <span className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping opacity-75"></span>
          )}
        </button>

        <div className="flex flex-col justify-center max-w-[200px] md:max-w-[300px] text-left">
          <div className="text-sm font-black text-sky-900 font-kids tracking-wide leading-tight flex items-center space-x-2">
            <span>{listening ? '🔴 Listening...' : 'Speak Country!'}</span>
            <span className="hidden md:inline bg-sky-100 border border-sky-300 text-sky-800 font-bold text-[9px] px-1.5 py-0.5 rounded-full">SPACEBAR KEY</span>
          </div>
          <div className={`text-xs font-bold font-kids truncate ${
            errorMessage.includes('Found') ? 'text-emerald-600' : 'text-amber-700'
          }`}>
            {errorMessage || 'Say "Japan", "Borneo" or "Spain"!'}
          </div>
        </div>

        <button
          onClick={() => setShowDiagnostics(!showDiagnostics)}
          className="text-lg bg-white/40 hover:bg-white/60 p-1.5 rounded-full cursor-pointer transition"
          title="🔧 Microphone Hardware Settings"
        >
          🔧
        </button>
      </div>

      {/* 🔧 HARDWARE DIAGNOSTIC DRAWER MODAL WITH MIC SELECTOR */}
      {showDiagnostics && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-md p-5 rounded-2xl shadow-xl text-white w-[320px] md:w-[380px] text-left border-2 border-slate-700 z-50 font-mono text-xs leading-relaxed">
          <div className="flex justify-between items-center border-b border-slate-700 pb-2 mb-3">
            <span className="font-bold text-rose-400 text-sm">🎙️ HARDWARE AUDIO INPUTS</span>
            <button 
              onClick={() => setShowDiagnostics(false)}
              className="text-slate-400 hover:text-white text-base font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
          
          <div className="mb-4">
            <label className="block text-slate-400 mb-1 font-bold text-[10px] uppercase tracking-wider">Active Recording Device:</label>
            {micDevices.length > 0 ? (
              <select
                value={selectedMicId}
                onChange={(e) => {
                  setSelectedMicId(e.target.value)
                  setDiagnosticStatus(`Switched input to selected device 🎙️`)
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-xs font-mono focus:outline-none focus:border-rose-500 cursor-pointer truncate"
              >
                {micDevices.map((device, idx) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || `Microphone Channel ${idx + 1}`}
                  </option>
                ))}
              </select>
            ) : (
              <div className="bg-slate-950 text-rose-400 p-2 rounded border border-slate-800 text-center font-semibold">
                ⚠️ No hardware microphones found!
              </div>
            )}
          </div>

          <div className="bg-slate-950 p-3 rounded-lg mb-3 text-amber-400 font-semibold border border-slate-800 min-h-[40px] flex items-center leading-snug">
            {diagnosticStatus || 'Ready. Press Record and speak to test!'}
          </div>

          <div className="flex space-x-2">
            {recordingDiagnostic ? (
              <button
                onClick={stopDiagnosticRecord}
                className="flex-1 bg-red-600 hover:bg-red-700 font-bold py-2.5 rounded-lg text-center cursor-pointer border border-red-500"
              >
                ⏹️ Stop Record
              </button>
            ) : (
              <button
                onClick={startDiagnosticRecord}
                className="flex-1 bg-slate-700 hover:bg-slate-600 font-bold py-2.5 rounded-lg text-center cursor-pointer border border-slate-600"
              >
                ⏺️ Start Record
              </button>
            )}

            <button
              onClick={playDiagnosticPlayback}
              disabled={!audioUrl}
              className={`flex-1 font-bold py-2.5 rounded-lg text-center cursor-pointer border ${
                audioUrl 
                  ? 'bg-emerald-600 border-emerald-500 hover:bg-emerald-700 text-white' 
                  : 'bg-slate-800 border-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              ▶️ Play Test Voice
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default VoiceControl
