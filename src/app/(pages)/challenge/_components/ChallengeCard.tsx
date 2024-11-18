import Image from 'next/image';
import challengeImage from '@/assets/images/placeholder/chat-list.png';

export default function ChallengeCard() {
  return (
    <div className='relative h-[200px] overflow-hidden rounded-2xl bg-white'>
      <Image src={challengeImage} alt='챌린지 이미지' fill className='object-cover' />

      <div className='absolute bottom-0 left-0 right-0 top-0 p-6'>
        <div className='text-white'>
          <h3 className='mb-1 text-xl font-bold'>챌린지 이름</h3>
          <p className='text-sm'>챌린지 설명</p>
        </div>
      </div>
    </div>
  );
}
