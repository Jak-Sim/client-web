'use client';

import { ReactNode, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Modal from '@/components/modal/Modal';
import Portal from '@/components/modal/ModalPortal';
import { useModal } from '@/hooks/useModal';

export default function CreateChallengeCancel({ children }: { children: ReactNode }) {
  const modalProps = useModal('cancel-create-challenge');
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onCancelCreateChallenge = () => {
    router.push('/challenge');
  };

  return (
    <>
      <div className='flex' onClick={modalProps.openModal}>
        {children}
      </div>
      <Portal>
        <Modal modalProps={modalProps} hasBackDropBlur={false}>
          <motion.div
            className='flex h-full items-center'
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className='mx-6 flex-1' ref={modalRef}>
              <div className='flex flex-col break-keep rounded-[20px] bg-white px-6 py-4'>
                <div className='mb-8 mt-6 flex flex-col gap-1 text-center'>
                  <div className='text-xl font-medium text-v1-text-primary-700'>챌린지 등록을 그만 두시겠어요?</div>
                  <div className='text-sm text-v1-text-primary-300'>작성 중인 내용이 삭제 됩니다</div>
                </div>
                <div className='mb-2 flex flex-wrap gap-2 font-semibold text-v1-text-primary-700'>
                  <button
                    className='w-[calc(50%-4px)] rounded-2xl border border-v1-text-primary-100 px-4 py-2'
                    onClick={onCancelCreateChallenge}
                    type='button'
                  >
                    네, 그만 둘래요
                  </button>
                  <button
                    className='w-[calc(50%-4px)] rounded-2xl border border-v1-text-primary-100 px-4 py-2'
                    onClick={modalProps.closeModal}
                    type='button'
                  >
                    아니요
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </Modal>
      </Portal>
    </>
  );
}
