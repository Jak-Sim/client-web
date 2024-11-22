import { ReactNode } from 'react';
import { ModalProps } from '@/hooks/useModal';
import { cn } from '@/lib/shadcn/utils';

const Modal = ({
  modalProps,
  hasBackDrop = true,
  children,
}: {
  modalProps: ModalProps;
  hasBackDrop?: boolean;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        'fixed inset-0 m-auto h-screen w-[400px]',
        hasBackDrop && 'bg-black bg-opacity-20 backdrop-blur-sm',
      )}
      onClick={modalProps.closeModal}
    >
      {children}
    </div>
  );
};

export default Modal;
