import { useState, useEffect } from 'react'
import MenuDiaService from '../services/MenuDiaService'
import { useNavigate, useLocation } from 'react-router-dom'


// Instancia del servicio del menú del día
const menuDiaService = new MenuDiaService()

function MenuDia() {
  // Lista de todos los menús
  const [menus, setMenus] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Carga los menús al montar el componente
  useEffect(() => {
    cargarMenus()
  }, [])

  const cargarMenus = () => {
    menuDiaService.getAll()
      .then(data => {
        setMenus(data)
        setCargando(false)
      })
      .catch(() => {
        setError('No se pudo cargar el menú del día.')
        setCargando(false)
      })
  }

  // Activa un menú y desactiva los demás
  const activarMenu = (id) => {
    Promise.all(menus.map(m => menuDiaService.update(m.id, { activo: 0 })))
      .then(() => menuDiaService.update(id, { activo: 1 }))
      .then(() => cargarMenus())
      .catch(() => alert('Error al activar el menú'))
  }

  // Elimina un menú
  const eliminarMenu = (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este menú?')) return
    menuDiaService.delete(id)
      .then(() => setMenus(menus.filter(m => m.id !== id)))
      .catch(() => alert('Error al eliminar el menú'))
  }

  if (cargando) return <div className="p-4">Cargando...</div>
  if (error) return <div className="p-4 text-danger">{error}</div>

  // Menú activo
  const menuActivo = menus.filter(m => m.activo).pop()

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Menú del día</h2>
        <button 
            className="btn btn-primary"
            onClick={() => navigate('/menu-dia/nuevo')}
          >
            + Nuevo menú
        </button>
      </div>

      {/* Menú activo */}
      {menuActivo ? (
        <div className="card mb-4 border-success">
          <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">✅ {menuActivo.titulo} — {menuActivo.precio}€</h5>
            <div className="d-flex gap-2">
              {/* Botón editar — redirige al formulario de edición con el id del menú */}
              <button 
                className="btn btn-sm btn-light"
                onClick={() => navigate(`/menu-dia/editar/${menuActivo.id}`)}
              >
                Editar
              </button>
              {/* Botón deshabilitar — desactiva el menú activo */}
              <button
                className="btn btn-sm btn-warning"
                onClick={() => menuDiaService.update(menuActivo.id, { activo: 0 }).then(() => cargarMenus())}
              >
                Deshabilitar
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => eliminarMenu(menuActivo.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
          <div className="card-body">
            {menuActivo.categorias && menuActivo.categorias.map(categoria => (
              <div key={categoria.id} className="mb-3">
                <h6 className="fw-bold">{categoria.nombre}</h6>
                <ul className="list-group list-group-flush">
                  {categoria.platos && categoria.platos.map(plato => (
                    <li key={plato.id} className="list-group-item py-1">{plato.nombre}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="alert alert-warning">No hay ningún menú activo.</div>
      )}

      {/* Lista de menús inactivos */}
      {menus.filter(m => !m.activo).length > 0 && (
        <div>
          <h5 className="mb-3 text-muted">Menús inactivos</h5>
          {menus.filter(m => !m.activo).map(menu => (
            <div key={menu.id} className="card mb-2">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span>{menu.titulo} — {menu.precio}€</span>
                <div className="d-flex gap-2">
                  {/* Botón activar — activa este menú y desactiva los demás */}
                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() => activarMenu(menu.id)}
                  >
                    Activar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => eliminarMenu(menu.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MenuDia