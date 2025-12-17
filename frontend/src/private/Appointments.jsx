import { useEffect, useState } from "react";
import { fetchAppointments } from "../utils/supersaas";
import { useDashboardModal } from "../contexts/DashboardModalContext";
// import AppointmentWidget from "../components/AppointmentWidget";
import NewAppointment from "../components/Modal/NewAppointment";
import EditAppointment from "../components/Modal/EditAppointment";
import LoadingModal from "../components/Modal/LoadingModal";

export default function Appointments () {
  const [appointmentsData, setAppointmentsData] = useState([]);
  //const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");
  const [error, setError] = useState("");
  const { openModal, closeModal } = useDashboardModal();

  const getAppointments = async () => {
    openModal({
      title: "Cargando...",
      children: <LoadingModal message="Cargando listado de citas" />,
      classModal: "modal_loading"
    })
    try {
      const data = await fetchAppointments();
      setAppointmentsData(data);
      closeModal();
    } catch (err) {
      setError("No se pudieron obtener las citas", err);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  const getFilteredAndSortedAppointments = (appointmentsData, currentFilter) => {
    const filteredAppointments = appointmentsData.filter((appointment) => {
      if (filter === "todos") return true;
      return appointment.field_2_r === currentFilter;
    });

    const sortedAppointments = [...filteredAppointments].sort((a, b) => {
      const dateA = new Date(a.start);
      const dateB = new Date(b.start);
      return dateB - dateA;
    });
    return sortedAppointments;
  }
  

  const showAppointments = getFilteredAndSortedAppointments(appointmentsData, filter);

  const getStatusClassName = (appointment) => {
    switch (appointment.field_2_r) {
      case 'Realizado':
        return 'table__cell_ok';
      case 'Cancelado':
        return 'table__cell_cancel';
      default:
        return 'table__cell_info'
    }
  }


  const handleNewAppointment = () => {
    openModal({
      title: "Nueva cita",
      children: <NewAppointment
        onSuccess={getAppointments}
      />,
      classModal: "modal"
    });
  };

  const handleEditAppointment = (appointment) => {
    openModal({
      title: "Información de la cita",
      children: <EditAppointment 
        appointment={appointment}
        onSuccess={getAppointments}
      />,
      classModal: "modal"
    });
  };

  //if (loading) return <p>Cargando citas...</p>;
  //if (error) return <p>{error}</p>;

  return(
    <section className="appointments">
      <div className="appointments__container">
        <h2 className="appointments__title">Gestión de Citas</h2>
        <div className="appointments__controls">
          {/*<input type="date" className="appointments__input" value={date} onChange={(e) => setDate(e.target.value)} />*/}
          <select className="appointments__input appointments__input-select" onChange={(e) => setFilter(e.target.value)}>
            <option value={"todos"}>Todas las citas</option>
            <option>Reservado</option>
            <option>Realizado</option>
            <option>Cancelado</option>
          </select>
          <button className="appointments__button" onClick={handleNewAppointment}>+ Nueva cita</button>
        </div>
        <div className="appointments__table-container table__container">
          {showAppointments.length===0 ? (
            <p className="appointments__empty-message">Sin información.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th className="table__cell">Reservación</th>
                  <th className="table__cell">Fecha</th>
                  <th className="table__cell">Cliente</th>
                  <th className="table__cell">Estado</th>
                </tr>
              </thead>
              <tbody>
                {showAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="table__cell"><button className="table__button table__button_edit" onClick={() => handleEditAppointment(appointment)}>{appointment.res_name}</button></td>
                    <td className="table__cell">{formatDate(appointment.start)}</td>
                    <td className="table__cell">{appointment.field_1_r}</td>
                    <td className={`table__cell ${getStatusClassName(appointment)}`}>{appointment.field_2_r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  )
}