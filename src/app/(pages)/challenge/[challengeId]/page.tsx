'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Hamburger, Speaker } from '@/assets/images/icons';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import LinkTabs from '@/components/tab/LinkTabs';
import { DummyChallenge } from '../_components/ChallengeList';
import MissionItem from '../_components/MissionItem';
import RewardItem from '../_components/RewardItem';
import dummyMission from '../_mock/dummyMission.json';
import dummyReward from '../_mock/dummyReward.json';
import AddItemButton from './_components/AddItemButton';
import UserChallengeCard from './_components/UserChallengeCard';

const TABS = [
  { type: 'mission-ongoing', label: '미션 중', href: '?tab=mission-ongoing' },
  { type: 'reward-page', label: '보상 페이지', href: '?tab=reward-page' },
  { type: 'mission-complete', label: '미션 완료', href: '?tab=mission-complete' },
];

export default function Page({
  params,
  searchParams,
}: {
  params: { challengeId: string };
  searchParams: { tab: string };
}) {
  const challengeId = params.challengeId;
  const challenge = DummyChallenge;
  const session = useSession();

  // TODO:
  console.log('fetch challenge data with id: ' + challengeId);
  console.log('user have to join challenge: ', session.data?.user);

  const rewards = dummyReward;
  const missions = dummyMission;

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
      <LinkTabs tab={searchParams.tab} tabs={TABS} />

      {searchParams.tab === 'reward-page' && (
        <ul className='flex flex-col gap-4 pt-4'>
          {rewards.map((reward) => (
            <RewardItem key={reward.id} reward={reward} hasFavorite={true} />
          ))}
          <AddItemButton color='blue' onClick={() => {}} />
        </ul>
      )}
      {searchParams.tab === 'mission-ongoing' && (
        <ul className='flex flex-col gap-4 pt-4'>
          {missions.map((mission) => (
            <MissionItem key={mission.id} mission={mission} hasFavorite={true} />
          ))}
          <AddItemButton color='orange' onClick={() => {}} />
        </ul>
      )}
      {searchParams.tab === 'mission-complete' && (
        <ul className='flex flex-col gap-4 pt-4'>
          {missions.map((mission) => (
            <MissionItem key={mission.id} mission={mission} hasFavorite={true} />
          ))}
        </ul>
      )}
    </PageLayout>
  );
}