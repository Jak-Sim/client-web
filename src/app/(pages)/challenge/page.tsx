import { getServerSession } from 'next-auth';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import { CustomSession } from '@/lib/next-auth/auth';
import { Challenge } from '@/models/challenge/Challenge';
import BottomNav from './_components/BottomNav';
import ChallengeList from './_components/ChallengeList';

const Page = async ({ searchParams }: { searchParams: { page: string } }) => {
  const session = await getServerSession();

  if (!session) {
    // TODO: 로그인 페이지로 리다이렉트
  }

  const notNullSession = session as CustomSession;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const challengeList = await Challenge.getChallengeList(page);

  return (
    <PageLayout
      header={
        <Header className='border-none'>
          <Header.Item>
            <Header.BoldText bold={'작심'} text={'님의 챌린지'} />
          </Header.Item>
        </Header>
      }
    >
      <div className='flex h-full flex-col'>
        <div className='my-2 text-center text-xs text-v1-text-primary-400'>진행 중인 챌린지</div>
        <div className='flex-1 px-6'>
          <ChallengeList session={notNullSession} challengeList={challengeList} />
        </div>
        <BottomNav />
      </div>
    </PageLayout>
  );
};

export default Page;