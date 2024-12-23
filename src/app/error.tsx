'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SadFaceImg from '@/assets/images/placeholder/face-sad.png';
import Button from '@/components/button/Button';
import { formatErrorMessage } from '@/utils/formatErrorMessage';

export default function Error({ error }: { error: Error }) {
  const router = useRouter();
  const message = formatErrorMessage(error);

  return (
    <main className='flex h-full w-full flex-col items-center justify-center gap-8 bg-v1-background px-6'>
      <Image src={SadFaceImg} alt='error' width={100} height={100} />
      <h2 className='text-xl font-semibold text-v1-text-primary-500'>오류가 발생했습니다</h2>
      {message && (
        <p className='text-center text-sm text-v1-text-primary-200'>
          {message}
        </p>
      )}
      <Button variant='secondary' onClick={() => router.back()}>
        돌아가기
      </Button>
    </main>
  );
}