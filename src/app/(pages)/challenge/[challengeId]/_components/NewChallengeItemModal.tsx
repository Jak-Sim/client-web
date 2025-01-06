'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from '@/assets/images/icons';
import Button from '@/components/button/Button';
import Modal from '@/components/modal/Modal';
import Portal from '@/components/modal/ModalPortal';
import { useModal } from '@/hooks/useModal';


interface MissionType {
  tag: 'mission';
  data: {
    name: string;
  };
}

interface RewardType {
  tag: 'reward';
  data: {
    name: string;
  };
}
export type LocalSavedChallengeItem = MissionType | RewardType;

export default function ContinueConfirmModal({
  savedData,
  onSaveLoad: onOk,
}: {
  savedData: LocalSavedChallengeItem | null;
  onSaveLoad: () => void;
}) {
  const modalProps = useModal('new-challenge-item');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (savedData) {
      modalProps.openModal();
    }
    return () => {
      modalProps.closeModal();
    };
  }, [savedData, modalProps]);

  if (!savedData) return null;

  const onContinueButtonClick = () => {
    onOk();
    modalProps.closeModal();
  };

  const onNewButtonClick = () => {
    modalProps.closeModal();
  };

  return (
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
            <div className='relative flex flex-col break-keep rounded-[20px] bg-white px-6 py-3'>
              <X className='absolute right-5 top-5 scale-75 cursor-pointer' onPointerDown={modalProps.closeModal} />
              <div className='mb-4 mt-4 flex flex-col gap-2'>
                <div className='text-2xl font-medium text-v1-text-primary-700'>
                  작성 중인 {savedData.tag === 'mission' ? '미션이' : '리워드가'} 있어요
                </div>
                <div className='text-base text-v1-text-primary-500'>
                  ‘{savedData.data.name}’ {savedData.tag === 'mission' ? '도전' : ''}을 이어서 작성할까요?
                </div>
              </div>
              <div className='mb-2 flex flex-col gap-2 font-semibold text-v1-text-primary-700'>
                <Button
                  onClick={onContinueButtonClick}
                  type='button'
                  size='md'
                  variant={savedData.tag === 'mission' ? 'primary' : 'blue'}
                >
                  계속 작성하기
                </Button>
                <Button variant='outline' size='md' onClick={onNewButtonClick} type='button'>
                  새 {savedData.tag === 'mission' ? '미션' : '리워드'} 작성하기
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </Modal>
    </Portal>
  );
}