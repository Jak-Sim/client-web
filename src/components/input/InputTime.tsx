import { TimeLike } from 'fs';
import { cn } from '@/lib/shadcn/utils';
import { Input } from './Input';
import './inputTime.css';

export default function InputTime({
  value,
  onChange,
  className,
}: {
  value: TimeLike;
  onChange: (value: TimeLike) => void;
  className?: string;
}) {
  const timeValue = value instanceof Date ? value.getHours() + ':' + value.getMinutes() : value;

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Input className='text-center' value={timeValue} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
