import { useState } from 'react';
import Register from './Register'
import Management from './Management'

export default function Users () {
  const [activeView, setActiveView] = useState('manage');
  const [showSidebar, setShowSidebar] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleSelectView = (view) => {
    setActiveView(view);
    setShowSidebar(false);
    setShowContent(true);
  };

  return (
    <section className={`users`}>
      <aside className={`sidebar${showSidebar ? ' sidebar_open' : ''}`}>
        <h2 className="sidebar__title">Usuarios</h2>
        <button
          className={`sidebar__button ${activeView === 'manage' ? 'sidebar__button_active' : ''}`}
          onClick={() => handleSelectView('manage')}
        >
          Gestión de usuarios
        </button>
        <button
          className={`sidebar__button ${activeView === 'register' ? 'sidebar__button_active' : ''}`}
          onClick={() => handleSelectView('register')}
        >
          Registrar usuario
        </button>
      </aside>

      <div className={`users__content${showContent ? ' users__content_open' : ''}`}>
        <button className='users__toggle-sidebar' onClick={() => {
          setShowSidebar(true);
          setShowContent(false);
        }}>&lt; Volver</button>
        {activeView === 'register' ? <Register /> : <Management />}
      </div>
    </section>
  );
}