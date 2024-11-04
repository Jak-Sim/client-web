import Image from 'next/image';
import logoLanding from '@/assets/images/logos/landing.png';
import SocialLogins from './_components/SocialLogins';

const Page = () => {
  return (
    <main className='w-full h-full flex flex-col bg-gradient-to-br from-[#FF825B] via-[#FA715E] to-[#F56060]'>
      <div className='flex-1 flex flex-col justify-center items-center'>
        <Image src={logoLanding} alt='logo' className='w-[7.5rem]' />
      </div>

      <div className='flex flex-col items-center justify-center gap-6 pb-16'>
        <SocialLogins />
      </div>
    </main>
  );
};

export default Page;
