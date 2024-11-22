'use client';

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
            <Header.Icon Icon={Dots} onClick={modalProps.toggleModal} />
          </Header.Item>
        </Header>
      }
    >
      <FeedUserProfile />
      <FeedContents />
      {modalProps.isOpen && (
        <Portal>
          <Modal modalProps={modalProps}>
            <div className={'flex h-full items-end'}>
              <div className={'m-6 flex-1 bg-white p-6'}>
                <h2 className='mb-4 text-center text-lg font-bold'>모달 제목</h2>
                <p className='mb-6 text-center text-gray-700'>여기에 내용을 입력하세요.</p>
                <div className='flex justify-between gap-2'>
                  <button
                    onClick={modalProps.toggleModal}
                    className='flex-1 rounded-md bg-gray-200 py-2 text-gray-800 shadow transition hover:bg-gray-300'
                  >
                    닫기
                  </button>
                  <button className='flex-1 rounded-md bg-yellow-500 py-2 text-white shadow transition hover:bg-yellow-600'>
                    차단하기
                  </button>
                  <button className='flex-1 rounded-md bg-red-500 py-2 text-white shadow transition hover:bg-red-600'>
                    신고하기
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </Portal>
      )}
    </PageLayout>
  );
};

export default Page;
