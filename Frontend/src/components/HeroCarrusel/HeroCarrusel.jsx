import { useState, useEffect } from 'react';
import './HeroCarrusel.css';

import img1 from '../../assets/imgHero1.png';
import img2 from '../../assets/imgHero2.png';
import img3 from '../../assets/imgHero3.png';

const imagenes = [img1, img2, img3];

const HeroCarrusel = ({ titulo, subtitulo, textoBoton, onBotonClick }) => {
  const [actual, setActual] = useState(0);

  // Cambia de imagen automáticamente cada 5 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual(prev => (prev + 1) % imagenes.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, []);

  const irA = (index) => setActual(index);
  const anterior = () => setActual(prev => (prev - 1 + imagenes.length) % imagenes.length);
  const siguiente = () => setActual(prev => (prev + 1) % imagenes.length);

  return (
    <section className="hero-carrusel">

      {/* Imágenes */}
      {imagenes.map((img, index) => (
        <div
          key={index}
          className={`hero-carrusel__slide ${index === actual ? 'hero-carrusel__slide--active' : ''}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Overlay oscuro */}
      <div className="hero-carrusel__overlay" />

      {/* Contenido */}
      <div className="hero-carrusel__content">
        {titulo && <h1 className="hero-carrusel__titulo">{titulo}</h1>}
        {subtitulo && <p className="hero-carrusel__subtitulo">{subtitulo}</p>}
        {textoBoton && (
          <button className="hero-carrusel__boton" onClick={onBotonClick}>
            {textoBoton}
          </button>
        )}
      </div>

      {/* Flechas de navegación */}
      <button className="hero-carrusel__flecha hero-carrusel__flecha--prev" onClick={anterior}>
        &#8592;
      </button>
      <button className="hero-carrusel__flecha hero-carrusel__flecha--next" onClick={siguiente}>
        &#8594;
      </button>

      {/* Puntos indicadores */}
      <div className="hero-carrusel__dots">
        {imagenes.map((_, index) => (
          <button
            key={index}
            className={`hero-carrusel__dot ${index === actual ? 'hero-carrusel__dot--active' : ''}`}
            onClick={() => irA(index)}
          />
        ))}
      </div>

    </section>
  );
};

export default HeroCarrusel;