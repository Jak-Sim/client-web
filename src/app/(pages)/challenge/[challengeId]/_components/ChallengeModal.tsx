'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Dots } from '@/assets/images/icons';
import Modal from '@/components/modal/Modal';
import Portal from '@/components/modal/ModalPortal';
import { useModal } from '@/hooks/useModal';

export default function ChallengeModal() {
  const modalProps = useModal('challenge-modal');
  const modalRef = useRef<HTMLDivElement>(null);

  const onWithdraw = () => {
    console.log('탈퇴하기!');
    modalProps.closeModal();
  };

  return (
    <>
      <Dots onClick={modalProps.openModal} className='cursor-pointer' />

      <Portal>
        <Modal modalProps={modalProps} hasBackDropBlur={false}>
          <motion.div
            className='flex h-full items-end'
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className='mx-6 flex flex-1 flex-col gap-2 pb-6 text-xl' ref={modalRef}>
              <button className='rounded-2xl bg-white px-6 py-4 text-center' onClick={onWithdraw} type='button'>
                탈퇴하기
              </button>
              <button
                className='rounded-2xl bg-white px-6 py-4 font-semibold text-v1-tertiary'
                onClick={modalProps.closeModal}
                type='button'
              >
                취소
              </button>
            </div>
          </motion.div>
        </Modal>
      </Portal>
    </>
  );
}
