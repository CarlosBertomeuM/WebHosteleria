import './Contacto.css'

const Contacto = () => {
  return (
    <section className="contacto">
      <div className="contacto__container">
        <h2 className="contacto__titulo">Contacto</h2>
        <p className="contacto__subtitulo">Te esperamos. Aquí tienes toda nuestra información.</p>

        <div className="contacto__contenido">

          <div className="contacto__info">
            <div className="contacto__dato">
              <h3>Dirección</h3>
              <p>Calle Ejemplo, 123<br />12001 Castellón</p>
            </div>
            <div className="contacto__dato">
              <h3>Teléfono</h3>
              <p>964 00 00 00</p>
            </div>
            <div className="contacto__dato">
              <h3>Email</h3>
              <p>info@restaurante.com</p>
            </div>
            <div className="contacto__dato">
              <h3>Horario</h3>
              <p>Martes a Domingo<br />13:00 - 16:00 y 20:00 - 23:30</p>
            </div>
          </div>

          <div className="contacto__mapa">
            <iframe
              title="Ubicación del restaurante"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.252083551965!2d-0.03464069999999999!3d40.1812031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5ff7a97dacb881%3A0x606fc5a2f19ce90c!2sIES%20la%20Vall%20d&#39;Alba!5e0!3m2!1sca!2ses!4v1782159712637!5m2!1sca!2ses"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contacto