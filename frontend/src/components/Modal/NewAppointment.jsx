import { useState, useEffect } from "react";
import { fetchAvailability, createAppointment } from "../../utils/supersaas";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useDashboardModal } from "../../contexts/DashboardModalContext";
import MessageModal from "./MessageModal";

export default function NewAppointment ({onSuccess}) {
  const {currentUser} = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [client, setClient] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const { openModal, closeModal } = useDashboardModal();


  useEffect(() => {
    if (currentUser) {
      setName(currentUser.full_name);
      setEmail(currentUser.email);
      setStatus("Reservado");
    }
  }, [currentUser]);

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

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    
    // getMonth() es base 0, por eso sumamos 1
    // Agregamos un '0' inicial si es menor a 10 (ej: 03 en lugar de 3)
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    
    // Agregamos un '0' inicial si es menor a 10
    const day = String(today.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`; // Formato "2025-12-12"
  };

  const minDate = getTodayDate();


  useEffect(() => {
    if (!date) return;

    const fetchAvailableTimes = async () => {
      try {
        const data = await fetchAvailability(date, false);

        // Supongamos que el backend devuelve un array de horarios
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
      field_1_r: client,
      field_2_r: status,
      scheduleType: 'photo',
    };

    try {
      const data = await createAppointment(appointmentData);
      console.log("Cita creada:", data);
      openModal({
        title: "Cita creada correctamente",
        children: <MessageModal
          message="La cita se ha registrado correctamente."
          type='success'
          closeModal={closeModal}
          autoCloseDuration={3000}
        />,
        classModal: "modal"
      });
      setTimeout(() => {
        onSuccess();
      }, 3000);
      // Limpiar formulario
      setName("");
      setEmail("");
      setDate("");
      setTime("");
    } catch (err) {
      console.error(err);
      openModal({
        title: "Error al crear la cita",
        children: <MessageModal
          message="Hubo un error al intentar registrar la cita"
          type='error'
          closeModal={closeModal}
          autoCloseDuration={3000}
        />,
        classModal: "modal"
      });
    } finally {
      setLoading(false);
    }
  };
    return (
      <form className="modal__container" onSubmit={handleBooking}>
        <label>Creador</label>
        <input
          className="modal__input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
          disabled
        />
        <label>Nombre del cliente</label>
        <input
          className="modal__input"
          type="text"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          placeholder="Ingresa su nombre"
          required
        />
        <label>Fecha de reservación</label>
        <input
          className="modal__input"
          type="date"
          value={date}
          min={minDate}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Hora de reservación</label>
        <select className="modal__input" value={time} onChange={(e) => setTime(e.target.value)} required>
          <option value="" disabled={!date || availableTimes.length===0}>{!date ? "Selecciona primero una fecha" : "Seleccina la hora"}</option>
          {availableTimes.map((t, i) => (
            <option key={`${i}-${t}`} value={t}>
              {t}
            </option>
          ))}
        </select>

        <button className="modal__save" type="submit" disabled={loading}>
            {loading ? "Agendando..." : "Agendar cita"}
        </button>
      </form>
    )
}
