import { useState } from 'react';

interface Days {
  Monday: boolean;
  Tuesday: boolean;
  Wednesday: boolean;
  Thursday: boolean;
  Friday: boolean;
  Saturday: boolean;
  Sunday: boolean;
}

function getKoreanDayName(day: keyof Days) {
  const daysInKorean = {
    Monday: '월',
    Tuesday: '화',
    Wednesday: '수',
    Thursday: '목',
    Friday: '금',
    Saturday: '토',
    Sunday: '일',
  };
  return daysInKorean[day];
}

interface DayToggleProps {
  day: keyof Days;
  isActive: boolean;
  onToggle: () => void;
}

function DayToggle({ day, isActive, onToggle }: DayToggleProps) {
  return (
    <button
      type={'button'}
      className={`flex items-center justify-center rounded-full w-11 h-11 cursor-pointer font-bold transition-colors ${isActive ? 'bg-[#FF6332]' : 'bg-[#D6C8C4]'}`}
      onClick={onToggle}
    >
      <div className={`${isActive ? 'text-white' : 'text-[#907D78]'}`}>{getKoreanDayName(day)}</div>
    </button>
  );
}

export default function WeeklyToggleSwitches() {
  const [days, setDays] = useState<Days>({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const toggleDay = (day: keyof Days) => {
    setDays((prevDays) => ({
      ...prevDays,
      [day]: !prevDays[day],
    }));
  };

  return (
    <div className='flex justify-between'>
      {Object.keys(days).map((day) => (
        <DayToggle
          key={day}
          day={day as keyof Days}
          isActive={days[day as keyof Days]}
          onToggle={() => toggleDay(day as keyof Days)}
        />
      ))}
    </div>
  );
}
