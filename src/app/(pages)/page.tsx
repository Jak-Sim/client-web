import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';

export default function Home() {
  return (
    <PageLayout
      className={'bg-primary'}
      header={
        <Header>
          <Header.Title>메인페이지</Header.Title>
        </Header>
      }
    >
      메인페이지
    </PageLayout>
  );
}
