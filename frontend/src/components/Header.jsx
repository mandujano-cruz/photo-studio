import { NavLink, useLocation } from 'react-router-dom';

export default function Header () {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isPortfolio = location.pathname === "/portfolio";
  const isServices = location.pathname === "/services";
  const isAbout = location.pathname === "/about";
  const isContact = location.pathname === "/contact";

  return (
    <header className={`header ${isHome ? 'header_transparent' : 'header_dark'}`}>
      <nav className="header__nav">
        <NavLink to="/portfolio" className={`header__link ${isPortfolio ? 'header__link_selected' : ''}`}>PORTAFOLIO</NavLink>
        <NavLink to="/services" className={`header__link ${isServices ? 'header__link_selected' : ''}`}>SERVICIOS</NavLink>
        <NavLink to="/" className="header__logo">Mandujano</NavLink>
        <NavLink to="/about" className={`header__link ${isAbout ? 'header__link_selected' : ''}`}>NOSOTROS</NavLink>
        <NavLink to="/contact" className={`header__link ${isContact ? 'header__link_selected' : ''}`}>CONTACTO</NavLink>
      </nav>
    </header>
  );
};
