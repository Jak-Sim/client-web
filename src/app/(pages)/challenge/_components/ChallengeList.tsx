'use client';

import Image from 'next/image';
import EmptyChallengeImg from '@/assets/images/placeholder/face-sad.png';
import { CustomSession } from '@/lib/next-auth/auth';
import { type ChallengeListType } from '@/models/challenge/Challenge';
import ChallengeCard from './ChallengeCard';

export default function ChallengeList({
  session,
  challengeList,
}: {
  session: CustomSession;
  challengeList: ChallengeListType;
}) {
  if (challengeList.length === 0) {
    return <EmptyChallengeList />;
  }

  return (
    <ul className='flex flex-col gap-3 pb-4'>
      {challengeList.map((challenge) => (
        <ChallengeCard key={challenge.challengeId} challenge={challenge} userId={session?.user.userUniqueId} />
      ))}
    </ul>
  );
}

function EmptyChallengeList() {
  return (
    <li className='flex h-full flex-col items-center justify-center gap-4 pb-16'>
      <Image src={EmptyChallengeImg} alt='empty-challenge' className='h-[54px] w-[54px]' />
      <p className='text-semibold text-v1-text-primary-300'>아직 진행중인 챌린지가 없어요!</p>
    </li>
  );
}