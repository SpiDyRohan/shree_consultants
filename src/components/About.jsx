import { useEffect, useRef } from 'react'
import yogeshPhoto from '../assets/yogesh-ayre.jpg'
import styles from './About.module.css'

const tags = ['Licensed Engineer', 'Vastu Expert', '3D Visualization', 'Govt. Approvals', 'Full Construction']

export default function About() {
  const visualRef = useRef(null)
  const contentRef = useRef(null)
  const headingRef = useRef(null)
  useEffect(() => {
    const gsap = window.gsap
    const ST = window.ScrollTrigger
    if (!gsap || !ST) return

    gsap.to(visualRef.current, {
      scrollTrigger: { trigger: '#about', start: 'top 75%', toggleActions: 'play none none reverse' },
      x: 0, opacity: 1, duration: 1.1, ease: 'power3.out'
    })
    gsap.to(contentRef.current, {
      scrollTrigger: { trigger: '#about', start: 'top 75%', toggleActions: 'play none none reverse' },
      x: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.2
    })
    gsap.set(headingRef.current, { clipPath: 'inset(0 100% 0 0)' })
    gsap.to(headingRef.current, {
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.out'
    })
  }, [])

  return (
    <section id="about" className={styles.about}>
      <div className={styles.glowBg} />

      <div className={styles.grid}>
        {/* Visual Column */}
        <div ref={visualRef} className={styles.visual}>
          <div className={styles.frame}>
            <div className={styles.frameBorder} />
            <div className={styles.frameBorderOffset} />
            <div className={`${styles.corner} ${styles.tl}`} />
            <div className={`${styles.corner} ${styles.tr}`} />
            <div className={`${styles.corner} ${styles.bl}`} />
            <div className={`${styles.corner} ${styles.br}`} />
            <div className={styles.placeholder}>
              <img src={yogeshPhoto} alt="Er. Yogesh Ayre – Civil Engineer" className={styles.photo} />
              <div className={styles.namePlate}>
                <strong>Er. Yogesh Ayre</strong>
                <span>Civil Engineer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div ref={contentRef} className={styles.content}>
          <span className={styles.label}>About Us</span>
          <h2 ref={headingRef} className={styles.heading}>
            Building Dreams<br />with <em>Precision</em>
          </h2>
          <p>
            <strong>Shree Consultant – Engineer &amp; Developers</strong> is a trusted civil
            engineering firm helmed by <strong>Er. Yogesh Ayre</strong>, a licensed professional
            with over a decade of hands-on experience across residential, commercial, and
            institutional projects.
          </p>
          <p>
            Based in Burhanpur, Madhya Pradesh, we combine technical rigor with aesthetic
            sensitivity — ensuring every project is structurally sound, Vastu-compliant, and
            beautifully realized within your budget.
          </p>

          <div className={styles.tags}>
            {tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
          </div>

          <div className={styles.license}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ flexShrink: 0, color: 'var(--teal)' }}>
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p><strong>Government Licensed &amp; Insured</strong> — All projects comply with local municipal and RERA regulations in M.P.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
