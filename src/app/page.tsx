import HeaderBackButton from '@/components/layout/HeaderBackButton';
import PageLayout from '@/components/layout/PageLayout';

export default function Home() {
  return (
    <PageLayout header={{ title: '메인페이지', left: <HeaderBackButton /> }} className={'bg-primary'}>
      메인페이지
    </PageLayout>
  );
}
