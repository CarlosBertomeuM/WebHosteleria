import { useState, useEffect } from 'react'
import CategoriaService from '../services/CategoriaService'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
const categoriaService = new CategoriaService()


import PlatoService from '../services/PlatoService'
const platoService = new PlatoService()


function CategoriaItem({ categoria, editarCategoria, toggleCategoria, eliminarCategoria, onAnadirPlato, editarPlato, eliminarPlato, togglePlato }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: categoria.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} className="card mb-4">
      {/* Cabecera: se apila en móvil (flex-column) y pasa a fila en escritorio (flex-md-row) */}
      <div className={`card-header ${!categoria.activo ? 'bg-secondary text-white' : ''}`}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
          <div className="d-flex align-items-center gap-2">
            <span {...attributes} {...listeners} style={{ cursor: 'grab', fontSize: '18px' }}>⠿</span>
            <h5 className="mb-0">{categoria.nombre}</h5>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <button
              className={`btn btn-sm ${!categoria.activo ? 'btn-secondary' : 'btn-outline-primary'}`}
              onClick={() => editarCategoria(categoria.id)}
              disabled={!categoria.activo}
            >
              Editar
            </button>
            <button
              className={`btn btn-sm ${!categoria.activo ? 'btn-secondary' : 'btn-outline-warning'}`}
              onClick={() => toggleCategoria(categoria.id, categoria.activo)}
            >
              {categoria.activo ? 'Deshabilitar' : 'Habilitar'}
            </button>
            <button
              className={`btn btn-sm ${!categoria.activo ? 'btn-secondary' : 'btn-outline-danger'}`}
              onClick={() => eliminarCategoria(categoria.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <div className="card-body">
        {/* table-responsive añade scroll horizontal en móvil para que la tabla no rompa la página */}
        <div className="table-responsive">
          <table className="table table-sm mb-3">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categoria.platos && categoria.platos.map(plato => (
                <tr key={plato.id}>
                  <td>{plato.nombre}</td>
                  <td>{plato.descripcion}</td>
                  <td>{plato.precio}€</td>
                  <td>
                    <span className={`badge ${plato.activo ? 'bg-success' : 'bg-secondary'}`}>
                      {plato.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      {/* Botón editar plato — abre el modal con los datos del plato */}
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => editarPlato(plato)}
                      >
                        Editar
                      </button>
                      {/* Botón habilitar/deshabilitar plato — cambia el estado activo del plato */}
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => togglePlato(plato.id, categoria.id, plato.activo)}
                      >
                        {plato.activo ? 'Deshabilitar' : 'Habilitar'}
                      </button>
                      {/* Botón eliminar plato — pide confirmación y elimina el plato */}
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarPlato(plato.id, categoria.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button 
            className="btn btn-sm btn-outline-primary"
            onClick={() => onAnadirPlato(categoria.id)}
          >
            + Añadir plato
        </button>
      </div>
    </div>
  )
}

function Carta() {
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [modalEditar, setModalEditar] = useState(false)
  const [categoriaEditando, setCategoriaEditando] = useState(null)
  const [modalCrear, setModalCrear] = useState(false)
  const [nuevaCategoria, setNuevaCategoria] = useState({ nombre: '', descripcion: '', orden: 0 })


  // Controla si el modal de crear plato está abierto
  const [modalCrearPlato, setModalCrearPlato] = useState(false)

  // Guarda el id de la categoría donde se va a crear el plato
  const [nuevoPlatoCategoria, setNuevoPlatoCategoria] = useState(null)

  // Datos del nuevo plato que se está creando
  const [nuevoPlato, setNuevoPlato] = useState({ nombre: '', descripcion: '', precio: '', orden: 0 })



  // Controla si el modal de editar plato está abierto
  const [modalEditarPlato, setModalEditarPlato] = useState(false)

  // Guarda los datos del plato que se está editando
  const [platoEditando, setPlatoEditando] = useState(null)

  //funcion crear plato
  const crearPlato = () => {
    // Añade el categoria_id al objeto del plato antes de enviarlo
    const platoData = { ...nuevoPlato, categoria_id: nuevoPlatoCategoria }
  
    platoService.insert(platoData)
    .then(data => {
      // Añade el nuevo plato a la categoría correspondiente sin recargar toda la carta
      setCategorias(categorias.map(c =>
        c.id === nuevoPlatoCategoria
          ? { ...c, platos: [...c.platos, { ...data, activo: 1 }] }
          : c
      ))
      setModalCrearPlato(false)
      setNuevoPlato({ nombre: '', descripcion: '', precio: '', orden: 0 })
    })
    .catch(() => alert('Error al crear el plato'))
  }

  //editar plato//
  // Abre el modal de editar plato con los datos del plato seleccionado
  const editarPlato = (plato) => {
    setPlatoEditando({ ...plato })
    setModalEditarPlato(true)
  }

  // Envía los datos editados a la API y actualiza el estado local
  const guardarPlato = () => {
    platoService.update(platoEditando.id, {
      nombre: platoEditando.nombre,
      descripcion: platoEditando.descripcion,
      precio: platoEditando.precio,
      orden: platoEditando.orden
    })
      .then(() => {
        setCategorias(categorias.map(c => ({
          ...c,
          platos: c.platos.map(p =>
            p.id === platoEditando.id ? { ...p, ...platoEditando } : p
          )
        })))
        setModalEditarPlato(false)
      })
      .catch(() => alert('Error al guardar el plato'))
  }

  // Elimina un plato de la base de datos y lo quita del estado local
  const eliminarPlato = (platoId, categoriaId) => {
    if (!window.confirm('¿Seguro que quieres eliminar este plato?')) return
    platoService.delete(platoId)
      .then(() => {
        setCategorias(categorias.map(c =>
          c.id === categoriaId
            ? { ...c, platos: c.platos.filter(p => p.id !== platoId) }
            : c
        ))
      })
      .catch(() => alert('Error al eliminar el plato'))
  }

  // Cambia el estado activo/inactivo de un plato
  const togglePlato = (platoId, categoriaId, activo) => {
    platoService.update(platoId, { activo: activo ? 0 : 1 })
      .then(() => {
        setCategorias(categorias.map(c =>
          c.id === categoriaId
            ? { ...c, platos: c.platos.map(p =>
                p.id === platoId ? { ...p, activo: activo ? 0 : 1 } : p
              )}
            : c
        ))
      })
      .catch(() => alert('Error al actualizar el plato'))
  }
  //drag&poll//
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }
    })
  )

  useEffect(() => {
    cargarCategorias()
  }, [])

  const cargarCategorias = () => {
    categoriaService.getAll()
      .then(data => {
        setCategorias(data)
        setCargando(false)
      })
      .catch(() => {
        setError('No se pudo cargar la carta.')
        setCargando(false)
      })
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = categorias.findIndex(c => c.id === active.id)
    const newIndex = categorias.findIndex(c => c.id === over.id)
    const nuevasCategorias = arrayMove(categorias, oldIndex, newIndex)

    setCategorias(nuevasCategorias)

    nuevasCategorias.forEach((categoria, index) => {
      categoriaService.update(categoria.id, { orden: index + 1 })
    })
  }

  const editarCategoria = (id) => {
    const categoria = categorias.find(c => c.id === id)
    setCategoriaEditando({ ...categoria })
    setModalEditar(true)
  }

  const guardarCategoria = () => {
    categoriaService.update(categoriaEditando.id, {
      nombre: categoriaEditando.nombre,
      descripcion: categoriaEditando.descripcion,
      orden: categoriaEditando.orden
    })
      .then(() => {
        setModalEditar(false)
        cargarCategorias() // ← recarga desde la API ordenadas por campo orden
      })
      .catch(() => alert('Error al guardar la categoría'))
  }
  const crearCategoria = () => {
    categoriaService.insert(nuevaCategoria)
      .then(data => {
        setCategorias([...categorias, { ...data, platos: [] }])
        setModalCrear(false)
        setNuevaCategoria({ nombre: '', descripcion: '', orden: 0 })
      })
      .catch(() => alert('Error al crear la categoría'))
  }

  const eliminarCategoria = (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta categoría?')) return
    categoriaService.delete(id)
      .then(() => setCategorias(categorias.filter(c => c.id !== id)))
      .catch(() => alert('Error al eliminar la categoría'))
  }

  const toggleCategoria = (id, activo) => {
    categoriaService.update(id, { activo: activo ? 0 : 1 })
      .then(() => {
        setCategorias(categorias.map(c =>
          c.id === id ? { ...c, activo: activo ? 0 : 1 } : c
        ))
      })
      .catch(() => alert('Error al actualizar la categoría'))
  }

  if (cargando) return <div className="p-4">Cargando...</div>
  if (error) return <div className="p-4 text-danger">{error}</div>

  return (
    <div>
      {/* Cabecera de página: se apila en móvil */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-4">
        <h2 className="mb-0">Gestión de Carta</h2>
        <button className="btn btn-primary" onClick={() => setModalCrear(true)}>+ Añadir categoría</button>
      </div>

      {/* ← DndContext: gestiona el drag & drop de categorías.
      Cada CategoriaItem recibe las funciones de editar, toggle, eliminar
      y onAnadirPlato para abrir el modal de crear plato en esa categoría */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={categorias.map(c => c.id)} strategy={verticalListSortingStrategy}>
          {categorias.map(categoria => (
          <CategoriaItem
            key={categoria.id}
            categoria={categoria}
            editarCategoria={editarCategoria}
            toggleCategoria={toggleCategoria}
            eliminarCategoria={eliminarCategoria}
            onAnadirPlato={(id) => {
              setNuevoPlatoCategoria(id)
              setModalCrearPlato(true)
            }}
            editarPlato={editarPlato}
            eliminarPlato={eliminarPlato}
            togglePlato={togglePlato} 
          />
          ))}
        </SortableContext>
      </DndContext>
      {modalEditar && categoriaEditando && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Categoría</h5>
                <button className="btn-close" onClick={() => setModalEditar(false)} />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={categoriaEditando.nombre}
                    onChange={e => setCategoriaEditando({ ...categoriaEditando, nombre: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    value={categoriaEditando.descripcion || ''}
                    onChange={e => setCategoriaEditando({ ...categoriaEditando, descripcion: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Orden</label>
                  <input
                    type="number"
                    className="form-control"
                    value={categoriaEditando.orden}
                    onChange={e => setCategoriaEditando({ ...categoriaEditando, orden: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setModalEditar(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={guardarCategoria}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalCrear && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nueva Categoría</h5>
                <button className="btn-close" onClick={() => setModalCrear(false)} />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nuevaCategoria.nombre}
                    onChange={e => setNuevaCategoria({ ...nuevaCategoria, nombre: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    value={nuevaCategoria.descripcion}
                    onChange={e => setNuevaCategoria({ ...nuevaCategoria, descripcion: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Orden</label>
                  <input
                    type="number"
                    className="form-control"
                    value={nuevaCategoria.orden}
                    onChange={e => setNuevaCategoria({ ...nuevaCategoria, orden: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setModalCrear(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={crearCategoria}>Crear</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal crear plato — formulario para añadir un nuevo plato a una categoría */}
      {modalCrearPlato && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nuevo Plato</h5>
                <button className="btn-close" onClick={() => setModalCrearPlato(false)} />
              </div>
              <div className="modal-body">
                {/* Campo nombre del plato */}
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nuevoPlato.nombre}
                    onChange={e => setNuevoPlato({ ...nuevoPlato, nombre: e.target.value })}
                  />
                </div>
                {/* Campo descripción */}
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    value={nuevoPlato.descripcion}
                    onChange={e => setNuevoPlato({ ...nuevoPlato, descripcion: e.target.value })}
                  />
                </div>
                {/* Campo precio */}
                <div className="mb-3">
                  <label className="form-label">Precio</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={nuevoPlato.precio}
                    onChange={e => setNuevoPlato({ ...nuevoPlato, precio: e.target.value })}
                  />
                </div>
                {/* Campo orden */}
                <div className="mb-3">
                  <label className="form-label">Orden</label>
                  <input
                    type="number"
                    className="form-control"
                    value={nuevoPlato.orden}
                    onChange={e => setNuevoPlato({ ...nuevoPlato, orden: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setModalCrearPlato(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={crearPlato}>Crear</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal editar plato — formulario para modificar los datos de un plato */}
      {modalEditarPlato && platoEditando && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Plato</h5>
                <button className="btn-close" onClick={() => setModalEditarPlato(false)} />
              </div>
              <div className="modal-body">
                {/* Campo nombre */}
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={platoEditando.nombre}
                    onChange={e => setPlatoEditando({ ...platoEditando, nombre: e.target.value })}
                  />
                </div>
                {/* Campo descripción */}
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    value={platoEditando.descripcion || ''}
                    onChange={e => setPlatoEditando({ ...platoEditando, descripcion: e.target.value })}
                  />
                </div>
                {/* Campo precio */}
                <div className="mb-3">
                  <label className="form-label">Precio</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={platoEditando.precio}
                    onChange={e => setPlatoEditando({ ...platoEditando, precio: e.target.value })}
                  />
                </div>
                {/* Campo orden */}
                <div className="mb-3">
                  <label className="form-label">Orden</label>
                  <input
                    type="number"
                    className="form-control"
                    value={platoEditando.orden}
                    onChange={e => setPlatoEditando({ ...platoEditando, orden: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setModalEditarPlato(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={guardarPlato}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Carta