import PageLayout from '@/components/layout/PageLayout';
import HeaderBackButton from '@/components/layout/HeaderBackButton';

const Page = () => {
  return (
    <PageLayout
      className={'bg-[#f2f2f7] p-3 pt-2 flex flex-col'}
      header={{
        title: '대화 상대 선택',
        left: <HeaderBackButton />,
        right: <button className={'text-primary'}>완료</button>,
      }}
    >
      <div className={'flex-1 flex flex-col mt-2'}>
        <div className={'flex-1 flex-col px-2 bg-white rounded-xl'}>대화상대 검색</div>
      </div>
    </PageLayout>
  );
};

export default Page;
