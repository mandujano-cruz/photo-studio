import image1 from '../../images/image-example-1.jpg';
import image2 from '../../images/image-example-2.jpg';
import image3 from '../../images/image-example-3.jpg';
import image4 from '../../images/image-example-4.jpg';
import image5 from '../../images/image-example-5.jpg';
import delete_icon from '../../images/delete-icon.png';

export default function DeletePhoto () {
  const photos = [
    { 
      id: 1, 
      title: 'Ejemplo 1', 
      section: 'evento', 
      url: image1 
    },
    { 
      id: 2, 
      title: 'Ejemplo 2', 
      section: 'modelo', 
      url: image2 
    },
    { 
      id: 3, 
      title: 'Ejemplo 2', 
      section: 'modelo', 
      url: image3 
    },
    { 
      id: 4, 
      title: 'Ejemplo 2', 
      section: 'modelo', 
      url: image4 
    },
    { 
      id: 5, 
      title: 'Ejemplo 2', 
      section: 'modelo', 
      url: image5 
    },
  ];
  
  return (
    <>
      <h3 className="photo__content-title">Eliminar fotografía</h3>
      <div className="photo__gallery">
        <div className="photo__cards">
          {photos.map((photo) => (
            <div key={photo.id} className="photo__card">
              <img className="photo__image" src={photo.url} alt={photo.title} />
              <div className="photo__card-info">
                <p>{photo.title}</p>
                <span className="photo__tag">{photo.section}</span>
              </div>
              <button className="photo__card-delete">
                <img src={delete_icon} alt="" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}