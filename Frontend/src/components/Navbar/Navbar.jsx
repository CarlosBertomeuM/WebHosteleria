import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__container">

        <Link to="/" className="navbar__logo">
          <img src={logo} alt="logo" />
          Nombre
        </Link>


        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/carta">Carta</Link></li>
          <li><Link to="/menu-dia">Menú del día</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
        {/* Botón hamburguesa para móvil */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;