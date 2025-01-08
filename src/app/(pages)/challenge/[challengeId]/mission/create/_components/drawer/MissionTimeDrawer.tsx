import { useState } from 'react';
import { TimeLike } from 'fs';
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import TimePicker from '@/components/wheel-time-picker/TimePicker';
import DrawButtonBox from '../ChallengeCreateFunnel/DrawButtonBox';

export default function MissionTimeDrawer({
  children,
  selectedTime,
  onSelect,
  maxTime,
  minTime,
}: {
  children: React.ReactNode;
  selectedTime: TimeLike | undefined;
  onSelect: (time: TimeLike) => void;
  maxTime?: TimeLike | undefined;
  minTime?: TimeLike | undefined;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} dismissible={false}>
      <DrawerDescription className='hidden'>미션 기간 설정</DrawerDescription>
      <DrawerTrigger onClick={() => setOpen(true)} className='w-full'>
        {children}
      </DrawerTrigger>
      <DrawerContent
        onInteractOutside={() => setOpen(false)}
        className='w-full rounded-2xl border-none'
        style={{ boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.1)' }}
      >
        <DrawerTitle className='hidden'>미션 기간 설정</DrawerTitle>
        <div className='mx-auto my-4 flex h-[300px] w-full max-w-[300px] flex-col justify-between gap-4'>
          <TimePicker value={selectedTime} onChange={onSelect} maxTime={maxTime} minTime={minTime} />
          <DrawButtonBox
            handleReset={() => {}}
            setOpen={setOpen}
            isSelected={!!selectedTime}
            buttonText={{
              selected: '선택 완료',
              unselected: '선택 해주세요',
            }}
            hasResetButton={false}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}