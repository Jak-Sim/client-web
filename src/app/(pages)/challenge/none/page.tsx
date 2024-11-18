import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import ChallengeLinkButtonBox from './_components/ChallengeLinkButtonBox';

const Page = () => {
  return (
    <PageLayout
      header={
        <Header className='border-none bg-v1-background'>
          <Header.BoldText bold='챌린지' />
        </Header>
      }
      className='bg-v1-background'
    >
      <div className='flex h-full flex-col justify-between px-6 pb-16'>
        <div className='flex flex-1 flex-col items-center justify-center'>
          <p className='break-keep text-center text-2xl text-v1-text-primary-300'>아직 시작한 챌린지가 없어요</p>
        </div>
        <ChallengeLinkButtonBox />
      </div>
    </PageLayout>
  );
};

export default Page;
