import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import './ThermalScrollEffect.css'

const ThermalScrollEffect = ({ scrollY = 0 }) => {
  const reducedMotion = usePrefersReducedMotion()
  if (reducedMotion) return null

  const yOffset1 = scrollY * 0.15
  const yOffset2 = scrollY * -0.1
  const xOffset = Math.sin(scrollY * 0.002) * 100

  return (
    <div className="thermal-scroll-container" aria-hidden="true">
      <div
        className="thermal-blob blob-1"
        style={{ transform: `translate3d(${xOffset}px, ${yOffset1}px, 0)` }}
      />
      <div
        className="thermal-blob blob-2"
        style={{ transform: `translate3d(${-xOffset}px, ${yOffset2}px, 0)` }}
      />
      <div
        className="thermal-blob blob-3"
        style={{ transform: `translate3d(${xOffset * 0.5}px, ${yOffset1 * 0.5}px, 0)` }}
      />
    </div>
  )
}

export default ThermalScrollEffect
