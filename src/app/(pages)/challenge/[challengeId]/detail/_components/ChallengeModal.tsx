'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Dots } from '@/assets/images/icons';
import Modal from '@/components/modal/Modal';
import Portal from '@/components/modal/ModalPortal';
import { useModal } from '@/hooks/useModal';


export default function ChallengeModal() {
  const callengeModalProps = useModal('challenge-modal');
  const challengeModalRef = useRef<HTMLDivElement>(null);

  const withdrawModalProps = useModal('withdraw-modal');
  const withdrawModalRef = useRef<HTMLDivElement>(null);
  const onWithdraw = () => {
    console.log('탈퇴하기!');
    callengeModalProps.closeModal();
  };

  return (
    <>
      <Dots onClick={callengeModalProps.openModal} className='cursor-pointer' />

      <Portal>
        <Modal modalProps={callengeModalProps} hasBackDropBlur={false}>
          <motion.div
            className='flex h-full items-end'
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className='mx-6 flex flex-1 flex-col gap-2 pb-6 text-xl' ref={challengeModalRef}>
              <button
                className='rounded-2xl bg-white px-6 py-4 text-center'
                type='button'
                onClick={() => {
                  withdrawModalProps.openModal();
                  callengeModalProps.closeModal();
                }}
              >
                탈퇴하기
              </button>
              <button
                className='rounded-2xl bg-white px-6 py-4 font-semibold text-v1-tertiary'
                onClick={callengeModalProps.closeModal}
                type='button'
              >
                취소
              </button>
            </div>
          </motion.div>
        </Modal>
      </Portal>

      <Portal>
        <Modal modalProps={withdrawModalProps} hasBackDropBlur={false}>
          <motion.div
            className='flex h-full items-end'
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className='mx-6 flex w-full items-center py-6' ref={withdrawModalRef}>
              <div className='h-full w-full break-keep rounded-3xl bg-white px-6 py-4'>
                <div className='py-8 text-center text-xl font-medium'>
                  <p className='mb-2 text-xl'>이 챌린지 를 탈퇴 하시겠어요?</p>
                  <p className='text-sm text-v1-text-primary-300'>탈퇴 후 챌린지 참여 기록은 삭제됩니다.</p>
                </div>
                <div className='flex gap-2'>
                  <button
                    className='w-full rounded-2xl border py-2 text-center font-semibold'
                    type='button'
                    onClick={onWithdraw}
                  >
                    네, 탈퇴합니다
                  </button>
                  <button
                    className='w-full rounded-2xl border py-2 text-center font-semibold'
                    type='button'
                    onClick={withdrawModalProps.closeModal}
                  >
                    아니요!!
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