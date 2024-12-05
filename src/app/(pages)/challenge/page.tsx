import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import BottomNav from './_components/BottomNav';
import ChallengeList from './_components/ChallengeList';

const Page = () => {
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
      <div className='h-full flex flex-col'>
        <div className='text-xs text-center text-v1-text-primary-400 my-2'>진행 중인 챌린지</div>
        <div className='flex-1 px-6'>
          <ChallengeList />
        </div>
        <BottomNav />
      </div>
    </PageLayout>
  );
};

export default Page;