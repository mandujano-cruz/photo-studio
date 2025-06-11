import cover_image from '../images/cover-example.jpg';
import image1 from '../images/image-example-1.jpg';
import image2 from '../images/image-example-2.jpg';
import image3 from '../images/image-example-3.jpg';
import image4 from '../images/image-example-4.jpg';
import image5 from '../images/image-example-5.jpg';
import image6 from '../images/me-example.jpg';

const photos = [
  { id: 1, src: image1, alt: 'Retrato 1' },
  { id: 2, src: image2, alt: 'Retrato 2' },
  { id: 3, src: image3, alt: 'Retrato 3' },
  { id: 4, src: image4, alt: 'Retrato 4' },
  { id: 5, src: image5, alt: 'Retrato 5' }
]

export default function Home () {
  return(
    <main className="home">
      <section className="cover">
        <div className='cover__container'>
          <img className="cover__image" src={cover_image} alt="Fotografía principal de la página" />
          <h1 className="cover__text">BIENVENIDO</h1>
        </div>
      </section>
      <section className="portfolio-section">
        <div className='portfolio-section__container home__section'>
          <h2 className="portfolio-section__title home__section-title">PORTAFOLIO</h2>
          <div className='portfolio-section__container-photo'>
            {photos.map(photo => (
              <img className='portfolio-section__item' key={photo.id} src={photo.src} alt={photo.alt} />
            ))}
          </div>
        </div>
      </section>
      <hr className="home__line" />
      <section className="services-section">
        <div className='services-section__container home__section'>
          <h2 className='services-section__title home__section-title'>SERVICIOS</h2>
          <div className="services-section__content">
            <div className='services-section__item'>
              <img className='services-section__image' src={image5} alt="" />
              <p className='services-section__service'>EVENTOS</p>
            </div>
            <div className='services-section__item services-section__item_reverse'>
              <img className='services-section__image' src={image4} alt="" />
              <p className='services-section__service services-section__service_reverse'>RETRATOS</p>
            </div>
            <div className='services-section__item'>
              <img className='services-section__image' src={image3} alt="" />
              <p className='services-section__service'>MODELOS</p>
            </div>
          </div>
        </div>
      </section>
      <hr className='home__line' />
      <section className='about-section'>
        <div className='about-section__container home__section'>
          <h2 className='about-section__title home__section-title'>NOSOTROS</h2>
          <div className='about-section__content'>
            <img className='about-section__image' src={image6} alt="" />
            <div className='about-section__text'>
              <h3 className='about-section__subtitle'>¡Hola, soy Tania!</h3>
              <p className='about-section__description'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem quibusdam tempora, mollitia quidem, facere illo nobis dolorem repudiandae numquam qui nostrum ipsa at? Sed dolores, eligendi doloribus rem possimus ex. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim mollitia repellat nisi excepturi repudiandae animi corporis, ipsum illo hic, explicabo pariatur qui sit ipsa impedit, vitae quibusdam. Delectus, voluptatem corrupti? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto vitae nostrum illum maiores, eum esse tempore aut soluta nihil laborum. Dolorem deleniti aut molestias deserunt sit a alias nostrum sed.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}