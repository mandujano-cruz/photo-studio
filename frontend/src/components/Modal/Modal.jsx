export default function Modal ({ onClose, title, children, classModal }) {
  if (!title && !children) return null;
  function handleOverlayClick(e) {
    if(e.target.classList.contains("overlay")) onClose();
  }

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className={`modal ${classModal}`}>
        <button className="modal__close" onClick={onClose}></button>
        {title && <h2 className="modal__title">{title}</h2>}
        {children}
      </div>
    </div>
  );
}