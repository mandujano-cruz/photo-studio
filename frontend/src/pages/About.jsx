import image1 from '../images/me-example.jpg';

const aboutSections = [
  {
    id: 'history',
    title: 'HISTORIA',
    text1: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos dolor perspiciatis facilis quae eum, natus assumenda impedit a quidem expedita itaque nulla laboriosam voluptatum sit fugit labore eligendi repudiandae dignissimos? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit quo magni libero. Optio ipsam esse earum, accusantium et sunt, nemo ad illum sed perspiciatis voluptas ut! Dolore facere pariatur corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, velit mollitia modi beatae eius sit quaerat et molestiae nesciunt temporibus fugit molestias inventore exercitationem animi dolores culpa illo natus tempore?',
    text2: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos dolor perspiciatis facilis quae eum, natus assumenda impedit a quidem expedita itaque nulla laboriosam voluptatum sit fugit labore eligendi repudiandae dignissimos? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit quo magni libero. Optio ipsam esse earum, accusantium et sunt, nemo ad illum sed perspiciatis voluptas ut! Dolore facere pariatur corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, velit mollitia modi beatae eius sit quaerat et molestiae nesciunt temporibus fugit molestias inventore exercitationem animi dolores culpa illo natus tempore?',
    image: image1,
    alt: 'Fotógrafo trabajando en el estudio',
  },
  {
    id: 'inspiration',
    title: 'INSPIRACIÓN',
    text1: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos dolor perspiciatis facilis quae eum, natus assumenda impedit a quidem expedita itaque nulla laboriosam voluptatum sit fugit labore eligendi repudiandae dignissimos? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit quo magni libero. Optio ipsam esse earum, accusantium et sunt, nemo ad illum sed perspiciatis voluptas ut! Dolore facere pariatur corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, velit mollitia modi beatae eius sit quaerat et molestiae nesciunt temporibus fugit molestias inventore exercitationem animi dolores culpa illo natus tempore?',
    text2: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos dolor perspiciatis facilis quae eum, natus assumenda impedit a quidem expedita itaque nulla laboriosam voluptatum sit fugit labore eligendi repudiandae dignissimos? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit quo magni libero. Optio ipsam esse earum, accusantium et sunt, nemo ad illum sed perspiciatis voluptas ut! Dolore facere pariatur corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, velit mollitia modi beatae eius sit quaerat et molestiae nesciunt temporibus fugit molestias inventore exercitationem animi dolores culpa illo natus tempore?',
    image: image1,
    alt: 'Ideas y conceptos de fotografía',
  },
  {
    id: 'style',
    title: 'ESTILO',
    text1: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos dolor perspiciatis facilis quae eum, natus assumenda impedit a quidem expedita itaque nulla laboriosam voluptatum sit fugit labore eligendi repudiandae dignissimos? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit quo magni libero. Optio ipsam esse earum, accusantium et sunt, nemo ad illum sed perspiciatis voluptas ut! Dolore facere pariatur corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, velit mollitia modi beatae eius sit quaerat et molestiae nesciunt temporibus fugit molestias inventore exercitationem animi dolores culpa illo natus tempore?',
    text2: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos dolor perspiciatis facilis quae eum, natus assumenda impedit a quidem expedita itaque nulla laboriosam voluptatum sit fugit labore eligendi repudiandae dignissimos? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit quo magni libero. Optio ipsam esse earum, accusantium et sunt, nemo ad illum sed perspiciatis voluptas ut! Dolore facere pariatur corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, velit mollitia modi beatae eius sit quaerat et molestiae nesciunt temporibus fugit molestias inventore exercitationem animi dolores culpa illo natus tempore?',
    image: image1,
    alt: 'Estilo distintivo de fotografía',
  },
];

export default function About() {
  return (
    <main className="about">
      {aboutSections.map((section, index) => {
        const isReversed = index % 2 !== 0;

        const containerClass = `about__container ${isReversed ? 'about__container_reverse' : ''}`;
        const titleClass = `about__title ${isReversed ? 'about__title_reverse' : ''}`;
        const textClass = `about__text ${isReversed ? 'about__text_reverse' : ''}`;
        const imageClass = `about__image ${isReversed ? 'about__image_reverse' : ''}`;

        return (
          <section key={section.id} className={containerClass}>
            <div className="about__content">
              <h2 className={titleClass}>{section.title}</h2>
              <p className={textClass}>{section.text1}</p>
              <p className={textClass}>{section.text2}</p>
              <img className={imageClass} src={section.image} alt={section.alt} />
            </div>
          </section>
        );
      })}
    </main>
  );
}