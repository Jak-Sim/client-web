import PageLayout from '@/components/layout/PageLayout';
import HeaderBackButton from '@/components/layout/HeaderBackButton';

const Page = () => {
  return <PageLayout header={{ title: '피드', left: <HeaderBackButton /> }}>피드</PageLayout>;
};

export default Page;
