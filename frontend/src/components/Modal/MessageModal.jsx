import React, { useEffect } from 'react';
export default function MessageModal({
  message = "Sin estado",
  type = "info", // Para definir iconos/estilos
  closeModal,   // Necesario para que el componente se cierre a sí mismo
  autoCloseDuration = null, // Valor por defecto: no hay cierre automático
  // ... otras props como onConfirm, onCancel, etc.
}) {

  // Lógica del Cierre Automático
  useEffect(() => {
    // Solo configura el temporizador si se proporciona una duración válida
    if (autoCloseDuration && autoCloseDuration > 0) {

      const timer = setTimeout(() => {
        // Ejecuta la función de cierre proporcionada por el padre
        closeModal();
      }, autoCloseDuration);

      // Función de limpieza para cancelar el temporizador si el componente se desmonta 
      // (por ejemplo, si el usuario hace clic para cerrar antes de tiempo).
      return () => {
        clearTimeout(timer);
      };
    }
    // El efecto se ejecuta cuando se monta el componente o si cambian estas dependencias
  }, [autoCloseDuration, closeModal]);

  // --- Lógica para Iconos y Estilo (Opcional, pero recomendado) ---
  const getIcon = () => {
    switch (type) {
      case 'success': return 'EXITO';
      case 'error': return 'ERROR';
      case 'confirm': return 'PREGUNTA';
      case 'info':
      default: return 'INFORMACIÓN';
    }
  };

  return (
    <div className={`modal__container modal__container_${type}`}>
      <span className="modal__icon">{getIcon()}</span>
      <p className="modal__message">{message}</p>

      {/* Aquí iría la lógica condicional para los botones (Solo si type !== 'success'/'error') */}
      {/* Ejemplo: Si type === 'confirm', mostrar dos botones (onConfirm/onCancel) */}

    </div>
  );
}