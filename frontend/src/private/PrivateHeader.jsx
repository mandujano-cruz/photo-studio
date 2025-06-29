import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from 'react';
import logo_letter from '../images/MP_letter.png'
import menu from '../images/menu_icon.png'

export default function PrivateHeader () {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAppointments = location.pathname === "/dashboard/appointments";
  const isUsers = location.pathname === "/dashboard/users";
  const isPhotos = location.pathname === "/dashboard/photo";
  const isProfile = location.pathname === "/dashboard/profile";

  function handleOpenNav () {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="private-header">
      <Link to="/dashboard" className="private-header__logo">
        <img className="private-header__image" src={logo_letter} alt="" />
        <p className="private-header__text">PORTAL INTERNO</p>
      </Link>
      <nav className={`private-header__nav${isMenuOpen ? ' private-header__nav_open' : ''}`}>
        <NavLink to="/dashboard/appointments" className={`private-header__link ${isAppointments ? 'private-header__link_selected' : ''}`}>CITAS</NavLink>
        <NavLink to="/dashboard/users" className={`private-header__link ${isUsers ? 'private-header__link_selected' : ''}`}>USUARIOS</NavLink>
        <NavLink to="/dashboard/photo" className={`private-header__link ${isPhotos ? 'private-header__link_selected' : ''}`}>FOTOGRAFÍAS</NavLink>
        <NavLink to="/dashboard/profile" className={`private-header__link ${isProfile ? 'private-header__link_selected' : ''}`}>#NAMEUSER</NavLink>
      </nav>
      <button className='private-header__menu' onClick={handleOpenNav}>
        <img className='private-header__menu-icon' src={menu} alt="" />
      </button>
    </header>
  );
}