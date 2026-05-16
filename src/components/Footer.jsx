import { useEffect, useRef } from 'react'
import styles from './Footer.module.css'

const navLinks = ['About', 'Services', 'Why Us', 'Contact']

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const gsap = window.gsap
    const ST = window.ScrollTrigger
    if (!gsap || !ST) return
    gsap.from(footerRef.current, {
      scrollTrigger: { trigger: footerRef.current, start: 'top 90%', toggleActions: 'play none none reverse' },
      opacity: 0, y: 30, duration: 0.8, ease: 'power3.out'
    })
  }, [])

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <div className={styles.logo}>
            <span>Shree</span> <span className={styles.logoOrange}>Consultant</span>
          </div>
          <p className={styles.logoSub}>Engineer &amp; Developers · Burhanpur, M.P.</p>
        </div>

        <ul className={styles.links}>
          {navLinks.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase().replace(' ', '')}`}>{l}</a>
            </li>
          ))}
        </ul>

        <div className={styles.socials}>
          <a href="tel:+919630502300" className={`${styles.socialBtn} social-btn`} title="Call Us">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .95h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.81a16 16 0 006.29 6.29l1.22-1.22a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
          </a>
          <a href="mailto:yogesh.ayre@gmail.com" className={`${styles.socialBtn} social-btn`} title="Email Us">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
          <a href="https://wa.me/919630502300" target="_blank" rel="noopener noreferrer" className={`${styles.socialBtn} social-btn`} title="WhatsApp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
            </svg>
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2024 <span className={styles.tealText}>Shree Consultant – Engineer &amp; Developers</span>. All rights reserved.</p>
        <span className={styles.tagline}>Designed with precision · Built with trust</span>
      </div>
    </footer>
  )
}
