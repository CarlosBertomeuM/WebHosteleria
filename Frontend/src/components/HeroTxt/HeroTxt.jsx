import './HeroTxt.css';

import img1 from '../../assets/imgHero1.png';
import img2 from '../../assets/imgHero2.png';
import img3 from '../../assets/imgHero3.png';

// invertido={true} coloca la imagen a la izquierda y el texto a la derecha
// invertido={false} coloca el texto a la izquierda y la imagen a la derecha

const Herotxt = ({
  imagen = img1,
  titulo,
  subtitulo,
  descripcion,
  textoBoton,
  onBotonClick,
  invertido = false
}) => {
  return (
    <section className={`hero-ti ${invertido ? 'hero-ti--invertido' : ''}`}>
      <div className="hero-ti__container">

        {/* Texto */}
        <div className="hero-ti__texto">
          {subtitulo && <span className="hero-ti__subtitulo">{subtitulo}</span>}
          {titulo && <h2 className="hero-ti__titulo">{titulo}</h2>}
          {descripcion && <p className="hero-ti__descripcion">{descripcion}</p>}
          {textoBoton && (
            <button className="hero-ti__boton" onClick={onBotonClick}>
              {textoBoton}
            </button>
          )}
        </div>

        {/* Imagen */}
        <div className="hero-ti__imagen-wrapper">
          <img src={imagen} alt={titulo} className="hero-ti__imagen" />
        </div>

      </div>
    </section>
  );
};

export default Herotxt;