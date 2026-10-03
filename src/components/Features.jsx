import { useEffect, useRef } from 'react'
import { Zap, Layers, ShieldCheck } from './Icons'
import './Features.css'

const items = [
  {
    Icon: Zap,
    title: 'Super Cepat',
    desc: 'Dibangun dengan teknologi terbaru untuk menjamin kecepatan dan performa maksimal.',
  },
  {
    Icon: Layers,
    title: 'Desain Modern',
    desc: 'Tampilan antarmuka yang bersih, responsif, dan ramah pengguna.',
  },
  {
    Icon: ShieldCheck,
    title: 'Keamanan Ekstra',
    desc: 'Data Anda dienkripsi dan disimpan dengan standar keamanan tingkat tinggi.',
  },
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
      <div className="features__inner">
        <header className="features__header">
          <span className="features__kicker" data-reveal>
            Fitur Utama
          </span>
          <h2 className="features__title" data-reveal>
            Kenapa memilih kami?
          </h2>
          <p className="features__subtitle" data-reveal>
            Tiga alasan utama kenapa ribuan bisnis mempercayakan platform mereka pada kami.
          </p>
        </header>

        <div className="feature-grid">
          {items.map(({ Icon, title, desc }, i) => (
            <article
              key={i}
              className="feature-card"
              data-reveal
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="feature-card__icon" aria-hidden="true">
                <Icon size={22} />
              </div>
              <h3 className="feature-card__title">{title}</h3>
              <p className="feature-card__desc">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
