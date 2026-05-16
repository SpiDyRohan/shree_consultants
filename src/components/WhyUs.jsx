import { useEffect, useRef } from 'react'
import styles from './WhyUs.module.css'

const stats = [
  {
    target: 200, suffix: '+', title: 'Projects Completed',
    desc: 'Over 200 residential and commercial projects delivered on time and within budget across Burhanpur and surrounding regions.',
  },
  {
    target: 10, suffix: '+', title: 'Years of Expertise',
    desc: 'A decade of hands-on experience with deep knowledge of M.P. building codes, Vastu principles, and construction best practices.',
  },
  {
    target: 100, suffix: '%', title: 'Client Satisfaction',
    desc: 'Our clients trust us with their most important investments. We maintain transparency, quality, and communication throughout.',
  },
]

const features = [
  {
    title: 'End-to-End Solutions',
    desc: 'From planning to handover — single point of accountability for your entire project.',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  },
  {
    title: 'Vastu-Compliant Designs',
    desc: 'Every design integrates time-tested Vastu Shastra principles for positive energy flow.',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5" /></svg>
  },
  {
    title: 'Licensed & Certified',
    desc: 'Government-licensed engineer ensuring all work meets statutory and structural safety norms.',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  },
  {
    title: 'Transparent Pricing',
    desc: 'Detailed cost estimates with no hidden charges. Your budget is our commitment.',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  },
]

export default function WhyUs() {
  const headingRef = useRef(null)
  const gridRef = useRef(null)
  const featRef = useRef(null)
  const numRefs = useRef([])

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
      y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out'
    })

    gsap.to(featRef.current.querySelectorAll(`.${styles.feature}`), {
      scrollTrigger: { trigger: featRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out'
    })

    // Counter animations
    numRefs.current.forEach((el, i) => {
      if (!el) return
      const { target, suffix } = stats[i]
      ST.create({
        trigger: el, start: 'top 85%',
        onEnter: () => {
          gsap.fromTo({ val: 0 }, { val: target }, {
            duration: 2, ease: 'power2.out',
            onUpdate: function () {
              el.innerHTML = `${Math.round(this.targets()[0].val)}<span class="${styles.suffix}">${suffix}</span>`
            }
          })
        }
      })
    })
  }, [])

  return (
    <section id="why" className={styles.section}>
      <div className={styles.topText}>
        <span className={styles.label}>Why Choose Us</span>
        <h2 ref={headingRef} className={styles.heading}>
          The <em>Shree</em> Advantage
        </h2>
      </div>

      <div ref={gridRef} className={styles.grid}>
        {stats.map((s, i) => (
          <div key={s.title} className={styles.card}>
            <span
              ref={el => { numRefs.current[i] = el }}
              className={styles.num}
            >
              0<span className={styles.suffix}>{s.suffix}</span>
            </span>
            <div className={styles.title}>{s.title}</div>
            <p className={styles.desc}>{s.desc}</p>
          </div>
        ))}
      </div>

      <div ref={featRef} className={styles.features}>
        {features.map(f => (
          <div key={f.title} className={styles.feature}>
            <div className={styles.featIcon}>{f.icon}</div>
            <div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
