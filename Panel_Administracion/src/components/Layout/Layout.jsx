import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Layout({ children }) {
  const location = useLocation()
  // Controla si el menú está abierto en móvil
  const [menuAbierto, setMenuAbierto] = useState(false)

  // Enlaces de navegación (se reutilizan en escritorio y móvil)
  const enlaces = (
    <nav className="nav flex-column gap-2">
      <Link
        to="/carta"
        className={`nav-link ${location.pathname === '/carta' ? 'text-white fw-bold' : 'text-secondary'}`}
        onClick={() => setMenuAbierto(false)}
      >
        🍽️ Carta
      </Link>
      <Link
        to="/menu-dia"
        className={`nav-link ${location.pathname === '/menu-dia' ? 'text-white fw-bold' : 'text-secondary'}`}
        onClick={() => setMenuAbierto(false)}
      >
        📋 Menú del día
      </Link>
    </nav>
  )

  return (
    <div className="d-flex flex-column flex-md-row" style={{ minHeight: '100vh' }}>

      {/* Barra superior (solo visible en móvil) */}
      <div className="d-md-none bg-dark text-white p-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 text-white">Panel de Gestión</h5>
        {/* Botón hamburguesa */}
        <button
          className="btn btn-outline-light btn-sm"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>

      {/* Menú desplegable (solo móvil, se muestra al pulsar hamburguesa) */}
      {menuAbierto && (
        <div className="d-md-none bg-dark text-white p-3 border-top border-secondary">
          {enlaces}
        </div>
      )}

      {/* Sidebar (solo visible en escritorio) */}
      <div className="d-none d-md-block bg-dark text-white p-3" style={{ width: '250px' }}>
        <h5 className="mb-4 text-white border-bottom pb-3">Panel de Gestión</h5>
        {enlaces}
      </div>

      {/* Contenido */}
      <div className="flex-grow-1 p-4 bg-light">
        {children}
      </div>

    </div>
  )
}

export default Layout