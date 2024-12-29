'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/shadcn/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      locale={ko}
      formatters={{
        formatCaption: (caption) => format(caption, 'yyyy년 MM월'),
      }}
      classNames={{
        months: 'flex flex-col space-y-4',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-xl font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(buttonVariants({ variant: 'ghost' }), 'p-2 opacity-100 hover:opacity-90'),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'border-collapse mx-auto w-full',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-full font-normal text-xs mt-3 mb-2',
        row: 'flex justify-center w-full mt-1',
        cell: 'w-full h-10 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-v1-text-primary-50 first:[&:has([aria-selected].day-range-start)]:rounded-l-full [&:has([aria-selected].day-range-end)]:rounded-r-full focus-within:relative focus-within:z-20 hover:opacity-90',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'w-full h-full p-0 font-normal aria-selected:opacity-100 selected:bg-v1-text-primary-500 selected:text-white !rounded-full',
        ),
        day_range_start: 'day-range-start !bg-v1-text-primary-500 text-white !font-bold hover:text-white',
        day_range_end: 'day-range-end !bg-v1-text-primary-500 text-white !font-bold hover:text-white',
        day_range_middle: 'bg-v1-text-primary-50 rounded-none',
        day_selected: 'bg-transparent',
        day_outside: 'day-outside text-v1-text-primary-200',
        day_today: 'border border-v1-text-primary-500 !font-bold !rounded-full',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => <ChevronLeft className='scale-150' {...props} />,
        IconRight: ({ className, ...props }) => <ChevronRight className='scale-150' {...props} />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };