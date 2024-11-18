'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Left from '@/assets/images/icons/Left.svg';

const HeaderBackButton = ({ onClick }: { onClick?: () => void }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <button type={'button'} onClick={onClick || handleBack}>
      <Left className={'h-6 w-6'} />
    </button>
  );
};

export default HeaderBackButton;
