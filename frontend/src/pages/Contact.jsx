import { useState, useEffect } from "react";
import { createAppointment, fetchAvailability } from "../utils/supersaas";

export default function Contact () {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [scheduleId, setScheduleId] = useState(806408);

  const addOneHour = (timeString) => {
    const [hour, minute] = timeString.split(':').map(Number);

    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);

    date.setHours(date.getHours() + 1);

    const newHour = String(date.getHours()).padStart(2, '0');
    const newMinute = String(date.getMinutes()).padStart(2, '0');

    return `${newHour}:${newMinute}`;
  };

  useEffect(() => {
    if (!date) return;

    const fetchAvailableTimes = async () => {
      try {
        const data = await fetchAvailability(date, true);
        setAvailableTimes(data.times || []);
        setTime("");
      } catch (err) {
        console.error(err);
        alert("No se pudo obtener las horas disponibles.");
      }
    };

    fetchAvailableTimes();
  }, [date]);


  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    const appointmentData = {
      full_name: name,
      email,
      start: `${date} ${time}`,
      finish: `${date} ${addOneHour(time)}`,
      description,
      scheduleType: 'info'
    };

    try {
      const data = await createAppointment(appointmentData, true);

      console.log("Cita creada:", data);
      alert("¡Cita agendada correctamente!");
      // Limpiar formulario
      setName("");
      setEmail("");
      setDate("");
      setTime("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Hubo un error al agendar la cita.");
    } finally {
      setLoading(false);
    }
  };

  return(
    <main className="contact">
      <section className="contact__container">
        <div className="contact__api">
          <form className="contact__form" onSubmit={handleBooking}>
            <h2 className="contact__title">Agendar cita</h2>
            <input
              className="contact__input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              required
            />
            <input
              className="contact__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
            />
            <input
              className="contact__input"
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción de la cita"
            />
            <input
              className="contact__input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            {availableTimes.length > 0 && (
              <select className="contact__input" value={time} onChange={(e) => setTime(e.target.value)} required>
                <option value="">Selecciona una hora</option>
                {availableTimes.map((t, i) => (
                  <option key={`${i}-${t}`} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            )}

            <button className="contact__button" type="submit" disabled={loading}>
              {loading ? "Agendando..." : "Agendar cita"}
            </button>
          </form>
        </div>
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