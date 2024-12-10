import { CalendarCheck, Clock, Coins } from '@/assets/images/icons';
import { Mission } from '@/types/challenge';

export default function MissionList({ missions }: { missions: Mission[] }) {
  return (
    <ul className='flex flex-col gap-3 pb-4'>
      {missions.map((mission) => (
        <MissionItem mission={mission} key={mission.id} />
      ))}
    </ul>
  );
}

function MissionItem({ mission }: { mission: Mission }) {
  let days = mission.day.join('');
  if (days === '토일') {
    days = '주말';
  }

  return (
    <li className='mx-6 mb-2 gap-4 border-b border-v1-grey-400 pb-6 text-sm'>
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
    </li>
  );
}
