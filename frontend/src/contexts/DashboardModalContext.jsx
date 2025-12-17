import { createContext, useContext, useState } from "react";
import Modal from "../components/Modal/Modal";

const DashboardModalContext = createContext();

export function DashboardModalProvider({ children }) {
  const [modalData, setModalData] = useState(null);

  const openModal = ({ title, children, classModal }) => {
    if(!title && !children) return;
    setModalData({ title, children, classModal });
  };

  const closeModal = () => setModalData(null);

  return (
    <DashboardModalContext.Provider value={{ openModal, closeModal }}>
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
    </DashboardModalContext.Provider>
  );
}

export const useDashboardModal = () => useContext(DashboardModalContext);
