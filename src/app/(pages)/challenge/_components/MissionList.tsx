import { Mission } from '@/types/challenge';
import MissionItem from './MissionItem';

export default function MissionList({ missions }: { missions: Mission[] }) {
  return (
    <ul className='-mt-4 flex flex-col gap-2 pb-6'>
      {missions.map((mission, index) => (
        <MissionItem
          mission={mission}
          key={mission.id}
          className={`mx-6 rounded-none border-b !px-0 ${index === missions.length - 1 ? '' : 'border-b'} !bg-white`}
        />
      ))}
    </ul>
  );
}
