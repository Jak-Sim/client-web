import SocialLogins from './_components/SocialLogins';

const Page = () => {
  return (
    <main className='w-full h-full flex flex-col bg-v1-background'>
      <div className='flex-1 flex flex-col justify-center items-center text-v1-text-primary-500'>
        <h1 className='font-semibold text-[2rem] mb-2'>작심:</h1>
        <h2 className='text-[1.25rem]'>작은 결심이 큰 성취로</h2>
      </div>

      <div className='flex gap-3 items-center px-6 my-8'>
        <div className='h-[1px] w-full bg-v1-grey-400' />
        <div className='text-[0.875rem] shrink-0 text-v1-grey-700'>3초안에 작심하기</div>
        <div className='h-[1px] w-full bg-v1-grey-400' />
      </div>

      <div className='flex flex-col items-center justify-center gap-6 pb-16 mb-16'>
        <SocialLogins />
      </div>
    </main>
  );
};

export default Page;
