'use client';

import LeftChevron from '@/assets/images/icons/chevron.svg';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

const HeaderBackButton = () => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <button onClick={handleBack}>
      <LeftChevron />
    </button>
  );
};

export default HeaderBackButton;
