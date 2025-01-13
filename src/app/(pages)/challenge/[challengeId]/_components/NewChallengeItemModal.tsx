'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from '@/assets/images/icons';
import Button from '@/components/button/Button';
import Modal from '@/components/modal/Modal';
import Portal from '@/components/modal/ModalPortal';
import { ModalProps } from '@/hooks/useModal';

interface ContinueConfirmModalProps {
  type: 'mission' | 'reward';
  savedData: { name: string };
  onSaveLoad: () => void;
  onStartNew: () => void;
  modalProps: ModalProps;
}

export default function ContinueConfirmModal({
  type,
  savedData,
  onSaveLoad,
  onStartNew,
  modalProps,
}: ContinueConfirmModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

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
                  작성 중인 {type === 'mission' ? '미션이' : '리워드가'} 있어요
                </div>
                <div className='text-base text-v1-text-primary-500'>
                  ‘{savedData.name}’ {type === 'mission' ? '도전' : ''}을 이어서 작성할까요?
                </div>
              </div>
              <div className='mb-2 flex flex-col gap-2 font-semibold text-v1-text-primary-700'>
                <Button onClick={onSaveLoad} type='button' size='md' variant={type === 'mission' ? 'primary' : 'blue'}>
                  계속 작성하기
                </Button>
                <Button variant='outline' size='md' onClick={onStartNew} type='button'>
                  새 {type === 'mission' ? '미션' : '리워드'} 작성하기
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </Modal>
    </Portal>
  );
}