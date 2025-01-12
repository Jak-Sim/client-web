import { Dispatch, SetStateAction, useState } from 'react';
import { Days, getKoreanDayName } from '@/utils/getKoreanDay';

interface DayToggleProps {
  day: Days;
  isActive: boolean;
  onToggle: () => void;
}

function DayToggle({ day, isActive, onToggle }: DayToggleProps) {
  return (
    <button
      type='button'
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-[1px] border-v1-text-primary-200 text-sm font-bold transition-colors xs:h-11 xs:w-11 ${isActive ? 'bg-v1-orange-500 text-white' : 'bg-white'}`}
      onClick={onToggle}
    >
      {getKoreanDayName(day)}
    </button>
  );
}

export default function WeeklyToggleSwitches({
  selectedDays,
  setSelectedDays,
}: {
  selectedDays: Days[];
  setSelectedDays: Dispatch<SetStateAction<Days[]>>;
}) {
  const [days, setDays] = useState<Record<Days, boolean>>({
    Monday: selectedDays.includes('Monday'),
    Tuesday: selectedDays.includes('Tuesday'),
    Wednesday: selectedDays.includes('Wednesday'),
    Thursday: selectedDays.includes('Thursday'),
    Friday: selectedDays.includes('Friday'),
    Saturday: selectedDays.includes('Saturday'),
    Sunday: selectedDays.includes('Sunday'),
  });

  const toggleDay = (day: Days) => {
    setDays((prevDays) => ({
      ...prevDays,
      [day]: !prevDays[day],
    }));
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day) ? prevSelectedDays.filter((d) => d !== day) : [...prevSelectedDays, day],
    );
  };

  return (
    <div className='flex justify-between'>
      {Object.keys(days).map((day) => (
        <DayToggle key={day} day={day as Days} isActive={days[day as Days]} onToggle={() => toggleDay(day as Days)} />
      ))}
    </div>
  );
}