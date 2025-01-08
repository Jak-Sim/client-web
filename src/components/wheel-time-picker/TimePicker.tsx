import { useCallback, useEffect, useMemo, useState } from 'react';
import { TimeLike } from 'fs';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/shadcn/utils';

interface Props {
  value: TimeLike | undefined;
  onChange: (value: TimeLike) => void;
  maxTime?: TimeLike;
  minTime?: TimeLike;
}

type TimeState = {
  hourIdx: number;
  minuteIdx: number;
  period: 'AM' | 'PM';
};

export const getTimeState = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const timeState: TimeState = {
    hourIdx: hours - 1,
    minuteIdx: minutes - 1,
    period: hours >= 12 ? 'PM' : 'AM',
  } as TimeState;
  return timeState;
};

export const updateTimeLike = (value: TimeState) => {
  const periodOffset = value.period === 'AM' ? 0 : 12;
  return `${(value.hourIdx + periodOffset + 1).toString().padStart(2, '0')}:${(value.minuteIdx + 1).toString().padStart(2, '0')}`;
};

const valueToTimeState = (value: TimeLike) => {
  if (!(typeof value === 'string')) {
    throw new Error('시간 형식이 올바르지 않습니다.');
  }

  const [hour, minute] = value.split(':');
  const hourInt = parseInt(hour);
  const minuteInt = parseInt(minute);

  if (isNaN(hourInt) || isNaN(minuteInt)) {
    throw new Error('시간 형식이 올바르지 않습니다.');
  }

  const isPM = hourInt >= 12;
  const timeState: TimeState = {
    hourIdx: isPM ? hourInt - 12 - 1 : hourInt - 1,
    minuteIdx: minuteInt - 1,
    period: isPM ? 'PM' : 'AM',
  };
  return timeState;
};

export const isTimeValid = ({
  value,
  maxTime,
  minTime,
  period,
}: {
  value: TimeLike;
  maxTime?: TimeLike;
  minTime?: TimeLike;
  period?: 'AM' | 'PM';
}) => {
  if (typeof value !== 'string') return false;
  const [hour, minute] = value.split(':');
  const [maxHour, maxMinute] = (typeof maxTime === 'string' ? maxTime : '24:00').split(':');
  const [minHour] = (typeof minTime === 'string' ? minTime : '00:00').split(':');

  if (period === 'PM' && parseInt(hour) >= 24 && parseInt(minute) > 0) return false;
  if (maxTime === undefined && minTime === undefined) return true;
  if (parseInt(hour) > parseInt(maxHour)) return false;
  if (parseInt(hour) < parseInt(minHour)) return false;
  if (parseInt(hour) === parseInt(maxHour) && parseInt(minute) >= parseInt(maxMinute)) return false;

  return true;
};

