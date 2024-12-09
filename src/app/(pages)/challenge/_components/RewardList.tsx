import { Check, Gem } from '@/assets/images/icons';
import Chip from '@/components/chip/Chip';
import { Reward } from './ChallengeDetail';

export default function RewardList({ rewards }: { rewards: Reward[] }) {
  return (
    <div className='flex flex-col gap-2 pb-4'>
      {rewards.map((reward) => (
        <RewardItem key={reward.id} reward={reward} />
      ))}
    </div>
  );
}

function RewardItem({ reward }: { reward: Reward }) {
  return (
    <div className='text-v1-primary-600 mx-6 mb-2 gap-4 border-b border-v1-grey-400 pb-6 text-sm'>
      <div className='mb-3 flex flex-wrap items-center gap-2 font-semibold'>
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
              <Check />
              확인 후 수령 가능
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}
