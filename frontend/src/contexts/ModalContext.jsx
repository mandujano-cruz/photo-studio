import { createContext, useContext, useState } from "react";
import Modal from "../components/Modal/Modal";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalData, setModalData] = useState(null);

  const openModal = ({ title, children, classModal }) => {
    if (!title && !children) return;
    setModalData({ title, children, classModal });
  };

  const closeModal = () => setModalData(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalData && (
        <Modal 
          onClose={closeModal} 
          title={modalData.title} 
          classModal={modalData.classModal}
        >
          {modalData.children}
        </Modal>
      )}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);