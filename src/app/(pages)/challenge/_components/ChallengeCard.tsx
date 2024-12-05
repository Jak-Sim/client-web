import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CrownFill, Fire, Lightning } from '@/assets/images/icons';
import challengeImage from '@/assets/images/placeholder/chat-list.png';
import { cn } from '@/lib/shadcn/utils';
import { Challenge } from './ChallengeList';

const INDEX_COLOR = [
  { text: 'text-v1-orange-500', bg: 'bg-v1-orange-500' },
  { text: 'text-v1-blue-500', bg: 'bg-v1-blue-500' },
  { text: 'text-[#F56060]', bg: 'bg-[#F56060]' },
];

export default function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const { name, backgroundImage, tags, challengeId, currentParticipants, creatorUserUuid } = challenge;
  const point = 1000;
  const color = INDEX_COLOR[challengeId % INDEX_COLOR.length];
  const mission = tags;
  const user = { uuid: 'useruuid' };
  const isOwner = creatorUserUuid === user.uuid;

  return (
    <div className='relative min-h-[180px] rounded-2xl bg-white'>
      {isOwner && <CrownFill className='absolute -top-3 right-8 z-10' />}

      <div className='absolute bottom-0 left-0 right-0 top-0 overflow-hidden rounded-2xl'>
        <Image src={backgroundImage || challengeImage} alt='챌린지 이미지' fill className='object-cover' />
      </div>

      <div className='absolute bottom-0 left-0 right-0 top-0 p-5 text-white'>
        <div className='flex h-full flex-col justify-between'>
          <div>
            <h3 className='mb-1 text-xl font-bold'>{name}</h3>
            <p className='text-sm'>
              목표 달성까지 <span className={cn('font-bold', color.text)}>{point} 포인트</span> 챌린지
            </p>
          </div>

          <div className='flex items-end justify-between gap-2'>
            <div className='flex flex-wrap gap-2'>
              <div className='-gap-1 flex items-center'>
                <Lightning />
                <p className='text-sm'>
                  미션 <strong>{mission.length}</strong> 개 진행 중
                </p>
              </div>
              <div className='-gap-1 flex items-center'>
                <Fire />
                <p className='text-sm'>
                  <strong>{currentParticipants}</strong> 명
                </p>
              </div>
            </div>
            <Link href={`/challenge/${challengeId}`}>
              <button
                className={cn(
                  'flex items-center gap-2 rounded-full',
                  color.bg,
                  'flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-2xl text-sm',
                )}
              >
                <ArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
