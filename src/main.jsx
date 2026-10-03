import React, { useEffect, useRef, useState, useCallback } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

/* ---------------- Hook: Reveal on Scroll ---------------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------------- Hook: Parallax ---------------- */
function useParallax() {
  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        document.querySelectorAll("[data-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0.2;
          el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
        });
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/* ---------------- Cursor Glow ---------------- */
function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x,
      ty = y;
    let raf;
    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    loop();
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

/* ---------------- Magnetic Button ---------------- */
function MagneticButton({ children, className = "", ...rest }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - r.left - r.width / 2;
    const my = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${mx * 0.25}px, ${my * 0.35}px)`;
  };
  const onLeave = () => {
    ref.current.style.transform = "translate(0,0)";
  };
  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`btn magnetic ${className}`}
      {...rest}
    >
      <span className="btn-shine" />
      <span className="btn-label">{children}</span>
    </button>
  );
}

/* ---------------- Counter ---------------- */
function Counter({ to = 100, suffix = "", duration = 1800 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (t) => {
            const p = Math.min((t - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ---------------- Nav ---------------- */
function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`nav ${solid ? "nav--solid" : ""}`}>
      <div className="nav__inner">
        <a className="brand" href="#">
          <span className="brand__mark" />
          <span className="brand__text">LUXE</span>
        </a>
        <nav className="nav__links">
          <a href="#features">Fitur</a>
          <a href="#showcase">Showcase</a>
          <a href="#pricing">Harga</a>
          <a href="#contact">Kontak</a>
        </nav>
        <MagneticButton className="btn--ghost">Mulai</MagneticButton>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" data-parallax="0.15" />
      <div className="hero__orb hero__orb--a" data-parallax="0.35" />
      <div className="hero__orb hero__orb--b" data-parallax="-0.25" />
      <div className="hero__grid" />

      <div className="hero__content">
        <div className="eyebrow" data-reveal>
          <span className="dot" /> Premium Experience
        </div>

        <h1 className="hero__title" data-reveal>
          <span className="line">
            <span className="word">Kemewahan</span>
          </span>
          <span className="line">
            <span className="word gradient-text">dalam setiap</span>
          </span>
          <span className="line">
            <span className="word">detail.</span>
          </span>
        </h1>

        <p className="hero__sub" data-reveal>
          Landing page dengan animasi halus, parallax sinematik, dan
          micro-interactions yang terasa mahal — dirancang untuk brand yang
          tidak ingin terlihat biasa.
        </p>

        <div className="hero__cta" data-reveal>
          <MagneticButton className="btn--primary">
            Jelajahi Sekarang
          </MagneticButton>
          <a className="link-underline" href="#showcase">
            Lihat showcase
          </a>
        </div>

        <div className="hero__stats" data-reveal>
          <div>
            <strong>
              <Counter to={240} suffix="+" />
            </strong>
            <span>Proyek</span>
          </div>
          <div className="divider" />
          <div>
            <strong>
              <Counter to={98} suffix="%" />
            </strong>
            <span>Kepuasan</span>
          </div>
          <div className="divider" />
          <div>
            <strong>
              <Counter to={12} suffix=" th" />
            </strong>
            <span>Pengalaman</span>
          </div>
        </div>
      </div>

      <div className="scroll-hint">
        <span />
      </div>
    </section>
  );
}

/* ---------------- Features ---------------- */
const features = [
  {
    t: "Animasi Sinematik",
    d: "Transisi halus dengan easing premium dan parallax berlapis.",
    i: "✦",
  },
  {
    t: "Micro-interactions",
    d: "Magnetic button, hover glow, dan feedback yang memikat.",
    i: "◈",
  },
  {
    t: "Performa Tinggi",
    d: "GPU-accelerated, 60fps, dan tetap ringan di mobile.",
    i: "◇",
  },
  {
    t: "Desain Eksklusif",
    d: "Tipografi elegan, ruang napas, dan detail yang mahal.",
    i: "❖",
  },
];

function Features() {
  return (
    <section id="features" className="section">
      <div className="section__head">
        <span className="kicker" data-reveal>
          FITUR
        </span>
        <h2 className="section__title" data-reveal>
          Dibuat untuk <em>kesan pertama</em> yang tak terlupakan.
        </h2>
      </div>

      <div className="grid grid--4">
        {features.map((f, i) => (
          <article
            key={i}
            className="card"
            data-reveal
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div className="card__icon">{f.i}</div>
            <h3>{f.t}</h3>
            <p>{f.d}</p>
            <span className="card__glow" />
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Showcase ---------------- */
function Showcase() {
  return (
    <section id="showcase" className="section section--showcase">
      <div className="section__head">
        <span className="kicker" data-reveal>
          SHOWCASE
        </span>
        <h2 className="section__title" data-reveal>
          Tampilan yang <em>berbicara</em> sebelum teks dibaca.
        </h2>
      </div>

      <div className="showcase">
        <div className="showcase__panel" data-reveal>
          <div className="showcase__glow" data-parallax="0.08" />
          <div className="mock">
            <div className="mock__bar">
              <span /> <span /> <span />
            </div>
            <div className="mock__body">
              <div className="mock__line w-60" />
              <div className="mock__line w-90" />
              <div className="mock__line w-75" />
              <div className="mock__blocks">
                <div className="mock__block" />
                <div className="mock__block" />
                <div className="mock__block" />
              </div>
            </div>
            <div className="mock__shine" />
          </div>
        </div>

        <div className="showcase__list">
          {[
            "Hero parallax berlapis",
            "Reveal on scroll yang halus",
            "Shimmer & glow elegan",
            "Tipografi premium",
          ].map((x, i) => (
            <div
              key={i}
              className="showcase__item"
              data-reveal
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="tick">✓</span>
              {x}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */
function Pricing() {
  const plans = [
    { name: "Essential", price: "Rp 1,2jt", desc: "Landing page elegan", feat: ["Animasi dasar", "Responsive", "1 revisi"] },
    { name: "Signature", price: "Rp 2,5jt", desc: "Paling populer", feat: ["Animasi premium", "Parallax & glow", "3 revisi"], featured: true },
    { name: "Bespoke", price: "Rp 5jt+", desc: "Custom penuh", feat: ["Desain eksklusif", "Micro-interactions", "Unlimited revisi"] },
  ];
  return (
    <section id="pricing" className="section">
      <div className="section__head">
        <span className="kicker" data-reveal>
          HARGA
        </span>
        <h2 className="section__title" data-reveal>
          Investasi untuk <em>citra</em> yang lebih tinggi.
        </h2>
      </div>

      <div className="grid grid--3">
        {plans.map((p, i) => (
          <div
            key={i}
            className={`price ${p.featured ? "price--featured" : ""}`}
            data-reveal
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            {p.featured && <div className="price__badge">POPULER</div>}
            <h3>{p.name}</h3>
            <div className="price__value">{p.price}</div>
            <p className="price__desc">{p.desc}</p>
            <ul>
              {p.feat.map((f, j) => (
                <li key={j}>
                  <span className="tick">✓</span> {f}
                </li>
              ))}
            </ul>
            <MagneticButton
              className={p.featured ? "btn--primary" : "btn--ghost"}
            >
              Pilih Paket
            </MagneticButton>
            <span className="price__glow" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- CTA / Contact ---------------- */
function CTA() {
  return (
    <section id="contact" className="section section--cta">
      <div className="cta" data-reveal>
        <div className="cta__glow" data-parallax="0.1" />
        <h2>
          Siap membuat kesan <em>pertama</em> yang mahal?
        </h2>
        <p>Mari wujudkan landing page yang terasa premium sejak detik pertama.</p>
        <MagneticButton className="btn--primary btn--lg">
          Hubungi Kami
        </MagneticButton>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="brand">
          <span className="brand__mark" />
          <span className="brand__text">LUXE</span>
        </div>
        <p>© {new Date().getFullYear()} LUXE Studio. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ---------------- App ---------------- */
function App() {
  useReveal();
  useParallax();
  return (
    <>
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <Features />
        <Showcase />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
