import { useState } from 'react';
import AddPhoto from './AddPhoto';
import DeletePhoto from './DeletePhoto';

export default function Photo () {
  const [activeView, setActiveView] = useState('add');
  const [showSidebar, setShowSidebar] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleSelectView = (view) => {
    setActiveView(view);
    setShowSidebar(false);
    setShowContent(true);
  };

  return (
    <section className="photo">
      <aside className={`sidebar${showSidebar ? ' sidebar_open' : ''}`}>
        <h2 className="sidebar__title">Fotografías</h2>
        <button
          className={`sidebar__button ${activeView === 'add' ? 'sidebar__button_active' : ''}`}
          onClick={() => handleSelectView('add')}
        >
          Añadir fotografía
        </button>
        <button
          className={`sidebar__button ${activeView === 'delete' ? 'sidebar__button_active' : ''}`}
          onClick={() => handleSelectView('delete')}
        >
          Eliminar fotografía
        </button>
      </aside>

      <div className={`photo__content${showContent ? ' photo__content_open' : ''}`}>
        <button className='photo__toggle-sidebar' onClick={() => {
          setShowSidebar(true);
          setShowContent(false);
        }}>&lt; Volver</button>
        {activeView === 'add' ? <AddPhoto /> : <DeletePhoto />}
      </div>
    </section>
  );
}