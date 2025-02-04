import { useState } from 'react';
import { clsx } from 'clsx';
import dummyMission from '@/app/(pages)/challenge/_mock/dummyMission.json';
import SubmissionItem from '@/app/(pages)/chat/[id]/submission/_components/SubmissionItem';
import { SubmissionFirst } from '@/app/(pages)/chat/[id]/submission/_components/SubmissionPage';
import Button from '@/components/button/Button';
import FunnelUi from '@/components/funnel/FunnelUi';

interface FunnelFirstProps {
  onNext: (props: SubmissionFirst) => void;
  goBack: () => void;
  checkedList?: SubmissionFirst['checkedList'];
}

const { Title, ButtonWrapper } = FunnelUi;
const missions = dummyMission;

const SubmissionCheckList = ({ onNext, ...props }: FunnelFirstProps) => {
  const [checkedList, setCheckedLists] = useState(
    props.checkedList ||
      missions.map((item) => {
        return {
          ...item,
          checked: false,
        };
      }),
  );
  const handleRadioChange = (id: number) => {
    const updatedList = checkedList.map((item) => ({
      ...item,
      checked: item.id === id,
    }));
    setCheckedLists(updatedList);
  };

  return (
    <div>
      <Title>
        어떤 미션을
        <br />
        완료 하셨나요?
      </Title>
      <ul className={clsx('flex flex-1 flex-col gap-2')}>
        {missions.map((mission, index) => (
          <SubmissionItem
            mission={mission}
            key={index}
            checkedList={checkedList}
            handleRadioChange={handleRadioChange}
          />
        ))}
      </ul>
      <ButtonWrapper>
        <Button onClick={() => onNext({ checkedList })} disabled={checkedList.every((item) => !item.checked)}>
          다음
        </Button>
      </ButtonWrapper>
    </div>
  );
};

export default SubmissionCheckList;
