import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import CodeForm from './_components/CodeForm';

const Page = () => {
  return (
    <PageLayout
      header={
        <Header className='border-none bg-v1-background'>
          <Header.BackButton />
          <Header.Center>코드 찾아보기</Header.Center>
        </Header>
      }
      className='bg-v1-background'
    >
      <CodeForm />
    </PageLayout>
  );
};

export default Page;
