import { useEffect, useRef, useState } from 'react'
import { Rocket } from './Icons'
import './Navbar.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let raf = null
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled(y > 24)

        const diff = y - lastY.current
        if (y > 200 && diff > 8) {
          setHidden(true)
        } else if (diff < -4) {
          setHidden(false)
        }
        lastY.current = y
        raf = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${hidden ? 'navbar--hidden' : ''}`}
    >
      <div className="navbar__inner">
        <a className="logo" href="/" aria-label="MyProject home">
          <span className="logo__mark">
            <Rocket size={20} />
          </span>
          <span className="logo__text">MyProject</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#fitur">Fitur</a>
          <a href="#tentang">Tentang</a>
          <a href="#kontak">Kontak</a>
        </nav>
        <button className="btn-login" type="button">Login</button>
      </div>
    </header>
  )
}

export default Navbar
