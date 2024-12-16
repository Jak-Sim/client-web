'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Hamburger, Speaker } from '@/assets/images/icons';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import { DummyChallenge } from '../_components/ChallengeList';
import RewardItem from '../_components/RewardItem';
import dummyMission from '../_mock/dummyMission.json';
import dummyReward from '../_mock/dummyReward.json';
import AddItemButton from './_components/AddItemButton';
import UserChallengeCard from './_components/UserChallengeCard';

export default function Page({ params }: { params: { challengeId: string } }) {
  const challengeId = params.challengeId;
  const challenge = DummyChallenge;
  const session = useSession();

  // TODO:
  console.log('fetch challenge data with id: ' + challengeId);
  console.log('user have to join challenge: ', session.data?.user);

  const rewards = dummyReward;
  
  return (
    <PageLayout
      header={
        <Header className='border-none bg-v1-background'>
          <Header.BackButton tail={true} />
          <Header.Center>{challenge.name}</Header.Center>
          <div className='flex gap-3'>
            <Link href={`/chat/${challengeId}`}>
              <Speaker />
            </Link>
            <Link href={`/challenge/${challengeId}/detail`}>
              <Hamburger />
            </Link>
          </div>
        </Header>
      }
      className='bg-v1-background px-6 pt-2'
    >
      <UserChallengeCard challenge={challenge} />
      <div className='flex flex-col gap-4 pt-3'>
        {rewards.map((reward) => (
          <RewardItem key={reward.id} reward={reward} hasFavorite={true} />
        ))}
        <AddItemButton color='blue' onClick={() => {}} />
      </div>
    </PageLayout>
  );
}