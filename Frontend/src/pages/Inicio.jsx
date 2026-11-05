import HeroCarrusel from '../components/HeroCarrusel/HeroCarrusel'
import HeroTxt from '../components/HeroTxt/HeroTxt'
import img2 from '../assets/imgHero2.png'
import img3 from '../assets/imgHero3.png'

function Inicio() {
  return (
    <>
      <HeroTxt
        imagen={img2}
        subtitulo="Nuestra historia"
        titulo="Cocina con alma mediterránea"
        descripcion="Más de 20 años cocinando con los mejores productos de temporada."
        textoBoton="Conócenos"
      />
      <HeroTxt
        imagen={img3}
        subtitulo="Nuestra carta"
        titulo="Sabores que enamoran"
        descripcion="Platos elaborados con ingredientes frescos y de proximidad."
        textoBoton="Ver carta"
        invertido={true}
      />
    </>
  )
}

export default Inicio


     {/* <HeroCarrusel
        titulo="Bienvenidos"
        subtitulo="La mejor cocina mediterránea de la ciudad"
        textoBoton="Ver carta"
      />*/}
