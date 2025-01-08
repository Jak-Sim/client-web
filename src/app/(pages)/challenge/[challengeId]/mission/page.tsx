import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';

const Page = () => {
  return (
    <PageLayout
      header={
        <Header>
          <Header.Item>
            <Header.BackButton />
          </Header.Item>
          <Header.Title>미션 페이지</Header.Title>
        </Header>
      }
    >
      미션 페이지
    </PageLayout>
  );
};

export default Page;
