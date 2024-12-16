import { useState } from 'react';
import { CalendarCheck, Clock, Coins, Heart, HeartFill } from '@/assets/images/icons';
import { Mission } from '@/types/challenge';

export default function MissionItem({
  mission,
  className,
  hasFavorite,
  onFavorite,
}: {
  mission: Mission;
  className?: string;
  hasFavorite?: boolean;
  onFavorite?: () => void;
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite?.();
  };

  let days = mission.day.join('');
  if (days === '토일') {
    days = '주말';
  }

  return (
    <li className={`text-v1-primary-600 gap-4 rounded-2xl bg-white px-6 py-4 text-sm ${className}`}>
      <div className='flex'>
        <div className='flex-1'>
          <div className='mb-3 flex flex-wrap items-center gap-2 font-semibold'>{mission.name}</div>
          <div className='flex items-center gap-2 text-v1-text-primary-300'>
            <div className='flex items-center gap-[3px]'>
              <Coins />
              {mission.reward.point} 포인트
            </div>
            {mission.day && (
              <div className='flex items-center gap-[2px]'>
                <CalendarCheck />
                {days}
              </div>
            )}
            <div className='flex items-center gap-[2px]'>
              {mission.time ? (
                <>
                  <Clock />
                  {mission.time.start}~{mission.time.end}
                </>
              ) : (
                <div className='flex items-center gap-[2px]'>
                  <Clock />
                  하루종일
                </div>
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
