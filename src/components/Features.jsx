import { useEffect, useRef } from 'react'
import './Features.css'

const items = [
  { icon: '⚡', title: 'Super Cepat', desc: 'Dibangun dengan teknologi terbaru untuk menjamin kecepatan dan performa maksimal.' },
  { icon: '🎨', title: 'Desain Modern', desc: 'Tampilan antarmuka yang bersih, responsif, dan ramah pengguna.' },
  { icon: '🔒', title: 'Keamanan Ekstra', desc: 'Data Anda dienkripsi dan disimpan dengan standar keamanan tingkat tinggi.' },
]

function Features() {
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
    <section id="fitur" className="features" ref={ref}>
      <h2 data-reveal>Kenapa Memilih Kami?</h2>
      <div className="feature-grid">
        {items.map((item, i) => (
          <div
            key={i}
            className="feature-card"
            data-reveal
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <div className="feature-card__icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
