import { useState } from 'react';
import { Check, Gem, Heart, HeartFill } from '@/assets/images/icons';
import Chip from '@/components/chip/Chip';
import type { Reward } from '@/types/challenge';

export default function RewardItem({
  reward,
  className,
  hasFavorite,
  onFavorite,
}: {
  reward: Reward;
  className?: string;
  hasFavorite?: boolean;
  onFavorite?: () => void;
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite?.();
  };

  return (
    <li className={`text-v1-primary-600 gap-4 rounded-2xl bg-white px-6 py-4 text-sm ${className}`}>
      <div className='flex'>
        <div className='flex-1'>
          <div className='mb-2 flex flex-wrap items-center gap-2 font-semibold'>
            {reward.name}
            <Chip tag={`${reward.remain}개 남음`} varient='red' fontSize='xs' />
            {reward.needConfirm ? '' : <Chip tag='바로 수령 가능' varient='orange' fontSize='xs' />}
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-[3px]'>
              <Gem />
              {reward.point} 포인트
            </div>
            <div className='flex items-center gap-[2px]'>
              {reward.needConfirm ? (
                <>
                  <Check color='#00B751' />
                  확인 후 수령 가능
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        {hasFavorite && (
          <button className='-mr-1 flex items-start' type='button' onClick={handleFavorite}>
            {isFavorite ? <HeartFill /> : <Heart />}
          </button>
        )}
      </div>
    </li>
  );
}
