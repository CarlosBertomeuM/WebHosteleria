import { useState, useEffect } from 'react'
import './MenuDia.css'

const API_URL = 'http://localhost:8000/api'

const MenuDia = () => {
  const [menu, setMenu] = useState(null)
  const [cargando, setCargando] = useState(true)

  // Carga el menú activo al montar el componente
  useEffect(() => {
    fetch(`${API_URL}/menu-dia/activo`)
      .then(res => res.json())
      .then(data => {
        setMenu(data)
        setCargando(false)
      })
      .catch(() => setCargando(false))
  }, [])

  if (cargando) return <div className="menu-dia__estado">Cargando menú...</div>
  if (!menu) return <div className="menu-dia__estado">No hay menú disponible hoy.</div>

  return (
    <section className="menu-dia">
      <div className="menu-dia__container">
        <h2 className="menu-dia__titulo">{menu.titulo}</h2>
        <p className="menu-dia__precio">{menu.precio}€ por persona</p>

        {/* Categorías y platos del menú */}
        {menu.categorias && menu.categorias.map(categoria => (
          <div key={categoria.id} className="menu-dia__categoria">
            <h3 className="menu-dia__categoria-titulo">{categoria.nombre}</h3>
            <ul className="menu-dia__platos">
              {categoria.platos && categoria.platos.map(plato => (
                <li key={plato.id} className="menu-dia__plato">{plato.nombre}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MenuDia