import MissionDate from '@/app/(pages)/challenge/[challengeId]/mission/_components/MissionDate';
import Repeat from '@/app/(pages)/challenge/[challengeId]/mission/_components/Repeat';
import HeaderBackButton from '@/components/layout/HeaderBackButton';
import PageLayout from '@/components/layout/PageLayout';

const Page = () => {
  return (
    <PageLayout header={{ title: '새 미션 등록하기', left: <HeaderBackButton /> }}>
      <div className={'flex h-full flex-1 flex-col p-5 pt-8'}>
        <div className={'flex flex-col gap-3 pb-8'}>
          <input
            className={'rounded-[20px] border-[1px] border-[#907D78] px-4 py-3 placeholder:text-[#907d78]'}
            type='text'
            placeholder={'미션 이름을 정해주세요'}
          />
          <textarea
            name=''
            id=''
            cols={30}
            rows={10}
            className={'resize-none rounded-[20px] border-[1px] border-[#907D78] px-4 py-3 placeholder:text-[#907d78]'}
            placeholder={'미션의 목표와 소개를 입력해 주세요.'}
          ></textarea>
        </div>
        <div className={'pb-8'}>
          <div className={'pb-3 font-bold text-v1-text-primary-600'}>미션 기간</div>
          <div className={'flex items-center'}>
            <MissionDate />
            <MissionDate />
          </div>
        </div>
        <div className={'pb-8'}>
          <div className={'pb-3 font-bold text-v1-text-primary-600'}>보상 포인트</div>
          <input
            className={'w-full rounded-[20px] border-[1px] border-[#907D78] px-4 py-3 placeholder:text-[#907d78]'}
            type='text'
            placeholder={'최소 100 ~ 최대 50000 포인트'}
          />
        </div>
        <div className={'pb-8'}>
          <Repeat />
        </div>
        <div className={'pb-8'}>
          <button className={'w-full rounded-[50px] bg-[#FF6332] p-4 font-bold text-white'} type={'submit'}>
            미션 생성 완료
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Page;
