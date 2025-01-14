import { useEffect, useState } from 'react';
import { TimeLike } from 'fs';
import { DateRange } from 'react-day-picker';
import Button from '@/components/button/Button';
import FunnelUi from '@/components/funnel/FunnelUi';
import InputDate from '@/components/input/InputDate';
import InputTime from '@/components/input/InputTime';
import { isTimeValid } from '@/components/wheel-time-picker/TimePicker';
import useTempSave from '@/hooks/useTempSave';
import { Days, getKoreanDayString } from '@/utils/getKoreanDay';
import MissionPeriodDrawer from '../drawer/MissionDateDrawer';
import MissionTimeDrawer from '../drawer/MissionTimeDrawer';
import WeeklyToggleSwitches from '../WeeklyToggleSwitches';
import type { FunnelProps, MissionPeriod } from './_context/context';


interface MissionPeriodProps {
  onNext: (props: MissionPeriod) => void;
  goBack: () => void;
  startDate?: MissionPeriod['startDate'];
  endDate?: MissionPeriod['endDate'];
  startTime?: MissionPeriod['startTime'];
  endTime?: MissionPeriod['endTime'];
  selectedDays?: MissionPeriod['selectedDays'];
  updateDraftTempData: ReturnType<typeof useTempSave<FunnelProps>>['updateDraftTempData'];
}

export type TimeValue = {
  hour: number;
  minute: number;
  period: 'AM' | 'PM';
};

const { Title, FieldWrapper, ButtonWrapper, GrayText, Label, TextRow } = FunnelUi;

export default function MissionPeriod({ onNext, updateDraftTempData, ...props }: MissionPeriodProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: props.startDate ?? undefined,
    to: props.endDate ?? undefined,
  });
  const [selectedDays, setSelectedDays] = useState<Days[]>(props.selectedDays ?? []);
  const [startTime, setStartTime] = useState<TimeLike>(props.startTime ?? '');
  const [endTime, setEndTime] = useState<TimeLike>(props.endTime ?? '');
  const [isValidTime, setIsValidTime] = useState(true);

  const setStartDate = (date: Date | null | undefined, type: 'from' | 'to') => {
    if (date) {
      setDateRange((prev) => (prev ? { ...prev, [type]: date } : { from: date, to: undefined }));
    }
  };

  useEffect(() => {
    setIsValidTime(true);

    let isValid = true;
    if (startTime) isValid = isTimeValid({ value: startTime, maxTime: endTime });
    if (endTime) isValid = isTimeValid({ value: endTime, minTime: startTime });

    setIsValidTime(isValid);
  }, [startTime, endTime]);

  useEffect(() => {
    updateDraftTempData({ startDate: dateRange?.from, endDate: dateRange?.to, startTime, endTime, selectedDays });
  }, [dateRange, startTime, endTime, selectedDays, updateDraftTempData]);

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
        <MissionPeriodDrawer dateRange={dateRange} setDateRange={setDateRange}>
          <div className='flex flex-col gap-2 gap-y-0 xs:flex-row xs:items-center'>
            <InputDate
              value={dateRange?.from ?? null}
              onChange={(date) => setStartDate(date, 'from')}
              className='pointer-events-none'
            />
            <div className='mb-2 shrink-0 xs:mb-0'>부터</div>
            <InputDate
              value={dateRange?.to ?? null}
              onChange={(date) => setStartDate(date, 'to')}
              className='pointer-events-none'
            />
            <div className='shrink-0'>까지</div>
          </div>
        </MissionPeriodDrawer>
      </FieldWrapper>
      <FieldWrapper>
        <TextRow>
          <Label htmlFor='endDate'>반복 주기 설정</Label>
          <GrayText>반복 주기를 선택하면 더 재미있을 거예요!</GrayText>
        </TextRow>
        <div className='my-2'>
          <WeeklyToggleSwitches selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
          <p className='mt-2 text-right'>
            {selectedDays.length > 0 ? (
              <>
                매주{' '}
                <span className='font-semibold text-v1-orange-500'>
                  {getKoreanDayString(selectedDays, { hasYoil: true })}
                </span>
              </>
            ) : (
              ''
            )}
          </p>
        </div>
      </FieldWrapper>
      <FieldWrapper>
        <TextRow>
          <Label htmlFor='endDate'>미션 제한 시간 설정 (선택)</Label>
          <GrayText>제한 시간을 설정하지 않으면 기본으로 하루종일 진행 되요! </GrayText>
        </TextRow>
        <div className='flex flex-col items-center gap-2 gap-y-0 xs:flex-row'>
          <MissionTimeDrawer selectedTime={startTime} onSelect={setStartTime} maxTime={endTime}>
            <InputTime value={startTime ?? ''} onChange={() => {}} className={isValidTime ? '' : 'text-v1-red-600'} />
          </MissionTimeDrawer>
          <div className='my-2 flex shrink-0 items-center xs:mb-0'>부터</div>
          <MissionTimeDrawer selectedTime={endTime} onSelect={setEndTime} minTime={startTime}>
            <InputTime value={endTime ?? ''} onChange={() => {}} className={isValidTime ? '' : 'text-v1-red-600'} />
          </MissionTimeDrawer>
          <div className='my-2 flex shrink-0 items-center xs:mb-0'>까지</div>
        </div>
      </FieldWrapper>
      <ButtonWrapper>
        <Button
          onClick={() =>
            onNext({
              startDate: dateRange?.from,
              endDate: dateRange?.to,
              startTime,
              endTime,
            })
          }
          variant='tertiary'
          disabled={!dateRange?.from || !dateRange?.to || !isValidTime}
        >
          다음
        </Button>
      </ButtonWrapper>
    </FunnelUi>
  );
}