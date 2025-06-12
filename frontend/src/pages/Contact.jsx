import { InlineWidget } from "react-calendly";

export default function Contact () {
  return(
    <main className="contact">
      <section className="contact__container">
        <InlineWidget className="contact__calendly" url="https://calendly.com/mandujano_prueba" /> 
        <div className="contact__content">
          <h2 className="contact__title">¡Hablemos de tu proyecto!</h2>
          <p className="contact__text">
            Estoy emocionado de saber más sobre tus ideas y cómo puedo ayudarte a capturarlas.
            Agenda una sesión gratuita conmigo a través de Calendly.
          </p>
          <p className="contact__text">
            También puedes contactarme directamente:
          </p>
          <ul className="contact__details">
            <li>Email: info@estudio.com</li>
            <li>Teléfono: +52 123 456 7890</li>
            <li>Dirección: Calle Falsa 123, Ciudad, País</li>
          </ul>
        </div>
      </section>
    </main>
  )
}