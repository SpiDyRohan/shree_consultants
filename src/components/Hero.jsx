import { useEffect, useRef } from 'react'
import BlueprintCanvas from './BlueprintCanvas'
import styles from './Hero.module.css'

const HEADING_1 = 'Shree'
const HEADING_2 = 'Consultant'

export default function Hero() {
  const badgeRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const subRef = useRef(null)
  const dividerRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollRef = useRef(null)
  const statsRef = useRef(null)
  const geo1Ref = useRef(null)
  const geo2Ref = useRef(null)
  const geo3Ref = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const gsap = window.gsap
    const ST = window.ScrollTrigger
    if (!gsap || !ST) return

    const chars1 = line1Ref.current.querySelectorAll('span')
    const chars2 = line2Ref.current.querySelectorAll('span')

    const tl = gsap.timeline({ delay: 0.6 })
    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .from(chars1, { y: 120, opacity: 0, rotation: 8, duration: 1.2, stagger: 0.04, ease: 'power4.out' }, '-=0.3')
      .from(chars2, { y: 120, opacity: 0, rotation: -4, duration: 1.2, stagger: 0.04, ease: 'power4.out' }, '-=0.9')
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to(dividerRef.current, { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .to(descRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to(scrollRef.current, { opacity: 1, duration: 0.8 }, '-=0.3')
      .to(statsRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')

    // Geo shape animations
    gsap.to(geo1Ref.current, { rotation: 50, duration: 20, ease: 'none', repeat: -1, transformOrigin: 'center center' })
    gsap.to(geo2Ref.current, { rotation: -40, duration: 15, ease: 'none', repeat: -1, transformOrigin: 'center center' })
    gsap.to(geo3Ref.current, { y: -20, duration: 3, ease: 'power1.inOut', repeat: -1, yoyo: true })

    // Parallax on scroll
    ST.create({
      trigger: sectionRef.current,
      start: 'top top', end: 'bottom top',
      onUpdate: self => {
        const p = self.progress
        gsap.set(geo1Ref.current, { y: p * 80 })
        gsap.set(geo2Ref.current, { y: p * 50 })
      }
    })

    // Magnetic buttons
    document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
      const btn = wrap.querySelector('a, button')
      const onMove = (e) => {
        const rect = wrap.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' })
      }
      const onLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' })
      }
      wrap.addEventListener('mousemove', onMove)
      wrap.addEventListener('mouseleave', onLeave)
    })
  }, [])

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" ref={sectionRef} className={styles.hero}>
      <BlueprintCanvas />

      {/* Geometric shapes */}
      <div ref={geo1Ref} className={styles.geo1} />
      <div ref={geo2Ref} className={styles.geo2} />
      <div ref={geo3Ref} className={styles.geo3} />

      <div className={styles.content}>
        <div ref={badgeRef} className={styles.badge}>
          <span className={styles.badgeDot} />
          Burhanpur, M.P. · Est. Civil Engineering
        </div>

        <h1 className={styles.heading}>
          <span ref={line1Ref} className={styles.line}>
            {HEADING_1.split('').map((c, i) => <span key={i} className={styles.char}>{c}</span>)}
          </span>
          <span ref={line2Ref} className={styles.line}>
            {HEADING_2.split('').map((c, i) => (
              <span key={i} className={`${styles.char} ${styles.accent}`}>{c}</span>
            ))}
          </span>
        </h1>

        <p ref={subRef} className={styles.subheading}>Engineer &amp; Developers</p>
        <div ref={dividerRef} className={styles.divider} />

        <p ref={descRef} className={styles.desc}>
          Led by <strong>Er. Yogesh Ayre</strong>, we deliver end-to-end civil engineering
          solutions — from architectural planning and Vastu-compliant design to full construction
          supervision across <strong>Burhanpur, M.P.</strong>
        </p>

        <div ref={ctaRef} className={styles.ctaGroup}>
          <div className="magnetic-wrap">
            <button className={styles.btnPrimary} onClick={() => scrollTo('#services')}>
              <span>Our Services</span>
              <ArrowIcon />
            </button>
          </div>
          <div className="magnetic-wrap">
            <button className={styles.btnSecondary} onClick={() => scrollTo('#contact')}>
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className={styles.scrollHint}>
        <div className={styles.scrollLine} />
        <span>Scroll to explore</span>
      </div>

      <div ref={statsRef} className={styles.stats}>
        {[
          { num: '10+', label: 'Years Experience' },
          { num: '200+', label: 'Projects Done' },
          { num: '7', label: 'Core Services' },
        ].map(s => (
          <div key={s.label} className={styles.stat}>
            <span className={styles.statNum}>{s.num}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
