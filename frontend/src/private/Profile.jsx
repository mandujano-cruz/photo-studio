import { useEffect, useState } from "react";
import { getUserInfo } from "../utils/auth";
import * as tok from '../utils/token';
import EditProfile from "../components/Modal/EditProfile";
import { useDashboardModal } from "../contexts/DashboardModalContext";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Profile ({ onSignOut }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { openModal, closeModal } = useDashboardModal();

  const handleEditProfile = () => {
    openModal({
      title: "Editar perfil",
      children: <EditProfile onClose={closeModal}/>,
      classModal: "modal_edit"
    });
  };
  console.log(currentUser)

  return (
    <div className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Mi Perfil</h2>

        <div className="profile__item">
          <strong className="profile__label">Nombre completo:</strong>
          <span className="profile__span">{currentUser.full_name} {currentUser.lastName} </span>
        </div>

        <div className="profile__item">
          <strong className="profile__label">Correo electrónico:</strong>
          <span className="profile__span">{currentUser.email}</span>
        </div>

        <div className="profile__item">
          <strong className="profile__label">Rol:</strong>
          <span className="profile__span">{currentUser.role}</span>
        </div>

        <div className="profile__actions">
          <button className="profile__button profile__button_edit" onClick={ handleEditProfile }>Editar perfil</button>
          <button className="profile__button profile__button_logout" onClick={ onSignOut }>Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
}