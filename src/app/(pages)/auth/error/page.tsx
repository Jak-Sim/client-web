import Link from 'next/link';
import Button from '@/components/button/Button';

export default function Page() {
  return (
    <main className='flex h-full w-full flex-col items-center justify-center gap-12 bg-v1-background px-6'>
      <h2 className='text-xl font-semibold text-v1-text-primary-500'>소셜 로그인에 실패했습니다.</h2>
      <Link href='/sign-in' className='w-full'>
        <Button variant='secondary'>돌아가기</Button>
      </Link>
    </main>
  );
}
