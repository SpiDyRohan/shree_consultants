import { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.css'

const links = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#why', label: 'Why Us' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const gsap = window.gsap
    if (!gsap) return
    gsap.to(navRef.current, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 })
  }, [])

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      {/* Mobile overlay */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        <button className={styles.mobileClose} onClick={() => setMenuOpen(false)}>✕</button>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={() => scrollTo(l.href)}>{l.label}</a>
        ))}
      </div>

      <nav ref={navRef} className={styles.nav}>
        <a href="#hero" className={styles.logo}>
          <div className={styles.emblem}>S</div>
          <div className={styles.logoText}>
            <span>Shree Consultant</span>
            <span>Engineer &amp; Developers</span>
          </div>
        </a>

        <ul className={styles.links}>
          {links.map(l => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>

        <button className={styles.cta} onClick={() => scrollTo('#contact')}>
          Get Quote
        </button>

        <button
          className={styles.hamburger}
          aria-label="Menu"
          onClick={() => setMenuOpen(true)}
        >
          <span /><span /><span />
        </button>
      </nav>
    </>
  )
}
