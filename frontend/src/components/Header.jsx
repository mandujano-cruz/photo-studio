import { NavLink, useLocation } from 'react-router-dom';

export default function Header () {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className={`header ${isHome ? 'header_transparent' : 'header_dark'}`}>
      <nav className="header__nav">
        <NavLink to="/portfolio" className="header__link">PORTAFOLIO</NavLink>
        <NavLink to="/services" className="header__link">SERVICIOS</NavLink>
        <NavLink to="/" className="header__logo">Mandujano</NavLink>
        <NavLink to="/about" className="header__link">NOSOTROS</NavLink>
        <NavLink to="/contact" className="header__link">CONTACTO</NavLink>
      </nav>
    </header>
  );
};
