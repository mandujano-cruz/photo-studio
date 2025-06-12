import { Link, NavLink } from 'react-router-dom';
import logo from '../images/MP_Logo_white.png'
import fb_icon from '../images/facebook-icon.png'
import ig_icon from '../images/instagram-icon.png'

export default function Footer () {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__media">
          <a className="footer__icon" href="https://facebook.com" target="_blank">
            <img className="footer__icon" src={fb_icon} alt="" />
          </a>
          <img className="footer__icon" onClick={scrollToTop} src={logo} alt="" />
          <a className="footer__icon" href="https://instagram.com" target="_blank">
            <img className="footer__icon" src={ig_icon} alt="" />
          </a>
        </div>
        <nav className="footer__nav">
          <NavLink to="/portfolio" className="footer__link">PORTAFOLIO</NavLink>
          <NavLink to="/services" className="footer__link">SERVICIOS</NavLink>
          <NavLink to="/about" className="footer__link">NOSOTROS</NavLink>
          <NavLink to="/contact" className="footer__link">CONTACTO</NavLink>
        </nav>
        <p className="footer__text">©2025. Mandujano</p>
      </div>
    </footer>
  );
};
