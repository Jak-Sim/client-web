import React, { Fragment } from 'react';
import Image from 'next/image';
import { SubMissionImageProps } from '@/app/(pages)/chat/[id]/_components/OtherChat';
import { ChatSubmissionCancel, ChatSubmissionConfirm, LightningDark } from '@/assets/images/icons';
import defaultAvatar from '@/assets/images/placeholder/face-default.png';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import { ChatSubmissionProps } from '@/models/chat/data-contracts';

const SubmissionDetailModal = (props: SubMissionImageProps & ChatSubmissionProps) => {
  return (
    <div className={'fixed left-0 right-0 top-0 m-auto flex h-screen max-w-[400px] flex-col'}>
      <PageLayout
        header={
          <Header className={'bg-v1-background'}>
            <Header.Item>
              <Header.BackButton onClick={() => props.close()} />
            </Header.Item>
            <Header.Title>{props.roomId}</Header.Title>
          </Header>
        }
        footer={<Fragment />}
      >
        <div className={'relative h-full flex-1 px-4 py-2'}>
          <p className={'pb-3'}>
            <LightningDark />
          </p>
          <ul className='-ml-6 flex w-full gap-2 overflow-hidden px-6'>
            <li className={'w-full flex-none'}>
              <div className='relative aspect-square rounded-[20px] bg-gray-300'>
                <Image src={props.src || defaultAvatar} alt={'image'} fill />
              </div>
            </li>
            <li className={'w-full flex-none'}>
              <div className='aspect-square rounded-[20px] bg-gray-300'></div>
            </li>
            <li className={'w-full flex-none'}>
              <div className='aspect-square rounded-[20px] bg-gray-300'></div>
            </li>
          </ul>
          <p className={'pt-4 text-v1-text-primary-400'}>미션후기</p>
          <p className={'rounded-[20px] bg-white p-[14px] text-v1-text-primary-400'}>{props.description}</p>
          <div className={'flex w-full justify-between pt-6'}>
            <button
              className='flex flex-1 items-center justify-center gap-2 rounded-[20px] bg-white p-4 text-xl font-semibold shadow'
              type='button'
            >
              <ChatSubmissionCancel />
              다시 도전
            </button>
            <button
              className='flex flex-1 items-center justify-center gap-2 rounded-[20px] bg-white p-4 text-xl font-semibold shadow'
              type='button'
            >
              <ChatSubmissionConfirm />
              미션 확인
            </button>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default SubmissionDetailModal;
