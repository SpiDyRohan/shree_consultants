import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      if (bar) bar.style.transform = `scaleX(${progress})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={barRef} style={{
      position: 'fixed', top: 0, left: 0, zIndex: 2000,
      height: 2,
      background: 'linear-gradient(90deg, var(--teal), var(--orange))',
      width: '100%', transformOrigin: 'left', transform: 'scaleX(0)',
      pointerEvents: 'none',
    }} />
  )
}
