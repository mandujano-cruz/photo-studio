import { useState } from 'react';
import Register from "./Register";
import Management from './Management'
import * as auth from '../../utils/auth';
import { useDashboardModal } from "../../contexts/DashboardModalContext";
import LoadingModal from '../../components/Modal/LoadingModal'
import MessageModal from '../../components/Modal/MessageModal'

export default function Users () {
  const [activeView, setActiveView] = useState('manage');
  const [showSidebar, setShowSidebar] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const {openModal, closeModal} = useDashboardModal();

  const handleSelectView = (view) => {
    setActiveView(view);
    setShowSidebar(false);
    setShowContent(true);
  };

  const handleRegistration = ({ email, password, full_name, role }) => {
    openModal({
      title: "Cargando...",
      children: <LoadingModal message="Registrando usuario"/>,
      classModal: "modal_loading"
    });
    auth.register(email, password, full_name, role)
      .then(() => {
        console.log("Se ha registrado con éxito");
        openModal({
          title: 'Usuario registrado correctamente',
          children: <MessageModal 
            message="El usuario se ha registrado correctamente"
            type="success"
            closeModal={closeModal}
            autoCloseDuration={3000}
          />,
        })
      })
      .catch((err) => {
        console.error("Ha ocurrido un error: ", err);
        openModal({
          title: 'Error al registrar usuario',
          children: <MessageModal 
            message="Hubo un error al registrar al usuario"
            type="error"
            closeModal={closeModal}
            autoCloseDuration={3000}
          />,
        })
      });
  }

  return (
    <section className={`users`}>
      <aside className={`sidebar${showSidebar ? ' sidebar_open' : ''}`}>
        <h2 className="sidebar__title">Usuarios</h2>
        <button
          className={`sidebar__button ${activeView === 'manage' ? 'sidebar__button_active' : ''}`}
          onClick={() => handleSelectView('manage')}
        >
          Gestión de usuarios
        </button>
        <button
          className={`sidebar__button ${activeView === 'register' ? 'sidebar__button_active' : ''}`}
          onClick={() => handleSelectView('register')}
        >
          Registrar usuario
        </button>
      </aside>

      <div className={`users__content${showContent ? ' users__content_open' : ''}`}>
        <button className='users__toggle-sidebar' onClick={() => {
          setShowSidebar(true);
          setShowContent(false);
        }}>&lt; Volver</button>
        {activeView === 'register' ? <Register handleRegistration={handleRegistration} /> : <Management />}
      </div>
    </section>
  );
}