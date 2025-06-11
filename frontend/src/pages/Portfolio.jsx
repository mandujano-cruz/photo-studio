import React, { useRef, useState, useEffect, useCallback } from 'react';

import image1 from '../images/image-example-1.jpg';
import image2 from '../images/image-example-2.jpg';
import image3 from '../images/image-example-3.jpg';
import image4 from '../images/image-example-4.jpg';
import image5 from '../images/image-example-5.jpg';

const photos = [
  { id: 1, src: image1, alt: 'Retrato 1' },
  { id: 2, src: image2, alt: 'Retrato 2' },
  { id: 3, src: image3, alt: 'Retrato 3' },
  { id: 4, src: image4, alt: 'Retrato 4' },
  { id: 5, src: image5, alt: 'Retrato 5' }
]

export default function Portfolio () {
  const gallery = useRef(null);

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = useCallback((e) => {
    setIsDown(true);
    if (gallery.current) {
      gallery.current.classList.add('active-drag');
      setStartX(e.pageX - gallery.current.offsetLeft);
      setScrollLeft(gallery.current.scrollLeft);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDown(false);
    if (gallery.current) {
      gallery.current.classList.remove('active-drag');
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDown(false);
    if (gallery.current) {
      gallery.current.classList.remove('active-drag');
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDown) return;
    e.preventDefault();

    if (gallery.current) {
      const x = e.pageX - gallery.current.offsetLeft;
      const walk = (x - startX) * 1.8;
      gallery.current.scrollLeft = scrollLeft - walk;
    }
  }, [isDown, startX, scrollLeft]);

  return(
    <main className="portfolio">
      <section 
        className="portfolio__gallery" 
        ref={gallery}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}  
      >
        {photos.map(photo => (
          <img key={photo.id} src={photo.src} alt={photo.alt} className="portfolio__image" draggable="false" />
        ))}
      </section>
    </main>
  )
}