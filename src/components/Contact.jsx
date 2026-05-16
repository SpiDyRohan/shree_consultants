import { useEffect, useRef } from 'react'
import styles from './Contact.module.css'

const contactItems = [
  {
    label: 'Phone',
    value: <a href="tel:+919630502300">+91 96305 02300</a>,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .95h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.81a16 16 0 006.29 6.29l1.22-1.22a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    )
  },
  {
    label: 'Email',
    value: <a href="mailto:yogesh.ayre@gmail.com">yogesh.ayre@gmail.com</a>,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    )
  },
  {
    label: 'Office Address',
    value: <>Shanti Palace Apartment,<br />Badi Ki Pol, Rajpura Road,<br />Burhanpur, M.P. – 450331</>,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    )
  },
]

export default function Contact() {
  const headingRef = useRef(null)
  const card1Ref = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    const gsap = window.gsap
    const ST = window.ScrollTrigger
    if (!gsap || !ST) return

    gsap.set(headingRef.current, { clipPath: 'inset(0 100% 0 0)' })
    gsap.to(headingRef.current, {
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.out'
    })
    gsap.to(card1Ref.current, {
      scrollTrigger: { trigger: '#contact', start: 'top 80%', toggleActions: 'play none none reverse' },
      y: 0, opacity: 1, duration: 0.9, ease: 'power3.out'
    })
    gsap.to(mapRef.current, {
      scrollTrigger: { trigger: '#contact', start: 'top 80%', toggleActions: 'play none none reverse' },
      y: 0, opacity: 1, duration: 0.9, delay: 0.2, ease: 'power3.out'
    })
  }, [])

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.glow1} />
      <div className={styles.glow2} />

      <div className={styles.topText}>
        <span className={styles.label}>Get In Touch</span>
        <h2 ref={headingRef} className={styles.heading}>
          Let's Build <em>Together</em>
        </h2>
        <p className={styles.subtext}>
          Ready to start your project? Reach out for a free consultation and site visit.
        </p>
      </div>

      <div className={styles.grid}>
        {/* Info card */}
        <div ref={card1Ref} className={styles.card}>
          <h3>Contact Information</h3>

          {contactItems.map(item => (
            <div key={item.label} className={styles.item}>
              <div className={styles.itemIcon}>{item.icon}</div>
              <div className={styles.itemBody}>
                <span className={styles.itemLabel}>{item.label}</span>
                <div className={styles.itemValue}>{item.value}</div>
              </div>
            </div>
          ))}

          <div className={styles.hours}>
            <p className={styles.hoursLabel}>Working Hours</p>
            <div className={styles.hoursRow}>
              <span>Monday – Saturday</span>
              <span className={styles.hoursTime}>9:00 AM – 7:00 PM</span>
            </div>
            <div className={styles.hoursRow}>
              <span>Sunday</span>
              <span className={styles.hoursAppt}>By Appointment</span>
            </div>
          </div>
        </div>

        {/* Map */}
        <div ref={mapRef} className={styles.mapWrap}>
          <div className={styles.mapPlaceholder}>
            <div className={styles.mapGrid} />
            <div className={styles.pulse} />
            <div className={styles.pulse} />
            <div className={styles.pulse} />
            <div className={styles.pinContainer}>
              <div className={styles.pin}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                </svg>
              </div>
              <div className={styles.pinShadow} />
              <div className={styles.mapLabel}>
                <strong>Shree Consultant</strong>
                <span>Burhanpur, M.P.</span>
              </div>
            </div>
          </div>
          <div className={styles.mapFooter}>
            <span>📍 Shanti Palace Apartment, Burhanpur</span>
            <a
              href="https://www.google.com/maps?q=21.305778,76.229417"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              Open in Maps
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
