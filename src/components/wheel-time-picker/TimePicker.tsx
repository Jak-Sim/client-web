import { useCallback, useEffect, useMemo, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/shadcn/utils';
import { TimeValue } from '../../app/(pages)/challenge/[challengeId]/mission/create/_components/ChallengeCreateFunnel/MissionPeriod';

interface Props {
  value?: TimeValue | null;
  onChange: (value: TimeValue) => void;
  maxTime: TimeValue | undefined;
  minTime: TimeValue | undefined;
}

const getCurrentTimeValue = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours < 12 ? 'AM' : 'PM';

  if (period === 'PM' && hours > 12) {
    return { hour: hours - 12, minute: minutes, period };
  }
  return { hour: hours, minute: minutes, period };
};

export const isTimeValid = ({
  value,
  maxTime,
  minTime,
}: {
  value: TimeValue;
  maxTime?: TimeValue;
  minTime?: TimeValue;
}) => {
  if (maxTime === undefined && minTime === undefined) {
    return true;
  }
  if (maxTime && value.hour > maxTime.hour && value.period === maxTime.period) {
    return false;
  }
  if (minTime && value.hour < minTime.hour && value.period === minTime.period) {
    return false;
  }
  return true;
};

export default function TimePicker({ value, onChange, maxTime, minTime }: Props) {
  const curentDate = useMemo(() => getCurrentTimeValue(new Date()), []);
  const [hourApi, setHourApi] = useState<CarouselApi>();
  const [minuteApi, setMinuteApi] = useState<CarouselApi>();
  const [periodApi, setPeriodApi] = useState<CarouselApi>();
  const [isInvalid, setIsInvalid] = useState(false);

  const updateTimeValue = useCallback(() => {
    setIsInvalid(false);
    const hour = hourApi?.selectedScrollSnap() ?? 0;
    const minute = minuteApi?.selectedScrollSnap() ?? 0;
    const period = (periodApi?.selectedScrollSnap() ?? 0) === 1 ? 'AM' : 'PM';

    const timeValue: TimeValue = {
      hour: hour < -1 ? 1 : hour,
      minute: minute < -1 ? 1 : minute,
      period,
    };
    onChange(timeValue);
  }, [hourApi, minuteApi, periodApi, onChange]);

  useEffect(() => {
    if (value) {
      if (!isTimeValid({ value: { hour: value.hour, minute: value.minute, period: value.period }, maxTime, minTime })) {
        setIsInvalid(true);
      }
    }
  }, [value, maxTime, minTime]);

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
    <div className={cn('relative mx-6 flex flex-1 items-center justify-center gap-1 text-v1-text-primary-300')}>
      <div className='absolute left-1/2 top-1/2 flex h-40 w-full -translate-x-1/2 -translate-y-1/2 flex-col justify-center gap-[55px]'>
        <div className='w-full border-b-[1px] border-v1-subtext-200'></div>
        <div className='w-full border-b-[1px] border-v1-subtext-200'></div>
      </div>
      <Carousel
        orientation='vertical'
        opts={{ startIndex: value?.hour === undefined ? curentDate.hour : value.hour }}
        setApi={setHourApi}
      >
        <CarouselContent className='h-[165px]'>
          {Array.from({ length: 14 }, (_, index) => (
            <CustomCarouselItem
              value={index === 0 || index === 13 ? '' : String(index).padStart(2, '0')}
              isSelected={(value?.hour ?? curentDate.hour) === index}
              isInvalid={isInvalid}
              key={index}
            />
          ))}
        </CarouselContent>
      </Carousel>
      <div>:</div>
      <Carousel
        orientation='vertical'
        opts={{ startIndex: value?.minute === undefined ? curentDate.minute : value.minute }}
        setApi={setMinuteApi}
      >
        <CarouselContent className='h-[165px]'>
          {Array.from({ length: 62 }, (_, index) => (
            <CustomCarouselItem
              value={index === 0 || index === 61 ? '' : String(index).padStart(2, '0')}
              isSelected={(value?.minute ?? curentDate.minute) === index}
              isInvalid={isInvalid}
              key={index}
            />
          ))}
        </CarouselContent>
      </Carousel>
      <Carousel
        orientation='vertical'
        className='absolute right-0'
        opts={{
          startIndex: value?.period === 'AM' ? 1 : 2,
        }}
        setApi={setPeriodApi}
      >
        <CarouselContent className='h-[165px]'>
          {['', 'AM', 'PM', ' '].map((item) => (
            <CustomCarouselItem value={item} isSelected={value?.period === item} isInvalid={isInvalid} key={item} />
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
}: {
  value: string;
  isSelected: boolean;
  isInvalid: boolean;
  className?: string;
}) {
  return (
    <CarouselItem
      className={cn(
        'basis-1/3',
        isSelected && 'font-semibold text-v1-text-primary-600',
        isInvalid && '!text-v1-red-500',
        className,
      )}
    >
      <ItemText value={value} />
    </CarouselItem>
  );
}

function ItemText({ value, className }: { value: string; className?: string }) {
  return <p className={cn('h-10 min-w-12 p-2 text-center', className)}>{value}</p>;
}
