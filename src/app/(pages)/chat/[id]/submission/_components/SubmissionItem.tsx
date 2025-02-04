import { CalendarCheck, CheckboxChecked, CheckboxNotChecked, Clock, Coins } from '@/assets/images/icons';
import { Mission } from '@/types/challenge';
import { formatKoreanDayString } from '@/utils/getKoreanDay';

interface SubmissionItemProps {
  mission: Mission;
  className?: string;
  handleRadioChange: (id: number) => void;
  checkedList: (Mission & { checked: boolean })[];
}

export default function SubmissionItem({ mission, className, handleRadioChange, checkedList }: SubmissionItemProps) {
  const days = formatKoreanDayString(mission.day.join(''));

  const checked = checkedList.find((item) => item.id === mission.id)?.checked;
  const Checkbox = checked ? CheckboxChecked : CheckboxNotChecked;

  return (
    <li className={`text-v1-primary-600 gap-4 border-b py-3 text-sm ${className}`}>
      <div className='flex items-center gap-4'>
        <Checkbox className={'cursor-pointer'} onClick={() => handleRadioChange(mission.id)} />
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
      </div>
    </li>
  );
}
