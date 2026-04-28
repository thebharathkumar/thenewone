import { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import './ThermalScrollEffect.css'

const ThermalScrollEffect = () => {
    const { theme } = useTheme()
    const isLight = theme === 'light'
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Calculate dynamic positions based on scroll
    // We'll map the scroll position to some gentle movement of background blobs
    const yOffset1 = scrollY * 0.15
    const yOffset2 = scrollY * -0.1
    const xOffset = Math.sin(scrollY * 0.002) * 100

    return (
        <div className="thermal-scroll-container">
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
