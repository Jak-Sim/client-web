import Link from 'next/link';
import { Code, Plus2, SearchShiny } from '@/assets/images/icons';

export default function BottomNav() {
  return (
    <div className='h-[68px]'>
      <div className='bor fixed bottom-16 z-10 flex h-[68px] w-full max-w-[400px] items-center justify-between rounded-t-3xl bg-white px-2 font-semibold text-v1-text-primary-600 shadow-[0_-10px_16px_0_rgba(0,0,0,0.05)]'>
        <Link href='/challenge/create' className='flex flex-1 items-center justify-center gap-[5px]'>
          <Plus2 />
          <span>새로 만들기</span>
        </Link>
        <div className='h-6 w-px bg-v1-grey-400' />
        <Link href='/feed' className='flex flex-1 items-center justify-center gap-[5px]'>
          <SearchShiny />
          챌린지 탐색
        </Link>
        <div className='h-6 w-px bg-v1-grey-400' />
        <Link href='/challenge/code' className='flex flex-1 items-center justify-center gap-[5px]'>
          <Code />
          코드 참여
        </Link>
      </div>
    </div>
  );
}
