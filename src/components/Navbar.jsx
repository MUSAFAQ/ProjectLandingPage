import { useEffect, useRef } from 'react'
import './Navbar.css'

function Navbar() {
  const ref = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return
      if (window.scrollY > 20) {
        ref.current.classList.add('navbar--scrolled')
      } else {
        ref.current.classList.remove('navbar--scrolled')
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="navbar" ref={ref}>
      <div className="logo">🚀 MyProject</div>
      <nav className="nav-links">
        <a href="#fitur">Fitur</a>
        <a href="#tentang">Tentang</a>
        <button className="btn-login">Login</button>
      </nav>
    </header>
  )
}

export default Navbar
