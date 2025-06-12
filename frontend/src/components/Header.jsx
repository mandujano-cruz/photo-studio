import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../images/MP_Logo_white.png'
import logo_letter from '../images/MP_letter_white.png'

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
        <Link to="/" className="header__logo" >
          <img src={isHome ? logo_letter : logo } alt="" />
        </Link>
        <NavLink to="/about" className={`header__link ${isAbout ? 'header__link_selected' : ''}`}>NOSOTROS</NavLink>
        <NavLink to="/contact" className={`header__link ${isContact ? 'header__link_selected' : ''}`}>CONTACTO</NavLink>
      </nav>
    </header>
  );
};
