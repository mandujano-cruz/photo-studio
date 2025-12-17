import { useState, useEffect } from "react";
import { updateAppointment } from "../../utils/supersaas";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import MessageModal from "./MessageModal"
import { useDashboardModal } from "../../contexts/DashboardModalContext";

export default function EditAppointment ({ appointment, onSuccess }) {
  const [res_name, setResName] = useState("");
  const [name, setName] = useState("");
  const [start, setStartDate] = useState("");
  const [finish, setFinishDate] = useState("");
  const [client, setClient] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const { openModal, closeModal } = useDashboardModal();

  useEffect(() => {
    if (appointment) {
      setResName(appointment.res_name);
      setName(appointment.full_name || ""); 
      setClient(appointment.field_1_r || "");
      setStatus(appointment.field_2_r || "");
      setStartDate(formatLocal(appointment.start));
      setFinishDate(formatLocal(appointment.finish));
    }
  }, [appointment]);

  function formatLocal(dateString) {
    const date = new Date(dateString);
    const local = date.toLocaleString("sv-SE", {
      timeZone: "America/Mexico_City"
    });

    return local.replace(" ", "T").slice(0, 16);
  }

  const handleSaveData = async (e) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      res_name,
      full_name: name,
      field_1_r: client,
      field_2_r: status,
      start,
      finish,
    };

    try {
      const response = await updateAppointment(appointment.id, body);

      openModal({
        title: "Cita modificada correctamente",
        children: <MessageModal
          message="La cita se ha modificado correctamente."
          type='success'
          closeModal={closeModal}
          autoCloseDuration={3000}
        />,
        classModal: "modal"
      });
      setTimeout(() => {
        onSuccess();
      }, 3000);
    } catch (error) {
      console.error(error);
      openModal({
        title: "Error al modificar la cita",
        children: <MessageModal
          message="Hubo un error al intentar modificar la cita"
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
    <form className="modal__container" onSubmit={handleSaveData}>
      <label className="modal__label">Reservación</label>
      <input
        className="modal__input"
        type="text"
        value={res_name}
        onChange={(e) => setResName(e.target.value)}
        placeholder="Reservación"
        required
        readOnly
      />
      <label className="modal__label">Creado por</label>
      <input
        className="modal__input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Creado por"
        required
      />
      <label className="modal__label">Nombre del cliente</label>
      <input
        className="modal__input"
        type="text"
        value={client}
        onChange={(e) => setClient(e.target.value)}
        placeholder="Nombre del cliente"
        required
      />
      <label className="modal__label">Estado de la cita</label>
      <select className="modal__input" value={status} onChange={(e) => setStatus(e.target.value)} required>
        <option>Selecciona...</option>
        <option>Reservado</option>
        <option>Realizado</option>
        <option>Cancelado</option>
      </select>
      <label className="modal__label">Inicio de la cita</label>
      <input
        className="modal__input"
        type="datetime-local"
        value={start}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <label className="modal__label">Fin de la cita</label>
      <input
        className="modal__input"
        type="datetime-local"
        value={finish}
        onChange={(e) => setFinishDate(e.target.value)}
        required
      />

      <button className="modal__save" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  )
}
