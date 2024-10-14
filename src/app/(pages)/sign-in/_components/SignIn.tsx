import SocialLogins from './SocialLogins';

export default function Login() {
  return (
    <main className='bg-background-dark w-full h-full flex flex-col'>
      <div className='bg-gradient-to-b from-secondary to-primary h-[70%] rounded-b-[5rem] flex flex-col'>
        <div className='flex-1 flex justify-center items-center text-[3.75rem] text-center font-nimbus'>JAK-SIM.</div>
        <div className='mb-28'>
          <p className='text-center text-[1.25rem] font-black'>작심:</p>
          <p className='text-center text-[1.25rem] font-black'>작은 결심이 큰 성취로</p>
        </div>
      </div>

      <div className='flex-1 flex flex-col items-center gap-6 pt-10 pb-10'>
        <p className='text-center text-[1.25rem] font-semibold text-white'>3초만에 작심하기</p>
        <SocialLogins />
      </div>
    </main>
  );
}
