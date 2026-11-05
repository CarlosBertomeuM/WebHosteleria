import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MenuDiaService from '../services/MenuDiaService'

// Instancia del servicio
const menuDiaService = new MenuDiaService()

function MenuDiaForm() {
  const navigate = useNavigate()
  // Obtiene el id de la URL si estamos editando
  const { id } = useParams()
  const esEdicion = !!id

  // Estado del formulario
  const [menu, setMenu] = useState({
    titulo: '',
    precio: '',
    activo: 1,
    categorias: []
  })

  const [guardando, setGuardando] = useState(false)

  // Si estamos editando carga los datos del menú
  useEffect(() => {
    if (esEdicion) {
      menuDiaService.getById(id)
        .then(data => setMenu(data))
        .catch(() => alert('Error al cargar el menú'))
    }
  }, [id])

  // Añade una nueva categoría vacía al formulario
  const añadirCategoria = () => {
    setMenu({
      ...menu,
      categorias: [
        ...menu.categorias,
        { nombre: '', orden: menu.categorias.length + 1, platos: [] }
      ]
    })
  }

  // Elimina una categoría del formulario por su índice
  const eliminarCategoria = (index) => {
    setMenu({
      ...menu,
      categorias: menu.categorias.filter((_, i) => i !== index)
    })
  }

  // Actualiza el nombre de una categoría
  const actualizarCategoria = (index, nombre) => {
    const nuevasCategorias = [...menu.categorias]
    nuevasCategorias[index] = { ...nuevasCategorias[index], nombre }
    setMenu({ ...menu, categorias: nuevasCategorias })
  }

  // Añade un plato vacío a una categoría
  const añadirPlato = (categoriaIndex) => {
    const nuevasCategorias = [...menu.categorias]
    nuevasCategorias[categoriaIndex].platos = [
      ...nuevasCategorias[categoriaIndex].platos,
      { nombre: '', orden: nuevasCategorias[categoriaIndex].platos.length + 1 }
    ]
    setMenu({ ...menu, categorias: nuevasCategorias })
  }

  // Elimina un plato de una categoría
  const eliminarPlato = (categoriaIndex, platoIndex) => {
    const nuevasCategorias = [...menu.categorias]
    nuevasCategorias[categoriaIndex].platos = nuevasCategorias[categoriaIndex].platos.filter((_, i) => i !== platoIndex)
    setMenu({ ...menu, categorias: nuevasCategorias })
  }

  // Actualiza el nombre de un plato
  const actualizarPlato = (categoriaIndex, platoIndex, nombre) => {
    const nuevasCategorias = [...menu.categorias]
    nuevasCategorias[categoriaIndex].platos[platoIndex] = {
      ...nuevasCategorias[categoriaIndex].platos[platoIndex],
      nombre
    }
    setMenu({ ...menu, categorias: nuevasCategorias })
  }

  // Guarda el menú — crea o edita según el caso
  const guardar = () => {
    // Validación básica antes de enviar
    if (!menu.titulo) return alert('El título es obligatorio')
    if (!menu.precio) return alert('El precio es obligatorio')

    setGuardando(true)

    if (esEdicion) {
      menuDiaService.update(id, menu)
        .then(() => navigate('/menu-dia'))
        .catch(() => {
          alert('Error al guardar el menú')
          setGuardando(false)
        })
    } else {
      menuDiaService.getAll()
        .then(menus => Promise.all(menus.map(m => menuDiaService.update(m.id, { activo: 0 }))))
        .then(() => menuDiaService.insert(menu))
        .then(() => navigate('/menu-dia'))
        .catch(() => {
          alert('Error al guardar el menú')
          setGuardando(false)
        })
    }
  }

  return (
    <div>
      {/* Cabecera: en móvil se apila, en escritorio en fila */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-4">
        <h2 className="mb-0">{esEdicion ? 'Editar menú' : 'Nuevo menú'}</h2>
        <button className="btn btn-secondary" onClick={() => navigate('/menu-dia')}>
          ← Volver
        </button>
      </div>

      {/* Datos generales del menú */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Datos generales</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              value={menu.titulo}
              onChange={e => setMenu({ ...menu, titulo: e.target.value })}
              placeholder="Menú del día, Menú especial..."
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Precio</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              value={menu.precio}
              onChange={e => setMenu({ ...menu, precio: e.target.value })}
              placeholder="12.00"
            />
          </div>
        </div>
      </div>

      {/* Categorías y platos */}
      {menu.categorias.map((categoria, catIndex) => (
        <div key={catIndex} className="card mb-3">
          {/* Cabecera de categoría: se apila en móvil */}
          <div className="card-header">
            <div className="d-flex flex-column flex-sm-row gap-2 align-items-stretch align-items-sm-center">
              {/* Input del nombre de la categoría */}
              <input
                type="text"
                className="form-control"
                value={categoria.nombre}
                onChange={e => actualizarCategoria(catIndex, e.target.value)}
                placeholder="Nombre de la sección (Para compartir, Primer plato...)"
              />
              <button
                className="btn btn-sm btn-outline-danger flex-shrink-0"
                onClick={() => eliminarCategoria(catIndex)}
              >
                Eliminar sección
              </button>
            </div>
          </div>
          <div className="card-body">
            {/* Lista de platos de la categoría */}
            {categoria.platos.map((plato, platoIndex) => (
              <div key={platoIndex} className="d-flex gap-2 mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={plato.nombre}
                  onChange={e => actualizarPlato(catIndex, platoIndex, e.target.value)}
                  placeholder="Nombre del plato"
                />
                <button
                  className="btn btn-outline-danger flex-shrink-0"
                  onClick={() => eliminarPlato(catIndex, platoIndex)}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              className="btn btn-sm btn-outline-primary mt-2"
              onClick={() => añadirPlato(catIndex)}
            >
              + Añadir plato
            </button>
          </div>
        </div>
      ))}

      {/* Botón añadir sección */}
      <button
        className="btn btn-outline-secondary w-100 mb-4"
        onClick={añadirCategoria}
      >
        + Añadir sección
      </button>

      {/* Botón guardar */}
      <button
        className="btn btn-primary w-100"
        onClick={guardar}
        disabled={guardando}
      >
        {guardando ? 'Guardando...' : esEdicion ? 'Guardar cambios' : 'Crear menú'}
      </button>
    </div>
  )
}

export default MenuDiaForm