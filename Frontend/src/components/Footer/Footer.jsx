import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import logo from '../../assets/logo.png'
import './Footer.css'   // ← añade esta línea

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        <div className="footer__logo">
          <img src={logo} alt="logo" />
          Nombre
        </div>

        <div className="footer__socials">
          <a href="https://www.linkedin.com/in/carlos-bertomeu-386415290/" className="footer__social" aria-label="Twitter">
            <FaXTwitter size={20} />
          </a>
          <a href="https://www.linkedin.com/in/carlos-bertomeu-386415290/" className="footer__social" aria-label="Facebook">
            <FaFacebook size={20} />
          </a>
          <a href="https://www.linkedin.com/in/carlos-bertomeu-386415290/" className="footer__social" aria-label="Instagram">
            <FaInstagram size={20} />
          </a>
          <a href="https://www.linkedin.com/in/carlos-bertomeu-386415290/" className="footer__social" aria-label="YouTube">
            <FaYoutube size={20} />
          </a>
        </div>

        <div className="footer__copy">
          © {new Date().getFullYear()} Nombre. Todos los derechos reservados.
        </div>

      </div>
    </footer>
  )
}

export default Footer