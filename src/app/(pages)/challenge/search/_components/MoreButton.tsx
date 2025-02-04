'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { ChevronRight } from '@/assets/images/icons';
import { TabType } from './SearchResults';

export default function MoreButton({ tab }: { tab: TabType }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.push(`?${params.toString()}`);
  };

  return (
    <button onClick={handleClick} className='flex items-center text-sm text-v1-text-primary-300'>
      더보기
      <ChevronRight className='-ml-[3px] scale-75 opacity-50' />
    </button>
  );
}
