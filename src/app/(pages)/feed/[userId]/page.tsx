'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useClickAway } from 'react-use';
import FeedContents from '@/app/(pages)/feed/[userId]/_components/FeedContents';
import FeedUserProfile from '@/app/(pages)/feed/[userId]/_components/FeedUserProfile';
import Dots from '@/assets/images/icons/Dots.svg';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import Modal from '@/components/modal/Modal';
import Portal from '@/components/modal/ModalPortal';
import { useModal } from '@/hooks/useModal';

const Page = () => {
  const modalProps = useModal('feed-profile');
  const modalRef = useRef<HTMLDivElement>(null);

  useClickAway(modalRef, () => {
    modalProps.closeModal();
  });

  return (
    <PageLayout
      className={'bg-v1-background'}
      header={
        <Header className={'border-none bg-v1-background'}>
          <Header.Item>
            <Header.BackButton />
            <div className={'text-xl'}>
              <span className={'font-semibold text-v1-text-primary-700'}>김작심</span>{' '}
              <span className={'font-normal text-v1-text-primary-500'}>님의 피드</span>
            </div>
          </Header.Item>
          <Header.Item>
            <Header.Icon Icon={Dots} onClick={modalProps.openModal} />
          </Header.Item>
        </Header>
      }
    >
      <FeedUserProfile />
      <FeedContents />
      <Portal>
        <Modal modalProps={modalProps}>
          <motion.div
            className={'flex h-full items-end'}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={'mx-6 mb-[44px] flex-1'} ref={modalRef}>
              <div className={'mb-[6px] flex flex-col rounded-2xl bg-white'}>
                <button className={'w-full border-b border-v1-grey-400 p-5 text-xl font-medium text-[#ff3b30]'}>
                  차단하기
                </button>
                <button className={'w-full p-5 text-xl font-medium text-v1-grey-900'}>신고하기</button>
              </div>
              <button
                onClick={modalProps.closeModal}
                className={'w-full rounded-2xl bg-white p-5 text-xl font-medium text-v1-grey-900'}
              >
                취소
              </button>
            </div>
          </motion.div>
        </Modal>
      </Portal>
    </PageLayout>
  );
};

export default Page;
