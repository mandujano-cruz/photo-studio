export default function Register () {
  return (
    <>
      <h3 className="users__content-title">Registrar nuevo usuario</h3>
      <form className="form">
      <div className="form__group">
        <label className="form__label" htmlFor="name">Nombre(s)</label>
        <input className="form__input" type="text" id="name" name="name" required />  
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="last-name">Apellidos</label>
        <input className="form__input" type="text" id="last-name" name="last-name" required />  
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="email">Correo electrónico</label>
        <input className="form__input" type="email" id="email" name="email" required />  
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="password">Contraseña temporal</label>
        <input className="form__input" type="password" id="password" name="password" required />  
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="role">Rol en Calendly</label>
          <select className="form__input" id="role" name="role" required>
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
              <option value="owner">Propietario</option>
          </select> 
      </div>
      <button className="form__button" type="submit">Registrar usuario</button>
      </form>
    </>
  );
}