import './App.css'

function App() {
  return (
    <div className="app-container">
      {/* --- NAVBAR --- */}
      <header className="navbar">
        <div className="logo">🚀 MyProject</div>
        <nav className="nav-links">
          <a href="#fitur">Fitur</a>
          <a href="#tentang">Tentang</a>
          <button className="btn-login">Login</button>
        </nav>
      </header>

      {/* --- HERO SECTION --- */}
      <main>
        <section className="hero">
          <h1 className="hero-title">Wujudkan Ide Anda Menjadi Nyata</h1>
          <p className="hero-subtitle">
            Platform terbaik untuk membangun, mengembangkan, dan menskalakan bisnis Anda dengan cepat dan mudah.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Mulai Sekarang - Gratis</button>
            <button className="btn-secondary">Pelajari Lebih Lanjut</button>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section id="fitur" className="features">
          <h2>Kenapa Memilih Kami?</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>⚡ Super Cepat</h3>
              <p>Dibangun dengan teknologi terbaru untuk menjamin kecepatan dan performa maksimal.</p>
            </div>
            <div className="feature-card">
              <h3>🎨 Desain Modern</h3>
              <p>Tampilan antarmuka yang bersih, responsif, dan ramah pengguna.</p>
            </div>
            <div className="feature-card">
              <h3>🔒 Keamanan Ekstra</h3>
              <p>Data Anda dienkripsi dan disimpan dengan standar keamanan tingkat tinggi.</p>
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} MyProject. Dibuat dengan React & Vite.</p>
      </footer>
    </div>
  )
}

export default App