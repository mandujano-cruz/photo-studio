export default function Profile () {
  const user = {
    name: 'Jesús Mandujano Cruz',
    email: 'jesus@example.com',
    role: 'Administrador',
  };
  
  return (
    <div className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Mi Perfil</h2>

        <div className="profile__item">
          <strong className="profile__label">Nombre completo:</strong>
          <span className="profile__span">{user.name}</span>
        </div>

        <div className="profile__item">
          <strong className="profile__label">Correo electrónico:</strong>
          <span className="profile__span">{user.email}</span>
        </div>

        <div className="profile__item">
          <strong className="profile__label">Rol:</strong>
          <span className="profile__span">{user.role}</span>
        </div>

        <div className="profile__actions">
          <button className="profile__button profile__button_edit">Editar perfil</button>
          <button className="profile__button profile__button_logout">Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
}