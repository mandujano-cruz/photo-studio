import { Link, NavLink } from 'react-router-dom';

export default function Footer () {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__media">
          <a className="footer__icon" href="https://facebook.com" target="_blank">Facebook</a>
          <button className="footer__icon" onClick={scrollToTop} >Mandujano</button>
          <a className="footer__icon" href="https://instagram.com" target="_blank">Instagram</a>
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
