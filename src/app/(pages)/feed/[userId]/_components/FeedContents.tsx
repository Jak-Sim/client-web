'use client';

import { useState } from 'react';
import Image from 'next/image';
import FeedAvatar from '@/assets/images/placeholder/FeedAvatar.png';
import { cn } from '@/lib/shadcn/utils';

type Tab = 'feed' | 'challenge';
const FeedContents = () => {
  const [tab, setTab] = useState<Tab>('feed');
  const handleTab = (tab: Tab) => {
    setTab(tab);
  };
  return (
    <div>
      <ul className={'flex px-8 pt-5'}>
        <li>
          <button
            onClick={() => handleTab('feed')}
            type={'button'}
            className={cn(
              'w-[72px] p-2 text-xl font-medium',
              tab === 'feed' ? 'text-v1-text-primary-500' : 'text-v1-text-primary-200',
            )}
          >
            피드
          </button>
        </li>
        <li>
          <button
            onClick={() => handleTab('challenge')}
            type={'button'}
            className={cn(
              'w-[72px] p-2 text-xl font-medium',
              tab === 'challenge' ? 'text-v1-text-primary-500' : 'text-v1-text-primary-200',
            )}
          >
            챌린지
          </button>
        </li>
      </ul>
      {tab === 'feed' && (
        <ul className={'grid grid-cols-3 gap-[1px]'}>
          <li className={'relative w-full bg-black pb-[100%]'}>
            <Image src={FeedAvatar} alt={'avatar'} fill />
          </li>
          <li className={'relative w-full bg-black pb-[100%]'}></li>
          <li className={'relative w-full bg-black pb-[100%]'}></li>
          <li className={'relative w-full bg-black pb-[100%]'}></li>
          <li className={'relative w-full bg-black pb-[100%]'}></li>
          <li className={'relative w-full bg-black pb-[100%]'}></li>
          <li className={'relative w-full bg-black pb-[100%]'}></li>
          <li className={'relative w-full bg-black pb-[100%]'}></li>
          <li className={'relative w-full bg-black pb-[100%]'}></li>
          <li className={'relative w-full bg-black pb-[100%]'}></li>
        </ul>
      )}
      {tab === 'challenge' && (
        <ul className={'grid grid-cols-1 gap-4 px-6 text-white'}>
          <li>
            <div className={'rounded-[20px] bg-black px-6 py-5'}>
              <div>
                <h3 className={'text-xl font-bold'}>운동 습관 만들기</h3>
                <p className={'font-medium'}>
                  목표 달성까지 <span className={'text-v1-blue-500'}>800포인트</span> 챌린지
                </p>
              </div>
              <div className={'mt-[44px]'}>
                <ul className={'flex items-center'}>
                  <li className={'mr-[-16px] h-8 w-8 rounded-full bg-green-400'}></li>
                  <li className={'mr-[-16px] h-8 w-8 rounded-full bg-yellow-400'}></li>
                  <li className={'h-8 w-8 rounded-full bg-red-500'}></li>
                  <li className={'ml-[6px] text-sm font-medium tracking-tighter text-white'}>+5</li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <div className={'rounded-[20px] bg-black px-6 py-5'}>
              <div>
                <h3 className={'text-xl font-bold'}>물 마시기 도전</h3>
                <p className={'font-medium'}>
                  목표 달성까지 <span className={'text-v1-blue-500'}>500포인트</span> 챌린지
                </p>
              </div>
              <div className={'mt-[44px]'}>
                <ul className={'flex items-center'}>
                  <li className={'mr-[-16px] h-8 w-8 rounded-full bg-pink-300'}></li>
                  <li className={'mr-[-16px] h-8 w-8 rounded-full bg-orange-300'}></li>
                  <li className={'h-8 w-8 rounded-full bg-purple-500'}></li>
                  <li className={'ml-[6px] text-sm font-medium tracking-tighter text-white'}>+12</li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <div className={'rounded-[20px] bg-black px-6 py-5'}>
              <div>
                <h3 className={'text-xl font-bold'}>저녁 산책하기</h3>
                <p className={'font-medium'}>
                  목표 달성까지 <span className={'text-v1-blue-500'}>300포인트</span> 챌린지
                </p>
              </div>
              <div className={'mt-[44px]'}>
                <ul className={'flex items-center'}>
                  <li className={'mr-[-16px] h-8 w-8 rounded-full bg-cyan-500'}></li>
                  <li className={'mr-[-16px] h-8 w-8 rounded-full bg-indigo-500'}></li>
                  <li className={'h-8 w-8 rounded-full bg-teal-500'}></li>
                  <li className={'ml-[6px] text-sm font-medium tracking-tighter text-white'}>+8</li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <div className={'rounded-[20px] bg-black px-6 py-5'}>
              <div>
                <h3 className={'text-xl font-bold'}>아침 일찍 일어나기</h3>
                <p className={'font-medium'}>
                  목표 달성까지 <span className={'text-v1-blue-500'}>100포인트</span> 챌린지
                </p>
              </div>
              <div className={'mt-[44px]'}>
                <ul className={'flex items-center'}>
                  <li className={'mr-[-16px] h-8 w-8 rounded-full bg-gray-400'}></li>
                  <li className={'mr-[-16px] h-8 w-8 rounded-full bg-lime-400'}></li>
                  <li className={'h-8 w-8 rounded-full bg-pink-400'}></li>
                  <li className={'ml-[6px] text-sm font-medium tracking-tighter text-white'}>+3</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default FeedContents;
