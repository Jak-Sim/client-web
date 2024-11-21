import FeedContents from '@/app/(pages)/feed/[userId]/_components/FeedContents';
import FeedUserProfile from '@/app/(pages)/feed/[userId]/_components/FeedUserProfile';
import Dots from '@/assets/images/icons/Dots.svg';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';

const Page = () => {
  return (
    <PageLayout
      className={'bg-v1-background'}
      header={
        <Header className={'border-none bg-v1-background'}>
          <Header.Item>
            <Header.BackButton />
            <div className={'text-xl'}>
              <span className={'font-semibold text-v1-text-primary-700'}>김작심</span>{' '}
              <span className={'font-normal text-v1-text-primary-500'}>님의 피드</span>
            </div>
          </Header.Item>
          <Header.Item>
            <Header.Icon Icon={Dots} />
          </Header.Item>
        </Header>
      }
    >
      <FeedUserProfile />
      <FeedContents />
    </PageLayout>
  );
};

export default Page;
