import Image from 'next/image';
import { CrownFill } from '@/assets/images/icons';
import defaultAvatar from '@/assets/images/placeholder/face-default.png';
import { Participant } from '@/types/challenge';
import dummyParticipant from '../_mock/dummyParticipant.json';

export default function ParticipantList() {
  const participants = dummyParticipant;

  return (
    <ul className='flex flex-col gap-5 px-6 pb-6'>
      {participants.map((participant) => (
        <ParticipantItem participant={participant} key={participant.name} />
      ))}
    </ul>
  );
}

function ParticipantItem({ participant }: { participant: Participant }) {
  return (
    <li className='flex items-center gap-4'>
      <Image
        src={participant.avatar || defaultAvatar}
        alt='participant avatar'
        width={40}
        height={40}
        className='h-10 w-10 rounded-full object-cover'
      />
      <p className='font-semibold'>{participant.name}</p>
      {participant.isCreator && <CrownFill className='-ml-2 -mt-1 scale-[80%]' />}
    </li>
  );
}
