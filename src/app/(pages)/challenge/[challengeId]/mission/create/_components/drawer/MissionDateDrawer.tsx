import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Calendar } from '@/components/ui/calendar';
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import DrawButtonBox from '../ChallengeCreateFunnel/DrawButtonBox';

export default function MissionPeriodDrawer({
  dateRange,
  setDateRange,
  children,
}: {
  dateRange: DateRange | undefined;
  setDateRange: (date: DateRange | undefined) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const handleReset = () => {
    setDateRange(undefined);
  };

  return (
    <Drawer open={open}>
      <DrawerDescription>미션 기간 설정</DrawerDescription>
      <DrawerTrigger onClick={() => setOpen(true)} className='w-full'>
        {children}
      </DrawerTrigger>
      <DrawerContent
        onInteractOutside={() => setOpen(false)}
        className='w-full rounded-2xl border-none'
        style={{ boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.1)' }}
      >
        <DrawerTitle className='hidden'>미션 기간 설정</DrawerTitle>

        <div className='mx-auto my-4 flex w-full max-w-[300px] flex-col gap-4'>
          <Calendar mode='range' selected={dateRange} onSelect={setDateRange} />

          <DrawButtonBox
            handleReset={handleReset}
            setOpen={setOpen}
            isSelected={!!dateRange?.from && !!dateRange?.to}
            buttonText={{
              selected: '선택 완료',
              unselected: '선택 해주세요',
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
