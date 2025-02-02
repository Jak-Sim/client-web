'use client';

import { useState } from 'react';
import dummyMission from '@/app/(pages)/challenge/_mock/dummyMission.json';
import SubmissionItem from '@/app/(pages)/chat/[id]/submission/_components/SubmissionItem';

const SubmissionPage = () => {
  const missions = dummyMission;

  const [checkedList, setCheckedLists] = useState(
    missions.map(({ id }) => {
      return {
        id,
        checked: false,
      };
    }),
  );

  const handleCheckElement = (id: number) => {
    setCheckedLists((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)),
    );
  };

  return (
    <div className={'px-6'}>
      <div className={'py-2 text-2xl font-medium text-v1-text-primary-700'}>
        어떤 미션을
        <br />
        완료 하셨나요?
      </div>
      <ul className={'flex flex-col gap-2 pt-8'}>
        {missions.map((mission, index) => (
          <SubmissionItem
            mission={mission}
            key={index}
            checkedList={checkedList}
            handleCheckElement={handleCheckElement}
          />
        ))}
      </ul>
    </div>
  );
};

export default SubmissionPage;
