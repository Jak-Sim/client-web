import { Coins } from '@/assets/images/icons';
import { type Challenge } from '../../_components/ChallengeList';
import Progress from './Progress';

export default function UserChallengeCard({ challenge }: { challenge: Challenge }) {
  const userName = '홍길동';
  const challengeDay = 1;
  const point = 1000;
  const progress = 80;

  console.log(challenge.createdAt);

  return (
    <div className='bg-v1-text-primary-75 flex h-[11.25rem] flex-col justify-between gap-2 rounded-lg p-4'>
      <div className='flex'>
        <div className='flex-1'>
          <p className='text-lg'>
            <strong className='font-bold'>{userName}</strong> 님
          </p>
          <p className='text-sm font-semibold text-v1-text-primary-400'>{challengeDay}일째 참여중</p>
        </div>
        <div>
          <div className='mb-1 flex items-center gap-1 text-2xl font-bold'>
            <Coins />
            {point}P
          </div>
          <p className='text-right text-sm font-semibold text-v1-text-primary-400'>적립된 포인트</p>
        </div>
      </div>
      <div>
        <div className='flex items-center gap-1'>
          <span className='text-sm font-semibold text-v1-text-primary-300'>미션 진행률</span>
          <strong className='text-xl font-bold'>{progress}%</strong>
        </div>

        <Progress progress={progress}>
          <Progress.ProgressBar />
          <Progress.Tag />
        </Progress>
      </div>
    </div>
  );
}
