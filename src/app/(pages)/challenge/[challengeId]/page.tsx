'use client';

import Link from 'next/link';
import { Hamburger, Speaker } from '@/assets/images/icons';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import { DummyChallenge } from '../_components/ChallengeList';

const Page = ({ params }: { params: { challengeId: string } }) => {
  const challengeId = params.challengeId;
  const challenge = DummyChallenge;

  // TODO:
  console.log('fetch challenge data with id: ' + challengeId);

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
      className='bg-v1-background'
    >
      챌린지 현황
    </PageLayout>
  );
};

export default Page;