import { useState } from "react";

export default function Register ({handleRegistration}) {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    lastName: "",
    role: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  }
  return (
    <>
      <h3 className="users__content-title">Registrar nuevo usuario</h3>
      <form 
        className="form"
        name="register"
        id="register"
        onSubmit={handleSubmit}
        noValidate
      >
      <div className="form__group">
        <label className="form__label" htmlFor="name">Nombre(s)</label>
        <input 
          className="form__input" 
          type="text" 
          id="name" 
          name="name" 
          value={data.name}
          onChange={handleChange}
          required 
        />  
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="lastName">Apellidos</label>
        <input 
          className="form__input" 
          type="text" 
          id="lasName" 
          name="lastName" 
          value={data.lastName}
          onChange={handleChange}
          required 
        />  
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="email">Correo electrónico</label>
        <input 
          className="form__input" 
          type="email" 
          id="email" 
          name="email" 
          value={data.email}
          onChange={handleChange}
          required 
        />  
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="password">Contraseña temporal</label>
        <input 
          className="form__input" 
          type="password" 
          id="password" 
          name="password" 
          value={data.password}
          onChange={handleChange}
          required 
        />  
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="role">Rol en Calendly</label>
          <select 
            className="form__input" 
            id="role" 
            name="role" 
            value={data.role}
            onChange={handleChange}
            required
          >
              <option value="">Seleccionar...</option>
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