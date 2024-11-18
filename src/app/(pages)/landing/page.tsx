import Image from 'next/image';
import logoLanding from '@/assets/images/logos/landing.png';
import LoginCheck from './_components/LoginCheck';

export default function Page() {
  return (
    <>
      <main className='flex h-full w-full flex-col bg-gradient-to-br from-[#FF825B] via-[#FA715E] to-[#F56060]'>
        <div className='flex flex-1 flex-col items-center justify-center'>
          <Image src={logoLanding} alt='logo' className='w-[7.5rem]' priority />
        </div>
      </main>
      <LoginCheck />
    </>
  );
}
