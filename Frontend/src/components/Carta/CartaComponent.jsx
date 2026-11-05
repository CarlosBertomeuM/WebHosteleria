import { useState, useEffect } from 'react';
import CategoriaService from '../../services/CategoriaService';
import './CartaComponent.css';

const categoriaService = new CategoriaService();

const CartaComponent = () => {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Al montar el componente carga las categorías con sus platos
  useEffect(() => {
    categoriaService.getAll()
      .then(data => {
        setCategorias(data);
        setCargando(false);
      })
      .catch(err => {
        setError('No se pudo cargar la carta.');
        setCargando(false);
      });
  }, []);

  if (cargando) return <div className="carta__estado">Cargando carta...</div>;
  if (error)    return <div className="carta__estado carta__estado--error">{error}</div>;

  return (
    <section className="carta">
      <div className="carta__container">
        <h2 className="carta__titulo">Nuestra Carta</h2>

        {categorias.map(categoria => (
          <div key={categoria.id} className="carta__categoria">
            <h3 className="carta__categoria-titulo">{categoria.nombre}</h3>

            <div className="carta__platos">
              {categoria.platos && categoria.platos.map(plato => (
                <div key={plato.id} className="carta__plato">
                  <div className="carta__plato-info">
                    <span className="carta__plato-nombre">{plato.nombre}</span>
                    {plato.descripcion && (
                      <span className="carta__plato-descripcion">{plato.descripcion}</span>
                    )}
                  </div>
                  <span className="carta__plato-precio">{plato.precio}€</span>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default CartaComponent;