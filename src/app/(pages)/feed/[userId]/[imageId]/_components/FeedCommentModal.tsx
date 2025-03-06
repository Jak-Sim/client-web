import React, { useState } from 'react';
import Image from 'next/image';
import { ChatArrowUp } from '@/assets/images/icons';
import defaultAvatar from '@/assets/images/placeholder/face-default.png';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import { ModalProps } from '@/hooks/useModal';

const FeedCommentModal = (props: ModalProps) => {
  const [message, setMessage] = useState('');
  return (
    <div className={'fixed left-0 right-0 top-0 m-auto flex h-screen max-w-[400px] flex-col'}>
      <PageLayout
        header={
          <Header className={'bg-v1-background'}>
            <Header.Item>
              <Header.BackButton onClick={() => props.closeModal()} />
            </Header.Item>
            <Header.Title>댓글</Header.Title>
          </Header>
        }
        footer={
          <div className={'flex items-center border-t border-[#e2e2e2] bg-v1-background px-2 pb-4 pt-2'}>
            <form
              className={'relative flex flex-1'}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                className={
                  'flex-1 rounded-[50px] bg-v1-text-primary-50 py-3 pl-[26px] pr-[48px] placeholder:text-v1-text-primary-200'
                }
                type='text'
                placeholder={'댓글 추가'}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type={'submit'}
                className={
                  'absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-v1-text-primary-100 p-1'
                }
              >
                <ChatArrowUp />
              </button>
            </form>
          </div>
        }
      >
        <div className={'relative h-full flex-1 px-6 py-3'}>
          <ul>
            <li className={'flex gap-2.5 pb-4'}>
              <div className={'relative size-[44px] overflow-hidden rounded-full'}>
                <Image src={defaultAvatar} alt={'avatar'} fill objectFit={'cover'} />
              </div>
              <div className={'flex flex-1 flex-col'}>
                <p className={'flex items-center px-1 text-sm font-medium text-v1-text-primary-600'}>
                  창슈니<span className={'ml-4 text-xs text-v1-text-primary-200'}>2025.01.01</span>
                </p>
                <p className={'px-1 text-sm font-medium text-v1-text-primary-400'}>화이팅!</p>
              </div>
            </li>
            <li className={'flex gap-2.5 pb-4'}>
              <div className={'relative size-[44px] overflow-hidden rounded-full'}>
                <Image src={defaultAvatar} alt={'avatar'} fill objectFit={'cover'} />
              </div>
              <div className={'flex flex-1 flex-col'}>
                <p className={'flex items-center px-1 text-sm font-medium text-v1-text-primary-600'}>
                  창슈니<span className={'ml-4 text-xs text-v1-text-primary-200'}>2025.01.01</span>
                </p>
                <p className={'px-1 text-sm font-medium text-v1-text-primary-400'}>화이팅!</p>
              </div>
            </li>
          </ul>
        </div>
      </PageLayout>
    </div>
  );
};

export default FeedCommentModal;
