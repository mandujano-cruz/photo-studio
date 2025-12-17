import React from 'react';
export default function LoadingModal({ message = "Cargando..." }) {
  return (
	<div className="modal__container modal__container_loading">
	  <div className="modal__loading">
			<div className="modal__spinner"></div>
	  </div>
	  <p className="modal__message">{message}</p>
	</div>
  );
}