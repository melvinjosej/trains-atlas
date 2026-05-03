import { useState, useEffect, useRef } from 'react'
import worldMapUrl from '../assets/world_map.svg'

function MapView({ selectedCountryId, onSelectCountry }) {
  const [svgRaw, setSvgRaw] = useState('')
  const [loading, setLoading] = useState(true)
  const containerRef = useRef(null)

  // Fetch the SVG file content dynamically via its optimized bundler asset URL
  useEffect(() => {
    fetch(worldMapUrl)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch map asset')
        return res.text()
      })
      .then(text => {
        setSvgRaw(text)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading world map SVG:', err)
        setLoading(false)
      })
  }, [])

  // Side-effect: Synchronize selected React state by toggling CSS highlight classes in the SVG DOM nodes
  useEffect(() => {
    if (!containerRef.current || !svgRaw) return

    // 1. Find and clear 'country-selected' from any previously clicked paths
    const activePaths = containerRef.current.querySelectorAll('.country-selected')
    activePaths.forEach(path => {
      path.classList.remove('country-selected')
    })

    // 2. If there is an active selection, highlight all corresponding nodes (some countries have multiple island paths)
    if (selectedCountryId) {
      const codeLower = selectedCountryId.toLowerCase()
      // We query all nodes with the lowercase ISO class, e.g., .jp or .us
      const targetPaths = containerRef.current.querySelectorAll(`.${codeLower}`)
      
      if (targetPaths.length > 0) {
        targetPaths.forEach(path => {
          path.classList.add('country-selected')
        })
        
        // Optional: We could pull bounding boxes to center the map, 
        // but for a 4yo, keeping the whole map visible is usually easier so they don't get lost.
      }
    }
  }, [selectedCountryId, svgRaw])

  // Fast touch-friendly event delegation handler
  const handleMapClick = (e) => {
    // Find the closest SVG path or element that was touched
    const targetPath = e.target.closest('path')
    if (!targetPath) return

    const classList = targetPath.getAttribute('class') || ''
    
    // Extract the 2-letter lowercase country ISO code class from the land node
    const classes = classList.split(' ')
    
    // Our target country classes in the SVG are exactly 2 letters long (e.g. 'jp', 'us', 'fr')
    // but we ignore general styles like 'pe' if it doesn't have trains data, wait!
    // Let's find if any class is a 2-letter code.
    const countryCode = classes.find(c => 
      c !== 'land' && 
      c !== 'circle' && 
      c !== 'coast' && 
      c !== 'ocean' && 
      c !== 'lake' && 
      c.length === 2
    )

    if (countryCode) {
      const upperCode = countryCode.toUpperCase()
      onSelectCountry(upperCode)
    } else {
      // Tapping open water or unsupported land clears the slide-over panel
      if (classes.includes('ocean') || classes.includes('lake') || classList === '') {
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
      onClick={handleMapClick}
      className="w-full h-full overflow-hidden relative bg-[#e0f2fe] flex items-center justify-center cursor-pointer"
      dangerouslySetInnerHTML={{ __html: svgRaw }}
    />
  )
}

export default MapView
