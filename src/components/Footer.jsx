import { Rocket } from './Icons'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer" id="kontak">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__brand-row">
            <span className="footer__brand-mark" aria-hidden="true">
              <Rocket size={18} />
            </span>
            <span className="footer__brand-name">MyProject</span>
          </div>
          <p className="footer__tagline">
            Platform terbaik untuk membangun dan menskalakan bisnis Anda.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <div className="footer__col">
            <h4>Produk</h4>
            <a href="#fitur">Fitur</a>
            <a href="#">Harga</a>
            <a href="#">Integrasi</a>
          </div>
          <div className="footer__col">
            <h4>Perusahaan</h4>
            <a href="#">Tentang</a>
            <a href="#">Blog</a>
            <a href="#">Karier</a>
          </div>
          <div className="footer__col">
            <h4>Legal</h4>
            <a href="#">Privasi</a>
            <a href="#">Ketentuan</a>
            <a href="#">Kontak</a>
          </div>
        </nav>
      </div>

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} MyProject. Dibuat dengan React &amp; Vite.</p>
      </div>
    </footer>
  )
}

export default Footer
