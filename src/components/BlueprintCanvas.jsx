import { useEffect, useRef } from 'react'

export default function BlueprintCanvas() {
  const canvasRef = useRef(null)
  const scrollY = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onScroll = () => { scrollY.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })

    let raf
    const draw = () => {
      const W = canvas.width, H = canvas.height
      const parallax = scrollY.current * 0.3

      ctx.clearRect(0, 0, W, H)

      // Background
      const grad = ctx.createLinearGradient(0, 0, W, H)
      grad.addColorStop(0, '#F5F0E8')
      grad.addColorStop(1, '#EDE8DF')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      // Small grid
      ctx.strokeStyle = 'rgba(0,0,0,0.05)'
      ctx.lineWidth = 0.5
      const small = 40
      for (let x = 0; x < W; x += small) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = -(parallax % small); y < H; y += small) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // Large grid
      ctx.strokeStyle = 'rgba(26,122,122,0.12)'
      ctx.lineWidth = 1
      const big = 200
      for (let x = 0; x < W; x += big) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = -(parallax % big); y < H; y += big) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // Diagonal lines
      ctx.strokeStyle = 'rgba(26,122,122,0.06)'
      ctx.lineWidth = 0.5
      const diagSpacing = 120
      for (let i = -H; i < W + H; i += diagSpacing) {
        ctx.beginPath()
        ctx.moveTo(i - parallax * 0.5, 0)
        ctx.lineTo(i + H - parallax * 0.5, H)
        ctx.stroke()
      }

      // Concentric circles
      const cx = W * 0.75, cy = H * 0.45 + parallax * 0.1
      for (let r = 60; r < 400; r += 80) {
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(26,122,122,${Math.max(0, 0.12 - r * 0.0002)})`
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      // Crosshair
      ctx.strokeStyle = 'rgba(26,122,122,0.22)'
      ctx.lineWidth = 0.5
      ctx.beginPath(); ctx.moveTo(cx - 30, cy); ctx.lineTo(cx + 30, cy); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx, cy - 30); ctx.lineTo(cx, cy + 30); ctx.stroke()

      // Dimension lines
      ctx.strokeStyle = 'rgba(232,119,34,0.15)'
      ctx.lineWidth = 0.8
      const offsetPY = parallax * 0.2
      const dims = [[80,60,280,60],[280,60,280,200],[80,60,80,200],[80,200,280,200]]
      dims.forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath()
        ctx.moveTo(x1, y1 + offsetPY)
        ctx.lineTo(x2, y2 + offsetPY)
        ctx.stroke()
      })

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0, zIndex: 0,
        width: '100%', height: '100%',
      }}
    />
  )
}