export default function TimePicker({ value, onChange, maxTime, minTime }: Props) {
  const curentDate = useMemo(() => getTimeState(new Date()), []);
  const [timeState, setTimeState] = useState<TimeState>(value ? valueToTimeState(value) : curentDate);

  const [hourApi, setHourApi] = useState<CarouselApi>();
  const [minuteApi, setMinuteApi] = useState<CarouselApi>();
  const [periodApi, setPeriodApi] = useState<CarouselApi>();
  const [isInvalid, setIsInvalid] = useState(false);

  const updateTimeValue = useCallback(() => {
    const hour = hourApi?.selectedScrollSnap() ?? 0;
    const minute = minuteApi?.selectedScrollSnap() ?? 0;
    const period = (periodApi?.selectedScrollSnap() ?? 0) === 0 ? 'AM' : 'PM';

    const newTimeState: TimeState = {
      hourIdx: hour,
      minuteIdx: minute,
      period,
    };

    setTimeState(newTimeState);
    onChange(updateTimeLike(newTimeState));
  }, [hourApi, minuteApi, periodApi, onChange]);

  useEffect(() => {
    setIsInvalid(false);
    if (value) {
      if (!isTimeValid({ value, maxTime, minTime, period: timeState.period })) {
        setIsInvalid(true);
      }
    }
  }, [value, maxTime, minTime, timeState.period]);

  useEffect(() => {
    if (hourApi) hourApi.on('select', updateTimeValue);
  }, [hourApi, updateTimeValue]);

  useEffect(() => {
    if (minuteApi) minuteApi.on('select', updateTimeValue);
  }, [minuteApi, updateTimeValue]);

  useEffect(() => {
    if (periodApi) periodApi.on('select', updateTimeValue);
  }, [periodApi, updateTimeValue]);

  return (
    <div
      className={cn(
        'relative flex w-full max-w-[300px] flex-1 items-center justify-center gap-1 text-v1-text-primary-300',
      )}
    >
      <div className='absolute left-1/2 top-1/2 flex h-40 w-full -translate-x-1/2 -translate-y-1/2 flex-col justify-center gap-[55px]'>
        <div className='w-full border-b-[1px] border-v1-subtext-200'></div>
        <div className='w-full border-b-[1px] border-v1-subtext-200'></div>
      </div>
      <Carousel orientation='vertical' opts={{ startIndex: timeState.hourIdx }} setApi={setHourApi}>
        <CarouselContent className='h-[165px]' data-testid='time-picker-hour'>
          {Array.from({ length: 12 })
            .map((_, index) => index + 1)
            .map((hour) => (
              <CustomCarouselItem
                value={String(hour).padStart(2, '0')}
                isSelected={timeState.hourIdx + 1 === hour}
                isInvalid={isInvalid}
                className={`${hour === 1 ? 'mt-[55px]' : ''} ${hour === 12 ? 'mb-[55px]' : ''}`}
                key={hour}
                dataTestId={`hour-display-${hour}`}
              />
            ))}
        </CarouselContent>
      </Carousel>
      <div>:</div>
      <Carousel orientation='vertical' opts={{ startIndex: timeState.minuteIdx }} setApi={setMinuteApi}>
        <CarouselContent className='h-[165px]' data-testid='time-picker-minute'>
          {Array.from({ length: 60 })
            .map((_, index) => index + 1)
            .map((minute) => (
              <CustomCarouselItem
                value={String(minute).padStart(2, '0')}
                isSelected={timeState.minuteIdx + 1 === minute}
                isInvalid={isInvalid}
                className={`${minute === 1 ? 'mt-[55px]' : ''} ${minute === 60 ? 'mb-[55px]' : ''}`}
                key={minute}
                dataTestId={`minute-display-${minute}`}
              />
            ))}
        </CarouselContent>
      </Carousel>
      <Carousel
        orientation='vertical'
        className='absolute right-0'
        opts={{
          startIndex: timeState.period === 'AM' ? 0 : 1,
        }}
        setApi={setPeriodApi}
      >
        <CarouselContent className='h-[165px]'>
          {['AM', 'PM'].map((item) => (
            <CustomCarouselItem
              value={item}
              isSelected={timeState.period === item}
              isInvalid={isInvalid}
              key={item}
              className={`${item === 'AM' ? 'mt-[55px]' : ''} ${item === 'PM' ? 'mb-[55px]' : ''}`}
              dataTestId={`period-display-${item}`}
            />
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

function CustomCarouselItem({
  value,
  isSelected,
  isInvalid,
  className,
  dataTestId,
}: {
  value: string;
  isSelected: boolean;
  isInvalid: boolean;
  className?: string;
  dataTestId?: string;
}) {
  return (
    <CarouselItem
      className={cn(
        'basis-1/3',
        isSelected && 'selected font-semibold text-v1-text-primary-600',
        isInvalid && 'invalid !text-v1-red-500',
        className,
      )}
      data-testid={dataTestId}
    >
      <ItemText value={value} />
    </CarouselItem>
  );
}

function ItemText({ value, className }: { value: string; className?: string }) {
  return <p className={cn('h-10 min-w-12 p-2 text-center', className)}>{value}</p>;
}