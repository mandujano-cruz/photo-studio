import { useContext, useState } from "react";
import { updateProfile } from "../../utils/auth";
import MessageModal from "../Modal/MessageModal"
import LoadingModal from "../Modal/LoadingModal"
import { useDashboardModal } from "../../contexts/DashboardModalContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfile({ onClose }) {
  const [name, setName] = useState("");
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { openModal, closeModal } = useDashboardModal();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setName({name});
    openModal({
      title: 'Guardando cambios',
      children: <LoadingModal message="Guardando cambios. Espere..." />,
      classModal: "modal_loading"
    });
    updateProfile({name: name})
      .then((updateUser) => {
        setCurrentUser(updateUser);
        openModal({
          title: "Datos actualizados correctamente",
          children: <MessageModal
            message="Los datos se han actualizado correctamente."
            type='success'
            closeModal={closeModal}
            autoCloseDuration={3000}
          />,
          classModal: "modal"
        });
      })
      .catch((err) => {
        openModal({
          title: "Error al actualizar datos",
          children: <MessageModal
            message="Hubo un error al actualizar los datos."
            type='error'
            closeModal={closeModal}
            autoCloseDuration={3000}
          />,
          classModal: "modal"
        });
      })
  }

  return (
    <form
      className="modal__container"
      name="profile"
      id="edit-profile"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        className="modal__input" 
        type="text"
        id="name-input"
        name="name"
        placeholder="Nombre"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
        required
      />
      <button type="submit" className="modal__save">Guardar</button>
    </form>
  )
}