'use client';

import Image from 'next/image';
import EmptyChallengeImg from '@/assets/images/placeholder/face-sad.png';
import { CustomSession } from '@/lib/next-auth/auth';
import ChallengeCard from './ChallengeCard';

export interface Challenge {
  challengeId: number;
  name: string;
  backgroundImage: string;
  isPublic: boolean;
  currentParticipants: number;
  maxParticipant: number;
  minParticipant: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  creatorUserUuid: string;
}

export const DummyChallenge: Challenge = {
  challengeId: 999,
  name: '챌린지 이름입니다',
  backgroundImage: '',
  isPublic: true,
  currentParticipants: 3,
  maxParticipant: 10,
  minParticipant: 3,
  tags: ['영어', '수학', '교과서위주'],
  createdAt: '2024-11-25T10:19:30',
  updatedAt: '2024-11-25T10:19:30',
  creatorUserUuid: 'useruuid',
};

function getDummyChallengeList(): Challenge[] {
  return new Array(5).fill(null).map((_, index) => ({
    ...DummyChallenge,
    challengeId: index,
    currentParticipants: index % 2 === 0 ? 3 : 10,
  }));
}

export default function ChallengeList({ session }: { session: CustomSession }) {
  const challengeList = getDummyChallengeList();

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
    <div className='flex h-full flex-col items-center justify-center gap-4 pb-16'>
      <Image src={EmptyChallengeImg} alt='empty-challenge' className='h-[54px] w-[54px]' />
      <p className='text-semibold text-v1-text-primary-300'>아직 진행중인 챌린지가 없어요!</p>
    </div>
  );
}