import { useState, useEffect, useRef } from 'react'
import './Hero.css'

function Typewriter({ text, speed = 45, start = true }) {
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

function Hero({ startTypewriter }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
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
    ref.current.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="hero" ref={ref}>
      <div className="hero-shape hero-shape--a" />
      <div className="hero-shape hero-shape--b" />

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
          <button className="btn-primary">
            <span className="btn-shine" />
            <span className="btn-label">Mulai Sekarang - Gratis</span>
          </button>
          <button className="btn-secondary">
            <span className="btn-shine" />
            <span className="btn-label">Pelajari Lebih Lanjut</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
