'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Hamburger, Speaker } from '@/assets/images/icons';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import { DummyChallenge } from '../_components/ChallengeList';
import UserChallengeCard from './_components/UserChallengeCard';

const Page = ({ params }: { params: { challengeId: string } }) => {
  const challengeId = params.challengeId;
  const challenge = DummyChallenge;
  const session = useSession();

  // TODO:
  console.log('fetch challenge data with id: ' + challengeId);
  console.log('user have to join challenge: ', session.data?.user);

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
      className='bg-v1-background px-6'
    >
      <UserChallengeCard challenge={challenge} />
    </PageLayout>
  );
};

export default Page;