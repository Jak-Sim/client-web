import HeaderBackButton from '@/components/layout/HeaderBackButton';
import PageLayout from '@/components/layout/PageLayout';

const Page = () => {
  return (
    <PageLayout
      className={'flex flex-col bg-[#f2f2f7] p-3 pt-2'}
      header={{
        title: '대화 상대 선택',
        left: <HeaderBackButton />,
        right: <button className={'text-primary'}>완료</button>,
      }}
    >
      <div className={'mt-2 flex flex-1 flex-col'}>
        <div className={'flex-1 flex-col rounded-xl bg-white px-2'}>대화상대 검색</div>
      </div>
    </PageLayout>
  );
};

export default Page;
