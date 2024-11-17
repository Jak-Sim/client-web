import HeaderBackButton from '@/components/layout/HeaderBackButton';
import PageLayout from '@/components/layout/PageLayout';

const Page = () => {
  return <PageLayout header={{ title: '마이페이지', left: <HeaderBackButton /> }}>마이페이지</PageLayout>;
};

export default Page;
