'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SmallBadge, SmallFlag } from '@/assets/images/icons';
import FeedAvatar from '@/assets/images/placeholder/FeedAvatar.png';
import { cn } from '@/lib/shadcn/utils';

const FeedUserProfile = () => {
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollow = () => {
    setIsFollowed(!isFollowed);
  };
  return (
    <div className={'px-8 pt-8'}>
      <div className={'flex gap-5'}>
        <div className={'relative h-[112px] w-[112px] flex-none rounded-full bg-amber-200'}>
          <Image src={FeedAvatar} alt={'avatar'} fill />
        </div>
        <div>
          <p className={'pb-4 font-medium text-v1-text-primary-500'}>
            책은 나를 조금 더 맛진 세상으로 데려다 줄꺼라 믿어요 📚💫
          </p>
          <div className={'flex justify-between pb-2'}>
            <button type={'button'} className={'flex items-center text-v1-orange-500'}>
              <SmallFlag />
              <span className={'ml-[2px] font-medium'}>ing</span>
              <p className={'ml-[6px] font-medium text-v1-text-primary-600'}>999+</p>
            </button>
            <button type={'button'} className={'flex items-center text-v1-orange-500'}>
              <SmallBadge />
              <span className={'ml-[2px] font-medium'}>done</span>
              <p className={'ml-[6px] font-medium text-v1-text-primary-600'}>999+</p>
            </button>
          </div>
          <div className={'flex items-center justify-between'}>
            <button type={'button'} className={'flex'}>
              <p className={'text-sm text-v1-text-primary-200'}>피드</p>
              <p className={'min-w-[30px] text-center text-sm font-medium text-v1-text-primary-300'}>120</p>
            </button>
            <button type={'button'} className={'flex'}>
              <p className={'text-sm text-v1-text-primary-200'}>팔로워</p>
              <p className={'min-w-[30px] text-center text-sm font-medium text-v1-text-primary-300'}>120</p>
            </button>
            <button type={'button'} className={'flex'}>
              <p className={'text-sm text-v1-text-primary-200'}>팔로잉</p>
              <p className={'min-w-[30px] text-center text-sm font-medium text-v1-text-primary-300'}>120</p>
            </button>
          </div>
        </div>
      </div>
      <div className={'flex gap-2 pt-[30px]'}>
        <button
          onClick={handleFollow}
          type={'button'}
          className={cn(
            'flex-1 rounded-[20px] border border-v1-orange-500 p-1 font-medium leading-7',
            isFollowed ? 'bg-v1-orange-500 text-white' : 'bg-v1-orange-50 text-v1-orange-500',
          )}
        >
          팔로우
        </button>
        <button
          type={'button'}
          className={
            'flex-1 rounded-[20px] border border-v1-text-primary-400 p-1 font-medium leading-7 text-v1-text-primary-400'
          }
        >
          채팅 보내기
        </button>
      </div>
    </div>
  );
};

export default FeedUserProfile;
