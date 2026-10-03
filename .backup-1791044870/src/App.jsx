import { useEffect, useRef, useState } from 'react'
import './App.css'

/* ---------- Hook: Reveal on Scroll ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.15 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ---------- Hook: Parallax ---------- */
function useParallax() {
  useEffect(() => {
    let raf = null
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        document.querySelectorAll('[data-parallax]').forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0.2
          el.style.transform = `translate3d(0, ${y * speed}px, 0)`
        })
        raf = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}

/* ---------- Cursor Glow ---------- */
function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y
    let raf
    const move = (e) => {
      tx = e.clientX
      ty = e.clientY
    }
    const loop = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move)
    loop()
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}

/* ---------- Magnetic Button ---------- */
function MagneticButton({ children, className = '', ...rest }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const mx = e.clientX - r.left - r.width / 2
    const my = e.clientY - r.top - r.height / 2
    ref.current.style.transform = `translate(${mx * 0.25}px, ${my * 0.35}px)`
  }
  const onLeave = () => {
    ref.current.style.transform = 'translate(0, 0)'
  }
  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`btn-shine-wrapper ${className}`}
      {...rest}
    >
      <span className="btn-shine" />
      <span className="btn-label">{children}</span>
    </button>
  )
}

/* ---------- Typewriter ---------- */
function Typewriter({ text, speed = 60, start = true }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!start) return
    let i = 0
    setDisplayed('')
    setDone(false)
    const iv = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(iv)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(iv)
  }, [text, speed, start])

  return (
    <span className={done ? 'typewriter done' : 'typewriter'}>
      {displayed}
    </span>
  )
}

/* ---------- Preloader ---------- */
function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    // Simulasi progress 0 → 100
    let current = 0
    const interval = setInterval(() => {
      // Melangkah dengan variasi biar natural
      const step = Math.random() * 8 + 3
      current = Math.min(current + step, 100)
      setProgress(Math.floor(current))

      if (current >= 100) {
        clearInterval(interval)
        // Tunggu bentar biar user lihat 100% dulu
        setTimeout(() => {
          setExiting(true)
          // Tunggu animasi keluar selesai, baru unmount
          setTimeout(() => onDone(), 1000)
        }, 400)
      }
    }, 80)

    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div className={`preloader ${exiting ? 'preloader--exit' : ''}`}>
      {/* Curtain 1 */}
      <div className="preloader__curtain preloader__curtain--1" />

      <div className="preloader__content">
        {/* Logo */}
        <div className="preloader__logo">
          <span className="preloader__logo-icon">🚀</span>
          <span className="preloader__logo-text">MyProject</span>
        </div>

        {/* Progress bar */}
        <div className="preloader__bar">
          <div
            className="preloader__bar-fill"
            style={{ width: `${progress}%` }}
          >
            <span className="preloader__bar-shine" />
          </div>
        </div>

        {/* Persentase */}
        <div className="preloader__info">
          <span className="preloader__label">Memuat pengalaman...</span>
          <span className="preloader__percent">{progress}%</span>
        </div>
      </div>

      {/* Curtain 2 (untuk reveal 2 lapis) */}
      <div className="preloader__curtain preloader__curtain--2" />
    </div>
  )
}

/* ---------- App ---------- */
function App() {
  const [loading, setLoading] = useState(true)
  const [startTypewriter, setStartTypewriter] = useState(false)

  useReveal()
  useParallax()

  // Mulai typewriter setelah preloader selesai
  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => setStartTypewriter(true), 300)
      return () => clearTimeout(t)
    }
  }, [loading])

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}

      <div className={`app-container ${loading ? 'app-container--hidden' : ''}`}>
        <CursorGlow />

        <header className="navbar">
          <div className="logo">🚀 MyProject</div>
          <nav className="nav-links">
            <a href="#fitur">Fitur</a>
            <a href="#tentang">Tentang</a>
            <MagneticButton className="btn-login">Login</MagneticButton>
          </nav>
        </header>

        <main>
          <section className="hero">
            <div className="hero-bg" data-parallax="0.15" />
            <div className="hero-shape hero-shape--a" data-parallax="0.25" />
            <div className="hero-shape hero-shape--b" data-parallax="-0.2" />

            <div className="hero-content">
              <h1 className="hero-title" data-reveal>
                <Typewriter
                  text="Wujudkan Ide Anda Menjadi Nyata"
                  speed={45}
                  start={startTypewriter}
                />
              </h1>
              <p className="hero-subtitle" data-reveal>
                Platform terbaik untuk membangun, mengembangkan, dan menskalakan
                bisnis Anda dengan cepat dan mudah.
              </p>
              <div className="hero-buttons" data-reveal>
                <MagneticButton className="btn-primary">
                  Mulai Sekarang - Gratis
                </MagneticButton>
                <MagneticButton className="btn-secondary">
                  Pelajari Lebih Lanjut
                </MagneticButton>
              </div>
            </div>

            <div className="scroll-hint">
              <span />
            </div>
          </section>

          <section id="fitur" className="features">
            <h2 data-reveal>Kenapa Memilih Kami?</h2>
            <div className="feature-grid">
              <div className="feature-card" data-reveal style={{ transitionDelay: '0ms' }}>
                <div className="feature-card__icon">⚡</div>
                <h3>Super Cepat</h3>
                <p>
                  Dibangun dengan teknologi terbaru untuk menjamin kecepatan dan
                  performa maksimal.
                </p>
                <span className="feature-card__shine" />
              </div>
              <div className="feature-card" data-reveal style={{ transitionDelay: '120ms' }}>
                <div className="feature-card__icon">🎨</div>
                <h3>Desain Modern</h3>
                <p>
                  Tampilan antarmuka yang bersih, responsif, dan ramah pengguna.
                </p>
                <span className="feature-card__shine" />
              </div>
              <div className="feature-card" data-reveal style={{ transitionDelay: '240ms' }}>
                <div className="feature-card__icon">🔒</div>
                <h3>Keamanan Ekstra</h3>
                <p>
                  Data Anda dienkripsi dan disimpan dengan standar keamanan
                  tingkat tinggi.
                </p>
                <span className="feature-card__shine" />
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} MyProject. Dibuat dengan React &amp; Vite.</p>
        </footer>
      </div>
    </>
  )
}

export default App
