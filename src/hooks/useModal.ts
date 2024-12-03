import { useContext, useEffect, useState } from 'react';
import { ModalContext, ModalNames } from '@/app/(pages)/_components/ModalProvider';

export interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  toggleModal: () => void;
}

export const useModal = (modalName: ModalNames, defaultValue = false) => {
  const [isOpen, setIsOpen] = useState(defaultValue);
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  const { setModalState } = context;

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const openModal = () => {
    setIsOpen(() => true);
  };

  const closeModal = () => {
    setIsOpen(() => false);
  };

  useEffect(() => {
    if (isOpen) {
      setModalState((prev) => {
        return [...prev, modalName];
      });
    } else {
      setModalState((prev) => {
        return prev.filter((modal) => {
          return modal !== modalName;
        });
      });
    }
  }, [isOpen, modalName, setModalState]);

  return { isOpen, toggleModal, openModal, closeModal };
};
