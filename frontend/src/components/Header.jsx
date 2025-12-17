import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../images/MP_Logo_white.png'
import logo_letter from '../images/MP_letter_white.png'
import menu from '../images/menu_icon.png'
import { useState } from 'react';

export default function Header () {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isPortfolio = location.pathname === "/portfolio";
  const isServices = location.pathname === "/services";
  const isAbout = location.pathname === "/about";
  const isContact = location.pathname === "/contact";

  function handleOpenNav () {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className={`header${isHome ? ' header_transparent' : ' header_dark'}${isMenuOpen ? ' header_dark' : ''}`}>
      <nav className="header__nav">
        <NavLink to="/portfolio" className={`header__link${isPortfolio ? ' header__link_selected' : ''}${isMenuOpen ? '' : ' header__link_hidden'}`} onClick={handleOpenNav}>PORTAFOLIO</NavLink>
        <NavLink to="/services" className={`header__link${isServices ? ' header__link_selected' : ''}${isMenuOpen ? '' : ' header__link_hidden'}`} onClick={handleOpenNav}>SERVICIOS</NavLink>
        <div className="header__logo">
          <Link to="/">
            <img className='header__logo-image' src={isHome ? logo_letter : logo } alt="" />
          </Link>
        </div>
        <NavLink to="/about" className={`header__link${isAbout ? ' header__link_selected' : ''}${isMenuOpen ? '' : ' header__link_hidden'}`} onClick={handleOpenNav}>NOSOTROS</NavLink>
        <NavLink to="/contact" className={`header__link${isContact ? ' header__link_selected' : ''}${isMenuOpen ? '' : ' header__link_hidden'}`} onClick={handleOpenNav}>CONTACTO</NavLink>
        <button className='header__menu' onClick={handleOpenNav}>
          <img className='header__menu-icon' src={menu} alt="" />
        </button>
      </nav>
    </header>
  );
};
