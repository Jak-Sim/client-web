import Link from 'next/link';
import { Hamburger, Speaker } from '@/assets/images/icons';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import LinkTabs from '@/components/tab/LinkTabs';
import { Challenge } from '@/models/challenge/Challenge';
import dummyMission from '../_mock/dummyMission.json';
import dummyReward from '../_mock/dummyReward.json';
import ChallengeContents from './_components/ChallengeContents';
import UserChallengeCard from './_components/UserChallengeCard';

const TABS = [
  { type: 'mission-ongoing', label: '미션 중', href: '?tab=mission-ongoing' },
  { type: 'reward-page', label: '보상 페이지', href: '?tab=reward-page' },
  { type: 'mission-complete', label: '미션 완료', href: '?tab=mission-complete' },
];
export type TabType = (typeof TABS)[number]['type'];

export default async function Page({
  params,
  searchParams,
}: {
  params: { challengeId: string };
  searchParams: { tab: string };
}) {
  const challengeId = params.challengeId;

  const challenge = await Challenge.getChallenge(parseInt(challengeId));
  const rewards = dummyReward;
  const missions = dummyMission;
  const tab = searchParams.tab || 'mission-ongoing';

  return (
    <PageLayout
      header={
        <Header className='border-none bg-v1-background'>
          <Header.BackButton tail={true} />
          <Header.Center>{challenge?.name}</Header.Center>
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
      <LinkTabs tab={tab} tabs={TABS} />
      <ChallengeContents challengeId={challengeId} tab={tab} rewards={rewards} missions={missions} />
    </PageLayout>
  );
}