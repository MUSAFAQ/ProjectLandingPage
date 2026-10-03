import { useState, useEffect, useRef } from 'react'
import { ArrowRight } from './Icons'
import './Hero.css'

function Typewriter({ text, speed = 38, start = true }) {
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
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__blob hero__blob--a" aria-hidden="true" />
      <div className="hero__blob hero__blob--b" aria-hidden="true" />

      <div className="hero__content">
        <div className="hero__badge" data-reveal>
          <span className="hero__badge-dot" />
          Platform Bisnis Modern
        </div>

        <h1 className="hero__title" data-reveal>
          <Typewriter
            text="Wujudkan Ide Anda Menjadi Nyata"
            speed={38}
            start={startTypewriter}
          />
        </h1>

        <p className="hero__subtitle" data-reveal>
          Platform terbaik untuk membangun, mengembangkan, dan menskalakan
          bisnis Anda dengan cepat dan mudah.
        </p>

        <div className="hero__cta" data-reveal>
          <button className="btn btn--primary" type="button">
            Mulai Sekarang — Gratis
            <span className="btn__arrow">
              <ArrowRight size={18} />
            </span>
          </button>
          <button className="btn btn--ghost" type="button">
            Pelajari Lebih Lanjut
          </button>
        </div>

        <div className="hero__meta" data-reveal>
          <span>Dipercaya <strong>10.000+</strong> pengguna</span>
          <span className="hero__meta-dot" aria-hidden="true" />
          <span>Uptime <strong>99.9%</strong></span>
        </div>
      </div>
    </section>
  )
}

export default Hero
