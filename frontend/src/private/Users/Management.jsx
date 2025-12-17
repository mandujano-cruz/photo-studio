import { useEffect, useState } from "react";
import { getUsers } from "../../utils/auth";
import * as tok from '../../utils/token';
import { useDashboardModal } from "../../contexts/DashboardModalContext";
import LoadingModal from "../../components/Modal/LoadingModal";

export default function Management () {
  const [membersData, setMembersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { openModal, closeModal } = useDashboardModal();

  useEffect(() => {
    const token = tok.getToken();
    openModal({
      title: "Cargando...",
      children: <LoadingModal message="Cargando listado de usuarios" />,
      classModal: "modal_loading"
    })
    getUsers(token)
      .then(data => {
        setMembersData(data);
        closeModal();
        console.log(data)
      })
      .catch(err => console.error(err))
      .finally(setLoading(false));
  }, []);

  if (loading) return <p>Cargando miembros del equipo...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h3 className="users__content-title">Lista de usuarios</h3>
      <div className="table__container">
        <table className="table">
          <thead>
            <tr>
              <th className="table__cell">Nombre</th>
              <th className="table__cell">Correo electrónico</th>
              <th className="table__cell">Rol</th>
              {/* <th className="table__cell">Acciones</th> */}
            </tr>
          </thead>
          <tbody>
            {membersData.map((user) => (
              <tr key={user._id}>
                <td className="table__cell">{user.full_name}</td>
                <td className="table__cell">{user.email}</td>
                <td className="table__cell">{user.role}</td>
                {/* <td className="table__cell">
                  <button className="table__button table__button_edit">Editar</button>
                  <button className="table__button table__button_cancel">Eliminar</button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}