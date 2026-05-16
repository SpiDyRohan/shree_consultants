import { useEffect, useRef } from 'react'
import styles from './Services.module.css'

const services = [
  {
    num: '01', en: 'Planning', hi: '',
    desc: 'Site analysis, architectural planning, and layout design tailored to your vision and compliance needs.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 20H6a2 2 0 01-2-2V6a2 2 0 012-2h8l4 4v12a2 2 0 01-2 2h-1M9 20v-5a1 1 0 011-1h4a1 1 0 011 1v5M9 20H15" />
        <path d="M15 2v4h4" />
      </svg>
    )
  },
  {
    num: '02', en: 'Supervision', hi: '',
    desc: 'On-site expert supervision ensuring quality, timeline adherence, and proper material usage.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
      </svg>
    )
  },
  {
    num: '03', en: 'Vastu Shastra', hi: '',
    desc: 'Ancient Vastu science integrated into modern design for harmonious, positive living and working spaces.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    )
  },
  {
    num: '04', en: '2D & 3D Design', hi: '',
    desc: 'Professional floor plans, elevations, and photorealistic 3D renders to visualize your project before construction.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    )
  },
  {
    num: '05', en: 'Interior Design', hi: '',
    desc: 'Complete interior solutions — modular kitchens, false ceilings, flooring, lighting, and décor concepts.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    num: '06', en: 'Permissions & Approvals', hi: '',
    desc: 'End-to-end handling of municipal permissions, RERA compliance, NOCs, and government approvals.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    num: '07', en: 'Construction with Material', hi: '',
    desc: 'Turnkey construction service — we procure quality materials, manage labor, and build your complete project under one roof.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 20h20M4 20V10l8-6 8 6v10M10 20v-6h4v6" />
        <path d="M12 4v2" />
      </svg>
    ),
    last: true
  },
]

export default function Services() {
  const gridRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    const gsap = window.gsap
    const ST = window.ScrollTrigger
    if (!gsap || !ST) return

    gsap.set(headingRef.current, { clipPath: 'inset(0 100% 0 0)' })
    gsap.to(headingRef.current, {
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.out'
    })

    gsap.to(gridRef.current.querySelectorAll(`.${styles.card}`), {
      scrollTrigger: { trigger: gridRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out'
    })
  }, [])

  return (
    <section id="services" className={styles.section}>
      <div className={styles.diagonalBg} />

      <div className={styles.header}>
        <div>
          <span className={styles.label}>What We Do</span>
          <h2 ref={headingRef} className={styles.heading}>
            Our <em>Services</em>
          </h2>
        </div>
        <p className={styles.headerDesc}>
          Comprehensive engineering solutions — from concept to completion, delivered with expertise and care.
        </p>
      </div>

      <div ref={gridRef} className={styles.grid}>
        {services.map((s) => (
          <div key={s.num} className={`${styles.card} service-card ${s.last ? styles.lastCard : ''}`}>
            <span className={styles.cardNum}>{s.num}</span>
            <div className={styles.icon}>{s.icon}</div>
            <div className={styles.titleEn}>{s.en}</div>
            <div className={styles.titleHi}>{s.hi}</div>
            <p className={styles.desc}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
