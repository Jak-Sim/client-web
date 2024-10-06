import PageLayout from '@/components/layout/PageLayout';
import HeaderBackButton from '@/components/layout/HeaderBackButton';

const Page = () => {
  return <PageLayout header={{ title: '채팅', left: <HeaderBackButton /> }}>채팅</PageLayout>;
};

export default Page;
