import Image from 'next/image';
import Link from 'next/link';
import successImage from '@/assets/images/logos/challenge-success.png';
import Button from '@/components/button/Button';

const Page = ({ searchParams }: { searchParams: { challengeId: string } }) => {
  const challengeId = searchParams.challengeId;

  return (
    <div className='flex h-full flex-1 flex-col justify-between bg-v1-background p-6'>
      <div className='flex flex-1 flex-col items-center justify-center text-center'>
        <Image src={successImage} alt='챌린지 참여 완료' width={100} height={100} className='mb-2' />
        <h1 className='py-4 text-[28px] font-semibold text-v1-text-primary-700'>챌린지 참여 완료!</h1>
        <p className='text-xl leading-[24px] text-v1-text-primary-400'>
          챌린지의 목표와 보상을
          <br />
          확인해 보세요
        </p>
      </div>
      {challengeId && (
        <Link href={`/challenge/${challengeId}`}>
          <Button variant='secondary'>확인하러 가기</Button>
        </Link>
      )}
    </div>
  );
};

export default Page;
