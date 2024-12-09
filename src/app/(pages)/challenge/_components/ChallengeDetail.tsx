'use client';

import { useState } from 'react';
import Image from 'next/image';
import { differenceInDays } from 'date-fns';
import { ChevronDown, Fire, Gem, Lightning } from '@/assets/images/icons';
import Chip from '../../../../components/chip/Chip';
import { Challenge } from './ChallengeList';

export default function ChallengeDetail({ challenge }: { challenge: Challenge }) {
  const currentChallengeStreak = differenceInDays(new Date(), new Date(challenge.createdAt)).toString();
  const [rewardOpen, setRewardOpen] = useState(true);
  const [missionOpen, setMissionOpen] = useState(true);
  const [challengerOpen, setChallengerOpen] = useState(true);

  return (
    <div className='flex flex-col gap-5 px-4 py-2 pb-10'>
      <SectionCard>
        <div className='relative w-full pb-[62.5%]'>
          <Image
            src={challenge.backgroundImage}
            alt={challenge.name}
            fill
            className='rounded-t-xl bg-v1-subtext-200 object-cover'
          />
          <div className='absolute right-3 top-3 rounded-xl bg-white px-[6px] py-[1px] text-xs text-v1-text-primary-400'>
            {challenge.isPublic ? '공개' : '비공개'}
          </div>
        </div>
        <div className='flex flex-col gap-5 px-4 py-6 text-center'>
          <div className='text-2xl font-bold'>{challenge.name}</div>
          <div className='flex flex-wrap justify-center gap-2'>
            {[...challenge.tags, ...challenge.tags].map((tag) => (
              <Chip key={tag} tag={tag} onClick={() => {}} prefix='#' />
            ))}
          </div>
          <div className='text-sm text-v1-text-primary-200'>챌린지 기간 : {currentChallengeStreak}일째</div>
        </div>
      </SectionCard>

      <SectionCard>
        <header
          className='flex h-[4.75rem] items-center justify-between px-6'
          onClick={() => setRewardOpen(!rewardOpen)}
        >
          <div className='flex items-center gap-3 text-2xl font-bold'>
            <div className='flex items-center gap-1'>
              <Gem />
              리워드(보상)
            </div>
            <Chip tag='2 개' varient='light-orange' />
          </div>

          <ChevronDown className={`${rewardOpen ? 'rotate-180' : ''} transition-transform duration-300`} />
        </header>

        <div className={`${rewardOpen ? 'h-[100px] overflow-visible' : 'h-0 overflow-hidden'} transition-all duration-300`}>
          카드 내용
        </div>
      </SectionCard>

      <SectionCard>
        <header
          className='flex h-[4.75rem] items-center justify-between px-6'
          onClick={() => setMissionOpen(!missionOpen)}
        >
          <div className='flex items-center gap-3 text-2xl font-bold'>
            <div className='flex items-center gap-1'>
              <Lightning />
              진행중인 미션
            </div>
            <Chip tag='5 개' varient='light-orange' />
          </div>

          <ChevronDown className={`${missionOpen ? 'rotate-180' : ''} transition-transform duration-300`} />
        </header>

        <div className={`${missionOpen ? 'h-[100px] overflow-visible' : 'h-0 overflow-hidden'} transition-all duration-300`}>
          카드 내용
        </div>
      </SectionCard>

      <SectionCard>
        <header
          className='flex h-[4.75rem] items-center justify-between px-6'
          onClick={() => setChallengerOpen(!challengerOpen)}
        >
          <div className='flex items-center gap-3 text-2xl font-bold'>
            <div className='flex items-center gap-1'>
              <Fire />
              챌린저
            </div>
            <Chip tag='2 명 참여 중' varient='light-orange' />
          </div>

          <ChevronDown className={`${challengerOpen ? 'rotate-180' : ''} transition-transform duration-300`} />
        </header>

        <div className={`${challengerOpen ? 'h-[100px] overflow-visible' : 'h-0 overflow-hidden'} transition-all duration-300`}>
          카드 내용
        </div>
      </SectionCard>
    </div>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return <div className='rounded-xl bg-white'>{children}</div>;
}