'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { NoTailArrow, TailArrow } from '@/assets/images/icons';
import { cn } from '@/lib/shadcn/utils';

const HeaderBackButton = ({
  onClick,
  className,
  tail = false,
}: {
  onClick?: () => void;
  tail?: boolean;
  className?: string;
}) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <button type={'button'} onClick={onClick || handleBack}>
      {tail ? (
        <TailArrow className={cn('h-6 w-6 stroke-v1-text-primary-600 stroke-2', className)} />
      ) : (
        <NoTailArrow className={cn('h-6 w-6 stroke-v1-text-primary-600 stroke-2', className)} />
      )}
    </button>
  );
};

export default HeaderBackButton;
