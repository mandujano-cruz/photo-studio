import { useState } from 'react';
import logo from '../images/MP_letter.png';

export default function Login ({handleLogin}) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  }

  return(
    <main className="login">
      <div className="login__container-image">
        <img className='login__image' src={logo} alt="" />
      </div>
      <div className="login__container-form">
        <h2 className="login__signin">INICIAR SESIÓN</h2>
        <form 
          className="login__form"
          name='login'
          id='login'
          onSubmit={handleSubmit}
          noValidate
        >
          <label className="login__label">Correo electrónico</label>
          <input 
            className="login__input" 
            type="email"
            id='email'
            name='email'
            value={data.email}
            onChange={handleChange}
            required
          />
          <label className="login__label">Contraseña</label>
          <input 
            className="login__input" 
            type="password"
            id='password'
            name='password'
            value={data.password}
            onChange={handleChange}
            required 
          />
          <button className="login__button">Iniciar sesión</button>
        </form>
      </div>
    </main>
  )
}