import logo from '../images/MP_letter.png';

export default function Login () {
  return(
    <main className="login">
      <div className="login__container-image">
        <img className='login__image' src={logo} alt="" />
      </div>
      <div className="login__container-form">
        <h2 className="login__signin">INICIAR SESIÓN</h2>
        <form className="login__form">
          <label className="login__label">Correo electrónico</label>
          <input className="login__input" type="email" />
          <label className="login__label">Contraseña</label>
          <input className="login__input" type="password" />
          <button className="login__button">Iniciar sesión</button>
        </form>
      </div>
    </main>
  )
}