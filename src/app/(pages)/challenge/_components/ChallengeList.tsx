'use client';

import ChallengeCard from './ChallengeCard';

export default function ChallengeList() {
  return (
    <ul className='flex flex-col gap-3 p-4'>
      {new Array(5).fill(null).map((_, index) => (
        <ChallengeCard key={index} index={index} />
      ))}
    </ul>
  );
}
