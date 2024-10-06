'use client';

import leftChevron from '@/assets/images/icons/chevron.svg';
import Image from 'next/image';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

const HeaderBackButton = () => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <button onClick={handleBack}>
      <Image src={leftChevron} alt={'back'} />
    </button>
  );
};

export default HeaderBackButton;
