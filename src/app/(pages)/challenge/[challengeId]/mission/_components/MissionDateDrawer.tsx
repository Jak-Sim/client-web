import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Refresh } from '@/assets/images/icons';
import Button from '@/components/button/Button';
import { Calendar } from '@/components/ui/calendar';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

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
      <DrawerTrigger onClick={() => setOpen(true)}>{children}</DrawerTrigger>
      <DrawerContent style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <DrawerTitle className='hidden'>미션 기간 설정</DrawerTitle>

        <div className='mx-auto my-4 flex w-full max-w-[300px] flex-col gap-4'>
          <Calendar mode='range' selected={dateRange} onSelect={setDateRange} />

          <div className='flex justify-between px-4'>
            <button onClick={handleReset} className='w-10'>
              <Refresh />
            </button>
            <Button
              variant='secondary'
              size='md'
              disabled={!dateRange?.from && !dateRange?.to}
              onClick={() => setOpen(false)}
            >
              {dateRange?.from || dateRange?.to ? '선택 완료' : '선택 해주세요'}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
