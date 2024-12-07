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
      <ChallengeList />
      <BottomNav />
    </PageLayout>
  );
};

export default Page;