import { useState, useEffect, useRef, useCallback } from 'react'
import worldMapUrl from '../assets/world_map.svg'
import { REGION_PRESETS } from '../data/trainsData'
import { soundFX } from '../utils/soundEffects'

// Module-level memory cache so the 1.1MB SVG string is fetched only once per session
let cachedSvgRaw = null

function MapView({ selectedCountryId, onSelectCountry }) {
  const [svgRaw, setSvgRaw] = useState(() => cachedSvgRaw || '')
  const [loading, setLoading] = useState(() => !cachedSvgRaw)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 }) // in % of unscaled SVG dimensions
  const [activeRegion, setActiveRegion] = useState('world')
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0, hasMoved: false })

  const containerRef = useRef(null)
  const svgWrapperRef = useRef(null)

  // Fetch and cache SVG asset if not already cached
  useEffect(() => {
    if (cachedSvgRaw) return

    let cancelled = false
    fetch(worldMapUrl)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch map asset')
        return res.text()
      })
      .then(text => {
        if (cancelled) return
        cachedSvgRaw = text
        setSvgRaw(text)
        setLoading(false)
      })
      .catch(err => {
        if (cancelled) return
        console.error('Error loading world map SVG:', err)
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Highlight selected country and auto-focus (zoom & pan) smoothly to it
  useEffect(() => {
    if (!containerRef.current || !svgRaw) return

    // 1. Clear previous selection highlights
    const activePaths = containerRef.current.querySelectorAll('.country-selected')
    activePaths.forEach(el => el.classList.remove('country-selected'))

    // 2. Highlight new selection & compute bounding box for smooth auto-zoom
    const rafId = requestAnimationFrame(() => {
      if (!containerRef.current) return

      if (selectedCountryId) {
        const codeLower = selectedCountryId.toLowerCase()
        const targetElements = containerRef.current.querySelectorAll(`.${codeLower}, #${codeLower}`)

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity

        if (targetElements.length > 0) {
          targetElements.forEach(el => {
            el.classList.add('country-selected')
            if (el.tagName.toLowerCase() === 'g') {
              const childPaths = el.querySelectorAll('path')
              childPaths.forEach(path => path.classList.add('country-selected'))
            }

            try {
              const bbox = el.getBBox()
              if (bbox && bbox.width > 0 && bbox.height > 0) {
                minX = Math.min(minX, bbox.x)
                minY = Math.min(minY, bbox.y)
                maxX = Math.max(maxX, bbox.x + bbox.width)
                maxY = Math.max(maxY, bbox.y + bbox.height)
              }
            } catch {
              // Ignore getBBox errors on hidden/empty nodes
            }
          })
        }

        // If valid bounding box found, calculate smooth auto-zoom & pan center
        if (minX < Infinity && maxX > -Infinity) {
          const W = 2752.766
          const H = 1537.631
          const cx = (minX + maxX) / 2
          const cy = (minY + maxY) / 2
          const boxW = Math.max(maxX - minX, 30)
          const boxH = Math.max(maxY - minY, 30)

          // Compute ideal zoom level clamped between 1.8x and 5.5x
          const idealZoom = Math.min(W / (boxW * 2.8), H / (boxH * 2.8))
          const targetZoom = Math.min(Math.max(idealZoom, 1.8), 5.5)

          // Normalized offset from center of map in percentage
          const normX = ((W / 2 - cx) / W) * 100
          const normY = ((H / 2 - cy) / H) * 100

          setZoom(targetZoom)
          setPan({ x: normX, y: normY })
          setActiveRegion('custom')
        }
      } else {
        // Reset to world view when country detail closes
        setZoom(1)
        setPan({ x: 0, y: 0 })
        setActiveRegion('world')
      }
    })

    return () => cancelAnimationFrame(rafId)
  }, [selectedCountryId, svgRaw])

  // Region quick-jump handler
  const handleSelectRegion = useCallback((regionPreset) => {
    soundFX.playClick()
    setActiveRegion(regionPreset.id)
    setZoom(regionPreset.zoom)
    setPan({ x: regionPreset.x, y: regionPreset.y })
    if (regionPreset.id === 'world' && selectedCountryId) {
      onSelectCountry(null)
    }
  }, [selectedCountryId, onSelectCountry])

  // Zoom button controls
  const handleZoomIn = () => {
    soundFX.playClick()
    setZoom(prev => Math.min(prev * 1.4, 7))
    setActiveRegion('custom')
  }

  const handleZoomOut = () => {
    soundFX.playClick()
    setZoom(prev => {
      const next = Math.max(prev / 1.4, 1)
      if (next === 1) setPan({ x: 0, y: 0 })
      return next
    })
    setActiveRegion('custom')
  }

  const handleResetView = () => {
    soundFX.playClick()
    setZoom(1)
    setPan({ x: 0, y: 0 })
    setActiveRegion('world')
    if (selectedCountryId) {
      onSelectCountry(null)
    }
  }

  // Mouse / Touch Drag to Pan when zoomed in
  const handlePointerDown = (e) => {
    if (zoom <= 1) return
    setIsDragging(true)
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
      hasMoved: false
    }
  }

  const handlePointerMove = (e) => {
    if (!isDragging || zoom <= 1) return
    const dx = e.clientX - dragStartRef.current.x
    const dy = e.clientY - dragStartRef.current.y

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      dragStartRef.current.hasMoved = true
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const deltaXPercent = (dx / rect.width) * 100 / zoom
      const deltaYPercent = (dy / rect.height) * 100 / zoom

      const maxPan = 45
      setPan({
        x: Math.min(Math.max(dragStartRef.current.panX + deltaXPercent, -maxPan), maxPan),
        y: Math.min(Math.max(dragStartRef.current.panY + deltaYPercent, -maxPan), maxPan)
      })
    }
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  // Fast touch-friendly event delegation handler for country selection
  const handleMapClick = (e) => {
    if (dragStartRef.current.hasMoved) {
      dragStartRef.current.hasMoved = false
      return
    }

    const targetPath = e.target.closest('path')
    if (!targetPath) return

    const pathClassList = targetPath.getAttribute('class') || ''
    const parentGroup = targetPath.closest('g')
    const groupClassList = parentGroup ? (parentGroup.getAttribute('class') || '') : ''
    const groupGroupId = parentGroup ? (parentGroup.getAttribute('id') || '') : ''

    const combinedClassesString = `${pathClassList} ${groupClassList} ${groupGroupId}`.toLowerCase()
    const tokens = combinedClassesString.split(/\s+/)

    const countryCode = tokens.find(token =>
      token !== 'land' &&
      token !== 'circle' &&
      token !== 'coast' &&
      token !== 'ocean' &&
      token !== 'lake' &&
      token.length === 2
    )

    if (countryCode) {
      const upperCode = countryCode.toUpperCase()
      onSelectCountry(upperCode)
    } else {
      if (tokens.includes('ocean') || tokens.includes('lake')) {
        onSelectCountry(null)
      }
    }
  }

  if (loading) {
    return (
      <div className="w-full h-full bg-sky-100 flex flex-col items-center justify-center">
        <div className="text-6xl mb-4 animate-bounce">🌍</div>
        <div className="text-2xl font-bold text-sky-600 font-kids animate-pulse">
          Unfolding the Giant Map... 🚂💨
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onClick={handleMapClick}
      className={`w-full h-full overflow-hidden relative bg-[#e0f2fe] flex items-center justify-center select-none ${
        zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-pointer'
      }`}
    >
      {/* 🗺️ Transformable SVG Wrapper with hardware-accelerated smooth transitions */}
      <div
        ref={svgWrapperRef}
        className="w-full h-full flex items-center justify-center origin-center"
        style={{
          transform: `scale(${zoom}) translate(${pan.x}%, ${pan.y}%)`,
          transition: isDragging ? 'none' : 'transform 650ms cubic-bezier(0.22, 1, 0.36, 1)'
        }}
        dangerouslySetInnerHTML={{ __html: svgRaw }}
      />

      {/* 🔍 FLOATING TOP-LEFT ZOOM CONTROLS */}
      <div className="absolute top-4 left-4 flex flex-col space-y-2 z-20">
        <button
          onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
          className="w-11 h-11 bg-white/90 hover:bg-white active:scale-90 text-slate-800 rounded-2xl shadow-lg border-2 border-teal-400 flex items-center justify-center text-2xl font-black cursor-pointer transition"
          title="Zoom In ➕"
        >
          ➕
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
          disabled={zoom <= 1}
          className={`w-11 h-11 rounded-2xl shadow-lg border-2 flex items-center justify-center text-2xl font-black transition ${
            zoom <= 1
              ? 'bg-slate-100/70 border-slate-300 text-slate-300 cursor-not-allowed'
              : 'bg-white/90 hover:bg-white active:scale-90 text-slate-800 border-teal-400 cursor-pointer'
          }`}
          title="Zoom Out ➖"
        >
          ➖
        </button>
        {zoom > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); handleResetView(); }}
            className="w-11 h-11 bg-amber-400 hover:bg-amber-300 active:scale-90 text-amber-950 rounded-2xl shadow-lg border-2 border-white flex items-center justify-center text-xl font-black cursor-pointer transition animate-bounce-slow"
            title="Reset Whole World Map 🌍"
          >
            🌍
          </button>
        )}
      </div>

      {/* 🧭 FLOATING BOTTOM REGION QUICK-JUMP BAR */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-xl border-2 border-teal-300 flex items-center space-x-1.5 z-20 max-w-[95%] overflow-x-auto no-scrollbar"
      >
        <span className="text-xs font-extrabold text-teal-800 px-2 hidden sm:inline uppercase tracking-wider">
          Jump To:
        </span>
        {REGION_PRESETS.map((preset) => {
          const isActive = activeRegion === preset.id
          return (
            <button
              key={preset.id}
              onClick={() => handleSelectRegion(preset)}
              className={`px-3 py-1 rounded-full text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-teal-500 text-white shadow-sm scale-105'
                  : 'bg-slate-100 hover:bg-teal-50 text-slate-700'
              }`}
            >
              {preset.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default MapView
