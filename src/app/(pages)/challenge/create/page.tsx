'use client';

import Link from 'next/link';
import { X } from '@/assets/images/icons';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import CreateChallengeForm from './_components/CreateChallengeForm';
import HeaderTempSaveButton from './_components/TempSaveChallengeButton';
import useTempSaveChallenge from './_hooks/useTempSaveChallenge';

const Page = () => {
  const { challenge, saveTempChallenge } = useTempSaveChallenge();

  return (
    <PageLayout
      header={
        <Header className='border-none'>
          <Link href='/challenge' className='flex'>
            <Header.Icon Icon={X} />
          </Link>
          <Header.Center>챌린지 생성하기</Header.Center>
          <HeaderTempSaveButton saveTempFn={saveTempChallenge} tempSaveExists={!!challenge} />
        </Header>
      }
      className='animate-fade-in h-full bg-v1-background'
    >
      <CreateChallengeForm />
    </PageLayout>
  );
};

export default Page;
