import HeaderBackButton from '@/components/layout/HeaderBackButton';
import PageLayout from '@/components/layout/PageLayout';

const Page = () => {
  return <PageLayout header={{ title: '챌린지', left: <HeaderBackButton /> }}>챌린지</PageLayout>;
};

export default Page;
