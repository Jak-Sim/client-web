import { useCallback, useContext, useEffect, useState } from 'react';
import { ModalContext, ModalContextProps, ModalNames } from '@/app/(pages)/_components/ModalProvider';

export interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  toggleModal: () => void;
}

export const useModal = (modalName: ModalNames, defaultValue = false) => {
  const [isOpen, setIsOpen] = useState(defaultValue);
  const { setModalState } = useContext(ModalContext) as ModalContextProps;

  const toggleModal = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

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
