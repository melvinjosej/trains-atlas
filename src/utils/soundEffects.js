// Web Audio API Sound Synthesizer for Trains Atlas
// Zero external asset dependencies, instant playback, kid-friendly audio feedback!

class SoundEffects {
  constructor() {
    this.ctx = null
    this.enabled = true
  }

  initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  isMuted() {
    return localStorage.getItem('trains-atlas-muted') === 'true'
  }

  // 🚂 Classic cheerful steam train whistle ("Choo-Choo!")
  playWhistle() {
    if (this.isMuted()) return
    try {
      this.initContext()
      if (!this.ctx) return

      const now = this.ctx.currentTime

      // Two-puff whistle: short puff, then longer puff
      this.triggerWhistleNote(now, 0.28)
      this.triggerWhistleNote(now + 0.36, 0.55)
    } catch (e) {
      console.warn('Audio playback error:', e)
    }
  }

  triggerWhistleNote(startTime, duration) {
    // Steam whistle chord (major triad with slight detune for authentic steam warmth)
    const freqs = [587.33, 739.99, 880.0] // D5, F#5, A5
    freqs.forEach((f, idx) => {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = idx === 0 ? 'triangle' : 'sine'
      osc.frequency.setValueAtTime(f, startTime)
      // Slight pitch bend up at start
      osc.frequency.exponentialRampToValueAtTime(f * 1.02, startTime + 0.05)
      osc.frequency.exponentialRampToValueAtTime(f, startTime + duration)

      gain.gain.setValueAtTime(0.001, startTime)
      gain.gain.linearRampToValueAtTime(0.12 / freqs.length, startTime + 0.04)
      gain.gain.setValueAtTime(0.12 / freqs.length, startTime + duration - 0.08)
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(startTime)
      osc.stop(startTime + duration)
    })
  }

  // ⚡ High-speed bullet train horn
  playHorn() {
    if (this.isMuted()) return
    try {
      this.initContext()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const freqs = [311.13, 370.0, 466.16] // Eb4, F#4, Bb4
      freqs.forEach((f) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(f, now)

        // Filter for brassy horn sound
        const filter = this.ctx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(1200, now)

        gain.gain.setValueAtTime(0.001, now)
        gain.gain.linearRampToValueAtTime(0.08, now + 0.03)
        gain.gain.setValueAtTime(0.08, now + 0.35)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45)

        osc.connect(filter)
        filter.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(now)
        osc.stop(now + 0.45)
      })
    } catch (e) {
      console.warn('Audio error:', e)
    }
  }

  // 🎉 Happy discovery / celebration chime
  playSuccessChime() {
    if (this.isMuted()) return
    try {
      this.initContext()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + index * 0.08)

        gain.gain.setValueAtTime(0.001, now + index * 0.08)
        gain.gain.linearRampToValueAtTime(0.15, now + index * 0.08 + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.35)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(now + index * 0.08)
        osc.stop(now + index * 0.08 + 0.35)
      })
    } catch (e) {
      console.warn('Audio error:', e)
    }
  }

  // 👆 Soft tactile click for buttons
  playClick() {
    if (this.isMuted()) return
    try {
      this.initContext()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, now)
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04)

      gain.gain.setValueAtTime(0.1, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.04)
    } catch (e) {
      console.warn('Audio error:', e)
    }
  }
}

export const soundFX = new SoundEffects()
