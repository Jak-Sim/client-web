'use client';

import Image from 'next/image';
import { differenceInDays } from 'date-fns';
import { Fire, Gem, Lightning } from '@/assets/images/icons';
import Accodion from '@/components/accodion/Accodion';
import Chip from '@/components/chip/Chip';
import { type ChallengeType } from '@/models/challenge/Challenge';
import dummyMission from '../_mock/dummyMission.json';
import dummyReward from '../_mock/dummyReward.json';
import MissionList from './MissionList';
import ParticipantList from './ParticipantList';
import RewardList from './RewardList';

export default function ChallengeDetail({ challenge }: { challenge: ChallengeType }) {
  const currentChallengeStreak = differenceInDays(new Date(), new Date(challenge.createdAt)).toString();

  // TODO: API 연동 필요한 값: rewards, missions
  const rewards = dummyReward;
  const missions = dummyMission;

  return (
    <div className='flex flex-col gap-5 px-6 py-2 pb-10'>
      <SectionCard>
        <div className='relative w-full rounded-t-xl bg-v1-subtext-200 pb-[62.5%]'>
          {challenge.backgroundImage && (
            <Image
              src={challenge.backgroundImage}
              alt={challenge.name}
              fill
              sizes='300px'
              className='rounded-t-xl object-cover'
              priority
            />
          )}
          <div className='absolute right-3 top-3 rounded-xl bg-white px-[6px] py-[1px] text-xs text-v1-text-primary-400'>
            {challenge.public ? '공개' : '비공개'}
          </div>
        </div>
        <div className='flex flex-col gap-5 px-4 py-6 text-center'>
          <div className='text-2xl font-bold'>{challenge.name}</div>
          <div className='flex flex-wrap justify-center gap-2'>
            {challenge.tags.map((tag) => (
              <Chip key={tag} tag={tag} onClick={() => {}} prefix='#' />
            ))}
          </div>
          <div className='text-sm text-v1-text-primary-200'>챌린지 기간 : {currentChallengeStreak}일째</div>
        </div>
      </SectionCard>

      <SectionCard>
        <Accodion defaultOpen={true}>
          <Accodion.Trigger className='px-6'>
            <div className='flex h-[4.75rem] items-center justify-between'>
              <div className='flex items-center gap-3 text-xl font-bold'>
                <div className='flex items-center gap-1'>
                  <Gem />
                  리워드(보상)
                </div>
                {rewards.length > 0 && <Chip tag={`${rewards.length} 개`} varient='light-orange' />}
              </div>
            </div>
          </Accodion.Trigger>

          <Accodion.Content>
            <RewardList rewards={rewards} />
          </Accodion.Content>
        </Accodion>
      </SectionCard>

      <SectionCard>
        <Accodion defaultOpen={true}>
          <Accodion.Trigger className='px-6'>
            <div className='flex h-[4.75rem] items-center justify-between'>
              <div className='flex flex-wrap items-center gap-3 text-xl font-bold'>
                <div className='flex items-center gap-1'>
                  <Lightning />
                  진행중인 미션
                </div>
                <Chip tag={`${missions.length} 개`} varient='light-orange' />
              </div>
            </div>
          </Accodion.Trigger>

          <Accodion.Content>
            <MissionList missions={missions} />
          </Accodion.Content>
        </Accodion>
      </SectionCard>

      <SectionCard>
        <Accodion defaultOpen={true}>
          <Accodion.Trigger className='px-6'>
            <div className='flex h-[4.75rem] items-center justify-between'>
              <div className='flex flex-wrap items-center gap-3 text-xl font-bold'>
                <div className='flex items-center gap-1'>
                  <Fire />
                  챌린저
                </div>
                <Chip tag={`${challenge.currentParticipants} 명 참여 중`} varient='light-orange' />
              </div>
            </div>
          </Accodion.Trigger>

          <Accodion.Content>
            <ParticipantList />
          </Accodion.Content>
        </Accodion>
      </SectionCard>
    </div>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return <div className='rounded-xl bg-white'>{children}</div>;
}