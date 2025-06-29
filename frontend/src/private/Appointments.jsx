import { useEffect, useState } from "react";

export default function Appointments () {
  const [date, setDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setDate(`${year}-${month}-${day}`);
  }, []);

  const appointmentsData = [
    {
      id: 1,
      client: 'Juan Pérez',
      service: 'Fotografía',
      date: '2025-06-20 15:00',
      status: 'Proximo'
    },
    {
      id: 2,
      client: 'Jorge Estrada',
      service: 'Video',
      date: '2025-06-25 15:00',
      status: 'Cancelado'
    },
    {
      id: 3,
      client: 'Venustiano Carranza',
      service: 'Edición',
      date: '2025-06-30 15:00',
      status: 'Realizado'
    }
  ];

  return(
    <section className="appointments">
      <div className="appointments__container">
        <h2 className="appointments__title">Gestión de Citas</h2>
        <div className="appointments__controls">
          <input type="date" className="appointments__input" value={date} onChange={(e) => setDate(e.target.value)} />
          <select className="appointments__input appointments__input-select">
            <option value="">Todos los servicios</option>
            <option value="foto">Fotografía</option>
            <option value="video">Video</option>
            <option value="edicion">Edición</option>
          </select>
          <button className="appointments__button">+ Nueva cita</button>
        </div>
        <div className="appointments__table-container table__container">
          <table className="table">
            <thead>
              <tr>
                <th className="table__cell">Cliente</th>
                <th className="table__cell">Servicio</th>
                <th className="table__cell">Fecha</th>
                <th className="table__cell">Estado</th>
                <th className="table__cell">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {appointmentsData.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="table__cell">{appointment.client}</td>
                  <td className="table__cell">{appointment.service}</td>
                  <td className="table__cell">{appointment.date}</td>
                  <td className="table__cell">{appointment.status}</td>
                  <td className="table__cell">
                    <button className="table__button table__button_edit">Editar</button>
                    <button className="table__button table__button_cancel">Cancelar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}