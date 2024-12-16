import type { Reward } from '@/types/challenge';
import RewardItem from './RewardItem';

export default function RewardList({ rewards }: { rewards: Reward[] }) {
  return (
    <div className='-mt-4 flex flex-col gap-2 pb-6'>
      {rewards.map((reward, index) => (
        <RewardItem
          key={reward.id}
          reward={reward}
          className={`mx-6 rounded-none border-b !px-0 ${index === rewards.length - 1 ? '' : 'border-b'}`}
        />
      ))}
    </div>
  );
}
