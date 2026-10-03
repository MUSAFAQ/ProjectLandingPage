import './App.css'

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <div className="logo">🚀 MyProject</div>
        <div className="links">
          <a href="#fitur">Fitur</a>
          <a href="#tentang">Tentang</a>
          <button className="btn-login">Login</button>
        </div>
      </nav>

      <section className="hero">
        <h1>Wujudkan Ide Anda Menjadi Nyata</h1>
        <p>Platform terbaik untuk membangun, mengembangkan, dan menskalakan bisnis Anda dengan cepat dan mudah.</p>
        <div className="buttons">
          <button className="btn-primary">Mulai Sekarang</button>
          <button className="btn-secondary">Pelajari Lebih Lanjut</button>
        </div>
      </section>

      <section id="fitur" className="features">
        <h2>Kenapa Memilih Kami?</h2>
        <div className="grid">
          <div className="card">
            <h3>⚡ Super Cepat</h3>
            <p>Dibangun dengan teknologi terbaru untuk performa maksimal.</p>
          </div>
          <div className="card">
            <h3>🎨 Desain Modern</h3>
            <p>Tampilan antarmuka yang bersih, responsif, dan ramah pengguna.</p>
          </div>
          <div className="card">
            <h3>🔒 Keamanan Ekstra</h3>
            <p>Data Anda dienkripsi dengan standar keamanan tingkat tinggi.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 MyProject. Dibuat dengan React & Vite.</p>
      </footer>
    </div>
  )
}

export default App
