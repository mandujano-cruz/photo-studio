import { useEffect } from "react";
import { useModal } from "../../contexts/ModalContext";

export default function ModalImage() {
  const { openModal } = useModal();

  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target;
      if (target.tagName === "IMG" && target.classList.contains("js-open-modal-image")) {
        openModal({
          title: null,
          children: <img src={target.src} alt={target.alt} style={{ maxWidth: "100%", borderRadius: "8px" }} />,
          classModal: "modal_image"
        });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [openModal]);

  return null; // este componente no pinta nada
}
