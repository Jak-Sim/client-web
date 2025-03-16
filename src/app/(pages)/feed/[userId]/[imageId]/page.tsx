'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useClickAway } from 'react-use';
import FeedCommentModal from '@/app/(pages)/feed/[userId]/[imageId]/_components/FeedCommentModal';
import { Dots, FeedComment, FeedHeart } from '@/assets/images/icons';
import defaultAvatar from '@/assets/images/placeholder/face-default.png';
import Button from '@/components/button/Button';
import Chip from '@/components/chip/Chip';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import Portal from '@/components/modal/ModalPortal';
import { useModal } from '@/hooks/useModal';

export default function Page() {
  const modalProps = useModal('feed-comment');
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
          </Header.Item>
        </Header>
      }
    >
      <div className={'relative h-full flex-1 py-2'}>
        <div className={'flex items-center px-6 pb-[14px]'}>
          <div className={'relative size-[44px] overflow-hidden rounded-full'}>
            <Image src={defaultAvatar} alt={'avatar'} fill objectFit={'cover'} />
          </div>
          <p className={'flex-1 truncate px-3 font-medium text-v1-text-primary-400'}>김작심</p>
          <div className={'flex items-center gap-4'}>
            {/*<button className={'rounded-[20px] border border-v1-orange-500 px-4 py-1 text-v1-orange-500'}>*/}
            {/*  팔로우*/}
            {/*</button>*/}
            <Button className={'text-md bg-orange-50 px-4 py-1 text-v1-orange-500'} variant={'outline'} size={'sm'}>
              팔로우
            </Button>
            <Dots />
          </div>
        </div>
        <ul className='flex w-full gap-2 overflow-hidden px-6'>
          <li className={'w-full flex-none'}>
            <div className='relative aspect-square rounded-[20px] bg-gray-300'>
              <Image src={defaultAvatar} alt={'image'} fill />
            </div>
          </li>
          <li className={'w-full flex-none'}>
            <div className='aspect-square rounded-[20px] bg-gray-300'></div>
          </li>
          <li className={'w-full flex-none'}>
            <div className='aspect-square rounded-[20px] bg-gray-300'></div>
          </li>
        </ul>
        <div className={'px-6'}>
          <div className={'flex items-center justify-between py-3'}>
            <div className={'flex flex-1 items-center gap-5'}>
              <button className={'flex gap-1'}>
                <FeedHeart />
                <span className={'text-sm font-medium text-v1-text-primary-200'}>99+</span>
              </button>
              <button className={'flex gap-1'} onClick={modalProps.openModal}>
                <FeedComment />
                <span className={'text-sm font-medium text-v1-text-primary-200'}>99+</span>
              </button>
            </div>
            <p className={'text-v1-text-primary-200'}>2025.01.01</p>
          </div>
          <div className={'py-2 text-v1-text-primary-700'}>새해가 시작된 첫 독서! 올해도 화이팅</div>
          <ul className={'flex flex-wrap items-center gap-0.5'}>
            <Chip tag={'#여행'} fontSize={'md'} />
            <Chip tag={'#독서'} fontSize={'md'} />
            <Chip tag={'#사진'} fontSize={'md'} />
          </ul>
        </div>
      </div>
      {modalProps.isOpen && (
        <Portal>
          <FeedCommentModal {...modalProps} />
        </Portal>
      )}
    </PageLayout>
  );
}
