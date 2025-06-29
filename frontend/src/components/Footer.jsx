import { Link, NavLink } from 'react-router-dom';
import logo from '../images/MP_letter_white.png'
import fb_icon from '../images/facebook-icon.png'
import ig_icon from '../images/instagram-icon.png'

export default function Footer () {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="footer">
      <div className="footer__content">
        <Link to="/login" className="footer__logo">
          <img className='footer__image' onClick={scrollToTop} src={logo} alt="" />
        </Link>
        <nav className="footer__nav">
          <NavLink to="/portfolio" className="footer__link">PORTAFOLIO</NavLink>
          <NavLink to="/services" className="footer__link">SERVICIOS</NavLink>
          <NavLink to="/about" className="footer__link">NOSOTROS</NavLink>
          <NavLink to="/contact" className="footer__link">CONTACTO</NavLink>
        </nav>
        <hr className="footer__line" />
        <div className='footer__media'>
          <div className="footer__social">
            <a className="footer__icon" href="https://facebook.com" target="_blank">
              <img className="footer__icon" src={fb_icon} alt="" />
            </a>
            <a className="footer__icon" href="https://instagram.com" target="_blank">
              <img className="footer__icon" src={ig_icon} alt="" />
            </a>
          </div>
          <div className="footer__contact">
            <p>Tel: 123 456 7890</p>
            <p>Email: example@domain.com</p>
            <p>Dirección: Calle Falsa 123, Ciudad, País</p>
          </div>
        </div>
        <p className="footer__text">©2025. Mandujano</p>
      </div>
    </footer>
  );
};
