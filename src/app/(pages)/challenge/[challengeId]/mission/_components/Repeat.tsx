'use client';

import { useState } from 'react';
import WeeklyToggleSwitches from '@/app/(pages)/challenge/[challengeId]/mission/_components/WeeklyToggleSwitches';

const Repeat = () => {
  const [isActive, setIsActive] = useState(true);

  const handleToggle = () => setIsActive(!isActive);
  return (
    <>
      <div className={'pb-5 flex items-center justify-between'}>
        <div>
          <div className={'font-bold text-v1-text-primary-600 pb-2'}>반복 설정</div>
          <div className={'text-sm text-[#907D78]'}>미션의 반복 주기를 설정합니다.</div>
        </div>
        <div>
          <div
            className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              isActive ? 'bg-[#FF6332]' : 'bg-[#D6C8C4]'
            }`}
            onClick={handleToggle}
          >
            <div
              className={`h-6 w-6 rounded-full transform transition-transform ${
                isActive ? 'translate-x-8 bg-[#FFF8F5]' : 'translate-x-0 bg-v1-grey-600'
              }`}
            />
          </div>
        </div>
      </div>
      {isActive && (
        <div>
          <WeeklyToggleSwitches />
        </div>
      )}
    </>
  );
};

export default Repeat;
