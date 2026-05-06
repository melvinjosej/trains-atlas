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

    // 1. Find and clear 'country-selected' from any previously clicked paths or groups
    const activePaths = containerRef.current.querySelectorAll('.country-selected')
    activePaths.forEach(el => {
      el.classList.remove('country-selected')
    })

    // 2. If there is an active selection, highlight all corresponding nodes (handles island paths & groups)
    if (selectedCountryId) {
      const codeLower = selectedCountryId.toLowerCase()
      
      // Query both direct path elements and parent group tags with the lowercase ISO code
      const targetElements = containerRef.current.querySelectorAll(`.${codeLower}, #${codeLower}`)
      
      if (targetElements.length > 0) {
        targetElements.forEach(el => {
          el.classList.add('country-selected')
          
          // Also highlight all child paths inside a grouped country so the whole island mesh lights up!
          if (el.tagName.toLowerCase() === 'g') {
            const childPaths = el.querySelectorAll('path')
            childPaths.forEach(path => path.classList.add('country-selected'))
          }
        })
      }
    }
  }, [selectedCountryId, svgRaw])

  // Fast touch-friendly event delegation handler (supports complex grouped island meshes)
  const handleMapClick = (e) => {
    // Find the closest SVG path or element that was touched
    const targetPath = e.target.closest('path')
    if (!targetPath) return

    // Extract class names from the path itself
    const pathClassList = targetPath.getAttribute('class') || ''
    
    // For grouped countries (like Japan, UK, Australia), the class and ID are defined on the parent <g> tag
    const parentGroup = targetPath.closest('g')
    const groupClassList = parentGroup ? (parentGroup.getAttribute('class') || '') : ''
    const groupGroupId = parentGroup ? (parentGroup.getAttribute('id') || '') : ''
    
    // Combine all potential identifier strings into one lowercase token list
    const combinedClassesString = `${pathClassList} ${groupClassList} ${groupGroupId}`.toLowerCase()
    const tokens = combinedClassesString.split(/\s+/)
    
    // Find any valid 2-letter country code token (ignoring common layout keywords)
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
      // Tapping open ocean water clears the active selection
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
      onClick={handleMapClick}
      className="w-full h-full overflow-hidden relative bg-[#e0f2fe] flex items-center justify-center cursor-pointer"
      dangerouslySetInnerHTML={{ __html: svgRaw }}
    />
  )
}

export default MapView
