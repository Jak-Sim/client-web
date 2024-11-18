import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';

const Page = () => {
  return (
    <PageLayout
      className={'flex flex-col bg-[#f2f2f7] p-3 pt-2'}
      header={
        <Header>
          <Header.Item>
            <Header.BackButton />
          </Header.Item>
          <Header.Title>대화 상대 검색</Header.Title>
        </Header>
      }
    >
      <div className={'mt-2 flex flex-1 flex-col'}>
        <div className={'flex-1 flex-col rounded-xl bg-white px-2'}>대화상대 검색</div>
      </div>
    </PageLayout>
  );
};

export default Page;
