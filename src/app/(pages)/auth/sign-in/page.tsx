import SocialLogins from './_components/SocialLogins';

const Page = () => {
  return (
    <main className='flex h-full w-full flex-col bg-v1-background'>
      <div className='flex flex-1 flex-col items-center justify-center text-v1-text-primary-500'>
        <h1 className='mb-2 text-[2rem] font-semibold'>작심:</h1>
        <h2 className='text-[1.25rem]'>작은 결심이 큰 성취로</h2>
      </div>

      <div className='my-8 flex items-center gap-3 px-6'>
        <div className='h-[1px] w-full bg-v1-grey-400' />
        <div className='shrink-0 text-[0.875rem] text-v1-grey-700'>3초안에 작심하기</div>
        <div className='h-[1px] w-full bg-v1-grey-400' />
      </div>

      <div className='mb-16 flex flex-col items-center justify-center gap-6 pb-16'>
        <SocialLogins />
      </div>
    </main>
  );
};

export default Page;
