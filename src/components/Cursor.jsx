import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const follower = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const gsap = window.gsap
    if (!gsap) return

    const onMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 })
    }

    const animate = () => {
      follower.current.x += (mouse.current.x - follower.current.x) * 0.12
      follower.current.y += (mouse.current.y - follower.current.y) * 0.12
      gsap.set(ring, { x: follower.current.x, y: follower.current.y })
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    const onEnter = () => {
      gsap.to(dot, { scale: 2.5, backgroundColor: 'var(--orange)', duration: 0.3 })
      gsap.to(ring, { scale: 1.5, borderColor: 'rgba(232,119,34,0.5)', duration: 0.3 })
    }
    const onLeave = () => {
      gsap.to(dot, { scale: 1, backgroundColor: 'var(--teal)', duration: 0.3 })
      gsap.to(ring, { scale: 1, borderColor: 'rgba(26,122,122,0.5)', duration: 0.3 })
    }

    document.addEventListener('mousemove', onMove)

    const attachHover = () => {
      document.querySelectorAll('a, button, .service-card, .social-btn').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attachHover()
    const mo = new MutationObserver(attachHover)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      mo.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', width: 12, height: 12,
        background: 'var(--teal)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9999,
        transform: 'translate(-50%,-50%)',
        mixBlendMode: 'screen',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', width: 36, height: 36,
        border: '1.5px solid rgba(26,122,122,0.5)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 9998,
        transform: 'translate(-50%,-50%)',
      }} />
    </>
  )
}
