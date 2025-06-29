import { useEffect, useRef, useState } from "react"

import image1 from '../images/image-example-1.jpg';
import image2 from '../images/image-example-2.jpg';
import image3 from '../images/image-example-3.jpg';
import image4 from '../images/image-example-4.jpg';
import image5 from '../images/image-example-5.jpg';

const servicesData = {
  eventos: {
    title: 'Eventos',
    description: 'Capturamos momentos especiales en bodas, fiestas y celebraciones con estilo y emoción.',
    image: image1
  },
  retratos: {
    title: 'Retratos',
    description: 'Retratos profesionales y personales que resaltan tu esencia con luz y perspectiva única.',
    image: image2
  },
  modelos: {
    title: 'Modelos',
    description: 'Sesiones de modelaje con dirección artística para portafolios y campañas visuales.',
    image: image3
  }
};

export default function Services () {
  const [activeTab, setActiveTab] = useState('eventos');
  const servicesSection = useRef(null);
  const delayTime = 800;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (servicesSection.current) servicesSection.current.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }, delayTime);
    return () => clearTimeout(timer);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const { title, description, image } = servicesData[activeTab];

  return(
    <main className="services">
      <section className="services__container" ref={servicesSection}>
        <nav className="services__nav">
          {Object.keys(servicesData).map((key) => (
            <button
              key={key}
              className={`services__tab ${activeTab === key ? 'services__tab_selected' : ''}`}
              onClick={() => handleTabClick(key)}
            >
              {servicesData[key].title}
            </button>
          ))}
        </nav>

        <section className="services__content">
          <img src={image} alt={title} className="services__image" />
          <div className="services__info">
            <h2 className="services__title">{title}</h2>
            <p className="services__description">{description}</p>
          </div>
        </section>
      </section>
    </main>
  )
}