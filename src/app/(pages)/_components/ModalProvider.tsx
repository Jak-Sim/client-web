'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState } from 'react';


export type ModalNames = 'feed-profile' | 'cancel-create-challenge' | 'challenge-modal' | 'withdraw-modal';

export interface ModalContextProps {
  modalState: ModalNames[];
  setModalState: Dispatch<SetStateAction<ModalNames[]>>;
}

export const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalState, setModalState] = useState<ModalNames[]>([]);

  useEffect(() => {
    if (modalState.length > 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [modalState]);

  const value = useMemo(() => {
    return {
      modalState,
      setModalState,
    };
  }, [modalState]);

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};