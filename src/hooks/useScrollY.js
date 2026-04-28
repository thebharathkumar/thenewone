import { useEffect, useState } from 'react'

// Single rAF-throttled window.scrollY subscription.
export const useScrollY = () => {
  const [scrollY, setScrollY] = useState(typeof window === 'undefined' ? 0 : window.scrollY)

  useEffect(() => {
    let raf = 0
    let pending = false

    const onScroll = () => {
      if (pending) return
      pending = true
      raf = requestAnimationFrame(() => {
        pending = false
        setScrollY(window.scrollY)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return scrollY
}
