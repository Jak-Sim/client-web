import { useState } from 'react';
import Button from '@/components/button/Button';
import FunnelUi from '@/components/funnel/FunnelUi';
import { Input } from '@/components/input/Input';
import WeeklyToggleSwitches from '../WeeklyToggleSwitches';

interface MissionPeriodProps {
  onNext: ({
    startDate,
    endDate,
    startTime,
    endTime,
  }: {
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
  }) => void;
  goBack: () => void;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
}

const { Title, FieldWrapper, ButtonWrapper, GrayText, Label, TextRow } = FunnelUi;

export default function MissionPeriod({ onNext, goBack, ...props }: MissionPeriodProps) {
  const [startDate, setStartDate] = useState<string>(props.startDate ?? '');
  const [endDate, setEndDate] = useState<string>(props.endDate ?? '');
  const [startTime, setStartTime] = useState<string>(props.startTime ?? '');
  const [endTime, setEndTime] = useState<string>(props.endTime ?? '');

  return (
    <FunnelUi>
      <Title>
        미션을 진행할 기간을
        <br />
        설정해 볼까요?
      </Title>
      <FieldWrapper>
        <TextRow>
          <Label htmlFor='startDate'>미션 기간 설정</Label>
          <GrayText>기간은 최대 1년까지 설정할수 있어요</GrayText>
        </TextRow>
        <div className='flex items-center gap-2'>
          <Input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <div className='shrink-0'>부터</div>
          <Input type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <div className='shrink-0'>까지</div>
        </div>
      </FieldWrapper>
      <FieldWrapper>
        <TextRow>
          <Label htmlFor='endDate'>반복 주기 설정</Label>
          <GrayText>반복 주기를 선택하면 더 재미있을 거예요!</GrayText>
        </TextRow>
        <div className='my-2'>
          <WeeklyToggleSwitches />
        </div>
      </FieldWrapper>
      <FieldWrapper>
        <TextRow>
          <Label htmlFor='endDate'>미션 제한 시간 설정 (선택)</Label>
          <GrayText>제한 시간을 설정하지 않으면 기본으로 하루종일 진행 되요! </GrayText>
        </TextRow>
        <div className='flex items-center gap-2'>
          <Input type='time' value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          <div className='shrink-0'>부터</div>
          <Input type='time' value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          <div className='shrink-0'>까지</div>
        </div>
      </FieldWrapper>
      <ButtonWrapper>
        <Button
          onClick={() => onNext({ startDate, endDate, startTime, endTime })}
          variant='tertiary'
          disabled={!startDate || !endDate}
        >
          다음
        </Button>
      </ButtonWrapper>
    </FunnelUi>
  );
}
