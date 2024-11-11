import Image from 'next/image';
import logoLanding from '@/assets/images/logos/landing.png';
import LoginCheck from './_components/LoginCheck';

const Page = () => {
  return (
    <>
      <main className='w-full h-full flex flex-col bg-gradient-to-br from-[#FF825B] via-[#FA715E] to-[#F56060]'>
        <div className='flex-1 flex flex-col justify-center items-center'>
          <Image src={logoLanding} alt='logo' className='w-[7.5rem]' priority />
        </div>
      </main>
      <LoginCheck />
    </>
  );
};

export default Page;
